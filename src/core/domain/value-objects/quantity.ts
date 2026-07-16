import { ValueObject } from "@/core/domain";

export class Quantity extends ValueObject<{ value: number }> {
  private constructor(value: number) {
    super({ value });
  }

  static create(value: number): Quantity {
    return new Quantity(value);
  }

  getValue(): number {
    return this.props.value;
  }

  static isValid(value: number): boolean {
    if (typeof value !== "number") return false;
    if (Number.isNaN(value)) return false;
    if (!isFinite(value)) return false;
    if (value < 0) return false;
    return true;
  }
}
