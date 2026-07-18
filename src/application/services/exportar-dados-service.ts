import type { ExportarDadosQuery } from "@/application/queries/exportar-dados";
import type { DadosExportadosDto } from "@/application/dtos/exportacao";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

const FORMATOS_SUPORTADOS: readonly string[] = ["json", "csv"];

export class ExportarDadosService implements IApplicationService<
  ExportarDadosQuery,
  DadosExportadosDto
> {
  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Execute(query: ExportarDadosQuery): Promise<DadosExportadosDto | ApplicationError> {
    const errors: Record<string, string[]> = {};
    if (!query.portfolioId) errors.portfolioId = ["Campo obrigatório"];
    if (!query.formato) errors.formato = ["Campo obrigatório"];
    else if (!FORMATOS_SUPORTADOS.includes(query.formato))
      errors.formato = [
        `Formato não suportado: ${query.formato}. Formatos: ${FORMATOS_SUPORTADOS.join(", ")}`,
      ];
    if (Object.keys(errors).length > 0) {
      return new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors);
    }

    const patrimonio = await this.projectionRepo.ObterPatrimonio(query.portfolioId);
    const posicoes = await this.projectionRepo.ObterPosicoes(query.portfolioId);

    const dadosBrutos = {
      patrimonio: patrimonio
        ? {
            total: patrimonio.patrimonioTotal,
            investido: patrimonio.patrimonioInvestido,
            disponivel: patrimonio.saldoDisponivel,
            moeda: patrimonio.moeda,
            dataReferencia: patrimonio.dataReferencia,
          }
        : null,
      posicoes: posicoes.map((p) => ({
        ticker: p.ticker,
        nome: p.nome,
        classe: p.classe,
        quantidade: p.quantidade,
        precoMedio: p.precoMedio,
        valorTotal: p.valorTotal,
      })),
    };

    if (query.formato === "csv") {
      const linhas = ["ticker,nome,classe,quantidade,precoMedio,valorTotal"];
      for (const p of dadosBrutos.posicoes) {
        linhas.push(
          `${p.ticker},${p.nome},${p.classe},${p.quantidade},${p.precoMedio},${p.valorTotal}`,
        );
      }
      return {
        formato: "csv",
        conteudo: linhas.join("\n"),
        nomeArquivo: `carteira-${query.portfolioId}.csv`,
      };
    }

    return {
      formato: "json",
      conteudo: JSON.stringify(dadosBrutos, null, 2),
      nomeArquivo: `carteira-${query.portfolioId}.json`,
    };
  }
}
