import { useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, DollarSign, Info, Plus, RefreshCw, TrendingUp, Wallet } from "lucide-react";
import { listOperations } from "@/lib/operations.functions";
import { getQuotes } from "@/lib/quotes.functions";
import { getBenchmarkData } from "@/lib/data-functions";
import { getExchangeRates } from "@/lib/exchange.server";

import { consolidatePortfolio, buildPortfolioHistory } from "@/lib/portfolio";
import { AddOperationDialog } from "@/components/add-operation-dialog";
import { DeltaPct } from "@/components/delta-pct";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBRL, formatQty, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/carteira/")({
  head: () => ({
    meta: [
      { title: "Carteira — Investidor Pro" },
      {
        name: "description",
        content:
          "Acompanhe sua carteira de investimentos: posição consolidada, rentabilidade e evolução patrimonial.",
      },
    ],
  }),
  component: PortfolioOverview,
});

const TYPE_LABELS: Record<string, string> = {
  stock: "Ações",
  fii: "FIIs",
  bdr: "BDRs",
  etf: "ETFs",
  etf_internacional: "ETFs Internacionais",
  stock_us: "Stocks (EUA)",
  reit: "REITs (EUA)",
  fixed_income: "Renda Fixa",
  crypto: "Cripto",
  other: "Outros",
};

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
  "var(--color-chart-7)",
];

function PortfolioOverview() {
  const list = useServerFn(listOperations);
  const fetchQuotes = useServerFn(getQuotes);
  const queryClient = useQueryClient();
  const { data: ops, isLoading } = useQuery({
    queryKey: ["operations"],
    queryFn: () => list(),
  });

  const tickers = Array.from(new Set((ops ?? []).map((o) => o.ticker))).sort();
  const quotesQuery = useQuery({
    queryKey: ["quotes", tickers],
    queryFn: () => fetchQuotes({ data: { tickers } }),
    enabled: tickers.length > 0,
    staleTime: 60_000,
    refetchInterval: 300_000,
    refetchOnWindowFocus: false,
  });

  const quotesData = quotesQuery.data?.quotes ?? {};
  const priceOverrides: Record<string, number> = {};
  for (const [t, q] of Object.entries(quotesData)) {
    priceOverrides[t] = q.price;
  }

  const fetchRates = useServerFn(getExchangeRates);
  const { data: exchangeRates } = useQuery({
    queryKey: ["exchange-rates"],
    queryFn: () => fetchRates(),
    staleTime: 300_000,
    refetchInterval: 300_000,
  });

  const fetchBenchmark = useServerFn(getBenchmarkData);
  const { data: benchmarkData } = useQuery({
    queryKey: ["benchmark"],
    queryFn: () => fetchBenchmark(),
    staleTime: 3_600_000,
    enabled: !!ops,
  });

  const history = useMemo(
    () => buildPortfolioHistory(ops ?? [], priceOverrides, exchangeRates),
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
          ifix: b.ifix,
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

    return { volatility, maxDrawdown, beta, sharpe };
  }, [history, benchmarkChartData]);

  if (isLoading || !ops) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  const portfolio = consolidatePortfolio(ops, priceOverrides, exchangeRates);
  const isEmpty = portfolio.positions.length === 0;

  const dividendsByTicker: Record<string, number> = {};
  let totalDividends = 0;
  for (const op of ops) {
    if (op.side !== "dividend") continue;
    const total = op.quantity * op.price;
    dividendsByTicker[op.ticker] = (dividendsByTicker[op.ticker] ?? 0) + total;
    totalDividends += total;
  }
  const quotesUpdatedAt = Object.values(quotesData)[0]?.updatedAt;
  const quotesError = quotesQuery.data?.error;
  const liveCount = Object.keys(quotesData).length;

  return (
    <div className="space-y-6">
      <section className="grid gap-3 md:grid-cols-5">
        <KpiCard label="Patrimônio" value={formatBRL(portfolio.totalValue)} />
        <KpiCard label="Investido" value={formatBRL(portfolio.totalInvested)} muted />
        <KpiCard
          label="Lucro / Prejuízo"
          value={formatBRL(portfolio.totalPnl)}
          tone={portfolio.totalPnl >= 0 ? "positive" : "negative"}
        />
        <KpiCard
          label="Rentabilidade"
          value={
            portfolio.totalInvested > 0 ? (
              <DeltaPct value={portfolio.totalPnlPct} className="text-2xl" />
            ) : (
              "—"
            )
          }
        />
        {totalDividends > 0 && (
          <KpiCard label="Proventos" value={formatBRL(totalDividends)} tone="positive" />
        )}
      </section>

      {riskMetrics && (
        <section className="grid gap-3 md:grid-cols-4">
          <KpiCard
            label="Volatilidade (anual)"
            value={`${(riskMetrics.volatility * 100).toFixed(1)}%`}
          />
          <KpiCard
            label="Drawdown máx."
            value={`${(riskMetrics.maxDrawdown * 100).toFixed(1)}%`}
            tone="negative"
          />
          {riskMetrics.beta !== null && (
            <KpiCard
              label="Beta (vs IBOV)"
              value={riskMetrics.beta.toFixed(2)}
              tone={
                riskMetrics.beta < 1 ? "positive" : riskMetrics.beta > 1.2 ? "negative" : undefined
              }
            />
          )}
          {riskMetrics.sharpe !== null && (
            <KpiCard
              label="Índice Sharpe"
              value={riskMetrics.sharpe.toFixed(2)}
              tone={
                riskMetrics.sharpe >= 0.5
                  ? "positive"
                  : riskMetrics.sharpe < 0
                    ? "negative"
                    : undefined
              }
            />
          )}
        </section>
      )}

      <section className="flex flex-wrap items-center gap-3">
        <AddOperationDialog
          trigger={
            <Button className="gap-2">
              <Plus className="size-4" /> Nova operação
            </Button>
          }
        />
        <Button
          variant="outline"
          className="gap-2"
          onClick={() => queryClient.invalidateQueries({ queryKey: ["quotes"] })}
          disabled={quotesQuery.isFetching || tickers.length === 0}
        >
          <RefreshCw className={"size-4 " + (quotesQuery.isFetching ? "animate-spin" : "")} />
          Atualizar cotações
        </Button>
        <Button variant="outline" asChild className="gap-2">
          <Link to="/irpf">
            <AlertTriangle className="size-4" /> IRPF
          </Link>
        </Button>
        <Button variant="outline" disabled className="gap-2">
          <Wallet className="size-4" /> Sincronizar com B3
          <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            em breve
          </span>
        </Button>
        {quotesUpdatedAt && (
          <span className="text-xs text-muted-foreground">
            Cotações atualizadas às{" "}
            {new Date(quotesUpdatedAt).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
            {liveCount > 0 && ` · ${liveCount}/${tickers.length} ao vivo`}
          </span>
        )}
        {quotesError && (
          <span className="text-xs text-negative">Falha nas cotações: {quotesError}</span>
        )}
      </section>

      {history.length > 1 && (
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            <h2 className="text-sm font-semibold">Evolução patrimonial</h2>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
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
                  domain={["dataMin - 1000", "dataMax + 1000"]}
                  tickFormatter={(v: number) => formatBRL(v)}
                  width={80}
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
                    if (name === "value") return [formatBRL(v), "Patrimônio"];
                    return [formatBRL(v), "Investido"];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="invested"
                  stroke="var(--color-chart-2)"
                  strokeWidth={1.5}
                  fill="none"
                  strokeDasharray="5 3"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  fill="url(#portfolioFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-sm"
                style={{ background: "var(--color-primary)" }}
              />
              Patrimônio
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-sm"
                style={{ background: "var(--color-chart-2)" }}
              />
              Total investido
            </span>
          </div>
        </section>
      )}

      {benchmarkChartData && benchmarkChartData.length > 1 && (
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <LineChart className="size-4 text-chart-4" />
            <h2 className="text-sm font-semibold">Rentabilidade vs. Mercado</h2>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Base 1000 — comparação da sua carteira com os principais índices
          </p>
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
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-sm"
                style={{ background: "var(--color-primary)" }}
              />
              Carteira
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-sm"
                style={{ background: "var(--color-chart-3)" }}
              />
              IBOV
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-sm"
                style={{ background: "var(--color-positive)" }}
              />
              IDIV
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block size-2.5 rounded-sm"
                style={{ background: "var(--color-chart-4)" }}
              />
              IFIX
            </span>
          </div>
        </section>
      )}

      {totalDividends > 0 && (
        <section className="rounded-lg border border-border bg-card">
          <div className="border-b border-border bg-surface-2 px-4 py-3">
            <div className="flex items-center gap-2">
              <DollarSign className="size-4 text-positive" />
              <h2 className="text-sm font-semibold">Proventos Recebidos</h2>
            </div>
            <p className="text-xs text-muted-foreground">
              Dividendos e JCP registrados nas operações
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead className="bg-card text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Ativo</th>
                  <th className="px-4 py-2.5 text-right font-medium">Proventos</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(dividendsByTicker)
                  .filter(([, total]) => total > 0)
                  .sort(([, a], [, b]) => b - a)
                  .map(([ticker, total]) => (
                    <tr key={ticker} className="border-t border-border hover:bg-surface">
                      <td className="px-4 py-2.5">
                        <Link
                          to="/ativo/$ticker"
                          params={{ ticker }}
                          className="font-semibold hover:text-primary"
                        >
                          {ticker}
                        </Link>
                      </td>
                      <td className="tabular px-4 py-2.5 text-right font-medium text-positive">
                        {formatBRL(total)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {isEmpty ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
          <Wallet className="mx-auto size-8 text-muted-foreground" />
          <h2 className="mt-3 text-lg font-semibold">Sua carteira está vazia</h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            Registre suas primeiras compras para ver posição consolidada, rentabilidade e alocação.
          </p>
          <div className="mt-4">
            <AddOperationDialog
              trigger={
                <Button className="gap-2">
                  <Plus className="size-4" /> Registrar primeira operação
                </Button>
              }
            />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="border-b border-border bg-surface-2 px-4 py-3">
              <h2 className="text-sm font-semibold">Posições</h2>
              <p className="text-xs text-muted-foreground">
                Ordenadas por valor · cotações: BRAPI / CoinGecko / Yahoo
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="bg-card text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2.5 text-left font-medium">Ativo</th>
                    <th className="px-4 py-2.5 text-right font-medium">Qtd</th>
                    <th className="px-4 py-2.5 text-right font-medium">PM</th>
                    <th className="px-4 py-2.5 text-right font-medium">Preço</th>
                    <th className="px-4 py-2.5 text-right font-medium">Valor (BRL)</th>
                    <th className="px-4 py-2.5 text-right font-medium">P/L</th>
                    <th className="px-4 py-2.5 text-right font-medium">%</th>
                    <th className="px-4 py-2.5 text-right font-medium">Peso</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.positions.map((p) => {
                    const isRf = p.asset_type === "fixed_income";
                    return (
                      <tr key={p.ticker} className="border-t border-border hover:bg-surface">
                        <td className="px-4 py-2.5">
                          <div className="flex items-baseline gap-1.5">
                            <Link
                              to="/ativo/$ticker"
                              params={{ ticker: p.ticker }}
                              className="font-semibold hover:text-primary"
                            >
                              {p.ticker}
                            </Link>
                            {p.currency !== "BRL" && (
                              <span className="rounded bg-muted px-1 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                                {p.currency}
                              </span>
                            )}
                            {isRf && (
                              <span className="rounded bg-chart-3/10 px-1 py-0.5 text-[10px] font-medium text-chart-3">
                                RF
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {p.currency !== "BRL"
                              ? `${p.sector} · ${formatBRL(p.brlValue)}`
                              : isRf
                                ? `Renda Fixa · ${formatBRL(p.invested)}`
                                : p.sector}
                          </div>
                        </td>
                        <td className="tabular px-4 py-2.5 text-right">
                          {isRf ? "—" : formatQty(p.quantity)}
                        </td>
                        <td className="tabular px-4 py-2.5 text-right">
                          {isRf
                            ? "—"
                            : p.currency !== "BRL"
                              ? `$${p.avgPrice.toFixed(2)}`
                              : formatBRL(p.avgPrice)}
                        </td>
                        <td className="tabular px-4 py-2.5 text-right">
                          {isRf
                            ? "—"
                            : p.currency !== "BRL"
                              ? `$${p.currentPrice.toFixed(2)}`
                              : formatBRL(p.currentPrice)}
                        </td>
                        <td className="tabular px-4 py-2.5 text-right font-medium">
                          {formatBRL(p.currentValue)}
                          {p.currency !== "BRL" && (
                            <div className="text-[11px] text-muted-foreground">
                              ${(p.brlValue / (exchangeRates?.USD ?? 1)).toFixed(2)}
                            </div>
                          )}
                        </td>
                        <td className="tabular px-4 py-2.5 text-right">
                          <span className={p.pnl >= 0 ? "text-positive" : "text-negative"}>
                            {formatBRL(p.pnl)}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          {isRf ? (
                            <span className="text-muted-foreground">—</span>
                          ) : (
                            <DeltaPct value={p.pnlPct} />
                          )}
                        </td>
                        <td className="tabular px-4 py-2.5 text-right text-muted-foreground">
                          {p.weight.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="text-sm font-semibold">Alocação por classe</h2>
              <div className="mt-2 h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolio.typeAllocation.map((t) => ({
                        name: TYPE_LABELS[t.type] ?? t.type,
                        value: t.value,
                        pct: t.pct,
                      }))}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={35}
                      outerRadius={60}
                      stroke="var(--color-background)"
                      strokeWidth={2}
                    >
                      {portfolio.typeAllocation.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                      formatter={(v: number, _n, item) => [
                        `${formatBRL(v)} (${item.payload.pct.toFixed(1)}%)`,
                        item.payload.name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm">
                {portfolio.typeAllocation.map((t, i) => (
                  <li key={t.type} className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block size-2.5 rounded-sm"
                        style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                      />
                      <span className="text-muted-foreground">{TYPE_LABELS[t.type] ?? t.type}</span>
                    </span>
                    <span className="tabular">{t.pct.toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <h2 className="text-sm font-semibold">Alocação por setor</h2>
              <div className="mt-2 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolio.sectorAllocation}
                      dataKey="value"
                      nameKey="sector"
                      innerRadius={45}
                      outerRadius={80}
                      stroke="var(--color-background)"
                      strokeWidth={2}
                    >
                      {portfolio.sectorAllocation.map((_, i) => (
                        <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "var(--color-popover)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 6,
                        fontSize: 12,
                      }}
                      formatter={(v: number, _n, item) => [
                        `${formatBRL(v)} (${item.payload.pct.toFixed(1)}%)`,
                        item.payload.sector,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm">
                {portfolio.sectorAllocation.map((s, i) => (
                  <li key={s.sector} className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block size-2.5 rounded-sm"
                        style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                      />
                      <span className="text-muted-foreground">{s.sector}</span>
                    </span>
                    <span className="tabular">{s.pct.toFixed(1)}%</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              Cotações: BRAPI (B3) · CoinGecko (cripto) · Yahoo Finance (internacional). Valores em
              BRL convertidos pela cotação do dia.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function KpiCard({
  label,
  value,
  tone,
  muted,
}: {
  label: string;
  value: React.ReactNode;
  tone?: "positive" | "negative";
  muted?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={
          "tabular mt-2 text-2xl font-bold " +
          (tone === "positive"
            ? "text-positive"
            : tone === "negative"
              ? "text-negative"
              : muted
                ? "text-muted-foreground"
                : "")
        }
      >
        {value}
      </div>
    </div>
  );
}
