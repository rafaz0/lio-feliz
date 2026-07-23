import type { ObterComparacaoQuery } from "@/application/queries/obter-comparacao";
import type { ComparisonSetDto } from "@/application/dtos/comparacao";
import type { IApplicationService } from "@/application/application-service";
import type { IComparisonRepository } from "@/application/ports/comparison-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterComparacaoService implements IApplicationService<
  ObterComparacaoQuery,
  ComparisonSetDto
> {
  constructor(private readonly comparisonRepo: IComparisonRepository) {}

  async Execute(query: ObterComparacaoQuery): Promise<ComparisonSetDto | ApplicationError> {
    const comparisonSet = await this.comparisonRepo.findComparisonSetById(query.comparisonSetId);
    if (!comparisonSet) {
      return new NotFoundError("ComparisonSet", query.comparisonSetId);
    }

    const scorecard = await this.comparisonRepo.findScorecardByComparisonSet(query.comparisonSetId);

    return {
      comparisonSet: {
        id: comparisonSet.id.value,
        name: comparisonSet.name,
        entries: comparisonSet.entries.map((e) => ({
          assetTicker: e.assetTicker,
          assetType: e.assetType,
          weight: e.weight,
        })),
        scope: comparisonSet.scope,
        userId: comparisonSet.userId,
        createdAt: comparisonSet.createdAt.toISOString(),
      },
      scorecard: scorecard
        ? {
            id: scorecard.id.value,
            comparisonSetId: scorecard.comparisonSetId,
            metrics: scorecard.metrics,
            generatedAt: scorecard.generatedAt.toISOString(),
          }
        : undefined,
    };
  }
}
