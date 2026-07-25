import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  Building2,
  Wallet,
  TrendingUp,
  ArrowDownUp,
  TrendingDown,
  CreditCard,
  Landmark,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ModuleLayout } from "@/components/module-layout";
import type { ModuleTab } from "@/components/module-tabs";

export const Route = createFileRoute("/_authenticated/finance")({
  component: FinanceModule,
});

const TABS: ModuleTab[] = [
  { label: "Resumo", to: "/finance", icon: <Building2 className="size-4" /> },
  { label: "Contas", to: "/finance/contas", icon: <Wallet className="size-4" /> },
  {
    label: "Movimentações",
    to: "/finance/movimentacoes",
    icon: <ArrowDownUp className="size-4" />,
  },
  { label: "Receitas", to: "/finance/receitas", icon: <TrendingUp className="size-4" /> },
  { label: "Despesas", to: "/finance/despesas", icon: <TrendingDown className="size-4" /> },
  { label: "Dívidas", to: "/finance/dividas", icon: <CreditCard className="size-4" /> },
  { label: "Patrimônio", to: "/finance/patrimonio", icon: <Landmark className="size-4" /> },
];

function FinanceModule() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <ModuleLayout
          title="Gestão Financeira"
          description="Contas, caixa, receitas, despesas e patrimônio."
          breadcrumbs={[{ label: "Gestão Financeira", to: "/finance" }]}
          tabs={TABS}
        >
          <Outlet />
        </ModuleLayout>
      </div>
    </div>
  );
}
