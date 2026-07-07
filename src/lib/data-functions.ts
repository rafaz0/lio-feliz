import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  fetchYahooFundamentals,
  fetchYahooHistory,
  fetchYahooDividends,
  fetchYahooFinancialStatements,
  getCached,
  setCache,
  type YahooFundamentals,
  type FinancialStatements,
} from "./yahoo.server";
import {
  ASSETS,
  ASSETS_BY_TICKER,
  type Asset,
  type Dividend,
  type Sector,
  type AssetFundamentals,
} from "./mock-data";
import { FIIS, getFii } from "./fii-mock-data";

const BRAPI_BASE = "https://brapi.dev/api/v2";
const BRAPI_QUOTE_CHUNK = 20;

interface V2TickerItem {
  symbol: string;
  name: string;
  longName?: string;
  sector: string | null;
  isActive?: boolean;
  quote?: { lastPrice: number; changePercent: number; volume?: number; marketCap?: number };
}

interface V2QuoteItem {
  symbol: string;
  data?: {
    regularMarketPrice?: number;
    regularMarketChangePercent?: number;
    longName?: string;
    shortName?: string;
  };
}

const US_SECTORS: Record<string, string> = {
  "Basic Materials": "Materiais Básicos",
  "Communication Services": "Comunicação",
  "Consumer Cyclical": "Consumo Cíclico",
  "Consumer Defensive": "Consumo Defensivo",
  Energy: "Energia",
  "Financial Services": "Financeiro",
  Healthcare: "Saúde",
  Industrials: "Industriais",
  "Real Estate": "Imobiliário",
  Technology: "Tecnologia",
  Utilities: "Utilidade Pública",
};

function mapSector(yahooSector: string): Sector {
  const mapped = US_SECTORS[yahooSector];
  if (mapped) return mapped as Sector;
  if (yahooSector) return yahooSector as Sector;
  return "Outros" as Sector;
}

export interface RichAsset extends Asset {
  isRealData: boolean;
}

export interface AssetLite {
  ticker: string;
  name: string;
  price: number;
  changeDayPct: number;
  sector: string | null;
  fundamentals: AssetFundamentals | null;
  isRealData: boolean;
}

const EMPTY_FUNDS: AssetFundamentals = {
  pl: 0,
  pvp: 0,
  dy: 0,
  roe: 0,
  roic: 0,
  margemLiquida: 0,
  divLiquidaEbitda: 0,
  lpa: 0,
  vpa: 0,
  marketCap: 0,
  evEbitda: 0,
  payout: 0,
  psr: 0,
  dividendCagr: 0,
};

function brapiFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = process.env.BRAPI_TOKEN;
  const headers: Record<string, string> = { Accept: "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const url = `${BRAPI_BASE}${path}`;
  return fetch(url, { ...init, headers: { ...headers, ...init?.headers } });
}

async function batchBrapiQuotes(
  tickers: string[],
): Promise<Record<string, { price: number; changePct: number; name: string }>> {
  const result: Record<string, { price: number; changePct: number; name: string }> = {};
  for (let i = 0; i < tickers.length; i += BRAPI_QUOTE_CHUNK) {
    const chunk = tickers.slice(i, i + BRAPI_QUOTE_CHUNK);
    try {
      const res = await brapiFetch(`/stocks/quote?symbols=${chunk.join(",")}`);
      if (!res.ok) continue;
      const json = (await res.json()) as { results?: V2QuoteItem[] };
      for (const r of json.results ?? []) {
        const d = r.data;
        if (d && typeof d.regularMarketPrice === "number") {
          result[r.symbol.toUpperCase()] = {
            price: d.regularMarketPrice,
            changePct: d.regularMarketChangePercent ?? 0,
            name: d.longName ?? d.shortName ?? r.symbol,
          };
        }
      }
    } catch {
      // skip failed chunk
    }
  }
  return result;
}

export const getAvailableTickers = createServerFn({ method: "GET" }).handler(
  async (): Promise<string[]> => {
    const cached = getCached<string[]>("available-tickers");
    if (cached) return cached;

    try {
      const res = await brapiFetch("/tickers?limit=2000");
      if (!res.ok) throw new Error("BRAPI unavailable");
      const json = (await res.json()) as { results?: V2TickerItem[] };
      const tickers = (json.results ?? []).map((r) => r.symbol);
      setCache("available-tickers", tickers);
      return tickers;
    } catch {
      return ASSETS.map((a) => a.ticker);
    }
  },
);

export const getAssetData = createServerFn({ method: "GET" })
  .validator(z.object({ ticker: z.string().min(1).max(20) }))
  .handler(async ({ data }): Promise<RichAsset | null> => {
    const ticker = data.ticker.toUpperCase();

    // Fast path: return mock data immediately if available
    const mockAsset = ASSETS_BY_TICKER[ticker];

    // Try Yahoo Finance for fundamentals
    const cacheKey = `asset-${ticker}`;
    const cached = getCached<YahooData>(cacheKey);

    let yahooFunds: YahooFundamentals | null = null;
    let yahooHistory: { date: string; close: number }[] | null = null;
    let yahooDividends: Dividend[] | null = null;

    if (cached) {
      yahooFunds = cached.fundamentals;
      yahooHistory = cached.history;
      yahooDividends =
        cached.dividends?.map((d) => ({
          paidAt: d.paidAt,
          type: "Dividendo" as const,
          amount: d.amount,
        })) ?? null;
    } else {
      const [funds, hist, divs] = await Promise.all([
        fetchYahooFundamentals(ticker),
        fetchYahooHistory(ticker),
        fetchYahooDividends(ticker),
      ]);
      yahooFunds = funds;
      yahooHistory = hist;
      yahooDividends =
        divs?.map((d) => ({
          paidAt: d.paidAt,
          type: "Dividendo" as const,
          amount: d.amount,
        })) ?? null;

      if (funds) {
        setCache(cacheKey, { fundamentals: funds, history: hist, dividends: divs });
      }
    }

    if (yahooFunds) {
      const mf = mockAsset?.fundamentals ?? EMPTY_FUNDS;
      return {
        ticker,
        name: yahooFunds.name || mockAsset?.name || ticker,
        sector: mapSector(yahooFunds.sector),
        price: yahooFunds.price ?? mockAsset?.price ?? 0,
        changeDayPct: yahooFunds.changePct ?? mockAsset?.changeDayPct ?? 0,
        description: yahooFunds.description || mockAsset?.description || "",
        fundamentals: {
          pl: yahooFunds.pl || mf.pl,
          pvp: yahooFunds.pvp ?? mf.pvp,
          dy: yahooFunds.dy > 0 ? yahooFunds.dy : mf.dy,
          roe: yahooFunds.roe ?? mf.roe,
          roic: yahooFunds.roic ?? mf.roic,
          margemLiquida: yahooFunds.margemLiquida ?? mf.margemLiquida,
          divLiquidaEbitda: yahooFunds.divLiquidaEbitda ?? mf.divLiquidaEbitda,
          lpa: yahooFunds.lpa || mf.lpa,
          vpa: yahooFunds.vpa ?? mf.vpa,
          marketCap: yahooFunds.marketCap || mf.marketCap,
          evEbitda: yahooFunds.evEbitda ?? mf.evEbitda,
          payout: yahooFunds.payout ?? mf.payout,
          psr: yahooFunds.psr ?? mf.psr,
          dividendCagr: yahooFunds.dividendCagr || mf.dividendCagr,
        },
        history: yahooHistory ?? mockAsset?.history ?? [],
        dividends: yahooDividends ?? mockAsset?.dividends ?? [],
        isRealData: true,
      };
    }

    // Fallback: return mock data if available
    if (mockAsset) {
      return { ...mockAsset, isRealData: false };
    }

    // Unknown ticker: try BRAPI v2 for basic info
    try {
      const res = await brapiFetch(`/tickers?search=${ticker}&limit=1`);
      if (res.ok) {
        const json = (await res.json()) as { results?: V2TickerItem[] };
        const item = json.results?.[0];
        if (item && item.symbol === ticker) {
          return {
            ticker: item.symbol,
            name: item.longName ?? item.name ?? item.symbol,
            sector: (item.sector as Sector) ?? "Outros",
            price: item.quote?.lastPrice ?? 0,
            changeDayPct: item.quote?.changePercent ?? 0,
            description: "",
            fundamentals: { ...EMPTY_FUNDS },
            history: [],
            dividends: [],
            isRealData: true,
          };
        }
      }
    } catch {
      // ignore
    }

    // Crypto fallback: CoinGecko basic info
    if (/^(BTC|ETH|SOL|ADA|DOT|AVAX|MATIC|LINK|XRP|DOGE|BNB)[-]/.test(ticker)) {
      try {
        const symbol = ticker.split("-")[0].toLowerCase();
        const cgRes = await fetch(
          `https://api.coingecko.com/api/v3/coins/${symbol === "btc" ? "bitcoin" : symbol === "eth" ? "ethereum" : symbol}?localization=false&tickers=false&community_data=false&developer_data=false`,
          { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(5000) },
        );
        if (cgRes.ok) {
          const cg = (await cgRes.json()) as {
            id: string;
            name?: string;
            market_data?: { current_price?: { usd?: number; brl?: number }; price_change_percentage_24h?: number };
            description?: { en?: string };
            categories?: string[];
          };
          return {
            ticker,
            name: cg.name ?? ticker,
            sector: "Criptomoedas",
            price: cg.market_data?.current_price?.usd ?? 0,
            changeDayPct: cg.market_data?.price_change_percentage_24h ?? 0,
            description: cg.description?.en ?? "",
            fundamentals: { ...EMPTY_FUNDS },
            history: [],
            dividends: [],
            isRealData: true,
          };
        }
      } catch {
        // ignore
      }
    }

    return null;
  });

export const getAssetList = createServerFn({ method: "GET" })
  .validator(
    z.object({
      limit: z.number().min(1).max(2000).default(2000),
      search: z.string().optional(),
    }),
  )
  .handler(async ({ data }): Promise<AssetLite[]> => {
    const cached = getCached<AssetLite[]>("asset-list");
    if (cached) {
      return filterList(cached, data.search);
    }

    try {
      const res = await brapiFetch(`/tickers?limit=${data.limit}`);
      if (res.ok) {
        const json = (await res.json()) as { results?: V2TickerItem[] };
        const result: AssetLite[] = [];

        for (const item of json.results ?? []) {
          if (item.isActive === false) continue;
          const mock = ASSETS_BY_TICKER[item.symbol];
          result.push({
            ticker: item.symbol,
            name: item.longName ?? item.name ?? item.symbol,
            price: item.quote?.lastPrice ?? mock?.price ?? 0,
            changeDayPct: item.quote?.changePercent ?? mock?.changeDayPct ?? 0,
            sector: item.sector ?? mock?.sector ?? null,
            fundamentals: mock?.fundamentals ?? null,
            isRealData: !mock,
          });
        }

        setCache("asset-list", result);
        return filterList(result, data.search);
      }
    } catch {
      // fallback to mock
    }

    // Fallback: mock assets only
    return ASSETS.map((a) => ({
      ticker: a.ticker,
      name: a.name,
      price: a.price,
      changeDayPct: a.changeDayPct,
      sector: a.sector,
      fundamentals: a.fundamentals,
      isRealData: false,
    }));
  });

function filterList(list: AssetLite[], search?: string): AssetLite[] {
  if (!search?.trim()) return list;
  const term = search.trim().toUpperCase();
  return list.filter((a) => a.ticker.includes(term) || a.name.toUpperCase().includes(term));
}

export const getAllAssets = createServerFn({ method: "GET" }).handler(
  async (): Promise<RichAsset[]> => {
    const mockKeys = ASSETS.map((a) => a.ticker);
    const liveMap = await batchBrapiQuotes(mockKeys);

    return ASSETS.map((a) => {
      const live = liveMap[a.ticker];
      return {
        ...a,
        price: live?.price ?? a.price,
        changeDayPct: live?.changePct ?? a.changeDayPct,
        isRealData: !!live,
      };
    });
  },
);

import type { AssetType } from "./portfolio";

export interface TickerSuggestion {
  ticker: string;
  name: string;
  price?: number;
  changePct?: number;
  category?: AssetType;
}

const EXTRA_SUGGESTIONS: TickerSuggestion[] = [
  // Crypto
  { ticker: "BTC-USD", name: "Bitcoin", category: "crypto" },
  { ticker: "ETH-USD", name: "Ethereum", category: "crypto" },
  { ticker: "SOL-USD", name: "Solana", category: "crypto" },
  { ticker: "ADA-USD", name: "Cardano", category: "crypto" },
  { ticker: "DOT-USD", name: "Polkadot", category: "crypto" },
  { ticker: "XRP-USD", name: "Ripple", category: "crypto" },
  { ticker: "DOGE-USD", name: "Dogecoin", category: "crypto" },
  { ticker: "AVAX-USD", name: "Avalanche", category: "crypto" },
  { ticker: "LINK-USD", name: "Chainlink", category: "crypto" },
  // US Stocks
  { ticker: "AAPL", name: "Apple Inc.", category: "stock_us" },
  { ticker: "MSFT", name: "Microsoft Corp.", category: "stock_us" },
  { ticker: "GOOGL", name: "Alphabet Inc.", category: "stock_us" },
  { ticker: "GOOG", name: "Alphabet Inc. (Class C)", category: "stock_us" },
  { ticker: "AMZN", name: "Amazon.com Inc.", category: "stock_us" },
  { ticker: "NVDA", name: "NVIDIA Corp.", category: "stock_us" },
  { ticker: "META", name: "Meta Platforms Inc.", category: "stock_us" },
  { ticker: "TSLA", name: "Tesla Inc.", category: "stock_us" },
  { ticker: "BRK.B", name: "Berkshire Hathaway Inc.", category: "stock_us" },
  { ticker: "JPM", name: "JPMorgan Chase & Co.", category: "stock_us" },
  { ticker: "V", name: "Visa Inc.", category: "stock_us" },
  { ticker: "WMT", name: "Walmart Inc.", category: "stock_us" },
  { ticker: "JNJ", name: "Johnson & Johnson", category: "stock_us" },
  { ticker: "PG", name: "Procter & Gamble Co.", category: "stock_us" },
  { ticker: "XOM", name: "Exxon Mobil Corp.", category: "stock_us" },
  { ticker: "UNH", name: "UnitedHealth Group Inc.", category: "stock_us" },
  { ticker: "HD", name: "Home Depot Inc.", category: "stock_us" },
  { ticker: "KO", name: "Coca-Cola Co.", category: "stock_us" },
  { ticker: "PEP", name: "PepsiCo Inc.", category: "stock_us" },
  { ticker: "AVGO", name: "Broadcom Inc.", category: "stock_us" },
  { ticker: "ORCL", name: "Oracle Corp.", category: "stock_us" },
  { ticker: "CRM", name: "Salesforce Inc.", category: "stock_us" },
  { ticker: "AMD", name: "Advanced Micro Devices", category: "stock_us" },
  { ticker: "NFLX", name: "Netflix Inc.", category: "stock_us" },
  { ticker: "DIS", name: "Walt Disney Co.", category: "stock_us" },
  { ticker: "ADBE", name: "Adobe Inc.", category: "stock_us" },
  { ticker: "INTC", name: "Intel Corp.", category: "stock_us" },
  { ticker: "CMCSA", name: "Comcast Corp.", category: "stock_us" },
  { ticker: "BA", name: "Boeing Co.", category: "stock_us" },
  // US REITs
  { ticker: "O", name: "Realty Income Corp.", category: "reit" },
  { ticker: "PLD", name: "Prologis Inc.", category: "reit" },
  { ticker: "AMT", name: "American Tower Corp.", category: "reit" },
  { ticker: "WELL", name: "Welltower Inc.", category: "reit" },
  { ticker: "EQIX", name: "Equinix Inc.", category: "reit" },
  { ticker: "SPG", name: "Simon Property Group", category: "reit" },
  { ticker: "PSA", name: "Public Storage", category: "reit" },
  { ticker: "CCI", name: "Crown Castle Inc.", category: "reit" },
  { ticker: "DLR", name: "Digital Realty Trust", category: "reit" },
  { ticker: "AVB", name: "AvalonBay Communities", category: "reit" },
  { ticker: "EQR", name: "Equity Residential", category: "reit" },
  { ticker: "VTR", name: "Ventas Inc.", category: "reit" },
  // US ETFs (broad market) — classified as etf_internacional
  { ticker: "VT", name: "Vanguard Total World Stock ETF", category: "etf_internacional" },
  { ticker: "VTI", name: "Vanguard Total Stock Market ETF", category: "etf_internacional" },
  { ticker: "VXUS", name: "Vanguard Total International Stock ETF", category: "etf_internacional" },
  { ticker: "BND", name: "Vanguard Total Bond Market ETF", category: "etf_internacional" },
  { ticker: "SPY", name: "SPDR S&P 500 ETF", category: "etf_internacional" },
  { ticker: "QQQ", name: "Invesco QQQ Trust", category: "etf_internacional" },
  { ticker: "VOO", name: "Vanguard S&P 500 ETF", category: "etf_internacional" },
  { ticker: "IVV", name: "iShares Core S&P 500 ETF", category: "etf_internacional" },
  { ticker: "IEFA", name: "iShares Core MSCI EAFE ETF", category: "etf_internacional" },
  { ticker: "EEM", name: "iShares MSCI Emerging Markets ETF", category: "etf_internacional" },
  { ticker: "VNQ", name: "Vanguard Real Estate ETF", category: "etf_internacional" },
  { ticker: "GLD", name: "SPDR Gold Shares", category: "etf_internacional" },
  { ticker: "SCHD", name: "Schwab US Dividend Equity ETF", category: "etf_internacional" },
  // Brazilian ETFs
  { ticker: "IVVB11", name: "iShares S&P 500 BDR", category: "bdr" },
  { ticker: "BOVA11", name: "iShares Ibovespa ETF", category: "etf" },
  { ticker: "SMAL11", name: "iShares Small Cap ETF", category: "etf" },
  { ticker: "WRLD11", name: "Global X BDR ETF", category: "bdr" },
  { ticker: "HASH11", name: "Hashdex Nasdaq Crypto ETF", category: "etf" },
  // Fixed income
  { ticker: "TESOURO_SELIC_2027", name: "Tesouro Selic 2027", category: "fixed_income" },
  { ticker: "TESOURO_SELIC_2029", name: "Tesouro Selic 2029", category: "fixed_income" },
  { ticker: "TESOURO_PREFIXADO_2028", name: "Tesouro Prefixado 2028", category: "fixed_income" },
  { ticker: "TESOURO_PREFIXADO_2031", name: "Tesouro Prefixado 2031", category: "fixed_income" },
  { ticker: "TESOURO_IPCA_2029", name: "Tesouro IPCA+ 2029", category: "fixed_income" },
  { ticker: "TESOURO_IPCA_2035", name: "Tesouro IPCA+ 2035", category: "fixed_income" },
  { ticker: "TESOURO_IPCA_2045", name: "Tesouro IPCA+ 2045", category: "fixed_income" },
  { ticker: "CDB_100_CDI", name: "CDB 100% CDI", category: "fixed_income" },
  { ticker: "CDB_110_CDI", name: "CDB 110% CDI", category: "fixed_income" },
  { ticker: "CDB_120_CDI", name: "CDB 120% CDI", category: "fixed_income" },
  { ticker: "LCI_90_CDI", name: "LCI 90% CDI", category: "fixed_income" },
  { ticker: "LCA_90_CDI", name: "LCA 90% CDI", category: "fixed_income" },
  { ticker: "LCI_95_CDI", name: "LCI 95% CDI", category: "fixed_income" },
  { ticker: "DEBENTURE_IPCA", name: "Debênture IPCA+", category: "fixed_income" },
  { ticker: "CRI_CDI", name: "CRI", category: "fixed_income" },
  { ticker: "CRA_CDI", name: "CRA", category: "fixed_income" },
];

const YAHOO_SEARCH_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36";

async function searchYahooFinance(
  query: string,
): Promise<TickerSuggestion[]> {
  try {
    const url = `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=6&newsCount=0`;
    const res = await fetch(url, { headers: { "User-Agent": YAHOO_SEARCH_UA } });
    if (!res.ok) return [];
    const json = (await res.json()) as {
      quotes?: Array<{
        symbol: string;
        shortname?: string;
        longname?: string;
        quoteType?: string;
      }>;
    };
    return (json.quotes ?? [])
      .filter((q) => q.symbol && q.quoteType !== "CRYPTOCURRENCY" && !q.symbol.includes("^"))
      .map((q) => {
        const symbol = q.symbol.toUpperCase();
        const name = q.longname ?? q.shortname ?? symbol;
        return { ticker: symbol, name };
      });
  } catch {
    return [];
  }
}

const TICKER_CACHE_VERSION = "v3";

export const searchTickers = createServerFn({ method: "GET" })
  .validator(z.object({ q: z.string().max(50).default("") }))
  .handler(async ({ data }): Promise<TickerSuggestion[]> => {
    const cached = getCached<TickerSuggestion[]>(`ticker-suggestions-${TICKER_CACHE_VERSION}`);
    let list = cached;
    if (!list) {
      const brList: TickerSuggestion[] = [];
      try {
        const res = await brapiFetch("/tickers?limit=2000");
        if (res.ok) {
          const json = (await res.json()) as { results?: V2TickerItem[] };
          for (const r of json.results ?? []) {
            if (r.isActive !== false) {
              brList.push({
                ticker: r.symbol,
                name: r.longName ?? r.name ?? r.symbol,
                price: r.quote?.lastPrice,
                changePct: r.quote?.changePercent,
              });
            }
          }
        }
      } catch {
        // ignore
      }
      list = [...brList, ...EXTRA_SUGGESTIONS];
      setCache(`ticker-suggestions-${TICKER_CACHE_VERSION}`, list);
    }
    const items = list.length > 0
      ? list
      : [...ASSETS.map((a) => ({ ticker: a.ticker, name: a.name, price: a.price, changePct: a.changeDayPct })), ...EXTRA_SUGGESTIONS];
    if (!data.q) return items.slice(0, 6);
    const term = data.q.trim().toUpperCase();

    const local = items
      .filter((a) => a.ticker.startsWith(term) || a.name.toUpperCase().includes(term))
      .slice(0, 6);

    if (local.length >= 3) return local;

    const yahoo = await searchYahooFinance(data.q);
    const seen = new Set(local.map((a) => a.ticker));
    const merged = [...local];
    for (const y of yahoo) {
      if (!seen.has(y.ticker)) {
        merged.push(y);
        seen.add(y.ticker);
        if (merged.length >= 6) break;
      }
    }
    return merged;
  });

interface YahooData {
  fundamentals: YahooFundamentals;
  history: { date: string; close: number }[] | null;
  dividends: { paidAt: string; amount: number }[] | null;
}

export interface RealProjection {
  ticker: string;
  name: string;
  sector: string;
  type: "stock" | "fii";
  amount: number;
  exDate: string;
  paymentDate: string;
  status: "declared" | "projected";
  avgAmount: number;
}

function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

export const getRealProjections = createServerFn({ method: "POST" })
  .validator(
    z.object({
      tickers: z.array(z.string().min(1).max(10)).min(0).max(50),
    }),
  )
  .handler(async ({ data }): Promise<RealProjection[]> => {
    const { tickers } = data;
    if (tickers.length === 0) return [];

    const now = new Date();
    const projections: RealProjection[] = [];
    const done = new Set<string>();

    for (const ticker of tickers) {
      if (done.has(ticker)) continue;
      done.add(ticker);
      const isFii = FIIS.some((f) => f.ticker === ticker);
      const mockAsset = ASSETS_BY_TICKER[ticker];
      const mockFii = FIIS.find((f) => f.ticker === ticker);
      let dividends: { paidAt: string; amount: number }[] | null = null;

      try {
        const yahooDivs = await fetchYahooDividends(ticker);
        if (yahooDivs && yahooDivs.length > 0) dividends = yahooDivs;
      } catch {
        // fall through to mock
      }

      if (!dividends || dividends.length === 0) {
        if (isFii && mockFii) {
          dividends = mockFii.dividendHistory.map((d) => ({ paidAt: d.paidAt, amount: d.amount }));
        } else if (mockAsset) {
          dividends = mockAsset.dividends.map((d) => ({ paidAt: d.paidAt, amount: d.amount }));
        }
      }

      if (!dividends || dividends.length === 0) continue;

      const avgAmount = dividends.reduce((s, d) => s + d.amount, 0) / dividends.length;
      const name = mockFii?.name ?? mockAsset?.name ?? ticker;
      const sector = mockFii?.segment ?? mockAsset?.sector ?? "Outros";
      const periods = isFii ? 6 : 4;
      const monthsPerPeriod = isFii ? 1 : 3;

      for (let i = 1; i <= periods; i++) {
        const payDate = addMonths(now, i * monthsPerPeriod);
        const exDate = new Date(payDate);
        exDate.setDate(exDate.getDate() - (isFii ? 2 : 3));
        const variation = avgAmount * (0.85 + Math.random() * 0.3);
        const amount = Number(variation.toFixed(2));
        const status: "declared" | "projected" =
          isFii && i <= 2 ? "declared" : i === 1 ? "declared" : "projected";
        projections.push({
          ticker,
          name,
          sector,
          type: isFii ? "fii" : "stock",
          amount,
          exDate: exDate.toISOString().slice(0, 10),
          paymentDate: payDate.toISOString().slice(0, 10),
          status,
          avgAmount: Number(avgAmount.toFixed(2)),
        });
      }
    }

    projections.sort((a, b) => a.paymentDate.localeCompare(b.paymentDate));
    return projections;
  });

export interface BenchmarkPoint {
  date: string;
  ibov: number;
  idiv: number;
  ifix: number;
}

export const getBenchmarkData = createServerFn({ method: "GET" }).handler(
  async (): Promise<BenchmarkPoint[]> => {
    const cacheKey = "benchmark-history";
    const cached = getCached<BenchmarkPoint[]>(cacheKey);
    if (cached) return cached;

    const indices = [
      { key: "ibov" as const, ticker: "^BVSP" },
      { key: "idiv" as const, ticker: "^IDIV" },
      { key: "ifix" as const, ticker: "IFIX.SA" },
    ];

    const results = await Promise.all(
      indices.map(async ({ key, ticker }) => {
        const data = await fetchYahooHistory(ticker, "2y", "1wk");
        return { key, data: data ?? [] };
      }),
    );

    const seriesMap: Record<string, { date: string; close: number }[]> = {};
    for (const { key, data } of results) {
      seriesMap[key] = data;
    }

    // Merge dates from all series
    const dateSet = new Set<string>();
    for (const data of Object.values(seriesMap)) {
      for (const d of data) dateSet.add(d.date);
    }
    const dates = [...dateSet].sort();

    // Normalize to base 1000 at the earliest common date
    const normalize = (series: { date: string; close: number }[], baseVal: number) => {
      return series.map((d) => ({ date: d.date, value: (d.close / baseVal) * 1000 }));
    };

    const ibovBase = seriesMap.ibov[0]?.close ?? 1000;
    const idivBase = seriesMap.idiv[0]?.close ?? 1000;
    const ifixBase = seriesMap.ifix[0]?.close ?? 1000;

    const ibovNorm = normalize(seriesMap.ibov, ibovBase);
    const idivNorm = normalize(seriesMap.idiv, idivBase);
    const ifixNorm = normalize(seriesMap.ifix, ifixBase);

    const ibovMap = new Map(ibovNorm.map((d) => [d.date, d.value]));
    const idivMap = new Map(idivNorm.map((d) => [d.date, d.value]));
    const ifixMap = new Map(ifixNorm.map((d) => [d.date, d.value]));

    const benchmark: BenchmarkPoint[] = dates
      .map((date) => ({
        date,
        ibov: ibovMap.get(date) ?? 0,
        idiv: idivMap.get(date) ?? 0,
        ifix: ifixMap.get(date) ?? 0,
      }))
      .filter((d) => d.ibov > 0 || d.idiv > 0 || d.ifix > 0);

    setCache(cacheKey, benchmark);
    return benchmark;
  },
);

export const getFinancialStatements = createServerFn({ method: "GET" })
  .validator(z.object({ ticker: z.string().min(1).max(20) }))
  .handler(async ({ data }): Promise<FinancialStatements | null> => {
    const ticker = data.ticker.toUpperCase();
    const cached = getCached<FinancialStatements>(`fin-stmts-${ticker}`);
    if (cached) return cached;
    return fetchYahooFinancialStatements(ticker);
  });
