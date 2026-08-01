import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { Calendar, ExternalLink, PiggyBank, ShieldCheck, TrendingUp, Wallet } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { listOperations } from "@/lib/operations.functions";
import {
  getRealProjections,
  getReceivedDividends,
  type RealProjection,
} from "@/lib/data-functions";
import { formatBRL, formatBRLCompact } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const EXPENSE_KEY = "lio.cobertura.despesas";

function usePositions() {
  const fetchOps = useServerFn(listOperations);
  const { data: ops, isLoading } = useQuery({
    queryKey: ["operations"],
    queryFn: () => fetchOps(),
  });
  return useMemo(() => {
    if (!ops) return { ops: null, tickers: [] as string[], isLoading };
    const map = new Map<string, number>();
    for (const op of [...ops].sort((a, b) => a.traded_at.localeCompare(b.traded_at))) {
      const cur = map.get(op.ticker) ?? 0;
      map.set(op.ticker, op.side === "buy" ? cur + op.quantity : Math.max(0, cur - op.quantity));
    }
    return {
      ops,
      tickers: Array.from(map.entries())
        .filter(([, q]) => q > 0)
        .map(([t]) => t)
        .sort(),
      isLoading,
    };
  }, [ops, isLoading]);
}

export function ProventosContent() {
  const { ops, tickers, isLoading } = usePositions();
  const fetchProj = useServerFn(getRealProjections);

  const projQuery = useQuery({
    queryKey: ["proventos-projections", tickers],
    queryFn: () => fetchProj({ data: { tickers } }),
    enabled: tickers.length > 0,
    staleTime: 3_600_000,
  });
  const apiProjections: RealProjection[] = projQuery.data ?? [];

  // Historico real de proventos recebidos: cruza o historico de dividendos
  // pagos pela empresa (Yahoo Finance) com a posicao que o usuario tinha em
  // cada data de pagamento, derivada das proprias operacoes.
  const fetchReceived = useServerFn(getReceivedDividends);
  const receivedQuery = useQuery({
    queryKey: ["proventos-recebidos", ops],
    queryFn: () =>
      fetchReceived({
        data: {
          operations: (ops ?? []).map((o) => ({
            ticker: o.ticker,
            side: o.side,
            quantity: o.quantity,
            traded_at: o.traded_at,
          })),
        },
      }),
    enabled: !!ops && ops.length > 0,
    staleTime: 3_600_000,
  });
  const receivedDividends = receivedQuery.data ?? [];

  // Fallback: when BRAPI/Yahoo projections are unavailable, use the user's
  // manually registered dividend operations to build a basic projection set.
  const projections = useMemo<RealProjection[]>(() => {
    if (apiProjections.length > 0) return apiProjections;
    if (!ops) return [];
    const dividendOps = ops.filter((o) => o.side === "dividend");
    if (dividendOps.length === 0) return [];
    const byTicker: Record<
      string,
      { ticker: string; name: string; total: number; lastDate: string }
    > = {};
    for (const op of dividendOps) {
      const cur = byTicker[op.ticker] ?? {
        ticker: op.ticker,
        name: op.ticker,
        total: 0,
        lastDate: op.traded_at.slice(0, 10),
      };
      cur.total += op.quantity * op.price;
      if (op.traded_at.slice(0, 10) > cur.lastDate) cur.lastDate = op.traded_at.slice(0, 10);
      byTicker[op.ticker] = cur;
    }
    return Object.values(byTicker).map((entry) => ({
      ticker: entry.ticker,
      name: entry.ticker,
      amount: entry.total,
      paymentDate: entry.lastDate,
      declaredDate: entry.lastDate,
      type: "dividendo" as const,
    }));
  }, [apiProjections, ops]);
  const [cutoffDays, setCutoffDays] = useState(90);
  const [despesas, setDespesas] = useState<number>(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(EXPENSE_KEY);
      if (raw) setDespesas(Number(raw) || 0);
    } catch {
      /* ignore */
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(EXPENSE_KEY, String(despesas || 0));
    } catch {
      /* ignore */
    }
  }, [despesas]);

  const now = useMemo(() => new Date(), []);
  const cutoff = useMemo(() => {
    const d = new Date(now);
    d.setDate(d.getDate() + cutoffDays);
    return d;
  }, [now, cutoffDays]);

  const upcoming = useMemo(
    () =>
      projections
        .filter((p) => new Date(p.paymentDate) <= cutoff && new Date(p.paymentDate) >= now)
        .sort((a, b) => a.paymentDate.localeCompare(b.paymentDate)),
    [projections, cutoff, now],
  );

  const monthlyAvg = useMemo(() => {
    const annual = projections.reduce((s, p) => {
      const pd = new Date(p.paymentDate);
      const nextYear = new Date(now);
      nextYear.setFullYear(now.getFullYear() + 1);
      return pd >= now && pd <= nextYear ? s + p.amount : s;
    }, 0);
    return annual / 12;
  }, [projections, now]);

  const coverageFactor = despesas > 0 ? monthlyAvg / despesas : null;
  const coveragePct = coverageFactor !== null ? Math.min(coverageFactor * 100, 999) : null;
  const upcomingTotal = upcoming.reduce((s, p) => s + p.amount, 0);

  // Historico real de proventos recebidos (Yahoo Finance cruzado com a
  // posicao do usuario em cada data de pagamento) - todos os proventos,
  // de todos os ativos que ja passaram pela carteira, sem limite.
  const historico = useMemo(() => {
    return receivedDividends
      .map((r) => ({
        ticker: r.ticker,
        name: r.name,
        paidAt: r.paidAt,
        amount: r.totalReceived,
        type: "Dividendo",
      }))
      .sort((a, b) => b.paidAt.localeCompare(a.paidAt));
  }, [receivedDividends]);

  const totalHistorico = historico.reduce((s, h) => s + h.amount, 0);

  // Monthly chart data (bars + cumulative line).
  // O intervalo cobre desde o mes do pagamento de provento mais antigo do
  // historico real ate o fim da janela de projecao - nao so "daqui pra
  // frente". Cortar o passado fazia o grafico descartar silenciosamente
  // qualquer provento recebido antes de hoje, mesmo ele contando no
  // "Total recebido" - os dois numeros pareciam contradizer um ao outro.
  const monthlyChart = useMemo(() => {
    const projGroups: Record<string, number> = {};
    const histGroups: Record<string, number> = {};

    const monthsAhead = Math.max(Math.ceil(cutoffDays / 30), 12);
    const rangeEnd = new Date(now);
    rangeEnd.setDate(1);
    rangeEnd.setMonth(rangeEnd.getMonth() + monthsAhead);

    const earliestPaidAt = historico.reduce<string | null>(
      (min, h) => (min === null || h.paidAt < min ? h.paidAt : min),
      null,
    );
    const rangeStart = earliestPaidAt
      ? new Date(Number(earliestPaidAt.slice(0, 4)), Number(earliestPaidAt.slice(5, 7)) - 1, 1)
      : (() => {
          const d = new Date(now);
          d.setDate(1);
          return d;
        })();

    for (const d = new Date(rangeStart); d < rangeEnd; d.setMonth(d.getMonth() + 1)) {
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      projGroups[k] = 0;
      histGroups[k] = 0;
    }
    // Projected (a receber)
    for (const p of projections) {
      const pd = new Date(p.paymentDate);
      if (pd < now) continue;
      const k = `${pd.getFullYear()}-${String(pd.getMonth() + 1).padStart(2, "0")}`;
      if (k in projGroups) projGroups[k] = (projGroups[k] ?? 0) + p.amount;
    }
    // Historical (recebido) - cobre todo o historico real, nao so o futuro.
    for (const h of historico) {
      const hd = new Date(h.paidAt);
      const k = `${hd.getFullYear()}-${String(hd.getMonth() + 1).padStart(2, "0")}`;
      if (k in histGroups) histGroups[k] = (histGroups[k] ?? 0) + h.amount;
      else histGroups[k] = h.amount;
    }
    let cumulative = 0;
    const allMonths = new Set([...Object.keys(projGroups), ...Object.keys(histGroups)]);
    return Array.from(allMonths)
      .sort((a, b) => a.localeCompare(b))
      .map((month) => {
        const proj = projGroups[month] ?? 0;
        const hist = histGroups[month] ?? 0;
        cumulative += proj;
        return {
          month,
          projetado: Math.round(proj * 100) / 100,
          recebido: Math.round(hist * 100) / 100,
          cumulative: Math.round(cumulative * 100) / 100,
        };
      });
  }, [projections, historico, cutoffDays, now]);

  // Top assets
  const byTicker = useMemo(() => {
    const map: Record<string, { ticker: string; name: string; total: number; count: number }> = {};
    for (const p of upcoming) {
      if (!map[p.ticker]) map[p.ticker] = { ticker: p.ticker, name: p.name, total: 0, count: 0 };
      map[p.ticker].total += p.amount;
      map[p.ticker].count++;
    }
    return Object.values(map).sort((a, b) => b.total - a.total);
  }, [upcoming]);

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

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <section className="grid gap-3 sm:grid-cols-5">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="size-3.5" /> Ativos em carteira
          </div>
          <div className="tabular mt-2 text-2xl font-bold">{tickers.length}</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <PiggyBank className="size-3.5" /> Proventos / mês
          </div>
          <div className="tabular mt-2 text-2xl font-bold text-positive">
            {formatBRL(monthlyAvg)}
          </div>
          <div className="text-[10px] text-muted-foreground">média dos próximos 12 meses</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Calendar className="size-3.5" /> Total a Receber
          </div>
          <div className="tabular mt-2 text-2xl font-bold text-chart-5">
            {formatBRLCompact(upcomingTotal)}
          </div>
          <div className="text-[10px] text-muted-foreground">
            {upcoming.length} pagamento{upcoming.length !== 1 ? "s" : ""} em{" "}
            {cutoffDays === 365 ? "12 meses" : `até ${cutoffDays} dias`}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Wallet className="size-3.5" /> Total recebido
          </div>
          <div className="tabular mt-2 text-2xl font-bold text-positive">
            {formatBRLCompact(totalHistorico)}
          </div>
          <div className="text-[10px] text-muted-foreground">
            {historico.length} {historico.length === 1 ? "pagamento" : "pagamentos"} no histórico
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
            <ShieldCheck className="size-3.5" /> Cobertura
          </div>
          <div className="tabular mt-2 text-2xl font-bold">
            {despesas > 0 && coveragePct !== null ? `${coveragePct.toFixed(0)}%` : "—"}
          </div>
          <div className="flex gap-1">
            {[30, 60, 90, 180, 365].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setCutoffDays(d)}
                className={`rounded px-1.5 py-0.5 text-[10px] transition ${
                  cutoffDays === d
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-muted text-muted-foreground hover:bg-secondary"
                }`}
              >
                {d === 365 ? "12m" : `${d}d`}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="flex items-center justify-end">
        <Button variant="outline" size="sm" asChild className="gap-1.5">
          <Link to="/provisionador">
            <ExternalLink className="size-3.5" /> Provisionador completo
          </Link>
        </Button>
      </section>

      {/* Coverage */}
      <section className="rounded-lg border border-border bg-card p-5">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Wallet className="size-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Despesas mensais alvo:</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">R$</span>
              <Input
                type="number"
                value={despesas || ""}
                onChange={(e) => setDespesas(Number(e.target.value) || 0)}
                placeholder="0,00"
                className="h-8 w-28 tabular"
                step={50}
              />
            </div>
          </div>
          {despesas > 0 && (
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Proventos:</span>
                <span className="tabular font-medium">{formatBRL(monthlyAvg)}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Cobertura:</span>
                <span
                  className={`tabular font-bold ${coveragePct !== null && coveragePct >= 100 ? "text-positive" : "text-negative"}`}
                >
                  {coveragePct?.toFixed(1)}%
                </span>
              </div>
              {coveragePct !== null && (
                <span className="text-[11px] text-muted-foreground">
                  {coveragePct < 100
                    ? `Faltam ${formatBRL(despesas - monthlyAvg)}/mês`
                    : `Sobram ${formatBRL(monthlyAvg - despesas)}/mês`}
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Chart */}
      {monthlyChart.length > 0 && (
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="size-3.5" /> Proventos mensais
          </div>
          <div className="flex flex-wrap gap-4 mb-3 text-xs">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: "var(--color-chart-5)" }}
              />
              A Receber
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-sm"
                style={{ backgroundColor: "var(--color-positive)" }}
              />
              Recebido
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-0.5 w-4" style={{ backgroundColor: "var(--color-chart-1)" }} />
              Acumulado (projetado)
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyChart} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="provReceberFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart-5)" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="var(--color-chart-5)" stopOpacity={0.3} />
                  </linearGradient>
                  <linearGradient id="provRecebidoFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-positive)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--color-positive)" stopOpacity={0.15} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  stroke="var(--color-border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  stroke="var(--color-border)"
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  tickFormatter={(v: number) => formatBRLCompact(v)}
                  width={70}
                  stroke="var(--color-border)"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  tickFormatter={(v: number) => formatBRLCompact(v)}
                  width={70}
                  stroke="var(--color-border)"
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 6,
                    fontSize: 12,
                  }}
                  formatter={(v: number, name: string) => {
                    const labels: Record<string, string> = {
                      projetado: "A Receber",
                      recebido: "Recebido",
                      cumulative: "Acumulado",
                    };
                    return [formatBRL(v), labels[name] ?? name];
                  }}
                />
                <Bar
                  yAxisId="left"
                  dataKey="recebido"
                  fill="url(#provRecebidoFill)"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="projetado"
                  fill="url(#provReceberFill)"
                  radius={[3, 3, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cumulative"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      {/* Upcoming payments */}
      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <Calendar className="size-3.5" /> Próximos pagamentos ({upcoming.length})
        </div>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum provento previsto no período.</p>
        ) : (
          <ul className="divide-y divide-border">
            {upcoming.map((p, i) => (
              <li key={`${p.ticker}-${p.paymentDate}-${i}`} className="py-2.5">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <div className="flex items-center gap-3 flex-1 truncate">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-md border border-dashed border-border text-[10px] font-medium text-muted-foreground">
                      {new Date(p.paymentDate).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </div>
                    <div className="flex-1 truncate">
                      <Link
                        to="/ativo/$ticker"
                        params={{ ticker: p.ticker }}
                        className="font-semibold hover:text-primary"
                      >
                        {p.ticker}
                      </Link>
                      <div className="truncate text-xs text-muted-foreground">{p.name}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="tabular font-medium text-positive">
                      {formatBRLCompact(p.amount)}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground tabular">
                      <Badge variant="secondary" className="text-[9px] px-1.5 py-0">
                        {p.type === "fii" ? "FII" : "Ação"}
                      </Badge>
                      {p.status === "declared" ? (
                        <Badge
                          variant="outline"
                          className="text-[9px] px-1.5 py-0 text-chart-5 border-chart-5/30"
                        >
                          Declarado
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                          Projetado
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Top assets */}
      {byTicker.length > 0 && (
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="size-3.5" /> Top ativos por proventos
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-2 py-1.5 text-left font-medium">Ativo</th>
                <th className="px-2 py-1.5 text-right font-medium">Pagamentos</th>
                <th className="px-2 py-1.5 text-right font-medium">Total</th>
                <th className="px-2 py-1.5 text-right font-medium">Média</th>
              </tr>
            </thead>
            <tbody>
              {byTicker.map((t) => (
                <tr key={t.ticker} className="border-t border-border">
                  <td className="px-2 py-1.5">
                    <Link
                      to="/ativo/$ticker"
                      params={{ ticker: t.ticker }}
                      className="font-semibold hover:text-primary"
                    >
                      {t.ticker}
                    </Link>
                    <div className="truncate text-xs text-muted-foreground">{t.name}</div>
                  </td>
                  <td className="tabular px-2 py-1.5 text-right text-muted-foreground">
                    {t.count}
                  </td>
                  <td className="tabular px-2 py-1.5 text-right font-medium text-positive">
                    {formatBRLCompact(t.total)}
                  </td>
                  <td className="tabular px-2 py-1.5 text-right text-muted-foreground">
                    {formatBRLCompact(t.total / t.count)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Historical dividends */}
      {historico.length > 0 && (
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Wallet className="size-3.5" /> Proventos recebidos (histórico completo)
          </div>
          <table className="w-full text-sm">
            <thead className="text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-2 py-1.5 text-left font-medium">Ativo</th>
                <th className="px-2 py-1.5 text-right font-medium">Data</th>
                <th className="px-2 py-1.5 text-right font-medium">Tipo</th>
                <th className="px-2 py-1.5 text-right font-medium">Valor</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((h, i) => (
                <tr key={`${h.ticker}-${h.paidAt}-${i}`} className="border-t border-border">
                  <td className="px-2 py-1.5">
                    <Link
                      to="/ativo/$ticker"
                      params={{ ticker: h.ticker }}
                      className="font-semibold hover:text-primary"
                    >
                      {h.ticker}
                    </Link>
                    <div className="truncate text-xs text-muted-foreground">{h.name}</div>
                  </td>
                  <td className="tabular px-2 py-1.5 text-right text-muted-foreground">
                    {new Date(h.paidAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-2 py-1.5 text-right">
                    <Badge variant="outline" className="text-[10px] uppercase">
                      {h.type === "jcp" ? "JCP" : "Dividendo"}
                    </Badge>
                  </td>
                  <td className="tabular px-2 py-1.5 text-right font-medium text-positive">
                    {formatBRL(h.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
