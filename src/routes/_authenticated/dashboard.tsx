import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/presentation/features/dashboard";
import { useAuth } from "@/presentation/features/auth";
import { RouteErrorBoundary, NotFoundState } from "@/components/error-state";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  errorComponent: RouteErrorBoundary,
  notFoundComponent: () => <NotFoundState />,
});

function DashboardPage() {
  const { user } = useAuth();
  const portfolioId = user?.id ?? "default-portfolio";

  return (
    <main className="container mx-auto grid gap-6 p-4 py-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão consolidada do seu patrimônio.</p>
      </header>
      <DashboardView portfolioId={portfolioId} />
    </main>
  );
}
