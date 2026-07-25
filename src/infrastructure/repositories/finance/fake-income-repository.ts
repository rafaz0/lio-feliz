import type { IIncomeRepository } from "@/core/domain/finance";
import { IncomeEntry, IncomeId, IncomeCategory } from "@/core/domain/finance";

export class FakeIncomeRepository implements IIncomeRepository {
  private store: Map<string, IncomeEntry> = new Map();

  async findById(id: string): Promise<IncomeEntry | null> {
    return this.store.get(id) ?? null;
  }
  async findByUserId(_userId: string): Promise<IncomeEntry[]> {
    return Array.from(this.store.values());
  }
  async save(income: IncomeEntry): Promise<void> {
    this.store.set(income.id.value, income);
  }
  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  seed(): void {
    const id1 = IncomeId.create("inc-001");
    const r1 = IncomeEntry.create(id1, "user-1", "Salário", 8000, IncomeCategory.SALARY);
    if (r1.isSuccess) this.store.set(id1.value, r1.value);
  }
}
