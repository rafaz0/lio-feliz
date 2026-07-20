export enum TaxCalculationMode {
  SWING_TRADE = "SWING_TRADE",
  DAY_TRADE = "DAY_TRADE",
  COMPLETO = "COMPLETO",
}

export enum TaxOperationType {
  BUY = "BUY",
  SELL = "SELL",
  DIVIDEND = "DIVIDEND",
  JCP = "JCP",
  BONUS = "BONUS",
  SPLIT = "SPLIT",
  GROUPING = "GROUPING",
  AMORTIZATION = "AMORTIZATION",
}

export enum ExportFormat {
  CSV = "csv",
  PDF = "pdf",
}

export enum DeclarationInclude {
  BENS = "bens",
  OPERACOES = "operacoes",
  PROVENTOS = "proventos",
}

export interface TaxRateTableEntry {
  readonly assetType: string;
  readonly swingTradeRate: number;
  readonly dayTradeRate: number;
  readonly exemptionAmount: number;
}

export const TAX_RATE_TABLE: TaxRateTableEntry[] = [
  { assetType: "stock", swingTradeRate: 0.15, dayTradeRate: 0.20, exemptionAmount: 20_000 },
  { assetType: "fii", swingTradeRate: 0.20, dayTradeRate: 0.20, exemptionAmount: 0 },
  { assetType: "bdr", swingTradeRate: 0.15, dayTradeRate: 0.20, exemptionAmount: 20_000 },
  { assetType: "etf", swingTradeRate: 0.15, dayTradeRate: 0.20, exemptionAmount: 0 },
  { assetType: "etf_internacional", swingTradeRate: 0.15, dayTradeRate: 0.20, exemptionAmount: 0 },
  { assetType: "stock_us", swingTradeRate: 0.15, dayTradeRate: 0.20, exemptionAmount: 20_000 },
  { assetType: "reit", swingTradeRate: 0.15, dayTradeRate: 0.20, exemptionAmount: 0 },
  { assetType: "fixed_income", swingTradeRate: 0.15, dayTradeRate: 0.20, exemptionAmount: 0 },
  { assetType: "crypto", swingTradeRate: 0.15, dayTradeRate: 0.20, exemptionAmount: 35_000 },
  { assetType: "other", swingTradeRate: 0.15, dayTradeRate: 0.20, exemptionAmount: 0 },
];
