export function DividendsEmpty() {
  return (
    <div
      data-testid="dividends-empty"
      className="rounded-xl border border-dashed p-10 text-center"
      role="status"
    >
      <p className="text-sm font-medium">Nenhum provento</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Este portfólio ainda não possui proventos registrados.
      </p>
    </div>
  );
}
