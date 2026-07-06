import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Building2, TrendingUp, Medal, BarChart3, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { getAssetList, type AssetLite } from "@/lib/data-functions";
import { formatBRL, formatBRLCompact } from "@/lib/format";

export const Route = createFileRoute("/setores")({
  loader: async () => {
    const list = await getAssetList({ data: { limit: 500 } });
    return { list };
  },
  head: () => ({
    meta: [
      { title: "Setores — Investidor Pro" },
      {
        name: "description",
        content:
          "Análise de setores da B3: médias de indicadores fundamentalistas por setor e empresas listadas.",
      },
    ],
  }),
  component: SetoresPage,
});

interface SectorAgg {
  sector: string;
  count: number;
  avgDy: number;
  avgPl: number;
  avgPvp: number;
  avgRoe: number;
  avgMarketCap: number;
  tickers: string[];
}

function SetoresPage() {
  const { list } = Route.useLoaderData();

  const sectors = useMemo(() => {
    const withFund = list.filter(
      (a): a is AssetLite & { fundamentals: NonNullable<AssetLite["fundamentals"]> } =>
        a.fundamentals !== null,
    );
    const map = new Map<string, SectorAgg>();

    for (const a of withFund) {
      const key = a.sector || "Outros";
      const cur = map.get(key) ?? {
        sector: key,
        count: 0,
        avgDy: 0,
        avgPl: 0,
        avgPvp: 0,
        avgRoe: 0,
        avgMarketCap: 0,
        tickers: [],
      };
      cur.count++;
      cur.avgDy += a.fundamentals.dy;
      cur.avgPl += a.fundamentals.pl;
      cur.avgPvp += a.fundamentals.pvp ?? 0;
      cur.avgRoe += a.fundamentals.roe ?? 0;
      cur.avgMarketCap += a.fundamentals.marketCap;
      cur.tickers.push(a.ticker);
      map.set(key, cur);
    }

    return Array.from(map.values())
      .map((s) => ({
        ...s,
        avgDy: s.count > 0 ? s.avgDy / s.count : 0,
        avgPl: s.count > 0 ? s.avgPl / s.count : 0,
        avgPvp: s.count > 0 ? s.avgPvp / s.count : 0,
        avgRoe: s.count > 0 ? s.avgRoe / s.count : 0,
        avgMarketCap: s.count > 0 ? s.avgMarketCap / s.count : 0,
      }))
      .sort((a, b) => b.count - a.count);
  }, [list]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[1200px] px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Building2 className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Setores</h1>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Setor</th>
                <th className="px-4 py-2.5 text-right font-medium">Empresas</th>
                <th className="px-4 py-2.5 text-right font-medium">DY médio</th>
                <th className="px-4 py-2.5 text-right font-medium">P/L médio</th>
                <th className="hidden md:table-cell px-4 py-2.5 text-right font-medium">
                  P/VP médio
                </th>
                <th className="hidden md:table-cell px-4 py-2.5 text-right font-medium">
                  ROE médio
                </th>
                <th className="hidden lg:table-cell px-4 py-2.5 text-right font-medium">
                  Valor de mercado médio
                </th>
              </tr>
            </thead>
            <tbody>
              {sectors.map((s) => (
                <tr key={s.sector} className="border-t border-border transition hover:bg-surface">
                  <td className="px-4 py-2.5 font-semibold">{s.sector}</td>
                  <td className="tabular px-4 py-2.5 text-right">{s.count}</td>
                  <td className="tabular px-4 py-2.5 text-right text-positive">
                    {s.avgDy.toFixed(2)}%
                  </td>
                  <td className="tabular px-4 py-2.5 text-right">{s.avgPl.toFixed(1)}</td>
                  <td className="hidden md:table-cell tabular px-4 py-2.5 text-right">
                    {s.avgPvp.toFixed(2)}
                  </td>
                  <td className="hidden md:table-cell tabular px-4 py-2.5 text-right">
                    {s.avgRoe.toFixed(1)}%
                  </td>
                  <td className="hidden lg:table-cell tabular px-4 py-2.5 text-right text-muted-foreground">
                    {formatBRLCompact(s.avgMarketCap)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-8">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Empresas por setor
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((s) => (
              <div key={s.sector} className="rounded-lg border border-border bg-card p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{s.sector}</h3>
                  <span className="text-xs text-muted-foreground">{s.count} empresas</span>
                </div>
                <div className="mb-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                  <span>
                    DY <span className="tabular text-foreground">{s.avgDy.toFixed(2)}%</span>
                  </span>
                  <span>
                    P/L <span className="tabular text-foreground">{s.avgPl.toFixed(1)}</span>
                  </span>
                  <span>
                    ROE <span className="tabular text-foreground">{s.avgRoe.toFixed(1)}%</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {s.tickers.map((t) => (
                    <Link
                      key={t}
                      to="/ativo/$ticker"
                      params={{ ticker: t }}
                      className="rounded bg-secondary px-1.5 py-0.5 text-xs font-medium hover:text-primary"
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
