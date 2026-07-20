export const GOALS_QUERY_KEYS = {
  all: ["goals"] as const,
  metas: (portfolioId: string) => ["goals", "metas", portfolioId] as const,
  progresso: (goalId: string) => ["goals", "progresso", goalId] as const,
};
