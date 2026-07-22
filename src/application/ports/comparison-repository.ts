import type { ComparisonSet, Scorecard } from "@/core/domain/comparison";

export interface IComparisonRepository {
  saveComparisonSet(set: ComparisonSet): Promise<void>;
  findComparisonSetById(setId: string): Promise<ComparisonSet | null>;
  findComparisonSetsByUser(userId: string): Promise<ComparisonSet[]>;
  deleteComparisonSet(setId: string): Promise<void>;

  saveScorecard(scorecard: Scorecard): Promise<void>;
  findScorecardById(scorecardId: string): Promise<Scorecard | null>;
  findScorecardByComparisonSet(comparisonSetId: string): Promise<Scorecard | null>;
}
