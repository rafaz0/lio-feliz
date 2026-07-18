export interface PatrimonioProjection {
  portfolioId: string;
  patrimonioTotal: number;
  patrimonioInvestido: number;
  saldoDisponivel: number;
  moeda: string;
  dataReferencia: Date;
  alocacao: AlocacaoProjection[];
  evolucaoMensal: number;
}

export interface AlocacaoProjection {
  classe: string;
  valor: number;
  percentual: number;
}

export interface PosicaoProjection {
  portfolioId: string;
  assetId: string;
  ticker: string;
  nome: string;
  classe: string;
  quantidade: number;
  precoMedio: number;
  valorTotal: number;
  rentabilidade: RentabilidadeProjection;
}

export interface RentabilidadeProjection {
  valorizacao: number;
  rentabilidadeTotal: number;
  rentabilidadePeriodo: number;
}

export interface HistoricoProjection {
  portfolioId: string;
  data: Date;
  patrimonioTotal: number;
  patrimonioInvestido: number;
}

export interface ProventoProjection {
  portfolioId: string;
  assetId: string;
  ticker: string;
  tipo: string;
  valor: number;
  dataPagamento: Date;
  dataBase: Date;
}

export interface IProjectionRepository {
  ObterPatrimonio(portfolioId: string): Promise<PatrimonioProjection | null>;
  ObterPosicao(portfolioId: string, assetId: string): Promise<PosicaoProjection | null>;
  ObterPosicoes(portfolioId: string): Promise<PosicaoProjection[]>;
  ObterHistorico(
    portfolioId: string,
    periodo: { inicio: Date; fim: Date },
  ): Promise<HistoricoProjection[]>;
  ObterProventos(
    portfolioId: string,
    filtro: { ano?: number; ticker?: string },
  ): Promise<ProventoProjection[]>;
}
