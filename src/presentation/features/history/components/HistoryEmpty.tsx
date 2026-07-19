export function HistoryEmpty() {
  return (
    <div
      data-testid="history-empty"
      className="rounded-xl border border-dashed p-10 text-center"
      role="status"
    >
      <p className="text-sm font-medium">Sem histórico</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Este portfólio ainda não possui registros de evolução patrimonial.
      </p>
    </div>
  );
}
