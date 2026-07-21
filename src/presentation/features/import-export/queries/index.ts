export const IMPORT_EXPORT_QUERY_KEYS = {
  all: ["import-export"] as const,
  historico: (usuarioId: string) => ["import-export", "historico", usuarioId] as const,
  modelos: (portfolioId: string) => ["import-export", "modelos", portfolioId] as const,
};
