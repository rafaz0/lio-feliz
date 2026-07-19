import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { ProventosDto } from "@/application/dtos/proventos";
import type { ObterProventosQuery } from "@/application/queries/obter-proventos";

export interface FakeDividendsDispatcherOptions {
  obterProventos?: (query: ObterProventosQuery) => ProventosDto | ApplicationError;
}

const proventosFake: ProventosDto = {
  proventos: [
    {
      ativoId: "PETR4",
      ticker: "PETR4",
      tipo: "DIVIDENDO",
      valor: 150,
      dataPagamento: new Date("2026-03-20"),
      dataBase: new Date("2026-03-01"),
    },
    {
      ativoId: "ITUB4",
      ticker: "ITUB4",
      tipo: "JCP",
      valor: 80,
      dataPagamento: new Date("2026-06-15"),
      dataBase: new Date("2026-06-01"),
    },
  ],
  totalPeriodo: 230,
  totalAcumulado: 230,
};

export class FakeDividendsDispatcher implements IDispatcher {
  public queries: IQuery[] = [];

  constructor(private readonly options: FakeDividendsDispatcherOptions = {}) {}

  async DispatchCommand<TDto>(_command: ICommand): Promise<TDto | ApplicationError> {
    throw new Error("FakeDividendsDispatcher não suporta commands nesta Slice");
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    this.queries.push(query);
    if (query.type === "ObterProventosQuery") {
      if (this.options.obterProventos) {
        return this.options.obterProventos(query as ObterProventosQuery) as TDto;
      }
      return proventosFake as unknown as TDto;
    }
    throw new Error(`Query não suportada no fake: ${query.type}`);
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
