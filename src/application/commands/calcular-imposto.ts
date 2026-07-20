import type { TaxCalculationMode } from "@/core/domain/tax/tax-types";

export interface CalcularImpostoCommand {
  readonly type: "CalcularImpostoCommand";
  readonly portfolioId: string;
  readonly ano: number;
  readonly modo: TaxCalculationMode;
}
