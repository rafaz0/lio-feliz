import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart3,
  Calculator,
  CalendarDays,
  Coins,
  DollarSign,
  PiggyBank,
  ShieldCheck,
  Star,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { SiteHeader } from "@/components/site-header";
import { ModuleSection } from "@/components/module-section";
import {
  ContextPanel,
  QuickActions,
  RelatedLinks,
  RecentActivity,
  SmartHints,
} from "@/components/experience";
import type { QuickActionItem } from "@/components/experience";
import type { RelatedLinkItem } from "@/components/experience";
import type { RecentActivityItem } from "@/components/experience";
import type { SmartHint } from "@/components/experience";
import { DashboardView } from "@/presentation/features/dashboard";
import { useAuth } from "@/presentation/features/auth";
import { RouteErrorBoundary, NotFoundState } from "@/components/error-state";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  errorComponent: RouteErrorBoundary,
  notFoundComponent: () => <NotFoundState />,
});

const QUICK_ACTIONS: QuickActionItem[] = [
  { label: "Carteira", to: "/carteira", icon: Wallet, description: "Posição consolidada" },
  { label: "Análise", to: "/analise", icon: BarChart3, description: "FIIs, rankings e setores" },
  {
    label: "Dividendos",
    to: "/dividendos",
    icon: CalendarDays,
    description: "Calendário de proventos",
  },
  { label: "Mercado", to: "/", icon: TrendingUp, description: "Cotações e índices" },
  { label: "Metas", to: "/metas", icon: Target, description: "Metas financeiras" },
  {
    label: "Provisionador",
    to: "/provisionador",
    icon: PiggyBank,
    description: "Projeção de dividendos",
  },
  { label: "Watchlist", to: "/watchlist", icon: Star, description: "Ativos monitorados" },
  { label: "Comparador", to: "/comparar", icon: Calculator, description: "Comparar ativos" },
];

const RELATED_LINKS: RelatedLinkItem[] = [
  {
    label: "Rebalanceamento",
    to: "/carteira/rebalanceamento",
    description: "Ajustar alocação da carteira",
  },
  {
    label: "Cobertura",
    to: "/carteira/cobertura",
    description: "Cobertura de proventos sobre despesas",
  },
  { label: "IRPF", to: "/irpf", description: "Apuração mensal de imposto de renda" },
  {
    label: "Configurações",
    to: "/carteira/configuracoes",
    description: "Preferências e metas de alocação",
  },
];

const RECENT_ACTIVITIES: RecentActivityItem[] = [
  {
    id: "1",
    title: "Dividendo recebido",
    description: "PETR4 — R$ 1,45 por cota",
    timestamp: "Hoje",
    icon: <Coins className="size-4 text-emerald-500" />,
  },
  {
    id: "2",
    title: "Compra executada",
    description: "15 cotas de VALE3 a R$ 68,20",
    timestamp: "Ontem",
    icon: <TrendingUp className="size-4 text-blue-500" />,
  },
  {
    id: "3",
    title: "Meta atualizada",
    description: "Reserva de emergência: 78% concluída",
    timestamp: "2 dias atrás",
    icon: <Target className="size-4 text-amber-500" />,
  },
  {
    id: "4",
    title: "Provento declarado",
    description: "ITUB4 — JCP de R$ 0,35 declarado",
    timestamp: "3 dias atrás",
    icon: <DollarSign className="size-4 text-emerald-500" />,
  },
  {
    id: "5",
    title: "Rebalanceamento sugerido",
    description: "Alocação em FIIs está 5% acima do alvo",
    timestamp: "5 dias atrás",
    icon: <ShieldCheck className="size-4 text-amber-500" />,
  },
];

const HINTS: SmartHint[] = [
  {
    id: "h1",
    title: "Revise suas metas",
    description:
      "Você está a 22% da meta de independência financeira. Que tal revisar seus aportes mensais?",
    type: "info",
  },
  {
    id: "h2",
    title: "Rebalanceamento pendente",
    description:
      "Sua alocação em renda variável está 8% acima do planejado. Considere rebalancear.",
    type: "warning",
    action: {
      label: "Ver rebalanceamento",
      onClick: () => (window.location.href = "/carteira/rebalanceamento"),
    },
  },
  {
    id: "h3",
    title: "Analise novos ativos",
    description: "Adicione ativos à sua watchlist para acompanhar oportunidades de entrada.",
    type: "tip",
    action: { label: "Ver watchlist", onClick: () => (window.location.href = "/watchlist") },
  },
];

const CONTEXT_SECTIONS = [
  {
    title: "Status da carteira",
    content: (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Diversificação</span>
          <span className="font-medium text-emerald-500">Boa</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Proventos no mês</span>
          <span className="font-medium">R$ 1.247,00</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Última atualização</span>
          <span className="font-medium text-muted-foreground">Hoje, 10:32</span>
        </div>
      </div>
    ),
    icon: <BarChart3 className="size-3" />,
  },
  {
    title: "Metas em andamento",
    content: (
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Reserva emergência</span>
          <span className="font-medium">R$ 15.000 / R$ 30.000</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-[50%] rounded-full bg-primary" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-muted-foreground">Independência financeira</span>
          <span className="font-medium">22%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-[22%] rounded-full bg-chart-2" />
        </div>
      </div>
    ),
    icon: <Target className="size-3" />,
  },
  {
    title: "Próximos eventos",
    content: (
      <div className="space-y-1 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">VALE3 — Dividendos</span>
          <span>10/08</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">ITUB4 — JCP</span>
          <span>15/08</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">KNCR11 — Rendimento</span>
          <span>20/08</span>
        </div>
      </div>
    ),
    icon: <CalendarDays className="size-3" />,
  },
];

function DashboardPage() {
  const { user } = useAuth();
  const { user: sessionUser } = useSession();
  const portfolioId = user?.id ?? "default-portfolio";
  const displayName = sessionUser?.email?.split("@")[0] ?? "Investidor";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Olá, {displayName}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Visão consolidada do seu patrimônio e acesso rápido aos módulos.
          </p>
        </div>

        <ModuleSection
          title="Acesso rápido"
          description="Navegue pelos principais módulos da plataforma"
          className="mb-6"
        >
          <QuickActions items={QUICK_ACTIONS} columns={4} />
        </ModuleSection>

        <div className="mb-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="min-w-0">
            <ModuleSection
              title="Sua carteira"
              description="Indicadores e evolução do seu patrimônio"
            >
              <DashboardView portfolioId={portfolioId} />
            </ModuleSection>
          </div>

          <aside className="space-y-4">
            <ContextPanel title="Resumo rápido" sections={CONTEXT_SECTIONS} />

            <RecentActivity title="Atividades recentes" items={RECENT_ACTIVITIES} maxItems={5} />
          </aside>
        </div>

        <ModuleSection
          title="Sugestões"
          description="Recomendações para sua carteira"
          className="mb-6"
        >
          <SmartHints hints={HINTS} />
        </ModuleSection>

        <ModuleSection title="Navegação relacionada" description="Acesse outras funcionalidades">
          <RelatedLinks items={RELATED_LINKS} />
        </ModuleSection>
      </main>
    </div>
  );
}
