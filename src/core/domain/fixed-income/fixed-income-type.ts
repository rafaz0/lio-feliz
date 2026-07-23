import { ValueObject } from "../value-object";

export type FixedIncomeType = "TESOURO_DIRETO" | "CDB" | "LCI" | "LCA" | "PREFIXADO" | "POS_FIXADO";

export const FIXED_INCOME_TYPES: readonly FixedIncomeType[] = [
  "TESOURO_DIRETO",
  "CDB",
  "LCI",
  "LCA",
  "PREFIXADO",
  "POS_FIXADO",
] as const;

export function isFixedIncomeType(value: string): value is FixedIncomeType {
  return (FIXED_INCOME_TYPES as readonly string[]).includes(value);
}

export class FixedIncomeTypeError extends ValueObject<{ value: string }> {
  private constructor(value: string) {
    super({ value });
  }

  static create(value: string): FixedIncomeTypeError | Error {
    if (!isFixedIncomeType(value)) {
      return new Error(`Tipo de renda fixa inválido: ${value}`);
    }
    return new FixedIncomeTypeError(value);
  }
}
