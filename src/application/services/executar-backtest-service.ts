import type { ExecutarBacktestCommand } from "@/application/commands/executar-backtest";
import type { BacktestCompletoDto } from "@/application/dtos/backtest";
import type { IApplicationService } from "@/application/application-service";
import type { IBacktestRepository } from "@/application/ports/backtest-repository";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError, NotFoundError, InternalError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { Backtest, BacktestId, BacktestEngine, StrategyId, SnapshotId } from "@/core/domain/backtests";

export class ExecutarBacktestService
  implements IApplicationService<ExecutarBacktestCommand, BacktestCompletoDto>
{
  private readonly engine = new BacktestEngine();

  constructor(
    private readonly backtestRepo: IBacktestRepository,
    private readonly projectionRepo: IProjectionRepository,
  ) {}

  async Execute(command: ExecutarBacktestCommand): Promise<BacktestCompletoDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const strategy = await this.backtestRepo.findStrategyById(command.strategyId);
    if (!strategy) {
      return new NotFoundError("Strategy", command.strategyId);
    }

    const backtestId = BacktestId.generate();
    const snapshotId = SnapshotId.generate();

    const backtest = Backtest.create({
      id: backtestId,
      strategyId: command.strategyId,
      dateRange: command.dateRange,
      snapshotId: snapshotId.value,
      status: "RUNNING",
      createdAt: new Date(),
    });

    try {
      const snapshotData = await this.buildSnapshot(command, snapshotId.value);
      await this.backtestRepo.saveSnapshot(snapshotData);

      const running = backtest.markRunning();
      await this.backtestRepo.saveBacktest(running);

      const result = this.engine.execute(running, strategy, snapshotData);

      if (result.isFailure) {
        const failed = running.markFailed(result.error!.message);
        await this.backtestRepo.saveBacktest(failed);
        return new InternalError("SIMULATION_FAILED", result.error!.message);
      }

      const completed = running.markCompleted();
      await this.backtestRepo.saveBacktest(completed);
      await this.backtestRepo.saveSimulationResult(result.value!);

      return {
        backtest: {
          id: completed.id.value,
          strategyId: completed.strategyId,
          startDate: completed.dateRange.start.toISOString(),
          endDate: completed.dateRange.end.toISOString(),
          snapshotId: completed.snapshotId,
          status: completed.status,
          createdAt: completed.createdAt.toISOString(),
          completedAt: completed.completedAt?.toISOString(),
        },
        result: {
          id: result.value!.id.value,
          backtestId: result.value!.backtestId,
          periodReturns: result.value!.periodReturns,
          benchmarkReturn: result.value!.benchmarkReturn,
          maxDrawdown: result.value!.maxDrawdown,
          sharpeRatio: result.value!.sharpeRatio,
          volatility: result.value!.volatility,
          alpha: result.value!.alpha,
          beta: result.value!.beta,
          dividendYield: result.value!.dividendYield,
          monthlyReturns: result.value!.monthlyReturns,
        },
      };
    } catch (err) {
      const failed = backtest.markFailed(err instanceof Error ? err.message : "Erro inesperado");
      await this.backtestRepo.saveBacktest(failed);
      return new InternalError("BACKTEST_FAILED", err instanceof Error ? err.message : "Erro inesperado");
    }
  }

  private async buildSnapshot(
    command: ExecutarBacktestCommand,
    snapshotId: string,
  ): Promise<import("@/core/domain/backtests").BacktestSnapshot> {
    return {
      id: snapshotId,
      backtestId: "",
      assets: [],
      startDate: command.dateRange.start.toISOString(),
      endDate: command.dateRange.end.toISOString(),
      prices: {},
      dividends: [],
      splits: [],
      cdiRates: [],
      createdAt: new Date().toISOString(),
    };
  }

  private validar(command: ExecutarBacktestCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.strategyId) errors.strategyId = ["Campo obrigatorio"];
    if (!command.dateRange) errors.dateRange = ["Periodo obrigatorio"];
    if (command.dateRange?.start && command.dateRange?.end && command.dateRange.end < command.dateRange.start) {
      errors.dateRange = ["Data final deve ser maior ou igual a data inicial"];
    }

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada invalidos", errors)
      : null;
  }
}
