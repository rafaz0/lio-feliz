export const TAX_QUERY_KEYS = {
  all: ["tax"] as const,
  relatorio: (portfolioId: string, ano: number) => ["tax", portfolioId, ano] as const,
  declaracao: (portfolioId: string, ano: number) =>
    ["tax", "declaracao", portfolioId, ano] as const,
};
