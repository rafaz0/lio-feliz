import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { RendaFixaDto, CronogramaPagamentosDto } from "@/application/dtos/renda-fixa";

export interface FakeFixedIncomeDispatcherOptions {
  rendaFixa?: (query: IQuery) => RendaFixaDto[] | ApplicationError;
  cronograma?: (query: IQuery) => CronogramaPagamentosDto | ApplicationError;
  registrarCupom?: (command: ICommand) => RendaFixaDto | ApplicationError;
}

const fakeRendaFixa: RendaFixaDto[] = [
  {
    id: "rf-001",
    ticker: "CDB-XPTO",
    name: "CDB Banco X 120% CDI",
    institution: "Banco X",
    productType: "CDB",
    nominalValue: 1000,
    rate: 12.0,
    rateType: "POS",
    issueDate: new Date("2024-01-01"),
    maturityDate: new Date("2025-01-01"),
    projectedValue: 1120,
    totalReturnPercent: 12.0,
    totalJuros: 120,
    totalAmortizacao: 1000,
  },
];

const fakeCronograma: CronogramaPagamentosDto = {
  items: [
    {
      assetId: "rf-001",
      ticker: "CDB-XPTO",
      date: new Date("2025-01-01"),
      tipo: "JUROS",
      valor: 120,
    },
    {
      assetId: "rf-001",
      ticker: "CDB-XPTO",
      date: new Date("2025-01-01"),
      tipo: "AMORTIZACAO",
      valor: 1000,
    },
  ],
  totalJuros: 120,
  totalAmortizacao: 1000,
};

const fakeCriado: RendaFixaDto = {
  id: "rf-new",
  ticker: "TESOURO-IPCA",
  name: "Tesouro IPCA+ 2029",
  institution: "Tesouro Nacional",
  productType: "TESOURO_DIRETO",
  nominalValue: 1000,
  rate: 6.5,
  rateType: "POS",
  issueDate: new Date("2024-06-01"),
  maturityDate: new Date("2029-06-01"),
  projectedValue: 1375,
  totalReturnPercent: 37.5,
  totalJuros: 375,
  totalAmortizacao: 1000,
};

export class FakeFixedIncomeDispatcher implements IDispatcher {
  public commands: ICommand[] = [];
  public queries: IQuery[] = [];

  constructor(private readonly options: FakeFixedIncomeDispatcherOptions = {}) {}

  async DispatchCommand<TDto>(command: ICommand): Promise<TDto | ApplicationError> {
    this.commands.push(command);

    if (command.type === "RegistrarCupomCommand") {
      if (this.options.registrarCupom) {
        return this.options.registrarCupom(command) as TDto;
      }
      return fakeCriado as unknown as TDto;
    }

    throw new Error(`FakeFixedIncomeDispatcher: comando não suportado ${command.type}`);
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    this.queries.push(query);

    if (query.type === "ObterRendaFixaQuery") {
      if (this.options.rendaFixa) {
        return this.options.rendaFixa(query) as TDto;
      }
      return fakeRendaFixa as unknown as TDto;
    }

    if (query.type === "ObterCronogramaPagamentosQuery") {
      if (this.options.cronograma) {
        return this.options.cronograma(query) as TDto;
      }
      return fakeCronograma as unknown as TDto;
    }

    throw new Error(`FakeFixedIncomeDispatcher: query não suportada ${query.type}`);
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
