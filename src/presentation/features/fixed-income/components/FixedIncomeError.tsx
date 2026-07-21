interface FixedIncomeErrorProps {
  message: string;
  onRetry?: () => void;
}

export function FixedIncomeError({ message, onRetry }: FixedIncomeErrorProps) {
  return (
    <div
      data-testid="fixed-income-error"
      className="rounded-lg border border-destructive/40 bg-destructive/10 p-6 text-center"
    >
      <p className="text-sm text-destructive-foreground">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          data-testid="fixed-income-error-retry"
          className="mt-4 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground"
        >
          Tentar novamente
        </button>
      ) : null}
    </div>
  );
}
