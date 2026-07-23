export const CHECKOUT_QUERY_KEYS = {
  all: ["checkout"] as const,
  planos: () => ["checkout", "planos"] as const,
  ativa: (userId: string) => ["checkout", "assinatura", userId] as const,
};
