import { createFileRoute } from "@tanstack/react-router";
import { OperationPage } from "@/presentation/features/operations";

export const Route = createFileRoute("/_authenticated/portfolio/$portfolioId/operations")({
  component: OperationsRouteComponent,
});

function OperationsRouteComponent() {
  const { portfolioId } = Route.useParams();

  return (
    <main className="container mx-auto grid gap-6 p-4 py-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Operações</h1>
        <p className="text-sm text-muted-foreground">
          Registro e histórico de operações da carteira.
        </p>
      </header>
      <OperationPage portfolioId={portfolioId} />
    </main>
  );
}
