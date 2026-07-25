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

export interface CreateDebtDto {
  description: string;
  type: string;
  totalAmount: number;
  monthlyPayment: number;
  interestRate?: number;
  institution?: string;
  dueDay?: number;
}
