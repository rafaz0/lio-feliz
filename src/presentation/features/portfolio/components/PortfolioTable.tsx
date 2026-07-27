import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { PositionViewModel } from "../types/portfolio.view-model";
import { PositionRow } from "./PositionRow";

type SortKey = "classe" | "valor" | "percentual" | "ideal" | "delta";
type SortDir = "asc" | "desc";

interface PortfolioTableProps {
  positions: PositionViewModel[];
  onSelectAtivo?: (classe: string) => void;
  selectedClasse?: string | null;
  idealPct?: number;
}

export function PortfolioTable({ positions, onSelectAtivo, selectedClasse, idealPct }: PortfolioTableProps) {
  const [filtro, setFiltro] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("valor");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const ideal = idealPct ?? (positions.length > 0 ? 100 / positions.length : 0);

  const visiveis = useMemo(() => {
    const termo = filtro.trim().toLowerCase();
    const filtrados = termo
      ? positions.filter((p) => p.classe.toLowerCase().includes(termo))
      : positions;

    const ordenados = [...filtrados].sort((a, b) => {
      let cmp = 0;
      const deltaA = a.percentual - ideal;
      const deltaB = b.percentual - ideal;
      if (sortKey === "classe") cmp = a.classe.localeCompare(b.classe);
      else if (sortKey === "valor") cmp = extrairNumero(a.valor) - extrairNumero(b.valor);
      else if (sortKey === "percentual") cmp = a.percentual - b.percentual;
      else if (sortKey === "ideal") cmp = 0;
      else cmp = Math.abs(deltaA) - Math.abs(deltaB);
      return sortDir === "asc" ? cmp : -cmp;
    });

    return ordenados;
  }, [positions, filtro, sortKey, sortDir, ideal]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  return (
    <div data-testid="portfolio-table" className="rounded-xl border">
      <div className="flex items-center gap-2 border-b p-3">
        <input
          type="search"
          aria-label="Filtrar ativos por classe"
          placeholder="Filtrar por classe..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
          data-testid="portfolio-filter"
        />
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="p-3">
              <button type="button" onClick={() => toggleSort("classe")} data-testid="sort-classe">
                Classe {sortKey === "classe" ? seta(sortDir) : ""}
              </button>
            </th>
            <th className="p-3 text-right">
              <button type="button" onClick={() => toggleSort("valor")} data-testid="sort-valor">
                Valor {sortKey === "valor" ? seta(sortDir) : ""}
              </button>
            </th>
            <th className="p-3 text-right">
              <button
                type="button"
                onClick={() => toggleSort("percentual")}
                data-testid="sort-percentual"
              >
                % {sortKey === "percentual" ? seta(sortDir) : ""}
              </button>
            </th>
            <th className="p-3 text-right">
              <button
                type="button"
                onClick={() => toggleSort("ideal")}
                data-testid="sort-ideal"
                className="inline-flex items-center gap-1"
              >
                % Ideal
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex">
                        <Info className="size-3 text-muted-foreground/50" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[220px] text-xs leading-relaxed">
                      Sugestão baseada em divisão igualitária entre as classes. Ainda não é personalizável — futuramente você poderá definir seu próprio % alvo.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {sortKey === "ideal" ? seta(sortDir) : ""}
              </button>
            </th>
            <th className="p-3 text-right">
              <button type="button" onClick={() => toggleSort("delta")} data-testid="sort-delta">
                Sinal {sortKey === "delta" ? seta(sortDir) : ""}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {visiveis.map((position) => (
            <PositionRow
              key={position.classe}
              position={position}
              onSelect={onSelectAtivo}
              isSelected={selectedClasse === position.classe}
              idealPct={ideal}
            />
          ))}
          {visiveis.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-6 text-center text-muted-foreground">
                Nenhum ativo encontrado.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

function seta(dir: SortDir): string {
  return dir === "asc" ? "▲" : "▼";
}

function extrairNumero(valorFormatado: string): number {
  const numeros = valorFormatado.replace(/[^\d,]/g, "").replace(",", ".");
  const n = Number(numeros);
  return Number.isFinite(n) ? n : 0;
}
