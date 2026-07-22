import type { ObterScorecardQuery } from "@/application/queries/obter-scorecard";
import type { ScorecardDto } from "@/application/dtos/comparacao";
import type { IApplicationService } from "@/application/application-service";
import type { IComparisonRepository } from "@/application/ports/comparison-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterScorecardService
  implements IApplicationService<ObterScorecardQuery, ScorecardDto>
{
  constructor(private readonly comparisonRepo: IComparisonRepository) {}

  async Execute(query: ObterScorecardQuery): Promise<ScorecardDto | ApplicationError> {
    const scorecard = await this.comparisonRepo.findScorecardById(query.scorecardId);
    if (!scorecard) {
      return new NotFoundError("Scorecard", query.scorecardId);
    }

    return {
      id: scorecard.id.value,
      comparisonSetId: scorecard.comparisonSetId,
      metrics: scorecard.metrics,
      generatedAt: scorecard.generatedAt.toISOString(),
    };
  }
}
