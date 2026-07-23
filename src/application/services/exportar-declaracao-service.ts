import type { ExportarDeclaracaoCommand } from "@/application/commands/exportar-declaracao";
import type { DadosExportadosDto } from "@/application/dtos/exportacao";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

const HEADER_CSV = "Ano,Mês,Ticker,Operação,Quantidade,Preço,Valor Total,Ganho,Imposto Devido";

export class ExportarDeclaracaoService implements IApplicationService<
  ExportarDeclaracaoCommand,
  DadosExportadosDto
> {
  constructor(private readonly projectionRepo: IProjectionRepository) {}

  async Execute(
    command: ExportarDeclaracaoCommand,
  ): Promise<DadosExportadosDto | ApplicationError> {
    if (!command.portfolioId) {
      return new ValidationError("VALID_ERROR", "portfolioId é obrigatório");
    }

    if (!command.ano || command.ano < 1900) {
      return new ValidationError("VALID_ERROR", "Ano inválido");
    }

    const posicoes = await this.projectionRepo.ObterPosicoes(command.portfolioId);
    const proventos = await this.projectionRepo.ObterProventos(command.portfolioId, {
      ano: command.ano,
    });

    let conteudo = "";
    const extensao = command.formato === "pdf" ? "pdf" : "csv";

    if (command.formato === "csv") {
      conteudo = this.gerarCsv(posicoes, proventos, command.ano, command.includes);
    } else {
      conteudo = `Exportação PDF para ${command.ano} - ${command.includes.join(", ")}`;
    }

    return {
      dados: conteudo,
      formato: command.formato,
      nomeArquivo: `declaracao_irpf_${command.ano}.${extensao}`,
    };
  }

  private gerarCsv(
    posicoes: { ticker: string; quantidade: number; valorTotal: number; classe?: string }[],
    proventos: { ticker: string; valor: number; data: string; tipo: string }[],
    ano: number,
    includes: string[],
  ): string {
    const linhas: string[] = [HEADER_CSV];

    if (includes.includes("operacoes") || includes.length === 0) {
      for (const p of posicoes) {
        linhas.push(
          [ano, "12", p.ticker, "POSICAO", p.quantidade, 0, p.valorTotal.toFixed(2), 0, 0].join(
            ",",
          ),
        );
      }
    }

    if (includes.includes("proventos") || includes.length === 0) {
      for (const p of proventos) {
        linhas.push(
          [
            ano,
            p.data.slice(0, 7),
            p.ticker,
            p.tipo.toUpperCase(),
            0,
            0,
            p.valor.toFixed(2),
            0,
            0,
          ].join(","),
        );
      }
    }

    return linhas.join("\n");
  }
}
