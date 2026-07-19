import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/presentation/features/settings";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsRouteComponent,
});

function SettingsRouteComponent() {
  return (
    <main className="container mx-auto grid gap-6 p-4 py-6">
      <SettingsPage />
    </main>
  );
}
