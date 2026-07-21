import type { FixedIncomeType } from "@/core/domain/fixed-income";

export interface RendaFixaDto {
  id: string;
  ticker: string;
  name: string;
  institution: string;
  productType: FixedIncomeType;
  nominalValue: number;
  rate: number;
  rateType: "PRE" | "POS";
  issueDate: Date;
  maturityDate: Date;
  projectedValue: number;
  totalReturnPercent: number;
  totalJuros: number;
  totalAmortizacao: number;
}

export interface CronogramaItemDto {
  assetId: string;
  ticker: string;
  date: Date;
  tipo: "JUROS" | "AMORTIZACAO";
  valor: number;
}

export interface CronogramaPagamentosDto {
  items: CronogramaItemDto[];
  totalJuros: number;
  totalAmortizacao: number;
}
