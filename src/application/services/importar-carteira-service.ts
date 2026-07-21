import type { ImportarCarteiraCommand } from "@/application/commands/importar-carteira";
import type { ImportacaoRealizadaDto } from "@/application/dtos/importacao";
import type { ImportacaoErroDto } from "@/application/dtos/operacao";
import type { IApplicationService } from "@/application/application-service";
import type { IPortfolioRepository } from "@/application/ports/portfolio-repository";
import type { IDataGateway, DadosImportacao } from "@/application/ports/data-gateway";
import type { IDomainEventPublisher } from "@/application/ports/domain-event-publisher";
import type { IImportInterpreterPort } from "@/application/ports/import-interpreter";
import { PortfolioId } from "@/core/domain";
import type { DomainEvent } from "@/core/domain";
import type { FinancialEvent } from "@/core/domain/portfolio";
import {
  NotFoundError,
  ValidationError,
  type ApplicationError,
} from "@/application/errors/application-error";
import { convertDomainError, convertInfrastructureError } from "@/application/error-converter";

export class ImportarCarteiraService implements IApplicationService<
  ImportarCarteiraCommand,
  ImportacaoRealizadaDto
> {
  constructor(
    private readonly portfolioRepo: IPortfolioRepository,
    private readonly dataGateway: IDataGateway,
    private readonly importInterpreter: IImportInterpreterPort,
    private readonly eventPublisher: IDomainEventPublisher,
  ) {}

  async Execute(
    command: ImportarCarteiraCommand,
  ): Promise<ImportacaoRealizadaDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const correlationId = `${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;

    const portfolios = await this.portfolioRepo.ObterTodos(command.usuarioId);
    if (portfolios.length === 0) {
      return new NotFoundError(
        "Portfolio",
        command.usuarioId,
        "PORTFOLIO_NOT_FOUND",
        "Nenhum portfolio encontrado para o usuário",
      );
    }
    const portfolio = portfolios[0];

    let dadosImportacao: DadosImportacao;
    try {
      dadosImportacao = await this.dataGateway.ObterDadosImportacao(command.origem, {
        origem: command.origem,
        arquivo: command.arquivo,
        conexao: command.conexao,
        intervalo: command.intervalo,
      });
    } catch (error) {
      return convertInfrastructureError(error as Error, correlationId);
    }

    const erros: ImportacaoErroDto[] = [];
    const eventsCriados: FinancialEvent[] = [];
    let operacoesImportadas = 0;

    for (let i = 0; i < dadosImportacao.operacoes.length; i++) {
      const op = dadosImportacao.operacoes[i];
      try {
        const event = this.importInterpreter.InterpretarOperacao(
          op,
          portfolio.id.value,
          correlationId,
        );

        const applyResult = portfolio.applyEvent(event);
        if (applyResult.isFailure) {
          const { error } = convertDomainError(applyResult.error!, correlationId);
          erros.push({ linha: i + 1, tipo: "DOMAIN_ERROR", mensagem: error.message });
          continue;
        }

        eventsCriados.push(event);
        operacoesImportadas++;
      } catch (err) {
        erros.push({
          linha: i + 1,
          tipo: "INTERPRET_ERROR",
          mensagem: err instanceof Error ? err.message : "Erro ao interpretar operação",
        });
      }
    }

    if (operacoesImportadas > 0) {
      await this.portfolioRepo.Salvar(portfolio);
      await this.eventPublisher.PublicarVarios(eventsCriados as unknown as DomainEvent[]);
    }

    return {
      totalOperacoes: dadosImportacao.operacoes.length,
      operacoesImportadas,
      operacoesRejeitadas: erros.length,
      erros,
    };
  }

  private validar(command: ImportarCarteiraCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};

    if (!command.usuarioId) errors.usuarioId = ["Campo obrigatório"];
    if (!command.origem) errors.origem = ["Campo obrigatório"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}
