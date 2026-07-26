import { createFileRoute, useRouter } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SubscriptionsPage } from "@/presentation/features/subscriptions";

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
});

function AssinaturasRouteComponent() {
  const { user } = useRouter().state.location.state as { user?: { id: string } };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[1000px] px-4 py-8">
        <SubscriptionsPage userId={user?.id ?? "dev-user-0000"} />
      </main>
    </div>
  );
}
