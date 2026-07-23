import { metricLabel, formatMetricValue } from "../viewmodels/comparison.view-model";
import type { ComparisonMetric } from "@/core/domain/comparison";

interface ScorecardGridProps {
  metrics: ComparisonMetric[];
}

export function ScorecardGrid({ metrics }: ScorecardGridProps) {
  const groupedByAsset: Record<string, ComparisonMetric[]> = {};
  for (const m of metrics) {
    if (!groupedByAsset[m.assetTicker]) groupedByAsset[m.assetTicker] = [];
    groupedByAsset[m.assetTicker].push(m);
  }

  const assetTickers = Object.keys(groupedByAsset);
  const metricTypes = [...new Set(metrics.map((m) => m.metricType))];

  if (assetTickers.length === 0) {
    return <div className="text-sm text-muted-foreground">Nenhuma metrica disponivel.</div>;
  }

  return (
    <div data-testid="scorecard-grid" className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b">
            <th className="px-3 py-2 text-left font-medium text-muted-foreground">Metrica</th>
            {assetTickers.map((ticker) => (
              <th key={ticker} className="px-3 py-2 text-right font-medium">
                {ticker}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {metricTypes.map((metricType) => (
            <tr key={metricType} className="border-b last:border-0">
              <td className="px-3 py-2 text-left text-muted-foreground">
                {metricLabel(metricType)}
              </td>
              {assetTickers.map((ticker) => {
                const metric = groupedByAsset[ticker]?.find((m) => m.metricType === metricType);
                const isBest = metric?.rank === 1;
                return (
                  <td
                    key={`${ticker}-${metricType}`}
                    className={`px-3 py-2 text-right font-mono ${
                      isBest ? "text-green-600 font-semibold" : ""
                    }`}
                  >
                    {metric ? formatMetricValue(metric.value, metricType) : "—"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
