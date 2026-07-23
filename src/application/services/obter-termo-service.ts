import type { ObterTermoQuery } from "@/application/queries/obter-termo";
import type { GlossaryTermDto } from "@/application/dtos/education";
import type { IApplicationService } from "@/application/application-service";
import type { IGlossaryRepository } from "@/application/ports/glossary-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { GlossaryIndexer } from "@/core/domain/education";

export class ObterTermoService implements IApplicationService<ObterTermoQuery, GlossaryTermDto> {
  private readonly indexer = new GlossaryIndexer();

  constructor(private readonly glossaryRepo: IGlossaryRepository) {}

  async Execute(query: ObterTermoQuery): Promise<GlossaryTermDto | ApplicationError> {
    const allTerms = await this.glossaryRepo.findAllTerms();
    const results = this.indexer.lookup(query.term, allTerms);

    if (results.length === 0) {
      return new NotFoundError("GlossaryTerm", query.term);
    }

    const term = results[0];

    return {
      id: term.id.value,
      term: term.term,
      definition: term.definition,
      category: term.category,
      synonyms: term.synonyms,
      relatedTerms: term.relatedTerms,
    };
  }
}
