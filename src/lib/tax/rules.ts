import type { AssetType } from "@/lib/portfolio";
import { inferAssetType } from "@/lib/portfolio";
import { formatBRL } from "@/lib/format";

export interface MonthSummary {
  month: string;
  ticker: string;
  type: AssetType;
  totalBuy: number;
  totalSell: number;
  netGain: number;
  taxRate: number;
  taxDue: number;
  exempt: boolean;
  cumNet: number;
}

export const TAX_RULES: Record<AssetType, { rate: number; exemption: number; dayTradeRate: number }> = {
  stock: { rate: 0.15, exemption: 20_000, dayTradeRate: 0.15 },
  fii: { rate: 0.20, exemption: 0, dayTradeRate: 0.15 },
  bdr: { rate: 0.15, exemption: 20_000, dayTradeRate: 0.15 },
  etf: { rate: 0.15, exemption: 20_000, dayTradeRate: 0.15 },
  etf_internacional: { rate: 0.15, exemption: 20_000, dayTradeRate: 0.15 },
  stock_us: { rate: 0.15, exemption: 20_000, dayTradeRate: 0.15 },
  reit: { rate: 0.15, exemption: 20_000, dayTradeRate: 0.15 },
  fixed_income: { rate: 0.15, exemption: 0, dayTradeRate: 0.15 },
  crypto: { rate: 0.15, exemption: 35_000, dayTradeRate: 0.15 },
  other: { rate: 0.15, exemption: 0, dayTradeRate: 0.15 },
};

export const TYPE_LABELS: Record<string, string> = {
  stock: "Ação", fii: "FII", bdr: "BDR", etf: "ETF",
  etf_internacional: "ETF Internacional", stock_us: "Stock EUA", reit: "REIT EUA",
  fixed_income: "Renda Fixa", crypto: "Cripto", other: "Outro",
};

export function classifyDayTrade(
  ops: { traded_at: string; side: "buy" | "sell"; quantity: number; price: number }[],
) {
  return ops.filter(
    (op, i, arr) => i > 0 && op.side === "sell" && op.traded_at === arr[i - 1]?.traded_at,
  );
}

export function splitIntoMonths(ops: { traded_at: string }[]) {
  const months = new Set<string>();
  for (const op of ops) months.add(op.traded_at.slice(0, 7));
  return Array.from(months).sort();
}

export function calcGainPerTicker(
  ops: { traded_at: string; side: "buy" | "sell"; quantity: number; price: number }[],
) {
  const sorted = [...ops].sort((a, b) => a.traded_at.localeCompare(b.traded_at));
  let qty = 0;
  let avgPrice = 0;
  let totalGain = 0;

  for (const op of sorted) {
    if (op.side === "buy") {
      const newQty = op.quantity;
      avgPrice = (avgPrice * qty + op.price * newQty) / (qty + newQty);
      qty += newQty;
    } else {
      const sellQty = Math.min(op.quantity, qty);
      if (sellQty > 0 && avgPrice > 0) {
        totalGain += (op.price - avgPrice) * sellQty;
      }
      qty -= sellQty;
      if (qty <= 0) {
        qty = 0;
        avgPrice = 0;
      }
    }
  }

  return totalGain;
}

export function calcMonthSummaries(
  ops: {
    ticker: string;
    asset_type?: AssetType;
    traded_at: string;
    side: "buy" | "sell";
    quantity: number;
    price: number;
  }[],
): MonthSummary[] {
  const months = splitIntoMonths(ops);
  const summaries: MonthSummary[] = [];
  const cumByType = new Map<AssetType, number>();

  for (const month of months) {
    const monthOps = ops.filter((o) => o.traded_at.startsWith(month));
    const tickers = [...new Set(monthOps.map((o) => o.ticker))];

    for (const ticker of tickers) {
      const tickerOps = monthOps.filter((o) => o.ticker === ticker);
      const firstOp = tickerOps[0];
      const type = firstOp?.asset_type ?? inferAssetType(ticker);
      const rules = TAX_RULES[type];
      const totalBuy = tickerOps
        .filter((o) => o.side === "buy")
        .reduce((s, o) => s + o.quantity * o.price, 0);
      const totalSell = tickerOps
        .filter((o) => o.side === "sell")
        .reduce((s, o) => s + o.quantity * o.price, 0);
      const netGain = calcGainPerTicker(tickerOps);
      const isDayTrade = classifyDayTrade(tickerOps).length > 0;
      const effectiveRate = isDayTrade ? rules.dayTradeRate : rules.rate;
      const exempt = rules.exemption > 0 && totalSell <= rules.exemption;
      const cum = cumByType.get(type) ?? 0;
      cumByType.set(type, cum + netGain);
      const taxable = cumByType.get(type)! > 0 ? netGain : 0;

      summaries.push({
        month,
        ticker,
        type,
        totalBuy,
        totalSell,
        netGain,
        taxRate: effectiveRate,
        taxDue: exempt || taxable <= 0 ? 0 : taxable * effectiveRate,
        exempt,
        cumNet: cumByType.get(type)!,
      });
    }
  }

  return summaries;
}

export function calcTotals(summaries: MonthSummary[]) {
  return {
    totalSell: summaries.reduce((s, i) => s + i.totalSell, 0),
    totalGain: summaries.reduce((s, i) => s + (i.netGain > 0 ? i.netGain : 0), 0),
    totalLoss: summaries.reduce((s, i) => s + (i.netGain < 0 ? i.netGain : 0), 0),
    totalTax: summaries.reduce((s, i) => s + i.taxDue, 0),
    months: [...new Set(summaries.map((s) => s.month))].length,
  };
}

export function exportToCsv(summaries: MonthSummary[]) {
  const header = "Mês,Ticker,Tipo,Total Compras,Total Vendas,Resultado (%)";

  const rows = summaries.map((s) =>
    [
      s.month,
      s.ticker,
      TYPE_LABELS[s.type] ?? s.type,
      formatBRL(s.totalBuy),
      formatBRL(s.totalSell),
      s.netGain.toFixed(2),
      s.taxDue.toFixed(2),
    ].join(","),
  );

  const csv = header + "\n" + rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "irpf_operacoes.csv";
  a.click();
  URL.revokeObjectURL(url);
}
