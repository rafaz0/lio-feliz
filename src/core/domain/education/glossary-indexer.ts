import { GlossaryTerm } from "./glossary-term";
import { Tooltip } from "./tooltip";
import { LearningPath } from "./learning-path";

export class GlossaryIndexer {
  lookup(term: string, terms: GlossaryTerm[]): GlossaryTerm[] {
    const query = term.toLowerCase();
    return terms.filter(
      (t) =>
        t.term.toLowerCase() === query ||
        t.synonyms.some((s) => s.toLowerCase() === query),
    );
  }

  search(query: string, terms: GlossaryTerm[]): GlossaryTerm[] {
    const q = query.toLowerCase();
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.synonyms.some((s) => s.toLowerCase().includes(q)),
    );
  }

  getTooltips(component: string, tooltips: Tooltip[]): Tooltip[] {
    return tooltips.filter((t) => t.targetComponent === component);
  }

  getTermsByCategory(category: string, terms: GlossaryTerm[]): GlossaryTerm[] {
    return terms.filter((t) => t.category === category);
  }

  getLearningPathsByDifficulty(
    difficulty: string,
    paths: LearningPath[],
  ): LearningPath[] {
    return paths.filter((p) => p.difficulty === difficulty);
  }
}
