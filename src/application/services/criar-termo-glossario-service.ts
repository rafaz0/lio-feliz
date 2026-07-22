import type { CriarTermoGlossarioCommand } from "@/application/commands/criar-termo-glossario";
import type { GlossaryTermDto } from "@/application/dtos/education";
import type { IApplicationService } from "@/application/application-service";
import type { IGlossaryRepository } from "@/application/ports/glossary-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { GlossaryTerm, GlossaryTermId } from "@/core/domain/education";

export class CriarTermoGlossarioService
  implements IApplicationService<CriarTermoGlossarioCommand, GlossaryTermDto>
{
  constructor(private readonly glossaryRepo: IGlossaryRepository) {}

  async Execute(command: CriarTermoGlossarioCommand): Promise<GlossaryTermDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const term = GlossaryTerm.create({
      id: GlossaryTermId.generate(),
      term: command.term,
      definition: command.definition,
      category: command.category,
      synonyms: command.synonyms,
      relatedTerms: command.relatedTerms,
    });

    await this.glossaryRepo.saveTerm(term);

    return {
      id: term.id.value,
      term: term.term,
      definition: term.definition,
      category: term.category,
      synonyms: term.synonyms,
      relatedTerms: term.relatedTerms,
    };
  }

  private validar(command: CriarTermoGlossarioCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.term) errors.term = ["Termo obrigatorio"];
    if (!command.definition) errors.definition = ["Definicao obrigatoria"];
    if (!command.category) errors.category = ["Categoria obrigatoria"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada invalidos", errors)
      : null;
  }
}
