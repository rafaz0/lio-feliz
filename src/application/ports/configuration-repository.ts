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

  saveOnboardingProgress(userId: string, progress: string): Promise<void>;
  findOnboardingProgress(userId: string): Promise<string | null>;

  savePreferences(userId: string, prefs: string): Promise<void>;
  findPreferences(userId: string): Promise<string | null>;
  saveTheme(userId: string, theme: string): Promise<void>;
  findTheme(userId: string): Promise<string | null>;
  saveDashboardLayout(userId: string, layout: string): Promise<void>;
  findDashboardLayout(userId: string): Promise<string | null>;
}
