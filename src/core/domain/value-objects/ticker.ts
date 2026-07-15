import { ValueObject } from "@/core/domain";

export class Ticker extends ValueObject<{ value: string }> {
  private constructor(value: string) {
    const normalized = value.trim().toUpperCase();
    super({ value: normalized });
  }

  static create(value: string): Ticker {
    return new Ticker(value);
  }

  getValue(): string {
    return this.props.value;
  }

  static isValid(value: string): boolean {
    const normalized = value.trim().toUpperCase();
    if (normalized.length === 0) return false;
    return /^[A-Z0-9]+$/.test(normalized);
  }
}
