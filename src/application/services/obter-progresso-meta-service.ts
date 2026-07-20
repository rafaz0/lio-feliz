import type { ObterProgressoMetaQuery } from "@/application/queries/obter-progresso-meta";
import type { MetaProgressoDetalhadoDto } from "@/application/dtos/metas";
import type { IApplicationService } from "@/application/application-service";
import type { IFinancialGoalRepository } from "@/application/ports/financial-goal-repository";
import { ValidationError, NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterProgressoMetaService
  implements IApplicationService<ObterProgressoMetaQuery, MetaProgressoDetalhadoDto>
{
  constructor(private readonly goalRepo: IFinancialGoalRepository) {}

  async Execute(
    query: ObterProgressoMetaQuery,
  ): Promise<MetaProgressoDetalhadoDto | ApplicationError> {
    if (!query.goalId) {
      return new ValidationError("VALID_ERROR", "goalId é obrigatório");
    }

    const goal = await this.goalRepo.findById(query.goalId);
    if (!goal) {
      return new NotFoundError("Meta", query.goalId, "META_NOT_FOUND", "Meta não encontrada");
    }

    const progress = goal.calculateProgress();

    return {
      id: goal.id.value,
      name: goal.name,
      percentage: progress.percentage,
      projectedDate: progress.projectedDate,
      onTrack: progress.onTrack,
      contributions: goal.contributions.length,
      monthlyAverage: progress.monthlyAverage,
      currentAmount: progress.currentAmount,
      targetAmount: progress.targetAmount,
      remainingAmount: progress.remainingAmount,
    };
  }
}
