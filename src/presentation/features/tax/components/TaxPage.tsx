import { useMemo, useState } from "react";
import { useTaxReportQuery } from "../hooks/use-tax-report-query";
import {
  toTaxReportViewModel,
  toTaxSummaryViewModel,
  filterTaxEntries,
  type TaxFiltersViewModel,
} from "../types/tax.view-model";
import { TaxSummary } from "./TaxSummary";
import { TaxReportCard } from "./TaxReportCard";
import { TaxYearSelector } from "./TaxYearSelector";
import { TaxFilters } from "./TaxFilters";
import { TaxTable } from "./TaxTable";
import { TaxExportPanel } from "./TaxExportPanel";
import { TaxLoading } from "./TaxLoading";
import { TaxEmpty } from "./TaxEmpty";
import { TaxError } from "./TaxError";

interface TaxPageProps {
  portfolioId: string;
}

const ANO_ATUAL = new Date().getFullYear();
const ANOS_DISPONIVEIS = [ANO_ATUAL, ANO_ATUAL - 1, ANO_ATUAL - 2];

export function TaxPage({ portfolioId }: TaxPageProps) {
  const [ano, setAno] = useState<number>(ANO_ATUAL);
  const [filtros, setFiltros] = useState<TaxFiltersViewModel>({ ano: ANO_ATUAL, tipo: "TODOS" });
  const query = useTaxReportQuery(portfolioId, ano);

  const report = useMemo(
    () => (query.relatorio ? toTaxReportViewModel(query.relatorio) : null),
    [query.relatorio],
  );
  const summary = useMemo(() => (report ? toTaxSummaryViewModel(report) : null), [report]);
  const entries = useMemo(
    () => (report ? filterTaxEntries(report, { ...filtros, ano }) : []),
    [report, filtros, ano],
  );

  function handleAnoChange(novoAno: number) {
    setAno(novoAno);
    setFiltros((prev) => ({ ...prev, ano: novoAno }));
  }

  return (
    <div data-testid="tax-page" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Gestão Fiscal (IR)</h1>
          <p className="text-sm text-muted-foreground">
            Relatório fiscal do portfólio por ano-calendário.
          </p>
        </div>
        <TaxYearSelector ano={ano} anos={ANOS_DISPONIVEIS} onChange={handleAnoChange} />
      </div>

      {query.isLoading ? (
        <TaxLoading />
      ) : query.isError ? (
        <TaxError
          message={query.error?.message ?? "Falha ao gerar relatório fiscal."}
          onRetry={() => query.refetch()}
        />
      ) : !report || !summary ? (
        <TaxEmpty />
      ) : (
        <>
          <TaxSummary summary={summary} />
          <TaxReportCard report={report} />
          <TaxFilters filtros={filtros} onChange={setFiltros} />
          <div className="rounded-xl border p-4">
            <TaxTable entries={entries} />
          </div>
          <TaxExportPanel
            ano={ano}
            onExport={() => {
              /* exportação delegada à Application Layer via download do relatório */
            }}
          />
        </>
      )}
    </div>
  );
}
