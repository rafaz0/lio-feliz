import type { ObterBacktestQuery } from "@/application/queries/obter-backtest";
import type { BacktestCompletoDto } from "@/application/dtos/backtest";
import type { IApplicationService } from "@/application/application-service";
import type { IBacktestRepository } from "@/application/ports/backtest-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterBacktestService
  implements IApplicationService<ObterBacktestQuery, BacktestCompletoDto>
{
  constructor(private readonly backtestRepo: IBacktestRepository) {}

  async Execute(query: ObterBacktestQuery): Promise<BacktestCompletoDto | ApplicationError> {
    const backtest = await this.backtestRepo.findBacktestById(query.backtestId);
    if (!backtest) {
      return new NotFoundError("Backtest", query.backtestId);
    }

    const result = await this.backtestRepo.findSimulationResultByBacktest(query.backtestId);

    return {
      backtest: {
        id: backtest.id.value,
        strategyId: backtest.strategyId,
        startDate: backtest.dateRange.start.toISOString(),
        endDate: backtest.dateRange.end.toISOString(),
        snapshotId: backtest.snapshotId,
        status: backtest.status,
        createdAt: backtest.createdAt.toISOString(),
        completedAt: backtest.completedAt?.toISOString(),
        error: backtest.error,
      },
      result: result
        ? {
            id: result.id.value,
            backtestId: result.backtestId,
            periodReturns: result.periodReturns,
            benchmarkReturn: result.benchmarkReturn,
            maxDrawdown: result.maxDrawdown,
            sharpeRatio: result.sharpeRatio,
            volatility: result.volatility,
            alpha: result.alpha,
            beta: result.beta,
            dividendYield: result.dividendYield,
            monthlyReturns: result.monthlyReturns,
          }
        : undefined,
    };
  }
}
