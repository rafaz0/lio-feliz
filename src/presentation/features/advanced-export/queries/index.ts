export const EXPORTS_QUERY_KEYS = {
  all: ["advanced-export"] as const,
  templates: () => ["advanced-export", "templates"] as const,
  jobs: (portfolioId: string) => ["advanced-export", "jobs", portfolioId] as const,
};
