import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, Info, Plus, RefreshCw, TrendingUp, Wallet } from "lucide-react";
import { EmptyState } from "@/components/empty-state";

import {
  ExpandableSection,
  ExpandableSectionGroup,
  TimeRangeSelector,
  useTimeRange,
  getCutoffDate,
  getTimeRangeById,
  FiiSegmentBadge,
} from "@/presentation/shared/components/ui";
import { listOperations } from "@/lib/operations.functions";
import { getQuotes } from "@/lib/quotes.functions";
import { getBenchmarkData } from "@/lib/data-functions";
import { getExchangeRates } from "@/lib/exchange.server";

import { consolidatePortfolio, buildPortfolioHistory } from "@/lib/portfolio";
import { AddOperationDialog } from "@/components/add-operation-dialog";
import { DeltaPct } from "@/components/delta-pct";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBRL, formatBRLCompact, formatQty, formatDate } from "@/lib/format";
import { RouteErrorBoundary, NotFoundState } from "@/components/error-state";
import { KpiCard } from "@/components/kpi-card";

export const Route = createFileRoute("/_authenticated/carteira/")({
  errorComponent: RouteErrorBoundary,
  notFoundComponent: () => <NotFoundState />,
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
  const {
    data: ops,
    isLoading,
    isError,
  } = useQuery({
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

  const { selected, setRange } = useTimeRange();

  const [sortCol, setSortCol] = useState<string>("Valor");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filteredHistory = useMemo(() => {
    if (history.length === 0) return [];
    const cutoff = getCutoffDate(getTimeRangeById(selected));
    if (!cutoff) return history;
    const y = cutoff.getFullYear();
    const m = String(cutoff.getMonth() + 1).padStart(2, "0");
    const d = String(cutoff.getDate()).padStart(2, "0");
    const cutoffStr = `${y}-${m}-${d}`;
    return history.filter((h) => h.date >= cutoffStr);
  }, [history, selected]);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  if (isError || !ops) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
        <p className="text-sm text-destructive">Erro ao carregar operações. Tente novamente.</p>
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

  const toggleSort = (col: string) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("desc");
    }
  };

  const getSortedPositions = (positions: typeof portfolio.positions) => {
    return [...positions].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      switch (sortCol) {
        case "Ativo":
          return dir * a.ticker.localeCompare(b.ticker);
        case "Qtd":
          return dir * (a.quantity - b.quantity);
        case "Valor":
          return dir * (a.currentValue - b.currentValue);
        case "P/L":
          return dir * (a.pnl - b.pnl);
        case "%":
          return dir * (a.pnlPct - b.pnlPct);
        case "Peso":
          return dir * (a.weight - b.weight);
        default:
          return dir * (a.currentValue - b.currentValue);
      }
    });
  };

  const SortHeader = ({
    col,
    children,
    align,
  }: {
    col: string;
    children: React.ReactNode;
    align?: string;
  }) => {
    const active = sortCol === col;
    return (
      <th
        className={`cursor-pointer select-none pb-2 text-${align ?? "left"} font-medium hover:text-foreground ${align === "right" ? "px-3" : "pr-4"}`}
        onClick={() => toggleSort(col)}
      >
        <span className="inline-flex items-center gap-1">
          {children}
          <span className="text-[9px] opacity-30">
            {active ? (sortDir === "asc" ? "▲" : "▼") : "▽"}
          </span>
        </span>
      </th>
    );
  };

  return (
    <div className="space-y-6">
      {/* KPI Strip — elementos mais importantes da tela */}
      <div className="flex items-start justify-between gap-4">
        <div className="grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            label="Patrimônio"
            value={
              portfolio.totalValue > 1_000_000
                ? formatBRLCompact(portfolio.totalValue)
                : formatBRL(portfolio.totalValue)
            }
            dominant
          />
          <KpiCard
            label="Investido"
            value={
              portfolio.totalInvested > 1_000_000
                ? formatBRLCompact(portfolio.totalInvested)
                : formatBRL(portfolio.totalInvested)
            }
            muted
          />
          <KpiCard
            label="Resultado"
            value={
              portfolio.totalPnl > 1_000_000 || portfolio.totalPnl < -1_000_000
                ? formatBRLCompact(portfolio.totalPnl)
                : formatBRL(portfolio.totalPnl)
            }
            tone={portfolio.totalPnl >= 0 ? "positive" : "negative"}
          />
          <KpiCard
            label="Rentabilidade"
            value={
              portfolio.totalInvested > 0 ? (
                <DeltaPct value={portfolio.totalPnlPct} className="text-2xl font-bold" />
              ) : (
                "—"
              )
            }
            tone={portfolio.totalPnlPct >= 0 ? "positive" : "negative"}
          />
        </div>
        {quotesUpdatedAt && (
          <div className="flex shrink-0 items-center gap-1.5 pt-1 text-[10px] text-muted-foreground">
            <button
              onClick={() => queryClient.invalidateQueries({ queryKey: ["quotes"] })}
              disabled={quotesQuery.isFetching || tickers.length === 0}
              className="rounded p-0.5 transition hover:bg-secondary disabled:opacity-50"
              title="Atualizar cotações"
            >
              <RefreshCw className={"size-3 " + (quotesQuery.isFetching ? "animate-spin" : "")} />
            </button>
            <span>
              {new Date(quotesUpdatedAt).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {liveCount > 0 && (
              <span>
                · {liveCount}/{tickers.length}
              </span>
            )}
          </div>
        )}
        {quotesError && <span className="text-[10px] text-negative">Falha: {quotesError}</span>}
      </div>

      {/* Ações rápidas */}
      <div className="flex flex-wrap items-center gap-2">
        <AddOperationDialog
          trigger={
            <Button size="sm" className="gap-1.5">
              <Plus className="size-3.5" /> Nova operação
            </Button>
          }
        />
        <Button size="sm" variant="outline" asChild className="gap-1.5">
          <Link to="/irpf">
            <AlertTriangle className="size-3.5" /> IRPF
          </Link>
        </Button>
        <Button size="sm" variant="outline" disabled className="gap-1.5">
          <Wallet className="size-3.5" /> Sincronizar B3
          <span className="rounded bg-secondary px-1 py-0.5 text-[8px] uppercase">em breve</span>
        </Button>
      </div>

      {/* Gráfico de evolução — protagonista */}
      {history.length > 1 && (
        <section className="rounded-lg border bg-card p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="size-4 text-primary" />
              </div>
              <div>
                <h2 className="text-sm font-semibold">Evolução patrimonial</h2>
                <p className="text-xs text-muted-foreground">
                  Patrimônio acumulado vs total investido ao longo do tempo
                </p>
              </div>
            </div>
            <TimeRangeSelector selected={selected} onSelect={setRange} />
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredHistory} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
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
          <div className="mt-4 flex items-center justify-center gap-8 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block size-3 rounded-sm"
                style={{ background: "var(--color-primary)" }}
              />
              Patrimônio
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block size-3 rounded-sm"
                style={{ background: "var(--color-chart-2)" }}
              />
              Total investido
            </span>
          </div>
        </section>
      )}

      {isEmpty ? (
        <EmptyState
          icon={Wallet}
          title="Sua carteira está vazia"
          description="Registre suas primeiras compras para ver posição consolidada, rentabilidade e alocação."
          action={
            <AddOperationDialog
              trigger={
                <Button className="gap-2">
                  <Plus className="size-4" /> Registrar primeira operação
                </Button>
              }
            />
          }
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">Posições</h2>
                <p className="text-xs text-muted-foreground">
                  {portfolio.positions.length} ativos · cotações: BRAPI / CoinGecko / Yahoo
                </p>
              </div>
            </div>

            {(() => {
              const groups = portfolio.typeAllocation
                .filter((t) => t.value > 0)
                .map((type) => {
                  const typePositions = getSortedPositions(
                    portfolio.positions.filter((p) => p.asset_type === type.type),
                  );
                  return { ...type, positions: typePositions };
                })
                .filter((g) => g.positions.length > 0);

              return (
                <ExpandableSectionGroup mode="multiple" className="divide-y">
                  {groups.map((group) => (
                    <ExpandableSection
                      key={group.type}
                      title={TYPE_LABELS[group.type] ?? group.type}
                      subtitle={`${formatBRL(group.value)} · ${(group.pct * 100).toFixed(1)}% do patrimônio`}
                      count={group.positions.length}
                      defaultOpen={group.positions.length <= 6}
                    >
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="text-xs uppercase text-muted-foreground">
                            <tr>
                              <SortHeader col="Ativo">Ativo</SortHeader>
                              <SortHeader col="Qtd" align="right">
                                Qtd
                              </SortHeader>
                              <th className="px-3 pb-2 text-right font-medium">PM</th>
                              <th className="px-3 pb-2 text-right font-medium">Preço</th>
                              <SortHeader col="Valor" align="right">
                                Valor
                              </SortHeader>
                              <SortHeader col="P/L" align="right">
                                P/L
                              </SortHeader>
                              <SortHeader col="%" align="right">
                                %
                              </SortHeader>
                              <SortHeader col="Peso" align="right">
                                Peso
                              </SortHeader>
                              <th className="pl-3 pb-2 text-right font-medium">DY</th>
                            </tr>
                          </thead>
                          <tbody>
                            {group.positions.map((p) => {
                              const isRf = p.asset_type === "fixed_income";
                              return (
                                <tr
                                  key={p.ticker}
                                  className="border-t border-border hover:bg-surface"
                                >
                                  <td className="pr-4 py-2.5">
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
                                      {p.asset_type === "fii" && (
                                        <FiiSegmentBadge segment={p.sector} />
                                      )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {p.currency !== "BRL"
                                        ? `${formatBRL(p.brlValue)}`
                                        : isRf
                                          ? `Renda Fixa · ${formatBRL(p.invested)}`
                                          : p.asset_type === "fii"
                                            ? ""
                                            : p.sector}
                                    </div>
                                  </td>
                                  <td className="tabular px-3 py-2.5 text-right">
                                    {isRf ? "—" : formatQty(p.quantity)}
                                  </td>
                                  <td className="tabular px-3 py-2.5 text-right">
                                    {isRf
                                      ? "—"
                                      : p.currency !== "BRL"
                                        ? `$${p.avgPrice.toFixed(2)}`
                                        : formatBRL(p.avgPrice)}
                                  </td>
                                  <td className="tabular px-3 py-2.5 text-right">
                                    {isRf
                                      ? "—"
                                      : p.currency !== "BRL"
                                        ? `$${p.currentPrice.toFixed(2)}`
                                        : formatBRL(p.currentPrice)}
                                  </td>
                                  <td className="tabular px-3 py-2.5 text-right font-medium">
                                    {p.currentValue > 1_000_000
                                      ? formatBRLCompact(p.currentValue)
                                      : formatBRL(p.currentValue)}
                                    {p.currency !== "BRL" && (
                                      <div className="text-[11px] text-muted-foreground">
                                        ${(p.brlValue / (exchangeRates?.USD ?? 1)).toFixed(2)}
                                      </div>
                                    )}
                                  </td>
                                  <td className="tabular px-3 py-2.5 text-right">
                                    <span
                                      className={p.pnl >= 0 ? "text-positive" : "text-negative"}
                                    >
                                      {formatBRL(p.pnl)}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2.5 text-right">
                                    {isRf ? (
                                      <span className="text-muted-foreground">—</span>
                                    ) : (
                                      <DeltaPct value={p.pnlPct} />
                                    )}
                                  </td>
                                  <td className="tabular pl-3 py-2.5 text-right text-muted-foreground">
                                    {p.weight.toFixed(1)}%
                                  </td>
                                  <td className="tabular pl-3 py-2.5 text-right text-xs">
                                    {(() => {
                                      const divTotal = dividendsByTicker[p.ticker];
                                      if (!divTotal || p.currentValue <= 0)
                                        return <span className="text-muted-foreground">—</span>;
                                      const dy = (divTotal / p.currentValue) * 100;
                                      return (
                                        <span className="text-positive">{dy.toFixed(1)}%</span>
                                      );
                                    })()}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </ExpandableSection>
                  ))}
                </ExpandableSectionGroup>
              );
            })()}
          </div>

          <div className="space-y-5">
            <div className="rounded-lg border bg-card p-5">
              <h2 className="text-sm font-semibold">Alocação por classe</h2>
              <div className="mt-3 h-40">
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
            <div className="rounded-lg border bg-card p-5">
              <h2 className="text-sm font-semibold">Alocação por setor</h2>
              <div className="mt-3 h-56">
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
            {riskMetrics && (
              <div className="rounded-lg border bg-card p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Métricas de Risco
                </h3>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] text-muted-foreground">Volatilidade (anual)</p>
                    <p className="mt-1 text-base font-semibold tabular">
                      {(riskMetrics.volatility * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Drawdown máx.</p>
                    <p className="mt-1 text-base font-semibold tabular text-negative">
                      {(riskMetrics.maxDrawdown * 100).toFixed(1)}%
                    </p>
                  </div>
                  {riskMetrics.beta !== null && (
                    <div>
                      <p className="text-[11px] text-muted-foreground">Beta (vs IBOV)</p>
                      <p
                        className={`mt-1 text-base font-semibold tabular ${riskMetrics.beta < 1 ? "text-positive" : riskMetrics.beta > 1.2 ? "text-negative" : ""}`}
                      >
                        {riskMetrics.beta.toFixed(2)}
                      </p>
                    </div>
                  )}
                  {riskMetrics.sharpe !== null && (
                    <div>
                      <p className="text-[11px] text-muted-foreground">Índice Sharpe</p>
                      <p
                        className={`mt-1 text-base font-semibold tabular ${riskMetrics.sharpe >= 0.5 ? "text-positive" : riskMetrics.sharpe < 0 ? "text-negative" : ""}`}
                      >
                        {riskMetrics.sharpe.toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <p className="flex items-start gap-1.5 text-[11px] text-muted-foreground">
              <Info className="mt-0.5 size-3 shrink-0" />
              Cotações: BRAPI · CoinGecko · Yahoo Finance. Valores em BRL.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
