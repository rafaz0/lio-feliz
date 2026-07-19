import { KpiCard } from "./KpiCard";
import { PatrimonioConsolidado } from "./PatrimonioConsolidado";
import { AlocacaoChart } from "./AlocacaoChart";
import { EvolucaoChart } from "./EvolucaoChart";
import { DashboardLoading } from "./DashboardLoading";
import { DashboardError } from "./DashboardError";
import { useDashboardQuery } from "../hooks/use-dashboard-query";

interface DashboardViewProps {
  portfolioId: string;
}

export function DashboardView({ portfolioId }: DashboardViewProps) {
  const { viewModel, isLoading, isError, error, refetch } = useDashboardQuery(portfolioId);

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError || !viewModel) {
    return (
      <DashboardError
        message={error?.message ?? "Não foi possível carregar o dashboard."}
        onRetry={refetch}
      />
    );
  }

  return (
    <section data-testid="dashboard-view" aria-label="Dashboard" className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {viewModel.kpis.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </div>

      <PatrimonioConsolidado viewModel={viewModel} />

      <div className="grid gap-4 lg:grid-cols-2">
        <AlocacaoChart alocacao={viewModel.alocacao} />
        <EvolucaoChart evolucao={viewModel.evolucao} />
      </div>
    </section>
  );
}
