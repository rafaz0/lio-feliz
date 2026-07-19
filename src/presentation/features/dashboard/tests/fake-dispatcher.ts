import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { PatrimonioDto } from "@/application/dtos";
import type { HistoricoPatrimonialDto } from "@/application/dtos/historico";

export interface FakeDispatcherOptions {
  patrimonio?: PatrimonioDto | null;
  historico?: HistoricoPatrimonialDto;
  patrimonioError?: ApplicationError;
}

export class FakeDispatcher implements IDispatcher {
  public patrimonioCalls = 0;
  public historicoCalls = 0;
  private readonly options: FakeDispatcherOptions;

  constructor(options: FakeDispatcherOptions = {}) {
    this.options = options;
  }

  async DispatchCommand<TDto>(_command: ICommand): Promise<TDto | ApplicationError> {
    throw new Error("FakeDispatcher não suporta comandos nesta Slice");
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    switch (query.type) {
      case "ObterPatrimonioQuery": {
        this.patrimonioCalls++;
        if (this.options.patrimonioError) return this.options.patrimonioError as ApplicationError;
        return (this.options.patrimonio ?? null) as TDto;
      }
      case "ObterHistoricoPatrimonialQuery": {
        this.historicoCalls++;
        return (this.options.historico ?? null) as TDto;
      }
      default:
        throw new Error(`FakeDispatcher: query não suportada ${query.type}`);
    }
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
