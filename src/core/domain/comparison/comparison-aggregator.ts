import { Result } from "../result";
import { ComparisonSet } from "./comparison-set";
import { Scorecard, ScorecardId } from "./scorecard";
import {
  type ComparisonMetric,
  type MetricType,
} from "./comparison-types";
import { InsufficientDataError, MinimumEntriesError } from "./errors";

export type ProjectionData = {
  assetTicker: string;
  monthlyReturns: number[];
  dividendYield12m: number;
};

export class ComparisonAggregator {
  aggregate(
    comparisonSet: ComparisonSet,
    projections: ProjectionData[],
  ): Result<Scorecard> {
    if (comparisonSet.entries.length < 2) {
      return Result.fail(new MinimumEntriesError());
    }

    const metrics: ComparisonMetric[] = [];
    const metricTypes: MetricType[] = [
      "rentabilidade_12m",
      "rentabilidade_24m",
      "rentabilidade_36m",
      "volatilidade",
      "drawdown_maximo",
      "dividend_yield_12m",
      "sharpe_ratio",
    ];

    for (const entry of comparisonSet.entries) {
      const projection = projections.find((p) => p.assetTicker === entry.assetTicker);
      if (!projection || projection.monthlyReturns.length < 2) {
        return Result.fail(new InsufficientDataError(entry.assetTicker));
      }

      const returns = projection.monthlyReturns;
      const rent12 = this.calcPeriodReturn(returns, 12);
      const rent24 = this.calcPeriodReturn(returns, 24);
      const rent36 = this.calcPeriodReturn(returns, Math.min(36, returns.length));
      const vol = this.calcVolatility(returns);
      const dd = this.calcMaxDrawdown(returns);
      const sharpe = this.calcSharpeRatio(returns);

      metrics.push(
        { assetTicker: entry.assetTicker, metricType: "rentabilidade_12m", value: rent12, rank: 0, benchmarkValue: 0 },
        { assetTicker: entry.assetTicker, metricType: "rentabilidade_24m", value: rent24, rank: 0, benchmarkValue: 0 },
        { assetTicker: entry.assetTicker, metricType: "rentabilidade_36m", value: rent36, rank: 0, benchmarkValue: 0 },
        { assetTicker: entry.assetTicker, metricType: "volatilidade", value: vol, rank: 0, benchmarkValue: 0 },
        { assetTicker: entry.assetTicker, metricType: "drawdown_maximo", value: dd, rank: 0, benchmarkValue: 0 },
        { assetTicker: entry.assetTicker, metricType: "dividend_yield_12m", value: projection.dividendYield12m, rank: 0, benchmarkValue: 0 },
        { assetTicker: entry.assetTicker, metricType: "sharpe_ratio", value: sharpe, rank: 0, benchmarkValue: 0 },
      );
    }

    this.calculateRanks(metrics, metricTypes);

    return Result.ok(
      Scorecard.create({
        id: ScorecardId.generate(),
        comparisonSetId: comparisonSet.id.value,
        metrics,
        generatedAt: new Date(),
      }),
    );
  }

  private calcPeriodReturn(monthlyReturns: number[], months: number): number {
    const relevant = monthlyReturns.slice(-months);
    if (relevant.length === 0) return 0;
    const cumulative = relevant.reduce((acc, r) => acc * (1 + r / 100), 1);
    return +((cumulative - 1) * 100).toFixed(2);
  }

  private calcVolatility(monthlyReturns: number[]): number {
    if (monthlyReturns.length < 2) return 0;
    const mean = monthlyReturns.reduce((a, b) => a + b, 0) / monthlyReturns.length;
    const variance = monthlyReturns.reduce((acc, r) => acc + (r - mean) ** 2, 0) / (monthlyReturns.length - 1);
    return +Math.sqrt(variance * 12).toFixed(2);
  }

  private calcMaxDrawdown(monthlyReturns: number[]): number {
    let peak = 1;
    let current = 1;
    let maxDd = 0;

    for (const r of monthlyReturns) {
      current *= (1 + r / 100);
      if (current > peak) peak = current;
      const dd = (peak - current) / peak;
      if (dd > maxDd) maxDd = dd;
    }

    return +(maxDd * 100).toFixed(2);
  }

  private calcSharpeRatio(monthlyReturns: number[]): number {
    if (monthlyReturns.length < 2) return 0;
    const mean = monthlyReturns.reduce((a, b) => a + b, 0) / monthlyReturns.length;
    const stdDev = Math.sqrt(
      monthlyReturns.reduce((acc, r) => acc + (r - mean) ** 2, 0) / (monthlyReturns.length - 1),
    );
    if (stdDev === 0) return 0;
    const rfMonthly = 0.001;
    return +(((mean - rfMonthly) / stdDev) * Math.sqrt(12)).toFixed(2);
  }

  private calculateRanks(metrics: ComparisonMetric[], metricTypes: MetricType[]): void {
    const higherIsBetter = new Set<MetricType>([
      "rentabilidade_12m", "rentabilidade_24m", "rentabilidade_36m",
      "dividend_yield_12m", "sharpe_ratio",
    ]);

    for (const mt of metricTypes) {
      const filtered = metrics.filter((m) => m.metricType === mt);
      filtered.sort((a, b) => higherIsBetter.has(mt) ? b.value - a.value : a.value - b.value);
      filtered.forEach((m, idx) => {
        const metric = metrics.find((x) => x.assetTicker === m.assetTicker && x.metricType === mt);
        if (metric) metric.rank = idx + 1;
      });
    }
  }
}
