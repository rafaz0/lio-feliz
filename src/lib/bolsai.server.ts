const BOLSAI_BASE = "https://api.usebolsai.com/api/v1";

const CACHE = new Map<string, { data: unknown; ts: number }>();
// 24h TTL to respect the free plan rate limit (200 req/day)
const CACHE_TTL = 24 * 60 * 60 * 1000;

export function getBolsaiCached<T>(key: string): T | null {
  const entry = CACHE.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data as T;
  return null;
}

export function setBolsaiCache(key: string, data: unknown): void {
  CACHE.set(key, { data, ts: Date.now() });
}

export interface BolsaiStockFundamentals {
  ticker: string;
  name?: string;
  close_price: number;
  market_cap: number;
  pl: number | null;
  pvp: number | null;
  ev_ebitda: number | null;
  ev_ebit: number | null;
  p_ebitda: number | null;
  p_ebit: number | null;
  p_sr: number | null;
  lpa: number | null;
  vpa: number | null;
  gross_margin: number | null;
  net_margin: number | null;
  ebitda_margin: number | null;
  ebit_margin: number | null;
  roe: number | null;
  roa: number | null;
  roic: number | null;
  current_ratio: number | null;
  debt_equity: number | null;
  net_debt_equity: number | null;
  net_debt_ebitda: number | null;
  cagr_revenue_5y: number | null;
  cagr_earnings_5y: number | null;
  dividend_yield?: number | null;
}

export interface BolsaiFiiFundamentals {
  ticker: string;
  name?: string;
  close_price: number;
  book_value_per_share: number | null;
  pvp: number | null;
  dividend_yield_ttm: number | null;
  net_asset_value: number | null;
  shares_outstanding: number | null;
  segment?: string | null;
}

function bolsaiFetch(path: string): Promise<Response> {
  const token = process.env.BOLSAI_API_KEY;
  if (!token) return Promise.reject(new Error("BOLSAI_API_KEY not configured"));
  const headers: Record<string, string> = { Accept: "application/json" };
  headers["X-API-Key"] = token;
  return fetch(`${BOLSAI_BASE}${path}`, {
    headers,
    signal: AbortSignal.timeout(8000),
  });
}

/**
 * Fetch fundamentals for a Brazilian stock via bolsai.
 * Returns null on 404 (not covered), rate-limit (429) or network error.
 */
export async function fetchBolsaiStockFundamentals(
  ticker: string,
): Promise<BolsaiStockFundamentals | null> {
  const key = `bolsai-stock-${ticker}`;
  const cached = getBolsaiCached<BolsaiStockFundamentals>(key);
  if (cached) return cached;

  try {
    const res = await bolsaiFetch(`/fundamentals/${encodeURIComponent(ticker)}`);
    if (res.status === 404) return null;
    if (res.status === 429) return null;
    if (!res.ok) return null;
    const json = (await res.json()) as BolsaiStockFundamentals;
    if (!json || typeof json.ticker !== "string") return null;
    setBolsaiCache(key, json);
    return json;
  } catch {
    return null;
  }
}

/**
 * Fetch fundamentals for a Brazilian FII via bolsai.
 */
export async function fetchBolsaiFiiFundamentals(
  ticker: string,
): Promise<BolsaiFiiFundamentals | null> {
  const key = `bolsai-fii-${ticker}`;
  const cached = getBolsaiCached<BolsaiFiiFundamentals>(key);
  if (cached) return cached;

  try {
    const res = await bolsaiFetch(`/fiis/${encodeURIComponent(ticker)}`);
    if (res.status === 404) return null;
    if (res.status === 429) return null;
    if (!res.ok) return null;
    const json = (await res.json()) as BolsaiFiiFundamentals;
    if (!json || typeof json.ticker !== "string") return null;
    setBolsaiCache(key, json);
    return json;
  } catch {
    return null;
  }
}

export function isFiiTicker(ticker: string): boolean {
  return /^\w+11$/.test(ticker.toUpperCase());
}

export interface BolsaiPricePoint {
  date: string;
  close: number;
}

interface BolsaiHistoryPrice {
  trade_date: string;
  close?: number;
  adjusted_close?: number;
}

async function fetchBolsaiHistory(
  basePath: "/stocks" | "/fiis",
  cachePrefix: string,
  ticker: string,
): Promise<BolsaiPricePoint[] | null> {
  const key = `${cachePrefix}-${ticker}`;
  const cached = getBolsaiCached<BolsaiPricePoint[]>(key);
  if (cached) return cached;

  try {
    const res = await bolsaiFetch(`${basePath}/${encodeURIComponent(ticker)}/history?limit=5000`);
    if (res.status === 404) return null;
    if (res.status === 429) return null;
    if (!res.ok) return null;
    const json = (await res.json()) as { prices?: BolsaiHistoryPrice[] };
    const points = (json.prices ?? [])
      .map((p) => ({ date: p.trade_date, close: p.adjusted_close ?? p.close ?? 0 }))
      .filter((p) => p.close > 0)
      // API retorna do mais recente pro mais antigo; buildPortfolioHistory espera ordem crescente.
      .sort((a, b) => a.date.localeCompare(b.date));
    setBolsaiCache(key, points);
    return points;
  } catch {
    return null;
  }
}

/**
 * Historico de precos diarios reais (ajustados por splits/dividendos) de uma
 * acao da B3, via bolsai. So cobre tickers da B3 - nao serve para ativos
 * internacionais (ex: VT, stocks EUA).
 */
export function fetchBolsaiStockHistory(ticker: string): Promise<BolsaiPricePoint[] | null> {
  return fetchBolsaiHistory("/stocks", "bolsai-stock-history", ticker);
}

/**
 * Historico de precos diarios reais de um FII, via bolsai.
 */
export function fetchBolsaiFiiHistory(ticker: string): Promise<BolsaiPricePoint[] | null> {
  return fetchBolsaiHistory("/fiis", "bolsai-fii-history", ticker);
}
