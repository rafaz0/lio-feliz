import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { HistoricoPatrimonialDto } from "@/application/dtos/historico";
import type { RentabilidadeDto } from "@/application/dtos/rentabilidade";
import type { ObterHistoricoPatrimonialQuery } from "@/application/queries/obter-historico-patrimonial";
import type { ConsultarRentabilidadeQuery } from "@/application/queries/consultar-rentabilidade";

export interface FakeHistoryDispatcherOptions {
  historico?: (query: ObterHistoricoPatrimonialQuery) => HistoricoPatrimonialDto | ApplicationError;
  rentabilidade?: (query: ConsultarRentabilidadeQuery) => RentabilidadeDto | ApplicationError;
}

const historicoFake: HistoricoPatrimonialDto = {
  portfolioId: "p1",
  periodo: { inicio: new Date("2026-01-01"), fim: new Date("2026-06-01") },
  pontos: [
    {
      data: new Date("2026-01-01"),
      patrimonioTotal: 1000,
      patrimonioInvestido: 1000,
    },
    {
      data: new Date("2026-06-01"),
      patrimonioTotal: 1200,
      patrimonioInvestido: 1000,
    },
  ],
};

const rentabilidadeFake: RentabilidadeDto = {
  ativoId: "PORTFOLIO",
  periodo: { inicio: new Date("2026-01-01"), fim: new Date("2026-06-01") },
  valorizacao: 20,
  rentabilidadeTotal: 20,
  rentabilidadePeriodo: 20,
};

export class FakeHistoryDispatcher implements IDispatcher {
  public queries: IQuery[] = [];

  constructor(private readonly options: FakeHistoryDispatcherOptions = {}) {}

  async DispatchCommand<TDto>(_command: ICommand): Promise<TDto | ApplicationError> {
    throw new Error("FakeHistoryDispatcher não suporta commands nesta Slice");
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    this.queries.push(query);
    if (query.type === "ObterHistoricoPatrimonialQuery") {
      if (this.options.historico) {
        return this.options.historico(query as ObterHistoricoPatrimonialQuery) as TDto;
      }
      return historicoFake as unknown as TDto;
    }
    if (query.type === "ConsultarRentabilidadeQuery") {
      if (this.options.rentabilidade) {
        return this.options.rentabilidade(query as ConsultarRentabilidadeQuery) as TDto;
      }
      return rentabilidadeFake as unknown as TDto;
    }
    throw new Error(`Query não suportada no fake: ${query.type}`);
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
