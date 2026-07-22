import type { IConfigurationRepository, EstrategiaConfiguracao, MetaFinanceira } from "@/application/ports";

export class FakeConfigurationRepository implements IConfigurationRepository {
  private estrategias = new Map<string, EstrategiaConfiguracao>();
  private metas = new Map<string, MetaFinanceira[]>();
  private onboardingProgress = new Map<string, string>();
  private preferences = new Map<string, string>();
  private themes = new Map<string, string>();
  private layouts = new Map<string, string>();

  async ObterEstrategia(usuarioId: string): Promise<EstrategiaConfiguracao | null> {
    return this.estrategias.get(usuarioId) ?? null;
  }

  async SalvarEstrategia(usuarioId: string, config: EstrategiaConfiguracao): Promise<void> {
    this.estrategias.set(usuarioId, config);
  }

  async ObterMetas(usuarioId: string): Promise<MetaFinanceira[]> {
    return this.metas.get(usuarioId) ?? [];
  }

  async SalvarMetas(usuarioId: string, metasList: MetaFinanceira[]): Promise<void> {
    this.metas.set(usuarioId, metasList);
  }

  async savePreferences(userId: string, prefs: string): Promise<void> { this.preferences.set(userId, prefs); }
  async findPreferences(userId: string): Promise<string | null> { return this.preferences.get(userId) ?? null; }
  async saveTheme(userId: string, theme: string): Promise<void> { this.themes.set(userId, theme); }
  async findTheme(userId: string): Promise<string | null> { return this.themes.get(userId) ?? null; }
  async saveDashboardLayout(userId: string, layout: string): Promise<void> { this.layouts.set(userId, layout); }
  async findDashboardLayout(userId: string): Promise<string | null> { return this.layouts.get(userId) ?? null; }

  async saveOnboardingProgress(userId: string, progress: string): Promise<void> {
    this.onboardingProgress.set(userId, progress);
  }

  async findOnboardingProgress(userId: string): Promise<string | null> {
    return this.onboardingProgress.get(userId) ?? null;
  }

  reset(): void {
    this.estrategias.clear();
    this.metas.clear();
    this.onboardingProgress.clear();
    this.preferences.clear();
    this.themes.clear();
    this.layouts.clear();
  }
}
