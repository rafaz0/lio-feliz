import { ValidationError } from "@/application/errors/application-error";
import { ExpenseEntry, ExpenseId, ExpenseCategory } from "@/core/domain/finance";
import type { IExpenseRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { CreateExpenseCommand } from "@/application/commands/finance";
import type { ExpenseDto } from "@/application/dtos/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class CreateExpenseService implements IApplicationService<CreateExpenseCommand, ExpenseDto> {
  constructor(private readonly repo: IExpenseRepository) {}

  async Execute(command: CreateExpenseCommand): Promise<ExpenseDto | ApplicationError> {
    if (!command.description?.trim())
      return new ValidationError("VALID_ERROR", "Descrição é obrigatória");
    if (command.amount <= 0) return new ValidationError("VALID_ERROR", "Valor deve ser positivo");

    const category = Object.values(ExpenseCategory).includes(command.category as ExpenseCategory)
      ? (command.category as ExpenseCategory)
      : ExpenseCategory.OTHER;

    const result = ExpenseEntry.create(
      ExpenseId.generate(),
      command.userId,
      command.description.trim(),
      command.amount,
      category,
      new Date(command.dueDate),
      command.paidAt ? new Date(command.paidAt) : undefined,
      command.isRecurring,
    );
    if (result.isFailure) return result.error as ApplicationError;

    await this.repo.save(result.value);
    const e = result.value;
    return {
      id: e.id.value,
      description: e.description,
      amount: e.amount,
      category: e.category,
      dueDate: e.dueDate.toISOString(),
      paidAt: e.paidAt?.toISOString(),
      isRecurring: e.isRecurring,
      createdAt: e.createdAt.toISOString(),
    };
  }
}
