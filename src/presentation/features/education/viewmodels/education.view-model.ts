import type { GlossaryTermDto } from "@/application/dtos/education";

export interface GlossaryTermViewModel {
  readonly id: string;
  readonly term: string;
  readonly definition: string;
  readonly category: string;
  readonly categoryLabel: string;
  readonly synonyms: string[];
  readonly relatedTerms: string[];
}

const CATEGORY_LABELS: Record<string, string> = {
  CONCEITO: "Conceito",
  TIPO_ATIVO: "Tipo de Ativo",
  INDICADOR: "Indicador",
  ESTRATEGIA: "Estrategia",
  TRIBUTACAO: "Tributacao",
  MERCADO: "Mercado",
};

export function toGlossaryTermViewModel(dto: GlossaryTermDto): GlossaryTermViewModel {
  return {
    id: dto.id,
    term: dto.term,
    definition: dto.definition,
    category: dto.category,
    categoryLabel: CATEGORY_LABELS[dto.category] ?? dto.category,
    synonyms: dto.synonyms,
    relatedTerms: dto.relatedTerms,
  };
}

export function toGlossaryTermViewModels(dtos: GlossaryTermDto[]): GlossaryTermViewModel[] {
  return dtos.map(toGlossaryTermViewModel);
}

export function groupByCategory(
  terms: GlossaryTermViewModel[],
): Record<string, GlossaryTermViewModel[]> {
  const grouped: Record<string, GlossaryTermViewModel[]> = {};
  for (const t of terms) {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  }
  return grouped;
}
