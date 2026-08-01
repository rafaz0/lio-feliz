import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchBolsaiStockHistory, fetchBolsaiFiiHistory, isFiiTicker } from "@/lib/bolsai.server";
import { fetchYahooHistory } from "@/lib/yahoo.server";
import { ObterEvolucaoCarteiraService } from "@/application/services/obter-evolucao-carteira-service";
import type { HistoryOperation, PortfolioHistoryPoint } from "@/shared/types/portfolio";

const historyOperationSchema = z.object({
  ticker: z.string().min(1).max(15),
  side: z.enum(["buy", "sell", "dividend", "bonus"]),
  quantity: z.number(),
  price: z.number(),
  fee: z.number(),
  irrf: z.number(),
  other_costs: z.number(),
  currency: z.enum(["BRL", "USD"]),
  traded_at: z.string(),
  created_at: z.string(),
}) satisfies z.ZodType<HistoryOperation>;

/**
 * B3 (bolsai) primeiro - ativos brasileiros tem historico real desde 1986 la.
 * Ativos internacionais (currency USD) ou que o bolsai nao cobrir caem pro
 * Yahoo Finance, que cobre bolsas de fora mas nao tem a mesma profundidade
 * historica pra B3.
 */
async function resolveHistory(
  ticker: string,
  currency: string,
): Promise<{ date: string; close: number }[]> {
  if (currency !== "USD") {
    const bolsai = isFiiTicker(ticker)
      ? await fetchBolsaiFiiHistory(ticker)
      : await fetchBolsaiStockHistory(ticker);
    if (bolsai && bolsai.length > 0) return bolsai;
  }
  const yahoo = await fetchYahooHistory(ticker, "max", "1wk");
  return yahoo ?? [];
}

/**
 * Server function de historico patrimonial (EWO-003, Slice 3).
 *
 * Substitui `@/lib/portfolio/history.server` usando o novo domínio via
 * ObterEvolucaoCarteiraService, mantendo a mesma assinatura e o mesmo
 * retorno `PortfolioHistoryPoint[]` que o frontend consome.
 */
export const getPortfolioHistory = createServerFn({ method: "POST" })
  .validator(
    z.object({
      operations: z.array(historyOperationSchema).max(2000),
      priceOverrides: z.record(z.number()).optional(),
      exchangeRates: z.record(z.number()).optional(),
    }),
  )
  .handler(async ({ data }): Promise<PortfolioHistoryPoint[]> => {
    const tickerCurrency = new Map<string, string>();
    for (const op of data.operations) {
      if (!tickerCurrency.has(op.ticker)) tickerCurrency.set(op.ticker, op.currency);
    }
    const tickers = Array.from(tickerCurrency.keys());

    const histories: Record<string, { date: string; close: number }[]> = {};
    await Promise.all(
      tickers.map(async (ticker) => {
        histories[ticker] = await resolveHistory(ticker, tickerCurrency.get(ticker) ?? "BRL");
      }),
    );

    return new ObterEvolucaoCarteiraService().execute(
      data.operations,
      data.priceOverrides,
      data.exchangeRates,
      histories,
    );
  });
