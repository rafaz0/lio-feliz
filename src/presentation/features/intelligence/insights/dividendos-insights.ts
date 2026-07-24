import type {
  DividendViewModel,
  DividendsSummaryViewModel,
} from "@/presentation/features/dividends/types/dividends.view-model";
import type { InsightViewModel } from "../types/intelligence.types";

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function generateDividendosInsights(
  dividends: DividendViewModel[],
  summary: DividendsSummaryViewModel | null,
): InsightViewModel[] {
  const insights: InsightViewModel[] = [];

  if (!summary || dividends.length === 0) {
    return insights;
  }

  const tickersPagos = new Set(dividends.map((d) => d.ticker)).size;
  const dividendosMes = summary.totalPeriodo;

  insights.push({
    id: "dividendos-periodo",
    severity: dividendosMes > 0 ? "highlight" : "info",
    category: "proventos",
    title: dividendosMes > 0 ? "Proventos recebidos" : "Nenhum provento no período",
    description:
      dividendosMes > 0
        ? `Total de ${formatBRL(dividendosMes)} em proventos recebidos no período.`
        : "Nenhum provento recebido no período selecionado.",
    value: formatBRL(dividendosMes),
    trend: dividendosMes > 0 ? "up" : "neutral",
  });

  insights.push({
    id: "dividendos-tickers",
    severity: "info",
    category: "proventos",
    title: "Ativos pagadores",
    description: `${tickersPagos} ativos diferentes distribuíram proventos no período.`,
    value: String(tickersPagos),
    trend: "neutral",
  });

  if (summary.totalAcumulado > 0) {
    insights.push({
      id: "dividendos-acumulado",
      severity: "highlight",
      category: "proventos",
      title: "Proventos acumulados",
      description: "Total acumulado de proventos recebidos desde o início.",
      value: formatBRL(summary.totalAcumulado),
      trend: "up",
    });
  }

  return insights;
}
