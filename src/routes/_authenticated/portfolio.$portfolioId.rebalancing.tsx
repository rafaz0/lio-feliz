import { createFileRoute } from "@tanstack/react-router";
import { RebalancingPage } from "@/presentation/features/rebalancing";

export const Route = createFileRoute("/_authenticated/portfolio/$portfolioId/rebalancing")({
  component: RebalancingRouteComponent,
});

function RebalancingRouteComponent() {
  const { portfolioId } = Route.useParams();

  return (
    <main className="container mx-auto grid gap-6 p-4 py-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Rebalanceamento</h1>
        <p className="text-sm text-muted-foreground">
          Ajuste a alocação da carteira para a estratégia desejada.
        </p>
      </header>
      <RebalancingPage portfolioId={portfolioId} />
    </main>
  );
}
