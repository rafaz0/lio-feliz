import { ValueObject } from "@/core/domain";

export class Money extends ValueObject<{ value: number; currency: string }> {
  private constructor(value: number, currency: string) {
    const rounded = Math.round(value * 100) / 100;
    super({ value: rounded, currency: currency.toUpperCase() });
  }

  static create(value: number, currency: string = "BRL"): Money {
    return new Money(value, currency);
  }

  getValue(): number {
    return this.props.value;
  }

  getCurrency(): string {
    return this.props.currency;
  }

  static isValid(value: number, currency: string = "BRL"): boolean {
    if (typeof value !== "number") return false;
    if (Number.isNaN(value)) return false;
    if (!isFinite(value)) return false;
    if (value < 0) return false;
    if (typeof currency !== "string" || currency.trim().length === 0) return false;
    return true;
  }
}
