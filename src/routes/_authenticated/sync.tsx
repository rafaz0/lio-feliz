import { createFileRoute } from "@tanstack/react-router";
import { SyncPage } from "@/presentation/features/sync";

export const Route = createFileRoute("/_authenticated/sync")({
  component: SyncRouteComponent,
});

function SyncRouteComponent() {
  return (
    <main className="container mx-auto grid gap-6 p-4 py-6">
      <SyncPage />
    </main>
  );
}
