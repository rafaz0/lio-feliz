import type { IExpenseRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { ListExpensesQuery } from "@/application/queries/finance";
import type { ExpenseDto } from "@/application/dtos/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class ListExpensesService implements IApplicationService<ListExpensesQuery, ExpenseDto[]> {
  constructor(private readonly repo: IExpenseRepository) {}
  async Execute(query: ListExpensesQuery): Promise<ExpenseDto[] | ApplicationError> {
    const items = await this.repo.findByUserId(query.userId);
    return items.map((e) => ({
      id: e.id.value,
      description: e.description,
      amount: e.amount,
      category: e.category,
      dueDate: e.dueDate.toISOString(),
      paidAt: e.paidAt?.toISOString(),
      isRecurring: e.isRecurring,
      createdAt: e.createdAt.toISOString(),
    }));
  }
}
