import { ValueObject } from "../value-object";
import { Money } from "../money";

export class FixedIncomeValue extends ValueObject<FixedIncomeValue> {
  private constructor(
    private readonly _amount: Money,
    private readonly _currency: string = "BRL",
  ) {}

  get amount(): Money {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  static create(amount: Money, currency: string = "BRL"): FixedIncomeValue {
    return new FixedIncomeValue(amount, currency);
  }

  add(other: FixedIncomeValue): FixedIncomeValue {
    if (this._currency !== other.currency) {
      throw new Error("Cannot add values with different currencies");
    }
    return new FixedIncomeValue(this._amount.add(other.amount), this._currency);
  }

  subtract(other: FixedIncomeValue): FixedIncomeValue {
    if (this._currency !== other.currency) {
      throw new Error("Cannot subtract values with different currencies");
    }
    return new FixedIncomeValue(this._amount.subtract(other.amount), this._currency);
  }

  equals(other: FixedIncomeValue): boolean {
    return this._amount.equals(other.amount) && this._currency === other.currency;
  }

  toJSON() {
    return {
      amount: this._amount.toJSON(),
      currency: this._currency,
    };
  }

  static fromJSON(data: ReturnType<FixedIncomeValue["toJSON"]>): FixedIncomeValue {
    const instance = Object.create(FixedIncomeValue.prototype);
    instance["_amount"] = Money.fromJSON(data.amount);
    instance["_currency"] = data.currency;
    return instance;
  }
}
