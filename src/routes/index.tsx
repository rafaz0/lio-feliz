import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LineChart, TrendingUp, Wallet } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { DeltaPct } from "@/components/delta-pct";
import { Button } from "@/components/ui/button";
import { ASSETS } from "@/lib/mock-data";
import { formatBRL, formatBRLCompact } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Investidor Pro — Análise de ações brasileiras" },
      {
        name: "description",
        content:
          "Análise fundamentalista de ações da B3, cotações, dividendos e sua carteira consolidada. Rápido, denso, focado.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const gainers = [...ASSETS].sort((a, b) => b.changeDayPct - a.changeDayPct).slice(0, 5);
  const losers = [...ASSETS].sort((a, b) => a.changeDayPct - b.changeDayPct).slice(0, 5);
  const highDy = [...ASSETS].sort((a, b) => b.fundamentals.dy - a.fundamentals.dy).slice(0, 5);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-10">
        <section className="mb-10 grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              Mercado brasileiro
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Fundamentos, cotações e a sua carteira — no mesmo cockpit.
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Uma plataforma densa e sem enfeites para quem investe olhando indicadores. Busque
              qualquer ação da B3, acompanhe a variação do dia e gerencie sua posição em segundos.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/ativo/$ticker" params={{ ticker: "PETR4" }} className="gap-2">
                  Ver PETR4 <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/carteira" className="gap-2">
                  <Wallet className="size-4" /> Minha carteira
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <LineChart className="size-3.5" /> Panorama
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-y-4 gap-x-6">
              <Stat label="Ativos cobertos" value={String(ASSETS.length)} />
              <Stat
                label="Alta média (dia)"
                value={`${(ASSETS.reduce((s, a) => s + a.changeDayPct, 0) / ASSETS.length).toFixed(2)}%`}
              />
              <Stat
                label="Maior alta"
                value={`${gainers[0].ticker} · ${gainers[0].changeDayPct.toFixed(2)}%`}
              />
              <Stat
                label="Maior queda"
                value={`${losers[0].ticker} · ${losers[0].changeDayPct.toFixed(2)}%`}
              />
            </dl>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <MarketList title="Maiores altas" subtitle="Variação do dia" assets={gainers} tone="positive" />
          <MarketList title="Maiores quedas" subtitle="Variação do dia" assets={losers} tone="negative" />
          <MarketList
            title="Maiores dividendos"
            subtitle="Dividend Yield"
            assets={highDy}
            metric={(a) => `${a.fundamentals.dy.toFixed(2)}%`}
          />
        </div>

        <section className="mt-10">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <TrendingUp className="size-3.5" /> Todos os ativos
          </h2>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-surface-2 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Ticker</th>
                  <th className="px-4 py-2.5 text-left font-medium">Empresa</th>
                  <th className="px-4 py-2.5 text-left font-medium">Setor</th>
                  <th className="px-4 py-2.5 text-right font-medium">Preço</th>
                  <th className="px-4 py-2.5 text-right font-medium">Var. dia</th>
                  <th className="px-4 py-2.5 text-right font-medium">DY</th>
                  <th className="px-4 py-2.5 text-right font-medium">P/L</th>
                  <th className="px-4 py-2.5 text-right font-medium">Valor de mercado</th>
                </tr>
              </thead>
              <tbody>
                {ASSETS.map((a) => (
                  <tr key={a.ticker} className="border-t border-border transition hover:bg-surface">
                    <td className="px-4 py-2.5">
                      <Link
                        to="/ativo/$ticker"
                        params={{ ticker: a.ticker }}
                        className="font-semibold text-foreground hover:text-primary"
                      >
                        {a.ticker}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-muted-foreground">{a.name}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{a.sector}</td>
                    <td className="tabular px-4 py-2.5 text-right">{formatBRL(a.price)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <DeltaPct value={a.changeDayPct} />
                    </td>
                    <td className="tabular px-4 py-2.5 text-right">
                      {a.fundamentals.dy.toFixed(2)}%
                    </td>
                    <td className="tabular px-4 py-2.5 text-right">
                      {a.fundamentals.pl.toFixed(1)}
                    </td>
                    <td className="tabular px-4 py-2.5 text-right text-muted-foreground">
                      {formatBRLCompact(a.fundamentals.marketCap)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        Investidor Pro · dados de mercado fictícios para demonstração
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="tabular mt-1 text-lg font-semibold">{value}</dd>
    </div>
  );
}

function MarketList({
  title,
  subtitle,
  assets,
  tone,
  metric,
}: {
  title: string;
  subtitle: string;
  assets: typeof ASSETS;
  tone?: "positive" | "negative";
  metric?: (a: (typeof ASSETS)[number]) => string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-baseline justify-between border-b border-border bg-surface-2 px-4 py-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs text-muted-foreground">{subtitle}</span>
      </div>
      <ul>
        {assets.map((a) => (
          <li key={a.ticker} className="border-t border-border first:border-t-0">
            <Link
              to="/ativo/$ticker"
              params={{ ticker: a.ticker }}
              className="flex items-center justify-between px-4 py-2.5 transition hover:bg-surface"
            >
              <div>
                <div className="font-semibold">{a.ticker}</div>
                <div className="text-xs text-muted-foreground">{a.name}</div>
              </div>
              <div className="text-right">
                <div className="tabular text-sm">{formatBRL(a.price)}</div>
                {metric ? (
                  <div className="tabular text-xs text-primary">{metric(a)}</div>
                ) : (
                  <DeltaPct
                    value={a.changeDayPct}
                    className={
                      tone === "positive"
                        ? "text-positive"
                        : tone === "negative"
                          ? "text-negative"
                          : ""
                    }
                  />
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
