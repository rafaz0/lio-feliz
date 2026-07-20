import type { GoalFiltersViewModel } from "../types/goals.view-model";

interface GoalsFiltersProps {
  filters: GoalFiltersViewModel;
  onFilterChange: (filters: GoalFiltersViewModel) => void;
}

const STATUS_OPTIONS = [
  { value: "TODOS", label: "Todos" },
  { value: "ACTIVE", label: "Ativa" },
  { value: "PAUSED", label: "Pausada" },
  { value: "COMPLETED", label: "Concluída" },
  { value: "CANCELLED", label: "Cancelada" },
];

const CATEGORY_OPTIONS = [
  { value: "TODAS", label: "Todas" },
  { value: "EMERGENCY", label: "Emergência" },
  { value: "RETIREMENT", label: "Aposentadoria" },
  { value: "EDUCATION", label: "Educação" },
  { value: "TRAVEL", label: "Viagem" },
  { value: "LARGE_PURCHASE", label: "Grande Compra" },
  { value: "INVESTMENT", label: "Investimento" },
  { value: "OTHER", label: "Outro" },
];

export function GoalsFilters({ filters, onFilterChange }: GoalsFiltersProps) {
  return (
    <div data-testid="goals-filters" className="flex flex-wrap items-center gap-2">
      <input
        type="search"
        aria-label="Filtrar metas"
        placeholder="Filtrar por nome ou categoria..."
        value={filters.termo}
        onChange={(e) => onFilterChange({ ...filters, termo: e.target.value })}
        data-testid="goals-filter-termo"
        className="h-9 w-full rounded-md border bg-background px-3 text-sm sm:w-56"
      />
      <select
        aria-label="Filtrar por status"
        value={filters.status}
        onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        data-testid="goals-filter-status"
        className="h-9 rounded-md border bg-background px-2 text-sm"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <select
        aria-label="Filtrar por categoria"
        value={filters.category}
        onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
        data-testid="goals-filter-category"
        className="h-9 rounded-md border bg-background px-2 text-sm"
      >
        {CATEGORY_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
