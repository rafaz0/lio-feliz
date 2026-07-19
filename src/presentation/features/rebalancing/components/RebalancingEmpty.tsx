export function RebalancingEmpty() {
  return (
    <div
      data-testid="rebalancing-empty"
      className="rounded-xl border border-dashed p-10 text-center"
      role="status"
    >
      <p className="text-sm font-medium">Sem dados de rebalanceamento</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Não foi possível calcular o rebalanceamento deste portfólio.
      </p>
    </div>
  );
}
