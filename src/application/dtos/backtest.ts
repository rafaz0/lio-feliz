import type { MonthlyReturn } from "@/core/domain/backtests";

export interface BacktestDto {
  readonly id: string;
  readonly strategyId: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly snapshotId: string;
  readonly status: string;
  readonly createdAt: string;
  readonly completedAt?: string;
  readonly error?: string;
}

export interface StrategyDto {
  readonly id: string;
  readonly name: string;
  readonly allocations: Array<{
    assetTicker: string;
    weightPercentage: number;
    assetType: string;
  }>;
  readonly benchmark: {
    ticker: string;
    name: string;
    type: string;
  };
  readonly userId: string;
  readonly createdAt: string;
  readonly isActive: boolean;
}

export interface SimulationResultDto {
  readonly id: string;
  readonly backtestId: string;
  readonly periodReturns: number;
  readonly benchmarkReturn: number;
  readonly maxDrawdown: number;
  readonly sharpeRatio: number;
  readonly volatility: number;
  readonly alpha: number;
  readonly beta: number;
  readonly dividendYield: number;
  readonly monthlyReturns: MonthlyReturn[];
}

export interface BacktestCompletoDto {
  readonly backtest: BacktestDto;
  readonly result?: SimulationResultDto;
}

export interface EstrategiaListDto {
  readonly strategies: StrategyDto[];
}
