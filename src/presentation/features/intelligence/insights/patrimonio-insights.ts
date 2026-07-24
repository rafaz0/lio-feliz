import type { DashboardViewModel } from "@/presentation/features/dashboard/types/dashboard.view-model";
import type { InsightViewModel } from "../types/intelligence.types";

function parseBRL(value: string): number {
  return parseFloat(value.replace(/[^\d,.-]/g, "").replace(",", ".")) || 0;
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function generatePatrimonioInsights(dashboard: DashboardViewModel): InsightViewModel[] {
  const insights: InsightViewModel[] = [];
  const total = parseBRL(dashboard.patrimonioTotal);
  const investido = parseBRL(dashboard.patrimonioInvestido);
  const disponivel = parseBRL(dashboard.saldoDisponivel);

  if (total > 0) {
    const pctInvestido = (investido / total) * 100;
    const pctDisponivel = (disponivel / total) * 100;

    insights.push({
      id: "pct-investido",
      severity: "info",
      category: "patrimonio",
      title: "Percentual investido",
      description: `${pctInvestido.toFixed(1)}% do patrimônio total está aplicado em ativos.`,
      value: `${pctInvestido.toFixed(1)}%`,
      trend: pctInvestido > 80 ? "up" : "neutral",
    });

    insights.push({
      id: "pct-disponivel",
      severity: "info",
      category: "patrimonio",
      title: "Percentual disponível",
      description: `${pctDisponivel.toFixed(1)}% do patrimônio está em saldo disponível.`,
      value: `${pctDisponivel.toFixed(1)}%`,
      trend: pctDisponivel > 20 ? "down" : "neutral",
    });
  }

  if (dashboard.alocacao.length > 0) {
    const sorted = [...dashboard.alocacao].sort((a, b) => b.percentual - a.percentual);
    const top3 = sorted.slice(0, 3);
    const concetracao = top3.reduce((s, a) => s + a.percentual, 0);

    insights.push({
      id: "diversificacao-top3",
      severity: concetracao > 70 ? "attention" : "highlight",
      category: "patrimonio",
      title: concetracao > 70 ? "Alta concentração" : "Diversificação adequada",
      description:
        concetracao > 70
          ? `As 3 maiores classes somam ${concetracao.toFixed(1)}% da carteira.`
          : `As 3 maiores classes somam ${concetracao.toFixed(1)}% da carteira.`,
      value: `${concetracao.toFixed(1)}%`,
      trend: concetracao > 70 ? "down" : "up",
    });
  }

  return insights;
}
