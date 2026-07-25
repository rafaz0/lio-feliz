import type { IIncomeRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { ListIncomesQuery } from "@/application/queries/finance";
import type { IncomeDto } from "@/application/dtos/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class ListIncomesService implements IApplicationService<ListIncomesQuery, IncomeDto[]> {
  constructor(private readonly repo: IIncomeRepository) {}
  async Execute(query: ListIncomesQuery): Promise<IncomeDto[] | ApplicationError> {
    const items = await this.repo.findByUserId(query.userId);
    return items.map((e) => ({
      id: e.id.value,
      description: e.description,
      amount: e.amount,
      category: e.category,
      date: e.date.toISOString(),
      recurrence: e.recurrence,
      createdAt: e.createdAt.toISOString(),
    }));
  }
}
