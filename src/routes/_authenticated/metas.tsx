import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { MetasContent } from "@/components/metas-content";
import { RequireCapability } from "@/presentation/features/licensing";
import { APP_NAME } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/metas")({
  head: () => ({
    meta: [
      { title: `Metas de Dividendos — ${APP_NAME}` },
      {
        name: "description",
        content: "Defina sua meta de dividendos mensais e acompanhe o progresso.",
      },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[800px] px-4 py-8">
        <RequireCapability capability="metas:view" showUpgrade>
          <MetasContent />
        </RequireCapability>
      </main>
    </div>
  );
}
