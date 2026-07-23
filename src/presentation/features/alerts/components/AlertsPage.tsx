import { useState } from "react";
import { useAlertsQuery, useAlertRulesQuery } from "../hooks/use-alerts-query";
import { useConfirmAlertMutation } from "../hooks/use-confirm-alert-mutation";
import { AlertCard } from "./AlertCard";
import { AlertRuleForm } from "./AlertRuleForm";
import { AlertRuleList } from "./AlertRuleList";
import { AlertsLoading } from "./AlertsLoading";
import { AlertsEmpty } from "./AlertsEmpty";
import { AlertsError } from "./AlertsError";

interface AlertsPageProps {
  userId: string;
}

export function AlertsPage({ userId }: AlertsPageProps) {
  const [tab, setTab] = useState<"pending" | "rules">("pending");
  const [showForm, setShowForm] = useState(false);

  const {
    data: alerts,
    isLoading: alertsLoading,
    isError: alertsError,
    refetch: refetchAlerts,
  } = useAlertsQuery(userId);
  const { data: rules, isLoading: rulesLoading } = useAlertRulesQuery(userId);
  const confirmAlert = useConfirmAlertMutation(userId);

  if (alertsLoading || rulesLoading) return <AlertsLoading />;
  if (alertsError)
    return <AlertsError message="Erro ao carregar alertas" onRetry={refetchAlerts} />;

  return (
    <div data-testid="alerts-page" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Alertas</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setTab("pending")}
            className={`rounded-md px-3 py-1 text-xs ${tab === "pending" ? "bg-foreground text-background" : "border"}`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setTab("rules")}
            className={`rounded-md px-3 py-1 text-xs ${tab === "rules" ? "bg-foreground text-background" : "border"}`}
          >
            Regras
          </button>
        </div>
      </div>

      {tab === "pending" && (
        <>
          {!alerts || alerts.length === 0 ? (
            <AlertsEmpty />
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onConfirm={(id) => confirmAlert.mutate(id)}
                  isPending={confirmAlert.isPending}
                />
              ))}
            </div>
          )}
        </>
      )}

      {tab === "rules" && (
        <div className="space-y-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="rounded-md bg-foreground px-3 py-1 text-xs text-background"
          >
            {showForm ? "Cancelar" : "Nova regra"}
          </button>
          {showForm && <AlertRuleForm onSave={() => setShowForm(false)} isPending={false} />}
          {rules ? <AlertRuleList rules={rules} onToggle={() => {}} /> : null}
        </div>
      )}
    </div>
  );
}
