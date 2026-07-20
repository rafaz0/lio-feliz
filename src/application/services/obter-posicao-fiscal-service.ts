import type { ObterPosicaoFiscalQuery } from "@/application/queries/obter-posicao-fiscal";
import type { PosicaoFiscalDto } from "@/application/dtos/relatorio-fiscal";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterPosicaoFiscalService implements IApplicationService<ObterPosicaoFiscalQuery, PosicaoFiscalDto[]> {
  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Execute(query: ObterPosicaoFiscalQuery): Promise<PosicaoFiscalDto[] | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    if (!query.periodo) {
      return new ValidationError("VALID_ERROR", "Período é obrigatório");
    }

    const posicoes = await this.projectionRepo.ObterPosicoes(query.portfolioId);

    let filtradas = posicoes;

    if (query.ativoId) {
      filtradas = posicoes.filter((p) => p.ticker === query.ativoId);
    }

    return filtradas.map((p) => ({
      ticker: p.ticker,
      quantidade: p.quantidade,
      valorTotal: p.valorTotal,
    }));
  }
}
