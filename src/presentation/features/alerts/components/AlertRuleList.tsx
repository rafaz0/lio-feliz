import type { AlertRuleViewModel } from "../viewmodels/alert.view-model";

interface AlertRuleListProps {
  rules: AlertRuleViewModel[];
  onToggle: (ruleId: string, enabled: boolean) => void;
}

export function AlertRuleList({ rules, onToggle }: AlertRuleListProps) {
  if (rules.length === 0)
    return <p className="text-xs text-muted-foreground">Nenhuma regra cadastrada.</p>;

  return (
    <div className="space-y-2">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className="flex items-center justify-between rounded-lg border px-4 py-3"
        >
          <div>
            <p className="text-sm font-medium">{rule.name}</p>
            <p className="text-xs text-muted-foreground">
              {rule.eventType} · {rule.daysBefore} dias antes
            </p>
          </div>
          <button
            onClick={() => onToggle(rule.id, !rule.enabled)}
            className={`rounded-md px-3 py-1 text-xs ${rule.enabled ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {rule.enabled ? "Ativa" : "Inativa"}
          </button>
        </div>
      ))}
    </div>
  );
}
