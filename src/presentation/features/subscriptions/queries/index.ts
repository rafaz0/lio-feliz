export const SUBSCRIPTION_QUERY_KEYS = {
  all: ["subscriptions"] as const,
  planos: () => ["subscriptions", "planos"] as const,
  ativa: (userId: string) => ["subscriptions", "ativa", userId] as const,
  acesso: (userId: string) => ["subscriptions", "acesso", userId] as const,
};
