import type { IDebtRepository } from "@/core/domain/finance";
import { Debt, DebtId, DebtType } from "@/core/domain/finance";

export class FakeDebtRepository implements IDebtRepository {
  private store: Map<string, Debt> = new Map();

  async findById(id: string): Promise<Debt | null> {
    return this.store.get(id) ?? null;
  }
  async findByUserId(_userId: string): Promise<Debt[]> {
    return Array.from(this.store.values());
  }
  async save(debt: Debt): Promise<void> {
    this.store.set(debt.id.value, debt);
  }
  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  seed(): void {
    const id1 = DebtId.create("debt-001");
    const id2 = DebtId.create("debt-002");
    const r1 = Debt.create(
      id1,
      "user-1",
      "Cartão Nubank",
      DebtType.CREDIT_CARD,
      5200,
      350,
      14.9,
      "Nubank",
      15,
    );
    const r2 = Debt.create(
      id2,
      "user-1",
      "Financiamento Imóvel",
      DebtType.FINANCING,
      350000,
      2800,
      9.5,
      "Caixa",
      5,
    );
    if (r1.isSuccess) this.store.set(id1.value, r1.value);
    if (r2.isSuccess) this.store.set(id2.value, r2.value);
  }
}
