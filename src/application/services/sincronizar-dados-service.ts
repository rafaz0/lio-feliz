import type { SincronizarDadosCommand } from "@/application/commands/sincronizar-dados";
import type {
  SincronizacaoRealizadaDto,
  SincronizacaoErroDto,
} from "@/application/dtos/sincronizacao";
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

export class SincronizarDadosService implements IApplicationService<
  SincronizarDadosCommand,
  SincronizacaoRealizadaDto
> {
  constructor(
    private readonly portfolioRepo: IPortfolioRepository,
    private readonly dataGateway: IDataGateway,
    private readonly importInterpreter: IImportInterpreterPort,
    private readonly eventPublisher: IDomainEventPublisher,
  ) {}

  async Execute(
    command: SincronizarDadosCommand,
  ): Promise<SincronizacaoRealizadaDto | ApplicationError> {
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
      dadosImportacao = await this.dataGateway.ObterDadosImportacao(command.fonte, {
        origem: command.fonte,
      });
    } catch (error) {
      return convertInfrastructureError(error as Error, correlationId);
    }

    const erros: SincronizacaoErroDto[] = [];
    const eventsCriados: FinancialEvent[] = [];
    let totalNovo = 0;
    let totalIgnorado = 0;

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
          erros.push({
            fonte: dadosImportacao.fonte,
            linha: i + 1,
            tipo: "DOMAIN_ERROR",
            mensagem: applyResult.error!.message,
          });
          totalIgnorado++;
          continue;
        }

        eventsCriados.push(event);
        totalNovo++;
      } catch (err) {
        erros.push({
          fonte: dadosImportacao.fonte,
          linha: i + 1,
          tipo: "INTERPRET_ERROR",
          mensagem: err instanceof Error ? err.message : "Erro ao interpretar operação",
        });
        totalIgnorado++;
      }
    }

    if (totalNovo > 0) {
      await this.portfolioRepo.Salvar(portfolio);
      await this.eventPublisher.PublicarVarios(eventsCriados as unknown as DomainEvent[]);
    }

    return {
      fonte: dadosImportacao.fonte,
      dataSincronizacao: new Date(),
      totalProcessado: dadosImportacao.operacoes.length,
      totalNovo,
      totalIgnorado,
      erros,
    };
  }

  private validar(command: SincronizarDadosCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};

    if (!command.usuarioId) errors.usuarioId = ["Campo obrigatório"];
    if (!command.fonte) errors.fonte = ["Campo obrigatório"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}
