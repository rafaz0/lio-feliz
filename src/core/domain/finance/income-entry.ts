import { Entity, Result } from "@/core/domain";
import { EntityId } from "@/core/domain";
import { IncomeCategory } from "./income-category";
import { InvalidTransactionError } from "./finance-errors";

export class IncomeId extends EntityId<string> {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string) {
    return new IncomeId(value);
  }
  static generate() {
    return new IncomeId(crypto.randomUUID());
  }
}

export interface IncomeEntryProps {
  userId: string;
  description: string;
  amount: number;
  category: IncomeCategory;
  date: Date;
  recurrence: "none" | "monthly" | "yearly";
  createdAt: Date;
}

export class IncomeEntry extends Entity<IncomeId> {
  public readonly userId: string;
  public readonly description: string;
  public readonly amount: number;
  public readonly category: IncomeCategory;
  public readonly date: Date;
  public readonly recurrence: "none" | "monthly" | "yearly";
  public readonly createdAt: Date;

  private constructor(id: IncomeId, props: IncomeEntryProps) {
    super(id);
    this.userId = props.userId;
    this.description = props.description;
    this.amount = props.amount;
    this.category = props.category;
    this.date = props.date;
    this.recurrence = props.recurrence;
    this.createdAt = props.createdAt;
  }

  static create(
    id: IncomeId,
    userId: string,
    description: string,
    amount: number,
    category: IncomeCategory,
    date?: Date,
    recurrence?: "none" | "monthly" | "yearly",
  ): Result<IncomeEntry, InvalidTransactionError> {
    if (!description.trim())
      return Result.fail(new InvalidTransactionError("Descrição é obrigatória"));
    if (amount <= 0) return Result.fail(new InvalidTransactionError("Valor deve ser positivo"));
    return Result.ok(
      new IncomeEntry(id, {
        userId,
        description,
        amount,
        category,
        date: date ?? new Date(),
        recurrence: recurrence ?? "none",
        createdAt: new Date(),
      }),
    );
  }

  static restore(id: IncomeId, props: IncomeEntryProps): IncomeEntry {
    return new IncomeEntry(id, props);
  }
}
