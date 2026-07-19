import type {
  RebalancingFilterTipo,
  RebalancingFiltersViewModel,
} from "../types/rebalancing.view-model";

interface RebalancingFiltersProps {
  filtros: RebalancingFiltersViewModel;
  onChange: (filtros: RebalancingFiltersViewModel) => void;
}

const OPCOES: { value: RebalancingFilterTipo; label: string }[] = [
  { value: "TODOS", label: "Todos" },
  { value: "DESVALANCE", label: "Em desbalance" },
  { value: "EQUILIBRADO", label: "Equilibrados" },
];

export function RebalancingFilters({ filtros, onChange }: RebalancingFiltersProps) {
  return (
    <div
      data-testid="rebalancing-filters"
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filtros de rebalanceamento"
    >
      {OPCOES.map((op) => (
        <button
          key={op.value}
          type="button"
          aria-pressed={filtros.tipo === op.value}
          data-testid={`filter-${op.value}`}
          onClick={() => onChange({ tipo: op.value })}
          className={`rounded-full border px-3 py-1 text-sm ${
            filtros.tipo === op.value ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          }`}
        >
          {op.label}
        </button>
      ))}
    </div>
  );
}
