import { ASSETS } from "./mock-data";
import { FIIS } from "./fii-mock-data";

export interface ProjectedDividend {
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

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function fmtDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function buildProjections(): ProjectedDividend[] {
  const now = new Date();
  const projections: ProjectedDividend[] = [];

  for (const asset of ASSETS) {
    const rand = seededRandom(asset.ticker.charCodeAt(0) + asset.ticker.charCodeAt(1));
    const avgAmount =
      asset.dividends.reduce((s, d) => s + d.amount, 0) / Math.max(asset.dividends.length, 1);
    const baseVal = avgAmount * (0.9 + rand() * 0.2);

    for (let q = 1; q <= 4; q++) {
      const payDate = addMonths(now, q * 3);
      const exDate = new Date(payDate);
      exDate.setDate(exDate.getDate() - 3);
      const status: "declared" | "projected" = q === 1 ? "declared" : "projected";
      const variation = baseVal * (0.85 + rand() * 0.3);
      projections.push({
        ticker: asset.ticker,
        name: asset.name,
        sector: asset.sector,
        type: "stock",
        amount: Number(variation.toFixed(2)),
        exDate: fmtDate(exDate),
        paymentDate: fmtDate(payDate),
        status,
        avgAmount: Number(avgAmount.toFixed(2)),
      });
    }
  }

  for (const fii of FIIS) {
    const rand = seededRandom(fii.ticker.charCodeAt(0) + fii.ticker.charCodeAt(1));
    const avgAmount =
      fii.dividendHistory.reduce((s, d) => s + d.amount, 0) / Math.max(fii.dividendHistory.length, 1);
    const baseVal = avgAmount * (0.9 + rand() * 0.2);

    for (let m = 1; m <= 6; m++) {
      const payDate = addMonths(now, m);
      const exDate = new Date(payDate);
      exDate.setDate(exDate.getDate() - 2);
      const status: "declared" | "projected" = m <= 2 ? "declared" : "projected";
      const variation = baseVal * (0.9 + rand() * 0.2);
      projections.push({
        ticker: fii.ticker,
        name: fii.name,
        sector: fii.segment,
        type: "fii",
        amount: Number(variation.toFixed(2)),
        exDate: fmtDate(exDate),
        paymentDate: fmtDate(payDate),
        status,
        avgAmount: Number(avgAmount.toFixed(2)),
      });
    }
  }

  projections.sort((a, b) => a.paymentDate.localeCompare(b.paymentDate));
  return projections;
}
