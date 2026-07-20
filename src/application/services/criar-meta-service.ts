import type { CriarMetaCommand } from "@/application/commands/criar-meta";
import type { MetaListDto } from "@/application/dtos/metas";
import type { IApplicationService } from "@/application/application-service";
import type { IFinancialGoalRepository } from "@/application/ports/financial-goal-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { FinancialGoal, FinancialGoalId } from "@/core/domain/financial-goal";

export class CriarMetaService implements IApplicationService<CriarMetaCommand, MetaListDto> {
  constructor(private readonly goalRepo: IFinancialGoalRepository) {}

  async Execute(command: CriarMetaCommand): Promise<MetaListDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const goalId = FinancialGoalId.create(`goal-${command.portfolioId}-${Date.now()}`);
    const result = FinancialGoal.create(
      goalId,
      command.name,
      command.targetAmount,
      command.targetDate,
      command.category,
      `correlation-${Date.now()}`,
    );

    if (result.isFailure) {
      return new ValidationError("DOMAIN_ERROR", result.error!.message);
    }

    const goal = result.value!;
    await this.goalRepo.save(goal);

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
  }

  private validar(command: CriarMetaCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};

    if (!command.portfolioId) errors.portfolioId = ["Campo obrigatório"];
    if (!command.name || command.name.trim().length === 0) errors.name = ["Nome é obrigatório"];
    if (!command.targetAmount || command.targetAmount <= 0)
      errors.targetAmount = ["Deve ser maior que zero"];
    if (!command.targetDate) errors.targetDate = ["Prazo é obrigatório"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}
