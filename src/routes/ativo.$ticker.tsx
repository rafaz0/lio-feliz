import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useMemo, type ReactNode } from "react";
import { Activity, ArrowLeft, BarChart3, ChartArea, Clock, Database, HelpCircle, Plus, Star, TrendingUp, Waves } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Area,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SiteHeader } from "@/components/site-header";
import { DeltaPct } from "@/components/delta-pct";
import { AddOperationDialog } from "@/components/add-operation-dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { getAssetData, getFinancialStatements } from "@/lib/data-functions";
import { fetchYahooNews, type FinancialStatements } from "@/lib/yahoo.server";
import { useWatchlist } from "@/lib/watchlist";
import { getQuotes } from "@/lib/quotes.functions";
import { calcAll } from "@/lib/technical-indicators";
import { Tooltip as UiTooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBRL, formatBRLCompact, formatDate } from "@/lib/format";

export const Route = createFileRoute("/ativo/$ticker")({
  loader: async ({ params }) => {
    const asset = await getAssetData({ data: { ticker: params.ticker } });
    if (!asset) throw notFound();
    const news = await fetchYahooNews(params.ticker);
    return { asset, news };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Ativo não encontrado — Investidor Pro" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const a = loaderData.asset;
    return {
      meta: [
        { title: `${a.ticker} · ${a.name} — Investidor Pro` },
        {
          name: "description",
          content: `Cotação, indicadores fundamentalistas e dividendos de ${a.ticker} (${a.name}). Setor: ${a.sector}.`,
        },
        { property: "og:title", content: `${a.ticker} — ${a.name}` },
        {
          property: "og:description",
          content: `Análise fundamentalista de ${a.ticker}: P/L, P/VP, DY, ROE e mais.`,
        },
      ],
    };
  },
  notFoundComponent: TickerNotFound,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <p className="text-negative">Erro ao carregar ativo: {error.message}</p>
    </div>
  ),
  component: AssetPage,
});

function TechButton({ icon, label, active, onClick }: { icon: ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-medium transition " +
        (active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:text-foreground")
      }
    >
      {icon} {label}
    </button>
  );
}

function FinStatementRow({ label, values }: { label: string; values: (string | null)[] }) {
  return (
    <tr className="border-t border-border text-xs">
      <td className="px-4 py-2 font-medium text-muted-foreground">{label}</td>
      {values.map((v, i) => (
        <td key={i} className="tabular px-4 py-2 text-right">{v ?? "—"}</td>
      ))}
    </tr>
  );
}

function FinStatementSection({ tab, data }: { tab: string; data: FinancialStatements | null | undefined }) {
  if (data === undefined) {
    return (
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="space-y-3">
          <Skeleton className="h-4 w-16" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex justify-between gap-4">
              <Skeleton className="h-3.5 w-20" />
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-3.5 w-16" />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center text-xs text-muted-foreground">
        Demonstrações financeiras não disponíveis para este ativo.
      </div>
    );
  }

  const rows: { label: string; values: (string | null)[] }[] = [];

  if (tab === "dre") {
    const years = data.incomeHistory.slice(0, 5);
    const fmt = (v: number | null) => v !== null ? formatBRLCompact(v) : null;
    rows.push(
      { label: "Receita Líquida", values: years.map((y) => fmt(y.totalRevenue)) },
      { label: "Lucro Bruto", values: years.map((y) => fmt(y.grossProfit)) },
      { label: "EBITDA", values: years.map((y) => fmt(y.ebitda)) },
      { label: "Lucro Líquido", values: years.map((y) => fmt(y.netIncome)) },
    );
  } else if (tab === "balanco") {
    const years = data.balanceSheetHistory.slice(0, 5);
    const fmt = (v: number | null) => v !== null ? formatBRLCompact(v) : null;
    rows.push(
      { label: "Ativo Total", values: years.map((y) => fmt(y.totalAssets)) },
      { label: "Passivo Total", values: years.map((y) => fmt(y.totalLiabilities)) },
      { label: "Patrimônio Líquido", values: years.map((y) => fmt(y.totalEquity)) },
    );
  } else {
    const years = data.cashFlowHistory.slice(0, 5);
    const fmt = (v: number | null) => v !== null ? formatBRLCompact(v) : null;
    rows.push(
      { label: "FCO", values: years.map((y) => fmt(y.operatingCashFlow)) },
      { label: "Capex", values: years.map((y) => fmt(y.capitalExpenditures)) },
      { label: "FCF", values: years.map((y) => fmt(y.freeCashFlow)) },
    );
  }

  const years = tab === "dre"
    ? data.incomeHistory.slice(0, 5)
    : tab === "balanco"
      ? data.balanceSheetHistory.slice(0, 5)
      : data.cashFlowHistory.slice(0, 5);

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-surface-2 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 text-left font-medium">Conta</th>
            {years.map((y) => (
              <th key={y.endDate} className="px-4 py-2.5 text-right font-medium">{y.endDate.slice(0, 4)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <FinStatementRow key={r.label} label={r.label} values={r.values} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const INDICATOR_INFO: Record<string, { formula: string; meaning: string; good: string; bad: string }> = {
  "P/L": {
    formula: "Preço ÷ LPA (Lucro por Ação)",
    meaning: "Quantos anos de lucro seriam necessários para recuperar o investimento.",
    good: "Ideal entre 5 e 15. Empresas consolidadas podem ter P/L mais alto.",
    bad: "Acima de 25 indica supervalorização. Abaixo de 5 pode indicar problema grave.",
  },
  "P/VP": {
    formula: "Preço ÷ VPA (Valor Patrimonial por Ação)",
    meaning: "Relação entre o preço de mercado e o valor contábil da empresa.",
    good: "Abaixo de 1 indica potencial de desconto (subvalorizada). Entre 1 e 3 é aceitável.",
    bad: "Acima de 3 pode indicar supervalorização (exceto empresas com intangíveis relevantes).",
  },
  "EV/EBITDA": {
    formula: "Valor da Firma ÷ EBITDA",
    meaning: "Mede quantos anos de EBITDA seriam necessários para pagar o valor total da empresa.",
    good: "Ideal abaixo de 10. Quanto menor, mais barata a empresa.",
    bad: "Acima de 15 indica empresa cara vs. seu potencial de geração de caixa.",
  },
  "PSR": {
    formula: "Preço ÷ Receita Líquida por Ação",
    meaning: "Relação entre o preço da ação e a receita gerada por ação.",
    good: "Ideal abaixo de 2. Empresas de crescimento podem ter PSR mais alto.",
    bad: "Acima de 5 indica que o mercado está pagando muito pela receita.",
  },
  "DY": {
    formula: "(Dividendos por Ação ÷ Preço) × 100",
    meaning: "Percentual do retorno em dividendos sobre o preço atual da ação.",
    good: "Entre 4% e 8% é saudável. Acima de 10% é excelente (mas verifique se é sustentável).",
    bad: "Abaixo de 2% é baixo para quem busca renda. Acima de 15% pode ser insustentável.",
  },
  "Payout": {
    formula: "(Dividendos ÷ Lucro Líquido) × 100",
    meaning: "Percentual do lucro distribuído como dividendos.",
    good: "Entre 25% e 50% é saudável. Empresas maduras podem pagar mais.",
    bad: "Acima de 100% indica que a empresa está pagando mais do que lucra (insustentável).",
  },
  "ROE": {
    formula: "(Lucro Líquido ÷ Patrimônio Líquido) × 100",
    meaning: "Retorno sobre o patrimônio líquido. Mede a eficiência da gestão.",
    good: "Acima de 15% é excelente. Entre 10% e 15% é bom.",
    bad: "Abaixo de 10% pode indicar gestão ineficiente ou negócio de baixa rentabilidade.",
  },
  "ROIC": {
    formula: "(Lucro Operacional ÷ Capital Investido) × 100",
    meaning: "Retorno sobre o capital investido. Mede a eficiência operacional.",
    good: "Acima de 15% é excelente (empresa com vantagem competitiva).",
    bad: "Abaixo de 10% indica destruição de valor ou negócio pouco competitivo.",
  },
  "Margem Líquida": {
    formula: "(Lucro Líquido ÷ Receita Líquida) × 100",
    meaning: "Percentual da receita que vira lucro líquido.",
    good: "Depende do setor. Acima de 10% é bom; acima de 20% é excelente.",
    bad: "Abaixo de 5% indica margens apertadas e baixa lucratividade.",
  },
  "Dív. Líq./EBITDA": {
    formula: "Dívida Líquida ÷ EBITDA",
    meaning: "Mede a alavancagem financeira e capacidade de pagar dívidas.",
    good: "Abaixo de 1 é baixa alavancagem (folga). Entre 1 e 3 é aceitável.",
    bad: "Acima de 3 indica endividamento elevado e risco de insolvência.",
  },
  "LPA": {
    formula: "Lucro Líquido ÷ Número de Ações",
    meaning: "Quanto do lucro total corresponde a cada ação.",
    good: "Quanto maior, melhor. Deve crescer ao longo do tempo.",
    bad: "LPA negativo significa prejuízo. Verifique a tendência histórica.",
  },
  "VPA": {
    formula: "Patrimônio Líquido ÷ Número de Ações",
    meaning: "Valor contábil de cada ação (quanto sobra por ação se a empresa fechar).",
    good: "Quanto maior, mais capital a empresa tem por ação.",
    bad: "VPA baixo ou negativo indica pouco patrimônio ou dívidas acumuladas.",
  },
  "CAGR Dividendos": {
    formula: "Taxa de crescimento anual composta dos dividendos",
    meaning: "Crescimento médio anual dos dividendos nos últimos anos.",
    good: "Acima de 5% é bom. Acima de 10% é excelente.",
    bad: "Abaixo de 0% significa que os dividendos estão caindo.",
  },
};

function computeRiskMetrics(history: { close: number }[]) {
  if (history.length < 20) return null;
  const closes = history.map((h) => h.close);
  const returns: number[] = [];
  for (let i = 1; i < closes.length; i++) {
    returns.push((closes[i] - closes[i - 1]) / closes[i - 1]);
  }
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + (b - mean) ** 2, 0) / returns.length;
  const dailyVol = Math.sqrt(variance);
  const annualizedVol = dailyVol * Math.sqrt(252);
  const totalReturn = (closes[closes.length - 1] - closes[0]) / closes[0];
  const years = history.length / 252;
  const annualReturn = Math.pow(1 + totalReturn, 1 / Math.max(years, 0.1)) - 1;
  const rf = 14.65 / 100;
  const sharpe = annualizedVol > 0 ? (annualReturn - rf) / annualizedVol : 0;
  let peak = closes[0];
  let maxDD = 0;
  for (const c of closes) {
    if (c > peak) peak = c;
    const dd = (peak - c) / peak;
    if (dd > maxDD) maxDD = dd;
  }
  return { volatility: annualizedVol * 100, sharpe, maxDrawdown: maxDD * 100 };
}

function TickerNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">Ativo não encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          Não encontramos esse ticker na nossa cobertura. Tente outro código B3.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Voltar ao mercado</Link>
        </Button>
      </div>
    </div>
  );
}

function AssetPage() {
  const { asset, news } = Route.useLoaderData();
  const { user } = useSession();
  const { toggle, isWatching } = useWatchlist();
  const [period, setPeriod] = useState<string>("1y");
  const [divPeriod, setDivPeriod] = useState<string>("12m");
  const fetchQuotes = useServerFn(getQuotes);
  const quotesQuery = useQuery({
    queryKey: ["quotes", asset.ticker],
    queryFn: () => fetchQuotes({ data: { tickers: [asset.ticker] } }),
    refetchInterval: 300_000,
    staleTime: 60_000,
  });

  const liveQuote = quotesQuery.data?.quotes?.[asset.ticker];
  const currentPrice = liveQuote?.price ?? asset.price;
  const currentChangePct = liveQuote?.changePct ?? asset.changeDayPct;
  const quotesUpdatedAt = liveQuote?.updatedAt;
  const isUp = currentChangePct >= 0;

  const filteredHistory = useMemo(() => {
    const weeksMap: Record<string, number> = { "1m": 4, "3m": 13, "6m": 26, "1y": 52, "5y": 260 };
    const weeks = weeksMap[period] ?? 52;
    return asset.history.slice(-weeks);
  }, [asset.history, period]);

  const divChartData = useMemo(() => {
    const monthsMap: Record<string, number> = { "3m": 3, "6m": 6, "12m": 12, "24m": 24 };
    const months = monthsMap[divPeriod] ?? 12;
    const cutoff = new Date();
    cutoff.setMonth(cutoff.getMonth() - months);
    const filtered = asset.dividends.filter((d) => new Date(d.paidAt) >= cutoff);
    return filtered.map((d) => ({ date: d.paidAt.slice(0, 7), amount: d.amount }));
  }, [asset.dividends, divPeriod]);

  const [finTab, setFinTab] = useState<"dre" | "balanco" | "fluxo">("dre");
  const fetchFinStmts = useServerFn(getFinancialStatements);
  const finQuery = useQuery({
    queryKey: ["fin-stmts", asset.ticker],
    queryFn: () => fetchFinStmts({ data: { ticker: asset.ticker } }),
    staleTime: 3_600_000,
  });

  const [showSma, setShowSma] = useState(false);
  const [showEma, setShowEma] = useState(false);
  const [showBb, setShowBb] = useState(false);
  const [showRsi, setShowRsi] = useState(false);
  const [showMacd, setShowMacd] = useState(false);

  const indicatorsData = useMemo(() => {
    if (!filteredHistory.length) return null;
    return calcAll(filteredHistory.map((d) => d.close));
  }, [filteredHistory]);

  const chartData = useMemo(() => {
    return (indicatorsData ? filteredHistory.map((d, i) => ({
      ...d,
      sma20: indicatorsData.sma20[i],
      sma50: indicatorsData.sma50[i],
      sma200: indicatorsData.sma200[i],
      ema12: indicatorsData.ema12[i],
      ema26: indicatorsData.ema26[i],
      bbUpper: indicatorsData.bbUpper[i],
      bbMiddle: indicatorsData.bbMiddle[i],
      bbLower: indicatorsData.bbLower[i],
    })) : filteredHistory) as Record<string, any>[];
  }, [filteredHistory, indicatorsData]);

  const rsiData = useMemo(() => {
    if (!indicatorsData) return [];
    return filteredHistory
      .map((d, i) => ({ date: d.date, rsi: indicatorsData.rsi14[i] }))
      .filter((d) => d.rsi !== null);
  }, [filteredHistory, indicatorsData]);

  const macdData = useMemo(() => {
    if (!indicatorsData) return [];
    return filteredHistory
      .map((d, i) => ({
        date: d.date,
        macd: indicatorsData.macd[i],
        macdSignal: indicatorsData.macdSignal[i],
        macdHistogram: indicatorsData.macdHistogram[i],
      }))
      .filter((d) => d.macd !== null);
  }, [filteredHistory, indicatorsData]);

  const indicators = [
    { label: "P/L", value: asset.fundamentals.pl.toFixed(1), hint: "Preço / Lucro", tag: "" },
    { label: "P/VP", value: asset.fundamentals.pvp.toFixed(2), hint: "Preço / Valor Patrimonial", tag: "" },
    { label: "EV/EBITDA", value: asset.fundamentals.evEbitda.toFixed(1), hint: "Valor da Firma / EBITDA", tag: "" },
    { label: "PSR", value: asset.fundamentals.psr.toFixed(2), hint: "Preço / Receita Líquida", tag: "" },
    { label: "DY", value: `${asset.fundamentals.dy.toFixed(2)}%`, hint: "Dividend Yield", tag: asset.fundamentals.dy >= 10 ? "top" : "" },
    { label: "Payout", value: `${asset.fundamentals.payout.toFixed(1)}%`, hint: "% do lucro distribuído", tag: "" },
    { label: "ROE", value: `${asset.fundamentals.roe.toFixed(1)}%`, hint: "Return on Equity", tag: "" },
    { label: "ROIC", value: `${asset.fundamentals.roic.toFixed(1)}%`, hint: "Return on Invested Capital", tag: "" },
    {
      label: "Margem Líquida",
      value: `${asset.fundamentals.margemLiquida.toFixed(1)}%`,
      hint: "Lucro Líquido / Receita",
      tag: "",
    },
    {
      label: "Dív. Líq./EBITDA",
      value: asset.fundamentals.divLiquidaEbitda.toFixed(2),
      hint: "Alavancagem",
      tag: asset.fundamentals.divLiquidaEbitda <= 1 ? "baixa" : asset.fundamentals.divLiquidaEbitda >= 3 ? "alta" : "",
    },
    { label: "LPA", value: formatBRL(asset.fundamentals.lpa), hint: "Lucro por ação", tag: "" },
    { label: "VPA", value: formatBRL(asset.fundamentals.vpa), hint: "Valor patrimonial por ação", tag: "" },
    {
      label: "CAGR Dividendos",
      value: `${asset.fundamentals.dividendCagr.toFixed(1)}%`,
      hint: "Crescimento anual de dividendos",
      tag: asset.fundamentals.dividendCagr >= 5 ? "cresc." : "",
    },
    {
      label: "Valor de mercado",
      value: formatBRLCompact(asset.fundamentals.marketCap),
      hint: "Market cap",
      tag: "",
    },
  ];

  const riskMetrics = useMemo(() => computeRiskMetrics(asset.history), [asset.history]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-8">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Voltar ao mercado
        </Link>

        {/* Header */}
        <section className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{asset.ticker}</h1>
              <span className="rounded bg-secondary px-2 py-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                {asset.sector}
              </span>
              <span className={"inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium uppercase " + (asset.isRealData ? "bg-positive/10 text-positive" : "bg-chart-4/10 text-chart-4")}>
                <Database className="size-2.5" />
                {asset.isRealData ? "dados reais" : "dados mock"}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{asset.name}</p>
          </div>
          <div className="flex items-end gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Cotação</div>
              <div className="tabular mt-1 text-3xl font-bold">{formatBRL(currentPrice)}</div>
              {quotesUpdatedAt && (
                <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="size-3" />
                  {new Date(quotesUpdatedAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Var. dia</div>
              <div className="mt-1 text-2xl">
                <DeltaPct value={currentChangePct} className="text-2xl" />
              </div>
            </div>
            <Button
              size="lg"
              variant={isWatching(asset.ticker) ? "default" : "outline"}
              className="gap-2"
              onClick={() => toggle(asset.ticker)}
            >
              <Star className={"size-4 " + (isWatching(asset.ticker) ? "fill-current" : "")} />
              {isWatching(asset.ticker) ? "Remover" : "Monitorar"}
            </Button>
            {user ? (
              <AddOperationDialog
                defaultTicker={asset.ticker}
                defaultPrice={currentPrice}
                trigger={
                  <Button size="lg" className="gap-2">
                    <Plus className="size-4" /> Adicionar à carteira
                  </Button>
                }
              />
            ) : (
              <Button asChild size="lg" variant="outline">
                <Link to="/auth">Entrar para operar</Link>
              </Button>
            )}
          </div>
        </section>

        {/* Indicators grid */}
        <TooltipProvider>
          <section className="mt-8">
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Indicadores fundamentalistas
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {indicators.map((i) => {
                const info = INDICATOR_INFO[i.label];
                return (
                  <div
                    key={i.label}
                    className="rounded-md border border-border bg-card p-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {i.hint}
                        </span>
                        {info && (
                          <UiTooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-flex cursor-help text-muted-foreground/50 transition hover:text-muted-foreground">
                                <HelpCircle className="size-3" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-[260px] space-y-1.5 p-3 text-left">
                              <p className="text-xs font-medium text-foreground">{i.label}</p>
                              <p className="text-[10px] text-foreground/70">{info.formula}</p>
                              <p className="text-[10px] leading-tight text-foreground/80">{info.meaning}</p>
                              <p className="text-[10px] leading-tight text-positive">{info.good}</p>
                              <p className="text-[10px] leading-tight text-negative">{info.bad}</p>
                            </TooltipContent>
                          </UiTooltip>
                        )}
                      </div>
                      {i.tag && (
                        <span className={
                          "rounded px-1 py-0.5 text-[9px] font-medium uppercase " +
                          (i.tag === "top" ? "bg-positive/10 text-positive" :
                           i.tag === "alta" ? "bg-negative/10 text-negative" :
                           i.tag === "baixa" ? "bg-positive/10 text-positive" :
                           i.tag === "cresc." ? "bg-chart-2/10 text-chart-2" : "bg-secondary text-muted-foreground")
                        }>
                          {i.tag}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-xs font-medium text-muted-foreground">{i.label}</div>
                    <div className="tabular mt-1.5 text-lg font-semibold">{i.value}</div>
                  </div>
                );
              })}
            </div>
          </section>

          {riskMetrics && (
            <section className="mt-4">
              <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Métricas de risco
              </h2>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 lg:grid-cols-3">
                <div className="rounded-md border border-border bg-card p-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Volatilidade</span>
                    <UiTooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex cursor-help text-muted-foreground/50 transition hover:text-muted-foreground">
                          <HelpCircle className="size-3" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px] space-y-1.5 p-3 text-left">
                        <p className="text-xs font-medium text-foreground">Volatilidade Anual</p>
                        <p className="text-[10px] leading-tight text-foreground/80">Desvio padrão anualizado dos retornos diários. Mede o risco do ativo.</p>
                        <p className="text-[10px] leading-tight text-positive">Abaixo de 20%: baixa volatilidade. Entre 20-35%: moderada.</p>
                        <p className="text-[10px] leading-tight text-negative">Acima de 35%: alta volatilidade (risco elevado).</p>
                      </TooltipContent>
                    </UiTooltip>
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">Anual</div>
                  <div className="tabular mt-1.5 text-lg font-semibold">{riskMetrics.volatility.toFixed(1)}%</div>
                </div>
                <div className="rounded-md border border-border bg-card p-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Drawdown Máx</span>
                    <UiTooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex cursor-help text-muted-foreground/50 transition hover:text-muted-foreground">
                          <HelpCircle className="size-3" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px] space-y-1.5 p-3 text-left">
                        <p className="text-xs font-medium text-foreground">Drawdown Máximo</p>
                        <p className="text-[10px] leading-tight text-foreground/80">Maior queda do pico ao vale no período analisado. Mede o pior cenário.</p>
                        <p className="text-[10px] leading-tight text-positive">Até -15%: baixo risco de queda. Entre -15% e -30%: moderado.</p>
                        <p className="text-[10px] leading-tight text-negative">Acima de -30%: alto risco de perda significativa.</p>
                      </TooltipContent>
                    </UiTooltip>
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">Histórico</div>
                  <div className="tabular mt-1.5 text-lg font-semibold text-negative">{riskMetrics.maxDrawdown.toFixed(1)}%</div>
                </div>
                <div className="rounded-md border border-border bg-card p-3">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Índice Sharpe</span>
                    <UiTooltip>
                      <TooltipTrigger asChild>
                        <span className="inline-flex cursor-help text-muted-foreground/50 transition hover:text-muted-foreground">
                          <HelpCircle className="size-3" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-[240px] space-y-1.5 p-3 text-left">
                        <p className="text-xs font-medium text-foreground">Índice Sharpe</p>
                        <p className="text-[10px] leading-tight text-foreground/80">(Retorno anual - CDI) ÷ Volatilidade. Mede retorno ajustado ao risco.</p>
                        <p className="text-[10px] leading-tight text-positive">Acima de 1: excelente. Entre 0.5 e 1: bom.</p>
                        <p className="text-[10px] leading-tight text-negative">Abaixo de 0.5: retorno insuficiente para o risco. Negativo: perde do CDI.</p>
                      </TooltipContent>
                    </UiTooltip>
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">Ajustado</div>
                  <div className={"tabular mt-1.5 text-lg font-semibold " + (riskMetrics.sharpe >= 0.5 ? "text-positive" : "text-negative")}>
                    {riskMetrics.sharpe.toFixed(2)}
                  </div>
                </div>
              </div>
            </section>
          )}
        </TooltipProvider>

        {/* Chart + dividends */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Cotação</h2>
              <div className="flex items-center gap-1">
                {(["1m", "3m", "6m", "1y", "5y"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={
                      "rounded px-2 py-0.5 text-xs font-medium transition " +
                      (period === p
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground")
                    }
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3 flex flex-wrap gap-1.5">
              <TechButton icon={<TrendingUp className="size-3" />} label="SMA" active={showSma} onClick={() => setShowSma(!showSma)} />
              <TechButton icon={<Activity className="size-3" />} label="EMA" active={showEma} onClick={() => setShowEma(!showEma)} />
              <TechButton icon={<Waves className="size-3" />} label="Bollinger" active={showBb} onClick={() => setShowBb(!showBb)} />
              <TechButton icon={<ChartArea className="size-3" />} label="RSI" active={showRsi} onClick={() => setShowRsi(!showRsi)} />
              <TechButton icon={<BarChart3 className="size-3" />} label="MACD" active={showMacd} onClick={() => setShowMacd(!showMacd)} />
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={isUp ? "var(--color-positive)" : "var(--color-negative)"}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="100%"
                        stopColor={isUp ? "var(--color-positive)" : "var(--color-negative)"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    tickFormatter={(d: string) => {
                      const [, m] = d.split("-");
                      return m;
                    }}
                    interval="preserveStartEnd"
                    minTickGap={30}
                    stroke="var(--color-border)"
                  />
                  <YAxis
                    yAxisId="price"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    domain={["dataMin - 2", "dataMax + 2"]}
                    tickFormatter={(v: number) => v.toFixed(0)}
                    width={40}
                    stroke="var(--color-border)"
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-popover)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 6,
                      fontSize: 12,
                    }}
                    labelFormatter={(l: string) => formatDate(l)}
                    formatter={(v: number, name: string) => {
                      const labels: Record<string, string> = {
                        close: "Fechamento",
                        sma20: "SMA 20", sma50: "SMA 50", sma200: "SMA 200",
                        ema12: "EMA 12", ema26: "EMA 26",
                        bbUpper: "BB Sup", bbMiddle: "BB Méd", bbLower: "BB Inf",
                      };
                      return [formatBRL(v), labels[name] ?? name];
                    }}
                  />
                  {showBb && chartData.length > 0 && chartData[0].bbUpper != null && (
                    <>
                      <Area yAxisId="price" type="monotone" dataKey="bbUpper" stroke="var(--color-chart-4)" strokeWidth={1} fill="none" dot={false} />
                      <Area yAxisId="price" type="monotone" dataKey="bbLower" stroke="var(--color-chart-4)" strokeWidth={1} fill="none" dot={false} />
                      <Area yAxisId="price" type="monotone" dataKey="bbMiddle" stroke="var(--color-chart-4)" strokeWidth={1} strokeDasharray="4 4" fill="none" dot={false} />
                    </>
                  )}
                  {showSma && (
                    <>
                      <Line yAxisId="price" type="monotone" dataKey="sma20" stroke="var(--color-chart-1)" strokeWidth={1.5} dot={false} connectNulls />
                      <Line yAxisId="price" type="monotone" dataKey="sma50" stroke="var(--color-chart-2)" strokeWidth={1.5} dot={false} connectNulls />
                      <Line yAxisId="price" type="monotone" dataKey="sma200" stroke="var(--color-chart-3)" strokeWidth={1.5} dot={false} connectNulls />
                    </>
                  )}
                  {showEma && (
                    <>
                      <Line yAxisId="price" type="monotone" dataKey="ema12" stroke="var(--color-positive)" strokeWidth={1.5} strokeDasharray="5 3" dot={false} connectNulls />
                      <Line yAxisId="price" type="monotone" dataKey="ema26" stroke="var(--color-negative)" strokeWidth={1.5} strokeDasharray="5 3" dot={false} connectNulls />
                    </>
                  )}
                  <Area
                    yAxisId="price"
                    type="monotone"
                    dataKey="close"
                    stroke={isUp ? "var(--color-positive)" : "var(--color-negative)"}
                    strokeWidth={2}
                    fill="url(#chartFill)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {showRsi && rsiData.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">RSI (14)</span>
                  <span className={"text-xs font-semibold " + (rsiData[rsiData.length - 1].rsi! >= 70 ? "text-negative" : rsiData[rsiData.length - 1].rsi! <= 30 ? "text-positive" : "")}>
                    {rsiData[rsiData.length - 1].rsi!.toFixed(1)}
                  </span>
                </div>
                <div className="h-20 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={rsiData} margin={{ left: 8, right: 8, top: 4, bottom: 0 }}>
                      <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" hide />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 9 }} width={20} stroke="var(--color-border)" ticks={[30, 50, 70]} />
                      <ReferenceLine y={70} stroke="var(--color-negative)" strokeDasharray="3 3" strokeOpacity={0.5} />
                      <ReferenceLine y={30} stroke="var(--color-positive)" strokeDasharray="3 3" strokeOpacity={0.5} />
                      <Line type="monotone" dataKey="rsi" stroke="var(--color-chart-1)" strokeWidth={1.5} dot={false} connectNulls />
                      <Tooltip
                        contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 11 }}
                        labelFormatter={(l: string) => formatDate(l)}
                        formatter={(v: number) => [v.toFixed(1), "RSI"]}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {showMacd && macdData.length > 0 && (
              <div className="mt-4 border-t border-border pt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">MACD</span>
                  <span className="text-xs font-semibold">{macdData[macdData.length - 1].macd!.toFixed(2)}</span>
                </div>
                <div className="h-24 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={macdData} margin={{ left: 8, right: 8, top: 4, bottom: 0 }}>
                      <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" hide />
                      <YAxis tick={{ fontSize: 9 }} width={30} stroke="var(--color-border)" />
                      <Bar dataKey="macdHistogram" fill="var(--color-chart-4)" opacity={0.6} />
                      <Line type="monotone" dataKey="macd" stroke="var(--color-chart-1)" strokeWidth={1.5} dot={false} connectNulls />
                      <Line type="monotone" dataKey="macdSignal" stroke="var(--color-chart-2)" strokeWidth={1.5} dot={false} connectNulls />
                      <Tooltip
                        contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 11 }}
                        labelFormatter={(l: string) => formatDate(l)}
                        formatter={(v: number, name: string) => {
                          const labels: Record<string, string> = { macd: "MACD", macdSignal: "Sinal", macdHistogram: "Hist." };
                          return [v.toFixed(2), labels[name] ?? name];
                        }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold">Histórico de Dividendos</h2>
                <div className="flex items-center gap-1">
                  {(["3m", "6m", "12m", "24m"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setDivPeriod(p)}
                      className={
                        "rounded px-2 py-0.5 text-xs font-medium transition " +
                        (divPeriod === p
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground")
                      }
                    >
                      {p.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={divChartData} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                    <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                      stroke="var(--color-border)"
                    />
                    <YAxis
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                      tickFormatter={(v: number) => `R$${v.toFixed(1)}`}
                      width={50}
                      stroke="var(--color-border)"
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                      formatter={(v: number) => [formatBRL(v), "Dividendo"]}
                    />
                    <Bar dataKey="amount" fill="var(--color-positive)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="border-b border-border bg-surface-2 px-4 py-3">
                <h2 className="text-sm font-semibold">Últimos proventos</h2>
                <p className="text-xs text-muted-foreground">Por ação, últimos 12 meses</p>
              </div>
              <table className="w-full text-sm">
                <thead className="text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 text-left font-medium">Data</th>
                    <th className="px-4 py-2 text-left font-medium">Tipo</th>
                    <th className="px-4 py-2 text-right font-medium">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {asset.dividends.map((d: typeof asset.dividends[number], i: number) => (
                    <tr key={i} className="border-t border-border">
                      <td className="px-4 py-2 text-muted-foreground">{formatDate(d.paidAt)}</td>
                      <td className="px-4 py-2">{d.type}</td>
                      <td className="tabular px-4 py-2 text-right">{formatBRL(d.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-sm font-semibold">Sobre {asset.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{asset.description}</p>
        </section>

        {/* Financial Statements */}
        <section className="mt-8">
          <div className="mb-3 flex items-center gap-1">
            {(["dre", "balanco", "fluxo"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFinTab(tab)}
                className={
                  "rounded px-3 py-1.5 text-xs font-medium transition " +
                  (finTab === tab
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground")
                }
              >
                {tab === "dre" ? "DRE" : tab === "balanco" ? "Balanço Patrimonial" : "Fluxo de Caixa"}
              </button>
            ))}
          </div>
          <FinStatementSection tab={finTab} data={finQuery.data} />
        </section>

        {news.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Fatos Relevantes</h2>
            <div className="space-y-3">
              {news.map((n, i) => (
                <article key={i} className="rounded-lg border border-border bg-card p-4 transition hover:bg-surface">
                  <div className="mb-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <span>{n.source}</span>
                    <span>·</span>
                    <span>{n.date}</span>
                  </div>
                  <p className="text-sm leading-snug">{n.title}</p>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
