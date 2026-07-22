import type { TermCategory } from "@/core/domain/education";

export interface CriarTermoGlossarioCommand {
  readonly type: "CriarTermoGlossarioCommand";
  readonly term: string;
  readonly definition: string;
  readonly category: TermCategory;
  readonly synonyms: string[];
  readonly relatedTerms: string[];
}
