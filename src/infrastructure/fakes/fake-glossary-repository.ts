import type { IGlossaryRepository } from "@/application/ports/glossary-repository";
import {
  GlossaryTerm,
  Tooltip,
  LearningPath,
  GlossaryTermId,
  TooltipId,
  LearningPathId,
} from "@/core/domain/education";

export class FakeGlossaryRepository implements IGlossaryRepository {
  private terms = new Map<string, GlossaryTerm>();
  private tooltips = new Map<string, Tooltip>();
  private paths = new Map<string, LearningPath>();

  async saveTerm(term: GlossaryTerm): Promise<void> {
    this.terms.set(term.id.value, term);
  }

  async findTermById(termId: string): Promise<GlossaryTerm | null> {
    return this.terms.get(termId) ?? null;
  }

  async findTermByKey(term: string): Promise<GlossaryTerm | null> {
    return Array.from(this.terms.values()).find((t) => t.term === term) ?? null;
  }

  async searchTerms(query: string): Promise<GlossaryTerm[]> {
    const q = query.toLowerCase();
    return Array.from(this.terms.values()).filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.synonyms.some((s) => s.toLowerCase().includes(q)),
    );
  }

  async findAllTerms(): Promise<GlossaryTerm[]> {
    return Array.from(this.terms.values());
  }

  async deleteTerm(termId: string): Promise<void> {
    this.terms.delete(termId);
  }

  async saveTooltip(tooltip: Tooltip): Promise<void> {
    this.tooltips.set(tooltip.id.value, tooltip);
  }

  async findTooltipById(tooltipId: string): Promise<Tooltip | null> {
    return this.tooltips.get(tooltipId) ?? null;
  }

  async findTooltipsByComponent(component: string): Promise<Tooltip[]> {
    return Array.from(this.tooltips.values()).filter((t) => t.targetComponent === component);
  }

  async findAllTooltips(): Promise<Tooltip[]> {
    return Array.from(this.tooltips.values());
  }

  async deleteTooltip(tooltipId: string): Promise<void> {
    this.tooltips.delete(tooltipId);
  }

  async saveLearningPath(path: LearningPath): Promise<void> {
    this.paths.set(path.id.value, path);
  }

  async findLearningPathById(pathId: string): Promise<LearningPath | null> {
    return this.paths.get(pathId) ?? null;
  }

  async findAllLearningPaths(): Promise<LearningPath[]> {
    return Array.from(this.paths.values());
  }

  async deleteLearningPath(pathId: string): Promise<void> {
    this.paths.delete(pathId);
  }

  reset(): void {
    this.terms.clear();
    this.tooltips.clear();
    this.paths.clear();
  }
}
