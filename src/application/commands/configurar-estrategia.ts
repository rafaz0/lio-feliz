export interface ConfigurarEstrategiaCommand {
  readonly type: "ConfigurarEstrategiaCommand";
  readonly usuarioId: string;
  readonly percentuais: Record<string, number>;
  readonly moeda: string;
  readonly toleranciaRebalanceamento: number;
  readonly metas?: MetaCommand[];
}

export interface MetaCommand {
  readonly nome: string;
  readonly valorAlvo: number;
  readonly prazo: Date;
}
