import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { BarChart3, Building2, Plus, Search, TrendingUp, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site-header";
import { FIIS } from "@/lib/fii-mock-data";
import { getAllAssets } from "@/lib/data-functions";
import { getQuotes } from "@/lib/quotes.functions";
import { formatBRL, formatBRLCompact, formatPctPlain } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/comparar")({
  loader: async () => {
    const assets = await getAllAssets();
    return { assets };
  },
  head: ({ loaderData }) => {
    const count = loaderData?.assets?.length ?? 0;
    return {
      meta: [
        { title: "Comparador de Ativos — Investidor Pro" },
        {
          name: "description",
          content: `Compare ${count} ações brasileiras lado a lado: P/L, P/VP, DY, ROE e mais.`,
        },
      ],
    };
  },
  component: CompararPage,
});

type Mode = "stocks" | "fiis";

function CompararPage() {
  const { assets: allAssets } = Route.useLoaderData();
  const [mode, setMode] = useState<Mode>("stocks");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>(["PETR4", "VALE3", "ITUB4"]);

  const fetchQuotes = useServerFn(getQuotes);
  useQuery({
    queryKey: ["quotes", "comparar"],
    queryFn: () => fetchQuotes({ data: { tickers: allAssets.map((a) => a.ticker) } }),
    refetchInterval: 300_000,
    staleTime: 60_000,
  });

  const dataSource = mode === "stocks" ? allAssets : FIIS;

  const searchMatches = useMemo(() => {
    const term = search.trim().toUpperCase();
    if (!term || selected.length >= 6) return [];
    return dataSource
      .filter(
        (a: any) =>
          !selected.includes(a.ticker) &&
          (a.ticker.includes(term) || a.name.toUpperCase().includes(term)),
      )
      .slice(0, 8);
  }, [search, selected, dataSource]);

  function addTicker(t: string) {
    if (!selected.includes(t) && selected.length < 6) {
      setSelected([...selected, t]);
    }
    setSearch("");
  }

  function removeTicker(t: string) {
    setSelected(selected.filter((s) => s !== t));
  }

  const assets = useMemo(
    () => selected.map((t) => dataSource.find((a: any) => a.ticker === t)).filter(Boolean),
    [selected, dataSource],
  );

  const stockIndicators = useMemo(
    () => [
      { key: "Preço", get: (a: any) => formatBRL(a.price) },
      {
        key: "Variação dia",
        get: (a: any) => `${a.changeDayPct >= 0 ? "+" : ""}${a.changeDayPct.toFixed(2)}%`,
      },
      { key: "P/L", get: (a: any) => a.fundamentals.pl.toFixed(1) },
      { key: "P/VP", get: (a: any) => a.fundamentals.pvp.toFixed(2) },
      { key: "Dividend Yield", get: (a: any) => formatPctPlain(a.fundamentals.dy) },
      { key: "Payout", get: (a: any) => formatPctPlain(a.fundamentals.payout) },
      { key: "CAGR Dividendos", get: (a: any) => formatPctPlain(a.fundamentals.dividendCagr) },
      { key: "ROE", get: (a: any) => formatPctPlain(a.fundamentals.roe) },
      { key: "ROIC", get: (a: any) => formatPctPlain(a.fundamentals.roic) },
      { key: "Margem Líquida", get: (a: any) => formatPctPlain(a.fundamentals.margemLiquida) },
      { key: "EV/EBITDA", get: (a: any) => a.fundamentals.evEbitda.toFixed(1) },
      { key: "PSR", get: (a: any) => a.fundamentals.psr.toFixed(2) },
      { key: "Dív. Líq./EBITDA", get: (a: any) => a.fundamentals.divLiquidaEbitda.toFixed(2) },
      { key: "LPA", get: (a: any) => formatBRL(a.fundamentals.lpa) },
      { key: "VPA", get: (a: any) => formatBRL(a.fundamentals.vpa) },
      { key: "Valor de Mercado", get: (a: any) => formatBRLCompact(a.fundamentals.marketCap) },
    ],
    [],
  );

  const fiiIndicators = useMemo(
    () => [
      { key: "Preço", get: (a: (typeof FIIS)[number]) => formatBRL(a.price) },
      { key: "Dividend Yield", get: (a: (typeof FIIS)[number]) => formatPctPlain(a.dy) },
      { key: "P/VP", get: (a: (typeof FIIS)[number]) => a.pvp.toFixed(2) },
      {
        key: "Cap Rate",
        get: (a: (typeof FIIS)[number]) => (a.capRate > 0 ? formatPctPlain(a.capRate) : "—"),
      },
      { key: "Vacância", get: (a: (typeof FIIS)[number]) => formatPctPlain(a.vacancy) },
      { key: "Vacância Média", get: (a: (typeof FIIS)[number]) => formatPctPlain(a.avgVacancy) },
      {
        key: "Liquidez Diária",
        get: (a: (typeof FIIS)[number]) => formatBRLCompact(a.dailyLiquidity),
      },
      {
        key: "Nº Cotistas",
        get: (a: (typeof FIIS)[number]) => (a.shareholders / 1000).toFixed(1) + "k",
      },
      { key: "Segmento", get: (a: (typeof FIIS)[number]) => a.segment },
    ],
    [],
  );

  const indicators = mode === "stocks" ? stockIndicators : fiiIndicators;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <BarChart3 className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Comparador de Ativos</h1>
        </div>

        <div className="mb-6 flex items-center gap-1.5 rounded-lg border border-border bg-card p-1.5 w-fit">
          <Button
            variant={mode === "stocks" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setMode("stocks");
              setSelected(["PETR4", "VALE3", "ITUB4"]);
              setSearch("");
            }}
          >
            <TrendingUp className="mr-1.5 size-3.5" /> Ações
          </Button>
          <Button
            variant={mode === "fiis" ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setMode("fiis");
              setSelected(["KNCR11", "HGLG11", "XPML11"]);
              setSearch("");
            }}
          >
            <Building2 className="mr-1.5 size-3.5" /> FIIs
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {assets.map((a: any) =>
              a ? (
                <span
                  key={a.ticker}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                >
                  {a.ticker}
                  <button onClick={() => removeTicker(a.ticker)} className="hover:text-destructive">
                    <X className="size-3.5" />
                  </button>
                </span>
              ) : null,
            )}
            {selected.length < 6 && (
              <div className="relative">
                <Search className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Adicionar ticker..."
                  autoComplete="off"
                  className="h-8 w-44 pl-7 text-sm"
                />
                {searchMatches.length > 0 && (
                  <div className="absolute left-0 top-9 z-50 w-64 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
                    {searchMatches.map((m: any) => (
                      <button
                        key={m.ticker}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          addTicker(m.ticker);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-secondary"
                      >
                        <span className="font-semibold">{m.ticker}</span>
                        <span className="truncate text-xs text-muted-foreground">{m.name}</span>
                        <Plus className="ml-auto size-3.5 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {assets.length === 0 || assets.every((a) => !a) ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
            <BarChart3 className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Adicione ao menos um ativo para começar a comparação.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-surface-2 text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">Indicador</th>
                    {assets.map(
                      (a: any) =>
                        a && (
                          <th key={a.ticker} className="px-4 py-3 text-right font-medium">
                            {a.ticker}
                          </th>
                        ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {indicators.map((ind, i) => (
                    <tr
                      key={ind.key}
                      className={
                        "border-t border-border " + (i % 2 === 0 ? "bg-card" : "bg-surface/50")
                      }
                    >
                      <td className="px-4 py-2.5 font-medium text-muted-foreground">{ind.key}</td>
                      {assets.map(
                        (a: any) =>
                          a && (
                            <td
                              key={a.ticker}
                              className="tabular px-4 py-2.5 text-right font-semibold"
                            >
                              {ind.get(a)}
                            </td>
                          ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <section className="mt-8">
              <h2 className="mb-4 text-sm font-semibold">Comparação visual</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(mode === "stocks"
                  ? ["P/L", "Dividend Yield", "Payout", "ROE", "EV/EBITDA", "Dív. Líq./EBITDA"]
                  : [
                      "Dividend Yield",
                      "P/VP",
                      "Cap Rate",
                      "Vacância",
                      "Liquidez Diária",
                      "Nº Cotistas",
                    ]
                ).map((indKey) => {
                  const ind = indicators.find((i) => i.key === indKey);
                  if (!ind) return null;
                  const values = assets.map((a: any) => a && ind.get(a));
                  const nums = assets.map((a: any) => {
                    if (!a) return 0;
                    const v = String(ind.get(a))
                      .replace("R$", "")
                      .replace(/\./g, "")
                      .replace(",", ".")
                      .replace("%", "")
                      .replace("k", "")
                      .replace("—", "0")
                      .trim();
                    return Number(v);
                  });
                  const max = Math.max(...nums.filter((n) => !isNaN(n)), 1);
                  const min = Math.min(...nums.filter((n) => !isNaN(n)), 0);
                  const range = max - min || 1;
                  const isNeg = indKey === "Dív. Líq./EBITDA" || indKey === "Vacância";
                  return (
                    <div key={indKey} className="rounded-lg border border-border bg-card p-4">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                        {indKey}
                      </div>
                      <div className="space-y-2">
                        {assets.map((a: any, idx: number) => {
                          if (!a) return null;
                          const v = nums[idx];
                          const pct = isNaN(v) ? 0 : ((v - min) / range) * 100;
                          const isPositive = !isNeg ? v >= 0 : v <= 0;
                          return (
                            <div key={a.ticker}>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-semibold">{a.ticker}</span>
                                <span className="tabular text-muted-foreground">{values[idx]}</span>
                              </div>
                              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                                <div
                                  className="h-full rounded-full transition-all"
                                  style={{
                                    width: `${Math.max(2, pct)}%`,
                                    background: isPositive
                                      ? "var(--color-positive)"
                                      : "var(--color-negative)",
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
