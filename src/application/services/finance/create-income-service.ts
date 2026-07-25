import { ValidationError } from "@/application/errors/application-error";
import { IncomeEntry, IncomeId, IncomeCategory } from "@/core/domain/finance";
import type { IIncomeRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { CreateIncomeCommand } from "@/application/commands/finance";
import type { IncomeDto } from "@/application/dtos/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class CreateIncomeService implements IApplicationService<CreateIncomeCommand, IncomeDto> {
  constructor(private readonly repo: IIncomeRepository) {}

  async Execute(command: CreateIncomeCommand): Promise<IncomeDto | ApplicationError> {
    if (!command.description?.trim())
      return new ValidationError("VALID_ERROR", "Descrição é obrigatória");
    if (command.amount <= 0) return new ValidationError("VALID_ERROR", "Valor deve ser positivo");

    const category = Object.values(IncomeCategory).includes(command.category as IncomeCategory)
      ? (command.category as IncomeCategory)
      : IncomeCategory.OTHER;

    const result = IncomeEntry.create(
      IncomeId.generate(),
      command.userId,
      command.description.trim(),
      command.amount,
      category,
      command.date ? new Date(command.date) : undefined,
      command.recurrence as "none" | "monthly" | "yearly" | undefined,
    );
    if (result.isFailure) return result.error as ApplicationError;

    await this.repo.save(result.value);
    const e = result.value;
    return {
      id: e.id.value,
      description: e.description,
      amount: e.amount,
      category: e.category,
      date: e.date.toISOString(),
      recurrence: e.recurrence,
      createdAt: e.createdAt.toISOString(),
    };
  }
}
