import type { IDispatcher } from "@/application/dispatcher";
import type { IQuery, ICommand } from "@/application/types";
import type { ApplicationError } from "@/application/errors";
import type { ConfiguracoesDto } from "@/application/dtos/configuracoes";
import type { EstrategiaConfiguradaDto } from "@/application/dtos/estrategia";
import type { ObterConfiguracoesQuery } from "@/application/queries/obter-configuracoes";
import type { ConfigurarEstrategiaCommand } from "@/application/commands/configurar-estrategia";

export interface FakeSettingsDispatcherOptions {
  configuracoes?: (query: ObterConfiguracoesQuery) => ConfiguracoesDto | ApplicationError;
  configurar?: (
    command: ConfigurarEstrategiaCommand,
  ) => EstrategiaConfiguradaDto | ApplicationError;
}

const configuracoesFake: ConfiguracoesDto = {
  usuarioId: "u1",
  estrategia: {
    usuarioId: "u1",
    percentuais: { ACOES: 50, RENDA_FIXA: 50 },
    moeda: "BRL",
    toleranciaRebalanceamento: 5,
    dataAtualizacao: new Date("2026-01-01"),
  },
  metas: [
    {
      nome: "Reserva de emergência",
      valorAlvo: 10000,
      valorAtual: 0,
      percentualConcluido: 0,
      prazo: new Date("2026-12-31"),
    },
  ],
};

export class FakeSettingsDispatcher implements IDispatcher {
  public queries: IQuery[] = [];
  public commands: ICommand[] = [];

  constructor(private readonly options: FakeSettingsDispatcherOptions = {}) {}

  async DispatchCommand<TDto>(command: ICommand): Promise<TDto | ApplicationError> {
    this.commands.push(command);
    if (command.type === "ConfigurarEstrategiaCommand") {
      if (this.options.configurar) {
        return this.options.configurar(command as ConfigurarEstrategiaCommand) as TDto;
      }
      const cmd = command as ConfigurarEstrategiaCommand;
      return {
        usuarioId: cmd.usuarioId,
        percentuais: cmd.percentuais,
        moeda: cmd.moeda,
        toleranciaRebalanceamento: cmd.toleranciaRebalanceamento,
        dataAtualizacao: new Date(),
      } as unknown as TDto;
    }
    throw new Error(`Command não suportado no fake: ${command.type}`);
  }

  async DispatchQuery<TDto>(query: IQuery): Promise<TDto | ApplicationError> {
    this.queries.push(query);
    if (query.type === "ObterConfiguracoesQuery") {
      if (this.options.configuracoes) {
        return this.options.configuracoes(query as ObterConfiguracoesQuery) as TDto;
      }
      return configuracoesFake as unknown as TDto;
    }
    throw new Error(`Query não suportada no fake: ${query.type}`);
  }

  RegisterCommand(): void {}
  RegisterQuery(): void {}
}
