import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/presentation/features/portfolio";

export const Route = createFileRoute("/_authenticated/portfolio/$portfolioId")({
  component: PortfolioRouteComponent,
});

function PortfolioRouteComponent() {
  const { portfolioId } = Route.useParams();

  return (
    <main className="container mx-auto grid gap-6 p-4 py-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Carteira</h1>
        <p className="text-sm text-muted-foreground">
          Detalhamento dos ativos e alocação da carteira.
        </p>
      </header>
      <PortfolioPage portfolioId={portfolioId} />
    </main>
  );
}
