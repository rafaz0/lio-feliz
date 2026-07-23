import type { SalvarEstrategiaCommand } from "@/application/commands/salvar-estrategia";
import type { StrategyDto } from "@/application/dtos/backtest";
import type { IApplicationService } from "@/application/application-service";
import type { IBacktestRepository } from "@/application/ports/backtest-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { Strategy, StrategyId } from "@/core/domain/backtests";

export class SalvarEstrategiaService implements IApplicationService<
  SalvarEstrategiaCommand,
  StrategyDto
> {
  constructor(private readonly backtestRepo: IBacktestRepository) {}

  async Execute(command: SalvarEstrategiaCommand): Promise<StrategyDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const strategy = Strategy.create({
      id: StrategyId.generate(),
      name: command.name,
      allocations: command.allocations,
      benchmark: command.benchmark,
      userId: command.userId,
      createdAt: new Date(),
      isActive: true,
    });

    await this.backtestRepo.saveStrategy(strategy);

    return {
      id: strategy.id.value,
      name: strategy.name,
      allocations: strategy.allocations.map((a) => ({
        assetTicker: a.assetTicker,
        weightPercentage: a.weightPercentage,
        assetType: a.assetType,
      })),
      benchmark: {
        ticker: strategy.benchmark.ticker,
        name: strategy.benchmark.name,
        type: strategy.benchmark.type,
      },
      userId: strategy.userId,
      createdAt: strategy.createdAt.toISOString(),
      isActive: strategy.isActive,
    };
  }

  private validar(command: SalvarEstrategiaCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.name) errors.name = ["Nome obrigatorio"];
    if (!command.allocations || command.allocations.length === 0) {
      errors.allocations = ["Pelo menos uma alocacao obrigatoria"];
    }
    if (command.allocations) {
      const total = command.allocations.reduce((s, a) => s + a.weightPercentage, 0);
      if (total > 100) errors.allocations = ["Alocacao total excede 100%"];
    }
    if (!command.benchmark?.ticker) errors.benchmark = ["Benchmark obrigatorio"];
    if (!command.userId) errors.userId = ["Usuario obrigatorio"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada invalidos", errors)
      : null;
  }
}
