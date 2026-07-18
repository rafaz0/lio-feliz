import type { ObterHistoricoPatrimonialQuery } from "@/application/queries/obter-historico-patrimonial";
import type { HistoricoPatrimonialDto, PontoHistoricoDto } from "@/application/dtos/historico";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterHistoricoPatrimonialService implements IApplicationService<
  ObterHistoricoPatrimonialQuery,
  HistoricoPatrimonialDto
> {
  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Execute(
    query: ObterHistoricoPatrimonialQuery,
  ): Promise<HistoricoPatrimonialDto | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    if (!query.periodo?.inicio || !query.periodo?.fim) {
      return new ValidationError("VALID_ERROR", "Período inválido");
    }

    const projecoes = await this.projectionRepo.ObterHistorico(query.portfolioId, {
      inicio: query.periodo.inicio,
      fim: query.periodo.fim,
    });

    const pontos: PontoHistoricoDto[] = projecoes.map((p) => ({
      data: p.data,
      patrimonioTotal: p.patrimonioTotal,
      patrimonioInvestido: p.patrimonioInvestido,
    }));

    return {
      portfolioId: query.portfolioId,
      periodo: {
        inicio: query.periodo.inicio,
        fim: query.periodo.fim,
      },
      pontos,
    };
  }
}
