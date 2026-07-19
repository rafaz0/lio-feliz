export const SETTINGS_QUERY_KEYS = {
  all: ["settings"] as const,
  configuracoes: (usuarioId: string) => ["settings", usuarioId] as const,
};
