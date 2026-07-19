import type { BenchmarkViewModel } from "../types/history.view-model";

interface BenchmarkComparisonProps {
  benchmarks: BenchmarkViewModel[];
}

export function BenchmarkComparison({ benchmarks }: BenchmarkComparisonProps) {
  if (benchmarks.length === 0) {
    return null;
  }

  return (
    <div data-testid="benchmark-comparison" className="rounded-xl border p-4">
      <h3 className="mb-2 text-sm font-medium">Comparativo de rentabilidade</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="p-2">Serie</th>
            <th className="p-2 text-right">Rentabilidade</th>
            <th className="p-2 text-right">Vs Carteira</th>
          </tr>
        </thead>
        <tbody>
          {benchmarks.map((b) => (
            <tr key={b.nome} data-testid="benchmark-row" className="border-b last:border-0">
              <td className="p-2">{b.nome}</td>
              <td data-testid="benchmark-rentabilidade" className="p-2 text-right">
                {b.rentabilidade}
              </td>
              <td data-testid="benchmark-variacao" className="p-2 text-right">
                {b.variacaoRelativa}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
