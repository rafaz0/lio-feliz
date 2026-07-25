import type { IApplicationService } from "@/application/application-service";
import type { GlobalWealthDto, PortfolioSummaryDto } from "@/application/dtos/finance";
import type {
  IBankAccountRepository,
  ICashTransactionRepository,
  IDebtRepository,
  IIncomeRepository,
  IExpenseRepository,
} from "@/core/domain/finance";
import type { ApplicationError } from "@/application/errors/application-error";

export class GetGlobalWealthService implements IApplicationService<
  { type: "GetGlobalWealthQuery"; userId: string },
  GlobalWealthDto
> {
  constructor(
    private readonly accountRepo: IBankAccountRepository,
    private readonly txRepo: ICashTransactionRepository,
    private readonly incomeRepo: IIncomeRepository,
    private readonly expenseRepo: IExpenseRepository,
    private readonly debtRepo: IDebtRepository,
    private readonly getPortfolio?: () => Promise<PortfolioSummaryDto>,
  ) {}

  async Execute(query: {
    type: "GetGlobalWealthQuery";
    userId: string;
  }): Promise<GlobalWealthDto | ApplicationError> {
    const [accounts, incomes, expenses, debts] = await Promise.all([
      this.accountRepo.findByUserId(query.userId),
      this.incomeRepo.findByUserId(query.userId),
      this.expenseRepo.findByUserId(query.userId),
      this.debtRepo.findByUserId(query.userId),
    ]);

    const totalCash = accounts.reduce((s, a) => s + a.balance, 0);
    const totalDebt = debts.reduce((s, d) => s + d.outstandingBalance, 0);

    const portfolio = this.getPortfolio
      ? await this.getPortfolio().catch(() => undefined)
      : undefined;
    const totalInvested = portfolio?.totalValue ?? 0;

    const netWorth = totalCash + totalInvested - totalDebt;

    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyIncome = incomes
      .filter((i) => i.date >= firstOfMonth)
      .reduce((s, i) => s + i.amount, 0);
    const monthlyExpenses = expenses
      .filter((e) => e.dueDate >= firstOfMonth)
      .reduce((s, e) => s + e.amount, 0);

    return {
      totalCash,
      totalInvested,
      totalDebt,
      netWorth,
      accountCount: accounts.length,
      debtCount: debts.length,
      monthlyIncome,
      monthlyExpenses,
      monthlyNet: monthlyIncome - monthlyExpenses,
      updatedAt: now.toISOString(),
    };
  }
}
