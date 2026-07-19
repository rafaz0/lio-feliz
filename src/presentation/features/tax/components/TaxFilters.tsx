import type { TaxFilterTipo, TaxFiltersViewModel } from "../types/tax.view-model";

interface TaxFiltersProps {
  filtros: TaxFiltersViewModel;
  onChange: (filtros: TaxFiltersViewModel) => void;
}

const OPCOES: { value: TaxFilterTipo; label: string }[] = [
  { value: "TODOS", label: "Todos" },
  { value: "POSICAO", label: "Posições" },
  { value: "PROVENTOS", label: "Proventos" },
  { value: "GANHO_CAPITAL", label: "Ganho de Capital" },
];

export function TaxFilters({ filtros, onChange }: TaxFiltersProps) {
  return (
    <div
      data-testid="tax-filters"
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filtros fiscais"
    >
      {OPCOES.map((op) => (
        <button
          key={op.value}
          type="button"
          aria-pressed={filtros.tipo === op.value}
          data-testid={`filter-${op.value}`}
          onClick={() => onChange({ ...filtros, tipo: op.value })}
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
