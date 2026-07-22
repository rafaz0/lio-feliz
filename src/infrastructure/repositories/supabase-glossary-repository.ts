import type { SupabaseClient } from "@supabase/supabase-js";
import type { IGlossaryRepository } from "@/application/ports/glossary-repository";
import {
  GlossaryTerm,
  Tooltip,
  LearningPath,
  GlossaryTermId,
  TooltipId,
  LearningPathId,
  type TermCategory,
  type DifficultyLevel,
} from "@/core/domain/education";

interface SerializedTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  synonyms: string[];
  relatedTerms: string[];
}

interface SerializedTooltip {
  id: string;
  targetComponent: string;
  termKey: string;
  text: string;
  difficulty: string;
}

interface SerializedPath {
  id: string;
  name: string;
  description: string;
  steps: string[];
  difficulty: string;
}

export class SupabaseGlossaryRepository implements IGlossaryRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async saveTerm(term: GlossaryTerm): Promise<void> {
    const s: SerializedTerm = {
      id: term.id.value, term: term.term, definition: term.definition,
      category: term.category, synonyms: term.synonyms, relatedTerms: term.relatedTerms,
    };
    const { error } = await this.supabase.from("glossary_terms").upsert(
      { id: term.id.value, dados: s, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar termo: ${error.message}`);
  }

  async findTermById(termId: string): Promise<GlossaryTerm | null> {
    const { data, error } = await this.supabase.from("glossary_terms").select("dados").eq("id", termId).single();
    if (error || !data) return null;
    return this.deserializeTerm(data.dados as SerializedTerm);
  }

  async findTermByKey(term: string): Promise<GlossaryTerm | null> {
    const { data, error } = await this.supabase.from("glossary_terms").select("dados");
    if (error || !data) return null;
    const all = data.map((d: { dados: SerializedTerm }) => d.dados);
    const found = all.find((t: SerializedTerm) => t.term === term);
    return found ? this.deserializeTerm(found) : null;
  }

  async searchTerms(query: string): Promise<GlossaryTerm[]> {
    const q = query.toLowerCase();
    const { data, error } = await this.supabase.from("glossary_terms").select("dados");
    if (error || !data) return [];
    return data
      .map((d: { dados: SerializedTerm }) => d.dados)
      .filter((t: SerializedTerm) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.synonyms.some((s: string) => s.toLowerCase().includes(q)),
      )
      .map((t: SerializedTerm) => this.deserializeTerm(t));
  }

  async findAllTerms(): Promise<GlossaryTerm[]> {
    const { data, error } = await this.supabase.from("glossary_terms").select("dados");
    if (error || !data) return [];
    return data.map((d: { dados: SerializedTerm }) => this.deserializeTerm(d.dados));
  }

  async deleteTerm(termId: string): Promise<void> {
    await this.supabase.from("glossary_terms").delete().eq("id", termId);
  }

  async saveTooltip(tooltip: Tooltip): Promise<void> {
    const s: SerializedTooltip = {
      id: tooltip.id.value, targetComponent: tooltip.targetComponent,
      termKey: tooltip.termKey, text: tooltip.text, difficulty: tooltip.difficulty,
    };
    const { error } = await this.supabase.from("tooltips").upsert(
      { id: tooltip.id.value, dados: s, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar tooltip: ${error.message}`);
  }

  async findTooltipById(tooltipId: string): Promise<Tooltip | null> {
    const { data, error } = await this.supabase.from("tooltips").select("dados").eq("id", tooltipId).single();
    if (error || !data) return null;
    return this.deserializeTooltip(data.dados as SerializedTooltip);
  }

  async findTooltipsByComponent(component: string): Promise<Tooltip[]> {
    const { data, error } = await this.supabase.from("tooltips").select("dados");
    if (error || !data) return [];
    return data
      .map((d: { dados: SerializedTooltip }) => d.dados)
      .filter((t: SerializedTooltip) => t.targetComponent === component)
      .map((t: SerializedTooltip) => this.deserializeTooltip(t));
  }

  async findAllTooltips(): Promise<Tooltip[]> {
    const { data, error } = await this.supabase.from("tooltips").select("dados");
    if (error || !data) return [];
    return data.map((d: { dados: SerializedTooltip }) => this.deserializeTooltip(d.dados));
  }

  async deleteTooltip(tooltipId: string): Promise<void> {
    await this.supabase.from("tooltips").delete().eq("id", tooltipId);
  }

  async saveLearningPath(path: LearningPath): Promise<void> {
    const s: SerializedPath = {
      id: path.id.value, name: path.name, description: path.description,
      steps: path.steps, difficulty: path.difficulty,
    };
    const { error } = await this.supabase.from("learning_paths").upsert(
      { id: path.id.value, dados: s, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar trilha: ${error.message}`);
  }

  async findLearningPathById(pathId: string): Promise<LearningPath | null> {
    const { data, error } = await this.supabase.from("learning_paths").select("dados").eq("id", pathId).single();
    if (error || !data) return null;
    return this.deserializePath(data.dados as SerializedPath);
  }

  async findAllLearningPaths(): Promise<LearningPath[]> {
    const { data, error } = await this.supabase.from("learning_paths").select("dados");
    if (error || !data) return [];
    return data.map((d: { dados: SerializedPath }) => this.deserializePath(d.dados));
  }

  async deleteLearningPath(pathId: string): Promise<void> {
    await this.supabase.from("learning_paths").delete().eq("id", pathId);
  }

  private deserializeTerm(s: SerializedTerm): GlossaryTerm {
    return GlossaryTerm.create({
      id: GlossaryTermId.create(s.id), term: s.term, definition: s.definition,
      category: s.category as TermCategory, synonyms: s.synonyms, relatedTerms: s.relatedTerms,
    });
  }

  private deserializeTooltip(s: SerializedTooltip): Tooltip {
    return Tooltip.create({
      id: TooltipId.create(s.id), targetComponent: s.targetComponent,
      termKey: s.termKey, text: s.text, difficulty: s.difficulty as DifficultyLevel,
    });
  }

  private deserializePath(s: SerializedPath): LearningPath {
    return LearningPath.create({
      id: LearningPathId.create(s.id), name: s.name, description: s.description,
      steps: s.steps, difficulty: s.difficulty as DifficultyLevel,
    });
  }
}
