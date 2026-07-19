interface TaxErrorProps {
  message: string;
  onRetry?: () => void;
}

export function TaxError({ message, onRetry }: TaxErrorProps) {
  return (
    <div
      data-testid="tax-error"
      role="alert"
      className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-center"
    >
      <p className="text-sm font-medium text-destructive">Erro ao gerar relatório fiscal</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          data-testid="tax-retry"
          className="mt-3 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
        >
          Tentar novamente
        </button>
      ) : null}
    </div>
  );
}
