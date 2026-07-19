import type { OperationFiltersViewModel, OperationTipo } from "../types/operations.view-model";
import { tipoToLabel } from "../types/operations.view-model";

interface OperationFiltersProps {
  filtros: OperationFiltersViewModel;
  onFiltroChange: (filtros: OperationFiltersViewModel) => void;
}

const TIPOS: (OperationTipo | "TODOS")[] = ["TODOS", "BUY", "SELL", "DIVIDEND", "JCP"];

export function OperationFilters({ filtros, onFiltroChange }: OperationFiltersProps) {
  return (
    <div
      data-testid="operation-filters"
      className="flex flex-wrap items-center gap-2 rounded-xl border p-3"
    >
      <input
        type="search"
        aria-label="Filtrar operações"
        placeholder="Filtrar por ativo ou tipo..."
        value={filtros.termo}
        onChange={(e) => onFiltroChange({ ...filtros, termo: e.target.value })}
        className="h-9 w-full max-w-xs rounded-md border bg-background px-3 text-sm"
        data-testid="operation-filters-input"
      />
      {TIPOS.map((tipo) => (
        <button
          key={tipo}
          type="button"
          onClick={() => onFiltroChange({ ...filtros, tipo })}
          className={
            "rounded-full border px-3 py-1 text-xs " +
            (filtros.tipo === tipo ? "bg-primary text-primary-foreground" : "")
          }
          data-testid={`filter-${tipo}`}
        >
          {tipo === "TODOS" ? "Todas" : tipoToLabel(tipo)}
        </button>
      ))}
    </div>
  );
}
