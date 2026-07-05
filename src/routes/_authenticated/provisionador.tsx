import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { DollarSign, PiggyBank, Search, TrendingUp, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Bar, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { listOperations } from "@/lib/operations.functions";
import { getRealProjections } from "@/lib/data-functions";
import { formatBRL, formatDate } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/provisionador")({
  head: () => ({
    meta: [
      { title: "Provisionador de Dividendos — Investidor Pro" },
      { name: "description", content: "Projete seus dividendos futuros com base no histórico e na sua carteira." },
    ],
  }),
  component: ProvisionadorPage,
});

function ProvisionadorPage() {
  const { user } = useSession();
  const [search, setSearch] = useState("");
  const [manualQtys, setManualQtys] = useState<Record<string, number>>({});

  const fetchProjections = useServerFn(getRealProjections);
  const list = useServerFn(listOperations);
  const { data: ops } = useQuery({
    queryKey: ["operations"],
    queryFn: () => list(),
    enabled: !!user,
  });

  const positions = useMemo(() => {
    if (!ops || ops.length === 0) return null;
    const map = new Map<string, number>();
    for (const op of ops.sort((a, b) => a.traded_at.localeCompare(b.traded_at))) {
      const cur = map.get(op.ticker) ?? 0;
      if (op.side === "buy") map.set(op.ticker, cur + op.quantity);
      else map.set(op.ticker, Math.max(0, cur - op.quantity));
    }
    return map;
  }, [ops]);

  const targetTickers = useMemo(() => {
    const set = new Set<string>();
    if (positions) {
      for (const [t, q] of positions) if (q > 0) set.add(t);
    }
    for (const [t, q] of Object.entries(manualQtys)) if (q > 0) set.add(t);
    return Array.from(set);
  }, [positions, manualQtys]);

  const { data: projections, isLoading } = useQuery({
    queryKey: ["real-projections", targetTickers],
    queryFn: () => fetchProjections({ data: { tickers: targetTickers } }),
    enabled: targetTickers.length > 0,
    staleTime: 60_000,
  });

  function getQuantity(ticker: string): number {
    if (positions?.has(ticker)) return positions.get(ticker) ?? 0;
    return manualQtys[ticker] ?? 0;
  }

  function setQuantity(ticker: string, qty: number) {
    setManualQtys((prev) => ({ ...prev, [ticker]: qty }));
  }

  const withQuantities = useMemo(() => {
    return (projections ?? [])
      .map((p) => ({ ...p, qty: getQuantity(p.ticker) }))
      .filter((p) => {
        const term = search.trim().toUpperCase();
        if (term && !p.ticker.includes(term) && !p.name.toUpperCase().includes(term)) return false;
        return true;
      });
  }, [projections, search, positions, manualQtys]);

  const totalDeclared = withQuantities
    .filter((p) => p.status === "declared")
    .reduce((s, p) => s + p.amount * p.qty, 0);
  const totalNext3m = withQuantities
    .filter((p) => {
      const d = new Date(p.paymentDate);
      const limit = new Date();
      limit.setMonth(limit.getMonth() + 3);
      return d <= limit;
    })
    .reduce((s, p) => s + p.amount * p.qty, 0);
  const totalNext6m = withQuantities
    .filter((p) => {
      const d = new Date(p.paymentDate);
      const limit = new Date();
      limit.setMonth(limit.getMonth() + 6);
      return d <= limit;
    })
    .reduce((s, p) => s + p.amount * p.qty, 0);
  const totalNext12m = withQuantities.reduce((s, p) => s + p.amount * p.qty, 0);

  const projectedMonthly = useMemo(() => {
    const groups: Record<string, (typeof withQuantities)[number][]> = {};
    for (const p of withQuantities) {
      const key = p.paymentDate.slice(0, 7);
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [withQuantities]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <PiggyBank className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Provisionador de Dividendos</h1>
        </div>

        <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            <>
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
              <Skeleton className="h-24" />
            </>
          ) : (
            <>
              <SummaryCard label="Declarados" value={formatBRL(totalDeclared)} hint="Já declarados" />
              <SummaryCard label="Próximos 3 meses" value={formatBRL(totalNext3m)} hint="Projeção" />
              <SummaryCard label="Próximos 6 meses" value={formatBRL(totalNext6m)} hint="Projeção" />
              <SummaryCard label="Próximos 12 meses" value={formatBRL(totalNext12m)} hint="Projeção" />
            </>
          )}
        </section>

        {/* Timeline Chart */}
        {projectedMonthly.length > 0 && (
          <section className="mb-6">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <BarChart3 className="size-3.5" /> Timeline de dividendos
            </div>
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={projectedMonthly.map(([month, items]) => {
                    const [y, m] = month.split("-");
                    const label = new Date(Number(y), Number(m) - 1).toLocaleDateString("pt-BR", { month: "short" });
                    const total = items.reduce((s, p) => s + p.amount * p.qty, 0);
                    let cumulative = 0;
                    return { label, total: Number(total.toFixed(2)), month };
                  }).map((d, i, arr) => ({
                    ...d,
                    cumulative: arr.slice(0, i + 1).reduce((s, v) => s + v.total, 0),
                  }))}
                    margin={{ left: 8, right: 8, top: 8, bottom: 0 }}
                  >
                    <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="label" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} stroke="var(--color-border)" interval={0} angle={-20} textAnchor="end" height={30} />
                    <YAxis yAxisId="left" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} tickFormatter={(v: number) => `R$${v.toFixed(0)}`} width={60} stroke="var(--color-border)" />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }} tickFormatter={(v: number) => `R$${v.toFixed(0)}`} width={60} stroke="var(--color-border)" />
                    <Tooltip
                      contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 12 }}
                      formatter={(v: number, name: string) => {
                        if (name === "total") return [formatBRL(v), "Proventos"];
                        if (name === "cumulative") return [formatBRL(v), "Acumulado"];
                        return [v, name];
                      }}
                    />
                    <Bar yAxisId="left" dataKey="total" fill="var(--color-positive)" radius={[3, 3, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-3 flex items-center justify-center gap-6 text-[10px] text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="inline-block size-2.5 rounded-sm bg-positive" /> Proventos mensais</span>
                <span className="flex items-center gap-1.5"><span className="inline-block size-2.5 rounded-sm bg-chart-1" /> Acumulado</span>
              </div>
            </div>
          </section>
        )}

        <section className="mb-6 flex flex-wrap items-center gap-3">
          <div className="relative max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filtrar por ticker..."
              className="h-9 pl-8"
            />
          </div>
          {!user && (
            <span className="text-xs text-muted-foreground">
              Informe suas quantidades manualmente ou{" "}
              <Link to="/auth" className="text-primary hover:underline">faça login</Link>{" "}
              para usar sua carteira.
            </span>
          )}
        </section>

        {withQuantities.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
            <PiggyBank className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Nenhum provento projetado.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {projectedMonthly.map(([month, items]) => {
              const [year, m] = month.split("-");
              const monthName = new Date(Number(year), Number(m) - 1).toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              });
              const monthTotal = items.reduce((s, p) => s + p.amount * p.qty, 0);
              return (
                <div key={month} className="overflow-hidden rounded-lg border border-border bg-card">
                  <div className="flex items-center justify-between bg-surface-2 px-4 py-3">
                    <h2 className="text-sm font-semibold capitalize">{monthName}</h2>
                    <span className="text-xs text-muted-foreground">
                      {items.length} proventos · {formatBRL(monthTotal)} total
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-sm">
                      <thead className="bg-card text-xs uppercase text-muted-foreground">
                        <tr>
                          <th className="px-4 py-2.5 text-left font-medium">Ativo</th>
                          <th className="px-4 py-2.5 text-left font-medium">Tipo</th>
                          <th className="px-4 py-2.5 text-right font-medium">Qtd</th>
                          <th className="px-4 py-2.5 text-right font-medium">Valor p/ cota</th>
                          <th className="px-4 py-2.5 text-right font-medium">Total</th>
                          <th className="px-4 py-2.5 text-right font-medium">Data Ex</th>
                          <th className="px-4 py-2.5 text-right font-medium">Pagamento</th>
                          <th className="px-4 py-2.5 text-right font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((p, i) => {
                          const isFii = p.type === "fii";
                          const detailPath = isFii ? "/fii/$ticker" : "/ativo/$ticker";
                          return (
                            <tr key={i} className="border-t border-border hover:bg-surface">
                              <td className="px-4 py-2.5">
                                <div className="flex items-center gap-2">
                                  <Link
                                    to={detailPath}
                                    params={{ ticker: p.ticker }}
                                    className="font-semibold hover:text-primary"
                                  >
                                    {p.ticker}
                                  </Link>
                                  <span className="text-xs text-muted-foreground">{p.name}</span>
                                </div>
                              </td>
                              <td className="px-4 py-2.5">
                                <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium uppercase">
                                  {isFii ? "FII" : "Ação"}
                                </span>
                              </td>
                              <td className="px-4 py-2.5 text-right">
                                {!positions?.has(p.ticker) ? (
                                  <Input
                                    type="number"
                                    value={manualQtys[p.ticker] ?? ""}
                                    onChange={(e) => setQuantity(p.ticker, Number(e.target.value) || 0)}
                                    className="h-7 w-20 text-right text-xs"
                                    placeholder="0"
                                  />
                                ) : (
                                  <span className="tabular font-medium">{p.qty}</span>
                                )}
                              </td>
                              <td className="tabular px-4 py-2.5 text-right text-muted-foreground">
                                {formatBRL(p.amount)}
                              </td>
                              <td className="tabular px-4 py-2.5 text-right font-medium text-positive">
                                {formatBRL(p.amount * p.qty)}
                              </td>
                              <td className="tabular px-4 py-2.5 text-right text-muted-foreground">
                                {formatDate(p.exDate)}
                              </td>
                              <td className="tabular px-4 py-2.5 text-right">
                                {formatDate(p.paymentDate)}
                              </td>
                              <td className="px-4 py-2.5 text-right">
                                <span
                                  className={
                                    "rounded px-1.5 py-0.5 text-[10px] font-medium " +
                                    (p.status === "declared"
                                      ? "bg-positive/10 text-positive"
                                      : "bg-chart-2/10 text-chart-2")
                                  }
                                >
                                  {p.status === "declared" ? "Declarado" : "Projetado"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function SummaryCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
        {hint === "Já declarados" ? (
          <DollarSign className="size-3.5 text-positive" />
        ) : (
          <TrendingUp className="size-3.5 text-chart-2" />
        )}
        {label}
      </div>
      <div className="tabular mt-2 text-2xl font-bold">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}
