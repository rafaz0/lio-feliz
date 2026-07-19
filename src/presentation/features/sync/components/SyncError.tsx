interface SyncErrorProps {
  message: string;
  onRetry?: () => void;
}

export function SyncError({ message, onRetry }: SyncErrorProps) {
  return (
    <div
      data-testid="sync-error"
      role="alert"
      className="rounded border border-destructive/40 bg-destructive/10 p-4"
    >
      <p className="text-sm text-destructive">{message}</p>
      {onRetry ? (
        <button
          type="button"
          data-testid="sync-retry"
          onClick={onRetry}
          className="mt-3 rounded bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground"
        >
          Tentar novamente
        </button>
      ) : null}
    </div>
  );
}
