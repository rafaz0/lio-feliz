import { useMemo, useState } from "react";
import { useDividendsQuery } from "../hooks/use-dividends-query";
import {
  filterDividends,
  type DividendFiltersViewModel,
  type DividendViewModel,
} from "../types/dividends.view-model";
import { DividendsSummary } from "./DividendsSummary";
import { DividendFilters } from "./DividendFilters";
import { DividendsTable } from "./DividendsTable";
import { DividendDetails } from "./DividendDetails";
import { DividendsLoading } from "./DividendsLoading";
import { DividendsEmpty } from "./DividendsEmpty";
import { DividendsError } from "./DividendsError";

interface DividendsPageProps {
  portfolioId: string;
}

const FILTROS_INICIAIS: DividendFiltersViewModel = {
  termo: "",
  tipo: "TODOS",
  ano: "",
};

export function DividendsPage({ portfolioId }: DividendsPageProps) {
  const [filtros, setFiltros] = useState<DividendFiltersViewModel>(FILTROS_INICIAIS);
  const [selecionado, setSelecionado] = useState<DividendViewModel | null>(null);

  const { dividends, summary, isLoading, isError, error, refetch } = useDividendsQuery(portfolioId);

  const visiveis = useMemo(() => filterDividends(dividends, filtros), [dividends, filtros]);

  return (
    <div data-testid="dividends-page" className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Proventos</h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe dividendos e JCP recebidos pelo portfólio.
        </p>
      </div>

      {isLoading ? (
        <DividendsLoading />
      ) : isError ? (
        <DividendsError
          message={error?.message ?? "Falha ao carregar proventos."}
          onRetry={refetch}
        />
      ) : dividends.length === 0 ? (
        <DividendsEmpty />
      ) : (
        <>
          <DividendsSummary summary={summary} />
          <DividendFilters filtros={filtros} onFiltroChange={setFiltros} />
          <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
            <DividendsTable dividends={visiveis} onSelect={setSelecionado} />
            <DividendDetails dividend={selecionado} onClose={() => setSelecionado(null)} />
          </div>
        </>
      )}
    </div>
  );
}
