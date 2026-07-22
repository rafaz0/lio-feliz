import type { GlossaryTerm, Tooltip, LearningPath } from "@/core/domain/education";

export interface IGlossaryRepository {
  saveTerm(term: GlossaryTerm): Promise<void>;
  findTermById(termId: string): Promise<GlossaryTerm | null>;
  findTermByKey(term: string): Promise<GlossaryTerm | null>;
  searchTerms(query: string): Promise<GlossaryTerm[]>;
  findAllTerms(): Promise<GlossaryTerm[]>;
  deleteTerm(termId: string): Promise<void>;

  saveTooltip(tooltip: Tooltip): Promise<void>;
  findTooltipById(tooltipId: string): Promise<Tooltip | null>;
  findTooltipsByComponent(component: string): Promise<Tooltip[]>;
  findAllTooltips(): Promise<Tooltip[]>;
  deleteTooltip(tooltipId: string): Promise<void>;

  saveLearningPath(path: LearningPath): Promise<void>;
  findLearningPathById(pathId: string): Promise<LearningPath | null>;
  findAllLearningPaths(): Promise<LearningPath[]>;
  deleteLearningPath(pathId: string): Promise<void>;
}
