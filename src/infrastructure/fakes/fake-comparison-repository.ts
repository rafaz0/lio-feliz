import type { IComparisonRepository } from "@/application/ports/comparison-repository";
import {
  ComparisonSet,
  ComparisonEntry,
  Scorecard,
  ComparisonSetId,
  ComparisonEntryId,
  ScorecardId,
} from "@/core/domain/comparison";

export class FakeComparisonRepository implements IComparisonRepository {
  private sets = new Map<string, ComparisonSet>();
  private scorecards = new Map<string, Scorecard>();

  async saveComparisonSet(set: ComparisonSet): Promise<void> {
    this.sets.set(set.id.value, set);
  }

  async findComparisonSetById(setId: string): Promise<ComparisonSet | null> {
    return this.sets.get(setId) ?? null;
  }

  async findComparisonSetsByUser(userId: string): Promise<ComparisonSet[]> {
    return Array.from(this.sets.values()).filter((s) => s.userId === userId);
  }

  async deleteComparisonSet(setId: string): Promise<void> {
    this.sets.delete(setId);
    for (const [key, sc] of this.scorecards) {
      if (sc.comparisonSetId === setId) this.scorecards.delete(key);
    }
  }

  async saveScorecard(scorecard: Scorecard): Promise<void> {
    this.scorecards.set(scorecard.id.value, scorecard);
  }

  async findScorecardById(scorecardId: string): Promise<Scorecard | null> {
    return this.scorecards.get(scorecardId) ?? null;
  }

  async findScorecardByComparisonSet(comparisonSetId: string): Promise<Scorecard | null> {
    return (
      Array.from(this.scorecards.values()).find((s) => s.comparisonSetId === comparisonSetId) ??
      null
    );
  }

  reset(): void {
    this.sets.clear();
    this.scorecards.clear();
  }
}
