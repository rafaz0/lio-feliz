import { getAsset } from "@/lib/mock-data";
import type { Operation, Currency, PortfolioHistoryPoint } from "./models";
import { calcPositions } from "./consolidator";

export function buildPortfolioHistory(
  ops: Operation[],
  priceOverrides?: Record<string, number>,
  exchangeRates?: Record<string, number>,
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
    const opsUpToDate = sorted.filter((o) => o.traded_at <= date);
    const byTicker = calcPositions(opsUpToDate);
    const rates = exchangeRates ?? {};
    let totalValue = 0;
    let investedSum = 0;

    for (const [ticker, { qty, totalCost }] of byTicker.entries()) {
      if (qty <= 0) continue;
      const asset = getAsset(ticker);
      const overridePrice = priceOverrides?.[ticker];
      const avgPrice = qty > 0 ? totalCost / qty : 0;
      const priceAtDate = asset
        ? (asset.history.find((h) => h.date <= date)?.close ?? asset.price)
        : null;
      const currentPrice =
        typeof overridePrice === "number" ? overridePrice : (priceAtDate ?? avgPrice);
      const first = sorted.find((o) => o.ticker === ticker);
      const currency: Currency = first?.currency ?? "BRL";
      const brlValue =
        currency === "USD" ? currentPrice * qty * (rates["USD"] ?? 1) : currentPrice * qty;
      totalValue += brlValue;
      const brlInvested = currency === "USD" ? totalCost * (rates["USD"] ?? 1) : totalCost;
      investedSum += brlInvested;
    }

    points.push({ date, value: totalValue, invested: investedSum });
  }

  return points;
}
