import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Calendar as CalendarIcon, Coins, TrendingUp, ArrowRight } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { listOperations } from "@/lib/operations.functions";
import { buildProjections, type ProjectedDividend } from "@/lib/dividend-projections";
import { formatBRL, formatBRLCompact, formatDate } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/_authenticated/carteira/proventos")({
  head: () => ({
    meta: [
      { title: "Proventos — Investidor Pro" },
      {
        name: "description",
        content: "Calendário de dividendos e projeção de renda passiva da sua carteira.",
      },
    ],
  }),
  component: ProventosPage,
});

function ProventosPage() {
  const fetchOps = useServerFn(listOperations);
  const { data: ops, isLoading } = useQuery({
    queryKey: ["operations"],
    queryFn: () => fetchOps(),
  });

  const tickers = useMemo(() => {
    if (!ops) return [] as string[];
    const map = new Map<string, number>();
    for (const op of [...ops].sort((a, b) => a.traded_at.localeCompare(b.traded_at))) {
      const cur = map.get(op.ticker) ?? 0;
      if (op.side === "buy") map.set(op.ticker, cur + op.quantity);
      else map.set(op.ticker, Math.max(0, cur - op.quantity));
    }
    return Array.from(map.entries())
      .filter(([, q]) => q > 0)
      .map(([t]) => t)
      .sort();
  }, [ops]);

  const allProjections = useMemo(() => buildProjections(), []);
  const projections = useMemo(
    () => allProjections.filter((p) => tickers.includes(p.ticker)),
    [allProjections, tickers],
  );

  const [cutoffDays, setCutoffDays] = useState(90);
  const now = useMemo(() => new Date(), []);
  const cutoff = useMemo(() => {
    const d = new Date(now);
    d.setDate(d.getDate() + cutoffDays);
    return d;
  }, [now, cutoffDays]);

  const upcoming = useMemo(
    () =>
      projections
        .filter((p) => new Date(p.paymentDate) <= cutoff)
        .sort((a, b) => a.paymentDate.localeCompare(b.paymentDate)),
    [projections, cutoff],
  );

  // Group upcoming by month for chart
  const monthlySeries = useMemo(() => {
    const groups: Record<string, number> = {};
    const start = new Date(now);
    start.setDate(1);
    for (let i = 0; i < Math.ceil(cutoffDays / 30) + 1; i++) {
      const d = new Date(start);
      d.setMonth(start.getMonth() + i);
      const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      groups[k] = 0;
    }
    for (const p of upcoming) {
      const pd = new Date(p.paymentDate);
      const k = `${pd.getFullYear()}-${String(pd.getMonth() + 1).padStart(2, "0")}`;
      if (k in groups) groups[k] = (groups[k] ?? 0) + p.amount;
    }
    return Object.entries(groups)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, amount]) => ({ month, amount: Math.round(amount * 100) / 100 }));
  }, [upcoming, cutoffDays]);

  // By ticker
  const byTicker = useMemo(() => {
    const map = new Map<string, { ticker: string; name: string; total: number; count: number }>();
    for (const p of upcoming) {
      const cur = map.get(p.ticker) ?? { ticker: p.ticker, name: p.name, total: 0, count: 0 };
      cur.total += p.amount;
      cur.count++;
      map.set(p.ticker, cur);
    }
    return Array.from(map.values()).sort((a, b) => b.total - a.total);
  }, [upcoming]);

  const totalUpcoming = upcoming.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <section className="grid gap-3 sm:grid-cols-4">
        <KpiCard label="Ativos com proventos" value={`${tickers.length}`} />
        <KpiCard
          label={`Proventos em ${cutoffDays} dias`}
          value={formatBRLCompact(totalUpcoming)}
        />
        <KpiCard label="Próximos pagamentos" value={`${upcoming.length}`} />
        <KpiCard
          label="Período de visualização"
          value={<CutoffPicker value={cutoffDays} onChange={setCutoffDays} />}
        />
      </section>

      {monthlySeries.length > 1 && (
        <section className="rounded-lg border border-border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="size-3.5" /> Proventos por mês
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlySeries} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="proventosFill" x1="0" y1="0" x2="0" y2="1">
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
                  formatter={(v: number) => [formatBRL(v), "Proventos"]}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="var(--color-positive)"
                  strokeWidth={2}
                  fill="url(#proventosFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      )}

      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <CalendarIcon className="size-3.5" />
          Próximos pagamentos ({upcoming.length})
        </div>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum provento previsto no período selecionado.
          </p>
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
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground tabular">
                      {p.type === "fii" ? "FII" : "Ação"}
                      {" · "}
                      <span className={p.status === "declared" ? "text-chart-5 font-medium" : ""}>
                        {p.status === "declared" ? "declarado" : "projetado"}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-lg border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Top ativos por proventos
          </div>
          <Link
            to="/provisionador"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Ver provisionador <ArrowRight className="size-3" />
          </Link>
        </div>
        {byTicker.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhum provento previsto.</p>
        ) : (
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
                    <div className="font-semibold">{t.ticker}</div>
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
        )}
      </section>
    </div>
  );
}

function CutoffPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const options = [
    { label: "30 dias", value: 30 },
    { label: "60 dias", value: 60 },
    { label: "90 dias", value: 90 },
    { label: "180 dias", value: 180 },
    { label: "12 meses", value: 365 },
  ];

  return (
    <div className="flex gap-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={`rounded px-2 py-0.5 text-xs transition ${
            value === o.value
              ? "bg-primary text-primary-foreground font-medium"
              : "bg-muted text-muted-foreground hover:bg-secondary"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="tabular mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
