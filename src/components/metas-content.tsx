import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Target, TrendingUp, Plus, ExternalLink, Edit3, Wallet, PiggyBank, ChartPie } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { listOperations } from "@/lib/operations.functions";
import { getRealProjections } from "@/lib/data-functions";
import { consolidatePortfolio } from "@/lib/portfolio";
import { getQuotes } from "@/lib/quotes.functions";
import { useGoals } from "@/lib/goals";
import { formatBRL, formatPctPlain } from "@/lib/format";

function EditableTarget({
  label,
  icon,
  value,
  onSave,
  suffix,
}: {
  label: string;
  icon: React.ReactNode;
  value: number;
  onSave: (v: number) => void;
  suffix?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(String(value || ""));

  function handleSave() {
    const val = parseFloat(input.replace(/\./g, "").replace(",", "."));
    if (!isNaN(val) && val > 0) onSave(val);
    setEditing(false);
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      {editing ? (
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">R$</span>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="h-9 w-36 text-right text-lg font-bold"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setEditing(false);
            }}
          />
          <Button size="sm" onClick={handleSave}>Ok</Button>
          <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>X</Button>
        </div>
      ) : (
        <div className="mt-1 flex items-center gap-2">
          <span className="text-2xl font-bold">{value > 0 ? formatBRL(value) : "—"}</span>
          {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
          <button onClick={() => { setInput(String(value || "")); setEditing(true); }} className="text-muted-foreground hover:text-foreground transition">
            <Edit3 className="size-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{pct.toFixed(0)}%</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-chart-2 transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function MetasContent() {
  const { user } = useSession();
  const { goals, setDividendTarget, setPatrimonyTarget, setSavingsTarget } = useGoals();
  const fetchOps = useServerFn(listOperations);
  const fetchProj = useServerFn(getRealProjections);
  const fetchQuotes = useServerFn(getQuotes);

  const { data: ops } = useQuery({ queryKey: ["operations"], queryFn: () => fetchOps(), enabled: !!user });
  const { data: quotesRes } = useQuery({ queryKey: ["quotes", "goals"], queryFn: () => fetchQuotes({ data: { tickers: [] } }), enabled: false });

  const portfolio = useMemo(() => {
    if (!ops) return null;
    return consolidatePortfolio(ops);
  }, [ops]);

  const portfolioTickers = useMemo(() => {
    if (!portfolio) return [];
    return portfolio.positions.map((p) => p.ticker);
  }, [portfolio]);

  const { data: projections, isLoading } = useQuery({
    queryKey: ["real-projections", portfolioTickers],
    queryFn: () => fetchProj({ data: { tickers: portfolioTickers } }),
    enabled: portfolioTickers.length > 0,
    staleTime: 60_000,
  });

  const monthlyAvgDividend = useMemo(() => {
    if (!projections || projections.length === 0) return 0;
    const months = new Map<string, number>();
    for (const p of projections) {
      const m = p.paymentDate.slice(0, 7);
      months.set(m, (months.get(m) ?? 0) + p.amount);
    }
    const values = Array.from(months.values());
    return values.reduce((s, v) => s + v, 0) / Math.max(values.length, 1);
  }, [projections]);

  const totalPatrimony = portfolio?.totalValue ?? 0;
  const totalInvested = portfolio?.totalInvested ?? 0;

  const divTarget = goals.monthlyDividendTarget || 0;
  const patTarget = goals.patrimonyTarget || 0;
  const savTarget = goals.monthlySavingsTarget || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Target className="size-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Metas</h1>
      </div>

      {/* Goal cards */}
      <section className="grid gap-3 sm:grid-cols-3">
        <EditableTarget
          label="Renda passiva / mês"
          icon={<PiggyBank className="size-3.5" />}
          value={divTarget}
          onSave={setDividendTarget}
        />
        <EditableTarget
          label="Patrimônio total"
          icon={<Wallet className="size-3.5" />}
          value={patTarget}
          onSave={setPatrimonyTarget}
        />
        <EditableTarget
          label="Investimento / mês"
          icon={<ChartPie className="size-3.5" />}
          value={savTarget}
          onSave={setSavingsTarget}
        />
      </section>

      {/* Current status */}
      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Renda passiva</h2>
          {monthlyAvgDividend > 0 && (
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Projetado:</span>
              <span className="tabular font-semibold text-positive">{formatBRL(monthlyAvgDividend)}/mês</span>
            </div>
          )}
          <div className="space-y-3">
            {divTarget > 0 && <ProgressBar value={monthlyAvgDividend} max={divTarget} label="Meta mensal" />}
          </div>
          {divTarget > 0 && monthlyAvgDividend > 0 && monthlyAvgDividend < divTarget && (
            <p className="mt-3 text-xs text-muted-foreground">
              Faltam {formatBRL(divTarget - monthlyAvgDividend)}/mês para atingir a meta
            </p>
          )}
          {divTarget > 0 && monthlyAvgDividend >= divTarget && (
            <p className="mt-3 text-xs font-semibold text-positive">Meta de renda passiva atingida!</p>
          )}
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Patrimônio</h2>
          <div className="mb-3 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Atual:</span>
              <span className="tabular font-semibold">{formatBRL(totalPatrimony)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Investido:</span>
              <span className="tabular">{formatBRL(totalInvested)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Lucro:</span>
              <span className={`tabular font-semibold ${portfolio && portfolio.totalPnl >= 0 ? "text-positive" : "text-negative"}`}>
                {portfolio ? formatBRL(portfolio.totalPnl) : "—"}
              </span>
            </div>
          </div>
          {patTarget > 0 && <ProgressBar value={totalPatrimony} max={patTarget} label="Meta de patrimônio" />}
        </div>
      </section>

      {/* Goal projection */}
      {divTarget > 0 && monthlyAvgDividend > 0 && monthlyAvgDividend < divTarget && (
        <section className="rounded-lg border border-border bg-card p-5">
          <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="size-4 text-chart-2" /> Quanto investir a mais?
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Para fechar o gap de <strong>{formatBRL(divTarget - monthlyAvgDividend)}/mês</strong> em dividendos,
            considerando um DY médio de 6% ao ano:
          </p>
          <p className="mt-2 text-lg font-bold text-primary">
            ~{formatBRL((divTarget - monthlyAvgDividend) / 0.005)} em novos investimentos
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Cálculo: gap mensal / (6% ÷ 12 meses). DY médio estimado.
          </p>
        </section>
      )}

      {!user && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
          Faça <Link to="/auth" className="font-semibold underline">login</Link> para conectar sua carteira.
        </div>
      )}

      {user && portfolioTickers.length === 0 && (
        <div className="rounded-lg border border-dashed border-border bg-card p-8 text-center">
          <Plus className="mx-auto size-6 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Nenhum ativo na carteira.{" "}
            <Link to="/" className="text-primary hover:underline">Adicione operações</Link> para ver projeções.
          </p>
        </div>
      )}

      {isLoading && (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-16" />)}
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
                const pct = divTarget > 0 ? (monthly / divTarget) * 100 : 0;
                return (
                  <div key={ticker} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Link to="/ativo/$ticker" params={{ ticker }} className="flex items-center gap-1 font-semibold hover:text-primary">
                          {ticker} <ExternalLink className="size-3" />
                        </Link>
                        <span className="text-xs text-muted-foreground">{data.name}</span>
                      </div>
                      <span className="tabular font-semibold text-positive">{formatBRL(monthly)}/mês</span>
                    </div>
                    {divTarget > 0 && (
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <div className="h-full rounded-full bg-chart-2" style={{ width: `${Math.min(100, pct)}%` }} />
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </section>
      )}
    </div>
  );
}