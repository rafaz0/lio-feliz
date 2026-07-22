import { DomainError } from "../errors";

export class InvalidAllocationError extends DomainError {
  constructor(totalPercentage: number) {
    super("INVALID_ALLOCATION", `Alocacao total de ${totalPercentage}% excede 100%`);
  }
}

export class InvalidDateRangeError extends DomainError {
  constructor() {
    super("INVALID_DATE_RANGE", "Data final deve ser maior ou igual a data inicial");
  }
}

export class BenchmarkNotFoundError extends DomainError {
  constructor(benchmarkTicker: string) {
    super("BENCHMARK_NOT_FOUND", `Benchmark "${benchmarkTicker}" nao encontrado no snapshot`);
  }
}

export class SnapshotExpiredError extends DomainError {
  constructor(snapshotId: string) {
    super("SNAPSHOT_EXPIRED", `Snapshot "${snapshotId}" expirado (mais de 30 dias)`);
  }
}

export class AssetNoDataError extends DomainError {
  constructor(assetTicker: string) {
    super("ASSET_NO_DATA", `Ativo "${assetTicker}" sem dados historicos no periodo`);
  }
}

export class BacktestNotFoundError extends DomainError {
  constructor(backtestId: string) {
    super("BACKTEST_NOT_FOUND", `Backtest "${backtestId}" nao encontrado`);
  }
}

export class StrategyNotFoundError extends DomainError {
  constructor(strategyId: string) {
    super("STRATEGY_NOT_FOUND", `Estrategia "${strategyId}" nao encontrada`);
  }
}

export class SimulationFailedError extends DomainError {
  constructor(message: string) {
    super("SIMULATION_FAILED", `Falha na simulacao: ${message}`);
  }
}

export class DuplicateBacktestError extends DomainError {
  constructor(strategyId: string) {
    super("DUPLICATE_BACKTEST", `Backtest ja executado para estrategia "${strategyId}" no mesmo periodo`);
  }
}
