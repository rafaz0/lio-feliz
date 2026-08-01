import { createFileRoute } from "@tanstack/react-router";
import { useSession } from "@/hooks/use-session";
import { SiteHeader } from "@/components/site-header";
import { AlertsPage } from "@/presentation/features/alerts";
import { RouteErrorBoundary, NotFoundState } from "@/components/error-state";
import { APP_NAME } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/alertas")({
  head: () => ({
    meta: [{ title: `Alertas — ${APP_NAME}` }, { name: "robots", content: "noindex" }],
  }),
  component: AlertasRouteComponent,
  errorComponent: RouteErrorBoundary,
  notFoundComponent: () => <NotFoundState />,
});

function AlertasRouteComponent() {
  const { user } = useSession();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[1000px] px-4 py-8">
        <AlertsPage userId={user?.id ?? "f9ff10aa-beac-4f63-a7f5-d477ad5d0da0"} />
      </main>
    </div>
  );
}
