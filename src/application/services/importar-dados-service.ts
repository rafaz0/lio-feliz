import type { ImportarDadosCommand } from "@/application/commands/importar-dados";
import type { ImportacaoRealizadaDto } from "@/application/dtos/importacao";
import type { IApplicationService } from "@/application/application-service";
import type { IDataGateway } from "@/application/ports/data-gateway";
import type { IImportInterpreterPort } from "@/application/ports/import-interpreter";
import type { IDomainEventPublisher } from "@/application/ports/domain-event-publisher";
import type { IImportHistoryRepository } from "@/application/ports/import-history-repository";
import type { IPortfolioRepository } from "@/application/ports/portfolio-repository";
import { ImportJob, isValidImportFormat, ImportJobId, isValidImportSource } from "@/core/domain/import-export";
import { NotFoundError, ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ImportarDadosService implements IApplicationService<ImportarDadosCommand, ImportacaoRealizadaDto> {
  constructor(
    private readonly portfolioRepo: IPortfolioRepository,
    private readonly dataGateway: IDataGateway,
    private readonly importInterpreter: IImportInterpreterPort,
    private readonly importHistoryRepo: IImportHistoryRepository,
    private readonly eventPublisher: IDomainEventPublisher,
  ) {}

  async Execute(command: ImportarDadosCommand): Promise<ImportacaoRealizadaDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const portfolios = await this.portfolioRepo.ObterTodos(command.usuarioId);
    if (portfolios.length === 0) {
      return new NotFoundError("Portfolio", command.usuarioId, "PORTFOLIO_NOT_FOUND");
    }
    const portfolio = portfolios[0];

    let dadosImportacao;
    try {
      dadosImportacao = await this.dataGateway.ObterDadosImportacao(command.origem, {
        origem: command.origem,
        arquivo: command.arquivo,
        conexao: command.conexao,
        intervalo: command.intervalo,
      });
    } catch (error) {
      return new ValidationError(
        "DATA_GATEWAY_ERROR",
        error instanceof Error ? error.message : "Erro ao obter dados da origem",
      );
    }

    const format = isValidImportFormat(command.formato) ? command.formato : "CSV";
    const source = isValidImportSource(command.origem) ? command.origem : "LOCAL";
    const importJob = ImportJob.create({
      fileName: command.arquivo || `import_${Date.now()}.${format.toLowerCase()}`,
      fileSize: command.arquivoSize || 0,
      format,
      source,
      metadata: { usuarioId: command.usuarioId, fonte: command.conexao?.provedor || command.origem, observacoes: command.observacoes },
      totalRecords: dadosImportacao.operacoes.length,
    });

    importJob.startProcessing();
    await this.importHistoryRepo.save(importJob);

    const erros: { linha: number; tipo: string; mensagem: string }[] = [];
    let operacoesImportadas = 0;

    for (let i = 0; i < dadosImportacao.operacoes.length; i++) {
      const op = dadosImportacao.operacoes[i];
      try {
        const event = this.importInterpreter.InterpretarOperacao(op, portfolio.id.value, importJob.id.value);
        await this.eventPublisher.Publicar(event);
        operacoesImportadas++;
        importJob.addSuccess(1);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Erro ao interpretar operação";
        const importErr = { line: i + 1, field: "operacao", message: errorMessage, code: "INTERPRET_ERROR" };
        erros.push({ linha: i + 1, tipo: "INTERPRET_ERROR", mensagem: errorMessage });
        importJob.addError(importErr);
      }
    }

    if (erros.length > 0) {
      importJob.fail(erros.map(e => ({ line: e.linha, field: "import", message: e.mensagem, code: e.tipo })));
    } else {
      importJob.complete();
    }

    await this.importHistoryRepo.update(importJob);

    return {
      totalOperacoes: dadosImportacao.operacoes.length,
      operacoesImportadas,
      operacoesRejeitadas: erros.length,
      erros,
      importJobId: importJob.id.value,
    };
  }

  private validar(command: ImportarDadosCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.usuarioId) errors.usuarioId = ["Campo obrigatório"];
    if (!command.origem) errors.origem = ["Campo obrigatório"];
    if (!command.formato) errors.formato = ["Campo obrigatório"];
    if (!isValidImportFormat(command.formato)) errors.formato = ["Formato inválido. Use EXCEL, CSV ou JSON"];
    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}
