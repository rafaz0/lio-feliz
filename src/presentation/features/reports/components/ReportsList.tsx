import type { ReportViewModel } from "../types/reports.view-model";
import { ReportCard } from "./ReportCard";

interface ReportsListProps {
  relatorios: ReportViewModel[];
  onSelecionar: (relatorio: ReportViewModel) => void;
}

export function ReportsList({ relatorios, onSelecionar }: ReportsListProps) {
  if (relatorios.length === 0) {
    return <div data-testid="reports-list-empty">Nenhum relatório corresponde aos filtros.</div>;
  }

  return (
    <div data-testid="reports-list" className="grid gap-3">
      {relatorios.map((relatorio) => (
        <ReportCard key={relatorio.id} relatorio={relatorio} onSelecionar={onSelecionar} />
      ))}
    </div>
  );
}
