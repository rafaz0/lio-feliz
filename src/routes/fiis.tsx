import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Building2, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { FIIS, type FiiSegment } from "@/lib/fii-mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/format";

export const Route = createFileRoute("/fiis")({
  head: () => ({
    meta: [
      { title: "Fundos Imobiliários — Investidor Pro" },
      {
        name: "description",
        content:
          "Lista completa de Fundos Imobiliários (FIIs) com cotações, dividend yield e indicadores.",
      },
    ],
  }),
  component: FiisPage,
});

const SEGMENTS: (FiiSegment | "Todos")[] = [
  "Todos",
  "Tijolo",
  "Papel",
  "Híbrido",
  "Logístico",
  "Shopping",
  "Fundos de Fundos",
  "Hospitalar",
  "Educacional",
];

function FiisPage() {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState<FiiSegment | "Todos">("Todos");
  const [sortBy, setSortBy] = useState<"dy" | "price" | "pvp">("dy");

  const filtered = useMemo(() => {
    const term = search.trim().toUpperCase();
    let list = FIIS.filter((f) => {
      if (segment !== "Todos" && f.segment !== segment) return false;
      if (term && !f.ticker.includes(term) && !f.name.toUpperCase().includes(term)) return false;
      return true;
    });
    switch (sortBy) {
      case "dy": return list.sort((a, b) => b.dy - a.dy);
      case "price": return list.sort((a, b) => b.price - a.price);
      case "pvp": return list.sort((a, b) => a.pvp - b.pvp);
      default: return list;
    }
  }, [search, segment, sortBy]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Building2 className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Fundos Imobiliários</h1>
          <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
            {FIIS.length} FIIs
          </span>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <div className="relative max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar FII..."
              className="h-9 pl-8"
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {SEGMENTS.map((s) => (
              <Button
                key={s}
                variant={segment === s ? "default" : "outline"}
                size="sm"
                onClick={() => setSegment(s)}
              >
                {s}
              </Button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
            <span>Ordenar:</span>
            {(["dy", "price", "pvp"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={"font-medium " + (sortBy === s ? "text-foreground" : "hover:text-foreground")}
              >
                {s === "dy" ? "DY" : s === "price" ? "Preço" : "P/VP"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-surface-2 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Ticker</th>
                <th className="px-4 py-2.5 text-left font-medium">Nome</th>
                <th className="px-4 py-2.5 text-left font-medium">Segmento</th>
                <th className="px-4 py-2.5 text-right font-medium">Preço</th>
                <th className="px-4 py-2.5 text-right font-medium">DY</th>
                <th className="px-4 py-2.5 text-right font-medium">P/VP</th>
                <th className="px-4 py-2.5 text-right font-medium">Vacância</th>
                <th className="px-4 py-2.5 text-right font-medium">Liquidez Diária</th>
                <th className="px-4 py-2.5 text-right font-medium">Cotistas</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.ticker} className="border-t border-border hover:bg-surface">
                  <td className="px-4 py-2.5">
                    <Link
                      to="/fii/$ticker"
                      params={{ ticker: f.ticker }}
                      className="font-semibold hover:text-primary"
                    >
                      {f.ticker}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{f.name}</td>
                  <td className="px-4 py-2.5">
                    <span className="inline-block rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium">
                      {f.segment}
                    </span>
                  </td>
                  <td className="tabular px-4 py-2.5 text-right">{formatBRL(f.price)}</td>
                  <td className="tabular px-4 py-2.5 text-right font-semibold text-positive">{f.dy.toFixed(2)}%</td>
                  <td className="tabular px-4 py-2.5 text-right">{f.pvp.toFixed(2)}</td>
                  <td className="tabular px-4 py-2.5 text-right">
                    <span className={f.vacancy > 8 ? "text-negative" : f.vacancy > 4 ? "text-chart-2" : "text-positive"}>
                      {f.vacancy.toFixed(1)}%
                    </span>
                  </td>
                  <td className="tabular px-4 py-2.5 text-right text-muted-foreground">
                    {f.dailyLiquidity >= 1_000_000
                      ? `R$${(f.dailyLiquidity / 1_000_000).toFixed(1)}M`
                      : `R$${(f.dailyLiquidity / 1_000).toFixed(0)}K`}
                  </td>
                  <td className="tabular px-4 py-2.5 text-right text-muted-foreground">
                    {(f.shareholders / 1000).toFixed(0)}K
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center mt-6">
            <Building2 className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">Nenhum FII encontrado.</p>
          </div>
        )}
      </main>
    </div>
  );
}
