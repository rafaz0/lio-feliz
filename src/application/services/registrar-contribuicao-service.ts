import type { RegistrarContribuicaoCommand } from "@/application/commands/registrar-contribuicao";
import type { MetaProgressoDetalhadoDto } from "@/application/dtos/metas";
import type { IApplicationService } from "@/application/application-service";
import type { IFinancialGoalRepository } from "@/application/ports/financial-goal-repository";
import { ValidationError, NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class RegistrarContribuicaoService
  implements IApplicationService<RegistrarContribuicaoCommand, MetaProgressoDetalhadoDto>
{
  constructor(private readonly goalRepo: IFinancialGoalRepository) {}

  async Execute(
    command: RegistrarContribuicaoCommand,
  ): Promise<MetaProgressoDetalhadoDto | ApplicationError> {
    if (!command.goalId) {
      return new ValidationError("VALID_ERROR", "goalId é obrigatório");
    }

    if (!command.amount || command.amount <= 0) {
      return new ValidationError("VALID_ERROR", "amount deve ser maior que zero");
    }

    const goal = await this.goalRepo.findById(command.goalId);
    if (!goal) {
      return new NotFoundError("Meta", command.goalId, "META_NOT_FOUND", "Meta não encontrada");
    }

    const result = goal.contribute(command.amount, command.date ?? new Date(), `correlation-${Date.now()}`);
    if (result.isFailure) {
      return new ValidationError("DOMAIN_ERROR", result.error!.message);
    }

    const updatedGoal = result.value!;
    await this.goalRepo.save(updatedGoal);

    const progress = updatedGoal.calculateProgress();

    return {
      id: updatedGoal.id.value,
      name: updatedGoal.name,
      percentage: progress.percentage,
      projectedDate: progress.projectedDate,
      onTrack: progress.onTrack,
      contributions: updatedGoal.contributions.length,
      monthlyAverage: progress.monthlyAverage,
      currentAmount: progress.currentAmount,
      targetAmount: progress.targetAmount,
      remainingAmount: progress.remainingAmount,
    };
  }
}
