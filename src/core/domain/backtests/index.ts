export { Backtest, type BacktestProps } from "./backtest";
export { Strategy, type StrategyProps } from "./strategy";
export { SimulationResult, type SimulationResultProps } from "./simulation-result";
export { BacktestEngine } from "./backtest-engine";
export {
  BacktestId,
  StrategyId,
  SimulationResultId,
  SnapshotId,
  type BacktestStatus,
  type AssetType,
  type BenchmarkType,
  type AllocationWeight,
  type BenchmarkRef,
  type DateRange,
  type MonthlyReturn,
  type BacktestSnapshot,
} from "./backtest-types";
export {
  InvalidAllocationError,
  InvalidDateRangeError,
  BenchmarkNotFoundError,
  SnapshotExpiredError,
  AssetNoDataError,
  BacktestNotFoundError,
  StrategyNotFoundError,
  SimulationFailedError,
  DuplicateBacktestError,
} from "./errors";
