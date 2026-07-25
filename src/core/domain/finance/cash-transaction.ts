import { Entity, Result } from "@/core/domain";
import { TransactionId } from "./transaction-id";
import { TransactionType } from "./transaction-type";
import { InvalidTransactionError } from "./finance-errors";

export interface CashTransactionProps {
  accountId: string;
  type: TransactionType;
  amount: number;
  description: string;
  category?: string;
  date: Date;
  createdAt: Date;
}

export class CashTransaction extends Entity<TransactionId> {
  public readonly accountId: string;
  public readonly type: TransactionType;
  public readonly amount: number;
  public readonly description: string;
  public readonly category?: string;
  public readonly date: Date;
  public readonly createdAt: Date;

  private constructor(id: TransactionId, props: CashTransactionProps) {
    super(id);
    this.accountId = props.accountId;
    this.type = props.type;
    this.amount = props.amount;
    this.description = props.description;
    this.category = props.category;
    this.date = props.date;
    this.createdAt = props.createdAt;
  }

  static create(
    id: TransactionId,
    accountId: string,
    type: TransactionType,
    amount: number,
    description: string,
    category?: string,
    date?: Date,
  ): Result<CashTransaction, InvalidTransactionError> {
    if (amount <= 0) {
      return Result.fail(new InvalidTransactionError("Valor da transação deve ser positivo"));
    }
    if (!description.trim()) {
      return Result.fail(new InvalidTransactionError("Descrição é obrigatória"));
    }
    return Result.ok(
      new CashTransaction(id, {
        accountId,
        type,
        amount,
        description,
        category,
        date: date ?? new Date(),
        createdAt: new Date(),
      }),
    );
  }

  static restore(id: TransactionId, props: CashTransactionProps): CashTransaction {
    return new CashTransaction(id, props);
  }
}
