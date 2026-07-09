import { ASSETS_BY_TICKER } from "@/lib/mock-data";
import type { Operation, Currency, Position, PortfolioSummary, AssetType } from "./models";
import { inferAssetType } from "./asset-types";

function brl(value: number, currency: Currency, rates: Record<string, number>): number {
  return currency === "USD" ? value * (rates["USD"] ?? 1) : value;
}

export function calcPositions(
  ops: Operation[],
): Map<string, { qty: number; totalCost: number }> {
  const byTicker = new Map<string, { qty: number; totalCost: number }>();

  for (const op of ops) {
    const cur = byTicker.get(op.ticker) ?? { qty: 0, totalCost: 0 };
    if (op.side === "buy") {
      cur.qty += op.quantity;
      cur.totalCost += op.quantity * op.price + (op.fee ?? 0) + (op.irrf ?? 0) + (op.other_costs ?? 0);
    } else if (op.side === "sell") {
      const avg = cur.qty > 0 ? cur.totalCost / cur.qty : 0;
      const sellQty = Math.min(op.quantity, cur.qty);
      cur.totalCost -= avg * sellQty;
      cur.qty -= sellQty;
      if (cur.qty <= 0.00001) {
        cur.qty = 0;
        cur.totalCost = 0;
      }
    } else if (op.side === "dividend") {
      const amount = op.quantity * op.price;
      cur.totalCost = Math.max(0, cur.totalCost - amount);
    } else if (op.side === "bonus") {
      cur.qty += op.quantity;
    }
    byTicker.set(op.ticker, cur);
  }

  return byTicker;
}

export function consolidatePortfolio(
  ops: Operation[],
  priceOverrides?: Record<string, number>,
  exchangeRates?: Record<string, number>,
): PortfolioSummary {
  const sorted = [...ops].sort(
    (a, b) => a.traded_at.localeCompare(b.traded_at) || a.created_at.localeCompare(b.created_at),
  );

  const byTicker = calcPositions(sorted);
  const rates = exchangeRates ?? {};
  const positions: Position[] = [];

  for (const [ticker, { qty, totalCost }] of byTicker.entries()) {
    if (qty <= 0) continue;
    const firstOp = sorted.find((o) => o.ticker === ticker);
    const currency: Currency = firstOp?.currency ?? "BRL";
    const asset = ASSETS_BY_TICKER[ticker];
    const avgPrice = qty > 0 ? totalCost / qty : 0;
    const overridePrice = priceOverrides?.[ticker];
    const currentPrice = typeof overridePrice === "number"
      ? overridePrice
      : (asset?.price ?? avgPrice);
    const currentValue = qty * currentPrice;
    const invested = qty * avgPrice;
    const pnl = currentValue - invested;
    const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
    positions.push({
      ticker,
      name: asset?.name ?? ticker,
      sector: asset?.sector ?? "—",
      asset_type: inferAssetType(ticker),
      currency,
      quantity: qty,
      avgPrice,
      currentPrice,
      invested: brl(invested, currency, rates),
      currentValue: brl(currentValue, currency, rates),
      pnl: brl(pnl, currency, rates),
      pnlPct,
      weight: 0,
      brlValue: brl(currentValue, currency, rates),
      brlInvested: brl(invested, currency, rates),
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

  const typeMap = new Map<AssetType, number>();
  for (const p of positions) {
    typeMap.set(p.asset_type, (typeMap.get(p.asset_type) ?? 0) + p.currentValue);
  }
  const typeAllocation = Array.from(typeMap.entries())
    .map(([type, value]) => ({ type, value, pct: totalValue > 0 ? (value / totalValue) * 100 : 0 }))
    .sort((a, b) => b.value - a.value);

  return { totalValue, totalInvested, totalPnl, totalPnlPct, positions, sectorAllocation, typeAllocation };
}
