export const EDUCATION_QUERY_KEYS = {
  all: ["education"] as const,
  term: (term: string) => ["education", "term", term] as const,
  search: (query: string) => ["education", "search", query] as const,
};
