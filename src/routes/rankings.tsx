import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Medal, TrendingUp, Building2, Filter, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteHeader } from "@/components/site-header";
import { type Asset } from "@/lib/mock-data";
import { FIIS, type Fii } from "@/lib/fii-mock-data";
import { getAllAssets } from "@/lib/data-functions";
import { getQuotes } from "@/lib/quotes.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatBRL, formatBRLCompact } from "@/lib/format";

export const Route = createFileRoute("/rankings")({
  loader: async () => {
    const assets = await getAllAssets();
    return { assets };
  },
  head: ({ loaderData }) => {
    const count = loaderData?.assets?.length ?? 0;
    return {
      meta: [
        { title: "Rankings de Ações — Investidor Pro" },
        {
          name: "description",
          content: `Rankings de ${count} ações brasileiras por Dividend Yield, P/L, Valor de Mercado, Graham e Bazin.`,
        },
      ],
    };
  },
  component: RankingsPage,
});

type RankTab = "dy" | "pl" | "pvp" | "graham" | "bazin" | "marketCap";
type FiiRankTab = "dy" | "pvp" | "vacancy" | "capRate" | "liquidity" | "shareholders";

const STOCK_TABS: { key: RankTab; label: string }[] = [
  { key: "dy", label: "Maiores Dividend Yield" },
  { key: "pl", label: "Menor P/L" },
  { key: "pvp", label: "Menor P/VP" },
  { key: "graham", label: "Benjamin Graham" },
  { key: "bazin", label: "Bazin" },
  { key: "marketCap", label: "Valor de Mercado" },
];

const FII_TABS: { key: FiiRankTab; label: string }[] = [
  { key: "dy", label: "Maiores Dividend Yield" },
  { key: "pvp", label: "Menor P/VP" },
  { key: "vacancy", label: "Menor Vacância" },
  { key: "capRate", label: "Maior Cap Rate" },
  { key: "liquidity", label: "Maior Liquidez" },
  { key: "shareholders", label: "Maior Nº de Cotistas" },
];

function RankingsPage() {
  const { assets } = Route.useLoaderData();
  const [mode, setMode] = useState<"stocks" | "fiis">("stocks");
  const [tab, setTab] = useState<RankTab>("dy");
  const [fiiTab, setFiiTab] = useState<FiiRankTab>("dy");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const fetchQuotes = useServerFn(getQuotes);
  useQuery({
    queryKey: ["quotes", "rankings"],
    queryFn: () => fetchQuotes({ data: { tickers: assets.map((a) => a.ticker) } }),
    refetchInterval: 300_000,
    staleTime: 60_000,
  });

  const availableSectors = useMemo(() => {
    const set = new Set<string>();
    for (const a of assets) if (a.sector) set.add(a.sector);
    return Array.from(set).sort();
  }, [assets]);

  const filteredStocks = useMemo(() => {
    return assets.filter((a) => {
      const f = a.fundamentals;
      if (filters.sectors.size > 0 && !filters.sectors.has(a.sector ?? "")) return false;
      if (f.pl > 0 && (f.pl < filters.plMin || f.pl > filters.plMax)) return false;
      if (f.pvp > 0 && (f.pvp < filters.pvpMin || f.pvp > filters.pvpMax)) return false;
      if (f.dy < filters.dyMin) return false;
      if (f.roe > 0 && f.roe < filters.roeMin) return false;
      if (filters.onlyGraham && (f.lpa <= 0 || f.vpa <= 0)) return false;
      return true;
    });
  }, [assets, filters]);

  const filteredFiis = useMemo(() => {
    return FIIS.filter((f) => {
      if (filters.fiiSectors.size > 0 && !filters.fiiSectors.has(f.segment)) return false;
      if (f.dy < filters.fiiDyMin) return false;
      if (f.pvp <= 0 || f.pvp < filters.fiiPvpMin || f.pvp > filters.fiiPvpMax) return false;
      if (f.vacancy !== null && f.vacancy > filters.fiiVacancyMax) return false;
      return true;
    });
  }, [filters]);

  const rankedStocks = useMemo(() => {
    const list = [...filteredStocks];
    switch (tab) {
      case "dy":
        return list.sort((a, b) => b.fundamentals.dy - a.fundamentals.dy);
      case "pl":
        return list.sort((a, b) => a.fundamentals.pl - b.fundamentals.pl);
      case "pvp":
        return list.sort((a, b) => a.fundamentals.pvp - b.fundamentals.pvp);
      case "graham": {
        return list
          .filter((a) => a.fundamentals.lpa > 0 && a.fundamentals.vpa > 0)
          .sort((a, b) => {
            const grahamA = Math.sqrt(a.fundamentals.lpa * a.fundamentals.vpa * 22.5);
            const grahamB = Math.sqrt(b.fundamentals.lpa * b.fundamentals.vpa * 22.5);
            return a.price / grahamA - b.price / grahamB;
          });
      }
      case "bazin": {
        return list
          .filter((a) => a.fundamentals.dy > 0)
          .sort((a, b) => {
            const bazinA = (a.fundamentals.lpa * a.fundamentals.dy) / 100 / 0.06;
            const bazinB = (b.fundamentals.lpa * b.fundamentals.dy) / 100 / 0.06;
            return a.price / bazinA - b.price / bazinB;
          });
      }
      case "marketCap":
        return list.sort((a, b) => b.fundamentals.marketCap - a.fundamentals.marketCap);
      default:
        return list;
    }
  }, [tab]);

  const rankedFiis = useMemo(() => {
    const list = [...filteredFiis];
    switch (fiiTab) {
      case "dy":
        return list.sort((a, b) => b.dy - a.dy);
      case "pvp":
        return list.sort((a, b) => a.pvp - b.pvp);
      case "vacancy":
        return list.sort((a, b) => a.vacancy - b.vacancy);
      case "capRate":
        return list.sort((a, b) => b.capRate - a.capRate);
      case "liquidity":
        return list.sort((a, b) => b.dailyLiquidity - a.dailyLiquidity);
      case "shareholders":
        return list.sort((a, b) => b.shareholders - a.shareholders);
      default:
        return list;
    }
  }, [fiiTab]);

  const stockColumns = useMemo(() => {
    const base: {
      key: string;
      width?: string;
      hide?: string;
      render: (a: Asset, i: number) => React.ReactNode;
    }[] = [
      { key: "#", width: "w-10", render: (_: Asset, i: number) => i + 1 },
      {
        key: "Ticker",
        width: "",
        render: (a: Asset) => (
          <Link
            to="/ativo/$ticker"
            params={{ ticker: a.ticker }}
            className="font-semibold hover:text-primary"
          >
            {a.ticker}
          </Link>
        ),
      },
      {
        key: "Empresa",
        width: "",
        render: (a: Asset) => <span className="text-muted-foreground">{a.name}</span>,
      },
      {
        key: "Setor",
        width: "",
        hide: "hidden sm:table-cell",
        render: (a: Asset) => <span className="text-xs text-muted-foreground">{a.sector}</span>,
      },
      {
        key: "Preço",
        width: "w-24",
        render: (a: Asset) => <span className="tabular">{formatBRL(a.price)}</span>,
      },
    ];
    const extra: {
      key: string;
      width?: string;
      hide?: string;
      render: (a: Asset, i: number) => React.ReactNode;
    }[] = [];
    switch (tab) {
      case "dy":
        extra.push({
          key: "DY",
          width: "w-20",
          render: (a: Asset) => (
            <span className="tabular font-semibold text-positive">
              {a.fundamentals.dy.toFixed(2)}%
            </span>
          ),
        });
        extra.push({
          key: "P/L",
          width: "w-16",
          hide: "hidden md:table-cell",
          render: (a: Asset) => <span className="tabular">{a.fundamentals.pl.toFixed(1)}</span>,
        });
        break;
      case "pl":
        extra.push({
          key: "P/L",
          width: "w-20",
          render: (a: Asset) => (
            <span className="tabular font-semibold">{a.fundamentals.pl.toFixed(1)}</span>
          ),
        });
        extra.push({
          key: "DY",
          width: "w-16",
          hide: "hidden md:table-cell",
          render: (a: Asset) => <span className="tabular">{a.fundamentals.dy.toFixed(2)}%</span>,
        });
        break;
      case "pvp":
        extra.push({
          key: "P/VP",
          width: "w-20",
          render: (a: Asset) => (
            <span className="tabular font-semibold">{a.fundamentals.pvp.toFixed(2)}</span>
          ),
        });
        extra.push({
          key: "ROE",
          width: "w-16",
          hide: "hidden md:table-cell",
          render: (a: Asset) => <span className="tabular">{a.fundamentals.roe.toFixed(1)}%</span>,
        });
        break;
      case "graham":
        extra.push({
          key: "LPA",
          width: "w-20",
          render: (a: Asset) => <span className="tabular">{formatBRL(a.fundamentals.lpa)}</span>,
        });
        extra.push({
          key: "VPA",
          width: "w-20",
          hide: "hidden md:table-cell",
          render: (a: Asset) => <span className="tabular">{formatBRL(a.fundamentals.vpa)}</span>,
        });
        extra.push({
          key: "Preço Justo",
          width: "w-24",
          hide: "hidden lg:table-cell",
          render: (a: Asset) => {
            const graham = Math.sqrt(a.fundamentals.lpa * a.fundamentals.vpa * 22.5);
            return <span className="tabular font-semibold">{formatBRL(graham)}</span>;
          },
        });
        extra.push({
          key: "Margem",
          width: "w-16",
          hide: "hidden lg:table-cell",
          render: (a: Asset) => {
            const graham = Math.sqrt(a.fundamentals.lpa * a.fundamentals.vpa * 22.5);
            const margin = ((graham - a.price) / graham) * 100;
            return (
              <span
                className={
                  "tabular font-semibold " + (margin > 0 ? "text-positive" : "text-negative")
                }
              >
                {margin.toFixed(1)}%
              </span>
            );
          },
        });
        break;
      case "bazin":
        extra.push({
          key: "DY",
          width: "w-16",
          render: (a: Asset) => <span className="tabular">{a.fundamentals.dy.toFixed(2)}%</span>,
        });
        extra.push({
          key: "Preço Teto",
          width: "w-24",
          hide: "hidden md:table-cell",
          render: (a: Asset) => {
            const teto = (a.fundamentals.lpa * a.fundamentals.dy) / 100 / 0.06;
            return <span className="tabular font-semibold">{formatBRL(teto)}</span>;
          },
        });
        extra.push({
          key: "Margem",
          width: "w-16",
          hide: "hidden lg:table-cell",
          render: (a: Asset) => {
            const teto = (a.fundamentals.lpa * a.fundamentals.dy) / 100 / 0.06;
            const margin = ((teto - a.price) / teto) * 100;
            return (
              <span
                className={
                  "tabular font-semibold " + (margin > 0 ? "text-positive" : "text-negative")
                }
              >
                {margin.toFixed(1)}%
              </span>
            );
          },
        });
        break;
      case "marketCap":
        extra.push({
          key: "Valor de Mercado",
          width: "w-28",
          render: (a: Asset) => (
            <span className="tabular font-semibold">
              {formatBRLCompact(a.fundamentals.marketCap)}
            </span>
          ),
        });
        extra.push({
          key: "P/L",
          width: "w-16",
          hide: "hidden md:table-cell",
          render: (a: Asset) => <span className="tabular">{a.fundamentals.pl.toFixed(1)}</span>,
        });
        break;
    }
    return [...base, ...extra];
  }, [tab]);

  const fiiColumns = useMemo(() => {
    const base: {
      key: string;
      width?: string;
      hide?: string;
      render: (f: Fii, i: number) => React.ReactNode;
    }[] = [
      { key: "#", width: "w-10", render: (_: Fii, i: number) => i + 1 },
      {
        key: "Ticker",
        width: "",
        render: (f: Fii) => (
          <Link
            to="/fii/$ticker"
            params={{ ticker: f.ticker }}
            className="font-semibold hover:text-primary"
          >
            {f.ticker}
          </Link>
        ),
      },
      {
        key: "Nome",
        width: "",
        render: (f: Fii) => <span className="text-muted-foreground">{f.name}</span>,
      },
      {
        key: "Segmento",
        width: "",
        hide: "hidden sm:table-cell",
        render: (f: Fii) => <span className="text-xs text-muted-foreground">{f.segment}</span>,
      },
      {
        key: "Preço",
        width: "w-24",
        render: (f: Fii) => <span className="tabular">{formatBRL(f.price)}</span>,
      },
    ];
    const extra: {
      key: string;
      width?: string;
      hide?: string;
      render: (f: Fii, i: number) => React.ReactNode;
    }[] = [];
    switch (fiiTab) {
      case "dy":
        extra.push({
          key: "DY",
          width: "w-20",
          render: (f: Fii) => (
            <span className="tabular font-semibold text-positive">{f.dy.toFixed(2)}%</span>
          ),
        });
        extra.push({
          key: "P/VP",
          width: "w-16",
          hide: "hidden md:table-cell",
          render: (f: Fii) => <span className="tabular">{f.pvp.toFixed(2)}</span>,
        });
        break;
      case "pvp":
        extra.push({
          key: "P/VP",
          width: "w-20",
          render: (f: Fii) => <span className="tabular font-semibold">{f.pvp.toFixed(2)}</span>,
        });
        extra.push({
          key: "DY",
          width: "w-16",
          hide: "hidden md:table-cell",
          render: (f: Fii) => <span className="tabular">{f.dy.toFixed(2)}%</span>,
        });
        break;
      case "vacancy":
        extra.push({
          key: "Vacância",
          width: "w-20",
          render: (f: Fii) => (
            <span
              className={
                "tabular font-semibold " + (f.vacancy <= 5 ? "text-positive" : "text-negative")
              }
            >
              {f.vacancy.toFixed(1)}%
            </span>
          ),
        });
        extra.push({
          key: "Média Setor",
          width: "w-20",
          hide: "hidden md:table-cell",
          render: (f: Fii) => (
            <span className="tabular text-muted-foreground">{f.avgVacancy.toFixed(1)}%</span>
          ),
        });
        break;
      case "capRate":
        extra.push({
          key: "Cap Rate",
          width: "w-20",
          render: (f: Fii) => (
            <span className="tabular font-semibold text-positive">
              {f.capRate > 0 ? `${f.capRate.toFixed(1)}%` : "—"}
            </span>
          ),
        });
        extra.push({
          key: "Vacância",
          width: "w-16",
          hide: "hidden md:table-cell",
          render: (f: Fii) => <span className="tabular">{f.vacancy.toFixed(1)}%</span>,
        });
        break;
      case "liquidity":
        extra.push({
          key: "Liquidez Diária",
          width: "w-28",
          render: (f: Fii) => (
            <span className="tabular font-semibold">{formatBRLCompact(f.dailyLiquidity)}</span>
          ),
        });
        extra.push({
          key: "DY",
          width: "w-16",
          hide: "hidden md:table-cell",
          render: (f: Fii) => <span className="tabular">{f.dy.toFixed(2)}%</span>,
        });
        break;
      case "shareholders":
        extra.push({
          key: "Cotistas",
          width: "w-20",
          render: (f: Fii) => (
            <span className="tabular font-semibold">{(f.shareholders / 1000).toFixed(1)}k</span>
          ),
        });
        extra.push({
          key: "DY",
          width: "w-16",
          hide: "hidden md:table-cell",
          render: (f: Fii) => <span className="tabular">{f.dy.toFixed(2)}%</span>,
        });
        break;
    }
    return [...base, ...extra];
  }, [fiiTab]);

  const currentMode = mode;
  const currentTabs = currentMode === "stocks" ? STOCK_TABS : FII_TABS;
  const currentTab = currentMode === "stocks" ? tab : fiiTab;
  const ranked = currentMode === "stocks" ? rankedStocks : rankedFiis;
  const columns = currentMode === "stocks" ? stockColumns : fiiColumns;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Medal className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Rankings</h1>
        </div>

        <div className="mb-6 flex items-center gap-1.5 rounded-lg border border-border bg-card p-1.5 w-fit">
          <Button
            variant={currentMode === "stocks" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("stocks")}
          >
            <TrendingUp className="mr-1.5 size-3.5" /> Ações
          </Button>
          <Button
            variant={currentMode === "fiis" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("fiis")}
          >
            <Building2 className="mr-1.5 size-3.5" /> FIIs
          </Button>
        </div>

        <AdvancedFilters
          mode={currentMode}
          sectors={availableSectors}
          filters={filters}
          onChange={setFilters}
          resultCount={ranked.length}
          open={showFilters}
          onToggle={() => setShowFilters((v) => !v)}
        />

        <div className="mb-6 flex flex-wrap gap-1.5">
          {currentTabs.map((t) => (
            <Button
              key={t.key}
              variant={currentTab === t.key ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (currentMode === "stocks") setTab(t.key as RankTab);
                else setFiiTab(t.key as FiiRankTab);
              }}
            >
              {t.label}
            </Button>
          ))}
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-xs uppercase text-muted-foreground">
              <tr>
                {columns.map((col: any) => (
                  <th
                    key={col.key}
                    className={
                      "px-4 py-2.5 text-left font-medium " +
                      (col.width ?? "") +
                      " " +
                      (col.hide ?? "")
                    }
                  >
                    {col.key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ranked.map((item: any, i: number) => (
                <tr key={item.ticker} className="border-t border-border hover:bg-surface">
                  {columns.map((col: any) => (
                    <td
                      key={col.key}
                      className={
                        "px-4 py-2.5 " +
                        (typeof col.render(item, i) === "string" ? "tabular " : "") +
                        (col.hide ?? "")
                      }
                    >
                      {col.render(item, i)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

interface FilterState {
  // Ações
  sectors: Set<string>;
  plMin: number;
  plMax: number;
  pvpMin: number;
  pvpMax: number;
  dyMin: number;
  roeMin: number;
  onlyGraham: boolean;
  // FIIs
  fiiSectors: Set<string>;
  fiiDyMin: number;
  fiiPvpMin: number;
  fiiPvpMax: number;
  fiiVacancyMax: number;
}

const DEFAULT_FILTERS: FilterState = {
  sectors: new Set<string>(),
  plMin: 0,
  plMax: 100,
  pvpMin: 0,
  pvpMax: 10,
  dyMin: 0,
  roeMin: 0,
  onlyGraham: false,
  fiiSectors: new Set<string>(),
  fiiDyMin: 0,
  fiiPvpMin: 0,
  fiiPvpMax: 5,
  fiiVacancyMax: 100,
};

function AdvancedFilters({
  mode,
  sectors,
  filters,
  onChange,
  resultCount,
  open,
  onToggle,
}: {
  mode: "stocks" | "fiis";
  sectors: string[];
  filters: FilterState;
  onChange: (next: FilterState) => void;
  resultCount: number;
  open: boolean;
  onToggle: () => void;
}) {
  const set = <K extends keyof FilterState>(k: K, v: FilterState[K]) =>
    onChange({ ...filters, [k]: v });
  const toggleSector = (s: string) => {
    const next = new Set(filters.sectors);
    if (next.has(s)) next.delete(s);
    else next.add(s);
    set("sectors", next);
  };
  const toggleFiiSector = (s: string) => {
    const next = new Set(filters.fiiSectors);
    if (next.has(s)) next.delete(s);
    else next.add(s);
    set("fiiSectors", next);
  };
  const reset = () => onChange({ ...DEFAULT_FILTERS, sectors: new Set(), fiiSectors: new Set() });
  const activeCount =
    filters.sectors.size +
    filters.fiiSectors.size +
    (filters.plMin !== 0 || filters.plMax !== 100 ? 1 : 0) +
    (filters.pvpMin !== 0 || filters.pvpMax !== 10 ? 1 : 0) +
    (filters.dyMin !== 0 ? 1 : 0) +
    (filters.roeMin !== 0 ? 1 : 0) +
    (filters.onlyGraham ? 1 : 0) +
    (filters.fiiDyMin !== 0 ? 1 : 0) +
    (filters.fiiPvpMin !== 0 || filters.fiiPvpMax !== 5 ? 1 : 0) +
    (filters.fiiVacancyMax !== 100 ? 1 : 0);

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" onClick={onToggle} className="gap-1.5">
          <Filter className="size-3.5" />
          Filtros avançados
          {activeCount > 0 && (
            <span className="ml-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
        {activeCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="gap-1.5 text-muted-foreground"
          >
            <X className="size-3.5" /> Limpar filtros
          </Button>
        )}
        <span className="ml-auto text-xs text-muted-foreground tabular">
          {resultCount} {resultCount === 1 ? "resultado" : "resultados"}
        </span>
      </div>

      {open && (
        <div className="mt-3 rounded-lg border border-border bg-card p-4">
          {mode === "stocks" ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <NumField
                label="P/L mínimo"
                value={filters.plMin}
                onChange={(v) => set("plMin", v)}
                max={100}
              />
              <NumField
                label="P/L máximo"
                value={filters.plMax}
                onChange={(v) => set("plMax", v)}
                max={100}
              />
              <NumField
                label="P/VP mínimo"
                value={filters.pvpMin}
                onChange={(v) => set("pvpMin", v)}
                max={10}
                step={0.1}
              />
              <NumField
                label="P/VP máximo"
                value={filters.pvpMax}
                onChange={(v) => set("pvpMax", v)}
                max={10}
                step={0.1}
              />
              <NumField
                label="DY mínimo %"
                value={filters.dyMin}
                onChange={(v) => set("dyMin", v)}
                max={20}
                step={0.5}
              />
              <NumField
                label="ROE mínimo %"
                value={filters.roeMin}
                onChange={(v) => set("roeMin", v)}
                max={50}
                step={0.5}
              />
              <label className="col-span-full flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={filters.onlyGraham}
                  onChange={(e) => set("onlyGraham", e.target.checked)}
                  className="size-3.5 accent-primary"
                />
                Apenas com Graham válido (LPA e VPA positivos)
              </label>
              <div className="col-span-full">
                <div className="mb-1.5 text-xs text-muted-foreground">Setores</div>
                <div className="flex flex-wrap gap-1.5">
                  {sectors.length === 0 && (
                    <span className="text-xs text-muted-foreground">(vazio)</span>
                  )}
                  {sectors.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSector(s)}
                      className={
                        "rounded border px-2 py-0.5 text-xs transition " +
                        (filters.sectors.has(s)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:text-foreground")
                      }
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <NumField
                label="DY mínimo %"
                value={filters.fiiDyMin}
                onChange={(v) => set("fiiDyMin", v)}
                max={20}
                step={0.5}
              />
              <NumField
                label="P/VP mínimo"
                value={filters.fiiPvpMin}
                onChange={(v) => set("fiiPvpMin", v)}
                max={5}
                step={0.1}
              />
              <NumField
                label="P/VP máximo"
                value={filters.fiiPvpMax}
                onChange={(v) => set("fiiPvpMax", v)}
                max={5}
                step={0.1}
              />
              <NumField
                label="Vacância máxima %"
                value={filters.fiiVacancyMax}
                onChange={(v) => set("fiiVacancyMax", v)}
                max={100}
                step={5}
              />
              <div className="col-span-full">
                <div className="mb-1.5 text-xs text-muted-foreground">Setores</div>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from(new Set(FIIS.map((f) => f.segment)))
                    .sort()
                    .map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleFiiSector(s)}
                        className={
                          "rounded border px-2 py-0.5 text-xs transition " +
                          (filters.fiiSectors.has(s)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground hover:text-foreground")
                        }
                      >
                        {s}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NumField({
  label,
  value,
  onChange,
  max,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max: number;
  step?: number;
}) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground">{label}</label>
      <Input
        type="number"
        value={value}
        step={step}
        max={max}
        onChange={(e) => {
          const v = Number(e.target.value);
          onChange(Number.isFinite(v) ? v : 0);
        }}
        className="mt-1 h-8 tabular"
      />
    </div>
  );
}
