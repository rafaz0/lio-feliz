import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { RelatorioFiscalDto } from "@/application/dtos/relatorio-fiscal";
import type { GerarRelatorioFiscalQuery } from "@/application/queries/gerar-relatorio-fiscal";
import type { ObterDeclaracaoQuery } from "@/application/queries/obter-declaracao";
import type { ExportarDeclaracaoCommand } from "@/application/commands/exportar-declaracao";
import type { DeclaracaoDto } from "@/application/dtos/declaracao";

export interface FakeTaxDispatcherOptions {
  relatorio?: (query: GerarRelatorioFiscalQuery) => RelatorioFiscalDto | ApplicationError;
  declaracao?: (query: ObterDeclaracaoQuery) => DeclaracaoDto | ApplicationError;
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

const declaracaoFake: DeclaracaoDto = {
  ano: 2025,
  operacoes: [
    { mes: "2025-01", totalVendas: 10000, totalCompras: 8000, ganhoLiquido: 2000, impostoDevido: 300, prejuizoCompensar: 0, operacaoDayTrade: false },
  ],
  lotes: [
    { ticker: "PETR4", quantidade: 100, custoMedio: 28.50, valorTotal: 2850, dataAquisicao: "2025-01-15" },
  ],
  consolidado: { totalOperacoes: 10, totalVendas: 10000, totalCompras: 8000, ganhoLiquido: 2000, impostoDevido: 300, impostoPago: 100, prejuizoCompensarSwing: 0, prejuizoCompensarDayTrade: 0 },
  prejuizoCompensarSwing: 0,
  prejuizoCompensarDayTrade: 0,
};

export class FakeTaxDispatcher implements IDispatcher {
  public queries: IQuery[] = [];
  public commands: ICommand[] = [];

  constructor(private readonly options: FakeTaxDispatcherOptions = {}) {}

  async DispatchCommand<TDto>(command: ICommand): Promise<TDto | ApplicationError> {
    this.commands.push(command);
    if (command.type === "ExportarDeclaracaoCommand") {
      return { nomeArquivo: "declaracao_2025.csv", conteudo: "ticker,quantidade,valor" } as unknown as TDto;
    }
    throw new Error(`Command não suportado no fake: ${command.type}`);
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    this.queries.push(query);
    if (query.type === "GerarRelatorioFiscalQuery") {
      if (this.options.relatorio) {
        return this.options.relatorio(query as GerarRelatorioFiscalQuery) as TDto;
      }
      return relatorioFake as unknown as TDto;
    }
    if (query.type === "ObterDeclaracaoQuery") {
      if (this.options.declaracao) {
        return this.options.declaracao(query as ObterDeclaracaoQuery) as TDto;
      }
      return declaracaoFake as unknown as TDto;
    }
    throw new Error(`Query não suportada no fake: ${query.type}`);
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
