import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { fetchCryptoQuotes } from "./coingecko.server";
import { fetchYahooQuotes } from "./yahoo.server";

export interface Quote {
  ticker: string;
  price: number;
  changePct: number;
  name?: string;
  updatedAt: string;
}

const CRYPTO_RE = /^(BTC|ETH|SOL|ADA|DOT|AVAX|MATIC|LINK|XRP|DOGE|USDT|USDC|BNB|TRX|ATOM|FIL|NEAR|APT|SUI|ARB|OP)[-]/;

const input = z.object({
  tickers: z.array(z.string().trim().min(1).max(15)).min(1).max(50),
});

export const getQuotes = createServerFn({ method: "POST" })
  .validator(input)
  .handler(async ({ data }): Promise<{ quotes: Record<string, Quote>; error: string | null }> => {
    const tickers = Array.from(new Set(data.tickers.map((t) => t.toUpperCase())));
    const token = process.env.BRAPI_TOKEN;
    const now = new Date().toISOString();

    const crypto = tickers.filter((t) => CRYPTO_RE.test(t));
    const brTickers = tickers.filter((t) => !CRYPTO_RE.test(t));
    const allQuotes: Record<string, Quote> = {};

    // 1. CoinGecko for crypto
    if (crypto.length > 0) {
      const cg = await fetchCryptoQuotes(crypto);
      for (const [t, q] of Object.entries(cg)) {
        allQuotes[t] = {
          ticker: t,
          price: q.priceUsd,
          changePct: q.changePct24h,
          name: q.name,
          updatedAt: now,
        };
      }
    }

    // 2. BRAPI for Brazilian assets
    if (brTickers.length > 0 && token) {
      const headers: Record<string, string> = { Accept: "application/json" };
      headers["Authorization"] = `Bearer ${token}`;
      const url = `https://brapi.dev/api/v2/stocks/quote?symbols=${brTickers.join(",")}`;
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
          for (const r of json.results ?? []) {
            const d = r.data;
            if (d && typeof d.regularMarketPrice === "number") {
              allQuotes[r.symbol.toUpperCase()] = {
                ticker: r.symbol.toUpperCase(),
                price: d.regularMarketPrice,
                changePct: d.regularMarketChangePercent ?? 0,
                name: d.longName ?? d.shortName,
                updatedAt: now,
              };
            }
          }
        }
      } catch {
        // fallback
      }
    }

    // 3. Yahoo Finance for anything still missing
    const missing = tickers.filter((t) => !allQuotes[t]);
    if (missing.length > 0) {
      try {
        const yahoo = await fetchYahooQuotes(missing);
        for (const ticker of missing) {
          const y = yahoo[ticker];
          if (y) {
            allQuotes[ticker] = {
              ticker,
              price: y.price,
              changePct: y.changePct,
              updatedAt: now,
            };
          }
        }
      } catch {
        // ignore
      }
    }

    const error = Object.keys(allQuotes).length === 0 ? "Indisponível" : null;
    return { quotes: allQuotes, error };
  });