import type { GoalsSummaryViewModel } from "../types/goals.view-model";
import { GoalProgress } from "./GoalProgress";

interface GoalsSummaryProps {
  summary: GoalsSummaryViewModel;
}

export function GoalsSummary({ summary }: GoalsSummaryProps) {
  return (
    <div data-testid="goals-summary" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="rounded-xl border p-3">
        <p className="text-xs text-muted-foreground">Total de metas</p>
        <p className="mt-1 text-lg font-semibold tabular-nums">{summary.total}</p>
      </div>
      <div className="rounded-xl border p-3">
        <p className="text-xs text-muted-foreground">Ativas</p>
        <p className="mt-1 text-lg font-semibold tabular-nums">{summary.active}</p>
      </div>
      <div className="rounded-xl border p-3">
        <p className="text-xs text-muted-foreground">Concluídas</p>
        <p className="mt-1 text-lg font-semibold tabular-nums">{summary.completed}</p>
      </div>
      <div className="rounded-xl border p-3">
        <p className="text-xs text-muted-foreground">Acumulado / Alvo</p>
        <p className="mt-1 text-sm font-semibold tabular-nums">
          {summary.totalCurrent}{" "}
          <span className="text-xs text-muted-foreground">/ {summary.totalTarget}</span>
        </p>
      </div>
      <div className="col-span-full">
        <GoalProgress percentage={summary.overallPercentage} size="md" />
      </div>
    </div>
  );
}
