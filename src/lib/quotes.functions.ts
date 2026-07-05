import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
  .inputValidator((raw: unknown) => input.parse(raw))
  .handler(async ({ data }): Promise<{ quotes: Record<string, Quote>; error: string | null }> => {
    const tickers = Array.from(new Set(data.tickers.map((t) => t.toUpperCase())));
    const token = process.env.BRAPI_TOKEN;
    const url = new URL(`https://brapi.dev/api/quote/${tickers.join(",")}`);
    if (token) url.searchParams.set("token", token);

    try {
      const res = await fetch(url.toString(), {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        return {
          quotes: {},
          error: `BRAPI respondeu ${res.status}. ${
            res.status === 401 ? "Configure o BRAPI_TOKEN para dados em tempo real." : ""
          }`,
        };
      }
      const json = (await res.json()) as {
        results?: Array<{
          symbol: string;
          regularMarketPrice?: number;
          regularMarketChangePercent?: number;
          longName?: string;
          shortName?: string;
        }>;
      };
      const now = new Date().toISOString();
      const quotes: Record<string, Quote> = {};
      for (const r of json.results ?? []) {
        if (typeof r.regularMarketPrice !== "number") continue;
        quotes[r.symbol.toUpperCase()] = {
          ticker: r.symbol.toUpperCase(),
          price: r.regularMarketPrice,
          changePct: r.regularMarketChangePercent ?? 0,
          name: r.longName ?? r.shortName,
          updatedAt: now,
        };
      }
      return { quotes, error: null };
    } catch (err) {
      return { quotes: {}, error: err instanceof Error ? err.message : "Falha ao buscar cotações" };
    }
  });
