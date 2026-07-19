import { createFileRoute } from "@tanstack/react-router";
import { HistoryPage } from "@/presentation/features/history";

export const Route = createFileRoute("/_authenticated/portfolio/$portfolioId/history")({
  component: HistoryRouteComponent,
});

function HistoryRouteComponent() {
  const { portfolioId } = Route.useParams();

  return (
    <main className="container mx-auto grid gap-6 p-4 py-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Histórico</h1>
        <p className="text-sm text-muted-foreground">
          Evolução patrimonial e rentabilidade da carteira.
        </p>
      </header>
      <HistoryPage portfolioId={portfolioId} />
    </main>
  );
}
