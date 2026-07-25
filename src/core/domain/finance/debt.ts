import { Entity, Result } from "@/core/domain";
import { EntityId } from "@/core/domain";
import { DebtType } from "./debt-type";
import { InvalidTransactionError } from "./finance-errors";

export class DebtId extends EntityId<string> {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string) {
    return new DebtId(value);
  }
  static generate() {
    return new DebtId(crypto.randomUUID());
  }
}

export interface DebtProps {
  userId: string;
  description: string;
  type: DebtType;
  totalAmount: number;
  outstandingBalance: number;
  monthlyPayment: number;
  interestRate?: number;
  institution?: string;
  dueDay?: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Debt extends Entity<DebtId> {
  public readonly userId: string;
  public readonly description: string;
  public readonly type: DebtType;
  public readonly totalAmount: number;
  public readonly outstandingBalance: number;
  public readonly monthlyPayment: number;
  public readonly interestRate?: number;
  public readonly institution?: string;
  public readonly dueDay?: number;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  private constructor(id: DebtId, props: DebtProps) {
    super(id);
    this.userId = props.userId;
    this.description = props.description;
    this.type = props.type;
    this.totalAmount = props.totalAmount;
    this.outstandingBalance = props.outstandingBalance;
    this.monthlyPayment = props.monthlyPayment;
    this.interestRate = props.interestRate;
    this.institution = props.institution;
    this.dueDay = props.dueDay;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    id: DebtId,
    userId: string,
    description: string,
    type: DebtType,
    totalAmount: number,
    monthlyPayment: number,
    interestRate?: number,
    institution?: string,
    dueDay?: number,
  ): Result<Debt, InvalidTransactionError> {
    if (!description.trim())
      return Result.fail(new InvalidTransactionError("Descrição é obrigatória"));
    if (totalAmount <= 0)
      return Result.fail(new InvalidTransactionError("Valor total deve ser positivo"));
    if (monthlyPayment <= 0)
      return Result.fail(new InvalidTransactionError("Parcela mensal deve ser positiva"));
    const now = new Date();
    return Result.ok(
      new Debt(id, {
        userId,
        description,
        type,
        totalAmount,
        outstandingBalance: totalAmount,
        monthlyPayment,
        interestRate,
        institution,
        dueDay,
        createdAt: now,
        updatedAt: now,
      }),
    );
  }

  static restore(id: DebtId, props: DebtProps): Debt {
    return new Debt(id, props);
  }

  pay(amount: number): Debt {
    const newBalance = Math.max(0, this.outstandingBalance - amount);
    return Debt.restore(this.id, {
      ...this.props,
      outstandingBalance: newBalance,
      updatedAt: new Date(),
    });
  }

  private get props(): DebtProps {
    return {
      userId: this.userId,
      description: this.description,
      type: this.type,
      totalAmount: this.totalAmount,
      outstandingBalance: this.outstandingBalance,
      monthlyPayment: this.monthlyPayment,
      interestRate: this.interestRate,
      institution: this.institution,
      dueDay: this.dueDay,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
