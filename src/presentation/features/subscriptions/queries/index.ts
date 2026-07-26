export const SUBSCRIPTION_QUERY_KEYS = {
  all: ["subscriptions"] as const,
  planos: () => ["subscriptions", "planos"] as const,
  ativa: (userId: string) => ["subscriptions", "ativa", userId] as const,
  acesso: (userId: string) => ["subscriptions", "acesso", userId] as const,
  comparacao: () => ["subscriptions", "comparacao"] as const,
  historico: (userId: string) => ["subscriptions", "historico", userId] as const,
  eventos: (userId: string) => ["subscriptions", "eventos", userId] as const,
};
