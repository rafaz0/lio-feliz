import { useMemo, useState } from "react";
import { useHistoricoQuery } from "../hooks/use-historico-query";
import { useRentabilidadeQuery } from "../hooks/use-rentabilidade-query";
import {
  filterHistoryPoints,
  toPerformanceSummaryViewModel,
  toPerformancePoints,
  toBenchmarkViewModel,
  type HistoryFiltersViewModel,
} from "../types/history.view-model";
import { PerformanceSummary } from "./PerformanceSummary";
import { PerformanceChart } from "./PerformanceChart";
import { BenchmarkComparison } from "./BenchmarkComparison";
import { HistoryFilters } from "./HistoryFilters";
import { HistoryTable } from "./HistoryTable";
import { HistoryLoading } from "./HistoryLoading";
import { HistoryEmpty } from "./HistoryEmpty";
import { HistoryError } from "./HistoryError";

interface HistoryPageProps {
  portfolioId: string;
}

const FILTROS_INICIAIS: HistoryFiltersViewModel = {
  termo: "",
  tipo: "TODOS",
};

export function HistoryPage({ portfolioId }: HistoryPageProps) {
  const [filtros, setFiltros] = useState<HistoryFiltersViewModel>(FILTROS_INICIAIS);

  const historicoQuery = useHistoricoQuery(portfolioId);
  const rentabilidadeQuery = useRentabilidadeQuery(portfolioId);

  const isLoading = historicoQuery.isLoading || rentabilidadeQuery.isLoading;
  const isError = historicoQuery.isError || rentabilidadeQuery.isError;
  const error = historicoQuery.error ?? rentabilidadeQuery.error;

  const pontos = useMemo(
    () => (historicoQuery.historico ? toPerformancePoints(historicoQuery.historico) : []),
    [historicoQuery.historico],
  );
  const visiveis = useMemo(() => filterHistoryPoints(pontos, filtros), [pontos, filtros]);

  const summary = useMemo(
    () => toPerformanceSummaryViewModel(historicoQuery.historico, rentabilidadeQuery.rentabilidade),
    [historicoQuery.historico, rentabilidadeQuery.rentabilidade],
  );
  const benchmarks = useMemo(
    () => toBenchmarkViewModel(rentabilidadeQuery.rentabilidade),
    [rentabilidadeQuery.rentabilidade],
  );

  return (
    <div data-testid="history-page" className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Histórico e Rentabilidade</h1>
        <p className="text-sm text-muted-foreground">
          Evolução patrimonial e rentabilidade do portfólio.
        </p>
      </div>

      {isLoading ? (
        <HistoryLoading />
      ) : isError ? (
        <HistoryError
          message={error?.message ?? "Falha ao carregar histórico."}
          onRetry={() => {
            historicoQuery.refetch();
            rentabilidadeQuery.refetch();
          }}
        />
      ) : pontos.length === 0 ? (
        <HistoryEmpty />
      ) : (
        <>
          <PerformanceSummary summary={summary} />
          <PerformanceChart pontos={visiveis} />
          <HistoryFilters filtros={filtros} onFiltroChange={setFiltros} />
          <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
            <HistoryTable pontos={visiveis} />
            <BenchmarkComparison benchmarks={benchmarks} />
          </div>
        </>
      )}
    </div>
  );
}
