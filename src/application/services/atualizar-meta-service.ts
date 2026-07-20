import type { AtualizarMetaCommand } from "@/application/commands/atualizar-meta";
import type { MetaListDto } from "@/application/dtos/metas";
import type { IApplicationService } from "@/application/application-service";
import type { IFinancialGoalRepository } from "@/application/ports/financial-goal-repository";
import { ValidationError, NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class AtualizarMetaService implements IApplicationService<AtualizarMetaCommand, MetaListDto> {
  constructor(private readonly goalRepo: IFinancialGoalRepository) {}

  async Execute(command: AtualizarMetaCommand): Promise<MetaListDto | ApplicationError> {
    if (!command.goalId) {
      return new ValidationError("VALID_ERROR", "goalId é obrigatório");
    }

    const goal = await this.goalRepo.findById(command.goalId);
    if (!goal) {
      return new NotFoundError("Meta", command.goalId, "META_NOT_FOUND", "Meta não encontrada");
    }

    const name = command.name ?? goal.name;
    const targetAmount = command.targetAmount ?? goal.targetAmount;
    const targetDate = command.targetDate ?? goal.targetDate;
    const category = command.category ?? goal.category;

    const result = goal.updateDetails(name, targetAmount, targetDate, category);
    if (result.isFailure) {
      return new ValidationError("DOMAIN_ERROR", result.error!.message);
    }

    const updatedGoal = result.value!;
    await this.goalRepo.save(updatedGoal);

    const progress = updatedGoal.calculateProgress();

    return {
      id: updatedGoal.id.value,
      name: updatedGoal.name,
      targetAmount: updatedGoal.targetAmount,
      currentAmount: updatedGoal.currentAmount,
      percentage: progress.percentage,
      targetDate: updatedGoal.targetDate,
      category: updatedGoal.category,
      status: updatedGoal.status,
    };
  }
}
