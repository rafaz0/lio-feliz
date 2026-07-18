import type { ObterProventosQuery } from "@/application/queries/obter-proventos";
import type { ProventosDto, ProventoDto } from "@/application/dtos/proventos";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class AcompanharProventosService implements IApplicationService<
  ObterProventosQuery,
  ProventosDto
> {
  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Execute(query: ObterProventosQuery): Promise<ProventosDto | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    const projecoes = await this.projectionRepo.ObterProventos(query.portfolioId, {
      ano: query.ano,
      ticker: query.ticker,
    });

    const proventos: ProventoDto[] = projecoes.map((p) => ({
      ativoId: p.assetId,
      ticker: p.ticker,
      tipo: p.tipo,
      valor: p.valor,
      dataPagamento: p.dataPagamento,
      dataBase: p.dataBase,
    }));

    const totalPeriodo = proventos.reduce((sum, p) => sum + p.valor, 0);
    const totalAcumulado = proventos.reduce((sum, p) => sum + p.valor, 0);

    return { proventos, totalPeriodo, totalAcumulado };
  }
}
