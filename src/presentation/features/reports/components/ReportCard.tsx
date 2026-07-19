import type { ReportViewModel } from "../types/reports.view-model";

interface ReportCardProps {
  relatorio: ReportViewModel;
  onSelecionar: (relatorio: ReportViewModel) => void;
}

export function ReportCard({ relatorio, onSelecionar }: ReportCardProps) {
  return (
    <div data-testid="report-card" className="rounded border p-4">
      <h3 data-testid="report-card-title" className="text-sm font-medium">
        {relatorio.titulo}
      </h3>
      <p data-testid="report-card-desc" className="mt-1 text-xs text-muted-foreground">
        {relatorio.descricao}
      </p>
      <button
        type="button"
        data-testid="report-card-select"
        onClick={() => onSelecionar(relatorio)}
        className="mt-3 rounded bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
      >
        Selecionar
      </button>
    </div>
  );
}
