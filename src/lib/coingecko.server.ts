const CG_BASE = "https://api.coingecko.com/api/v3";

const TICKER_TO_CG: Record<string, string> = {
  "BTC-USD": "bitcoin",
  "ETH-USD": "ethereum",
  "SOL-USD": "solana",
  "ADA-USD": "cardano",
  "DOT-USD": "polkadot",
  "AVAX-USD": "avalanche-2",
  "MATIC-USD": "matic-network",
  "LINK-USD": "chainlink",
  "XRP-USD": "ripple",
  "DOGE-USD": "dogecoin",
  "BNB-USD": "binancecoin",
  "TRX-USD": "tron",
  "ATOM-USD": "cosmos",
  "FIL-USD": "filecoin",
  "NEAR-USD": "near",
  "APT-USD": "aptos",
  "SUI-USD": "sui",
  "ARB-USD": "arbitrum",
  "OP-USD": "optimism",
};

interface CoinGeckoQuote {
  ticker: string;
  priceUsd: number;
  priceBrl: number;
  changePct24h: number;
  name: string;
}

export async function fetchCryptoQuotes(
  tickers: string[],
): Promise<Record<string, CoinGeckoQuote>> {
  const result: Record<string, CoinGeckoQuote> = {};
  const cgIds: string[] = [];

  const cgIdToTicker: Record<string, string> = {};
  for (const t of tickers) {
    const id = TICKER_TO_CG[t.toUpperCase()];
    if (id) {
      cgIds.push(id);
      cgIdToTicker[id] = t.toUpperCase();
    }
  }

  if (cgIds.length === 0) return result;

  try {
    const url = `${CG_BASE}/simple/price?ids=${cgIds.join(",")}&vs_currencies=usd%2Cbrl&include_24hr_change=true`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return result;
    const json = (await res.json()) as Record<
      string,
      { usd?: number; brl?: number; usd_24h_change?: number }
    >;

    for (const id of cgIds) {
      const data = json[id];
      const ticker = cgIdToTicker[id];
      if (data && typeof data.usd === "number") {
        result[ticker] = {
          ticker,
          priceUsd: data.usd,
          priceBrl: data.brl ?? data.usd * 5.5,
          changePct24h: data.usd_24h_change ?? 0,
          name: ticker.replace("-USD", ""),
        };
      }
    }
  } catch {
    // fallback to Yahoo
  }

  return result;
}
