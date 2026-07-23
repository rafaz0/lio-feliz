export const ALERTS_QUERY_KEYS = {
  all: ["alerts"] as const,
  alerts: (userId: string) => ["alerts", "list", userId] as const,
  rules: (userId: string) => ["alerts", "rules", userId] as const,
};
