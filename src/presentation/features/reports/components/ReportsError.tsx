interface ReportsErrorProps {
  message: string;
  onRetry?: () => void;
}

export function ReportsError({ message, onRetry }: ReportsErrorProps) {
  return (
    <div
      data-testid="reports-error"
      role="alert"
      className="rounded border border-destructive/40 bg-destructive/10 p-4"
    >
      <p className="text-sm text-destructive">{message}</p>
      {onRetry ? (
        <button
          type="button"
          data-testid="reports-retry"
          onClick={onRetry}
          className="mt-3 rounded bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground"
        >
          Tentar novamente
        </button>
      ) : null}
    </div>
  );
}
