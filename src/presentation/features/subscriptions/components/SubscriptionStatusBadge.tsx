interface SubscriptionStatusBadgeProps {
  status: string;
  isActive?: boolean;
  isTrial?: boolean;
  isPastDue?: boolean;
  isCancelled?: boolean;
  isExpired?: boolean;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  TRIAL: { label: "Trial", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" },
  ACTIVE: { label: "Ativo", className: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
  CANCELLED: { label: "Cancelado", className: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
  PAST_DUE: { label: "Pendente", className: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  EXPIRED: { label: "Expirado", className: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" },
};

export function SubscriptionStatusBadge({ status, isActive, isTrial, isPastDue, isCancelled, isExpired }: SubscriptionStatusBadgeProps) {
  const resolved = isActive ? "ACTIVE" : isTrial ? "TRIAL" : isPastDue ? "PAST_DUE" : isCancelled ? "CANCELLED" : isExpired ? "EXPIRED" : status;
  const cfg = STATUS_CONFIG[resolved] ?? { label: resolved, className: "bg-muted text-muted-foreground" };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cfg.className}`}>
      {cfg.label}
    </span>
  );
}
