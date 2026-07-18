import type { ObterPatrimonioQuery } from "@/application/queries/obter-patrimonio";
import type { PatrimonioDto, AlocacaoDto } from "@/application/dtos/patrimonio";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { NotFoundError } from "@/application/errors/application-error";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ConsultarPatrimonioService implements IApplicationService<
  ObterPatrimonioQuery,
  PatrimonioDto
> {
  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Execute(query: ObterPatrimonioQuery): Promise<PatrimonioDto | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    const projection = await this.projectionRepo.ObterPatrimonio(query.portfolioId);

    if (!projection) {
      return new NotFoundError("Portfolio", query.portfolioId, "PORTFOLIO_NOT_FOUND");
    }

    return {
      patrimonioTotal: projection.patrimonioTotal,
      patrimonioInvestido: projection.patrimonioInvestido,
      saldoDisponivel: projection.saldoDisponivel,
      moeda: projection.moeda,
      dataReferencia: projection.dataReferencia,
      alocacao: projection.alocacao.map((a): AlocacaoDto => ({
        classe: a.classe,
        valor: a.valor,
        percentual: a.percentual,
      })),
      evolucaoMensal: projection.evolucaoMensal,
    };
  }
}
