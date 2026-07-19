export const REPORTS_QUERY_KEYS = {
  catalogo: ["reports", "catalogo"] as const,
  exportacao: (portfolioId: string, formato: string) =>
    ["reports", "exportacao", portfolioId, formato] as const,
};
