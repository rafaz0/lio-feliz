import type { IExpenseRepository } from "@/core/domain/finance";
import { ExpenseEntry, ExpenseId, ExpenseCategory } from "@/core/domain/finance";

export class FakeExpenseRepository implements IExpenseRepository {
  private store: Map<string, ExpenseEntry> = new Map();

  async findById(id: string): Promise<ExpenseEntry | null> {
    return this.store.get(id) ?? null;
  }
  async findByUserId(_userId: string): Promise<ExpenseEntry[]> {
    return Array.from(this.store.values());
  }
  async save(expense: ExpenseEntry): Promise<void> {
    this.store.set(expense.id.value, expense);
  }
  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  seed(): void {
    const id1 = ExpenseId.create("exp-001");
    const r1 = ExpenseEntry.create(
      id1,
      "user-1",
      "Aluguel",
      1800,
      ExpenseCategory.HOUSING,
      new Date(2026, 7, 5),
    );
    if (r1.isSuccess) this.store.set(id1.value, r1.value);
  }
}
