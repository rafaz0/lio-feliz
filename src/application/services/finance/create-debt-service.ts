import { ValidationError } from "@/application/errors/application-error";
import { Debt, DebtId, DebtType } from "@/core/domain/finance";
import type { IDebtRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { CreateDebtCommand } from "@/application/commands/finance";
import type { DebtDto } from "@/application/dtos/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class CreateDebtService implements IApplicationService<CreateDebtCommand, DebtDto> {
  constructor(private readonly repo: IDebtRepository) {}

  async Execute(command: CreateDebtCommand): Promise<DebtDto | ApplicationError> {
    if (!command.description?.trim())
      return new ValidationError("VALID_ERROR", "Descrição é obrigatória");
    if (command.totalAmount <= 0)
      return new ValidationError("VALID_ERROR", "Valor total deve ser positivo");

    const debtType = Object.values(DebtType).includes(command.debtType as DebtType)
      ? (command.debtType as DebtType)
      : DebtType.OTHER;

    const result = Debt.create(
      DebtId.generate(),
      command.userId,
      command.description.trim(),
      debtType,
      command.totalAmount,
      command.monthlyPayment,
      command.interestRate,
      command.institution,
      command.dueDay,
    );
    if (result.isFailure) return result.error as ApplicationError;

    await this.repo.save(result.value);
    const d = result.value;
    return {
      id: d.id.value,
      description: d.description,
      type: d.type,
      totalAmount: d.totalAmount,
      outstandingBalance: d.outstandingBalance,
      monthlyPayment: d.monthlyPayment,
      interestRate: d.interestRate,
      institution: d.institution,
      dueDay: d.dueDay,
      createdAt: d.createdAt.toISOString(),
      updatedAt: d.updatedAt.toISOString(),
    };
  }
}
