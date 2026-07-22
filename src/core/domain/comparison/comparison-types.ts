import { EntityId } from "../entity-id";

export class ComparisonSetId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): ComparisonSetId {
    return new ComparisonSetId(value);
  }

  static generate(): ComparisonSetId {
    return new ComparisonSetId(`cs-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class ComparisonEntryId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): ComparisonEntryId {
    return new ComparisonEntryId(value);
  }

  static generate(): ComparisonEntryId {
    return new ComparisonEntryId(`ce-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class ScorecardId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): ScorecardId {
    return new ScorecardId(value);
  }

  static generate(): ScorecardId {
    return new ScorecardId(`sc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export type ComparisonScopeType = "byAsset" | "byType" | "bySector";

export type MetricType =
  | "rentabilidade_12m"
  | "rentabilidade_24m"
  | "rentabilidade_36m"
  | "volatilidade"
  | "drawdown_maximo"
  | "dividend_yield_12m"
  | "sharpe_ratio";

export type ComparisonScope = {
  type: ComparisonScopeType;
  filter?: string;
};

export type ComparisonMetric = {
  assetTicker: string;
  metricType: MetricType;
  value: number;
  rank: number;
  benchmarkValue: number;
};
