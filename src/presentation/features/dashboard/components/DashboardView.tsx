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
import type { NotFoundError } from "@/application/errors/application-error";

interface DashboardViewProps {
  portfolioId: string;
}

export function DashboardView({ portfolioId }: DashboardViewProps) {
  const { viewModel, isLoading, isError, error, refetch } = useDashboardQuery(portfolioId);
  const insights = useDashboardInsights(viewModel);

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
    <section data-testid="dashboard-view" aria-label="Dashboard" className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {viewModel.kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      {insights.length > 0 && (
        <div className="space-y-3 rounded-lg border border-border bg-card p-4">
          <h3 className="text-sm font-semibold text-foreground">Insights</h3>
          <div className="grid gap-2 md:grid-cols-2">
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

      <div className="grid gap-4 lg:grid-cols-2">
        <AlocacaoChart alocacao={viewModel.alocacao} />
        <EvolucaoChart evolucao={viewModel.evolucao} />
      </div>
    </section>
  );
}
