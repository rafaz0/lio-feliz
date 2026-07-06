/**
 * Modelo de avaliação clássica para ações brasileiras.
 * - Graham: Preço Justo = sqrt(22.5 × LPA × VPA). Ação barata quando preço atual <= Preço Justo.
 * - Bazin: Preço Teto = (DY médio 5a / 0.06) × cotação atual. 6% é a rentabilidade esperada.
 *   Aqui usamos DY médio 5a anual calculado pelo histórico. Quando DY médio não está
 *   disponível usamos o DY atual dos últimos 12 meses como fallback.
 */

export interface GrahamInputs {
  lpa: number;
  vpa: number | null;
}

export interface GrahamResult {
  fairValue: number | null;
  discount: number | null;
  rating: "barata" | "justa" | "cara" | "indefinido";
}

export function grahamFairValue({ lpa, vpa }: GrahamInputs): number | null {
  if (!vpa || vpa <= 0 || !lpa || lpa <= 0) return null;
  return Math.sqrt(22.5 * lpa * vpa);
}

export function grahamRating(currentPrice: number, inputs: GrahamInputs): GrahamResult {
  const fairValue = grahamFairValue(inputs);
  if (!fairValue || fairValue <= 0)
    return { fairValue: null, discount: null, rating: "indefinido" };
  const discount = (fairValue - currentPrice) / fairValue;
  let rating: GrahamResult["rating"];
  if (discount >= 0.2) rating = "barata";
  else if (discount >= -0.05) rating = "justa";
  else rating = "cara";
  return { fairValue, discount, rating };
}

export interface BazinInputs {
  currentPrice: number;
  dividendYieldAverage5y: number | null;
}

export function bazinPriceTeto({
  currentPrice,
  dividendYieldAverage5y,
}: BazinInputs): number | null {
  if (!currentPrice || currentPrice <= 0 || !dividendYieldAverage5y || dividendYieldAverage5y <= 0)
    return null;
  return (dividendYieldAverage5y / 6) * currentPrice;
}

export function avgAnnualYield(
  annual: { year: number; yieldPct: number | null }[],
  lastN: number,
): number | null {
  const valid = annual.filter((y) => y.yieldPct !== null).slice(-lastN);
  if (valid.length === 0) return null;
  const sum = valid.reduce((s, y) => s + (y.yieldPct ?? 0), 0);
  return sum / valid.length;
}
