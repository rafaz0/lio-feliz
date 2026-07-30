import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/hooks/use-session";
import { SiteHeader } from "@/components/site-header";
import { SubscriptionsPage } from "@/presentation/features/subscriptions";
import { RouteErrorBoundary, NotFoundState } from "@/components/error-state";

export const Route = createFileRoute("/_authenticated/assinaturas")({
  head: () => ({
    meta: [
      { title: "Planos e Assinatura — Lio Feliz" },
      {
        name: "description",
        content: "Gerencie seu plano de assinatura e recursos disponiveis.",
      },
    ],
  }),
  component: AssinaturasRouteComponent,
  errorComponent: RouteErrorBoundary,
  notFoundComponent: () => <NotFoundState />,
});

function AssinaturasRouteComponent() {
  const { user, loading } = useSession();

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-[1000px] px-4 py-8 text-center text-sm text-muted-foreground">
          Carregando...
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[1000px] px-4 py-8">
        <SubscriptionsPage userId={user?.id ?? "dev-user-0000"} />
      </main>
    </div>
  );
}
