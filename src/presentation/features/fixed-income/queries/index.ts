export const FIXED_INCOME_QUERY_KEYS = {
  all: ["fixed-income"] as const,
  rendaFixa: (portfolioId: string) => ["fixed-income", "renda-fixa", portfolioId] as const,
  cronograma: (portfolioId: string) => ["fixed-income", "cronograma", portfolioId] as const,
};
