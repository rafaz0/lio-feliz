import type { Backtest, BacktestSnapshot, SimulationResult, Strategy } from "@/core/domain/backtests";

export interface IBacktestRepository {
  saveStrategy(strategy: Strategy): Promise<void>;
  findStrategyById(strategyId: string): Promise<Strategy | null>;
  findStrategiesByUser(userId: string): Promise<Strategy[]>;
  deleteStrategy(strategyId: string): Promise<void>;

  saveBacktest(backtest: Backtest): Promise<void>;
  findBacktestById(backtestId: string): Promise<Backtest | null>;
  findBacktestsByStrategy(strategyId: string): Promise<Backtest[]>;

  saveSimulationResult(result: SimulationResult): Promise<void>;
  findSimulationResultByBacktest(backtestId: string): Promise<SimulationResult | null>;

  saveSnapshot(snapshot: BacktestSnapshot): Promise<void>;
  findSnapshotById(snapshotId: string): Promise<BacktestSnapshot | null>;
}
