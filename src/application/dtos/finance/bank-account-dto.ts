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

export interface CreateBankAccountDto {
  name: string;
  institution: string;
  type: string;
  currency?: string;
}

export interface UpdateBankAccountDto {
  name?: string;
  institution?: string;
  type?: string;
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

export interface CreateTransactionDto {
  accountId: string;
  type: string;
  amount: number;
  description: string;
  category?: string;
  date?: string;
}

export interface CashSummaryDto {
  totalBalance: number;
  accountCount: number;
  recentTransactions: CashTransactionDto[];
}
