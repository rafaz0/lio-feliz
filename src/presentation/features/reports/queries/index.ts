export const REPORTS_QUERY_KEYS = {
  templates: () => ["report-templates"] as const,
  executions: (portfolioId: string) => ["report-executions", portfolioId] as const,
  execution: (executionId: string) => ["report-execution", executionId] as const,
  schedules: (portfolioId: string) => ["report-schedules", portfolioId] as const,
};
