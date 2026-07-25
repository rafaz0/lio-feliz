import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  ClipboardList,
  Coins,
  History,
  LayoutDashboard,
  LineChart,
  Receipt,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ModuleLayout } from "@/components/module-layout";
import type { ModuleTab } from "@/components/module-tabs";

export const Route = createFileRoute("/_authenticated/carteira")({
  head: () => ({
    meta: [
      { title: "Minha carteira — Investidor Pro" },
      { name: "description", content: "Sua posição consolidada, rentabilidade e alocação." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CarteiraModule,
});

const TABS: ModuleTab[] = [
  { label: "Resumo", to: "/_authenticated/carteira", icon: <LayoutDashboard className="size-4" /> },
  {
    label: "Patrimônio",
    to: "/_authenticated/carteira/patrimonio",
    icon: <Wallet className="size-4" />,
  },
  {
    label: "Proventos",
    to: "/_authenticated/carteira/proventos",
    icon: <Coins className="size-4" />,
  },
  {
    label: "Rentabilidade",
    to: "/_authenticated/carteira/rentabilidade",
    icon: <LineChart className="size-4" />,
  },
  {
    label: "Cobertura",
    to: "/_authenticated/carteira/cobertura",
    icon: <ShieldCheck className="size-4" />,
  },
  {
    label: "Análises",
    to: "/_authenticated/carteira/analise",
    icon: <Sparkles className="size-4" />,
  },
  {
    label: "Movimentações",
    to: "/_authenticated/carteira/lancamentos",
    icon: <ClipboardList className="size-4" />,
  },
  { label: "Metas", to: "/_authenticated/carteira/metas", icon: <Target className="size-4" /> },
  { label: "IRPF", to: "/_authenticated/carteira/irpf", icon: <Receipt className="size-4" /> },
  {
    label: "Rebalanceamento",
    to: "/_authenticated/carteira/rebalanceamento",
    icon: <BarChart3 className="size-4" />,
  },
  {
    label: "Histórico",
    to: "/_authenticated/carteira/historico",
    icon: <History className="size-4" />,
  },
  {
    label: "Configurações",
    to: "/_authenticated/carteira/configuracoes",
    icon: <Settings className="size-4" />,
  },
];

function CarteiraModule() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <ModuleLayout
          title="Carteira"
          description="Posição consolidada, proventos, patrimônio e rentabilidade."
          breadcrumbs={[{ label: "Carteira", to: "/_authenticated/carteira" }]}
          tabs={TABS}
        >
          <Outlet />
        </ModuleLayout>
      </div>
    </div>
  );
}
