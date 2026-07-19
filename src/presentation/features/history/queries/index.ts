export const HISTORY_QUERY_KEYS = {
  all: ["history"] as const,
  historico: (portfolioId: string) => ["history", "patrimonial", portfolioId] as const,
  rentabilidade: (portfolioId: string) => ["history", "rentabilidade", portfolioId] as const,
};
