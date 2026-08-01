import { PortfolioProjector } from "@/core/domain/portfolio";
import { operationsToFinancialEvents } from "@/application/mappers/operation-to-financial-event";
import type { HistoryOperation, Currency, PortfolioHistoryPoint } from "@/shared/types/portfolio";

function priceAsOf(history: { date: string; close: number }[], date: string): number | undefined {
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].date <= date) return history[i].close;
  }
  return undefined;
}

/**
 * Application Service de histórico patrimonial (EWO-003, Slice 2).
 *
 * Substitui o `buildPortfolioHistory` legado usando o novo domínio
 * (PortfolioProjector) para projetar posições em cada ponto da grade
 * semanal e combinando com preços históricos. Retorna a mesma estrutura
 * `PortfolioHistoryPoint[]` que o frontend consome.
 *
 * DA-003: nova implementação de history calculator na Application Layer,
 * com rebuild semanal (projetando eventos até cada data) em vez de snapshot
 * por evento. Preços de mercado são aplicados aqui (DA-002).
 */
export class ObterEvolucaoCarteiraService {
  execute(
    ops: HistoryOperation[],
    priceOverrides?: Record<string, number>,
    exchangeRates?: Record<string, number>,
    histories?: Record<string, { date: string; close: number }[]>,
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
    const latestDate = uniqueDates[uniqueDates.length - 1];

    for (const date of uniqueDates) {
      const opsUpToDate = sorted.filter((o) => o.traded_at.slice(0, 10) <= date);
      const events = operationsToFinancialEvents(opsUpToDate);
      const projected = new PortfolioProjector().project(events);
      const rates = exchangeRates ?? {};
      let totalValue = 0;
      let investedSum = 0;

      for (const pos of projected) {
        const ticker = pos.getTicker().getValue();
        const qty = pos.getQuantity().getValue();
        const totalCost = Math.max(0, pos.getTotalCost().getValue());
        if (qty <= 0) continue;
        const overridePrice = date === latestDate ? priceOverrides?.[ticker] : undefined;
        const avgPrice = qty > 0 ? totalCost / qty : 0;
        const priceAtDate = priceAsOf(histories?.[ticker] ?? [], date);
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
}
