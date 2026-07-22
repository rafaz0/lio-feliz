export const INTERNATIONAL_QUERY_KEYS = {
  all: ["international"] as const,
  ativos: (portfolioId: string) => ["international", "ativos", portfolioId] as const,
  taxaCambio: (ticker: string) => ["international", "taxa", ticker] as const,
};
