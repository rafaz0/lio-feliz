export const TAX_QUERY_KEYS = {
  all: ["tax"] as const,
  relatorio: (portfolioId: string, ano: number) => ["tax", portfolioId, ano] as const,
};
