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
import { DemoBadge } from "@/components/demo-badge";
import { isDemoSession } from "@/seed/demo-session";
import { SiteHeader } from "@/components/site-header";
import { ContextPanel, RecentActivity, SmartHints } from "@/components/experience";
import type { QuickActionItem } from "@/components/experience";
import type { RelatedLinkItem } from "@/components/experience";
import type { RecentActivityItem } from "@/components/experience";
import type { SmartHint } from "@/components/experience";
import { DashboardView, useDashboardQuery } from "@/presentation/features/dashboard";
import {
  toDashboardViewModel,
  type DashboardViewModel,
} from "@/presentation/features/dashboard/types/dashboard.view-model";
import type { PatrimonioDto, AlocacaoDto } from "@/application/dtos";
import type { HistoricoPatrimonialDto } from "@/application/dtos/historico";
import { SeuPlanoCard, PremiumBadge } from "@/presentation/features/subscriptions";
import { useAuth } from "@/presentation/features/auth";
import { useDashboardInsights } from "@/presentation/features/intelligence";
import type { InsightViewModel } from "@/presentation/features/intelligence/types/intelligence.types";
import { RouteErrorBoundary, NotFoundState } from "@/components/error-state";
import { listOperations } from "@/lib/operations.functions";
import { getQuotes } from "@/lib/quotes.functions";
import { getExchangeRates } from "@/lib/exchange.server";
import { consolidatePortfolio } from "@/lib/portfolio";
import { usePortfolioHistory } from "@/presentation/shared/hooks";
import { formatBRL, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
  errorComponent: RouteErrorBoundary,
  notFoundComponent: () => <NotFoundState />,
});

const QUICK_ACTIONS: (QuickActionItem & { premium?: boolean })[] = [
  { label: "Carteira", to: "/carteira", icon: Wallet, description: "Posição consolidada" },
  {
    label: "Análise",
    to: "/analise",
    icon: BarChart3,
    description: "FIIs, rankings e setores",
    premium: true,
  },
  {
    label: "Dividendos",
    to: "/dividendos",
    icon: CalendarDays,
    description: "Calendário de proventos",
  },
  { label: "Início", to: "/", icon: TrendingUp, description: "Cotações e índices" },
  { label: "Metas", to: "/metas", icon: Target, description: "Metas financeiras", premium: true },
  {
    label: "Provisionador",
    to: "/provisionador",
    icon: PiggyBank,
    description: "Projeção de dividendos",
    premium: true,
  },
  { label: "Watchlist", to: "/watchlist", icon: Star, description: "Ativos monitorados" },
  { label: "Comparador", to: "/comparar", icon: Calculator, description: "Comparar ativos" },
];

const RELATED_LINKS: (RelatedLinkItem & { premium?: boolean })[] = [
  {
    label: "Rebalanceamento",
    to: "/carteira/rebalanceamento",
    description: "Ajustar alocação da carteira",
    premium: true,
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
  const displayName =
    sessionUser?.user_metadata?.display_name ?? sessionUser?.email?.split("@")[0] ?? "Investidor";

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

  const { history } = usePortfolioHistory(ops, priceOverrides, exchangeRates);

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

  const viewModelFromPortfolio = useMemo<DashboardViewModel | null>(() => {
    if (!portfolio) return null;
    const patrimonio: PatrimonioDto = {
      patrimonioTotal: portfolio.totalValue,
      patrimonioInvestido: portfolio.totalInvested,
      saldoDisponivel: 0,
      moeda: "BRL",
      dataReferencia: new Date(),
      evolucaoMensal: portfolio.totalInvested > 0 ? portfolio.totalPnlPct : 0,
      alocacao: portfolio.typeAllocation.map((t) => ({
        classe: t.type,
        valor: t.value,
        percentual: t.pct,
      })),
    };
    const historico: HistoricoPatrimonialDto = {
      portfolioId,
      periodo: { inicio: new Date(0), fim: new Date() },
      pontos: history.map((h) => ({
        data: new Date(h.date + "T12:00:00"),
        patrimonioTotal: h.value,
        patrimonioInvestido: h.invested,
      })),
    };
    return toDashboardViewModel(patrimonio, historico);
  }, [portfolio, portfolioId, history]);

  const { viewModel } = useDashboardQuery(portfolioId);
  const viewModelToUse = viewModelFromPortfolio ?? viewModel;
  const insights = useDashboardInsights(viewModelToUse ?? null);
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

      <main className="mx-auto max-w-[1200px] px-4 py-6">
        {/* Nível 1: Cabeçalho compacto */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Olá, {displayName}</h1>
              {isDemoSession() && <DemoBadge />}
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Visão consolidada do seu patrimônio
            </p>
          </div>
          <SeuPlanoCard userId={user?.id ?? "dev-user-0000"} />
        </div>

        {isDemoSession() && (
          <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-2 text-xs text-amber-600">
            Você está usando uma conta demonstrativa. Os dados não serão salvos.{" "}
            <a href="/register" className="font-medium underline hover:no-underline">
              Crie sua conta gratuita
            </a>{" "}
            para manter seus dados.
          </div>
        )}

        {/* Nível 2: KPIs + Gráficos — área principal */}
        <div className="mb-8 space-y-5">
          <DashboardView portfolioId={portfolioId} viewModelOverride={viewModelFromPortfolio} />
        </div>

        {/* Nível 3: Informações complementares */}
        <div className="mb-8 grid gap-5 lg:grid-cols-2">
          {contextSections.length > 0 && (
            <div className="rounded-xl border bg-card p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Resumo da Carteira
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {contextSections.map((section, idx) => (
                  <div key={idx}>
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-foreground">
                      {section.icon}
                      {section.title}
                    </div>
                    {section.content}
                  </div>
                ))}
              </div>
            </div>
          )}

          <RecentActivity title="Atividades recentes" items={recentItems} maxItems={5} />
        </div>

        {/* Navegação rápida — toolbar horizontal */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <a
                  key={action.to}
                  href={action.to}
                  className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-secondary"
                >
                  <Icon className="size-3.5" />
                  {action.label}
                  {action.premium && <PremiumBadge size="sm" />}
                </a>
              );
            })}
          </div>
        </div>

        {/* Sugestões + Links Relacionados */}
        <div className="mb-8">
          <SmartHints hints={hints} />
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Navegação relacionada
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {RELATED_LINKS.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition hover:bg-secondary"
              >
                {link.label}
                {link.premium && <PremiumBadge size="sm" />}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
