import { useMemo, useState } from "react";
import { useGoalsQuery } from "../hooks/use-goals-query";
import { useCreateGoalMutation } from "../hooks/use-create-goal-mutation";
import { filterGoals, type GoalFiltersViewModel } from "../types/goals.view-model";
import { GoalsSummary } from "./GoalsSummary";
import { GoalsTable } from "./GoalsTable";
import { GoalCard } from "./GoalCard";
import { GoalForm } from "./GoalForm";
import { GoalsFilters } from "./GoalsFilters";
import { GoalsLoading } from "./GoalsLoading";
import { GoalsEmpty } from "./GoalsEmpty";
import { GoalsError } from "./GoalsError";

interface GoalsPageProps {
  portfolioId: string;
}

const FILTROS_INICIAIS: GoalFiltersViewModel = {
  termo: "",
  status: "TODOS",
  category: "TODAS",
};

export function GoalsPage({ portfolioId }: GoalsPageProps) {
  const [filters, setFilters] = useState<GoalFiltersViewModel>(FILTROS_INICIAIS);
  const [showForm, setShowForm] = useState(false);

  const goalsQuery = useGoalsQuery(portfolioId);
  const createGoal = useCreateGoalMutation();

  const visibleGoals = useMemo(
    () => filterGoals(goalsQuery.goals, filters),
    [goalsQuery.goals, filters],
  );

  if (goalsQuery.isLoading) {
    return <GoalsLoading />;
  }

  if (goalsQuery.isError) {
    return (
      <GoalsError
        message={goalsQuery.error?.message ?? "Falha ao carregar metas."}
        onRetry={goalsQuery.refetch}
      />
    );
  }

  return (
    <div data-testid="goals-page" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Metas Financeiras</h1>
          <p className="text-sm text-muted-foreground">Acompanhe seus objetivos patrimoniais.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          data-testid="goals-toggle-form"
          className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
        >
          {showForm ? "Cancelar" : "Nova meta"}
        </button>
      </div>

      {showForm ? (
        <GoalForm
          portfolioId={portfolioId}
          onSubmit={(input) => {
            createGoal.mutate(input, {
              onSuccess: () => setShowForm(false),
            });
          }}
          onCancel={() => setShowForm(false)}
          isPending={createGoal.isPending}
        />
      ) : null}

      {goalsQuery.goals.length > 0 ? (
        <>
          <GoalsSummary summary={goalsQuery.summary} />
          <GoalsFilters filters={filters} onFilterChange={setFilters} />

          <div className="hidden md:block">
            <h2 className="mb-3 text-sm font-medium text-muted-foreground">
              {visibleGoals.length} meta{visibleGoals.length !== 1 ? "s" : ""}
              {filters.termo || filters.status !== "TODOS" || filters.category !== "TODAS"
                ? " (filtradas)"
                : ""}
            </h2>
            <GoalsTable goals={visibleGoals} />
          </div>

          <div className="grid gap-4 md:hidden">
            {visibleGoals.length === 0 ? (
              <GoalsEmpty />
            ) : (
              visibleGoals.map((goal) => <GoalCard key={goal.id} goal={goal} />)
            )}
          </div>
        </>
      ) : (
        <GoalsEmpty />
      )}
    </div>
  );
}
