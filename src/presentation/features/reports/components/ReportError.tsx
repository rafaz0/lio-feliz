interface ReportErrorProps {
  message: string;
  onRetry?: () => void;
}

export function ReportError({ message, onRetry }: ReportErrorProps) {
  return (
    <section data-testid="report-error" aria-label="Erro ao carregar relatórios" className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 text-center">
      <p className="text-destructive">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded bg-destructive px-4 py-2 text-destructive-foreground hover:bg-destructive/80"
        >
          Tentar novamente
        </button>
      )}
    </section>
  );
}
