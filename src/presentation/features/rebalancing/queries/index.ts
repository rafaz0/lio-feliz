export const REBALANCING_QUERY_KEYS = {
  all: ["rebalancing"] as const,
  rebalanceamento: (portfolioId: string) => ["rebalancing", portfolioId] as const,
};
