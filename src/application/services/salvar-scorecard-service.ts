import type { SalvarScorecardCommand } from "@/application/commands/salvar-scorecard";
import type { ScorecardDto } from "@/application/dtos/comparacao";
import type { IApplicationService } from "@/application/application-service";
import type { IComparisonRepository } from "@/application/ports/comparison-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { ComparisonAggregator } from "@/core/domain/comparison";

export class SalvarScorecardService
  implements IApplicationService<SalvarScorecardCommand, ScorecardDto>
{
  private readonly aggregator = new ComparisonAggregator();

  constructor(
    private readonly comparisonRepo: IComparisonRepository,
    private readonly projectionRepo: import("@/application/ports/projection-repository").IProjectionRepository,
  ) {}

  async Execute(command: SalvarScorecardCommand): Promise<ScorecardDto | ApplicationError> {
    const comparisonSet = await this.comparisonRepo.findComparisonSetById(command.comparisonSetId);
    if (!comparisonSet) {
      return new NotFoundError("ComparisonSet", command.comparisonSetId);
    }

    const projections = [];
    for (const entry of comparisonSet.entries) {
      try {
        const proj = await this.projectionRepo.obterSerieMensal(entry.assetTicker);
        projections.push({
          assetTicker: entry.assetTicker,
          monthlyReturns: proj?.monthlyReturns ?? [],
          dividendYield12m: proj?.dividendYield12m ?? 0,
        });
      } catch {
        projections.push({ assetTicker: entry.assetTicker, monthlyReturns: [], dividendYield12m: 0 });
      }
    }

    const result = this.aggregator.aggregate(comparisonSet, projections);
    if (result.isFailure || !result.value) {
      return new NotFoundError("Scorecard", "aggregation_failed");
    }

    await this.comparisonRepo.saveScorecard(result.value);

    return {
      id: result.value.id.value,
      comparisonSetId: result.value.comparisonSetId,
      metrics: result.value.metrics,
      generatedAt: result.value.generatedAt.toISOString(),
    };
  }
}
