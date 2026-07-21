export const INTEGRATION_QUERY_KEYS = {
  all: ["integrations"] as const,
  list: () => ["integrations", "list"] as const,
  status: (integrationId: string) => ["integrations", "status", integrationId] as const,
};
