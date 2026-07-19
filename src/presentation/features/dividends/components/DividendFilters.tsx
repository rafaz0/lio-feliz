import type { DividendFiltersViewModel, DividendTipo } from "../types/dividends.view-model";

interface DividendFiltersProps {
  filtros: DividendFiltersViewModel;
  onFiltroChange: (filtros: DividendFiltersViewModel) => void;
}

const TIPOS: DividendTipo[] = ["TODOS", "DIVIDENDO", "JCP"];

export function DividendFilters({ filtros, onFiltroChange }: DividendFiltersProps) {
  return (
    <div data-testid="dividend-filters" className="flex flex-wrap items-center gap-2">
      <input
        type="search"
        aria-label="Filtrar proventos por ticker"
        placeholder="Filtrar por ticker..."
        value={filtros.termo}
        onChange={(e) => onFiltroChange({ ...filtros, termo: e.target.value })}
        data-testid="dividend-filter-termo"
        className="h-9 w-full rounded-md border bg-background px-3 text-sm sm:w-56"
      />
      <select
        aria-label="Filtrar por tipo de provento"
        value={filtros.tipo}
        onChange={(e) => onFiltroChange({ ...filtros, tipo: e.target.value as DividendTipo })}
        data-testid="dividend-filter-tipo"
        className="h-9 rounded-md border bg-background px-2 text-sm"
      >
        {TIPOS.map((tipo) => (
          <option key={tipo} value={tipo} data-testid={`filter-${tipo}`}>
            {tipo === "TODOS" ? "Todos" : tipo}
          </option>
        ))}
      </select>
      <input
        type="number"
        aria-label="Filtrar por ano"
        placeholder="Ano"
        value={filtros.ano}
        onChange={(e) => onFiltroChange({ ...filtros, ano: e.target.value })}
        data-testid="dividend-filter-ano"
        className="h-9 w-24 rounded-md border bg-background px-2 text-sm"
      />
    </div>
  );
}
