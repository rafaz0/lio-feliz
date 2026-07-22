import type { SupabaseClient } from "@supabase/supabase-js";
import type { IComparisonRepository } from "@/application/ports/comparison-repository";
import {
  ComparisonSet,
  ComparisonEntry,
  Scorecard,
  ComparisonSetId,
  ComparisonEntryId,
  ScorecardId,
  type ComparisonScope,
  type ComparisonMetric,
} from "@/core/domain/comparison";

interface SerializedSet {
  id: string;
  name: string;
  entries: Array<{
    id: string;
    comparisonSetId: string;
    assetTicker: string;
    assetType: string;
    weight: number;
  }>;
  scope: ComparisonScope;
  userId: string;
  createdAt: string;
}

interface SerializedScorecard {
  id: string;
  comparisonSetId: string;
  metrics: ComparisonMetric[];
  generatedAt: string;
}

export class SupabaseComparisonRepository implements IComparisonRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async saveComparisonSet(set: ComparisonSet): Promise<void> {
    const serialized: SerializedSet = {
      id: set.id.value,
      name: set.name,
      entries: set.entries.map((e) => ({
        id: e.id.value,
        comparisonSetId: e.comparisonSetId,
        assetTicker: e.assetTicker,
        assetType: e.assetType,
        weight: e.weight,
      })),
      scope: set.scope,
      userId: set.userId,
      createdAt: set.createdAt.toISOString(),
    };
    const { error } = await this.supabase
      .from("comparison_sets")
      .upsert({ id: set.id.value, dados: serialized, updated_at: new Date().toISOString() }, { onConflict: "id" });
    if (error) throw new Error(`Falha ao salvar conjunto: ${error.message}`);
  }

  async findComparisonSetById(setId: string): Promise<ComparisonSet | null> {
    const { data, error } = await this.supabase.from("comparison_sets").select("dados").eq("id", setId).single();
    if (error || !data) return null;
    return this.deserializeSet(data.dados as SerializedSet);
  }

  async findComparisonSetsByUser(userId: string): Promise<ComparisonSet[]> {
    const { data, error } = await this.supabase.from("comparison_sets").select("dados");
    if (error || !data) return [];
    return data.map((d: { dados: SerializedSet }) => d.dados).filter((s) => s.userId === userId).map((s) => this.deserializeSet(s));
  }

  async deleteComparisonSet(setId: string): Promise<void> {
    await this.supabase.from("comparison_sets").delete().eq("id", setId);
    await this.supabase.from("scorecards").delete().filter("dados->>comparisonSetId", "eq", setId);
  }

  async saveScorecard(scorecard: Scorecard): Promise<void> {
    const serialized: SerializedScorecard = {
      id: scorecard.id.value,
      comparisonSetId: scorecard.comparisonSetId,
      metrics: scorecard.metrics,
      generatedAt: scorecard.generatedAt.toISOString(),
    };
    const { error } = await this.supabase
      .from("scorecards")
      .upsert({ id: scorecard.id.value, dados: serialized, updated_at: new Date().toISOString() }, { onConflict: "id" });
    if (error) throw new Error(`Falha ao salvar scorecard: ${error.message}`);
  }

  async findScorecardById(scorecardId: string): Promise<Scorecard | null> {
    const { data, error } = await this.supabase.from("scorecards").select("dados").eq("id", scorecardId).single();
    if (error || !data) return null;
    return this.deserializeScorecard(data.dados as SerializedScorecard);
  }

  async findScorecardByComparisonSet(comparisonSetId: string): Promise<Scorecard | null> {
    const { data, error } = await this.supabase
      .from("scorecards")
      .select("dados")
      .filter("dados->>comparisonSetId", "eq", comparisonSetId)
      .single();
    if (error || !data) return null;
    return this.deserializeScorecard(data.dados as SerializedScorecard);
  }

  private deserializeSet(s: SerializedSet): ComparisonSet {
    return ComparisonSet.create({
      id: ComparisonSetId.create(s.id),
      name: s.name,
      entries: s.entries.map((e) =>
        ComparisonEntry.create({
          id: ComparisonEntryId.create(e.id),
          comparisonSetId: e.comparisonSetId,
          assetTicker: e.assetTicker,
          assetType: e.assetType,
          weight: e.weight,
        }),
      ),
      scope: s.scope,
      userId: s.userId,
      createdAt: new Date(s.createdAt),
    });
  }

  private deserializeScorecard(s: SerializedScorecard): Scorecard {
    return Scorecard.create({
      id: ScorecardId.create(s.id),
      comparisonSetId: s.comparisonSetId,
      metrics: s.metrics,
      generatedAt: new Date(s.generatedAt),
    });
  }
}
