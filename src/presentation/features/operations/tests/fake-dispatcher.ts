import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { OperacaoRegistradaDto } from "@/application/dtos/operacao";
import type { RegistrarOperacaoCommand } from "@/application/commands/registrar-operacao";

export interface FakeOperationsDispatcherOptions {
  registrarOperacao?: (
    command: RegistrarOperacaoCommand,
  ) => OperacaoRegistradaDto | ApplicationError;
}

export class FakeOperationsDispatcher implements IDispatcher {
  public comandos: ICommand[] = [];

  constructor(private readonly options: FakeOperationsDispatcherOptions = {}) {}

  async DispatchCommand<TDto>(command: ICommand): Promise<TDto | ApplicationError> {
    this.comandos.push(command);
    if (this.options.registrarOperacao) {
      return this.options.registrarOperacao(command as RegistrarOperacaoCommand) as TDto;
    }
    return {
      operacaoId: "op-1",
      tipo: (command as RegistrarOperacaoCommand).tipo,
      ativoId: (command as RegistrarOperacaoCommand).ativoId,
      quantidade: (command as RegistrarOperacaoCommand).quantidade,
      valor: (command as RegistrarOperacaoCommand).valor,
      data: (command as RegistrarOperacaoCommand).data,
      status: "CONFIRMED",
    } as unknown as TDto;
  }

  // Queries não utilizadas nesta Slice de testes
  async DispatchQuery<TDto>(_query: IQuery): Promise<TDto | ApplicationError> {
    throw new Error("FakeOperationsDispatcher não suporta queries nesta Slice");
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
