import type { DividendsSummaryViewModel } from "../types/dividends.view-model";

interface DividendsSummaryProps {
  summary: DividendsSummaryViewModel | null;
}

export function DividendsSummary({ summary }: DividendsSummaryProps) {
  if (!summary) {
    return null;
  }

  return (
    <div data-testid="dividends-summary" className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <div className="rounded-xl border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Total no período</p>
        <p data-testid="summary-total-periodo" className="mt-1 text-lg font-semibold">
          {summary.totalPeriodo}
        </p>
      </div>
      <div className="rounded-xl border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Total acumulado</p>
        <p data-testid="summary-total-acumulado" className="mt-1 text-lg font-semibold">
          {summary.totalAcumulado}
        </p>
      </div>
      <div className="rounded-xl border p-4">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Eventos</p>
        <p data-testid="summary-quantidade" className="mt-1 text-lg font-semibold">
          {summary.quantidade}
        </p>
      </div>
    </div>
  );
}
