import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { RebalanceamentoDto } from "@/application/dtos/rebalanceamento";
import type { CalcularRebalanceamentoQuery } from "@/application/queries/calcular-rebalanceamento";

export interface FakeRebalancingDispatcherOptions {
  rebalanceamento?: (query: CalcularRebalanceamentoQuery) => RebalanceamentoDto | ApplicationError;
}

const rebalanceamentoFake: RebalanceamentoDto = {
  alocacaoAtual: [
    { classe: "RENDA_FIXA", valor: 4000, percentual: 40 },
    { classe: "ACOES", valor: 6000, percentual: 60 },
  ],
  alocacaoDesejada: [
    { classe: "RENDA_FIXA", valor: 5000, percentual: 50 },
    { classe: "ACOES", valor: 5000, percentual: 50 },
  ],
  diferencas: [
    { classe: "RENDA_FIXA", percentualAtual: 40, percentualDesejado: 50, diferenca: 10 },
    { classe: "ACOES", percentualAtual: 60, percentualDesejado: 50, diferenca: -10 },
  ],
  sugestaoAportes: [{ classe: "RENDA_FIXA", valorSugerido: 1000 }],
};

export class FakeRebalancingDispatcher implements IDispatcher {
  public queries: IQuery[] = [];

  constructor(private readonly options: FakeRebalancingDispatcherOptions = {}) {}

  async DispatchCommand<TDto>(_command: ICommand): Promise<TDto | ApplicationError> {
    throw new Error("FakeRebalancingDispatcher não suporta commands nesta Slice");
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    this.queries.push(query);
    if (query.type === "CalcularRebalanceamentoQuery") {
      if (this.options.rebalanceamento) {
        return this.options.rebalanceamento(query as CalcularRebalanceamentoQuery) as TDto;
      }
      return rebalanceamentoFake as unknown as TDto;
    }
    throw new Error(`Query não suportada no fake: ${query.type}`);
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
