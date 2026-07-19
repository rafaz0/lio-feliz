import { createFileRoute } from "@tanstack/react-router";
import { DividendsPage } from "@/presentation/features/dividends";

export const Route = createFileRoute("/_authenticated/portfolio/$portfolioId/dividends")({
  component: DividendsRouteComponent,
});

function DividendsRouteComponent() {
  const { portfolioId } = Route.useParams();

  return (
    <main className="container mx-auto grid gap-6 p-4 py-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Proventos</h1>
        <p className="text-sm text-muted-foreground">Dividendos e JCP recebidos pela carteira.</p>
      </header>
      <DividendsPage portfolioId={portfolioId} />
    </main>
  );
}
