import type { IConfigurationRepository, EstrategiaConfiguracao, MetaFinanceira } from "@/application/ports";

export class FakeConfigurationRepository implements IConfigurationRepository {
  private estrategias = new Map<string, EstrategiaConfiguracao>();
  private metas = new Map<string, MetaFinanceira[]>();

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

  reset(): void {
    this.estrategias.clear();
    this.metas.clear();
  }
}
