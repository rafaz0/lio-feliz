import { createFileRoute, useParams } from "@tanstack/react-router";
import { ReportsPage } from "@/presentation/features/reports";

export const Route = createFileRoute("/_authenticated/portfolio/$portfolioId/reports")({
  component: ReportsRouteComponent,
});

function ReportsRouteComponent() {
  const { portfolioId } = useParams({ from: "/_authenticated/portfolio/$portfolioId/reports" });
  return (
    <main className="container mx-auto grid gap-6 p-4 py-6">
      <ReportsPage portfolioId={portfolioId} />
    </main>
  );
}
