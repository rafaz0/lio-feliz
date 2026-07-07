import { createServerFn } from "@tanstack/react-start";

const CACHE_TTL = 300_000;
let cachedRate: { rate: number; timestamp: number } | null = null;

// Exported for server-side use (portfolio consolidation)
export async function getUsdBrlRate(): Promise<number> {
  if (cachedRate && Date.now() - cachedRate.timestamp < CACHE_TTL) {
    return cachedRate.rate;
  }
  try {
    const res = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL",
      { headers: { "User-Agent": "Mozilla/5.0" } },
    );
    if (res.ok) {
      const json = (await res.json()) as { USDBRL?: { bid: string } };
      if (json.USDBRL) {
        const rate = Number(json.USDBRL.bid);
        cachedRate = { rate, timestamp: Date.now() };
        return rate;
      }
    }
  } catch {
    // fallback
  }
  const fallback = 5.5;
  cachedRate = { rate: fallback, timestamp: Date.now() };
  return fallback;
}

export const getExchangeRates = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, number>> => {
    const rate = await getUsdBrlRate();
    return { BRL: 1, USD: rate, USDT: rate };
  },
);
