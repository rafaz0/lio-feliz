import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { DadosExportadosDto } from "@/application/dtos/exportacao";
import type { ExportarDadosQuery } from "@/application/queries/exportar-dados";

export interface FakeReportsDispatcherOptions {
  exportarDados?: (query: ExportarDadosQuery) => DadosExportadosDto | ApplicationError;
}

export class FakeReportsDispatcher implements IDispatcher {
  public queries: IQuery[] = [];

  constructor(private readonly options: FakeReportsDispatcherOptions = {}) {}

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    this.queries.push(query);
    if (this.options.exportarDados) {
      return this.options.exportarDados(query as ExportarDadosQuery) as TDto;
    }
    return {
      formato: (query as ExportarDadosQuery).formato,
      conteudo: "{}",
      nomeArquivo: `carteira-${(query as ExportarDadosQuery).portfolioId}.${
        (query as ExportarDadosQuery).formato
      }`,
    } as unknown as TDto;
  }

  async DispatchCommand<TDto>(_command: ICommand): Promise<TDto | ApplicationError> {
    throw new Error("FakeReportsDispatcher não suporta comandos nesta Slice");
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
