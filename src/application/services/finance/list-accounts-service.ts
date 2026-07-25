import type { IBankAccountRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { ListAccountsQuery } from "@/application/queries/finance";
import type { BankAccountDto } from "@/application/dtos/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class ListAccountsService implements IApplicationService<
  ListAccountsQuery,
  BankAccountDto[]
> {
  constructor(private readonly repo: IBankAccountRepository) {}

  async Execute(query: ListAccountsQuery): Promise<BankAccountDto[] | ApplicationError> {
    const accounts = await this.repo.findByUserId(query.userId);
    return accounts.map((a) => ({
      id: a.id.value,
      name: a.name,
      institution: a.institution,
      type: a.type,
      balance: a.balance,
      currency: a.currency,
      createdAt: a.createdAt.toISOString(),
      updatedAt: a.updatedAt.toISOString(),
    }));
  }
}
