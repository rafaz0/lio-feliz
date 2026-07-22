import { Result } from "../result";
import { Backtest, type BacktestProps } from "./backtest";
import { Strategy } from "./strategy";
import { SimulationResult, type SimulationResultProps} from "./simulation-result";
import {
  SimulationResultId,
  type DateRange,
  type MonthlyReturn,
  type BacktestSnapshot,
} from "./backtest-types";
import {
  InvalidAllocationError,
  InvalidDateRangeError,
  SimulationFailedError,
} from "./errors";

const MAX_SNAPSHOT_AGE_DAYS = 30;

export class BacktestEngine {
  execute(
    backtest: Backtest,
    strategy: Strategy,
    snapshot: BacktestSnapshot,
  ): Result<SimulationResult> {
    const validation = this.validate(backtest, strategy, snapshot);
    if (validation.isFailure) {
      return Result.fail(validation.error);
    }

    try {
      const result = this.runSimulation(backtest, strategy, snapshot);
      return Result.ok(result);
    } catch (err) {
      return Result.fail(
        new SimulationFailedError(err instanceof Error ? err.message : "Erro inesperado na simulacao"),
      );
    }
  }

  private validate(
    backtest: Backtest,
    strategy: Strategy,
    snapshot: BacktestSnapshot,
  ): Result<void> {
    const totalAlloc = strategy.totalAllocationPercentage();
    if (totalAlloc > 100) {
      return Result.fail(new InvalidAllocationError(totalAlloc));
    }

    if (backtest.dateRange.end < backtest.dateRange.start) {
      return Result.fail(new InvalidDateRangeError());
    }

    const snapshotAge = Date.now() - new Date(snapshot.createdAt).getTime();
    if (snapshotAge > MAX_SNAPSHOT_AGE_DAYS * 24 * 60 * 60 * 1000) {
      return Result.fail(new SnapshotExpiredError(snapshot.id));
    }

    return Result.ok(undefined as unknown as void);
  }

  private runSimulation(
    backtest: Backtest,
    strategy: Strategy,
    snapshot: BacktestSnapshot,
  ): SimulationResult {
    const initialCapital = 100000;
    const cashPercentage = 100 - strategy.totalAllocationPercentage();
    const cashCapital = initialCapital * (cashPercentage / 100);
    const investedCapital = initialCapital - cashCapital;

    const monthlyReturns: MonthlyReturn[] = [];
    const monthlyStrategyReturns: number[] = [];
    const monthlyBenchmarkReturns: number[] = [];

    let peak = initialCapital;
    let maxDrawdown = 0;
    let currentCapital = initialCapital;

    const months = this.generateMonths(backtest.dateRange);

    for (const month of months) {
      let monthReturn = 0;
      let monthBenchmarkReturn = 0;

      for (const allocation of strategy.allocations) {
        const assetPrices = snapshot.prices[allocation.assetTicker];
        if (!assetPrices || assetPrices.length < 2) continue;

        const startPrice = this.findClosestPrice(assetPrices, new Date(month.start));
        const endPrice = this.findClosestPrice(assetPrices, new Date(month.end));
        if (!startPrice || !endPrice) continue;

        const assetReturn = (endPrice.adjustedClose - startPrice.adjustedClose) / startPrice.adjustedClose;
        monthReturn += assetReturn * (allocation.weightPercentage / 100);
      }

      const benchmarkPrices = snapshot.prices[strategy.benchmark.ticker];
      if (benchmarkPrices && benchmarkPrices.length >= 2) {
        const bmStart = this.findClosestPrice(benchmarkPrices, new Date(month.start));
        const bmEnd = this.findClosestPrice(benchmarkPrices, new Date(month.end));
        if (bmStart && bmEnd) {
          monthBenchmarkReturn = (bmEnd.adjustedClose - bmStart.adjustedClose) / bmStart.adjustedClose;
        }
      }

      const cashReturn = this.calculateCashReturn(cashPercentage / 100, snapshot, month);
      monthReturn += cashReturn;

      currentCapital *= (1 + monthReturn);

      if (currentCapital > peak) {
        peak = currentCapital;
      }
      const drawdown = (peak - currentCapital) / peak;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }

      monthlyStrategyReturns.push(monthReturn);
      monthlyBenchmarkReturns.push(monthBenchmarkReturn);
      monthlyReturns.push({
        month: month.label,
        strategyReturn: +(monthReturn * 100).toFixed(2),
        benchmarkReturn: +(monthBenchmarkReturn * 100).toFixed(2),
      });
    }

    const totalReturn = ((currentCapital - initialCapital) / initialCapital) * 100;
    const totalBenchmarkReturn = this.calculateTotalBenchmarkReturn(strategy, snapshot, backtest.dateRange);
    const volatility = this.calculateVolatility(monthlyStrategyReturns);
    const sharpe = this.calculateSharpeRatio(monthlyStrategyReturns);
    const beta = this.calculateBeta(monthlyStrategyReturns, monthlyBenchmarkReturns);
    const alpha = this.calculateAlpha(totalReturn / 100, totalBenchmarkReturn / 100, beta);

    const resultProps: SimulationResultProps = {
      id: SimulationResultId.generate(),
      backtestId: backtest.id.value,
      periodReturns: +totalReturn.toFixed(2),
      benchmarkReturn: +(totalBenchmarkReturn * 100).toFixed(2),
      maxDrawdown: +(maxDrawdown * 100).toFixed(2),
      sharpeRatio: +sharpe.toFixed(2),
      volatility: +(volatility * 100).toFixed(2),
      alpha: +(alpha * 100).toFixed(2),
      beta: +beta.toFixed(2),
      dividendYield: 0,
      monthlyReturns,
    };

    return SimulationResult.create(resultProps);
  }

  private generateMonths(dateRange: DateRange): Array<{ start: string; end: string; label: string }> {
    const months: Array<{ start: string; end: string; label: string }> = [];
    const current = new Date(dateRange.start);
    current.setDate(1);

    while (current <= dateRange.end) {
      const year = current.getFullYear();
      const month = current.getMonth() + 1;
      const startStr = new Date(year, month - 1, 1).toISOString();
      const endStr = new Date(year, month, 0).toISOString();
      months.push({
        start: startStr,
        end: endStr,
        label: `${year}-${String(month).padStart(2, "0")}`,
      });
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  }

  private findClosestPrice(
    prices: Array<{ date: string; close: number; adjustedClose: number }>,
    targetDate: Date,
  ): { close: number; adjustedClose: number } | null {
    if (prices.length === 0) return null;
    let closest = prices[0];
    let minDiff = Math.abs(new Date(prices[0].date).getTime() - targetDate.getTime());

    for (const price of prices) {
      const diff = Math.abs(new Date(price.date).getTime() - targetDate.getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closest = price;
      }
    }

    return { close: closest.close, adjustedClose: closest.adjustedClose };
  }

  private calculateCashReturn(
    cashWeight: number,
    snapshot: BacktestSnapshot,
    month: { start: string; end: string },
  ): number {
    if (cashWeight <= 0) return 0;
    const cdiData = snapshot.cdiRates?.filter(
      (r) => r.date >= month.start && r.date <= month.end,
    ) ?? [];
    if (cdiData.length === 0) return 0;
    const cdiAccumulated = cdiData.reduce((acc, r) => acc * (1 + r.rate / 100), 1) - 1;
    return cashWeight * cdiAccumulated;
  }

  private calculateVolatility(returns: number[]): number {
    if (returns.length < 2) return 0;
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((acc, r) => acc + (r - mean) ** 2, 0) / (returns.length - 1);
    return Math.sqrt(variance);
  }

  private calculateSharpeRatio(returns: number[]): number {
    if (returns.length < 2) return 0;
    const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
    const stdDev = Math.sqrt(
      returns.reduce((acc, r) => acc + (r - mean) ** 2, 0) / (returns.length - 1),
    );
    if (stdDev === 0) return 0;
    const riskFreeMonthly = 0.001;
    return ((mean - riskFreeMonthly) / stdDev) * Math.sqrt(12);
  }

  private calculateBeta(strategyReturns: number[], benchmarkReturns: number[]): number {
    if (strategyReturns.length < 2) return 0;
    const meanStrat = strategyReturns.reduce((a, b) => a + b, 0) / strategyReturns.length;
    const meanBm = benchmarkReturns.reduce((a, b) => a + b, 0) / benchmarkReturns.length;

    let covariance = 0;
    let varianceBm = 0;

    for (let i = 0; i < strategyReturns.length; i++) {
      const dStrat = strategyReturns[i] - meanStrat;
      const dBm = benchmarkReturns[i] - meanBm;
      covariance += dStrat * dBm;
      varianceBm += dBm * dBm;
    }

    return varianceBm === 0 ? 0 : covariance / varianceBm;
  }

  private calculateAlpha(strategyReturn: number, benchmarkReturn: number, beta: number): number {
    const riskFreeAnnual = 0.12;
    const riskFreeMonthly = 0.01;
    return strategyReturn - (riskFreeMonthly + beta * (benchmarkReturn - riskFreeMonthly));
  }

  private calculateTotalBenchmarkReturn(
    strategy: Strategy,
    snapshot: BacktestSnapshot,
    dateRange: DateRange,
  ): number {
    const prices = snapshot.prices[strategy.benchmark.ticker];
    if (!prices || prices.length < 2) return 0;

    const startPrice = this.findClosestPrice(prices, new Date(dateRange.start));
    const endPrice = this.findClosestPrice(prices, new Date(dateRange.end));
    if (!startPrice || !endPrice) return 0;

    return (endPrice.adjustedClose - startPrice.adjustedClose) / startPrice.adjustedClose;
  }
}
