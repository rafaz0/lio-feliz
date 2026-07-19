interface SettingsErrorProps {
  message: string;
  onRetry?: () => void;
}

export function SettingsError({ message, onRetry }: SettingsErrorProps) {
  return (
    <div
      data-testid="settings-error"
      role="alert"
      className="rounded-xl border border-destructive/40 bg-destructive/5 p-6 text-center"
    >
      <p className="text-sm font-medium text-destructive">Erro ao carregar configurações</p>
      <p className="mt-1 text-sm text-muted-foreground">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          data-testid="settings-retry"
          className="mt-3 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
        >
          Tentar novamente
        </button>
      ) : null}
    </div>
  );
}
