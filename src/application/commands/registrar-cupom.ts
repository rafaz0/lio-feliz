import type { FixedIncomeType } from "@/core/domain/fixed-income";

export interface RegistrarCupomCommand {
  readonly type: "RegistrarCupomCommand";
  readonly portfolioId: string;
  readonly ticker: string;
  readonly name: string;
  readonly institution: string;
  readonly productType: FixedIncomeType;
  readonly nominalValue: number;
  readonly rate: number;
  readonly rateType: "PRE" | "POS";
  readonly issueDate: Date;
  readonly maturityDate: Date;
}
