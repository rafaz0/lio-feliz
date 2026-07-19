import type { DividendViewModel } from "../types/dividends.view-model";

interface DividendsTableProps {
  dividends: DividendViewModel[];
  onSelect?: (dividend: DividendViewModel) => void;
}

export function DividendsTable({ dividends, onSelect }: DividendsTableProps) {
  return (
    <div data-testid="dividends-table" className="rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="p-3">Ativo</th>
            <th className="p-3">Tipo</th>
            <th className="p-3 text-right">Valor</th>
            <th className="p-3 text-right">Data base</th>
            <th className="p-3 text-right">Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {dividends.map((dividend) => (
            <tr
              key={dividend.id}
              data-testid="dividend-row"
              onClick={() => onSelect?.(dividend)}
              className="cursor-pointer border-b last:border-0 hover:bg-muted"
            >
              <td className="p-3 font-medium">{dividend.ticker}</td>
              <td className="p-3 text-muted-foreground">{dividend.tipoLabel}</td>
              <td className="p-3 text-right">{dividend.valor}</td>
              <td className="p-3 text-right">{dividend.dataBase}</td>
              <td className="p-3 text-right">{dividend.dataPagamento}</td>
            </tr>
          ))}
          {dividends.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                data-testid="dividends-table-empty"
                className="p-6 text-center text-muted-foreground"
              >
                Nenhum provento encontrado.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
