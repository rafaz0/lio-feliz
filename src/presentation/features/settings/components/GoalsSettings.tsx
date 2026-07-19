import type { GoalsSettingsViewModel } from "../types/settings.view-model";

interface GoalsSettingsProps {
  goals: GoalsSettingsViewModel;
}

export function GoalsSettings({ goals }: GoalsSettingsProps) {
  return (
    <div data-testid="goals-settings" className="rounded-xl border p-4">
      <h3 className="text-sm font-medium">Metas financeiras</h3>
      <ul className="mt-2 space-y-1 text-sm">
        {goals.metas.map((m, i) => (
          <li key={`${m.nome}-${i}`} data-testid="goal-row" className="flex justify-between">
            <span>{m.nome}</span>
            <span className="tabular-nums">
              {m.percentualConcluido.toFixed(0)}% ·{" "}
              {m.valorAlvo.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </li>
        ))}
        {goals.metas.length === 0 ? (
          <li className="text-muted-foreground">Nenhuma meta configurada.</li>
        ) : null}
      </ul>
    </div>
  );
}
