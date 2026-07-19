export const SYNC_QUERY_KEYS = {
  historico: (usuarioId: string) => ["sync", "historico", usuarioId] as const,
};
