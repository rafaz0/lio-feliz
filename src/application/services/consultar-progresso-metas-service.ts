import type { ConsultarProgressoMetasQuery } from "@/application/queries/consultar-progresso-metas";
import type { ProgressoMetasDto, MetaProgressoDto } from "@/application/dtos/metas";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ConsultarProgressoMetasService implements IApplicationService<
  ConsultarProgressoMetasQuery,
  ProgressoMetasDto
> {
  constructor(
    private readonly projectionRepo: IProjectionRepository,
    private readonly configRepo: IConfigurationRepository,
  ) {}

  async Execute(
    query: ConsultarProgressoMetasQuery,
  ): Promise<ProgressoMetasDto | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    const metas = await this.configRepo.ObterMetas(query.portfolioId);
    const patrimonio = await this.projectionRepo.ObterPatrimonio(query.portfolioId);

    const valorAtual = patrimonio?.patrimonioTotal ?? 0;

    const metasProgresso: MetaProgressoDto[] = metas.map((m) => {
      const percentualConcluido =
        m.valorAlvo > 0 ? Math.min((valorAtual / m.valorAlvo) * 100, 100) : 0;
      return {
        nome: m.nome,
        valorAlvo: m.valorAlvo,
        valorAtual,
        percentualConcluido,
        prazo: m.prazo,
      };
    });

    const progressoGeral =
      metasProgresso.length > 0
        ? metasProgresso.reduce((sum, m) => sum + m.percentualConcluido, 0) / metasProgresso.length
        : 0;

    return { metas: metasProgresso, progressoGeral };
  }
}
