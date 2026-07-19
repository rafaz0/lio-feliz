import type { TaxSummaryViewModel } from "../types/tax.view-model";
import { formatBRL } from "../types/tax.view-model";

interface TaxSummaryProps {
  summary: TaxSummaryViewModel;
}

export function TaxSummary({ summary }: TaxSummaryProps) {
  return (
    <div data-testid="tax-summary" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">Dividendos ({summary.ano})</p>
        <p data-testid="summary-dividendos" className="mt-1 text-lg font-semibold">
          {formatBRL(summary.totalDividendos)}
        </p>
      </div>
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">JCP ({summary.ano})</p>
        <p data-testid="summary-jcp" className="mt-1 text-lg font-semibold">
          {formatBRL(summary.totalJcp)}
        </p>
      </div>
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">Ganho de Capital</p>
        <p data-testid="summary-ganho" className="mt-1 text-lg font-semibold">
          {formatBRL(summary.totalGanhoCapital)}
        </p>
      </div>
      <div className="rounded-xl border p-4">
        <p className="text-sm text-muted-foreground">Prejuízo a compensar</p>
        <p data-testid="summary-prejuizo" className="mt-1 text-lg font-semibold">
          {formatBRL(summary.prejuizoCompensar)}
        </p>
      </div>
    </div>
  );
}
