export interface MarketIndex {
  name: string;
  ticker: string;
  value: number;
  changePct: number;
}

const NOW = new Date("2026-07-05T10:30:00-03:00");

export const MARKET_INDICES: MarketIndex[] = [
  { name: "IBOV", ticker: "IBOV", value: 134_582, changePct: 0.42 },
  { name: "IFIX", ticker: "IFIX", value: 3_241, changePct: -0.18 },
  { name: "CDI", ticker: "CDI", value: 14.65, changePct: 0 },
  { name: "SELIC", ticker: "SELIC", value: 14.75, changePct: 0 },
  { name: "S&P 500", ticker: "SP500", value: 5_682, changePct: 0.35 },
  { name: "Dólar", ticker: "USDBRL", value: 5.42, changePct: -0.25 },
];

export function formatIndexValue(index: MarketIndex): string {
  if (index.ticker === "USDBRL") return `R$ ${index.value.toFixed(2)}`;
  if (index.ticker === "CDI" || index.ticker === "SELIC") return `${index.value.toFixed(2)}%`;
  if (index.value >= 1000) return index.value.toLocaleString("pt-BR", { maximumFractionDigits: 0 });
  return index.value.toLocaleString("pt-BR", { maximumFractionDigits: 2 });
}

export function getSyntheticDate(): Date {
  return NOW;
}
