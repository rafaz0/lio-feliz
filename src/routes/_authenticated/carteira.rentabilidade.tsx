import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { LineChart as LineChartIcon, TrendingUp, Shield, BarChart3 } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { listOperations } from "@/lib/operations.functions";
import { getQuotes } from "@/lib/quotes.functions";
import { getBenchmarkData, type BenchmarkPoint } from "@/lib/data-functions";
import { buildPortfolioHistory } from "@/lib/portfolio";
import { formatDate, formatBRL } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/carteira/rentabilidade")({
  head: () => ({
    meta: [
      { title: "Rentabilidade — Investidor Pro" },
      {
        name: "description",
        content:
          "Rentabilidade da sua carteira comparada aos principais benchmarks: IBOV, CDI e IDIV.",
      },
    ],
  }),
  component: RentabilidadePage,
});

function RentabilidadePage() {
  const list = useServerFn(listOperations);
  const fetchQuotes = useServerFn(getQuotes);
  const fetchBenchmark = useServerFn(getBenchmarkData);
  const { data: ops, isLoading } = useQuery({ queryKey: ["operations"], queryFn: () => list() });

  const tickers = Array.from(new Set((ops ?? []).map((o) => o.ticker))).sort();
  const quotesQuery = useQuery({
    queryKey: ["quotes", tickers],
    queryFn: () => fetchQuotes({ data: { tickers } }),
    enabled: tickers.length > 0,
    staleTime: 60_000,
    refetchInterval: 300_000,
    refetchOnWindowFocus: false,
  });

  const { data: benchmarkData } = useQuery({
    queryKey: ["benchmark"],
    queryFn: () => fetchBenchmark(),
    staleTime: 3_600_000,
  });

  const priceOverrides = useMemo(() => {
    const map: Record<string, number> = {};
    for (const [t, q] of Object.entries(quotesQuery.data?.quotes ?? {})) {
      map[t] = q.price;
    }
    return map;
  }, [quotesQuery.data]);

  const history = useMemo(
    () => buildPortfolioHistory(ops ?? [], priceOverrides),
    [ops, priceOverrides],
  );

  // Derived values (computed eagerly so useMemo order is stable before early returns)
  const firstDate = history[0]?.date;
  const lastDate = history[history.length - 1]?.date;
  const portBase = history[0]?.value ?? 0;
  const portBaseSafe = portBase > 0 ? portBase : 1;

  const chartData = useMemo(() => {
    if (!benchmarkData || !firstDate || !lastDate || history.length < 2) return null;
    return benchmarkData
      .filter((b) => b.date >= firstDate && b.date <= lastDate)
      .map((b) => {
        const portPoint = history.find((h) => h.date === b.date);
        return {
          date: b.date,
          ibov: b.ibov,
          idiv: b.idiv,
          ifix: b.ifix,
          portfolio: portPoint ? (portPoint.value / portBaseSafe) * 1000 : null,
        };
      });
  }, [benchmarkData, history, firstDate, lastDate, portBaseSafe]);

  const metrics = useMemo(() => {
    if (history.length < 4) return null;
    const values = history.map((h) => h.value);
    const returns: number[] = [];
    for (let i = 1; i < values.length; i++) returns.push(values[i] / values[i - 1] - 1);

    const avgReturn = returns.reduce((s, r) => s + r, 0) / returns.length;
    const variance = returns.reduce((s, r) => s + (r - avgReturn) ** 2, 0) / returns.length;
    const volatility = Math.sqrt(variance) * Math.sqrt(52);
    const riskFree = 0.1475;

    let maxDrawdown = 0;
    let peak = values[0];
    for (const v of values) {
      if (v > peak) peak = v;
      const dd = (peak - v) / peak;
      if (dd > maxDrawdown) maxDrawdown = dd;
    }

    let beta: number | null = null;
    if (chartData && chartData.length > 4) {
      const portRet: number[] = [];
      const benchRet: number[] = [];
      for (let i = 1; i < chartData.length; i++) {
        const pp = chartData[i].portfolio;
        const pb = chartData[i - 1].portfolio;
        const bi = chartData[i].ibov;
        const bb = chartData[i - 1].ibov;
        if (pp !== null && pb !== null && pb > 0 && bi > 0 && bb > 0) {
          portRet.push(pp / pb - 1);
          benchRet.push(bi / bb - 1);
        }
      }
      if (portRet.length > 4) {
        const avgP = portRet.reduce((s, r) => s + r, 0) / portRet.length;
        const avgB = benchRet.reduce((s, r) => s + r, 0) / benchRet.length;
        let cov = 0,
          varB = 0;
        for (let i = 0; i < portRet.length; i++) {
          cov += (portRet[i] - avgP) * (benchRet[i] - avgB);
          varB += (benchRet[i] - avgB) ** 2;
        }
        if (varB > 0) beta = cov / varB;
      }
    }

    const sharpe = volatility > 0 ? (avgReturn * 52 - riskFree) / volatility : null;
    const portEnd = history[history.length - 1].value;
    const portReturn = portBase > 0 ? (portEnd / portBase - 1) * 100 : 0;

    let ibovReturn: number | null = null;
    let idivReturn: number | null = null;
    let ifixReturn: number | null = null;
    if (chartData && chartData.length >= 2) {
      const first = chartData[0];
      const last = chartData[chartData.length - 1];
      if (first.ibov > 0) ibovReturn = ((last.ibov - first.ibov) / first.ibov) * 100;
      if (first.idiv > 0) idivReturn = ((last.idiv - first.idiv) / first.idiv) * 100;
      if (first.ifix > 0) ifixReturn = ((last.ifix - first.ifix) / first.ifix) * 100;
    }

    return {
      volatility,
      maxDrawdown,
      beta,
      sharpe,
      portReturn,
      ibovReturn,
      idivReturn,
      ifixReturn,
    };
  }, [history, chartData]);

  if (isLoading || !ops) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-64 w-full" />
        <div className="grid gap-4 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    );
  }

  if (history.length < 2) {
    return (
      <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
        <TrendingUp className="mx-auto size-8 text-muted-foreground" />
        <h2 className="mt-3 text-lg font-semibold">Histórico insuficiente</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
          Registre mais operações na aba Lançamentos para ver comparativos de rentabilidade.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {metrics && (
        <section className="grid gap-3 sm:grid-cols-4">
          <KpiCard
            label="Retorno da carteira"
            value={`${metrics.portReturn >= 0 ? "+" : ""}${metrics.portReturn.toFixed(2)}%`}
            tone={metrics.portReturn >= 0 ? "positive" : "negative"}
          />
          <KpiCard
            label="IBOV no período"
            value={
              metrics.ibovReturn !== null
                ? `${metrics.ibovReturn >= 0 ? "+" : ""}${metrics.ibovReturn.toFixed(2)}%`
                : "—"
            }
            tone={metrics.ibovReturn !== null && metrics.ibovReturn >= 0 ? "positive" : "negative"}
          />
          <KpiCard
            label="IDIV no período"
            value={
              metrics.idivReturn !== null
                ? `${metrics.idivReturn >= 0 ? "+" : ""}${metrics.idivReturn.toFixed(2)}%`
                : "—"
            }
            tone={metrics.idivReturn !== null && metrics.idivReturn >= 0 ? "positive" : "negative"}
          />
          <KpiCard label="CDI (ref. 14.75% a.a.)" value="+14.75%" tone="positive" />
        </section>
      )}

      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <LineChartIcon className="size-4 text-chart-4" />
          <h2 className="text-sm font-semibold">Rentabilidade vs. Mercado (base 1000)</h2>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">
          Comparação da sua carteira com os principais índices brasileiros
        </p>
        <div className="h-64 w-full">
          {chartData && chartData.length > 1 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <CartesianGrid
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  tickFormatter={(d: string) => {
                    const [y, m] = d.split("-");
                    return `${m}/${y.slice(2)}`;
                  }}
                  interval="preserveStartEnd"
                  minTickGap={40}
                  stroke="var(--color-border)"
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  domain={["dataMin - 50", "dataMax + 50"]}
                  tickFormatter={(v: number) => v.toFixed(0)}
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
                  labelFormatter={(l: string) => formatDate(l)}
                  formatter={(v: number, name: string) => {
                    const labels: Record<string, string> = {
                      portfolio: "Carteira",
                      ibov: "IBOV",
                      idiv: "IDIV",
                      ifix: "IFIX",
                    };
                    return [`${v.toFixed(1)}`, labels[name] ?? name];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="portfolio"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="ibov"
                  stroke="var(--color-chart-3)"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="4 3"
                />
                <Line
                  type="monotone"
                  dataKey="idiv"
                  stroke="var(--color-positive)"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="4 3"
                />
                <Line
                  type="monotone"
                  dataKey="ifix"
                  stroke="var(--color-chart-4)"
                  strokeWidth={1.5}
                  dot={false}
                  strokeDasharray="4 3"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              Aguardando dados de benchmark...
            </div>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-sm"
              style={{ background: "var(--color-primary)" }}
            />{" "}
            Carteira
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-sm"
              style={{ background: "var(--color-chart-3)" }}
            />{" "}
            IBOV
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-sm"
              style={{ background: "var(--color-positive)" }}
            />{" "}
            IDIV
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block size-2.5 rounded-sm"
              style={{ background: "var(--color-chart-4)" }}
            />{" "}
            IFIX
          </span>
        </div>
      </section>

      {metrics && (
        <section className="grid gap-3 sm:grid-cols-4">
          <KpiCard
            label="Volatilidade (anual)"
            value={`${(metrics.volatility * 100).toFixed(1)}%`}
          />
          <KpiCard
            label="Drawdown máx."
            value={`${(metrics.maxDrawdown * 100).toFixed(1)}%`}
            tone="negative"
          />
          {metrics.beta !== null && (
            <KpiCard
              label="Beta (vs IBOV)"
              value={metrics.beta.toFixed(2)}
              tone={metrics.beta < 1 ? "positive" : metrics.beta > 1.2 ? "negative" : undefined}
            />
          )}
          {metrics.sharpe !== null && (
            <KpiCard
              label="Índice Sharpe"
              value={metrics.sharpe.toFixed(2)}
              tone={
                metrics.sharpe >= 0.5 ? "positive" : metrics.sharpe < 0 ? "negative" : undefined
              }
            />
          )}
        </section>
      )}

      <div className="rounded-lg border border-dashed border-border p-4">
        <div className="flex items-start gap-3">
          <Shield className="size-5 shrink-0 text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium">Rentabilidade passada não garante retorno futuro</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Este comparativo usa dados históricos da sua carteira e benchmarks. O CDI é usado como
              referência de renda fixa (taxa Selic atual de 14.75% a.a.).
            </p>
          </div>
        </div>
      </div>

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <BarChart3 className="mt-0.5 size-3.5 shrink-0" />
        Benchmarks via Yahoo Finance — IBOV (^BVSP), IDIV (^IDIV), IFIX (IFIX.SA). Base 1000
        normalizada.
      </p>
    </div>
  );
}

function KpiCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: React.ReactNode;
  tone?: "positive" | "negative";
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={`tabular mt-2 text-2xl font-bold ${tone === "positive" ? "text-positive" : tone === "negative" ? "text-negative" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
