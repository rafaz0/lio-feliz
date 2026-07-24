import type { GoalViewModel } from "@/presentation/features/goals/types/goals.view-model";
import type { InsightViewModel } from "../types/intelligence.types";

export function generateMetasInsights(goals: GoalViewModel[]): InsightViewModel[] {
  const insights: InsightViewModel[] = [];

  if (goals.length === 0) {
    return insights;
  }

  const ativas = goals.filter((g) => g.status === "active" || g.status === "em_andamento");
  const concluidas = goals.filter((g) => g.status === "completed" || g.status === "concluida");

  if (concluidas.length > 0) {
    insights.push({
      id: "metas-concluidas",
      severity: "highlight",
      category: "meta",
      title: `${concluidas.length} meta${concluidas.length > 1 ? "s" : ""} atingida${concluidas.length > 1 ? "s" : ""}`,
      description: `${concluidas.length} de ${goals.length} meta${goals.length > 1 ? "s" : ""} cadastrada${goals.length > 1 ? "s" : ""} foi${concluidas.length === 1 ? " foi" : "ram"} atingida${concluidas.length === 1 ? "" : "s"}.`,
      value: `${((concluidas.length / goals.length) * 100).toFixed(0)}%`,
      trend: "up",
    });
  }

  if (ativas.length > 0) {
    const maisProxima = [...ativas].sort((a, b) => b.percentage - a.percentage)[0];
    insights.push({
      id: "meta-mais-proxima",
      severity: maisProxima.percentage >= 50 ? "highlight" : "attention",
      category: "meta",
      title: `Meta mais próxima: ${maisProxima.name}`,
      description: `${maisProxima.percentage.toFixed(1)}% concluída. Meta de ${maisProxima.targetAmount}.`,
      value: `${maisProxima.percentage.toFixed(0)}%`,
      trend: maisProxima.percentage >= 50 ? "up" : "down",
    });

    const comRisco = ativas.filter((g) => g.percentage < 25);
    if (comRisco.length > 0) {
      insights.push({
        id: "metas-atencao",
        severity: "attention",
        category: "meta",
        title: `${comRisco.length} meta${comRisco.length > 1 ? "s" : ""} abaixo de 25%`,
        description: `${comRisco.length} meta${comRisco.length > 1 ? "s" : ""} financeira${comRisco.length > 1 ? "s" : ""} está${comRisco.length === 1 ? "" : "o"} com menos de 25% de progresso.`,
        value: `${comRisco.length}`,
        trend: "down",
      });
    }
  }

  return insights;
}
