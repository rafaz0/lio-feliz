import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { MetasContent } from "@/components/metas-content";

export const Route = createFileRoute("/_authenticated/metas")({
  head: () => ({
    meta: [
      { title: "Metas de Dividendos — Investidor Pro" },
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
        <MetasContent />
      </main>
    </div>
  );
}