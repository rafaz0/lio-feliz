export function GoalsEmpty() {
  return (
    <div
      data-testid="goals-empty"
      className="rounded-xl border border-dashed p-10 text-center"
      role="status"
    >
      <p className="text-sm font-medium">Nenhuma meta financeira</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Crie sua primeira meta para acompanhar seus objetivos de longo prazo.
      </p>
    </div>
  );
}
