import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  IProjectionRepository,
  PatrimonioProjection,
  PosicaoProjection,
  HistoricoProjection,
  ProventoProjection,
} from "@/application/ports";

type PatrimonioRow = {
  portfolio_id: string;
  patrimonio_total: number;
  patrimonio_investido: number;
  saldo_disponivel: number;
  moeda: string;
  data_referencia: string;
  alocacao: { classe: string; valor: number; percentual: number }[];
  evolucao_mensal: number;
};

type PosicaoRow = {
  portfolio_id: string;
  asset_id: string;
  ticker: string;
  nome: string;
  classe: string;
  quantidade: number;
  preco_medio: number;
  valor_total: number;
  valorizacao: number;
  rentabilidade_total: number;
  rentabilidade_periodo: number;
};

type HistoricoRow = {
  portfolio_id: string;
  data: string;
  patrimonio_total: number;
  patrimonio_investido: number;
};

type ProventoRow = {
  portfolio_id: string;
  asset_id: string;
  ticker: string;
  tipo: string;
  valor: number;
  data_pagamento: string;
  data_base: string;
};

export class SupabaseProjectionRepository implements IProjectionRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async ObterPatrimonio(portfolioId: string): Promise<PatrimonioProjection | null> {
    const { data, error } = await this.supabase
      .from("vw_patrimonio")
      .select("*")
      .eq("portfolio_id", portfolioId)
      .single();

    if (error || !data) {
      return null;
    }

    const row = data as unknown as PatrimonioRow;
    return {
      portfolioId: row.portfolio_id,
      patrimonioTotal: row.patrimonio_total,
      patrimonioInvestido: row.patrimonio_investido,
      saldoDisponivel: row.saldo_disponivel,
      moeda: row.moeda,
      dataReferencia: new Date(row.data_referencia),
      alocacao: row.alocacao,
      evolucaoMensal: row.evolucao_mensal,
    };
  }

  async ObterPosicao(portfolioId: string, assetId: string): Promise<PosicaoProjection | null> {
    const { data, error } = await this.supabase
      .from("vw_posicoes")
      .select("*")
      .eq("portfolio_id", portfolioId)
      .eq("asset_id", assetId)
      .single();

    if (error || !data) {
      return null;
    }

    return this.rowToPosicao(data as unknown as PosicaoRow);
  }

  async ObterPosicoes(portfolioId: string): Promise<PosicaoProjection[]> {
    const { data, error } = await this.supabase
      .from("vw_posicoes")
      .select("*")
      .eq("portfolio_id", portfolioId);

    if (error || !data) {
      return [];
    }

    return (data as unknown as PosicaoRow[]).map((row) => this.rowToPosicao(row));
  }

  async ObterHistorico(
    portfolioId: string,
    periodo: { inicio: Date; fim: Date },
  ): Promise<HistoricoProjection[]> {
    const { data, error } = await this.supabase
      .from("vw_historico")
      .select("*")
      .eq("portfolio_id", portfolioId)
      .gte("data", periodo.inicio.toISOString())
      .lte("data", periodo.fim.toISOString())
      .order("data", { ascending: true });

    if (error || !data) {
      return [];
    }

    return (data as unknown as HistoricoRow[]).map((row) => ({
      portfolioId: row.portfolio_id,
      data: new Date(row.data),
      patrimonioTotal: row.patrimonio_total,
      patrimonioInvestido: row.patrimonio_investido,
    }));
  }

  async ObterProventos(
    portfolioId: string,
    filtro: { ano?: number; ticker?: string },
  ): Promise<ProventoProjection[]> {
    let query = this.supabase
      .from("vw_proventos")
      .select("*")
      .eq("portfolio_id", portfolioId);

    if (filtro.ano !== undefined) {
      const inicio = new Date(filtro.ano, 0, 1).toISOString();
      const fim = new Date(filtro.ano, 11, 31).toISOString();
      query = query.gte("data_pagamento", inicio).lte("data_pagamento", fim);
    }

    if (filtro.ticker !== undefined) {
      query = query.eq("ticker", filtro.ticker);
    }

    const { data, error } = await query;

    if (error || !data) {
      return [];
    }

    return (data as unknown as ProventoRow[]).map((row) => ({
      portfolioId: row.portfolio_id,
      assetId: row.asset_id,
      ticker: row.ticker,
      tipo: row.tipo,
      valor: row.valor,
      dataPagamento: new Date(row.data_pagamento),
      dataBase: new Date(row.data_base),
    }));
  }

  private rowToPosicao(row: PosicaoRow): PosicaoProjection {
    return {
      portfolioId: row.portfolio_id,
      assetId: row.asset_id,
      ticker: row.ticker,
      nome: row.nome,
      classe: row.classe,
      quantidade: row.quantidade,
      precoMedio: row.preco_medio,
      valorTotal: row.valor_total,
      rentabilidade: {
        valorizacao: row.valorizacao,
        rentabilidadeTotal: row.rentabilidade_total,
        rentabilidadePeriodo: row.rentabilidade_periodo,
      },
    };
  }
}
