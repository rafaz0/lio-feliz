export const PORTFOLIO_QUERY_KEYS = {
  portfolio: (portfolioId: string) => ["portfolio", portfolioId] as const,
  summary: (portfolioId: string) => ["portfolio", "summary", portfolioId] as const,
  asset: (portfolioId: string, ativoId: string) =>
    ["portfolio", portfolioId, "asset", ativoId] as const,
};
