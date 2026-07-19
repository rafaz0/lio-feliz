import type { TaxReportViewModel } from "../types/tax.view-model";
import { formatBRL } from "../types/tax.view-model";

interface TaxReportCardProps {
  report: TaxReportViewModel;
}

export function TaxReportCard({ report }: TaxReportCardProps) {
  return (
    <div data-testid="tax-report-card" className="rounded-xl border p-4">
      <h3 className="text-sm font-medium">Resumo do relatório — {report.ano}</h3>
      <dl className="mt-2 space-y-1 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Posições em 31/12</dt>
          <dd data-testid="report-posicoes">{report.posicao31Dez.length}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Dividendos</dt>
          <dd data-testid="report-dividendos">{formatBRL(report.dividendosAno)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">JCP</dt>
          <dd data-testid="report-jcp">{formatBRL(report.jcpAno)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Prejuízo a compensar</dt>
          <dd data-testid="report-prejuizo">{formatBRL(report.prejuizoCompensar)}</dd>
        </div>
      </dl>
    </div>
  );
}
