interface ReportsEmptyProps {
  onReset?: () => void;
}

export function ReportsEmpty({ onReset }: ReportsEmptyProps) {
  return (
    <div
      data-testid="reports-empty"
      role="status"
      className="rounded border border-dashed p-6 text-center"
    >
      <p className="text-sm text-muted-foreground">Nenhum relatório disponível.</p>
      {onReset ? (
        <button
          type="button"
          data-testid="reports-empty-reset"
          onClick={onReset}
          className="mt-3 rounded bg-secondary px-3 py-1.5 text-sm font-medium"
        >
          Limpar filtros
        </button>
      ) : null}
    </div>
  );
}
