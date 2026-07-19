interface ReportFiltersProps {
  termo: string;
  onTermoChange: (termo: string) => void;
}

export function ReportFilters({ termo, onTermoChange }: ReportFiltersProps) {
  return (
    <div data-testid="report-filters" role="group" aria-label="Filtros de relatórios">
      <label htmlFor="report-termo" className="sr-only">
        Buscar relatório
      </label>
      <input
        id="report-termo"
        data-testid="report-filter-termo"
        type="search"
        value={termo}
        onChange={(e) => onTermoChange(e.target.value)}
        placeholder="Buscar relatório"
        aria-label="Buscar relatório"
        className="w-full rounded border bg-background px-3 py-2 text-sm"
      />
    </div>
  );
}
