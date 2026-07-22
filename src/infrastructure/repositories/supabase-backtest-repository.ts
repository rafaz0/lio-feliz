import type { SupabaseClient } from "@supabase/supabase-js";
import type { IBacktestRepository } from "@/application/ports/backtest-repository";
import {
  Backtest,
  Strategy,
  SimulationResult,
  BacktestId,
  StrategyId,
  SimulationResultId,
  type BacktestSnapshot,
  type AllocationWeight,
  type BenchmarkRef,
  type DateRange,
  type BacktestStatus,
  type MonthlyReturn,
} from "@/core/domain/backtests";

interface SerializedStrategy {
  id: string;
  name: string;
  allocations: AllocationWeight[];
  benchmark: BenchmarkRef;
  userId: string;
  createdAt: string;
  isActive: boolean;
}

interface SerializedBacktest {
  id: string;
  strategyId: string;
  startDate: string;
  endDate: string;
  snapshotId: string;
  status: string;
  createdAt: string;
  completedAt?: string;
  error?: string;
}

interface SerializedResult {
  id: string;
  backtestId: string;
  periodReturns: number;
  benchmarkReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  volatility: number;
  alpha: number;
  beta: number;
  dividendYield: number;
  monthlyReturns: MonthlyReturn[];
}

export class SupabaseBacktestRepository implements IBacktestRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async saveStrategy(strategy: Strategy): Promise<void> {
    const serialized: SerializedStrategy = {
      id: strategy.id.value,
      name: strategy.name,
      allocations: strategy.allocations,
      benchmark: strategy.benchmark,
      userId: strategy.userId,
      createdAt: strategy.createdAt.toISOString(),
      isActive: strategy.isActive,
    };
    const { error } = await this.supabase.from("strategies").upsert(
      { id: strategy.id.value, dados: serialized, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar estrategia: ${error.message}`);
  }

  async findStrategyById(strategyId: string): Promise<Strategy | null> {
    const { data, error } = await this.supabase
      .from("strategies")
      .select("dados")
      .eq("id", strategyId)
      .single();
    if (error || !data) return null;
    return this.deserializeStrategy(data.dados as SerializedStrategy);
  }

  async findStrategiesByUser(userId: string): Promise<Strategy[]> {
    const { data, error } = await this.supabase
      .from("strategies")
      .select("dados");
    if (error || !data) return [];
    const all = data.map((d: { dados: SerializedStrategy }) => d.dados);
    return all.filter((s) => s.userId === userId).map(this.deserializeStrategy);
  }

  async deleteStrategy(strategyId: string): Promise<void> {
    await this.supabase.from("strategies").delete().eq("id", strategyId);
  }

  async saveBacktest(backtest: Backtest): Promise<void> {
    const serialized: SerializedBacktest = {
      id: backtest.id.value,
      strategyId: backtest.strategyId,
      startDate: backtest.dateRange.start.toISOString(),
      endDate: backtest.dateRange.end.toISOString(),
      snapshotId: backtest.snapshotId,
      status: backtest.status,
      createdAt: backtest.createdAt.toISOString(),
      completedAt: backtest.completedAt?.toISOString(),
      error: backtest.error,
    };
    const { error } = await this.supabase.from("backtests").upsert(
      { id: backtest.id.value, dados: serialized, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar backtest: ${error.message}`);
  }

  async findBacktestById(backtestId: string): Promise<Backtest | null> {
    const { data, error } = await this.supabase
      .from("backtests")
      .select("dados")
      .eq("id", backtestId)
      .single();
    if (error || !data) return null;
    return this.deserializeBacktest(data.dados as SerializedBacktest);
  }

  async findBacktestsByStrategy(strategyId: string): Promise<Backtest[]> {
    const { data, error } = await this.supabase
      .from("backtests")
      .select("dados");
    if (error || !data) return [];
    const all = data.map((d: { dados: SerializedBacktest }) => d.dados);
    return all.filter((b) => b.strategyId === strategyId).map(this.deserializeBacktest);
  }

  async saveSimulationResult(result: SimulationResult): Promise<void> {
    const serialized: SerializedResult = {
      id: result.id.value,
      backtestId: result.backtestId,
      periodReturns: result.periodReturns,
      benchmarkReturn: result.benchmarkReturn,
      maxDrawdown: result.maxDrawdown,
      sharpeRatio: result.sharpeRatio,
      volatility: result.volatility,
      alpha: result.alpha,
      beta: result.beta,
      dividendYield: result.dividendYield,
      monthlyReturns: result.monthlyReturns,
    };
    const { error } = await this.supabase.from("simulation_results").upsert(
      { id: result.id.value, dados: serialized, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar resultado: ${error.message}`);
  }

  async findSimulationResultByBacktest(backtestId: string): Promise<SimulationResult | null> {
    const { data, error } = await this.supabase
      .from("simulation_results")
      .select("dados")
      .filter("dados->>backtestId", "eq", backtestId)
      .single();
    if (error || !data) return null;
    return this.deserializeResult(data.dados as SerializedResult);
  }

  async saveSnapshot(snapshot: BacktestSnapshot): Promise<void> {
    const { error } = await this.supabase.from("backtest_snapshots").upsert(
      { id: snapshot.id, dados: snapshot, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar snapshot: ${error.message}`);
  }

  async findSnapshotById(snapshotId: string): Promise<BacktestSnapshot | null> {
    const { data, error } = await this.supabase
      .from("backtest_snapshots")
      .select("dados")
      .eq("id", snapshotId)
      .single();
    if (error || !data) return null;
    return data.dados as BacktestSnapshot;
  }

  private deserializeStrategy(s: SerializedStrategy): Strategy {
    return Strategy.create({
      id: StrategyId.create(s.id),
      name: s.name,
      allocations: s.allocations,
      benchmark: s.benchmark,
      userId: s.userId,
      createdAt: new Date(s.createdAt),
      isActive: s.isActive,
    });
  }

  private deserializeBacktest(b: SerializedBacktest): Backtest {
    return Backtest.create({
      id: BacktestId.create(b.id),
      strategyId: b.strategyId,
      dateRange: { start: new Date(b.startDate), end: new Date(b.endDate) },
      snapshotId: b.snapshotId,
      status: b.status as BacktestStatus,
      createdAt: new Date(b.createdAt),
      completedAt: b.completedAt ? new Date(b.completedAt) : undefined,
      error: b.error,
    });
  }

  private deserializeResult(r: SerializedResult): SimulationResult {
    return SimulationResult.create({
      id: SimulationResultId.create(r.id),
      backtestId: r.backtestId,
      periodReturns: r.periodReturns,
      benchmarkReturn: r.benchmarkReturn,
      maxDrawdown: r.maxDrawdown,
      sharpeRatio: r.sharpeRatio,
      volatility: r.volatility,
      alpha: r.alpha,
      beta: r.beta,
      dividendYield: r.dividendYield,
      monthlyReturns: r.monthlyReturns,
    });
  }
}
