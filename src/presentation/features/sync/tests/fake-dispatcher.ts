import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { SincronizacaoRealizadaDto } from "@/application/dtos/sincronizacao";
import type { SincronizarDadosCommand } from "@/application/commands/sincronizar-dados";

export interface FakeSyncDispatcherOptions {
  sincronizarDados?: (
    command: SincronizarDadosCommand,
  ) => SincronizacaoRealizadaDto | ApplicationError;
}

export class FakeSyncDispatcher implements IDispatcher {
  public comandos: ICommand[] = [];

  constructor(private readonly options: FakeSyncDispatcherOptions = {}) {}

  async DispatchCommand<TDto>(command: ICommand): Promise<TDto | ApplicationError> {
    this.comandos.push(command);
    if (this.options.sincronizarDados) {
      return this.options.sincronizarDados(command as SincronizarDadosCommand) as TDto;
    }
    return {
      fonte: (command as SincronizarDadosCommand).fonte,
      dataSincronizacao: new Date(),
      totalProcessado: 0,
      totalNovo: 0,
      totalIgnorado: 0,
      erros: [],
    } as unknown as TDto;
  }

  async DispatchQuery<TDto>(_query: IQuery): Promise<TDto | ApplicationError> {
    throw new Error("FakeSyncDispatcher não suporta queries nesta Slice");
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
