export const COMPARISON_QUERY_KEYS = {
  all: ["comparison"] as const,
  set: (setId: string) => ["comparison", "set", setId] as const,
  userSets: (userId: string) => ["comparison", "user", userId] as const,
};
