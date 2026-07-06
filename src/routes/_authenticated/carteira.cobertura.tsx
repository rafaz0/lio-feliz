import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ShieldCheck, TrendingUp, Wallet, PiggyBank, Calendar, ArrowRight } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SiteHeader } from "@/components/site-header";
import { listOperations } from "@/lib/operations.functions";
import { getRealProjections, type RealProjection } from "@/lib/data-functions";
import { formatBRL, formatBRLCompact } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/carteira/cobertura")({
  head: () => ({
    meta: [
      { title: "Cobertura de Despesas — Investidor Pro" },
      {
        name: "description",
        content: "Quanto os dividendos da sua carteira cobrem as suas despesas mensais projetadas.",
      },
    ],
  }),
  component: CoberturaPage,
});

const EXPENSE_KEY = "lio.cobertura.despesas";

function CoberturaPage() {
  const fetchOps = useServerFn(listOperations);
  const fetchProj = useServerFn(getRealProjections);
  const opsQuery = useQuery({
    queryKey: ["operations"],
    queryFn: () => fetchOps(),
  });
  const ops = opsQuery.data;

  const positions = useMemo(() => {
    if (!ops) return null;
    const map = new Map<string, number>();
    for (const op of ops.sort((a, b) => a.traded_at.localeCompare(b.traded_at))) {
      const cur = map.get(op.ticker) ?? 0;
      if (op.side === "buy") map.set(op.ticker, cur + op.quantity);
      else map.set(op.ticker, Math.max(0, cur - op.quantity));
    }
    return map;
  }, [ops]);

  const tickers = useMemo(() => {
    if (!positions) return [] as string[];
    return Array.from(positions.entries())
      .filter(([, q]) => q > 0)
      .map(([t]) => t);
  }, [positions]);

  const projQuery = useQuery({
    queryKey: ["cobertura-projections", tickers],
    queryFn: () => fetchProj({ data: { tickers } }),
    enabled: tickers.length > 0,
    staleTime: 3_600_000,
  });
  const projections: RealProjection[] = projQuery.data ?? [];

  const [despesas, setDespesas] = useState<number>(0);
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(EXPENSE_KEY);
      if (raw) setDespesas(Number(raw) || 0);
    } catch {
      // ignore
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(EXPENSE_KEY, String(despesas || 0));
    } catch {
      // ignore
    }
  }, [despesas]);

  // Resumo anual e mensal de proventos
  const annualProjection = useMemo(() => {
    const now = new Date();
    const nextYear = new Date(now);
    nextYear.setFullYear(now.getFullYear() + 1);
    const total = projections.reduce((s, p) => {
      const pd = new Date(p.paymentDate);
      if (pd >= now && pd <= nextYear) return s + p.amount;
      return s;
    }, 0);
    return total;
  }, [projections]);

  const monthlyAvg = annualProjection / 12;
  const coverageFactor = despesas > 0 ? monthlyAvg / despesas : null;
  const coveragePct = coverageFactor !== null ? Math.min(coverageFactor * 100, 999) : null;

  // Distribuição por mês para o gráfico
  const monthlySeries = useMemo(() => {
    const groups: Record<string, number> = {};
    const now = new Date();
    for (let i = 0; i < 12; i++) {
      const d = new Date(now);
      d.setMonth(d.getMonth() + i);
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      groups[k] = 0;
    }
    for (const p of projections) {
      const pd = new Date(p.paymentDate);
      if (pd < now) continue;
      const twelveFromNow = new Date(now);
      twelveFromNow.setFullYear(now.getFullYear() + 1);
      if (pd > twelveFromNow) continue;
      const k = `${pd.getFullYear()}-${String(pd.getMonth() + 1).padStart(2, "0")}`;
      groups[k] = (groups[k] ?? 0) + p.amount;
    }
    return Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({ month, amount: Math.round(amount * 100) / 100 }));
  }, [projections]);

  // Por ativo
  const byTicker = useMemo(() => {
    const groups: Record<string, { ticker: string; name: string; total: number }> = {};
    for (const p of projections) {
      if (!groups[p.ticker]) {
        groups[p.ticker] = { ticker: p.ticker, name: p.name, total: 0 };
      }
      groups[p.ticker].total += p.amount;
    }
    return Object.values(groups)
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
  }, [projections]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Cobertura de despesas</h1>
          </div>
          <Link to="/carteira" className="text-xs text-muted-foreground hover:text-foreground">
            ← Voltar para carteira
          </Link>
        </div>

        <p className="mb-6 max-w-3xl text-sm text-muted-foreground">
          Quanto seus dividendos cobrem suas despesas mensais projetadas. Insira o valor de despesas
          mensuales da sua vida que quer cobrir com renda passiva de dividendos.
        </p>

        <section className="mb-6 grid gap-3 sm:grid-cols-3">
          {/* Despesas */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Wallet className="size-3.5" />
              Despesas mensais alvo
            </div>
            <div className="mt-2 flex items-center gap-1">
              <span className="text-base text-muted-foreground">R$</span>
              <Input
                type="number"
                value={despesas || ""}
                onChange={(e) => setDespesas(Number(e.target.value) || 0)}
                placeholder="0,00"
                className="h-9 tabular"
                step={50}
              />
            </div>
            <div className="mt-1 text-[10px] text-muted-foreground">Fica salvo no navegador</div>
          </div>

          {/* Proventos mensais esperados */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <PiggyBank className="size-3.5" />
              Proventos / mês (projetado)
            </div>
            <div className="tabular mt-2 text-2xl font-bold text-positive">
              {formatBRL(monthlyAvg)}
            </div>
            <div className="text-[10px] text-muted-foreground">baseado nos próximos 12 meses</div>
          </div>

          {/* Cobertura */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <ShieldCheck className="size-3.5" />
              Cobertura
            </div>
            {despesas > 0 ? (
              <>
                <div className="tabular mt-2 text-2xl font-bold">
                  {coveragePct !== null ? `${coveragePct.toFixed(0)}%` : "—"}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {coveragePct !== null && coveragePct < 100
                    ? `Faltam ${formatBRL(despesas - monthlyAvg)} / mês`
                    : coveragePct !== null && coveragePct >= 100
                      ? `Sobram ${formatBRL(monthlyAvg - despesas)} / mês`
                      : ""}
                </div>
              </>
            ) : (
              <>
                <div className="tabular mt-2 text-2xl font-bold text-muted-foreground">—</div>
                <div className="text-[10px] text-muted-foreground">defina suas despesas acima</div>
              </>
            )}
          </div>
        </section>

        {/* Gráfico: proventos por mês */}
        <section className="mb-6 rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Calendar className="size-3.5" /> Proventos mensais projetados (12 meses)
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySeries} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="coberturaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-positive)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-positive)" stopOpacity={0} />
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
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  tickFormatter={(v: number) => `R$${v.toFixed(0)}`}
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
                  formatter={(v: number) => [formatBRL(v), "Proventos"]}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--color-positive)"
                  strokeWidth={2}
                  fill="url(#coberturaFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Top ativos que mais pagam */}
        <section className="mb-6 rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="size-3.5" /> Top ativos por proventos (12 meses)
          </div>
          {byTicker.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nenhum provento previsto para os ativos em sua carteira nos próximos 12 meses.
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-2 py-1.5 text-left font-medium">Ativo</th>
                  <th className="px-2 py-1.5 text-right font-medium">Total projetado</th>
                  <th className="px-2 py-1.5 text-right font-medium">% do total</th>
                </tr>
              </thead>
              <tbody>
                {byTicker.map((t) => (
                  <tr key={t.ticker} className="border-t border-border">
                    <td className="px-2 py-1.5">
                      <div className="font-semibold">{t.ticker}</div>
                      <div className="truncate text-xs text-muted-foreground">{t.name}</div>
                    </td>
                    <td className="tabular px-2 py-1.5 text-right">{formatBRL(t.total)}</td>
                    <td className="tabular px-2 py-1.5 text-right text-muted-foreground">
                      {annualProjection > 0
                        ? `${((t.total / annualProjection) * 100).toFixed(1)}%`
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Próximos pagamentos */}
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Próximos pagamentos
            </div>
            <Link
              to="/provisionador"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Ver provisionador completo <ArrowRight className="size-3" />
            </Link>
          </div>
          {projections.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Sem pagamentos futuros no momento. Verifique se há ativos na carteira.
            </p>
          ) : (
            <ProjectionList projections={projections.slice(0, 8)} total={annualProjection} />
          )}
        </section>

        <p className="mt-8 text-xs text-muted-foreground">
          {formatBRLCompact(annualProjection)} projetado de proventos em 12 meses ·
          {despesas > 0
            ? ` você cobre ${coveragePct?.toFixed(0)}% das despesas mensais alvo`
            : ` insira despesas alvo acima para ver cobertura`}
        </p>
      </main>
    </div>
  );
}

function ProjectionList({ projections, total }: { projections: RealProjection[]; total: number }) {
  return (
    <ul className="divide-y divide-border">
      {projections.map((p, i) => {
        const pct = total > 0 ? (p.amount / total) * 100 : 0;
        return (
          <li key={`${p.ticker}-${p.paymentDate}-${i}`} className="py-2.5">
            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="flex-1 truncate">
                <div className="font-semibold">{p.ticker}</div>
                <div className="truncate text-xs text-muted-foreground">{p.name}</div>
              </div>
              <div className="text-right">
                <div className="tabular font-medium">{formatBRL(p.amount)}</div>
                <div className="text-[10px] text-muted-foreground tabular">
                  {new Date(p.paymentDate).toLocaleDateString("pt-BR")}
                  {" · "}
                  {pct.toFixed(1)}%
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
