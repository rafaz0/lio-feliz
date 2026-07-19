export const OPERATIONS_QUERY_KEYS = {
  list: (portfolioId: string) => ["operations", portfolioId] as const,
};
