import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { TrendingUp, Wallet, PieChart as PieChartIcon, Info } from "lucide-react";
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
import { listOperations } from "@/lib/operations.functions";
import { getQuotes } from "@/lib/quotes.functions";
import { getExchangeRates } from "@/lib/exchange.server";
import { consolidatePortfolio, buildPortfolioHistory } from "@/lib/portfolio";
import { formatBRL, formatDate } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/empty-state";

export const Route = createFileRoute("/_authenticated/carteira/patrimonio")({
  head: () => ({
    meta: [
      { title: "Patrimônio — Investidor Pro" },
      {
        name: "description",
        content: "Evolução patrimonial e alocação por classe e setor da sua carteira.",
      },
    ],
  }),
  component: PatrimonioPage,
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

function PatrimonioPage() {
  const list = useServerFn(listOperations);
  const fetchQuotes = useServerFn(getQuotes);
  const { data: ops, isLoading } = useQuery({
    queryKey: ["operations"],
    queryFn: () => list(),
  });

  const fetchRates = useServerFn(getExchangeRates);
  const { data: exchangeRates } = useQuery({
    queryKey: ["exchange-rates"],
    queryFn: () => fetchRates(),
    staleTime: 300_000,
    refetchInterval: 300_000,
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

  const priceOverrides = useMemo(() => {
    const map: Record<string, number> = {};
    for (const [t, q] of Object.entries(quotesQuery.data?.quotes ?? {})) {
      map[t] = q.price;
    }
    return map;
  }, [quotesQuery.data]);

  const portfolio = useMemo(
    () => consolidatePortfolio(ops ?? [], priceOverrides, exchangeRates),
    [ops, priceOverrides, exchangeRates],
  );
  const history = useMemo(
    () => buildPortfolioHistory(ops ?? [], priceOverrides, exchangeRates),
    [ops, priceOverrides, exchangeRates],
  );

  if (isLoading || !ops) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  const quotesData = quotesQuery.data?.quotes ?? {};
  const quotesUpdatedAt = Object.values(quotesData)[0]?.updatedAt;
  const quotesError = quotesQuery.data?.error;

  const isEmpty = portfolio.positions.length === 0;

  if (isEmpty) {
    return (
      <EmptyState
        icon={Wallet}
        title="Carteira vazia"
        description="Registre operações na aba Lançamentos para ver evolução patrimonial e alocação."
      />
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-3 sm:grid-cols-3">
        <KpiCard label="Patrimônio total" value={formatBRL(portfolio.totalValue)} />
        <KpiCard label="Total investido" value={formatBRL(portfolio.totalInvested)} muted />
        <KpiCard
          label="Lucro / Prejuízo"
          value={formatBRL(portfolio.totalPnl)}
          tone={portfolio.totalPnl >= 0 ? "positive" : "negative"}
        />
      </section>

      {quotesUpdatedAt && (
        <p className="text-xs text-muted-foreground">
          Cotações atualizadas às{" "}
          {new Date(quotesUpdatedAt).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
          {quotesError && <span className="ml-2 text-negative">Falha: {quotesError}</span>}
        </p>
      )}

      {history.length > 1 && (
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-4 flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" />
            <h2 className="text-sm font-semibold">Evolução patrimonial</h2>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="patrimonioFill" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#patrimonioFill)"
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

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <PieChartIcon className="size-3.5" /> Alocação por classe
          </div>
          <div className="h-52">
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
                  innerRadius={40}
                  outerRadius={70}
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
          <ul className="mt-3 space-y-1.5 text-sm">
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
        </section>

        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <PieChartIcon className="size-3.5" /> Alocação por setor
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={portfolio.sectorAllocation}
                  dataKey="value"
                  nameKey="sector"
                  innerRadius={40}
                  outerRadius={70}
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
          <ul className="mt-3 space-y-1.5 text-sm">
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
            {portfolio.sectorAllocation.length === 0 && (
              <li className="text-xs text-muted-foreground">Sem dados de setor</li>
            )}
          </ul>
        </section>
      </div>

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        Cotações via BRAPI (b3). Tickers sem retorno usam preço de referência.
      </p>
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
        className={`tabular mt-2 text-2xl font-bold ${tone === "positive" ? "text-positive" : tone === "negative" ? "text-negative" : muted ? "text-muted-foreground" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
