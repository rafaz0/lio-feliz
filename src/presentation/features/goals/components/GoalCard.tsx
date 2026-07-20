import type { GoalViewModel } from "../types/goals.view-model";
import { statusToLabel, categoryToLabel } from "../types/goals.view-model";
import { GoalProgress } from "./GoalProgress";

interface GoalCardProps {
  goal: GoalViewModel;
}

export function GoalCard({ goal }: GoalCardProps) {
  return (
    <div
      data-testid={`goal-card-${goal.id}`}
      className="rounded-xl border p-4 transition-shadow hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-medium" title={goal.name}>
            {goal.name}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {categoryToLabel(goal.category)}
          </p>
        </div>
        <span
          data-testid={`goal-status-${goal.id}`}
          className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium"
        >
          {statusToLabel(goal.status)}
        </span>
      </div>
      <div className="mt-3">
        <GoalProgress percentage={goal.percentage} size="sm" />
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
        <span className="text-muted-foreground">Meta</span>
        <span className="text-right tabular-nums">{goal.targetAmount}</span>
        <span className="text-muted-foreground">Acumulado</span>
        <span className="text-right tabular-nums">{goal.currentAmount}</span>
        <span className="text-muted-foreground">Faltam</span>
        <span className="text-right tabular-nums">{goal.remainingAmount}</span>
        <span className="text-muted-foreground">Prazo</span>
        <span className="text-right tabular-nums">{goal.targetDate}</span>
      </div>
    </div>
  );
}
