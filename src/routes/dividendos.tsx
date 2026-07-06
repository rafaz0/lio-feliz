import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Calendar, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { ASSETS } from "@/lib/mock-data";
import { FIIS } from "@/lib/fii-mock-data";
import { formatBRL, formatDate } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dividendos")({
  head: () => ({
    meta: [
      { title: "Agenda de Dividendos — Investidor Pro" },
      {
        name: "description",
        content:
          "Calendário completo de dividendos e JCP das ações brasileiras. Filtre por ativo, tipo e período.",
      },
    ],
  }),
  component: DividendosPage,
});

type DivType = "Todos" | "Dividendo" | "JCP";

function DividendosPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<DivType>("Todos");

  const allDividends = useMemo(() => {
    const list: Array<{
      ticker: string;
      name: string;
      paidAt: string;
      type: "Dividendo" | "JCP";
      amount: number;
      assetType: "stock" | "fii";
    }> = [];
    for (const a of ASSETS) {
      for (const d of a.dividends) {
        list.push({ ticker: a.ticker, name: a.name, ...d, assetType: "stock" });
      }
    }
    for (const f of FIIS) {
      for (const d of f.dividendHistory) {
        list.push({
          ticker: f.ticker,
          name: f.name,
          paidAt: d.paidAt,
          type: "Dividendo" as const,
          amount: d.amount,
          assetType: "fii",
        });
      }
    }
    return list.sort((a, b) => b.paidAt.localeCompare(a.paidAt));
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toUpperCase();
    return allDividends.filter((d) => {
      if (term && !d.ticker.includes(term) && !d.name.toUpperCase().includes(term)) return false;
      if (typeFilter !== "Todos" && d.type !== typeFilter) return false;
      return true;
    });
  }, [allDividends, search, typeFilter]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    for (const d of filtered) {
      const key = d.paidAt.slice(0, 7);
      if (!groups[key]) groups[key] = [];
      groups[key].push(d);
    }
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [filtered]);

  const totalAmount = filtered.reduce((s, d) => s + d.amount, 0);
  const uniqueTickers = new Set(filtered.map((d) => d.ticker)).size;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Calendar className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Agenda de Dividendos</h1>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Total de proventos
            </div>
            <div className="tablar mt-1 text-2xl font-bold">{filtered.length}</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Valor total (por cota)
            </div>
            <div className="tablar mt-1 text-2xl font-bold">{formatBRL(totalAmount)}</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Empresas pagadoras
            </div>
            <div className="tablar mt-1 text-2xl font-bold">{uniqueTickers}</div>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Média por provento
            </div>
            <div className="tablar mt-1 text-2xl font-bold">
              {filtered.length > 0 ? formatBRL(totalAmount / filtered.length) : "—"}
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <div className="relative max-w-xs">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por ticker ou empresa..."
              className="h-9 pl-8"
            />
          </div>
          <div className="flex gap-1">
            {(["Todos", "Dividendo", "JCP"] as const).map((t) => (
              <Button
                key={t}
                variant={typeFilter === t ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(t)}
              >
                {t === "Todos" ? "Todos" : t}
              </Button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground self-center ml-auto">
            {filtered.length} proventos encontrados
          </div>
        </div>

        {grouped.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
            <Calendar className="mx-auto size-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Nenhum provento encontrado para os filtros.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map(([month, divs]) => {
              const [year, m] = month.split("-");
              const monthName = new Date(Number(year), Number(m) - 1).toLocaleDateString("pt-BR", {
                month: "long",
                year: "numeric",
              });
              const monthTotal = divs.reduce((s, d) => s + d.amount, 0);
              return (
                <div
                  key={month}
                  className="overflow-hidden rounded-lg border border-border bg-card"
                >
                  <div className="flex items-center justify-between bg-surface-2 px-4 py-3">
                    <h2 className="text-sm font-semibold capitalize">{monthName}</h2>
                    <span className="text-xs text-muted-foreground">
                      {divs.length} proventos · {formatBRL(monthTotal)} total
                    </span>
                  </div>
                  <table className="w-full text-sm">
                    <thead className="bg-card text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-4 py-2.5 text-left font-medium">Data</th>
                        <th className="px-4 py-2.5 text-left font-medium">Ativo</th>
                        <th className="px-4 py-2.5 text-left font-medium">Empresa</th>
                        <th className="px-4 py-2.5 text-left font-medium">Tipo</th>
                        <th className="px-4 py-2.5 text-right font-medium">Valor (por cota)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {divs.map((d, i) => (
                        <tr key={i} className="border-t border-border hover:bg-surface">
                          <td className="px-4 py-2.5 text-muted-foreground">
                            {formatDate(d.paidAt)}
                          </td>
                          <td className="px-4 py-2.5 font-semibold">
                            {d.assetType === "fii" ? (
                              <Link
                                to="/fii/$ticker"
                                params={{ ticker: d.ticker }}
                                className="hover:text-primary"
                              >
                                {d.ticker}
                              </Link>
                            ) : (
                              <Link
                                to="/ativo/$ticker"
                                params={{ ticker: d.ticker }}
                                className="hover:text-primary"
                              >
                                {d.ticker}
                              </Link>
                            )}
                          </td>
                          <td className="px-4 py-2.5 text-muted-foreground">{d.name}</td>
                          <td className="px-4 py-2.5">
                            <span
                              className={
                                "inline-block rounded px-1.5 py-0.5 text-[10px] font-medium uppercase " +
                                (d.type === "Dividendo"
                                  ? "bg-positive/10 text-positive"
                                  : "bg-chart-2/10 text-chart-2")
                              }
                            >
                              {d.type}
                            </span>
                          </td>
                          <td className="tabular px-4 py-2.5 text-right font-medium">
                            {formatBRL(d.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
