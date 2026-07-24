import { useMemo } from "react";
import type { DashboardViewModel } from "@/presentation/features/dashboard/types/dashboard.view-model";
import type {
  DividendViewModel,
  DividendsSummaryViewModel,
} from "@/presentation/features/dividends/types/dividends.view-model";
import type { GoalViewModel } from "@/presentation/features/goals/types/goals.view-model";
import type { InsightViewModel } from "../types/intelligence.types";
import { generatePatrimonioInsights } from "../insights/patrimonio-insights";
import { generateDividendosInsights } from "../insights/dividendos-insights";
import { generateMetasInsights } from "../insights/metas-insights";
import { generateRebalanceamentoInsights } from "../insights/rebalanceamento-insights";

export interface AllInsightsInput {
  dashboard: DashboardViewModel | null;
  dividends?: DividendViewModel[];
  dividendsSummary?: DividendsSummaryViewModel | null;
  goals?: GoalViewModel[];
}

export function useAllInsights(input: AllInsightsInput): InsightViewModel[] {
  return useMemo(() => {
    const insights: InsightViewModel[] = [];

    if (input.dashboard) {
      insights.push(...generatePatrimonioInsights(input.dashboard));
      insights.push(...generateRebalanceamentoInsights(input.dashboard.alocacao));
    }

    if (input.dividends && input.dividendsSummary) {
      insights.push(...generateDividendosInsights(input.dividends, input.dividendsSummary));
    }

    if (input.goals && input.goals.length > 0) {
      insights.push(...generateMetasInsights(input.goals));
    }

    return insights;
  }, [input.dashboard, input.dividends, input.dividendsSummary, input.goals]);
}
