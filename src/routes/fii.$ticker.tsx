import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Activity,
  ArrowLeft,
  Building2,
  ChartArea,
  Clock,
  Users,
  DollarSign,
  BarChart3,
  MapPin,
  TrendingUp,
  Waves,
} from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site-header";
import { getFii } from "@/lib/fii-mock-data";
import { getQuotes } from "@/lib/quotes.functions";
import { Button } from "@/components/ui/button";
import { calcAll } from "@/lib/technical-indicators";
import { formatBRL, formatDate, formatNumber } from "@/lib/format";

export const Route = createFileRoute("/fii/$ticker")({
  loader: ({ params }) => {
    const fii = getFii(params.ticker);
    if (!fii) throw notFound();
    return { fii };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "FII não encontrado — Investidor Pro" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const f = loaderData.fii;
    return {
      meta: [
        { title: `${f.ticker} · ${f.name} — Investidor Pro` },
        {
          name: "description",
          content: `${f.ticker} (${f.name}) — DY ${f.dy.toFixed(2)}%, P/VP ${f.pvp.toFixed(2)}, setor ${f.segment}.`,
        },
        { property: "og:title", content: `${f.ticker} — ${f.name}` },
        {
          property: "og:description",
          content: `FII ${f.ticker}: DY ${f.dy.toFixed(2)}%, P/VP ${f.pvp.toFixed(2)}, vacância ${f.vacancy.toFixed(1)}%.`,
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">FII não encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          Não encontramos esse código na nossa base de FIIs.
        </p>
        <Button asChild className="mt-6">
          <Link to="/fiis">Ver todos os FIIs</Link>
        </Button>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }: { error: Error; reset: () => void }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    console.error(error);
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <h1 className="text-3xl font-semibold">Erro ao carregar FII</h1>
          <p className="mt-2 text-muted-foreground">{error.message}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Tentar novamente
            </button>
            <Button asChild variant="outline">
              <Link to="/fiis">Ver todos os FIIs</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  },
  component: FiiPage,
});

function FiiPage() {
  const { fii } = Route.useLoaderData();
  const fetchQuotes = useServerFn(getQuotes);
  const quotesQuery = useQuery({
    queryKey: ["quotes", fii.ticker],
    queryFn: () => fetchQuotes({ data: { tickers: [fii.ticker] } }),
    refetchInterval: 300_000,
    staleTime: 60_000,
  });
  const liveQuote = quotesQuery.data?.quotes?.[fii.ticker];
  const currentPrice = liveQuote?.price ?? fii.price;
  const [divPeriod, setDivPeriod] = useState<string>("12m");
  const [pricePeriod, setPricePeriod] = useState<string>("1y");
  const [showSma, setShowSma] = useState(false);
  const [showEma, setShowEma] = useState(false);
  const [showBb, setShowBb] = useState(false);
  const [showRsi, setShowRsi] = useState(false);
  const [showMacd, setShowMacd] = useState(false);

  const filteredDividendHistory = useMemo(() => {
    const monthsMap: Record<string, number> = { "3m": 3, "6m": 6, "12m": 12, "24m": 24 };
    const months = monthsMap[divPeriod] ?? 12;
    const sorted = [...fii.dividendHistory].sort((a, b) => a.paidAt.localeCompare(b.paidAt));
    return sorted.slice(-months);
  }, [fii.dividendHistory, divPeriod]);

  const filteredHistory = useMemo(() => {
    const weeksMap: Record<string, number> = { "1m": 4, "3m": 13, "6m": 26, "1y": 52, "5y": 260 };
    const weeks = weeksMap[pricePeriod] ?? 52;
    return fii.history.slice(-weeks);
  }, [fii.history, pricePeriod]);

  const indicatorsData = useMemo(() => {
    if (!filteredHistory.length) return null;
    return calcAll(filteredHistory.map((d) => d.close));
  }, [filteredHistory]);

  const priceChartData = useMemo(() => {
    if (!indicatorsData) return filteredHistory;
    return filteredHistory.map((d, i) => ({
      ...d,
      sma20: indicatorsData.sma20[i],
      sma50: indicatorsData.sma50[i],
      sma200: indicatorsData.sma200[i],
      ema12: indicatorsData.ema12[i],
      ema26: indicatorsData.ema26[i],
      macd: indicatorsData.macd[i],
      macdSignal: indicatorsData.macdSignal[i],
      macdHistogram: indicatorsData.macdHistogram[i],
      bbUpper: indicatorsData.bbUpper[i],
      bbMiddle: indicatorsData.bbMiddle[i],
      bbLower: indicatorsData.bbLower[i],
    }));
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
        signal: indicatorsData.macdSignal[i],
        histogram: indicatorsData.macdHistogram[i],
      }))
      .filter((d) => d.macd !== null);
  }, [filteredHistory, indicatorsData]);

  const indicators = [
    {
      label: "Dividend Yield",
      value: `${fii.dy.toFixed(2)}%`,
      hint: "DY anualizado",
      icon: TrendingUp,
    },
    {
      label: "P/VP",
      value: fii.pvp.toFixed(2),
      hint: "Preço / Valor Patrimonial",
      icon: DollarSign,
    },
    {
      label: "Cap Rate",
      value: fii.capRate > 0 ? `${fii.capRate.toFixed(1)}%` : "—",
      hint: "Taxa de capitalização",
      icon: BarChart3,
    },
    {
      label: "Vacância",
      value: `${fii.vacancy.toFixed(1)}%`,
      hint: "Vacância física",
      icon: MapPin,
    },
    {
      label: "Vacância Média",
      value: `${fii.avgVacancy.toFixed(1)}%`,
      hint: "Média do setor",
      icon: MapPin,
    },
    {
      label: "Liquidez Diária",
      value:
        fii.dailyLiquidity >= 1_000_000
          ? `R$${(fii.dailyLiquidity / 1_000_000).toFixed(1)}M`
          : `R$${(fii.dailyLiquidity / 1_000).toFixed(0)}K`,
      hint: "Volume médio diário",
      icon: DollarSign,
    },
    {
      label: "Cotistas",
      value: formatNumber(fii.shareholders),
      hint: "Número de cotistas",
      icon: Users,
    },
    { label: "Segmento", value: fii.segment, hint: "Classificação", icon: Building2 },
  ];

  const divChartData = filteredDividendHistory.map((d) => ({
    date: d.paidAt.slice(0, 7),
    amount: d.amount,
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-4 py-8">
        <Link
          to="/fiis"
          className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Voltar aos FIIs
        </Link>

        <section className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{fii.ticker}</h1>
              <span className="rounded bg-secondary px-2 py-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                {fii.segment}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{fii.name}</p>
          </div>
          <div className="flex items-end gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Cotação</div>
              <div className="tabular mt-1 text-3xl font-bold">{formatBRL(currentPrice)}</div>
              {liveQuote?.updatedAt && (
                <div className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Clock className="size-3" />
                  {new Date(liveQuote.updatedAt).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              )}
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Dividend Yield
              </div>
              <div className="mt-1 text-2xl font-bold text-positive">{fii.dy.toFixed(2)}%</div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Indicadores
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {indicators.map((ind) => (
              <div key={ind.label} className="rounded-md border border-border bg-card p-3">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                  <ind.icon className="size-3" />
                  {ind.hint}
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">{ind.label}</div>
                <div className="tabular mt-1.5 text-lg font-semibold">{ind.value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Cotação</h2>
              <div className="flex items-center gap-1">
                {(["1m", "3m", "6m", "1y", "5y"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPricePeriod(p)}
                    className={
                      "rounded px-2 py-0.5 text-xs font-medium transition " +
                      (pricePeriod === p
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground")
                    }
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowSma(!showSma)}
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium transition ${
                  showSma
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Activity className="size-3" /> SMA
              </button>
              <button
                onClick={() => setShowEma(!showEma)}
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium transition ${
                  showEma
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <TrendingUp className="size-3" /> EMA
              </button>
              <button
                onClick={() => setShowBb(!showBb)}
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium transition ${
                  showBb
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Waves className="size-3" /> Bollinger
              </button>
              <button
                onClick={() => setShowRsi(!showRsi)}
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium transition ${
                  showRsi
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <ChartArea className="size-3" /> RSI
              </button>
              <button
                onClick={() => setShowMacd(!showMacd)}
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium transition ${
                  showMacd
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Activity className="size-3" /> MACD
              </button>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={priceChartData}
                  margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
                >
                  <CartesianGrid
                    stroke="var(--color-border)"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    stroke="var(--color-border)"
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    tickFormatter={(v: number) => `R$${v.toFixed(0)}`}
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
                  />
                  <Area
                    type="linear"
                    dataKey="close"
                    fill="var(--color-primary)"
                    fillOpacity={0.08}
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                  />
                  {showSma && (
                    <>
                      <Line
                        type="linear"
                        dataKey="sma20"
                        stroke="#f59e0b"
                        strokeWidth={1.5}
                        dot={false}
                        connectNulls
                      />
                      <Line
                        type="linear"
                        dataKey="sma50"
                        stroke="#3b82f6"
                        strokeWidth={1.5}
                        dot={false}
                        connectNulls
                      />
                      <Line
                        type="linear"
                        dataKey="sma200"
                        stroke="#8b5cf6"
                        strokeWidth={1.5}
                        dot={false}
                        connectNulls
                      />
                    </>
                  )}
                  {showEma && (
                    <>
                      <Line
                        type="linear"
                        dataKey="ema12"
                        stroke="#10b981"
                        strokeWidth={1.5}
                        dot={false}
                        connectNulls
                      />
                      <Line
                        type="linear"
                        dataKey="ema26"
                        stroke="#ef4444"
                        strokeWidth={1.5}
                        dot={false}
                        connectNulls
                      />
                    </>
                  )}
                  {showBb && (
                    <>
                      <Line
                        type="linear"
                        dataKey="bbUpper"
                        stroke="#a855f7"
                        strokeWidth={1}
                        strokeDasharray="4 4"
                        dot={false}
                        connectNulls
                      />
                      <Line
                        type="linear"
                        dataKey="bbMiddle"
                        stroke="#a855f7"
                        strokeWidth={1}
                        dot={false}
                        connectNulls
                      />
                      <Line
                        type="linear"
                        dataKey="bbLower"
                        stroke="#a855f7"
                        strokeWidth={1}
                        strokeDasharray="4 4"
                        dot={false}
                        connectNulls
                      />
                    </>
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            {showRsi && (
              <div className="mt-4 h-28 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={rsiData} margin={{ left: 8, right: 8, top: 4, bottom: 0 }}>
                    <CartesianGrid
                      stroke="var(--color-border)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis dataKey="date" hide />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                      width={30}
                      stroke="var(--color-border)"
                      ticks={[30, 50, 70]}
                    />
                    <ReferenceLine y={30} stroke="#ef4444" strokeDasharray="4 4" />
                    <ReferenceLine y={70} stroke="#10b981" strokeDasharray="4 4" />
                    <Line
                      type="linear"
                      dataKey="rsi"
                      stroke="#f59e0b"
                      strokeWidth={1.5}
                      dot={false}
                      connectNulls
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
            {showMacd && (
              <div className="mt-4 h-28 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={macdData} margin={{ left: 8, right: 8, top: 4, bottom: 0 }}>
                    <CartesianGrid
                      stroke="var(--color-border)"
                      strokeDasharray="3 3"
                      vertical={false}
                    />
                    <XAxis dataKey="date" hide />
                    <YAxis
                      tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                      width={40}
                      stroke="var(--color-border)"
                    />
                    <ReferenceLine y={0} stroke="var(--color-border)" />
                    <Bar dataKey="histogram" fill="var(--color-border)" opacity={0.6} />
                    <Line
                      type="linear"
                      dataKey="macd"
                      stroke="#3b82f6"
                      strokeWidth={1.5}
                      dot={false}
                      connectNulls
                    />
                    <Line
                      type="linear"
                      dataKey="signal"
                      stroke="#ef4444"
                      strokeWidth={1.5}
                      dot={false}
                      connectNulls
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
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
                  <CartesianGrid
                    stroke="var(--color-border)"
                    strokeDasharray="3 3"
                    vertical={false}
                  />
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
              <h2 className="text-sm font-semibold">Últimos dividendos</h2>
              <p className="text-xs text-muted-foreground">Últimos 12 meses</p>
            </div>
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Data</th>
                  <th className="px-4 py-2 text-right font-medium">Valor</th>
                </tr>
              </thead>
              <tbody>
                {fii.dividendHistory.map((d, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-2 text-muted-foreground">{formatDate(d.paidAt)}</td>
                    <td className="tabular px-4 py-2 text-right font-medium">
                      {formatBRL(d.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-sm font-semibold">Sobre {fii.ticker}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fii.description}</p>
        </section>
      </main>
    </div>
  );
}
