import { useMemo } from "react";
import { KpiCard } from "./KpiCard";
import { PatrimonioConsolidado } from "./PatrimonioConsolidado";
import { AlocacaoChart } from "./AlocacaoChart";
import { EvolucaoChart } from "./EvolucaoChart";
import { DashboardLoading } from "./DashboardLoading";
import { DashboardError } from "./DashboardError";
import { DashboardEmpty } from "./DashboardEmpty";
import { useDashboardQuery } from "../hooks/use-dashboard-query";
import { InsightCard, InsightSection } from "@/presentation/features/intelligence";
import { useDashboardInsights } from "@/presentation/features/intelligence/hooks/use-dashboard-insights";
import { useTimeRange, getCutoffDate, getTimeRangeById } from "@/presentation/shared/components/ui";
import type { NotFoundError } from "@/application/errors/application-error";

interface DashboardViewProps {
  portfolioId: string;
  viewModelOverride?: DashboardViewModel | null;
}

export function DashboardView({ portfolioId, viewModelOverride }: DashboardViewProps) {
  const {
    viewModel: queryViewModel,
    isLoading,
    isError,
    error,
    refetch,
  } = useDashboardQuery(portfolioId);
  const viewModel = viewModelOverride ?? queryViewModel;
  const insights = useDashboardInsights(viewModel);
  const { selected, setRange } = useTimeRange();

  const filteredEvolucao = useMemo(() => {
    if (!viewModel) return [];
    const cutoff = getCutoffDate(getTimeRangeById(selected));
    if (!cutoff) return viewModel.evolucao;
    return viewModel.evolucao.filter((p) => {
      const [d, m, y] = p.data.split("/").map(Number);
      const date = new Date(y, (m ?? 1) - 1, d ?? 1);
      return date >= cutoff;
    });
  }, [viewModel, selected]);

  if (isLoading) {
    return <DashboardLoading />;
  }

  const isNotFound =
    isError &&
    error &&
    "resourceType" in error &&
    (error as NotFoundError).resourceType === "Portfolio";

  if (isNotFound || (!isLoading && !viewModel && !isError)) {
    return <DashboardEmpty />;
  }

  if (isError || !viewModel) {
    return <DashboardError message={"Não foi possível carregar o dashboard."} onRetry={refetch} />;
  }

  const patrimonioInsights = insights.filter((i) => i.category === "patrimonio");
  const rentabilidadeInsights = insights.filter((i) => i.category === "rentabilidade");

  return (
    <section data-testid="dashboard-view" aria-label="Dashboard" className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {viewModel.kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      {insights.length > 0 && (
        <div className="space-y-3 rounded-xl border bg-card p-5">
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-primary" />
            <h3 className="text-sm font-semibold">Insights</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {patrimonioInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
            {rentabilidadeInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      )}

      <PatrimonioConsolidado viewModel={viewModel} />

      <div className="grid gap-5 lg:grid-cols-2">
        <AlocacaoChart alocacao={viewModel.alocacao} />
        <EvolucaoChart
          evolucao={filteredEvolucao}
          selectedRange={selected}
          onRangeChange={setRange}
        />
      </div>
    </section>
  );
}
