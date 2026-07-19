export const QUERY_KEYS = {
  PATRIMONIO: ["patrimonio"] as const,
  POSITIONS: (portfolioId: string) => ["positions", portfolioId] as const,
  PROVENTOS: (portfolioId: string) => ["dividendos", portfolioId] as const,
  REBALANCEAMENTO: (portfolioId: string) => ["rebalanceamento", portfolioId] as const,
  HISTORICO: (portfolioId: string) => ["historico", portfolioId] as const,
  RENTABILIDADE: (portfolioId: string) => ["rentabilidade", portfolioId] as const,
  RELATORIO_FISCAL: (portfolioId: string, ano: number) =>
    ["relatorio-fiscal", portfolioId, ano] as const,
  METAS: (usuarioId: string) => ["metas", usuarioId] as const,
  DASHBOARD: ["dashboard"] as const,
};
