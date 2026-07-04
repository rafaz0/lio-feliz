import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Info, Plus, Wallet } from "lucide-react";
import { listOperations } from "@/lib/operations.functions";
import { consolidatePortfolio } from "@/lib/portfolio";
import { AddOperationDialog } from "@/components/add-operation-dialog";
import { DeltaPct } from "@/components/delta-pct";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatBRL, formatQty } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/carteira/")({
  component: PortfolioOverview,
});

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
  const { data: ops, isLoading } = useQuery({
    queryKey: ["operations"],
    queryFn: () => list(),
  });

  if (isLoading || !ops) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
    );
  }

  const portfolio = consolidatePortfolio(ops);
  const isEmpty = portfolio.positions.length === 0;

  return (
    <div className="space-y-6">
      <section className="grid gap-3 md:grid-cols-4">
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
      </section>

      <section className="flex flex-wrap items-center gap-3">
        <AddOperationDialog
          trigger={
            <Button className="gap-2">
              <Plus className="size-4" /> Nova operação
            </Button>
          }
        />
        <Button variant="outline" disabled className="gap-2">
          <Wallet className="size-4" /> Sincronizar com B3
          <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            em breve
          </span>
        </Button>
      </section>

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
                Ordenadas por valor atual · preços mock em tempo "real"
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
                    <th className="px-4 py-2.5 text-right font-medium">Valor atual</th>
                    <th className="px-4 py-2.5 text-right font-medium">P/L</th>
                    <th className="px-4 py-2.5 text-right font-medium">%</th>
                    <th className="px-4 py-2.5 text-right font-medium">Peso</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.positions.map((p) => (
                    <tr key={p.ticker} className="border-t border-border hover:bg-surface">
                      <td className="px-4 py-2.5">
                        <Link
                          to="/ativo/$ticker"
                          params={{ ticker: p.ticker }}
                          className="font-semibold hover:text-primary"
                        >
                          {p.ticker}
                        </Link>
                        <div className="text-xs text-muted-foreground">{p.sector}</div>
                      </td>
                      <td className="tabular px-4 py-2.5 text-right">{formatQty(p.quantity)}</td>
                      <td className="tabular px-4 py-2.5 text-right">{formatBRL(p.avgPrice)}</td>
                      <td className="tabular px-4 py-2.5 text-right">
                        {formatBRL(p.currentPrice)}
                      </td>
                      <td className="tabular px-4 py-2.5 text-right font-medium">
                        {formatBRL(p.currentValue)}
                      </td>
                      <td className="tabular px-4 py-2.5 text-right">
                        <span
                          className={p.pnl >= 0 ? "text-positive" : "text-negative"}
                        >
                          {formatBRL(p.pnl)}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <DeltaPct value={p.pnlPct} />
                      </td>
                      <td className="tabular px-4 py-2.5 text-right text-muted-foreground">
                        {p.weight.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
            <p className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              Preços atualizados a partir de dados mock. Integração B3 chegará em breve.
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
