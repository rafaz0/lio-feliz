import type { SimulationResultDto, StrategyDto } from "@/application/dtos/backtest";

export interface StrategyViewModel {
  readonly id: string;
  readonly name: string;
  readonly allocations: Array<{ assetTicker: string; weightPercentage: number; assetType: string }>;
  readonly benchmarkTicker: string;
  readonly benchmarkName: string;
  readonly totalWeight: number;
}

export interface BacktestResultViewModel {
  readonly periodReturns: string;
  readonly benchmarkReturn: string;
  readonly excessReturn: string;
  readonly maxDrawdown: string;
  readonly sharpeRatio: string;
  readonly volatility: string;
  readonly alpha: string;
  readonly beta: string;
}

function fmtPct(v: number): string {
  return `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`;
}

function fmtNum(v: number, decimals = 2): string {
  return v.toFixed(decimals);
}

export function toStrategyViewModel(dto: StrategyDto): StrategyViewModel {
  return {
    id: dto.id,
    name: dto.name,
    allocations: dto.allocations,
    benchmarkTicker: dto.benchmark.ticker,
    benchmarkName: dto.benchmark.name,
    totalWeight: dto.allocations.reduce((s, a) => s + a.weightPercentage, 0),
  };
}

export function toStrategyViewModels(dtos: StrategyDto[]): StrategyViewModel[] {
  return dtos.map(toStrategyViewModel);
}

export function toBacktestResultViewModel(dto: SimulationResultDto): BacktestResultViewModel {
  return {
    periodReturns: fmtPct(dto.periodReturns),
    benchmarkReturn: fmtPct(dto.benchmarkReturn),
    excessReturn: fmtPct(dto.periodReturns - dto.benchmarkReturn),
    maxDrawdown: fmtPct(dto.maxDrawdown),
    sharpeRatio: fmtNum(dto.sharpeRatio),
    volatility: fmtPct(dto.volatility),
    alpha: fmtPct(dto.alpha),
    beta: fmtNum(dto.beta),
  };
}
