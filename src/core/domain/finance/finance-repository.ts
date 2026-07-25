import type { BankAccount } from "./bank-account";
import type { CashTransaction } from "./cash-transaction";
import type { IncomeEntry } from "./income-entry";
import type { ExpenseEntry } from "./expense-entry";
import type { Debt } from "./debt";

export interface IBankAccountRepository {
  findById(id: string): Promise<BankAccount | null>;
  findByUserId(userId: string): Promise<BankAccount[]>;
  save(account: BankAccount): Promise<void>;
  update(account: BankAccount): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface ICashTransactionRepository {
  findById(id: string): Promise<CashTransaction | null>;
  findByAccountId(accountId: string): Promise<CashTransaction[]>;
  findByUserId(userId: string): Promise<CashTransaction[]>;
  save(transaction: CashTransaction): Promise<void>;
}

export interface IIncomeRepository {
  findById(id: string): Promise<IncomeEntry | null>;
  findByUserId(userId: string): Promise<IncomeEntry[]>;
  save(income: IncomeEntry): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IExpenseRepository {
  findById(id: string): Promise<ExpenseEntry | null>;
  findByUserId(userId: string): Promise<ExpenseEntry[]>;
  save(expense: ExpenseEntry): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IDebtRepository {
  findById(id: string): Promise<Debt | null>;
  findByUserId(userId: string): Promise<Debt[]>;
  save(debt: Debt): Promise<void>;
  delete(id: string): Promise<void>;
}
