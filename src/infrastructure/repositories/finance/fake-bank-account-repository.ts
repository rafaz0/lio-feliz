import type { IBankAccountRepository } from "@/core/domain/finance";
import { BankAccount, BankAccountId, AccountType } from "@/core/domain/finance";

export class FakeBankAccountRepository implements IBankAccountRepository {
  private store: Map<string, BankAccount> = new Map();

  async findById(id: string): Promise<BankAccount | null> {
    return this.store.get(id) ?? null;
  }

  async findByUserId(_userId: string): Promise<BankAccount[]> {
    return Array.from(this.store.values());
  }

  async save(account: BankAccount): Promise<void> {
    this.store.set(account.id.value, account);
  }

  async update(account: BankAccount): Promise<void> {
    this.store.set(account.id.value, account);
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  seed(): void {
    const id1 = BankAccountId.create("acc-001");
    const id2 = BankAccountId.create("acc-002");
    this.store.set(
      id1.value,
      BankAccount.restore(id1, {
        name: "Conta Corrente",
        institution: "Nubank",
        type: AccountType.CHECKING,
        balance: 5000,
        currency: "BRL",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      }),
    );
    this.store.set(
      id2.value,
      BankAccount.restore(id2, {
        name: "Poupança",
        institution: "Caixa",
        type: AccountType.SAVINGS,
        balance: 15000,
        currency: "BRL",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
      }),
    );
  }
}
