export interface AnnualDividends {
  year: number;
  totalPerShare: number;
  count: number;
}

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
