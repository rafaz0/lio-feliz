import { AggregateRoot, Result } from "@/core/domain";
import { BankAccountId } from "./bank-account-id";
import { AccountType } from "./account-type";
import { AccountNotFoundError } from "./finance-errors";

export interface BankAccountProps {
  name: string;
  institution: string;
  type: AccountType;
  balance: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export class BankAccount extends AggregateRoot<BankAccountId> {
  public readonly name: string;
  public readonly institution: string;
  public readonly type: AccountType;
  public readonly balance: number;
  public readonly currency: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  private constructor(id: BankAccountId, props: BankAccountProps) {
    super(id);
    this.name = props.name;
    this.institution = props.institution;
    this.type = props.type;
    this.balance = props.balance;
    this.currency = props.currency;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(
    id: BankAccountId,
    name: string,
    institution: string,
    type: AccountType,
    currency: string = "BRL",
  ): BankAccount {
    const now = new Date();
    return new BankAccount(id, {
      name,
      institution,
      type,
      balance: 0,
      currency,
      createdAt: now,
      updatedAt: now,
    });
  }

  static restore(id: BankAccountId, props: BankAccountProps): BankAccount {
    return new BankAccount(id, props);
  }

  deposit(amount: number): Result<BankAccount, AccountNotFoundError> {
    if (amount <= 0) {
      return Result.fail(new AccountNotFoundError(this.id.value));
    }
    const updated = new BankAccount(this.id, {
      ...this.props,
      balance: this.balance + amount,
      updatedAt: new Date(),
    });
    return Result.ok(updated);
  }

  withdraw(amount: number): Result<BankAccount, AccountNotFoundError> {
    if (amount <= 0 || amount > this.balance) {
      return Result.fail(new AccountNotFoundError(this.id.value));
    }
    const updated = new BankAccount(this.id, {
      ...this.props,
      balance: this.balance - amount,
      updatedAt: new Date(),
    });
    return Result.ok(updated);
  }

  private get props(): BankAccountProps {
    return {
      name: this.name,
      institution: this.institution,
      type: this.type,
      balance: this.balance,
      currency: this.currency,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
