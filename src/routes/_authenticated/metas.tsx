import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Target, TrendingUp, Plus, ExternalLink, Edit3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { listOperations } from "@/lib/operations.functions";
import { getRealProjections } from "@/lib/data-functions";
import { useGoals } from "@/lib/goals";
import { formatBRL, formatPctPlain } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/metas")({
  head: () => ({
    meta: [
      { title: "Metas de Dividendos — Investidor Pro" },
      {
        name: "description",
        content: "Defina sua meta de dividendos mensais e acompanhe o progresso.",
      },
    ],
  }),
  component: GoalsPage,
});

function GoalsPage() {
  const { user } = useSession();
  const { goals, setMonthlyTarget } = useGoals();
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(goals.monthlyTarget || ""));

  const fetchProjections = useServerFn(getRealProjections);
  const list = useServerFn(listOperations);
  const { data: ops } = useQuery({
    queryKey: ["operations"],
    queryFn: () => list(),
    enabled: !!user,
  });

  const portfolioTickers = useMemo(() => {
    if (!ops) return [];
    const map = new Map<string, number>();
    for (const op of ops.sort((a, b) => a.traded_at.localeCompare(b.traded_at))) {
      const cur = map.get(op.ticker) ?? 0;
      if (op.side === "buy") map.set(op.ticker, cur + op.quantity);
      else map.set(op.ticker, Math.max(0, cur - op.quantity));
    }
    return Array.from(map.entries())
      .filter(([_, q]) => q > 0)
      .map(([t]) => t);
  }, [ops]);

  const { data: projections, isLoading } = useQuery({
    queryKey: ["real-projections", portfolioTickers],
    queryFn: () => fetchProjections({ data: { tickers: portfolioTickers } }),
    enabled: portfolioTickers.length > 0,
    staleTime: 60_000,
  });

  const monthlyAvg = useMemo(() => {
    if (!projections || projections.length === 0) return 0;
    const months = new Map<string, number>();
    for (const p of projections) {
      const m = p.paymentDate.slice(0, 7);
      months.set(m, (months.get(m) ?? 0) + p.amount);
    }
    const values = Array.from(months.values());
    return values.reduce((s, v) => s + v, 0) / Math.max(values.length, 1);
  }, [projections]);

  const target = goals.monthlyTarget || 0;
  const progress = target > 0 ? Math.min(100, (monthlyAvg / target) * 100) : 0;
  const gap = Math.max(0, target - monthlyAvg);

  function handleSave() {
    const val = parseFloat(inputValue.replace(/\./g, "").replace(",", "."));
    if (!isNaN(val) && val > 0) {
      setMonthlyTarget(val);
    }
    setEditing(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[800px] px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Target className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Metas de Dividendos</h1>
        </div>

        {/* Target setting */}
        <section className="mb-6 rounded-lg border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Meta mensal</p>
              {editing ? (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="h-9 w-40 text-right text-lg font-bold"
                    placeholder="5.000"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSave();
                      if (e.key === "Escape") setEditing(false);
                    }}
                  />
                  <Button size="sm" onClick={handleSave}>
                    Salvar
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
                    Cancelar
                  </Button>
                </div>
              ) : (
                <div className="mt-1 flex items-center gap-3">
                  <span className="text-3xl font-bold">{target > 0 ? formatBRL(target) : "—"}</span>
                  <button
                    onClick={() => {
                      setInputValue(String(target || ""));
                      setEditing(true);
                    }}
                    className="text-muted-foreground hover:text-foreground transition"
                  >
                    <Edit3 className="size-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Projetado</p>
              <p className="text-3xl font-bold text-green-600">
                {monthlyAvg > 0 ? formatBRL(monthlyAvg) : "—"}
              </p>
            </div>
          </div>

          {target > 0 && monthlyAvg > 0 && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-semibold">{formatPctPlain(progress / 100)}</span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-green-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, progress)}%` }}
                />
              </div>
              {gap > 0 && (
                <p className="mt-3 text-sm text-muted-foreground">
                  Faltam <span className="font-semibold text-foreground">{formatBRL(gap)}/mês</span>{" "}
                  para atingir sua meta
                </p>
              )}
              {progress >= 100 && (
                <p className="mt-3 text-sm font-semibold text-green-600">
                  Meta atingida! Seus dividendos projetados já cobrem{" "}
                  {formatPctPlain(progress / 100)} da sua meta.
                </p>
              )}
            </div>
          )}
        </section>

        {!user && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
            Faça{" "}
            <Link to="/auth" className="font-semibold underline">
              login
            </Link>{" "}
            para conectar sua carteira e ver projeções reais.
          </div>
        )}

        {user && portfolioTickers.length === 0 && (
          <div className="mb-6 rounded-lg border border-dashed border-border bg-card p-8 text-center">
            <Plus className="mx-auto size-6 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Nenhum ativo na carteira.{" "}
              <Link to="/" className="text-primary hover:underline">
                Adicione operações
              </Link>{" "}
              para ver projeções.
            </p>
          </div>
        )}

        {isLoading && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        )}

        {projections && projections.length > 0 && (
          <section>
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Contribuição por ativo (média mensal)
            </h2>
            <div className="space-y-2">
              {Array.from(
                projections.reduce((map, p) => {
                  const cur = map.get(p.ticker) ?? { name: p.name, total: 0, count: 0 };
                  cur.total += p.amount;
                  cur.count += 1;
                  map.set(p.ticker, cur);
                  return map;
                }, new Map<string, { name: string; total: number; count: number }>()),
              )
                .sort(([, a], [, b]) => b.total - a.total)
                .map(([ticker, data]) => {
                  const monthly = data.total / data.count;
                  const pct = target > 0 ? (monthly / target) * 100 : 0;
                  return (
                    <div key={ticker} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Link
                            to="/ativo/$ticker"
                            params={{ ticker }}
                            className="flex items-center gap-1 font-semibold hover:text-primary"
                          >
                            {ticker} <ExternalLink className="size-3" />
                          </Link>
                          <span className="text-xs text-muted-foreground">{data.name}</span>
                        </div>
                        <span className="tabular font-semibold text-green-600">
                          {formatBRL(monthly)}/mês
                        </span>
                      </div>
                      {target > 0 && (
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-chart-2"
                            style={{ width: `${Math.min(100, pct)}%` }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {target > 0 && monthlyAvg > 0 && gap > 0 && (
          <section className="mt-6 rounded-lg border border-border bg-card p-5">
            <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <TrendingUp className="size-4 text-chart-2" /> Quanto investir a mais?
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Para fechar o gap de <strong>{formatBRL(gap)}/mês</strong>, considerando um DY médio
              de 6% ao ano:
            </p>
            <p className="mt-2 text-lg font-bold text-primary">
              ~{formatBRL(gap / 0.005)} em novos investimentos
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Cálculo: gap mensal / (6% ÷ 12 meses). DY médio estimado.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
