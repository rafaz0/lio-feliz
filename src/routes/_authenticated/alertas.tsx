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
        <AlertsPage userId={user?.id ?? "dev-user-0000"} />
      </main>
    </div>
  );
}
