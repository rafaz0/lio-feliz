export const DASHBOARD_QUERY_KEYS = {
  patrimonio: (portfolioId: string) => ["patrimonio", portfolioId] as const,
  historico: (portfolioId: string) => ["historico-patrimonial", portfolioId] as const,
  dashboard: (portfolioId: string) => ["dashboard", portfolioId] as const,
};
