import type { ConsultarRentabilidadeQuery } from "@/application/queries/consultar-rentabilidade";
import type { RentabilidadeDto } from "@/application/dtos/rentabilidade";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { NotFoundError } from "@/application/errors/application-error";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ConsultarRentabilidadeService implements IApplicationService<
  ConsultarRentabilidadeQuery,
  RentabilidadeDto
> {
  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Execute(query: ConsultarRentabilidadeQuery): Promise<RentabilidadeDto | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    if (!query.periodo?.inicio || !query.periodo?.fim) {
      return new ValidationError("VALID_ERROR", "Período inválido");
    }

    if (!query.ativoId) {
      return {
        ativoId: "PORTFOLIO",
        periodo: { inicio: query.periodo.inicio, fim: query.periodo.fim },
        valorizacao: 0,
        rentabilidadeTotal: 0,
        rentabilidadePeriodo: 0,
      };
    }

    const projection = await this.projectionRepo.ObterPosicao(query.portfolioId, query.ativoId);

    if (!projection) {
      return new NotFoundError("Posicao", query.ativoId, "POSICAO_NOT_FOUND");
    }

    return {
      ativoId: query.ativoId,
      periodo: { inicio: query.periodo.inicio, fim: query.periodo.fim },
      valorizacao: projection.rentabilidade.valorizacao,
      rentabilidadeTotal: projection.rentabilidade.rentabilidadeTotal,
      rentabilidadePeriodo: projection.rentabilidade.rentabilidadePeriodo,
    };
  }
}
