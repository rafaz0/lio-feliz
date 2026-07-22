import type { IBacktestRepository } from "@/application/ports/backtest-repository";
import {
  Backtest,
  Strategy,
  SimulationResult,
  BacktestId,
  StrategyId,
  SimulationResultId,
  SnapshotId,
  type BacktestSnapshot,
} from "@/core/domain/backtests";

export class FakeBacktestRepository implements IBacktestRepository {
  private strategies = new Map<string, Strategy>();
  private backtests = new Map<string, Backtest>();
  private results = new Map<string, SimulationResult>();
  private snapshots = new Map<string, BacktestSnapshot>();

  async saveStrategy(strategy: Strategy): Promise<void> {
    this.strategies.set(strategy.id.value, strategy);
  }

  async findStrategyById(strategyId: string): Promise<Strategy | null> {
    return this.strategies.get(strategyId) ?? null;
  }

  async findStrategiesByUser(userId: string): Promise<Strategy[]> {
    return Array.from(this.strategies.values()).filter((s) => s.userId === userId);
  }

  async deleteStrategy(strategyId: string): Promise<void> {
    this.strategies.delete(strategyId);
  }

  async saveBacktest(backtest: Backtest): Promise<void> {
    this.backtests.set(backtest.id.value, backtest);
  }

  async findBacktestById(backtestId: string): Promise<Backtest | null> {
    return this.backtests.get(backtestId) ?? null;
  }

  async findBacktestsByStrategy(strategyId: string): Promise<Backtest[]> {
    return Array.from(this.backtests.values()).filter((b) => b.strategyId === strategyId);
  }

  async saveSimulationResult(result: SimulationResult): Promise<void> {
    this.results.set(result.id.value, result);
  }

  async findSimulationResultByBacktest(backtestId: string): Promise<SimulationResult | null> {
    return Array.from(this.results.values()).find((r) => r.backtestId === backtestId) ?? null;
  }

  async saveSnapshot(snapshot: BacktestSnapshot): Promise<void> {
    this.snapshots.set(snapshot.id, snapshot);
  }

  async findSnapshotById(snapshotId: string): Promise<BacktestSnapshot | null> {
    return this.snapshots.get(snapshotId) ?? null;
  }

  reset(): void {
    this.strategies.clear();
    this.backtests.clear();
    this.results.clear();
    this.snapshots.clear();
  }
}
