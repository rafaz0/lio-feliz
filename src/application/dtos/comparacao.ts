import type { ComparisonMetric, ComparisonScope } from "@/core/domain/comparison";

export interface ComparacaoDto {
  readonly id: string;
  readonly name: string;
  readonly entries: Array<{
    assetTicker: string;
    assetType: string;
    weight: number;
  }>;
  readonly scope: ComparisonScope;
  readonly userId: string;
  readonly createdAt: string;
}

export interface ScorecardDto {
  readonly id: string;
  readonly comparisonSetId: string;
  readonly metrics: ComparisonMetric[];
  readonly generatedAt: string;
}

export interface ComparisonSetDto {
  readonly comparisonSet: ComparacaoDto;
  readonly scorecard?: ScorecardDto;
}
