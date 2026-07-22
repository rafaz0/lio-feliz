export const ONBOARDING_QUERY_KEYS = {
  all: ["onboarding"] as const,
  progress: (userId: string) => ["onboarding", "progress", userId] as const,
  passoAtual: (userId: string) => ["onboarding", "passo", userId] as const,
};
