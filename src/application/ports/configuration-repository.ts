export interface EstrategiaConfiguracao {
  usuarioId: string;
  percentuais: Record<string, number>;
  moeda: string;
  toleranciaRebalanceamento: number;
}

export interface MetaFinanceira {
  metaId: string;
  usuarioId: string;
  nome: string;
  valorAlvo: number;
  prazo: Date;
}

export interface IConfigurationRepository {
  ObterEstrategia(usuarioId: string): Promise<EstrategiaConfiguracao | null>;
  SalvarEstrategia(usuarioId: string, config: EstrategiaConfiguracao): Promise<void>;
  ObterMetas(usuarioId: string): Promise<MetaFinanceira[]>;
  SalvarMetas(usuarioId: string, metas: MetaFinanceira[]): Promise<void>;
}
