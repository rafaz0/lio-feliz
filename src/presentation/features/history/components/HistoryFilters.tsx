import type { HistoryFiltersViewModel, HistoryFilterTipo } from "../types/history.view-model";

interface HistoryFiltersProps {
  filtros: HistoryFiltersViewModel;
  onFiltroChange: (filtros: HistoryFiltersViewModel) => void;
}

const TIPOS: HistoryFilterTipo[] = ["TODOS", "PATRIMONIO", "INVESTIDO"];

export function HistoryFilters({ filtros, onFiltroChange }: HistoryFiltersProps) {
  return (
    <div data-testid="history-filters" className="flex flex-wrap items-center gap-2">
      <input
        type="search"
        aria-label="Filtrar histórico por data"
        placeholder="Filtrar por data..."
        value={filtros.termo}
        onChange={(e) => onFiltroChange({ ...filtros, termo: e.target.value })}
        data-testid="history-filter-termo"
        className="h-9 w-full rounded-md border bg-background px-3 text-sm sm:w-56"
      />
      <select
        aria-label="Filtrar por tipo de série"
        value={filtros.tipo}
        onChange={(e) => onFiltroChange({ ...filtros, tipo: e.target.value as HistoryFilterTipo })}
        data-testid="history-filter-tipo"
        className="h-9 rounded-md border bg-background px-2 text-sm"
      >
        {TIPOS.map((tipo) => (
          <option key={tipo} value={tipo} data-testid={`filter-${tipo}`}>
            {tipo === "TODOS" ? "Todos" : tipo}
          </option>
        ))}
      </select>
    </div>
  );
}
