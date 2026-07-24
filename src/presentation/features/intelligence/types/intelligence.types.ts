export type InsightSeverity = "info" | "attention" | "highlight";

export type InsightCategory =
  "proventos" | "patrimonio" | "rentabilidade" | "rebalanceamento" | "meta" | "cobertura" | "geral";

export interface InsightViewModel {
  readonly id: string;
  readonly severity: InsightSeverity;
  readonly category: InsightCategory;
  readonly title: string;
  readonly description: string;
  readonly value?: string;
  readonly secondaryValue?: string;
  readonly trend?: "up" | "down" | "neutral";
  readonly icon?: string;
}

export const SEVERITY_CONFIG = {
  info: {
    label: "Informativo",
    borderColor: "border-blue-200 dark:border-blue-800",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  attention: {
    label: "Atenção",
    borderColor: "border-amber-200 dark:border-amber-800",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  highlight: {
    label: "Destaque",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
} as const;
