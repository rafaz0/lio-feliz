import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Calculator,
  CalendarDays,
  LineChart,
  PiggyBank,
  Star,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useSession } from "@/hooks/use-session";
import { SiteHeader } from "@/components/site-header";
import { ModuleSection } from "@/components/module-section";
import { Button } from "@/components/ui/button";
import { DashboardView } from "@/presentation/features/dashboard";
import { useAuth } from "@/presentation/features/auth";
import { RouteErrorBoundary, NotFoundState } from "@/components/error-state";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  errorComponent: RouteErrorBoundary,
  notFoundComponent: () => <NotFoundState />,
});

interface QuickAction {
  label: string;
  to: string;
  icon: typeof Wallet;
  description: string;
}

const QUICK_ACTIONS: QuickAction[] = [
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.to}
                  to={action.to}
                  className="group rounded-lg border border-border bg-card p-4 transition hover:bg-secondary hover:border-foreground/20"
                >
                  <Icon className="mb-2 size-5 text-muted-foreground transition group-hover:text-foreground" />
                  <h3 className="text-sm font-semibold">{action.label}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </ModuleSection>

        <ModuleSection title="Sua carteira" description="Indicadores e evolução do seu patrimônio">
          <DashboardView portfolioId={portfolioId} />
        </ModuleSection>

        <ModuleSection
          title="Alertas e notificações"
          description="Fique por dentro do que acontece com seus investimentos"
          className="mt-6"
        >
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center">
            <LineChart className="mb-3 size-8 text-muted-foreground/40" strokeWidth={1.5} />
            <h3 className="text-sm font-medium text-foreground">Nenhum alerta no momento</h3>
            <p className="mt-1 max-w-xs text-xs text-muted-foreground">
              Aqui aparecerão notificações sobre proventos, vencimentos, rebalanceamentos e
              recomendações inteligentes.
            </p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/carteira/rebalanceamento">Ver rebalanceamento</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/carteira/cobertura">Ver cobertura</Link>
              </Button>
            </div>
          </div>
        </ModuleSection>
      </main>
    </div>
  );
}
