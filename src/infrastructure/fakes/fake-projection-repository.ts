import type {
  IProjectionRepository,
  PatrimonioProjection,
  PosicaoProjection,
  HistoricoProjection,
  ProventoProjection,
} from "@/application/ports";

export class FakeProjectionRepository implements IProjectionRepository {
  private patrimonios = new Map<string, PatrimonioProjection>();
  private posicoes = new Map<string, PosicaoProjection>();
  private historicos: HistoricoProjection[] = [];
  private proventos: ProventoProjection[] = [];

  async ObterPatrimonio(portfolioId: string): Promise<PatrimonioProjection | null> {
    return this.patrimonios.get(portfolioId) ?? null;
  }

  async ObterPosicao(portfolioId: string, assetId: string): Promise<PosicaoProjection | null> {
    const key = `${portfolioId}:${assetId}`;
    return this.posicoes.get(key) ?? null;
  }

  async ObterPosicoes(portfolioId: string): Promise<PosicaoProjection[]> {
    return Array.from(this.posicoes.values()).filter((p) => p.portfolioId === portfolioId);
  }

  async ObterHistorico(
    portfolioId: string,
    _periodo: { inicio: Date; fim: Date },
  ): Promise<HistoricoProjection[]> {
    return this.historicos.filter((h) => h.portfolioId === portfolioId);
  }

  async ObterProventos(
    portfolioId: string,
    filtro: { ano?: number; ticker?: string },
  ): Promise<ProventoProjection[]> {
    let results = this.proventos.filter((p) => p.portfolioId === portfolioId);
    if (filtro.ano !== undefined) {
      results = results.filter((p) => p.dataPagamento.getFullYear() === filtro.ano);
    }
    if (filtro.ticker !== undefined) {
      results = results.filter((p) => p.ticker === filtro.ticker);
    }
    return results;
  }

  setPatrimonio(portfolioId: string, patrimonio: PatrimonioProjection): void {
    this.patrimonios.set(portfolioId, patrimonio);
  }

  setPosicao(portfolioId: string, assetId: string, posicao: PosicaoProjection): void {
    this.posicoes.set(`${portfolioId}:${assetId}`, posicao);
  }

  setHistorico(historico: HistoricoProjection): void {
    this.historicos.push(historico);
  }

  setProvento(provento: ProventoProjection): void {
    this.proventos.push(provento);
  }

  reset(): void {
    this.patrimonios.clear();
    this.posicoes.clear();
    this.historicos = [];
    this.proventos = [];
  }
}
