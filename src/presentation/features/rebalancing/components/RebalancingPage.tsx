import { useMemo, useState } from "react";
import { useRebalancingQuery } from "../hooks/use-rebalancing-query";
import {
  toRebalancingViewModel,
  filterRebalancingDiffs,
  type RebalancingFiltersViewModel,
} from "../types/rebalancing.view-model";
import { AllocationChart } from "./AllocationChart";
import { AllocationComparison } from "./AllocationComparison";
import { SuggestedContribution } from "./SuggestedContribution";
import { RebalancingTable } from "./RebalancingTable";
import { RebalancingFilters } from "./RebalancingFilters";
import { RebalancingLoading } from "./RebalancingLoading";
import { RebalancingEmpty } from "./RebalancingEmpty";
import { RebalancingError } from "./RebalancingError";

interface RebalancingPageProps {
  portfolioId: string;
}

const FILTROS_INICIAIS: RebalancingFiltersViewModel = {
  tipo: "TODOS",
};

export function RebalancingPage({ portfolioId }: RebalancingPageProps) {
  const [filtros, setFiltros] = useState<RebalancingFiltersViewModel>(FILTROS_INICIAIS);
  const query = useRebalancingQuery(portfolioId);

  const viewModel = useMemo(
    () => (query.rebalanceamento ? toRebalancingViewModel(query.rebalanceamento) : null),
    [query.rebalanceamento],
  );

  const diffsVisiveis = useMemo(
    () => (viewModel ? filterRebalancingDiffs(viewModel.diferencas, filtros) : []),
    [viewModel, filtros],
  );

  return (
    <div data-testid="rebalancing-page" className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Rebalanceamento</h1>
        <p className="text-sm text-muted-foreground">
          Compare a alocação atual com a desejada e veja sugestões de aportes.
        </p>
      </div>

      {query.isLoading ? (
        <RebalancingLoading />
      ) : query.isError ? (
        <RebalancingError
          message={query.error?.message ?? "Falha ao calcular rebalanceamento."}
          onRetry={() => query.refetch()}
        />
      ) : !viewModel ? (
        <RebalancingEmpty />
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
            <AllocationChart alocacao={viewModel.alocacaoAtual} />
            <SuggestedContribution sugestoes={viewModel.sugestoes} />
          </div>
          <AllocationComparison
            atual={viewModel.alocacaoAtual}
            desejada={viewModel.alocacaoDesejada}
            diferencas={viewModel.diferencas}
          />
          <RebalancingFilters filtros={filtros} onChange={setFiltros} />
          <div className="rounded-xl border p-4">
            <RebalancingTable
              atual={viewModel.alocacaoAtual}
              desejada={viewModel.alocacaoDesejada}
              diferencas={diffsVisiveis}
            />
          </div>
        </>
      )}
    </div>
  );
}
