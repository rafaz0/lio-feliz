export type AssetType =
  | "stock"
  | "fii"
  | "bdr"
  | "etf"
  | "fixed_income"
  | "crypto"
  | "etf_internacional"
  | "stock_us"
  | "reit"
  | "other";

export type Currency = "BRL" | "USD";

export type OperationSide = "buy" | "sell" | "dividend" | "bonus";

export interface Operation {
  id: string;
  ticker: string;
  asset_type: AssetType;
  currency: Currency;
  side: OperationSide;
  quantity: number;
  price: number;
  fee: number;
  irrf: number;
  other_costs: number;
  metadata: Record<string, string | number | boolean> | null;
  traded_at: string;
  source: "manual" | "b3_import" | "pluggy" | "sync";
  notes: string | null;
  created_at: string;
}

export interface Position {
  ticker: string;
  name: string;
  sector: string;
  asset_type: AssetType;
  currency: Currency;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  invested: number;
  currentValue: number;
  pnl: number;
  pnlPct: number;
  weight: number;
  brlValue: number;
  brlInvested: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalPnl: number;
  totalPnlPct: number;
  positions: Position[];
  sectorAllocation: { sector: string; value: number; pct: number }[];
  typeAllocation: { type: AssetType; value: number; pct: number }[];
}

export interface PortfolioHistoryPoint {
  date: string;
  value: number;
  invested: number;
}
