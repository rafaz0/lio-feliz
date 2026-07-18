import type { ConsultarPosicaoQuery } from "@/application/queries/consultar-posicao";
import type { PosicaoDetalhadaDto } from "@/application/dtos/posicao";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { NotFoundError } from "@/application/errors/application-error";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ConsultarPosicaoService implements IApplicationService<
  ConsultarPosicaoQuery,
  PosicaoDetalhadaDto
> {
  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Execute(query: ConsultarPosicaoQuery): Promise<PosicaoDetalhadaDto | ApplicationError> {
    const errors: Record<string, string[]> = {};
    if (!query.portfolioId) errors.portfolioId = ["Campo obrigatório"];
    if (!query.ativoId) errors.ativoId = ["Campo obrigatório"];
    if (Object.keys(errors).length > 0) {
      return new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors);
    }

    const projection = await this.projectionRepo.ObterPosicao(query.portfolioId, query.ativoId);

    if (!projection) {
      return new NotFoundError("Posicao", query.ativoId, "POSICAO_NOT_FOUND");
    }

    return {
      ticker: projection.ticker,
      nome: projection.nome,
      classe: projection.classe,
      quantidade: projection.quantidade,
      precoMedio: projection.precoMedio,
      valorTotal: projection.valorTotal,
      rentabilidade: {
        ativoId: query.ativoId,
        periodo: { inicio: new Date(0), fim: new Date() },
        valorizacao: projection.rentabilidade.valorizacao,
        rentabilidadeTotal: projection.rentabilidade.rentabilidadeTotal,
        rentabilidadePeriodo: projection.rentabilidade.rentabilidadePeriodo,
      },
    };
  }
}
