import type { ComparisonMetric, ComparisonScope } from "@/core/domain/comparison";

export interface ComparisonSetViewModel {
  readonly id: string;
  readonly name: string;
  readonly entries: Array<{ assetTicker: string; assetType: string; weight: number }>;
  readonly scope: ComparisonScope;
  readonly createdAt: string;
}

export interface ScorecardViewModel {
  readonly id: string;
  readonly comparisonSetId: string;
  readonly metrics: ComparisonMetric[];
  readonly generatedAt: string;
  readonly groupedByAsset: Record<string, ComparisonMetric[]>;
}

export interface ComparisonPageViewModel {
  readonly comparisonSet: ComparisonSetViewModel;
  readonly scorecard?: ScorecardViewModel;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly errorMessage: string | null;
}

function formatMetricValue(value: number, metricType: string): string {
  if (metricType === "dividend_yield_12m") return `${value.toFixed(2)}%`;
  if (metricType === "sharpe_ratio") return value.toFixed(2);
  if (metricType === "volatilidade") return `${value.toFixed(2)}%`;
  if (metricType === "drawdown_maximo") return `${value.toFixed(2)}%`;
  return `${value.toFixed(2)}%`;
}

function metricLabel(type: string): string {
  const map: Record<string, string> = {
    rentabilidade_12m: "Retorno 12 meses",
    rentabilidade_24m: "Retorno 24 meses",
    rentabilidade_36m: "Retorno 36 meses",
    volatilidade: "Volatilidade",
    drawdown_maximo: "Drawdown Máx.",
    dividend_yield_12m: "Dividend Yield",
    sharpe_ratio: "Índice de Sharpe",
  };
  return map[type] ?? type;
}

export function toScorecardViewModel(
  metrics: ComparisonMetric[],
): ScorecardViewModel {
  const groupedByAsset: Record<string, ComparisonMetric[]> = {};
  for (const m of metrics) {
    if (!groupedByAsset[m.assetTicker]) groupedByAsset[m.assetTicker] = [];
    groupedByAsset[m.assetTicker].push(m);
  }

  return {
    id: "",
    comparisonSetId: "",
    metrics,
    generatedAt: new Date().toISOString(),
    groupedByAsset,
  };
}

export { formatMetricValue, metricLabel };
