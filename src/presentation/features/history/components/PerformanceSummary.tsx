import type { PerformanceSummaryViewModel } from "../types/history.view-model";

interface PerformanceSummaryProps {
  summary: PerformanceSummaryViewModel | null;
}

export function PerformanceSummary({ summary }: PerformanceSummaryProps) {
  if (!summary) {
    return null;
  }

  return (
    <div data-testid="performance-summary" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="rounded-xl border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Valorização</p>
        <p data-testid="summary-valorizacao" className="mt-1 text-lg font-semibold">
          {summary.valorizacao}
        </p>
      </div>
      <div className="rounded-xl border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Rent. total</p>
        <p data-testid="summary-rent-total" className="mt-1 text-lg font-semibold">
          {summary.rentabilidadeTotal}
        </p>
      </div>
      <div className="rounded-xl border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Rent. período</p>
        <p data-testid="summary-rent-periodo" className="mt-1 text-lg font-semibold">
          {summary.rentabilidadePeriodo}
        </p>
      </div>
      <div className="rounded-xl border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Var. patrimônio</p>
        <p data-testid="summary-variacao" className="mt-1 text-lg font-semibold">
          {summary.variacaoPatrimonio}
        </p>
      </div>
    </div>
  );
}
