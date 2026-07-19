import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { RelatorioFiscalDto } from "@/application/dtos/relatorio-fiscal";
import type { GerarRelatorioFiscalQuery } from "@/application/queries/gerar-relatorio-fiscal";

export interface FakeTaxDispatcherOptions {
  relatorio?: (query: GerarRelatorioFiscalQuery) => RelatorioFiscalDto | ApplicationError;
}

const relatorioFake: RelatorioFiscalDto = {
  ano: 2025,
  posicao31Dez: [
    { ticker: "PETR4", quantidade: 100, valorTotal: 3500 },
    { ticker: "ITUB4", quantidade: 50, valorTotal: 6500 },
  ],
  dividendosAno: 1200,
  jcpAno: 300,
  ganhoCapital: [
    { ticker: "VALE3", tipo: "VENDA", valorVenda: 8000, valorCompra: 7000, ganho: 1000 },
  ],
  prejuizoCompensar: 0,
};

export class FakeTaxDispatcher implements IDispatcher {
  public queries: IQuery[] = [];

  constructor(private readonly options: FakeTaxDispatcherOptions = {}) {}

  async DispatchCommand<TDto>(_command: ICommand): Promise<TDto | ApplicationError> {
    throw new Error("FakeTaxDispatcher não suporta commands nesta Slice");
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    this.queries.push(query);
    if (query.type === "GerarRelatorioFiscalQuery") {
      if (this.options.relatorio) {
        return this.options.relatorio(query as GerarRelatorioFiscalQuery) as TDto;
      }
      return relatorioFake as unknown as TDto;
    }
    throw new Error(`Query não suportada no fake: ${query.type}`);
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
