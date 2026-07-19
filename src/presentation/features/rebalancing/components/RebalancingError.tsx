interface RebalancingErrorProps {
  message: string;
  onRetry?: () => void;
}

export function RebalancingError({ message, onRetry }: RebalancingErrorProps) {
  return (
    <div
      data-testid="rebalancing-error"
      role="alert"
      className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-center"
    >
      <p className="text-sm font-medium text-destructive">Erro ao calcular rebalanceamento</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          data-testid="rebalancing-retry"
          className="mt-3 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
        >
          Tentar novamente
        </button>
      ) : null}
    </div>
  );
}
