import type { TermCategory, DifficultyLevel } from "@/core/domain/education";

export interface GlossaryTermDto {
  readonly id: string;
  readonly term: string;
  readonly definition: string;
  readonly category: TermCategory;
  readonly synonyms: string[];
  readonly relatedTerms: string[];
}

export interface TooltipDto {
  readonly id: string;
  readonly targetComponent: string;
  readonly termKey: string;
  readonly text: string;
  readonly difficulty: DifficultyLevel;
}

export interface LearningPathDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly steps: string[];
  readonly difficulty: DifficultyLevel;
}

export interface GlossarySearchDto {
  readonly results: GlossaryTermDto[];
  readonly total: number;
  readonly query: string;
}
