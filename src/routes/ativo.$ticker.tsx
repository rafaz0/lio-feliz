import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Plus } from "lucide-react";
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
import { DeltaPct } from "@/components/delta-pct";
import { AddOperationDialog } from "@/components/add-operation-dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/use-session";
import { getAsset } from "@/lib/mock-data";
import { formatBRL, formatBRLCompact, formatDate } from "@/lib/format";

export const Route = createFileRoute("/ativo/$ticker")({
  loader: ({ params }) => {
    const asset = getAsset(params.ticker);
    if (!asset) throw notFound();
    return { asset };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Ativo não encontrado — Investidor Pro" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const a = loaderData.asset;
    return {
      meta: [
        { title: `${a.ticker} · ${a.name} — Investidor Pro` },
        {
          name: "description",
          content: `Cotação, indicadores fundamentalistas e dividendos de ${a.ticker} (${a.name}). Setor: ${a.sector}.`,
        },
        { property: "og:title", content: `${a.ticker} — ${a.name}` },
        {
          property: "og:description",
          content: `Análise fundamentalista de ${a.ticker}: P/L, P/VP, DY, ROE e mais.`,
        },
      ],
    };
  },
  notFoundComponent: TickerNotFound,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <p className="text-negative">Erro ao carregar ativo: {error.message}</p>
    </div>
  ),
  component: AssetPage,
});

function TickerNotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-3xl font-semibold">Ativo não encontrado</h1>
        <p className="mt-2 text-muted-foreground">
          Não encontramos esse ticker na nossa cobertura. Tente outro código B3.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Voltar ao mercado</Link>
        </Button>
      </div>
    </div>
  );
}

function AssetPage() {
  const { asset } = Route.useLoaderData();
  const { user } = useSession();
  const isUp = asset.changeDayPct >= 0;

  const indicators = [
    { label: "P/L", value: asset.fundamentals.pl.toFixed(1), hint: "Preço / Lucro" },
    { label: "P/VP", value: asset.fundamentals.pvp.toFixed(2), hint: "Preço / Valor Patrimonial" },
    { label: "DY", value: `${asset.fundamentals.dy.toFixed(2)}%`, hint: "Dividend Yield" },
    { label: "ROE", value: `${asset.fundamentals.roe.toFixed(1)}%`, hint: "Return on Equity" },
    { label: "ROIC", value: `${asset.fundamentals.roic.toFixed(1)}%`, hint: "Return on Invested Capital" },
    {
      label: "Margem Líquida",
      value: `${asset.fundamentals.margemLiquida.toFixed(1)}%`,
      hint: "Lucro Líquido / Receita",
    },
    {
      label: "Dív. Líq./EBITDA",
      value: asset.fundamentals.divLiquidaEbitda.toFixed(2),
      hint: "Alavancagem",
    },
    { label: "LPA", value: formatBRL(asset.fundamentals.lpa), hint: "Lucro por ação" },
    { label: "VPA", value: formatBRL(asset.fundamentals.vpa), hint: "Valor patrimonial por ação" },
    {
      label: "Valor de mercado",
      value: formatBRLCompact(asset.fundamentals.marketCap),
      hint: "Market cap",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-8">
        <Link
          to="/"
          className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" /> Voltar ao mercado
        </Link>

        {/* Header */}
        <section className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{asset.ticker}</h1>
              <span className="rounded bg-secondary px-2 py-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                {asset.sector}
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">{asset.name}</p>
          </div>
          <div className="flex items-end gap-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Cotação</div>
              <div className="tabular mt-1 text-3xl font-bold">{formatBRL(asset.price)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Var. dia</div>
              <div className="mt-1 text-2xl">
                <DeltaPct value={asset.changeDayPct} className="text-2xl" />
              </div>
            </div>
            {user ? (
              <AddOperationDialog
                defaultTicker={asset.ticker}
                defaultPrice={asset.price}
                trigger={
                  <Button size="lg" className="gap-2">
                    <Plus className="size-4" /> Adicionar à carteira
                  </Button>
                }
              />
            ) : (
              <Button asChild size="lg" variant="outline">
                <Link to="/auth">Entrar para operar</Link>
              </Button>
            )}
          </div>
        </section>

        {/* Indicators grid */}
        <section className="mt-8">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Indicadores fundamentalistas
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {indicators.map((i) => (
              <div
                key={i.label}
                className="rounded-md border border-border bg-card p-3"
              >
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {i.hint}
                </div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">{i.label}</div>
                <div className="tabular mt-1.5 text-lg font-semibold">{i.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Chart + dividends */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Cotação · 12 meses</h2>
              <span className="text-xs text-muted-foreground">Fechamento semanal</span>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={asset.history} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={isUp ? "var(--color-positive)" : "var(--color-negative)"}
                        stopOpacity={0.4}
                      />
                      <stop
                        offset="100%"
                        stopColor={isUp ? "var(--color-positive)" : "var(--color-negative)"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    tickFormatter={(d: string) => {
                      const [, m] = d.split("-");
                      return m;
                    }}
                    interval="preserveStartEnd"
                    minTickGap={30}
                    stroke="var(--color-border)"
                  />
                  <YAxis
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    domain={["dataMin - 2", "dataMax + 2"]}
                    tickFormatter={(v: number) => v.toFixed(0)}
                    width={40}
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
                    formatter={(v: number) => [formatBRL(v), "Fechamento"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="close"
                    stroke={isUp ? "var(--color-positive)" : "var(--color-negative)"}
                    strokeWidth={2}
                    fill="url(#chartFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <div className="border-b border-border bg-surface-2 px-4 py-3">
              <h2 className="text-sm font-semibold">Últimos proventos</h2>
              <p className="text-xs text-muted-foreground">Por ação, últimos 12 meses</p>
            </div>
            <table className="w-full text-sm">
              <thead className="text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2 text-left font-medium">Data</th>
                  <th className="px-4 py-2 text-left font-medium">Tipo</th>
                  <th className="px-4 py-2 text-right font-medium">Valor</th>
                </tr>
              </thead>
              <tbody>
                {asset.dividends.map((d: typeof asset.dividends[number], i: number) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-4 py-2 text-muted-foreground">{formatDate(d.paidAt)}</td>
                    <td className="px-4 py-2">{d.type}</td>
                    <td className="tabular px-4 py-2 text-right">{formatBRL(d.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-sm font-semibold">Sobre {asset.name}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{asset.description}</p>
        </section>
      </main>
    </div>
  );
}
