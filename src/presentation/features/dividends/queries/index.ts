export const DIVIDENDS_QUERY_KEYS = {
  all: ["dividends"] as const,
  proventos: (portfolioId: string) => ["dividends", "proventos", portfolioId] as const,
};
