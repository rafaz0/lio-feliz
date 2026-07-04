import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/_authenticated/carteira")({
  head: () => ({
    meta: [
      { title: "Minha carteira — Investidor Pro" },
      { name: "description", content: "Sua posição consolidada, rentabilidade e alocação." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CarteiraLayout,
});

function CarteiraLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-[1400px] px-4 pt-8">
        <div className="mb-6 flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Minha carteira</h1>
            <p className="text-sm text-muted-foreground">
              Posição consolidada e histórico de operações.
            </p>
          </div>
          <nav className="flex gap-1 rounded-md border border-border bg-card p-1 text-sm">
            <Link
              to="/carteira"
              activeOptions={{ exact: true }}
              className="rounded px-3 py-1.5 text-muted-foreground transition hover:text-foreground [&.active]:bg-secondary [&.active]:text-foreground"
            >
              Visão geral
            </Link>
            <Link
              to="/carteira/operacoes"
              className="rounded px-3 py-1.5 text-muted-foreground transition hover:text-foreground [&.active]:bg-secondary [&.active]:text-foreground"
            >
              Operações
            </Link>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-4 pb-16">
        <Outlet />
      </div>
    </div>
  );
}
