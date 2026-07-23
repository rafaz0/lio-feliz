import type { BuscarGlossarioQuery } from "@/application/queries/buscar-glossario";
import type { GlossarySearchDto } from "@/application/dtos/education";
import type { IApplicationService } from "@/application/application-service";
import type { IGlossaryRepository } from "@/application/ports/glossary-repository";
import type { ApplicationError } from "@/application/errors/application-error";
import { GlossaryIndexer } from "@/core/domain/education";

export class BuscarGlossarioService implements IApplicationService<
  BuscarGlossarioQuery,
  GlossarySearchDto
> {
  private readonly indexer = new GlossaryIndexer();

  constructor(private readonly glossaryRepo: IGlossaryRepository) {}

  async Execute(query: BuscarGlossarioQuery): Promise<GlossarySearchDto | ApplicationError> {
    const allTerms = await this.glossaryRepo.findAllTerms();
    const results = this.indexer.search(query.query, allTerms);

    return {
      results: results.map((t) => ({
        id: t.id.value,
        term: t.term,
        definition: t.definition,
        category: t.category,
        synonyms: t.synonyms,
        relatedTerms: t.relatedTerms,
      })),
      total: results.length,
      query: query.query,
    };
  }
}
