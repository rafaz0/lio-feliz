import { ASSETS_BY_TICKER, getAsset } from "./mock-data";

export type AssetType =
  | "stock"
  | "fii"
  | "bdr"
  | "etf"
  | "fixed_income"
  | "crypto"
  | "etf_internacional"
  | "stock_us"
  | "reit"
  | "other";

const KNOWN_STOCK_US = new Set([
  "AAPL","MSFT","GOOGL","GOOG","AMZN","NVDA","META","TSLA","BRK.B",
  "JPM","V","WMT","JNJ","PG","XOM","UNH","HD","KO","PEP","AVGO",
  "ORCL","CRM","AMD","NFLX","DIS","ADBE","INTC","CMCSA","BA","COST",
  "TMO","ABBV","MRK","CVX","WFC","T","ABT","LLY","QCOM","FANG",
]);

const KNOWN_REITS = new Set([
  "O","PLD","AMT","WELL","EQIX","SPG","PSA","CCI","DLR","AVB","EQR","VTR",
  "ESS","UDR","INVH","MAA","CPT","HST","WPC","FRT","REG",
]);

const KNOWN_ETF_INTL = new Set([
  "VT","VTI","VXUS","BND","SPY","QQQ","VOO","IVV","IEFA","EEM","GLD","SCHD","VNQ",
  "IJR","IWM","XLF","XLK","XLE","XLI","XLV","XLY","XLU","XLP","XLB","XLRE",
  "VIG","VYM","DGRO","DVY","SCHH","ICLN","TAN","LIT","ARKK","ARKW",
]);

const KNOWN_ETF_BR = new Set(["BOVA11","SMAL11","HASH11","IVVB11","WRLD11","BBSD11","FIND11","GOLD11"]);

const KNOWN_BDR = new Set(["AAPL34","MSFT34","AMZO34","NVDC34","MELI34","GOOG34","TSLA34","KEPL34"]);

const KNOWN_BR_STOCKS = new Set([
  "PETR3","PETR4","VALE3","ITUB3","ITUB4","BBDC3","BBDC4","BBAS3","ABEV3","WEGE3",
  "RENT3","GOAU3","GOAU4","GGBR3","GGBR4","CSNA3","USIM3","USIM4","CMIG3","CMIG4",
  "ELET3","ELET6","EMBR3","JBSS3","BRFS3","B3SA3","RADL3","HAPV3","RAIL3","SUZB3",
  "LREN3","MGLU3","PCAR3","AZUL4","GOLL4","CVCB3","VVAR3","MRFG3","BEEF3","TOTS3",
  "TIMS3","VIVT3","ALOS3","RLOG3","SBSP3","EGIE3","CPFE3","NEOE3","ENGI11",
  "EQTL3","COGN3","FLRY3","HYPE3","PRIO3","PETZ3","BOVA11","SMAL11","HASH11",
  "ARZZ3","AMAR3","SLCE3","KLBN11","LEVE3","FRAS3","TUPY3","ETER3",
  "CGRA3","CGRA4","CRPG3","CRPG4","DOHL3","DOHL4","EUCA3","EUCA4",
]);

export function inferAssetType(ticker: string): AssetType {
  const upper = ticker.toUpperCase();
  if (KNOWN_STOCK_US.has(upper)) return "stock_us";
  if (KNOWN_REITS.has(upper)) return "reit";
  if (KNOWN_ETF_INTL.has(upper)) return "etf_internacional";
  if (KNOWN_ETF_BR.has(upper)) return "etf";
  if (KNOWN_BDR.has(upper)) return "bdr";
  if (KNOWN_BR_STOCKS.has(upper)) return "stock";
  // FIIs: ticker ends with 11 (most common pattern)
  if (/^\w+11$/.test(upper) && !KNOWN_ETF_BR.has(upper) && !KNOWN_BDR.has(upper)) return "fii";
  // Brazilian stocks: 4-6 letters + 1 digit (e.g. PETR4, BBAS3, WEGE3)
  if (/^[A-Z0-9]{4,6}\d$/.test(upper)) return "stock";
  // BDRs: 4-6 letters + 2 digits starting with 3 (e.g. AAPL34)
  if (/^[A-Z]{3,6}3\d$/.test(upper)) return "bdr";
  if (/^(BTC|ETH|SOL|ADA|DOT|AVAX|MATIC|LINK|XRP|DOGE|USDT|USDC|BNB)-?/.test(upper)) return "crypto";
  if (/^(TESOURO|CDB|LCI|LCA|CRI|CRA|DEBENTURE|LF|LIG|NTN)/.test(upper)) return "fixed_income";
  if (/^[A-Z0-9]{2,6}\d{2}$/.test(upper)) return "fixed_income";
  // If ticker is 1-5 uppercase letters (possibly with dot), it's likely a US stock
  if (/^[A-Z]{1,5}(\.[A-Z]{1,2})?$/.test(upper)) return "stock_us";
  return "other";
}

export type Currency = "BRL" | "USD";

export type OperationSide = "buy" | "sell" | "dividend" | "bonus";

export interface Operation {
  id: string;
  ticker: string;
  asset_type: AssetType;
  currency: Currency;
  side: OperationSide;
  quantity: number;
  price: number;
  fee: number;
  irrf: number;
  other_costs: number;
  metadata: Record<string, string | number | boolean> | null;
  traded_at: string;
  source: "manual" | "b3_import" | "pluggy" | "sync";
  notes: string | null;
  created_at: string;
}

export interface Position {
  ticker: string;
  name: string;
  sector: string;
  asset_type: AssetType;
  currency: Currency;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  invested: number;
  currentValue: number;
  pnl: number;
  pnlPct: number;
  weight: number;
  brlValue: number;
  brlInvested: number;
}

export interface PortfolioSummary {
  totalValue: number;
  totalInvested: number;
  totalPnl: number;
  totalPnlPct: number;
  positions: Position[];
  sectorAllocation: { sector: string; value: number; pct: number }[];
  typeAllocation: { type: AssetType; value: number; pct: number }[];
}

export interface PortfolioHistoryPoint {
  date: string;
  value: number;
  invested: number;
}

function brl(value: number, currency: Currency, rates: Record<string, number>): number {
  return currency === "USD" ? value * (rates["USD"] ?? 1) : value;
}

export function buildPortfolioHistory(
  ops: Operation[],
  priceOverrides?: Record<string, number>,
  exchangeRates?: Record<string, number>,
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

  for (const date of uniqueDates) {
    const byTicker = new Map<string, { qty: number; totalCost: number }>();
    let totalInvested = 0;

    for (const op of sorted) {
      if (op.traded_at > date) break;
      const cur = byTicker.get(op.ticker) ?? { qty: 0, totalCost: 0 };
      if (op.side === "buy") {
        cur.qty += op.quantity;
        cur.totalCost += op.quantity * op.price + (op.fee ?? 0) + (op.irrf ?? 0) + (op.other_costs ?? 0);
      } else if (op.side === "sell") {
        const avg = cur.qty > 0 ? cur.totalCost / cur.qty : 0;
        const sellQty = Math.min(op.quantity, cur.qty);
        cur.totalCost -= avg * sellQty;
        cur.qty -= sellQty;
        if (cur.qty <= 0.00001) {
          cur.qty = 0;
          cur.totalCost = 0;
        }
      } else if (op.side === "dividend") {
        const amount = op.quantity * op.price;
        cur.totalCost = Math.max(0, cur.totalCost - amount);
      } else if (op.side === "bonus") {
        cur.qty += op.quantity;
      }
      byTicker.set(op.ticker, cur);
    }

    const rates = exchangeRates ?? {};
    let totalValue = 0;
    let investedSum = 0;
    for (const [ticker, { qty, totalCost }] of byTicker.entries()) {
      if (qty <= 0) continue;
      const asset = getAsset(ticker);
      const overridePrice = priceOverrides?.[ticker];
      const avgPrice = qty > 0 ? totalCost / qty : 0;
      const priceAtDate = asset
        ? (asset.history.find((h) => h.date <= date)?.close ?? asset.price)
        : null;
      const currentPrice = typeof overridePrice === "number"
        ? overridePrice
        : (priceAtDate ?? avgPrice);
      const first = sorted.find((o) => o.ticker === ticker);
      const currency: Currency = first?.currency ?? "BRL";
      totalValue += brl(qty * currentPrice, currency, rates);
      investedSum += brl(totalCost, currency, rates);
    }

    points.push({ date, value: totalValue, invested: investedSum });
  }

  return points;
}

export function consolidatePortfolio(
  ops: Operation[],
  priceOverrides?: Record<string, number>,
  exchangeRates?: Record<string, number>,
): PortfolioSummary {
  const byTicker = new Map<string, { qty: number; totalCost: number }>();

  const sorted = [...ops].sort(
    (a, b) => a.traded_at.localeCompare(b.traded_at) || a.created_at.localeCompare(b.created_at),
  );

  for (const op of sorted) {
    const cur = byTicker.get(op.ticker) ?? { qty: 0, totalCost: 0 };
    if (op.side === "buy") {
      cur.qty += op.quantity;
      cur.totalCost += op.quantity * op.price + (op.fee ?? 0) + (op.irrf ?? 0) + (op.other_costs ?? 0);
    } else if (op.side === "sell") {
      const avg = cur.qty > 0 ? cur.totalCost / cur.qty : 0;
      const sellQty = Math.min(op.quantity, cur.qty);
      cur.totalCost -= avg * sellQty;
      cur.qty -= sellQty;
      if (cur.qty <= 0.00001) {
        cur.qty = 0;
        cur.totalCost = 0;
      }
    } else if (op.side === "dividend") {
      const amount = op.quantity * op.price;
      cur.totalCost = Math.max(0, cur.totalCost - amount);
    } else if (op.side === "bonus") {
      cur.qty += op.quantity;
    }
    byTicker.set(op.ticker, cur);
  }

  const rates = exchangeRates ?? {};
  const positions: Position[] = [];
  for (const [ticker, { qty, totalCost }] of byTicker.entries()) {
    if (qty <= 0) continue;
    const firstOp = sorted.find((o) => o.ticker === ticker);
    const currency: Currency = firstOp?.currency ?? "BRL";
    const asset = ASSETS_BY_TICKER[ticker];
    const avgPrice = qty > 0 ? totalCost / qty : 0;
    const overridePrice = priceOverrides?.[ticker];
    const currentPrice = typeof overridePrice === "number"
      ? overridePrice
      : (asset?.price ?? avgPrice);
    const currentValue = qty * currentPrice;
    const invested = qty * avgPrice;
    const pnl = currentValue - invested;
    const pnlPct = invested > 0 ? (pnl / invested) * 100 : 0;
    positions.push({
      ticker,
      name: asset?.name ?? ticker,
      sector: asset?.sector ?? "—",
      asset_type: inferAssetType(ticker),
      currency,
      quantity: qty,
      avgPrice,
      currentPrice,
      invested: brl(invested, currency, rates),
      currentValue: brl(currentValue, currency, rates),
      pnl: brl(pnl, currency, rates),
      pnlPct,
      weight: 0,
      brlValue: brl(currentValue, currency, rates),
      brlInvested: brl(invested, currency, rates),
    });
  }

  const totalValue = positions.reduce((s, p) => s + p.currentValue, 0);
  const totalInvested = positions.reduce((s, p) => s + p.invested, 0);
  const totalPnl = totalValue - totalInvested;
  const totalPnlPct = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  for (const p of positions) {
    p.weight = totalValue > 0 ? (p.currentValue / totalValue) * 100 : 0;
  }
  positions.sort((a, b) => b.currentValue - a.currentValue);

  const sectorMap = new Map<string, number>();
  for (const p of positions) {
    sectorMap.set(p.sector, (sectorMap.get(p.sector) ?? 0) + p.currentValue);
  }
  const sectorAllocation = Array.from(sectorMap.entries())
    .map(([sector, value]) => ({
      sector,
      value,
      pct: totalValue > 0 ? (value / totalValue) * 100 : 0,
    }))
    .sort((a, b) => b.value - a.value);

  const typeMap = new Map<AssetType, number>();
  for (const p of positions) {
    typeMap.set(p.asset_type, (typeMap.get(p.asset_type) ?? 0) + p.currentValue);
  }
  const typeAllocation = Array.from(typeMap.entries())
    .map(([type, value]) => ({ type, value, pct: totalValue > 0 ? (value / totalValue) * 100 : 0 }))
    .sort((a, b) => b.value - a.value);

  return { totalValue, totalInvested, totalPnl, totalPnlPct, positions, sectorAllocation, typeAllocation };
}
