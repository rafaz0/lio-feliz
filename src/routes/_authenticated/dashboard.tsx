import { useMemo } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  BarChart3,
  Calculator,
  CalendarDays,
  Coins,
  PiggyBank,
  Plus,
  Star,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
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
import { useDashboardQuery } from "@/presentation/features/dashboard/hooks/use-dashboard-query";
import { useDashboardInsights } from "@/presentation/features/intelligence";
import type { InsightViewModel } from "@/presentation/features/intelligence/types/intelligence.types";
import { RouteErrorBoundary, NotFoundState } from "@/components/error-state";
import { listOperations } from "@/lib/operations.functions";
import { getQuotes } from "@/lib/quotes.functions";
import { getExchangeRates } from "@/lib/exchange.server";
import { consolidatePortfolio } from "@/lib/portfolio";
import { formatBRL, formatDate } from "@/lib/format";

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

const SIDE_CONFIG: Record<string, { label: string; icon: React.ReactNode }> = {
  buy: { label: "Compra executada", icon: <TrendingUp className="size-4 text-blue-500" /> },
  sell: { label: "Venda executada", icon: <TrendingUp className="size-4 text-rose-500" /> },
  dividend: { label: "Provento recebido", icon: <Coins className="size-4 text-emerald-500" /> },
  bonus: { label: "Bonificação", icon: <Plus className="size-4 text-amber-500" /> },
};

function insightToHint(insight: InsightViewModel): SmartHint {
  const typeMap: Record<string, "info" | "tip" | "warning"> = {
    highlight: "tip",
    attention: "warning",
    info: "info",
  };
  return {
    id: insight.id,
    title: insight.title,
    description: insight.value ? `${insight.description} (${insight.value})` : insight.description,
    type: typeMap[insight.severity] ?? "info",
  };
}

function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { user: sessionUser } = useSession();
  const portfolioId = user?.id ?? "default-portfolio";
  const displayName = sessionUser?.email?.split("@")[0] ?? "Investidor";

  const list = useServerFn(listOperations);
  const fetchQuotes = useServerFn(getQuotes);
  const fetchRates = useServerFn(getExchangeRates);

  const { data: ops } = useQuery({
    queryKey: ["operations"],
    queryFn: () => list(),
  });

  const tickers = useMemo(() => {
    if (!ops) return [];
    return Array.from(new Set(ops.map((o) => o.ticker))).sort();
  }, [ops]);

  const { data: quotesData } = useQuery({
    queryKey: ["quotes", tickers],
    queryFn: () => fetchQuotes({ data: { tickers } }),
    enabled: tickers.length > 0,
    staleTime: 60_000,
    refetchInterval: 300_000,
  });

  const { data: exchangeRates } = useQuery({
    queryKey: ["exchange-rates"],
    queryFn: () => fetchRates(),
    staleTime: 300_000,
  });

  const priceOverrides = useMemo(() => {
    const map: Record<string, number> = {};
    if (quotesData?.quotes) {
      for (const [t, q] of Object.entries(quotesData.quotes)) {
        map[t] = q.price;
      }
    }
    return map;
  }, [quotesData]);

  const portfolio = useMemo(() => {
    if (!ops) return null;
    return consolidatePortfolio(ops, priceOverrides, exchangeRates);
  }, [ops, priceOverrides, exchangeRates]);

  const recentItems: RecentActivityItem[] = useMemo(() => {
    if (!ops || ops.length === 0) return [];
    const sorted = [...ops].sort(
      (a, b) => new Date(b.traded_at).getTime() - new Date(a.traded_at).getTime(),
    );
    return sorted.slice(0, 5).map((op) => {
      const cfg = SIDE_CONFIG[op.side] ?? { label: "Operação", icon: null };
      const total = op.side === "bonus" ? "" : ` — ${formatBRL(op.quantity * op.price)}`;
      return {
        id: op.id,
        title: cfg.label,
        description: `${op.ticker}${total}`,
        timestamp: formatDate(op.traded_at),
        icon: cfg.icon ?? undefined,
      };
    });
  }, [ops]);

  const totalDividends = useMemo(() => {
    if (!ops) return 0;
    return ops
      .filter((op) => op.side === "dividend")
      .reduce((sum, op) => sum + op.quantity * op.price, 0);
  }, [ops]);

  const lastDividend = useMemo(() => {
    if (!ops) return null;
    const divs = ops
      .filter((op) => op.side === "dividend")
      .sort((a, b) => new Date(b.traded_at).getTime() - new Date(a.traded_at).getTime());
    return divs.length > 0 ? divs[0] : null;
  }, [ops]);

  const uniqueAssets = portfolio?.positions.length ?? 0;
  const fiisCount = portfolio?.positions.filter((p) => p.asset_type === "fii").length ?? 0;
  const stockCount = portfolio?.positions.filter((p) => p.asset_type === "stock").length ?? 0;
  const activeOpsCount = ops?.length ?? 0;

  const contextSections = useMemo(() => {
    const sections: { title: string; icon: React.ReactNode; content: React.ReactNode }[] = [];

    sections.push({
      title: "Carteira",
      icon: <BarChart3 className="size-3" />,
      content: (
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Ativos</span>
            <span className="font-medium">{uniqueAssets}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Ações</span>
            <span className="font-medium">{stockCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">FIIs</span>
            <span className="font-medium">{fiisCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Operações</span>
            <span className="font-medium">{activeOpsCount}</span>
          </div>
        </div>
      ),
    });

    if (totalDividends > 0) {
      sections.push({
        title: "Proventos",
        icon: <Coins className="size-3" />,
        content: (
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total recebido</span>
              <span className="font-medium text-emerald-500">{formatBRL(totalDividends)}</span>
            </div>
            {lastDividend && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Último</span>
                <span className="font-medium">
                  {lastDividend.ticker} — {formatBRL(lastDividend.quantity * lastDividend.price)}
                </span>
              </div>
            )}
            {lastDividend && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Data</span>
                <span className="font-medium">{formatDate(lastDividend.traded_at)}</span>
              </div>
            )}
          </div>
        ),
      });
    }

    if (portfolio && portfolio.totalValue > 0) {
      sections.push({
        title: "Valores",
        icon: <Wallet className="size-3" />,
        content: (
          <div className="space-y-1.5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Patrimônio</span>
              <span className="font-medium">{formatBRL(portfolio.totalValue)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Investido</span>
              <span className="font-medium text-muted-foreground">
                {formatBRL(portfolio.totalInvested)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Rentabilidade</span>
              <span
                className={`font-medium ${portfolio.totalPnl >= 0 ? "text-emerald-500" : "text-rose-500"}`}
              >
                {portfolio.totalInvested > 0
                  ? `${portfolio.totalPnlPct >= 0 ? "+" : ""}${(portfolio.totalPnlPct * 100).toFixed(1)}%`
                  : "—"}
              </span>
            </div>
          </div>
        ),
      });
    }

    return sections;
  }, [
    portfolio,
    uniqueAssets,
    fiisCount,
    stockCount,
    activeOpsCount,
    totalDividends,
    lastDividend,
  ]);

  const { viewModel } = useDashboardQuery(portfolioId);
  const insights = useDashboardInsights(viewModel ?? null);
  const navigate = useMemo(() => (to: string) => router.navigate({ to }), [router]);

  const hints: SmartHint[] = useMemo(() => {
    const list: SmartHint[] = insights.map(insightToHint);

    if (list.length === 0) {
      list.push({
        id: "nav-mercado",
        title: "Explore o mercado",
        description: "Navegue por ações, FIIs e rankings para encontrar oportunidades.",
        type: "info",
      });
    }

    list.push({
      id: "nav-analise",
      title: "Análise completa",
      description: "Use o módulo de Análise para FIIs, rankings, setores e comparador.",
      type: "tip",
      action: { label: "Ver análise", onClick: () => navigate("/analise") },
    });

    return list;
  }, [insights, navigate]);

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
            {contextSections.length > 0 && (
              <ContextPanel title="Resumo rápido" sections={contextSections} />
            )}

            <RecentActivity title="Atividades recentes" items={recentItems} maxItems={5} />
          </aside>
        </div>

        <ModuleSection
          title="Sugestões"
          description="Recomendações para sua carteira"
          className="mb-6"
        >
          <SmartHints hints={hints} />
        </ModuleSection>

        <ModuleSection title="Navegação relacionada" description="Acesse outras funcionalidades">
          <RelatedLinks items={RELATED_LINKS} />
        </ModuleSection>
      </main>
    </div>
  );
}
