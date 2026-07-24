import { useMemo } from "react";
import type { DashboardViewModel } from "@/presentation/features/dashboard/types/dashboard.view-model";
import type { InsightViewModel } from "../types/intelligence.types";

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function generatePatrimonioInsights(dashboard: DashboardViewModel): InsightViewModel[] {
  const insights: InsightViewModel[] = [];

  const total = parseFloat(dashboard.patrimonioTotal.replace(/[^\d,.-]/g, "").replace(",", "."));
  const investido = parseFloat(
    dashboard.patrimonioInvestido.replace(/[^\d,.-]/g, "").replace(",", "."),
  );
  const disponivel = parseFloat(
    dashboard.saldoDisponivel.replace(/[^\d,.-]/g, "").replace(",", "."),
  );

  if (total > 0 && investido > 0) {
    const lucroPrejuizo = total - investido;
    insights.push({
      id: "patrimonio-resultado",
      severity: lucroPrejuizo >= 0 ? "highlight" : "attention",
      category: "patrimonio",
      title: lucroPrejuizo >= 0 ? "Resultado positivo" : "Resultado negativo",
      description:
        lucroPrejuizo >= 0
          ? "Patrimônio atual é superior ao total investido."
          : "Patrimônio atual é inferior ao total investido.",
      value: formatBRL(Math.abs(lucroPrejuizo)),
      trend: lucroPrejuizo >= 0 ? "up" : "down",
    });
  }

  if (investido > 0 && disponivel > 0) {
    const pctDisponivel = (disponivel / investido) * 100;
    insights.push({
      id: "patrimonio-disponivel",
      severity: pctDisponivel > 20 ? "info" : "info",
      category: "patrimonio",
      title: "Saldo disponível",
      description: `${pctDisponivel.toFixed(1)}% do valor investido está disponível como saldo.`,
      value: dashboard.saldoDisponivel,
      secondaryValue: `${pctDisponivel.toFixed(1)}% do investido`,
      trend: "neutral",
    });
  }

  return insights;
}

function generateAlocacaoInsights(dashboard: DashboardViewModel): InsightViewModel[] {
  const insights: InsightViewModel[] = [];

  if (dashboard.alocacao.length > 0) {
    const sorted = [...dashboard.alocacao].sort((a, b) => b.percentual - a.percentual);
    const maior = sorted[0];
    insights.push({
      id: "alocacao-maior",
      severity: "info",
      category: "patrimonio",
      title: "Maior participação",
      description: `${maior.classe} representa a maior parcela da carteira.`,
      value: `${maior.percentual.toFixed(1)}%`,
      secondaryValue: maior.valor,
      trend: "neutral",
    });

    if (sorted.length >= 2) {
      const menor = sorted[sorted.length - 1];
      insights.push({
        id: "alocacao-menor",
        severity: "info",
        category: "patrimonio",
        title: "Menor participação",
        description: `${menor.classe} representa a menor parcela da carteira.`,
        value: `${menor.percentual.toFixed(1)}%`,
        secondaryValue: menor.valor,
        trend: "neutral",
      });
    }
  }

  return insights;
}

function generateEvolucaoInsights(dashboard: DashboardViewModel): InsightViewModel[] {
  const insights: InsightViewModel[] = [];

  if (dashboard.evolucao.length >= 2) {
    const primeiro = dashboard.evolucao[0];
    const ultimo = dashboard.evolucao[dashboard.evolucao.length - 1];
    const variacao = ultimo.patrimonioTotal - primeiro.patrimonioTotal;
    const pctVariacao =
      primeiro.patrimonioTotal > 0 ? (variacao / primeiro.patrimonioTotal) * 100 : 0;

    insights.push({
      id: "evolucao-periodo",
      severity: variacao >= 0 ? "highlight" : "attention",
      category: "patrimonio",
      title: variacao >= 0 ? "Evolução patrimonial positiva" : "Evolução patrimonial negativa",
      description: `Patrimônio variou ${pctVariacao >= 0 ? "+" : ""}${pctVariacao.toFixed(1)}% no período analisado.`,
      value: formatBRL(Math.abs(variacao)),
      trend: variacao >= 0 ? "up" : "down",
    });
  }

  if (dashboard.evolucaoMensal) {
    const pct = parseFloat(dashboard.evolucaoMensal.replace("%", "").replace(",", "."));
    if (!isNaN(pct)) {
      insights.push({
        id: "evolucao-mensal",
        severity: pct >= 0 ? "info" : "attention",
        category: "rentabilidade",
        title: "Evolução mensal",
        description:
          pct >= 0
            ? "Patrimônio apresentou crescimento no último mês."
            : "Patrimônio apresentou redução no último mês.",
        value: dashboard.evolucaoMensal,
        trend: pct >= 0 ? "up" : "down",
      });
    }
  }

  return insights;
}

export function useDashboardInsights(dashboard: DashboardViewModel | null): InsightViewModel[] {
  return useMemo(() => {
    if (!dashboard) return [];
    return [
      ...generatePatrimonioInsights(dashboard),
      ...generateAlocacaoInsights(dashboard),
      ...generateEvolucaoInsights(dashboard),
    ];
  }, [dashboard]);
}
