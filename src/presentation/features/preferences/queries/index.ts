export const PREFERENCES_QUERY_KEYS = {
  all: ["preferences"] as const,
  prefs: (userId: string) => ["preferences", "prefs", userId] as const,
  theme: (userId: string) => ["preferences", "theme", userId] as const,
};
