import type { ICashTransactionRepository } from "@/core/domain/finance";
import { CashTransaction, TransactionId, TransactionType } from "@/core/domain/finance";

export class FakeCashTransactionRepository implements ICashTransactionRepository {
  private store: Map<string, CashTransaction> = new Map();

  async findById(id: string): Promise<CashTransaction | null> {
    return this.store.get(id) ?? null;
  }

  async findByAccountId(accountId: string): Promise<CashTransaction[]> {
    return Array.from(this.store.values()).filter((t) => t.accountId === accountId);
  }

  async findByUserId(_userId: string): Promise<CashTransaction[]> {
    return Array.from(this.store.values());
  }

  async save(transaction: CashTransaction): Promise<void> {
    this.store.set(transaction.id.value, transaction);
  }

  seed(): void {
    const id1 = TransactionId.create("tx-001");
    const tx = CashTransaction.restore(id1, {
      accountId: "acc-001",
      type: TransactionType.INCOME,
      amount: 5000,
      description: "Salário",
      category: "Salário",
      date: new Date(),
      createdAt: new Date(),
    });
    this.store.set(id1.value, tx);
  }
}
