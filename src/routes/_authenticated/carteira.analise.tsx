import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, TrendingUp, BarChart3, ShieldAlert, Activity } from "lucide-react";
import { listOperations } from "@/lib/operations.functions";
import { getQuotes } from "@/lib/quotes.functions";
import { getBenchmarkData } from "@/lib/data-functions";
import { getExchangeRates } from "@/lib/exchange.server";
import { ConsultarCarteiraService } from "@/application/services/consultar-carteira-service";
import { usePortfolioHistory } from "@/presentation/shared/hooks";
import { formatBRL, formatDate } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { RouteErrorBoundary, NotFoundState } from "@/components/error-state";
import { APP_NAME } from "@/lib/brand";

export const Route = createFileRoute("/_authenticated/carteira/analise")({
  errorComponent: RouteErrorBoundary,
  notFoundComponent: () => <NotFoundState />,
  head: () => ({
    meta: [
      { title: `Análise de Risco — ${APP_NAME}` },
      {
        name: "description",
        content:
          "Análise de risco da carteira: volatilidade, Sharpe, drawdown máximo, beta e correlação com o mercado.",
      },
    ],
  }),
  component: AnalisePage,
});

function AnalisePage() {
  const list = useServerFn(listOperations);
  const fetchQuotes = useServerFn(getQuotes);
  const fetchRates = useServerFn(getExchangeRates);

  const { data: ops, isLoading } = useQuery({
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

  const fetchBenchmark = useServerFn(getBenchmarkData);
  const { data: benchmarkData } = useQuery({
    queryKey: ["benchmark"],
    queryFn: () => fetchBenchmark(),
    staleTime: 3_600_000,
    enabled: !!ops,
  });

  const priceOverrides: Record<string, number> = {};
  if (quotesData?.quotes) {
    for (const [t, q] of Object.entries(quotesData.quotes)) {
      priceOverrides[t] = q.price;
    }
  }

  const { history } = usePortfolioHistory(ops, priceOverrides, exchangeRates);

  const portfolio = useMemo(
    () => (ops ? new ConsultarCarteiraService().execute(ops, priceOverrides, exchangeRates) : null),
    [ops, priceOverrides, exchangeRates],
  );

  const benchmarkChartData = useMemo(() => {
    if (!benchmarkData || history.length < 2) return null;
    const firstDate = history[0].date;
    const lastDate = history[history.length - 1].date;
    const portBase = history[0].value;
    if (portBase === 0) return null;
    return benchmarkData
      .filter((b) => b.date >= firstDate && b.date <= lastDate)
      .map((b) => {
        const portPoint = history.find((h) => h.date === b.date);
        return {
          date: b.date,
          ibov: b.ibov,
          idiv: b.idiv,
          portfolio: portPoint ? (portPoint.value / portBase) * 1000 : null,
        };
      });
  }, [benchmarkData, history]);

  const riskMetrics = useMemo(() => {
    if (history.length < 4) return null;

    const values = history.map((h) => h.value);
    const returns: number[] = [];
    for (let i = 1; i < values.length; i++) {
      returns.push(values[i] / values[i - 1] - 1);
    }
    const avgReturn = returns.reduce((s, r) => s + r, 0) / returns.length;
    const variance = returns.reduce((s, r) => s + (r - avgReturn) ** 2, 0) / returns.length;
    const volatility = Math.sqrt(variance) * Math.sqrt(52);
    const riskFree = 0.1475;

    let maxDrawdown = 0;
    let peak = values[0];
    for (const v of values) {
      if (v > peak) peak = v;
      const drawdown = (peak - v) / peak;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    }

    let beta: number | null = null;
    if (benchmarkChartData && benchmarkChartData.length > 4) {
      const portReturns: number[] = [];
      const benchReturns: number[] = [];
      for (let i = 1; i < benchmarkChartData.length; i++) {
        const pp = benchmarkChartData[i].portfolio;
        const pb = benchmarkChartData[i - 1].portfolio;
        const bi = benchmarkChartData[i].ibov;
        const bb = benchmarkChartData[i - 1].ibov;
        if (pp !== null && pb !== null && pb > 0 && bi > 0 && bb > 0) {
          portReturns.push(pp / pb - 1);
          benchReturns.push(bi / bb - 1);
        }
      }
      if (portReturns.length > 4) {
        const avgPort = portReturns.reduce((s, r) => s + r, 0) / portReturns.length;
        const avgBench = benchReturns.reduce((s, r) => s + r, 0) / benchReturns.length;
        let cov = 0,
          varBench = 0;
        for (let i = 0; i < portReturns.length; i++) {
          cov += (portReturns[i] - avgPort) * (benchReturns[i] - avgBench);
          varBench += (benchReturns[i] - avgBench) ** 2;
        }
        if (varBench > 0) beta = cov / varBench;
      }
    }

    const sharpe = volatility > 0 ? (avgReturn * 52 - riskFree) / volatility : null;

    return { volatility, maxDrawdown, beta, sharpe, avgReturn };
  }, [history, benchmarkChartData]);

  const drawdownSeries = useMemo(() => {
    if (history.length < 2) return [];
    let peak = history[0].value;
    return history.map((h) => {
      if (h.value > peak) peak = h.value;
      const dd = peak > 0 ? ((h.value - peak) / peak) * 100 : 0;
      return { date: h.date, drawdown: dd };
    });
  }, [history]);

  const allocationData = useMemo(() => {
    if (!portfolio) return null;
    const byType = portfolio.typeAllocation.map((t) => ({
      name: t.type,
      value: t.value,
      pct: t.pct,
    }));
    const bySector = portfolio.sectorAllocation.map((s) => ({
      name: s.sector,
      value: s.value,
      pct: s.pct,
    }));
    return { byType, bySector };
  }, [portfolio]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-56" />
        <div className="grid gap-3 sm:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const hasData = history.length > 1 && portfolio && portfolio.positions.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BarChart3 className="size-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Análise de Risco</h1>
      </div>

      {!hasData ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
          <Activity className="mx-auto mb-3 size-8 text-muted-foreground/40" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground">
            Registre operações na sua carteira para ver a análise de risco.
          </p>
        </div>
      ) : (
        <>
          {riskMetrics && (
            <section className="grid gap-3 sm:grid-cols-4">
              <MetricCard
                label="Volatilidade (anual)"
                value={`${(riskMetrics.volatility * 100).toFixed(1)}%`}
                icon={<TrendingUp className="size-3.5" />}
                tone={
                  riskMetrics.volatility < 0.2
                    ? "positive"
                    : riskMetrics.volatility > 0.35
                      ? "negative"
                      : "default"
                }
              />
              <MetricCard
                label="Índice Sharpe"
                value={riskMetrics.sharpe !== null ? riskMetrics.sharpe.toFixed(2) : "—"}
                icon={<Activity className="size-3.5" />}
                tone={
                  riskMetrics.sharpe !== null
                    ? riskMetrics.sharpe >= 0.5
                      ? "positive"
                      : riskMetrics.sharpe < 0
                        ? "negative"
                        : "default"
                    : "default"
                }
              />
              <MetricCard
                label="Drawdown Máximo"
                value={`${(riskMetrics.maxDrawdown * 100).toFixed(1)}%`}
                icon={<AlertTriangle className="size-3.5" />}
                tone="negative"
              />
              <MetricCard
                label="Beta (vs IBOV)"
                value={riskMetrics.beta !== null ? riskMetrics.beta.toFixed(2) : "—"}
                icon={<ShieldAlert className="size-3.5" />}
                tone={
                  riskMetrics.beta !== null
                    ? riskMetrics.beta < 1
                      ? "positive"
                      : riskMetrics.beta > 1.2
                        ? "negative"
                        : "default"
                    : "default"
                }
              />
            </section>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {drawdownSeries.length > 1 && (
              <section className="rounded-lg border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <TrendingUp className="size-3.5" /> Drawdown ao longo do tempo
                </div>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={drawdownSeries}
                      margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="ddFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-negative)" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="var(--color-negative)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
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
                        tickFormatter={(v: number) => `${v.toFixed(1)}%`}
                        domain={["dataMin - 2", 2]}
                        width={60}
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
                        formatter={(v: number) => [`${v.toFixed(2)}%`, "Drawdown"]}
                      />
                      <Area
                        type="monotone"
                        dataKey="drawdown"
                        stroke="var(--color-negative)"
                        strokeWidth={1.5}
                        fill="url(#ddFill)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </section>
            )}

            {benchmarkChartData && benchmarkChartData.length > 1 && (
              <section className="rounded-lg border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Activity className="size-3.5" /> Rentabilidade vs Mercado
                </div>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={benchmarkChartData}
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
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </section>
            )}
          </div>

          {allocationData && (
            <section className="rounded-lg border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <BarChart3 className="size-3.5" /> Concentração da Carteira
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 text-xs uppercase text-muted-foreground">Por classe</h3>
                  <table className="w-full text-sm">
                    <thead className="text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-2 py-1 text-left font-medium">Classe</th>
                        <th className="px-2 py-1 text-right font-medium">Valor</th>
                        <th className="px-2 py-1 text-right font-medium">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allocationData.byType.map((t) => (
                        <tr key={t.name} className="border-t border-border">
                          <td className="px-2 py-1 font-medium">{t.name}</td>
                          <td className="tabular px-2 py-1 text-right">{formatBRL(t.value)}</td>
                          <td className="tabular px-2 py-1 text-right text-muted-foreground">
                            {(t.pct * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <h3 className="mb-2 text-xs uppercase text-muted-foreground">Por setor</h3>
                  <table className="w-full text-sm">
                    <thead className="text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-2 py-1 text-left font-medium">Setor</th>
                        <th className="px-2 py-1 text-right font-medium">Valor</th>
                        <th className="px-2 py-1 text-right font-medium">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allocationData.bySector.map((s) => (
                        <tr key={s.name} className="border-t border-border">
                          <td className="px-2 py-1 font-medium">{s.name}</td>
                          <td className="tabular px-2 py-1 text-right">{formatBRL(s.value)}</td>
                          <td className="tabular px-2 py-1 text-right text-muted-foreground">
                            {(s.pct * 100).toFixed(1)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {riskMetrics && (
            <section className="rounded-lg border border-border bg-card p-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <AlertTriangle className="size-3.5" /> Insights de Risco
              </div>
              <ul className="space-y-2 text-sm">
                {riskMetrics.volatility > 0.3 && (
                  <li className="flex items-start gap-2 text-rose-600">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-rose-500" />
                    Volatilidade elevada ({riskMetrics.volatility > 0.4
                      ? "muito acima"
                      : "acima"}{" "}
                    da média de mercado. Considere diversificar.
                  </li>
                )}
                {riskMetrics.sharpe !== null && riskMetrics.sharpe < 0 && (
                  <li className="flex items-start gap-2 text-rose-600">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-rose-500" />
                    Sharpe negativo: o retorno da carteira não compensa o risco assumido.
                  </li>
                )}
                {riskMetrics.sharpe !== null && riskMetrics.sharpe >= 1 && (
                  <li className="flex items-start gap-2 text-emerald-600">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    Sharpe acima de 1: bom retorno ajustado ao risco.
                  </li>
                )}
                {riskMetrics.maxDrawdown > 0.25 && (
                  <li className="flex items-start gap-2 text-rose-600">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-rose-500" />
                    Drawdown máximo de {(riskMetrics.maxDrawdown * 100).toFixed(0)}% — recovery pode
                    levar meses.
                  </li>
                )}
                {riskMetrics.beta !== null && riskMetrics.beta < 0.8 && (
                  <li className="flex items-start gap-2 text-emerald-600">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                    Beta abaixo de 1: carteira menos volátil que o mercado.
                  </li>
                )}
                {riskMetrics.beta !== null && riskMetrics.beta > 1.2 && (
                  <li className="flex items-start gap-2 text-rose-600">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-rose-500" />
                    Beta acima de 1.2: carteira amplifica movimentos do IBOV.
                  </li>
                )}
                {riskMetrics.volatility <= 0.3 &&
                  riskMetrics.sharpe !== null &&
                  riskMetrics.sharpe >= 0 &&
                  riskMetrics.maxDrawdown <= 0.25 && (
                    <li className="flex items-start gap-2 text-emerald-600">
                      <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                      Perfil de risco controlado. Acompanhe periodicamente para manter o equilíbrio.
                    </li>
                  )}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  tone = "default",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone?: "positive" | "negative" | "default";
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div
        className={
          "tabular mt-2 text-2xl font-bold " +
          (tone === "positive" ? "text-positive" : tone === "negative" ? "text-negative" : "")
        }
      >
        {value}
      </div>
    </div>
  );
}
