export interface BankAccountDto {
  id: string;
  name: string;
  institution: string;
  type: string;
  balance: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface CashTransactionDto {
  id: string;
  accountId: string;
  type: string;
  amount: number;
  description: string;
  category?: string;
  date: string;
  createdAt: string;
}

export interface CashSummaryDto {
  totalBalance: number;
  accountCount: number;
  recentTransactions: CashTransactionDto[];
}

export interface IncomeDto {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  recurrence: string;
  createdAt: string;
}

export interface ExpenseDto {
  id: string;
  description: string;
  amount: number;
  category: string;
  dueDate: string;
  paidAt?: string;
  isRecurring: boolean;
  createdAt: string;
}

export interface DebtDto {
  id: string;
  description: string;
  type: string;
  totalAmount: number;
  outstandingBalance: number;
  monthlyPayment: number;
  interestRate?: number;
  institution?: string;
  dueDay?: number;
  createdAt: string;
  updatedAt: string;
}

export interface GlobalWealthDto {
  totalCash: number;
  totalInvested: number;
  totalDebt: number;
  netWorth: number;
  accountCount: number;
  debtCount: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlyNet: number;
  updatedAt: string;
}

export interface PortfolioSummaryDto {
  totalValue: number;
  totalInvested: number;
  totalPnl: number;
}
