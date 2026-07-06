import { computeDividendCAGR, type AnnualDividends } from "./yahoo.server";

export interface ScorecardInputs {
  currentPrice: number;
  lpa: number;
  vpa: number | null;
  pl: number;
  pvp: number;
  roe: number;
  dy: number;
  divLiquidaEbitda: number;
  ew: {
    grahamDiscount: number | null;
    bazinDiscount: number | null;
    dividendCagrFromHistory: number | null;
    avgYield5y: number | null;
  };
  annualDividends?: AnnualDividends[];
}

export interface CriterionResult {
  key: string;
  label: string;
  weight: number;
  score: number;
  value: number | null;
  detail: string;
}

export interface ScorecardResult {
  score: number;
  maxScore: number;
  rating: "comprar" | "manter" | "observar" | "evitar";
  ratio: number;
  criteria: CriterionResult[];
  isAristocrat: boolean;
  streak: number;
}

interface Weight {
  cap: number;
  full: number;
  mid: number;
  low: number;
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function shape(value: number | null | undefined, w: Weight): { score: number; detail: string } {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return { score: 0, detail: "sem dados" };
  }
  if (value >= w.full) return { score: 1, detail: `≥ ${w.full.toFixed(1)}` };
  if (value >= w.mid) return { score: 0.7, detail: `≥ ${w.mid.toFixed(1)} (bom)` };
  if (value >= w.low) return { score: 0.4, detail: `≥ ${w.low.toFixed(1)} (regular)` };
  return { score: 0, detail: `< ${w.low.toFixed(1)}` };
}

function grahamScore(discount: number | null): { score: number; detail: string } {
  if (discount === null || !Number.isFinite(discount)) {
    return { score: 0, detail: "sem dados" };
  }
  if (discount >= 0.2) return { score: 1, detail: `≥ 20% desconto` };
  if (discount >= 0) return { score: 0.5, detail: `${(discount * 100).toFixed(0)}% desconto` };
  if (discount >= -0.05)
    return { score: 0.25, detail: `${(discount * 100).toFixed(0)}% acima (justo)` };
  return { score: 0, detail: `${(discount * 100).toFixed(0)}% acima (caro)` };
}

function bazinScore(discount: number | null): { score: number; detail: string } {
  if (discount === null || !Number.isFinite(discount)) {
    return { score: 0, detail: "sem dados" };
  }
  if (discount >= 0.2) return { score: 1, detail: `≥ 20% abaixo do teto` };
  if (discount >= 0)
    return { score: 0.6, detail: `${(discount * 100).toFixed(0)}% abaixo do teto` };
  return { score: 0, detail: `acima do teto` };
}

const W_GRAHAM = 20;
const W_BAZIN = 15;
const W_DY = 15;
const W_ROE = 15;
const W_CAGR = 15;
const W_PVP = 10;
const W_DIVIDA = 10;

export function computeScorecard(inp: ScorecardInputs): ScorecardResult {
  const graham = grahamScore(inp.ew.grahamDiscount);
  const bazin = bazinScore(inp.ew.bazinDiscount);
  const dy = shape(inp.dy, { cap: 100, full: 8, mid: 6, low: 4 });
  const roe = shape(inp.roe, { cap: 100, full: 20, mid: 15, low: 10 });
  const cagr = shape(inp.ew.dividendCagrFromHistory, { cap: 100, full: 10, mid: 5, low: 0 });
  const pvp = shape(inp.pvp, { cap: 100, full: 1, mid: 1.5, low: 2 });
  const divida = shape(inp.divLiquidaEbitda, { cap: 100, full: 1, mid: 2, low: 3 });

  const contributions = [
    {
      c: graham,
      w: W_GRAHAM,
      key: "graham",
      label: "Graham (desconto)",
      value: inp.ew.grahamDiscount === null ? null : inp.ew.grahamDiscount * 100,
    },
    {
      c: bazin,
      w: W_BAZIN,
      key: "bazin",
      label: "Bazin (teto)",
      value: inp.ew.bazinDiscount === null ? null : inp.ew.bazinDiscount * 100,
    },
    { c: dy, w: W_DY, key: "dy", label: "Dividend Yield", value: inp.dy },
    { c: roe, w: W_ROE, key: "roe", label: "ROE", value: inp.roe },
    {
      c: cagr,
      w: W_CAGR,
      key: "cagr",
      label: "CAGR dividendos 5a",
      value: inp.ew.dividendCagrFromHistory,
    },
    { c: pvp, w: W_PVP, key: "pvp", label: "P/VP", value: inp.pvp },
    {
      c: divida,
      w: W_DIVIDA,
      key: "divida",
      label: "Dív. Líq./EBITDA",
      value: inp.divLiquidaEbitda,
    },
  ];

  const criteria: CriterionResult[] = contributions.map((x) => ({
    key: x.key,
    label: x.label,
    weight: x.w,
    score: x.c.score * x.w,
    value: x.value,
    detail: x.c.detail,
  }));

  const score = contributions.reduce((s, x) => s + x.c.score * x.w, 0);
  const maxScore = contributions.reduce((s, x) => s + x.w, 0);
  const ratio = clamp(score / maxScore, 0, 1);

  let rating: ScorecardResult["rating"];
  if (ratio >= 0.8) rating = "comprar";
  else if (ratio >= 0.6) rating = "manter";
  else if (ratio >= 0.4) rating = "observar";
  else rating = "evitar";

  const { isAristocrat, streak } = computeAristocrat(
    inp.annualDividends,
    inp.ew.dividendCagrFromHistory,
  );

  return { score, maxScore, rating, ratio, criteria, isAristocrat, streak };
}

/**
 * "Dividend Aristocrat": ativo com 5+ anos consecutivos de DY crescente ou
 * mantendo o mesmo nível (não-decrescente). Calculado a partir do
 * AnnualDividends ordenado por ano, contando o streak atual.
 *
 * Se o AnnualDividends vier vazio mas houver CAGR de dividendos,
 * ainda classificamos como aristocrata se CAGR >= 5% e o número de
 * anos no histórico for >= 5.
 */
export function computeAristocrat(
  annual: AnnualDividends[] | undefined,
  cagr: number | null,
): { isAristocrat: boolean; streak: number } {
  if (!annual || annual.length === 0) {
    if (cagr !== null && cagr >= 5) {
      return { isAristocrat: true, streak: 5 };
    }
    return { isAristocrat: false, streak: 0 };
  }
  const sorted = [...annual].sort((a, b) => a.year - b.year);
  let streak = 0;
  for (let i = sorted.length - 1; i > 0; i--) {
    const cur = sorted[i].totalPerShare;
    const prev = sorted[i - 1].totalPerShare;
    if (prev <= 0 || cur <= 0) break;
    if (cur >= prev) {
      streak = sorted.length - i + 1;
    } else {
      break;
    }
  }
  if (streak >= 5) {
    return { isAristocrat: true, streak };
  }
  // fall back to overall CAGR if we have multi-year data
  if (sorted.length >= 5) {
    const c = computeDividendCAGR(sorted);
    if (c !== null && c >= 5) {
      return { isAristocrat: true, streak: sorted.length };
    }
  }
  return { isAristocrat: false, streak };
}

export function ratingLabel(rating: ScorecardResult["rating"]): string {
  switch (rating) {
    case "comprar":
      return "Comprar";
    case "manter":
      return "Manter";
    case "observar":
      return "Observar";
    case "evitar":
      return "Evitar";
  }
}

export function ratingColor(rating: ScorecardResult["rating"]): {
  badge: string;
  ring: string;
  bar: string;
} {
  switch (rating) {
    case "comprar":
      return {
        badge: "bg-positive/15 text-positive",
        ring: "ring-positive/40",
        bar: "bg-positive",
      };
    case "manter":
      return { badge: "bg-chart-2/15 text-chart-2", ring: "ring-chart-2/40", bar: "bg-chart-2" };
    case "observar":
      return { badge: "bg-warning/15 text-warning", ring: "ring-warning/40", bar: "bg-warning" };
    case "evitar":
      return {
        badge: "bg-negative/15 text-negative",
        ring: "ring-negative/40",
        bar: "bg-negative",
      };
  }
}
