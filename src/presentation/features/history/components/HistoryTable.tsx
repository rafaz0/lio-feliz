import type { PerformancePointViewModel } from "../types/history.view-model";

interface HistoryTableProps {
  pontos: PerformancePointViewModel[];
}

export function HistoryTable({ pontos }: HistoryTableProps) {
  return (
    <div data-testid="history-table" className="rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="p-3">Data</th>
            <th className="p-3 text-right">Patrimônio</th>
            <th className="p-3 text-right">Investido</th>
          </tr>
        </thead>
        <tbody>
          {pontos.map((ponto) => (
            <tr key={ponto.data} data-testid="history-row" className="border-b last:border-0">
              <td className="p-3">{ponto.data}</td>
              <td className="p-3 text-right">{formatBRL(ponto.patrimonioTotal)}</td>
              <td className="p-3 text-right">{formatBRL(ponto.patrimonioInvestido)}</td>
            </tr>
          ))}
          {pontos.length === 0 ? (
            <tr>
              <td
                colSpan={3}
                data-testid="history-table-empty"
                className="p-6 text-center text-muted-foreground"
              >
                Nenhum registro encontrado.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
