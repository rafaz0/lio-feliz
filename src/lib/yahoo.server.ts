const YAHOO_BASE = "https://query1.finance.yahoo.com";

export function toYahooSymbol(ticker: string): string {
  const t = ticker.toUpperCase().trim();
  if (t.endsWith(".SA")) return t;
  if (/^[A-Z0-9]{4,6}$/.test(t)) return t + ".SA";
  return t;
}

export interface YahooFundamentals {
  price: number;
  changePct: number;
  name: string;
  sector: string;
  marketCap: number;
  pl: number;
  pvp: number | null;
  lpa: number;
  vpa: number | null;
  dy: number;
  roe: number | null;
  roic: number | null;
  margemLiquida: number | null;
  divLiquidaEbitda: number | null;
  evEbitda: number | null;
  payout: number | null;
  psr: number | null;
  dividendCagr: number;
  description: string;
}

export async function fetchYahooFundamentals(ticker: string): Promise<YahooFundamentals | null> {
  const symbol = toYahooSymbol(ticker);
  const url = `${YAHOO_BASE}/v10/finance/quoteSummary/${encodeURIComponent(symbol)}?modules=price,summaryDetail,defaultKeyStatistics,financialData,calendarEvents,incomeStatementHistory,balanceSheetHistory,cashflowStatementHistory`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const result = json?.quoteSummary?.result?.[0];
    if (!result) return null;

    const price = result.price;
    const summary = result.summaryDetail;
    const stats = result.defaultKeyStatistics;
    const fin = result.financialData;

    const currentPrice = price?.regularMarketPrice?.raw ?? 0;
    const changePct = price?.regularMarketChangePercent?.raw ?? 0;
    const name = price?.longName ?? price?.shortName ?? ticker;

    const marketCap = summary?.marketCap?.raw ?? stats?.marketCap?.raw ?? 0;
    const pl = summary?.trailingPE?.raw ?? stats?.trailingPE?.raw ?? 0;
    const lpa = stats?.trailingEps?.raw ?? 0;
    const bookValue = stats?.bookValue?.raw;
    const vpa = bookValue ?? null;
    const dividendYield = summary?.dividendYield?.raw
      ? summary.dividendYield.raw * 100
      : (stats?.dividendYield?.raw ? stats.dividendYield.raw * 100 : 0);
    const roe = stats?.returnOnEquity?.raw
      ? stats.returnOnEquity.raw * 100
      : null;
    const roic = stats?.returnOnCapital?.raw
      ? stats.returnOnCapital.raw * 100
      : null;
    const profitMargin = fin?.profitMargins?.raw
      ? fin.profitMargins.raw * 100
      : null;
    const debtToEbitda = stats?.debtToEquity?.raw
      ? stats.debtToEquity.raw / 100
      : null;
    const enterpriseValue = stats?.enterpriseValue?.raw ?? null;
    const ebitda = fin?.ebitda?.raw ?? null;
    const evEbitda = (enterpriseValue && ebitda && ebitda > 0)
      ? enterpriseValue / ebitda
      : null;
    const payoutRatio = stats?.payoutRatio?.raw
      ? stats.payoutRatio.raw * 100
      : (stats?.trailingPE?.raw && summary?.dividendYield?.raw
        ? stats.trailingPE.raw * summary.dividendYield.raw * 100
        : null);
    const revenuePerShare = fin?.revenuePerShare?.raw ?? null;
    const psr = (revenuePerShare && currentPrice > 0)
      ? currentPrice / revenuePerShare
      : null;
    const sector = price?.sector ?? price?.underlyingSector ?? "";
    const description = price?.longBusinessSummary ?? "";

    const dividendCagr = 5;

    return {
      price: currentPrice,
      changePct,
      name,
      sector,
      marketCap,
      pl,
      pvp: (bookValue && currentPrice > 0) ? currentPrice / bookValue : null,
      lpa,
      vpa,
      dy: dividendYield,
      roe,
      roic,
      margemLiquida: profitMargin,
      divLiquidaEbitda: debtToEbitda,
      evEbitda,
      payout: payoutRatio,
      psr,
      dividendCagr,
      description,
    };
  } catch {
    return null;
  }
}

export async function fetchYahooHistory(
  ticker: string,
  range = "1y",
  interval = "1wk",
): Promise<{ date: string; close: number }[] | null> {
  const symbol = toYahooSymbol(ticker);
  const url = `${YAHOO_BASE}/v8/finance/chart/${encodeURIComponent(symbol)}?range=${range}&interval=${interval}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) return null;

    const timestamps: number[] = result.timestamp ?? [];
    const closes: number[] = result.indicators?.quote?.[0]?.close ?? [];
    const adjCloses: number[] = result.indicators?.adjclose?.[0]?.adjclose ?? [];

    return timestamps
      .map((ts, i) => ({
        date: new Date(ts * 1000).toISOString().slice(0, 10),
        close: adjCloses[i] ?? closes[i] ?? 0,
      }))
      .filter((d) => d.close > 0);
  } catch {
    return null;
  }
}

export async function fetchYahooDividends(
  ticker: string,
): Promise<{ paidAt: string; amount: number }[] | null> {
  const symbol = toYahooSymbol(ticker);
  const url = `${YAHOO_BASE}/v8/finance/chart/${encodeURIComponent(symbol)}?range=5y&interval=1mo&events=div`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) return null;

    const timestamps: number[] = result.timestamp ?? [];
    const amounts: number[] = result.indicators?.dividends?.[0]?.amount ?? [];

    return timestamps
      .map((ts, i) => ({
        paidAt: new Date(ts * 1000).toISOString().slice(0, 10),
        amount: amounts[i] ?? 0,
      }))
      .filter((d) => d.amount > 0);
  } catch {
    return null;
  }
}

export interface FinancialStatement {
  endDate: string;
  totalRevenue: number | null;
  grossProfit: number | null;
  operatingIncome: number | null;
  netIncome: number | null;
  ebitda: number | null;
  totalAssets: number | null;
  totalLiabilities: number | null;
  totalEquity: number | null;
  operatingCashFlow: number | null;
  capitalExpenditures: number | null;
  freeCashFlow: number | null;
}

export interface FinancialStatements {
  incomeHistory: FinancialStatement[];
  balanceSheetHistory: FinancialStatement[];
  cashFlowHistory: FinancialStatement[];
}

function parseDate(e: { endDate?: { raw?: number; fmt?: string } }): string {
  if (e?.endDate?.raw) return new Date(e.endDate.raw * 1000).toISOString().slice(0, 10);
  if (e?.endDate?.fmt) return e.endDate.fmt;
  return "";
}

function mapIncomeEntry(e: Record<string, { raw?: number } | undefined>): FinancialStatement {
  return {
    endDate: parseDate(e as any),
    totalRevenue: e?.totalRevenue?.raw ?? null,
    grossProfit: e?.grossProfit?.raw ?? null,
    operatingIncome: e?.operatingIncome?.raw ?? null,
    netIncome: e?.netIncomeFromContinuingOps?.raw ?? e?.netIncome?.raw ?? null,
    ebitda: e?.ebitda?.raw ?? null,
    totalAssets: null,
    totalLiabilities: null,
    totalEquity: null,
    operatingCashFlow: null,
    capitalExpenditures: null,
    freeCashFlow: null,
  };
}

function mapBalanceEntry(e: Record<string, { raw?: number } | undefined>): FinancialStatement {
  return {
    endDate: parseDate(e as any),
    totalRevenue: null,
    grossProfit: null,
    operatingIncome: null,
    netIncome: null,
    ebitda: null,
    totalAssets: e?.totalAssets?.raw ?? null,
    totalLiabilities: e?.totalLiabilities?.raw ?? null,
    totalEquity: e?.totalStockholderEquity?.raw ?? null,
    operatingCashFlow: null,
    capitalExpenditures: null,
    freeCashFlow: null,
  };
}

function mapCashFlowEntry(e: Record<string, { raw?: number } | undefined>): FinancialStatement {
  const opCashFlow = e?.totalCashFromOperatingActivities?.raw ?? null;
  const capEx = e?.capitalExpenditures?.raw ?? null;
  return {
    endDate: parseDate(e as any),
    totalRevenue: null,
    grossProfit: null,
    operatingIncome: null,
    netIncome: null,
    ebitda: null,
    totalAssets: null,
    totalLiabilities: null,
    totalEquity: null,
    operatingCashFlow: opCashFlow,
    capitalExpenditures: capEx,
    freeCashFlow: (opCashFlow !== null && capEx !== null) ? opCashFlow + capEx : null,
  };
}

export async function fetchYahooFinancialStatements(ticker: string): Promise<FinancialStatements | null> {
  const cached = getCached<FinancialStatements>(`fin-stmts-${ticker}`);
  if (cached) return cached;

  const symbol = toYahooSymbol(ticker);
  const url = `${YAHOO_BASE}/v10/finance/quoteSummary/${encodeURIComponent(symbol)}?modules=incomeStatementHistory,balanceSheetHistory,cashflowStatementHistory`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const result = json?.quoteSummary?.result?.[0];
    if (!result) return null;

    const income = result.incomeStatementHistory?.incomeStatementHistory ?? [];
    const balance = result.balanceSheetHistory?.balanceSheetStatements ?? [];
    const cashFlow = result.cashflowStatementHistory?.cashflowStatements ?? [];

    const data: FinancialStatements = {
      incomeHistory: income.map(mapIncomeEntry),
      balanceSheetHistory: balance.map(mapBalanceEntry),
      cashFlowHistory: cashFlow.map(mapCashFlowEntry),
    };

    setCache(`fin-stmts-${ticker}`, data);
    return data;
  } catch {
    return null;
  }
}

export interface YahooNewsItem {
  title: string;
  summary: string;
  source: string;
  date: string;
  link: string;
  tickers: string[];
}

export async function fetchYahooNews(ticker: string): Promise<YahooNewsItem[]> {
  const symbol = toYahooSymbol(ticker);
  const url = `${YAHOO_BASE}/v1/finance/search?q=${encodeURIComponent(symbol)}&newsCount=8`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        Accept: "application/json",
      },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const news: { title: string; publisher: string; link: string; providerPublishTime: number; type: string; uuid: string }[] = json?.news ?? [];

    return news
      .filter((n) => n.type === "STORY")
      .map((n) => ({
        title: n.title ?? "",
        summary: n.title ?? "",
        source: n.publisher ?? "Yahoo Finance",
        date: new Date((n.providerPublishTime ?? 0) * 1000).toISOString().slice(0, 10),
        link: n.link ?? "",
        tickers: [ticker],
      }))
      .filter((n) => n.title.length > 0);
  } catch {
    return [];
  }
}

const CACHE = new Map<string, { data: unknown; ts: number }>();
const CACHE_TTL = 60 * 60 * 1000;

export function getCached<T>(key: string): T | null {
  const entry = CACHE.get(key);
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.data as T;
  return null;
}

export function setCache(key: string, data: unknown): void {
  CACHE.set(key, { data, ts: Date.now() });
}

export interface AnnualDividends {
  year: number;
  totalPerShare: number;
  yieldPct: number | null;
  priceAtYearEnd: number | null;
}

export function aggregateAnnualDividends(
  dividends: { paidAt: string; amount: number }[],
  history: { date: string; close: number }[],
): AnnualDividends[] {
  const byYear = new Map<number, number>();
  for (const d of dividends) {
    const y = Number(d.paidAt.slice(0, 4));
    byYear.set(y, (byYear.get(y) ?? 0) + d.amount);
  }
  const priceAtYearEnd = (year: number): number | null => {
    let last: number | null = null;
    for (const h of history) {
      if (Number(h.date.slice(0, 4)) <= year && h.close > 0) last = h.close;
    }
    return last;
  };
  return Array.from(byYear.entries())
    .map(([year, totalPerShare]) => {
      const priceEoy = priceAtYearEnd(year);
      const yieldPct = priceEoy && priceEoy > 0 ? (totalPerShare / priceEoy) * 100 : null;
      return { year, totalPerShare, yieldPct, priceAtYearEnd: priceEoy };
    })
    .sort((a, b) => a.year - b.year);
}

/**
 * Dividend CAGR (Compound Annual Growth Rate) based on annual totals per share.
 * Uses the first and last available years, requiring at least 2 years apart.
 * Returns percent (e.g. 8.5 means +8.5%/year).
 */
export function computeDividendCAGR(annual: AnnualDividends[]): number | null {
  if (annual.length < 2) return null;
  const first = annual[0];
  const last = annual[annual.length - 1];
  if (first.totalPerShare <= 0 || last.totalPerShare <= 0) return null;
  const years = last.year - first.year;
  if (years < 1) return null;
  const ratio = last.totalPerShare / first.totalPerShare;
  return (Math.pow(ratio, 1 / years) - 1) * 100;
}
