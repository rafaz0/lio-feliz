import type { TaxEntryViewModel } from "../types/tax.view-model";
import { formatBRL } from "../types/tax.view-model";

interface TaxTableProps {
  entries: TaxEntryViewModel[];
}

export function TaxTable({ entries }: TaxTableProps) {
  return (
    <table data-testid="tax-table" className="w-full text-sm">
      <thead>
        <tr className="border-b text-left text-muted-foreground">
          <th className="p-2">Ticker</th>
          <th className="p-2">Tipo</th>
          <th className="p-2 text-right">Valor Venda</th>
          <th className="p-2 text-right">Valor Compra</th>
          <th className="p-2 text-right">Ganho</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((e, i) => (
          <tr
            key={`${e.ticker}-${e.tipo}-${i}`}
            data-testid="tax-row"
            className="border-b last:border-0"
          >
            <td className="p-2">{e.ticker || "—"}</td>
            <td className="p-2">{e.tipo}</td>
            <td className="p-2 text-right">{formatBRL(e.valorVenda)}</td>
            <td className="p-2 text-right">{formatBRL(e.valorCompra)}</td>
            <td
              data-testid="tax-ganho"
              className={`p-2 text-right ${e.ganho > 0 ? "text-emerald-600" : e.ganho < 0 ? "text-rose-600" : ""}`}
            >
              {e.ganho > 0 ? "+" : ""}
              {formatBRL(e.ganho)}
            </td>
          </tr>
        ))}
        {entries.length === 0 ? (
          <tr>
            <td colSpan={5} className="p-4 text-center text-muted-foreground">
              Nenhum registro para o filtro selecionado.
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}
