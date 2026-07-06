import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchYahooQuotes } from "./yahoo.server";

export interface Quote {
  ticker: string;
  price: number;
  changePct: number;
  name?: string;
  updatedAt: string;
}

const input = z.object({
  tickers: z.array(z.string().trim().min(1).max(10)).min(1).max(50),
});

export const getQuotes = createServerFn({ method: "POST" })
  .validator(input)
  .handler(async ({ data }): Promise<{ quotes: Record<string, Quote>; error: string | null }> => {
    const tickers = Array.from(new Set(data.tickers.map((t) => t.toUpperCase())));
    const token = process.env.BRAPI_TOKEN;
    const now = new Date().toISOString();

    // Try BRAPI first
    if (token) {
      const headers: Record<string, string> = { Accept: "application/json" };
      headers["Authorization"] = `Bearer ${token}`;
      const url = `https://brapi.dev/api/v2/stocks/quote?symbols=${tickers.join(",")}`;
      try {
        const res = await fetch(url, { headers });
        if (res.ok) {
          const json = (await res.json()) as {
            results?: Array<{
              symbol: string;
              data?: {
                regularMarketPrice?: number;
                regularMarketChangePercent?: number;
                longName?: string;
                shortName?: string;
              };
            }>;
          };
          const quotes: Record<string, Quote> = {};
          for (const r of json.results ?? []) {
            const d = r.data;
            if (d && typeof d.regularMarketPrice === "number") {
              quotes[r.symbol.toUpperCase()] = {
                ticker: r.symbol.toUpperCase(),
                price: d.regularMarketPrice,
                changePct: d.regularMarketChangePercent ?? 0,
                name: d.longName ?? d.shortName,
                updatedAt: now,
              };
            }
          }
          if (Object.keys(quotes).length > 0) return { quotes, error: null };
        }
      } catch {
        // fallback to Yahoo
      }
    }

    // Fallback: Yahoo Finance (free, no token needed)
    try {
      const yahoo = await fetchYahooQuotes(tickers);
      const quotes: Record<string, Quote> = {};
      for (const ticker of tickers) {
        const y = yahoo[ticker];
        if (y) {
          quotes[ticker] = {
            ticker,
            price: y.price,
            changePct: y.changePct,
            updatedAt: now,
          };
        }
      }
      if (Object.keys(quotes).length > 0) return { quotes, error: null };
    } catch {
      // ignore
    }

    return { quotes: {}, error: "Indisponível" };
  });