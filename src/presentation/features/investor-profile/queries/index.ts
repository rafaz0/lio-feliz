export const PROFILE_QUERY_KEYS = {
  all: ["investor-profile"] as const,
  perfil: (userId: string) => ["investor-profile", "perfil", userId] as const,
  questionario: () => ["investor-profile", "questionario"] as const,
};
