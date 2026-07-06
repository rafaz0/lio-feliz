import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { RECOMMENDED_PORTFOLIOS, type RecommendedPortfolio } from "@/lib/recommended-portfolios";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/carteiras-recomendadas")({
  head: () => ({
    meta: [
      { title: "Carteiras Recomendadas — Investidor Pro" },
      {
        name: "description",
        content: "Carteiras recomendadas de ações e FIIs para todos os perfis de investidor.",
      },
    ],
  }),
  component: RecommendedPage,
});

const RISK_STYLES: Record<string, string> = {
  conservador: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  moderado: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  agressivo: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

function RiskBadge({ risk }: { risk: string }) {
  return (
    <span
      className={
        "rounded px-2 py-0.5 text-[11px] font-medium uppercase " + (RISK_STYLES[risk] ?? "")
      }
    >
      {risk}
    </span>
  );
}

function DetailedView({ portfolio: p }: { portfolio: RecommendedPortfolio }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Dividend Yield</div>
          <div className="text-xl font-bold text-green-600">{p.dy.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Retorno 12 meses</div>
          <div className="text-xl font-bold">{p.totalReturn1y.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Retorno 60 meses</div>
          <div className="text-xl font-bold">{p.totalReturn5y.toFixed(1)}%</div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="text-xs text-muted-foreground">Seguidores</div>
          <div className="text-xl font-bold">{p.holders.toLocaleString("pt-BR")}</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface-2 text-xs uppercase text-muted-foreground">
              <th className="px-4 py-2.5 text-left font-medium">#</th>
              <th className="px-4 py-2.5 text-left font-medium">Ticker</th>
              <th className="px-4 py-2.5 text-left font-medium">Empresa</th>
              <th className="px-4 py-2.5 text-right font-medium">Peso</th>
              <th className="px-4 py-2.5 text-right font-medium">DY</th>
              <th className="px-4 py-2.5 text-right font-medium">P/L</th>
            </tr>
          </thead>
          <tbody>
            {p.holdings.map((h, i) => (
              <tr key={h.ticker} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 text-xs text-muted-foreground">{i + 1}</td>
                <td className="px-4 py-2.5 font-medium">
                  <Link
                    to="/ativo/$ticker"
                    params={{ ticker: h.ticker }}
                    className="flex items-center gap-1 hover:text-primary"
                  >
                    {h.ticker} <ExternalLink className="size-3" />
                  </Link>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{h.name}</td>
                <td className="px-4 py-2.5 text-right tabular-nums">{h.weight}%</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-green-600">
                  {h.dy.toFixed(1)}%
                </td>
                <td className="px-4 py-2.5 text-right tabular-nums">{h.pl.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RecommendedPage() {
  const [selected, setSelected] = useState<string>(RECOMMENDED_PORTFOLIOS[0].id);
  const portfolio =
    RECOMMENDED_PORTFOLIOS.find((p) => p.id === selected) ?? RECOMMENDED_PORTFOLIOS[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[900px] px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Carteiras Recomendadas</h1>
          <p className="text-sm text-muted-foreground">
            Carteiras montadas por analistas para diferentes perfis de investidor
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {RECOMMENDED_PORTFOLIOS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={
                "rounded-lg border px-4 py-2.5 text-left text-sm transition " +
                (selected === p.id
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card hover:bg-surface")
              }
            >
              <div className="font-semibold">{p.name}</div>
              <div className="mt-0.5 flex items-center gap-2">
                <RiskBadge risk={p.risk} />
                <span className="text-xs text-muted-foreground">{p.focus}</span>
              </div>
            </button>
          ))}
        </div>

        <DetailedView portfolio={portfolio} />
      </main>
    </div>
  );
}
