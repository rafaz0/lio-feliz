import type { AlocacaoItemViewModel } from "@/presentation/features/dashboard/types/dashboard.view-model";
import type { InsightViewModel } from "../types/intelligence.types";

export function generateRebalanceamentoInsights(
  alocacaoAtual: AlocacaoItemViewModel[],
): InsightViewModel[] {
  const insights: InsightViewModel[] = [];

  if (alocacaoAtual.length === 0) {
    return insights;
  }

  const total = alocacaoAtual.reduce((s, a) => s + a.percentual, 0);

  if (total > 0) {
    const media = total / alocacaoAtual.length;
    const acimaMedia = alocacaoAtual.filter((a) => a.percentual > media * 1.5);
    const abaixoMedia = alocacaoAtual.filter((a) => a.percentual < media * 0.5 && a.percentual > 0);

    if (acimaMedia.length > 0) {
      insights.push({
        id: "rebalanceamento-acima",
        severity: "attention",
        category: "rebalanceamento",
        title: "Classes acima da média",
        description: `${acimaMedia.map((a) => `${a.classe} (${a.percentual.toFixed(1)}%)`).join(", ")} ${acimaMedia.length === 1 ? "está" : "estão"} acima da distribuição média.`,
        trend: "neutral",
      });
    }

    if (abaixoMedia.length > 0) {
      insights.push({
        id: "rebalanceamento-abaixo",
        severity: "info",
        category: "rebalanceamento",
        title: "Classes abaixo da média",
        description: `${abaixoMedia.map((a) => `${a.classe} (${a.percentual.toFixed(1)}%)`).join(", ")} ${abaixoMedia.length === 1 ? "está" : "estão"} abaixo da distribuição média.`,
        trend: "neutral",
      });
    }
  }

  return insights;
}
