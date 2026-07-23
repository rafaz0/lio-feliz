import { ValueObject } from "../value-object";
import { Money } from "../money";

export class InternationalValue extends ValueObject<InternationalValue> {
  private constructor(
    private readonly _amount: Money,
    private readonly _currency: string,
    private readonly _rate: number,
  ) {}

  get amount(): Money {
    return this._amount;
  }

  get currency(): string {
    return this._currency;
  }

  get rate(): number {
    return this._rate;
  }

  get amountInBRL(): Money {
    return this._amount.multiply(this._rate);
  }

  static create(amount: Money, currency: string, rate: number): InternationalValue {
    return new InternationalValue(amount, currency, rate);
  }

  toBRL(rate: number): InternationalValue {
    return new InternationalValue(this._amount, "BRL", rate);
  }

  toJSON() {
    return {
      amount: this._amount.toJSON(),
      currency: this._currency,
      rate: this._rate,
    };
  }

  static fromJSON(data: ReturnType<InternationalValue["toJSON"]>): InternationalValue {
    const instance = Object.create(InternationalValue.prototype);
    instance["_amount"] = Money.fromJSON(data.amount);
    instance["_currency"] = data.currency;
    instance["_rate"] = data.rate;
    return instance;
  }
}
