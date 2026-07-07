import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  ClipboardList,
  Coins,
  LayoutDashboard,
  LineChart,
  Receipt,
  Target,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

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

const TABS = [
  {
    to: "/carteira",
    label: "Resumo",
    icon: <LayoutDashboard className="size-4" />,
    description: "Visão geral da carteira",
  },
  {
    to: "/carteira/lancamentos",
    label: "Movimentações",
    icon: <ClipboardList className="size-4" />,
    description: "Operações de compra e venda",
  },
  {
    to: "/carteira/proventos",
    label: "Proventos",
    icon: <Coins className="size-4" />,
    description: "Recebidos, projetados e cobertura",
  },
  {
    to: "/carteira/patrimonio",
    label: "Patrimônio",
    icon: <Wallet className="size-4" />,
    description: "Evolução e alocação por classe",
  },
  {
    to: "/carteira/rentabilidade",
    label: "Rentabilidade",
    icon: <LineChart className="size-4" />,
    description: "Evolução mensal vs. benchmarks",
  },
  {
    to: "/carteira/metas",
    label: "Metas",
    icon: <Target className="size-4" />,
    description: "Renda, patrimônio e investimentos",
  },
  {
    to: "/carteira/irpf",
    label: "IRPF",
    icon: <Receipt className="size-4" />,
    description: "Apuração e declaração anual",
  },
] as const;

function isTabActive(currentPath: string, target: string): boolean {
  if (target === "/carteira") return currentPath === "/carteira" || currentPath === "/carteira/";
  return currentPath === target || currentPath.startsWith(target + "/");
}

function CarteiraLayout() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-[1400px] px-4 pt-8 pb-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Minha carteira</h1>
          <p className="text-sm text-muted-foreground">
            Posição consolidada, proventos, patrimônio e rentabilidade.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          <nav aria-label="Abas da carteira" className="lg:sticky lg:top-4 lg:self-start">
            <ul className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-1 lg:overflow-visible">
              {TABS.map((tab) => {
                const active = isTabActive(currentPath, tab.to);
                return (
                  <li key={tab.to} className="shrink-0">
                    <Link
                      to={tab.to}
                      preload="intent"
                      className={cn(
                        "group flex items-center gap-3 rounded-md border border-transparent px-3 py-2 text-sm transition",
                        "hover:bg-secondary/60 hover:border-border",
                        active && "bg-secondary border-border text-foreground font-medium",
                        !active && "text-muted-foreground",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-md border",
                          active
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-transparent bg-muted text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        {tab.icon}
                      </span>
                      <span className="flex flex-col whitespace-nowrap">
                        <span className="leading-none">{tab.label}</span>
                        <span className="hidden text-[11px] text-muted-foreground lg:block leading-tight mt-1">
                          {tab.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 hidden items-center gap-2 rounded-md border border-dashed border-border p-3 text-[11px] text-muted-foreground lg:flex">
              <BarChart3 className="size-3.5 shrink-0" />
              <span>Dados pessoais sincronizados com sua conta.</span>
            </p>
          </nav>
          <main className="min-w-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}