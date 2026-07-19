interface DividendsErrorProps {
  message: string;
  onRetry?: () => void;
}

export function DividendsError({ message, onRetry }: DividendsErrorProps) {
  return (
    <div
      data-testid="dividends-error"
      role="alert"
      className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-center"
    >
      <p className="text-sm font-medium text-destructive">Erro ao carregar proventos</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          data-testid="dividends-retry"
          className="mt-3 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
        >
          Tentar novamente
        </button>
      ) : null}
    </div>
  );
}
