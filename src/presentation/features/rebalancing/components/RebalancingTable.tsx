import type { AllocationDiffViewModel } from "../types/rebalancing.view-model";
import { formatBRL } from "../types/rebalancing.view-model";

interface RebalancingTableProps {
  atual: { classe: string; valor: number; percentual: number }[];
  desejada: { classe: string; valor: number; percentual: number }[];
  diferencas: AllocationDiffViewModel[];
}

export function RebalancingTable({ atual, desejada, diferencas }: RebalancingTableProps) {
  return (
    <table data-testid="rebalancing-table" className="w-full text-sm">
      <thead>
        <tr className="border-b text-left text-muted-foreground">
          <th className="p-2">Classe</th>
          <th className="p-2 text-right">Valor Atual</th>
          <th className="p-2 text-right">% Atual</th>
          <th className="p-2 text-right">% Desejada</th>
          <th className="p-2 text-right">Diferença</th>
        </tr>
      </thead>
      <tbody>
        {diferencas.map((d) => {
          const a = atual.find((x) => x.classe === d.classe);
          const de = desejada.find((x) => x.classe === d.classe);
          return (
            <tr key={d.classe} data-testid="rebalancing-row" className="border-b last:border-0">
              <td className="p-2">{d.classe}</td>
              <td className="p-2 text-right">{a ? formatBRL(a.valor) : "—"}</td>
              <td className="p-2 text-right">{a ? `${a.percentual.toFixed(1)}%` : "—"}</td>
              <td className="p-2 text-right">{de ? `${de.percentual.toFixed(1)}%` : "—"}</td>
              <td
                data-testid="rebalancing-diff"
                className={`p-2 text-right ${d.diferenca > 0 ? "text-emerald-600" : d.diferenca < 0 ? "text-rose-600" : ""}`}
              >
                {d.diferenca > 0 ? "+" : ""}
                {d.diferenca.toFixed(1)}%
              </td>
            </tr>
          );
        })}
        {diferencas.length === 0 ? (
          <tr>
            <td colSpan={5} className="p-4 text-center text-muted-foreground">
              Portfólio equilibrado. Nenhuma ação necessária.
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
