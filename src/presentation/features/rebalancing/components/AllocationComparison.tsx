import type { AllocationViewModel, AllocationDiffViewModel } from "../types/rebalancing.view-model";
import { formatBRL } from "../types/rebalancing.view-model";

interface AllocationComparisonProps {
  atual: AllocationViewModel[];
  desejada: AllocationViewModel[];
  diferencas: AllocationDiffViewModel[];
}

export function AllocationComparison({ atual, desejada, diferencas }: AllocationComparisonProps) {
  return (
    <div data-testid="allocation-comparison" className="rounded-xl border p-4">
      <h3 className="mb-2 text-sm font-medium">Comparativo de alocação</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="p-2">Classe</th>
            <th className="p-2 text-right">Atual</th>
            <th className="p-2 text-right">Desejada</th>
            <th className="p-2 text-right">Diff</th>
          </tr>
        </thead>
        <tbody>
          {diferencas.map((d) => {
            const a = atual.find((x) => x.classe === d.classe);
            const de = desejada.find((x) => x.classe === d.classe);
            return (
              <tr
                key={d.classe}
                data-testid="allocation-diff-row"
                className="border-b last:border-0"
              >
                <td className="p-2">{d.classe}</td>
                <td data-testid="alloc-atual" className="p-2 text-right">
                  {a ? `${a.percentual.toFixed(1)}%` : "—"}
                </td>
                <td data-testid="alloc-desejada" className="p-2 text-right">
                  {de ? `${de.percentual.toFixed(1)}%` : "—"}
                </td>
                <td data-testid="alloc-diff" className="p-2 text-right">
                  {d.diferenca.toFixed(1)}%
                </td>
              </tr>
            );
          })}
          {diferencas.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-muted-foreground">
                Nenhuma diferença de alocação.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
