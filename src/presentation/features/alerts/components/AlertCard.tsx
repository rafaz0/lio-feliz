import type { AlertViewModel } from "../viewmodels/alert.view-model";

interface AlertCardProps {
  alert: AlertViewModel;
  onConfirm: (alertId: string) => void;
  isPending: boolean;
}

export function AlertCard({ alert, onConfirm, isPending }: AlertCardProps) {
  const borderColor =
    alert.severity === "critical"
      ? "border-red-300"
      : alert.severity === "warning"
        ? "border-yellow-300"
        : "border-blue-200";

  return (
    <div
      data-testid={`alert-card-${alert.id}`}
      className={`rounded-lg border-l-4 ${borderColor} p-4 flex items-start justify-between`}
    >
      <div className="space-y-1">
        <p className="text-sm font-medium">{alert.assetTicker}</p>
        <p className="text-xs text-muted-foreground">{alert.message}</p>
        <p className="text-xs text-muted-foreground">
          {alert.eventDate} · {alert.severityLabel}
        </p>
      </div>
      {!alert.isConfirmed && (
        <button
          onClick={() => onConfirm(alert.id)}
          disabled={isPending}
          className="rounded-md bg-foreground px-3 py-1 text-xs text-background disabled:opacity-50 shrink-0"
        >
          Confirmar
        </button>
      )}
    </div>
  );
}
