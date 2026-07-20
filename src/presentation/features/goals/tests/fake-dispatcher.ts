import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { MetaListDto } from "@/application/dtos/metas";

export interface FakeGoalsDispatcherOptions {
  metas?: (query: IQuery) => MetaListDto[] | ApplicationError;
  criarMeta?: (command: ICommand) => MetaListDto | ApplicationError;
  atualizarMeta?: (command: ICommand) => MetaListDto | ApplicationError;
}

const fakeMetas: MetaListDto[] = [
  {
    id: "g1",
    name: "Reserva de Emergência",
    targetAmount: 120000,
    currentAmount: 50000,
    percentage: 41.67,
    targetDate: new Date("2027-01-01"),
    category: "EMERGENCY",
    status: "ACTIVE",
  },
  {
    id: "g2",
    name: "Viagem Internacional",
    targetAmount: 25000,
    currentAmount: 10000,
    percentage: 40,
    targetDate: new Date("2026-12-01"),
    category: "TRAVEL",
    status: "ACTIVE",
  },
  {
    id: "g3",
    name: "Aposentadoria",
    targetAmount: 1000000,
    currentAmount: 0,
    percentage: 0,
    targetDate: new Date("2045-01-01"),
    category: "RETIREMENT",
    status: "ACTIVE",
  },
];

const fakeMetaCriada: MetaListDto = {
  id: "g4",
  name: "Nova Meta",
  targetAmount: 50000,
  currentAmount: 0,
  percentage: 0,
  targetDate: new Date("2028-06-01"),
  category: "EDUCATION",
  status: "ACTIVE",
};

const fakeMetaAtualizada: MetaListDto = {
  id: "g1",
  name: "Reserva de Emergência (Atualizada)",
  targetAmount: 150000,
  currentAmount: 50000,
  percentage: 33.33,
  targetDate: new Date("2027-06-01"),
  category: "EMERGENCY",
  status: "ACTIVE",
};

export class FakeGoalsDispatcher implements IDispatcher {
  public commands: ICommand[] = [];
  public queries: IQuery[] = [];

  constructor(private readonly options: FakeGoalsDispatcherOptions = {}) {}

  async DispatchCommand<TDto>(command: ICommand): Promise<TDto | ApplicationError> {
    this.commands.push(command);

    if (command.type === "CriarMetaCommand") {
      if (this.options.criarMeta) {
        return this.options.criarMeta(command) as TDto;
      }
      return fakeMetaCriada as unknown as TDto;
    }

    if (command.type === "AtualizarMetaCommand") {
      if (this.options.atualizarMeta) {
        return this.options.atualizarMeta(command) as TDto;
      }
      return fakeMetaAtualizada as unknown as TDto;
    }

    throw new Error(`FakeGoalsDispatcher: comando não suportado ${command.type}`);
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    this.queries.push(query);

    if (query.type === "ObterMetasQuery") {
      if (this.options.metas) {
        return this.options.metas(query) as TDto;
      }
      return fakeMetas as unknown as TDto;
    }

    throw new Error(`FakeGoalsDispatcher: query não suportada ${query.type}`);
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
