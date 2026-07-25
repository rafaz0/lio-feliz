import { createFileRoute } from "@tanstack/react-router";
import { Building2, Wallet, TrendingUp, ArrowDownUp, PiggyBank } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ModuleSection } from "@/components/module-section";
import { QuickActions, RelatedLinks } from "@/components/experience";
import type { QuickActionItem } from "@/components/experience";
import type { RelatedLinkItem } from "@/components/experience";

export const Route = createFileRoute("/_authenticated/finance/")({
  head: () => ({
    meta: [
      { title: "Gestão Financeira — Investidor Pro" },
      { name: "description", content: "Controle suas contas, receitas e despesas." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FinanceOverviewPage,
});

const QUICK_ACTIONS: QuickActionItem[] = [
  { label: "Contas", to: "/finance/contas", icon: Building2, description: "Ver contas bancárias" },
  {
    label: "Movimentações",
    to: "/finance/movimentacoes",
    icon: ArrowDownUp,
    description: "Últimas transações",
  },
  {
    label: "Receitas",
    to: "/finance/receitas",
    icon: TrendingUp,
    description: "Registrar receitas",
  },
  { label: "Carteira", to: "/carteira", icon: Wallet, description: "Ir para investimentos" },
];

const RELATED: RelatedLinkItem[] = [
  { label: "Dashboard", to: "/dashboard", description: "Visão consolidada" },
  { label: "Carteira", to: "/carteira", description: "Investimentos" },
  { label: "Provisionador", to: "/provisionador", description: "Projeção de dividendos" },
];

function FinanceOverviewPage() {
  return (
    <div className="space-y-6">
      <ModuleSection
        title="Bem-vindo à Gestão Financeira"
        description="Gerencie suas contas, receitas, despesas e acompanhe seu patrimônio."
      >
        <QuickActions items={QUICK_ACTIONS} columns={4} />
      </ModuleSection>

      <ModuleSection
        title="Em construção"
        description="Os módulos de Gestão Financeira serão implementados incrementalmente."
      >
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
          <PiggyBank className="mb-3 size-8 text-muted-foreground/40" strokeWidth={1.5} />
          <h3 className="text-sm font-medium text-foreground">Novos módulos em breve</h3>
          <p className="mt-1 max-w-xs text-xs text-muted-foreground">
            Os módulos de Receitas, Despesas, Dívidas e Patrimônio Global serão adicionados nas
            próximas atualizações.
          </p>
        </div>
      </ModuleSection>

      <ModuleSection title="Navegação relacionada">
        <RelatedLinks items={RELATED} />
      </ModuleSection>
    </div>
  );
}
