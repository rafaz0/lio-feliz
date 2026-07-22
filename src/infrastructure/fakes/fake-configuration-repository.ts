import type { IConfigurationRepository, EstrategiaConfiguracao, MetaFinanceira } from "@/application/ports";

export class FakeConfigurationRepository implements IConfigurationRepository {
  private estrategias = new Map<string, EstrategiaConfiguracao>();
  private metas = new Map<string, MetaFinanceira[]>();
  private onboardingProgress = new Map<string, string>();

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
  }
}
