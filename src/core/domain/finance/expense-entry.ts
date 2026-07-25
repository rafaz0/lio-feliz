import { Entity, Result } from "@/core/domain";
import { EntityId } from "@/core/domain";
import { ExpenseCategory } from "./expense-category";
import { InvalidTransactionError } from "./finance-errors";

export class ExpenseId extends EntityId<string> {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string) {
    return new ExpenseId(value);
  }
  static generate() {
    return new ExpenseId(crypto.randomUUID());
  }
}

export interface ExpenseEntryProps {
  userId: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  dueDate: Date;
  paidAt?: Date;
  isRecurring: boolean;
  createdAt: Date;
}

export class ExpenseEntry extends Entity<ExpenseId> {
  public readonly userId: string;
  public readonly description: string;
  public readonly amount: number;
  public readonly category: ExpenseCategory;
  public readonly dueDate: Date;
  public readonly paidAt?: Date;
  public readonly isRecurring: boolean;
  public readonly createdAt: Date;

  private constructor(id: ExpenseId, props: ExpenseEntryProps) {
    super(id);
    this.userId = props.userId;
    this.description = props.description;
    this.amount = props.amount;
    this.category = props.category;
    this.dueDate = props.dueDate;
    this.paidAt = props.paidAt;
    this.isRecurring = props.isRecurring;
    this.createdAt = props.createdAt;
  }

  static create(
    id: ExpenseId,
    userId: string,
    description: string,
    amount: number,
    category: ExpenseCategory,
    dueDate: Date,
    paidAt?: Date,
    isRecurring?: boolean,
  ): Result<ExpenseEntry, InvalidTransactionError> {
    if (!description.trim())
      return Result.fail(new InvalidTransactionError("Descrição é obrigatória"));
    if (amount <= 0) return Result.fail(new InvalidTransactionError("Valor deve ser positivo"));
    return Result.ok(
      new ExpenseEntry(id, {
        userId,
        description,
        amount,
        category,
        dueDate,
        paidAt,
        isRecurring: isRecurring ?? false,
        createdAt: new Date(),
      }),
    );
  }

  static restore(id: ExpenseId, props: ExpenseEntryProps): ExpenseEntry {
    return new ExpenseEntry(id, props);
  }

  markAsPaid(date: Date): ExpenseEntry {
    return ExpenseEntry.restore(this.id, { ...this.props, paidAt: date });
  }

  private get props(): ExpenseEntryProps {
    return {
      userId: this.userId,
      description: this.description,
      amount: this.amount,
      category: this.category,
      dueDate: this.dueDate,
      paidAt: this.paidAt,
      isRecurring: this.isRecurring,
      createdAt: this.createdAt,
    };
  }
}
