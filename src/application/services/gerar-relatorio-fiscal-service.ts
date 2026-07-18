import type { GerarRelatorioFiscalQuery } from "@/application/queries/gerar-relatorio-fiscal";
import type {
  RelatorioFiscalDto,
  PosicaoFiscalDto,
  GanhoCapitalDto,
} from "@/application/dtos/relatorio-fiscal";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class GerarRelatorioFiscalService implements IApplicationService<
  GerarRelatorioFiscalQuery,
  RelatorioFiscalDto
> {
  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Execute(query: GerarRelatorioFiscalQuery): Promise<RelatorioFiscalDto | ApplicationError> {
    if (!query.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    if (!query.ano || query.ano < 1900) {
      return new ValidationError("VALID_ERROR", "Ano inválido");
    }

    const posicoes = await this.projectionRepo.ObterPosicoes(query.portfolioId);
    const proventos = await this.projectionRepo.ObterProventos(query.portfolioId, {
      ano: query.ano,
    });

    const posicao31Dez: PosicaoFiscalDto[] = posicoes.map((p) => ({
      ticker: p.ticker,
      quantidade: p.quantidade,
      valorTotal: p.valorTotal,
    }));

    const dividendosAno = proventos
      .filter((p) => p.tipo === "dividendo" || p.tipo === "DIVIDEND")
      .reduce((sum, p) => sum + p.valor, 0);

    const jcpAno = proventos
      .filter((p) => p.tipo === "jcp" || p.tipo === "JCP")
      .reduce((sum, p) => sum + p.valor, 0);

    const ganhoCapital: GanhoCapitalDto[] = [];
    const prejuizoCompensar = 0;

    return {
      ano: query.ano,
      posicao31Dez,
      dividendosAno,
      jcpAno,
      ganhoCapital,
      prejuizoCompensar,
    };
  }
}
