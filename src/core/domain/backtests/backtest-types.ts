import { ValueObject } from "../value-object";
import { EntityId } from "../entity-id";

export class BacktestId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): BacktestId {
    return new BacktestId(value);
  }

  static generate(): BacktestId {
    return new BacktestId(`bt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class StrategyId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): StrategyId {
    return new StrategyId(value);
  }

  static generate(): StrategyId {
    return new StrategyId(`strat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class SimulationResultId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): SimulationResultId {
    return new SimulationResultId(value);
  }

  static generate(): SimulationResultId {
    return new SimulationResultId(`res-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class SnapshotId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): SnapshotId {
    return new SnapshotId(value);
  }

  static generate(): SnapshotId {
    return new SnapshotId(`snap-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export type BacktestStatus = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

export type AssetType = "stock" | "fii" | "bdr" | "etf" | "crypto" | "stock_us" | "reit" | "etf_internacional" | "other";

export type BenchmarkType = "indice" | "etf" | "cdi";

export type AllocationWeight = {
  assetTicker: string;
  weightPercentage: number;
  assetType: AssetType;
};

export type BenchmarkRef = {
  ticker: string;
  name: string;
  type: BenchmarkType;
};

export type DateRange = {
  start: Date;
  end: Date;
};

export type MonthlyReturn = {
  month: string;
  strategyReturn: number;
  benchmarkReturn: number;
};

export type BacktestSnapshot = {
  id: string;
  backtestId: string;
  assets: string[];
  startDate: string;
  endDate: string;
  prices: Record<string, Array<{ date: string; close: number; adjustedClose: number }>>;
  dividends: Array<{ date: string; assetTicker: string; valuePerShare: number; type: string }>;
  splits: Array<{ date: string; assetTicker: string; factor: number }>;
  cdiRates: Array<{ date: string; rate: number }>;
  createdAt: string;
};
