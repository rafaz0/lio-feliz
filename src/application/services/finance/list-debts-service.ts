import type { IDebtRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { ListDebtsQuery } from "@/application/queries/finance";
import type { DebtDto } from "@/application/dtos/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class ListDebtsService implements IApplicationService<ListDebtsQuery, DebtDto[]> {
  constructor(private readonly repo: IDebtRepository) {}
  async Execute(query: ListDebtsQuery): Promise<DebtDto[] | ApplicationError> {
    const items = await this.repo.findByUserId(query.userId);
    return items.map((d) => ({
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
    }));
  }
}
