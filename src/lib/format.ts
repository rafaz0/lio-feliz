const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const brlCompact = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

const num = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });
const num4 = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 4 });
const pct = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatBRL = (v: number) => brl.format(v);
export const formatBRLCompact = (v: number) => brlCompact.format(v);
export const formatNumber = (v: number) => num.format(v);
export const formatQty = (v: number) => num4.format(v);
export const formatPct = (v: number) => `${v >= 0 ? "+" : ""}${pct.format(v)}%`;
export const formatPctPlain = (v: number) => `${pct.format(v)}%`;

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
