import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Info, LineChart, TrendingUp, Wallet } from "lucide-react";
import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { DeltaPct } from "@/components/delta-pct";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ASSETS } from "@/lib/mock-data";
import { getAssetList, type AssetLite } from "@/lib/data-functions";
import { MARKET_INDICES, formatIndexValue } from "@/lib/market-indices";
import { getQuotes } from "@/lib/quotes.functions";
import { formatBRL, formatBRLCompact } from "@/lib/format";
import { useSession } from "@/hooks/use-session";

export const Route = createFileRoute("/")({
  loader: async () => {
    const list = await getAssetList({ data: { limit: 2000 } });
    return { list };
  },
  head: ({ loaderData }) => {
    const count = loaderData?.list?.length ?? 0;
    return {
      meta: [
        { title: "Investidor Pro — Análise de ações brasileiras" },
        {
          name: "description",
          content: `Análise fundamentalista de ${count} ações da B3, cotações, dividendos e sua carteira consolidada.`,
        },
      ],
    };
  },
  component: HomePage,
});

function HomePage() {
  const { list } = Route.useLoaderData();
  const { user } = useSession();
  const [search, setSearch] = useState("");

  const fetchQuotes = useServerFn(getQuotes);
  const mockTickers = ASSETS.map((a) => a.ticker);
  const quotesQuery = useQuery({
    queryKey: ["quotes", "all"],
    queryFn: () => fetchQuotes({ data: { tickers: mockTickers } }),
    refetchInterval: 300_000,
    staleTime: 60_000,
  });

  const quotesData = quotesQuery.data?.quotes ?? {};
  const quotesUpdatedAt = Object.values(quotesData)[0]?.updatedAt;
  const assets: AssetLite[] = useMemo(() => {
    return list.map((a) => {
      const live = quotesData[a.ticker];
      return live ? { ...a, price: live.price, changeDayPct: live.changePct } : a;
    });
  }, [list, quotesData]);

  const assetsWithFundamentals = useMemo(() => assets.filter((a) => a.fundamentals), [assets]);

  const gainers = [...assetsWithFundamentals]
    .sort((a, b) => b.changeDayPct - a.changeDayPct)
    .slice(0, 5);
  const losers = [...assetsWithFundamentals]
    .sort((a, b) => a.changeDayPct - b.changeDayPct)
    .slice(0, 5);
  const highDy = [...assetsWithFundamentals]
    .filter((a) => a.fundamentals !== null && a.fundamentals.dy > 0)
    .sort((a, b) => b.fundamentals!.dy - a.fundamentals!.dy)
    .slice(0, 5);

  const filteredAssets = useMemo(() => {
    const term = search.trim().toUpperCase();
    if (!term) return assets;
    return assets.filter((a) => a.ticker.includes(term) || a.name.toUpperCase().includes(term));
  }, [assets, search]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-10">
        <section className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-lg border border-border bg-card px-5 py-3 text-sm">
          {MARKET_INDICES.map((idx) => (
            <div key={idx.ticker} className="flex items-baseline gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {idx.name}
              </span>
              <span className="tabular font-semibold">{formatIndexValue(idx)}</span>
              {idx.changePct !== 0 && (
                <span
                  className={
                    "tabular text-xs " + (idx.changePct >= 0 ? "text-positive" : "text-negative")
                  }
                >
                  {idx.changePct >= 0 ? "+" : ""}
                  {idx.changePct.toFixed(2)}%
                </span>
              )}
            </div>
          ))}
        </section>

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
              <Stat label="Ativos cobertos" value={String(assets.length)} />
              <Stat
                label="Alta média (dia)"
                value={`${(assets.reduce((s, a) => s + a.changeDayPct, 0) / assets.length).toFixed(2)}%`}
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
          <MarketList
            title="Maiores altas"
            subtitle="Variação do dia"
            assets={gainers}
            tone="positive"
          />
          <MarketList
            title="Maiores quedas"
            subtitle="Variação do dia"
            assets={losers}
            tone="negative"
          />
          <MarketList
            title="Maiores dividendos"
            subtitle="Dividend Yield"
            assets={highDy}
            metric={(a) => `${a.fundamentals!.dy.toFixed(2)}%`}
          />
        </div>

        <section className="mt-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              <TrendingUp className="size-3.5" /> Todos os ativos
              <span className="text-muted-foreground">({filteredAssets.length})</span>
            </h2>
            <div className="relative max-w-xs">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 size-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar ticker ou empresa..."
                autoComplete="off"
                className="h-8 pl-7 text-sm"
              />
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-surface-2 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 text-left font-medium">Ticker</th>
                  <th className="px-4 py-2.5 text-left font-medium">Empresa</th>
                  <th className="hidden sm:table-cell px-4 py-2.5 text-left font-medium">Setor</th>
                  <th className="px-4 py-2.5 text-right font-medium">Preço</th>
                  <th className="px-4 py-2.5 text-right font-medium">Var. dia</th>
                  <th className="px-4 py-2.5 text-right font-medium">
                    <ThHint
                      label="DY"
                      tooltip="Dividend Yield. Rendimento de dividendos pagos nos últimos 12 meses em relação ao preço da ação."
                    />
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium">
                    <ThHint
                      label="P/L"
                      tooltip="Preço / Lucro. Quantos anos de lucro para pagar o preço da ação. Menor pode indicar ação mais barata; maior pode indicar expectativa de crescimento."
                    />
                  </th>
                  <th className="px-4 py-2.5 text-right font-medium">
                    <ThHint
                      label="Valor de mercado"
                      tooltip="Market Cap. Valor total da empresa na bolsa (preço × ações). Empresas maiores tendem a ser mais estáveis."
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((a) => (
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
                    <td className="hidden sm:table-cell px-4 py-2.5 text-muted-foreground">
                      {a.sector ?? "—"}
                    </td>
                    <td className="tabular px-4 py-2.5 text-right">{formatBRL(a.price)}</td>
                    <td className="px-4 py-2.5 text-right">
                      <DeltaPct value={a.changeDayPct} />
                    </td>
                    <td className="hidden md:table-cell tabular px-4 py-2.5 text-right">
                      {a.fundamentals ? `${a.fundamentals.dy.toFixed(2)}%` : "—"}
                    </td>
                    <td className="hidden md:table-cell tabular px-4 py-2.5 text-right">
                      {a.fundamentals ? a.fundamentals.pl.toFixed(1) : "—"}
                    </td>
                    <td className="hidden lg:table-cell tabular px-4 py-2.5 text-right text-muted-foreground">
                      {a.fundamentals ? formatBRLCompact(a.fundamentals.marketCap) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/watchlist"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <Star className="size-5 text-chart-5" />
            <div>
              <div className="text-sm font-semibold">Watchlist</div>
              <div className="text-xs text-muted-foreground">Monitore seus ativos</div>
            </div>
          </Link>
          <Link
            to="/dividendos"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <CalendarDays className="size-5 text-primary" />
            <div>
              <div className="text-sm font-semibold">Agenda de Dividendos</div>
              <div className="text-xs text-muted-foreground">Calendário de proventos</div>
            </div>
          </Link>
          <Link
            to="/rankings"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <Medal className="size-5 text-chart-2" />
            <div>
              <div className="text-sm font-semibold">Rankings</div>
              <div className="text-xs text-muted-foreground">DY, P/L, Graham, Bazin</div>
            </div>
          </Link>
          <Link
            to="/setores"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <Building2 className="size-5 text-chart-1" />
            <div>
              <div className="text-sm font-semibold">Setores</div>
              <div className="text-xs text-muted-foreground">Análise por setor</div>
            </div>
          </Link>
          <Link
            to="/comparar"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <BarChart3 className="size-5 text-chart-4" />
            <div>
              <div className="text-sm font-semibold">Comparador</div>
              <div className="text-xs text-muted-foreground">Compare ativos lado a lado</div>
            </div>
          </Link>
          <Link
            to="/fiis"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <Building2 className="size-5 text-chart-5" />
            <div>
              <div className="text-sm font-semibold">Fundos Imobiliários</div>
              <div className="text-xs text-muted-foreground">FIIs, DY, P/VP</div>
            </div>
          </Link>
          {user && (
            <>
              <Link
                to="/provisionador"
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
              >
                <PiggyBank className="size-5 text-primary" />
                <div>
                  <div className="text-sm font-semibold">Provisionador</div>
                  <div className="text-xs text-muted-foreground">Projeção de dividendos</div>
                </div>
              </Link>
              <Link
                to="/metas"
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
              >
                <Target className="size-5 text-chart-6" />
                <div>
                  <div className="text-sm font-semibold">Metas</div>
                  <div className="text-xs text-muted-foreground">Acompanhe seus objetivos</div>
                </div>
              </Link>
            </>
          )}
          <Link
            to="/calculadoras"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <Calculator className="size-5 text-chart-6" />
            <div>
              <div className="text-sm font-semibold">Calculadoras</div>
              <div className="text-xs text-muted-foreground">Juros, DCF, Preço Teto</div>
            </div>
          </Link>
          <Link
            to="/carteiras-recomendadas"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <BarChart3 className="size-5 text-chart-1" />
            <div>
              <div className="text-sm font-semibold">Carteiras Recomendadas</div>
              <div className="text-xs text-muted-foreground">Para todos os perfis</div>
            </div>
          </Link>
          <Link
            to="/noticias"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <Newspaper className="size-5 text-chart-3" />
            <div>
              <div className="text-sm font-semibold">Notícias</div>
              <div className="text-xs text-muted-foreground">Fatos relevantes do mercado</div>
            </div>
          </Link>
          <Link
            to="/carteira"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition hover:bg-surface"
          >
            <Wallet className="size-5 text-chart-5" />
            <div>
              <div className="text-sm font-semibold">Carteira</div>
              <div className="text-xs text-muted-foreground">Posição consolidada</div>
            </div>
          </Link>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="mb-4 flex flex-wrap justify-center gap-6">
            <Link to="/" className="hover:text-foreground">
              Mercado
            </Link>
            <Link to="/fiis" className="hover:text-foreground">
              FIIs
            </Link>
            <Link to="/watchlist" className="hover:text-foreground">
              Watchlist
            </Link>
            <Link to="/dividendos" className="hover:text-foreground">
              Dividendos
            </Link>
            <Link to="/rankings" className="hover:text-foreground">
              Rankings
            </Link>
            <Link to="/setores" className="hover:text-foreground">
              Setores
            </Link>
            <Link to="/comparar" className="hover:text-foreground">
              Comparar
            </Link>
            <Link to="/provisionador" className="hover:text-foreground">
              Provisionador
            </Link>
            <Link to="/metas" className="hover:text-foreground">
              Metas
            </Link>
            <Link to="/calculadoras" className="hover:text-foreground">
              Calculadoras
            </Link>
            <Link to="/noticias" className="hover:text-foreground">
              Notícias
            </Link>
            <Link to="/carteira" className="hover:text-foreground">
              Carteira
            </Link>
          </div>
          Investidor Pro · cotações atualizadas automaticamente a cada 5 minutos
          {quotesUpdatedAt
            ? ` · última atualização às ${new Date(quotesUpdatedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
            : ""}{" "}
          via BRAPI
        </div>
      </footer>
    </div>
  );
}

function ThHint({ label, tooltip }: { label: string; tooltip: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {label}
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="inline-flex size-3.5 items-center justify-center rounded-full text-muted-foreground/50 hover:text-muted-foreground">
            <Info className="size-3" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[260px] text-xs leading-relaxed">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </span>
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
  assets: AssetLite[];
  tone?: "positive" | "negative";
  metric?: (a: AssetLite) => string;
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
