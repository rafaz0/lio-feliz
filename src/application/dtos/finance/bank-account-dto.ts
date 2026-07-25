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

export interface CreateIncomeDto {
  description: string;
  amount: number;
  category: string;
  date?: string;
  recurrence?: string;
}

export interface CreateExpenseDto {
  description: string;
  amount: number;
  category: string;
  dueDate: string;
  paidAt?: string;
  isRecurring?: boolean;
}
