import type { GoalViewModel } from "../types/goals.view-model";
import { statusToLabel, categoryToLabel } from "../types/goals.view-model";
import { GoalProgress } from "./GoalProgress";

interface GoalsTableProps {
  goals: GoalViewModel[];
}

export function GoalsTable({ goals }: GoalsTableProps) {
  return (
    <div data-testid="goals-table" className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-xs text-muted-foreground">
            <th className="pb-2 font-medium">Meta</th>
            <th className="pb-2 font-medium">Categoria</th>
            <th className="pb-2 font-medium">Status</th>
            <th className="pb-2 font-medium text-right">Alvo</th>
            <th className="pb-2 font-medium text-right">Acumulado</th>
            <th className="pb-2 font-medium text-right">Progresso</th>
            <th className="pb-2 font-medium text-right">Prazo</th>
          </tr>
        </thead>
        <tbody>
          {goals.map((goal) => (
            <tr
              key={goal.id}
              data-testid={`goal-row-${goal.id}`}
              className="border-b last:border-0"
            >
              <td className="py-3 font-medium">{goal.name}</td>
              <td className="py-3 text-muted-foreground">
                {categoryToLabel(goal.category)}
              </td>
              <td className="py-3">
                <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">
                  {statusToLabel(goal.status)}
                </span>
              </td>
              <td className="py-3 text-right tabular-nums">{goal.targetAmount}</td>
              <td className="py-3 text-right tabular-nums">{goal.currentAmount}</td>
              <td className="py-3">
                <div className="w-24 ml-auto">
                  <GoalProgress
                    percentage={goal.percentage}
                    size="sm"
                    showLabel={false}
                  />
                </div>
              </td>
              <td className="py-3 text-right tabular-nums text-muted-foreground">
                {goal.targetDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
