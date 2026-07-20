import type { ObterMetasQuery } from "@/application/queries/obter-metas";
import type { MetaListDto } from "@/application/dtos/metas";
import type { IApplicationService } from "@/application/application-service";
import type { IFinancialGoalRepository } from "@/application/ports/financial-goal-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterMetasService implements IApplicationService<ObterMetasQuery, MetaListDto[]> {
  constructor(private readonly goalRepo: IFinancialGoalRepository) {}

  async Execute(query: ObterMetasQuery): Promise<MetaListDto[] | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    let goals = await this.goalRepo.findAll(query.portfolioId);

    if (query.status) {
      goals = goals.filter((g) => g.status === query.status);
    }

    if (query.category) {
      goals = goals.filter((g) => g.category === query.category);
    }

    return goals.map((goal) => {
      const progress = goal.calculateProgress();
      return {
        id: goal.id.value,
        name: goal.name,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        percentage: progress.percentage,
        targetDate: goal.targetDate,
        category: goal.category,
        status: goal.status,
      };
    });
  }
}
