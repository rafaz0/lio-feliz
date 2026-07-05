import { ASSETS_BY_TICKER, getAsset } from "./mock-data";

export interface Operation {
  id: string;
  ticker: string;
  side: "buy" | "sell";
  quantity: number;
  price: number;
  traded_at: string;
  source: "manual" | "b3_import" | "pluggy";
  notes: string | null;
  created_at: string;
}

export interface Position {
  ticker: string;
  name: string;
  sector: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  invested: number;
  currentValue: number;
  pnl: number;
  pnlPct: number;
  weight: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalPnl: number;
  totalPnlPct: number;
  positions: Position[];
  sectorAllocation: { sector: string; value: number; pct: number }[];
}

export interface PortfolioHistoryPoint {
  date: string;
  value: number;
  invested: number;
}

export function buildPortfolioHistory(
  ops: Operation[],
  priceOverrides?: Record<string, number>,
): PortfolioHistoryPoint[] {
  const sorted = [...ops].sort(
    (a, b) => a.traded_at.localeCompare(b.traded_at) || a.created_at.localeCompare(b.created_at),
  );

  if (sorted.length === 0) return [];

  const firstDate = new Date(sorted[0].traded_at);
  const today = new Date();
  const points: PortfolioHistoryPoint[] = [];

  const weeks: string[] = [];
  const cursor = new Date(firstDate);
  while (cursor <= today) {
    weeks.push(cursor.toISOString().slice(0, 10));
    cursor.setDate(cursor.getDate() + 7);
  }
  weeks.push(today.toISOString().slice(0, 10));

  const uniqueDates = [...new Set(weeks)].sort();

  for (const date of uniqueDates) {
    const byTicker = new Map<string, { qty: number; totalCost: number }>();
    let totalInvested = 0;

    for (const op of sorted) {
      if (op.traded_at > date) break;
      const cur = byTicker.get(op.ticker) ?? { qty: 0, totalCost: 0 };
      if (op.side === "buy") {
        cur.qty += op.quantity;
        cur.totalCost += op.quantity * op.price;
      } else {
        const avg = cur.qty > 0 ? cur.totalCost / cur.qty : 0;
        const sellQty = Math.min(op.quantity, cur.qty);
        cur.totalCost -= avg * sellQty;
        cur.qty -= sellQty;
        if (cur.qty <= 0.00001) { cur.qty = 0; cur.totalCost = 0; }
      }
      byTicker.set(op.ticker, cur);
    }

    let totalValue = 0;
    let investedSum = 0;
    for (const [ticker, { qty, totalCost }] of byTicker.entries()) {
      if (qty <= 0) continue;
      const asset = getAsset(ticker);
      const overridePrice = priceOverrides?.[ticker];
      const priceAtDate = asset
        ? (asset.history.find((h) => h.date <= date)?.close ?? asset.price)
        : 0;
      const currentPrice = typeof overridePrice === "number" ? overridePrice : priceAtDate;
      totalValue += qty * currentPrice;
      investedSum += totalCost;
    }

    points.push({ date, value: totalValue, invested: investedSum });
  }

  return points;
}

export function consolidatePortfolio(
  ops: Operation[],
  priceOverrides?: Record<string, number>,
): PortfolioSummary {
  const byTicker = new Map<string, { qty: number; totalCost: number }>();

  const sorted = [...ops].sort(
    (a, b) => a.traded_at.localeCompare(b.traded_at) || a.created_at.localeCompare(b.created_at),
  );

  for (const op of sorted) {
    const cur = byTicker.get(op.ticker) ?? { qty: 0, totalCost: 0 };
    if (op.side === "buy") {
      cur.qty += op.quantity;
      cur.totalCost += op.quantity * op.price;
    } else {
      const avg = cur.qty > 0 ? cur.totalCost / cur.qty : 0;
      const sellQty = Math.min(op.quantity, cur.qty);
      cur.totalCost -= avg * sellQty;
      cur.qty -= sellQty;
      if (cur.qty <= 0.00001) {
        cur.qty = 0;
        cur.totalCost = 0;
      }
    }
    byTicker.set(op.ticker, cur);
  }

  const positions: Position[] = [];
  for (const [ticker, { qty, totalCost }] of byTicker.entries()) {
    if (qty <= 0) continue;
    const asset = ASSETS_BY_TICKER[ticker];
    const overridePrice = priceOverrides?.[ticker];
    const currentPrice = typeof overridePrice === "number" ? overridePrice : asset?.price ?? 0;
    const avgPrice = qty > 0 ? totalCost / qty : 0;
    const currentValue = qty * currentPrice;
    const invested = qty * avgPrice;
    const pnl = currentValue - invested;
    const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
    positions.push({
      ticker,
      name: asset?.name ?? ticker,
      sector: asset?.sector ?? "—",
      quantity: qty,
      avgPrice,
      currentPrice,
      invested,
      currentValue,
      pnl,
      pnlPct,
      weight: 0,
    });
  }

  const totalValue = positions.reduce((s, p) => s + p.currentValue, 0);
  const totalInvested = positions.reduce((s, p) => s + p.invested, 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPct = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  for (const p of positions) {
    p.weight = totalValue > 0 ? (p.currentValue / totalValue) * 100 : 0;
  }
  positions.sort((a, b) => b.currentValue - a.currentValue);

  const sectorMap = new Map<string, number>();
  for (const p of positions) {
    sectorMap.set(p.sector, (sectorMap.get(p.sector) ?? 0) + p.currentValue);
  }
  const sectorAllocation = Array.from(sectorMap.entries())
    .map(([sector, value]) => ({
      sector,
      value,
      pct: totalValue > 0 ? (value / totalValue) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);

  return { totalValue, totalInvested, totalPnl, totalPnlPct, positions, sectorAllocation };
}
