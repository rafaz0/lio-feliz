import { createFileRoute } from "@tanstack/react-router";
import { TaxPage } from "@/presentation/features/tax";

export const Route = createFileRoute("/_authenticated/portfolio/$portfolioId/tax")({
  component: TaxRouteComponent,
});

function TaxRouteComponent() {
  const { portfolioId } = Route.useParams();

  return (
    <main className="container mx-auto grid gap-6 p-4 py-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Gestão Fiscal</h1>
        <p className="text-sm text-muted-foreground">
          Relatório para declaração de Imposto de Renda.
        </p>
      </header>
      <TaxPage portfolioId={portfolioId} />
    </main>
  );
}
