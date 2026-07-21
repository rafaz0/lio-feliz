import { ValueObject } from "../value-object";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "BRL";

export class CurrencyPair extends ValueObject<{ from: CurrencyCode; to: CurrencyCode }> {
  private constructor(from: CurrencyCode, to: CurrencyCode) {
    super({ from, to });
  }

  get from(): CurrencyCode {
    return this.props.from;
  }

  get to(): CurrencyCode {
    return this.props.to;
  }

  static create(from: CurrencyCode, to: CurrencyCode): CurrencyPair {
    return new CurrencyPair(from, to);
  }

  get isBRLFrom(): boolean {
    return this.from === "BRL";
  }

  get isBRLTo(): boolean {
    return this.to === "BRL";
  }

  get isBrazilianPair(): boolean {
    return this.isBRLFrom || this.isBRLTo;
  }
}
