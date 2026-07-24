import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Search, Star, TrendingUp, X } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site-header";
import { DeltaPct } from "@/components/delta-pct";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/lib/watchlist";
import { getAssetList, type AssetLite } from "@/lib/data-functions";
import { getQuotes } from "@/lib/quotes.functions";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/watchlist/")({
  loader: async () => {
    const list = await getAssetList({ data: { limit: 500 } });
    return { list };
  },
  head: () => ({
    meta: [
      { title: "Watchlist — Investidor Pro" },
      { name: "description", content: "Monitore seus ativos favoritos da B3." },
    ],
  }),
  component: WatchlistPage,
});

function WatchlistPage() {
  const { list } = Route.useLoaderData();
  const { tickers, toggle } = useWatchlist();
  const [search, setSearch] = useState("");

  const fetchQuotes = useServerFn(getQuotes);
  const { data: quotesRes } = useQuery({
    queryKey: ["quotes", "watchlist", tickers],
    queryFn: () => fetchQuotes({ data: { tickers } }),
    refetchInterval: 300_000,
    staleTime: 60_000,
    enabled: tickers.length > 0,
  });

  const quotes = quotesRes?.quotes ?? {};

  const watchedAssets: (AssetLite & { inList: boolean })[] = useMemo(() => {
    if (tickers.length === 0) return [];
    const tickerSet = new Set(tickers);
    const fromList = list.filter((a) => tickerSet.has(a.ticker));

    // Also include tickers not in our list (user added unknown ones)
    const found = new Set(fromList.map((a) => a.ticker));
    const unknown = tickers.filter((t) => !found.has(t));

    return [
      ...fromList.map((a) => {
        const live = quotes[a.ticker];
        return {
          ...a,
          price: live?.price ?? a.price,
          changeDayPct: live?.changePct ?? a.changeDayPct,
          inList: true,
        };
      }),
      ...unknown.map((t) => {
        const live = quotes[t];
        return {
          ticker: t,
          name: live?.name ?? t,
          price: live?.price ?? 0,
          changeDayPct: live?.changePct ?? 0,
          sector: null,
          fundamentals: null,
          isRealData: true,
          inList: false,
        } as AssetLite & { inList: boolean };
      }),
    ];
  }, [list, tickers, quotes]);

  const searchMatches = useMemo(() => {
    if (!search.trim()) return [];
    const term = search.trim().toUpperCase();
    const tickerSet = new Set(tickers);
    return list
      .filter((a) => !tickerSet.has(a.ticker))
      .filter((a) => a.ticker.includes(term) || a.name.toUpperCase().includes(term))
      .slice(0, 8);
  }, [search, list, tickers]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-[1000px] px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Star className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Watchlist</h1>
          <span className="text-xs text-muted-foreground">{tickers.length} ativos monitorados</span>
        </div>

        {/* Add ticker */}
        <div className="relative mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 max-w-xs">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Adicionar ticker..."
                autoComplete="off"
                className="h-9 pl-7 text-sm"
              />
            </div>
          </div>
          {searchMatches.length > 0 && (
            <div className="absolute left-0 top-12 z-50 w-72 overflow-hidden rounded-md border border-border bg-popover shadow-lg">
              {searchMatches.map((a) => (
                <button
                  key={a.ticker}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggle(a.ticker);
                    setSearch("");
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-secondary"
                >
                  <Plus className="size-3.5 text-primary" />
                  <span className="font-semibold">{a.ticker}</span>
                  <span className="truncate text-xs text-muted-foreground">{a.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {watchedAssets.length === 0 && (
          <EmptyState
            icon={Star}
            title="Watchlist vazia"
            description="Busque tickers acima para começar a monitorar seus ativos favoritos."
            action={
              <Button asChild variant="outline">
                <Link to="/">
                  <TrendingUp className="mr-1.5 size-3.5" /> Explorar ativos
                </Link>
              </Button>
            }
          />
        )}

        {/* Watchlist table */}
        {watchedAssets.length > 0 && (
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-surface-2 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Ticker</th>
                  <th className="px-4 py-2.5 text-left font-medium">Empresa</th>
                  <th className="px-4 py-2.5 text-right font-medium">Preço</th>
                  <th className="px-4 py-2.5 text-right font-medium">Var. dia</th>
                  <th className="px-4 py-2.5 text-right font-medium">DY</th>
                  <th className="px-4 py-2.5 text-right font-medium">P/L</th>
                  <th className="px-4 py-2.5 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {watchedAssets.map((a) => (
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
                    <td className="px-4 py-2.5 text-muted-foreground">
                      {a.name}
                      {!a.inList && (
                        <span className="ml-1.5 rounded bg-chart-4/10 px-1 py-0.5 text-[9px] text-chart-4">
                          novo
                        </span>
                      )}
                    </td>
                    <td className="tabular px-4 py-2.5 text-right">
                      {a.price > 0 ? formatBRL(a.price) : "—"}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <DeltaPct value={a.changeDayPct} />
                    </td>
                    <td className="tabular px-4 py-2.5 text-right">
                      {a.fundamentals ? `${a.fundamentals.dy.toFixed(2)}%` : "—"}
                    </td>
                    <td className="tabular px-4 py-2.5 text-right">
                      {a.fundamentals ? a.fundamentals.pl.toFixed(1) : "—"}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <button
                        onClick={() => toggle(a.ticker)}
                        className="text-muted-foreground hover:text-negative transition"
                        title="Remover da watchlist"
                      >
                        <X className="size-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
