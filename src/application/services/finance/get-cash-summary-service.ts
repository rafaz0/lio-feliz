import type { IBankAccountRepository, ICashTransactionRepository } from "@/core/domain/finance";
import type { IApplicationService } from "@/application/application-service";
import type { GetCashSummaryQuery } from "@/application/queries/finance";
import type { CashSummaryDto } from "@/application/dtos/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class GetCashSummaryService implements IApplicationService<
  GetCashSummaryQuery,
  CashSummaryDto
> {
  constructor(
    private readonly accountRepo: IBankAccountRepository,
    private readonly txRepo: ICashTransactionRepository,
  ) {}

  async Execute(query: GetCashSummaryQuery): Promise<CashSummaryDto | ApplicationError> {
    const accounts = await this.accountRepo.findByUserId(query.userId);
    const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
    const transactions = await this.txRepo.findByUserId(query.userId);

    const recentTransactions = transactions
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 10)
      .map((tx) => ({
        id: tx.id.value,
        accountId: tx.accountId,
        type: tx.type,
        amount: tx.amount,
        description: tx.description,
        category: tx.category,
        date: tx.date.toISOString(),
        createdAt: tx.createdAt.toISOString(),
      }));

    return {
      totalBalance,
      accountCount: accounts.length,
      recentTransactions,
    };
  }
}
