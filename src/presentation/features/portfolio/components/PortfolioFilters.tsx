interface PortfolioFiltersProps {
  filtro: string;
  onFiltroChange: (value: string) => void;
  classes: string[];
  classeSelecionada: string | null;
  onClasseChange: (classe: string | null) => void;
}

export function PortfolioFilters({
  filtro,
  onFiltroChange,
  classes,
  classeSelecionada,
  onClasseChange,
}: PortfolioFiltersProps) {
  return (
    <div
      data-testid="portfolio-filters"
      className="flex flex-wrap items-center gap-2 rounded-xl border p-3"
    >
      <input
        type="search"
        aria-label="Filtrar ativos"
        placeholder="Filtrar ativos..."
        value={filtro}
        onChange={(e) => onFiltroChange(e.target.value)}
        className="h-9 w-full max-w-xs rounded-md border bg-background px-3 text-sm"
        data-testid="portfolio-filters-input"
      />
      <button
        type="button"
        onClick={() => onClasseChange(null)}
        className={
          "rounded-full border px-3 py-1 text-xs " +
          (classeSelecionada === null ? "bg-primary text-primary-foreground" : "")
        }
        data-testid="filter-todas"
      >
        Todas
      </button>
      {classes.map((classe) => (
        <button
          key={classe}
          type="button"
          onClick={() => onClasseChange(classe)}
          className={
            "rounded-full border px-3 py-1 text-xs " +
            (classeSelecionada === classe ? "bg-primary text-primary-foreground" : "")
          }
          data-testid={`filter-${classe}`}
        >
          {classe}
        </button>
      ))}
    </div>
  );
}
