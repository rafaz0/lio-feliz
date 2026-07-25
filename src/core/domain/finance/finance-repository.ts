import type { BankAccount } from "./bank-account";
import type { CashTransaction } from "./cash-transaction";

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
