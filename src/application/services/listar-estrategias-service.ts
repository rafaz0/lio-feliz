import type { ListarEstrategiasQuery } from "@/application/queries/listar-estrategias";
import type { EstrategiaListDto } from "@/application/dtos/backtest";
import type { IApplicationService } from "@/application/application-service";
import type { IBacktestRepository } from "@/application/ports/backtest-repository";
import type { ApplicationError } from "@/application/errors/application-error";

export class ListarEstrategiasService implements IApplicationService<
  ListarEstrategiasQuery,
  EstrategiaListDto
> {
  constructor(private readonly backtestRepo: IBacktestRepository) {}

  async Execute(query: ListarEstrategiasQuery): Promise<EstrategiaListDto | ApplicationError> {
    const strategies = await this.backtestRepo.findStrategiesByUser(query.userId);

    return {
      strategies: strategies.map((s) => ({
        id: s.id.value,
        name: s.name,
        allocations: s.allocations.map((a) => ({
          assetTicker: a.assetTicker,
          weightPercentage: a.weightPercentage,
          assetType: a.assetType,
        })),
        benchmark: {
          ticker: s.benchmark.ticker,
          name: s.benchmark.name,
          type: s.benchmark.type,
        },
        userId: s.userId,
        createdAt: s.createdAt.toISOString(),
        isActive: s.isActive,
      })),
    };
  }
}
