import type { ImpostoMensalDto } from "@/presentation/shared/types/application-layer";
import { formatBRL } from "../types/tax.view-model";

interface TaxCalculationDetailProps {
  items: ImpostoMensalDto[];
}

export function TaxCalculationDetail({ items }: TaxCalculationDetailProps) {
  if (items.length === 0) {
    return (
      <div data-testid="tax-calculation-detail-empty" className="text-sm text-muted-foreground">
        Nenhum resultado fiscal para o período selecionado.
      </div>
    );
  }

  return (
    <div data-testid="tax-calculation-detail" className="space-y-3">
      <h3 className="text-sm font-medium">Detalhamento Mensal</h3>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm" data-testid="tax-calculation-table">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-2 font-medium">Mês</th>
              <th className="p-2 font-medium">Vendas</th>
              <th className="p-2 font-medium">Compras</th>
              <th className="p-2 font-medium">Ganho Líquido</th>
              <th className="p-2 font-medium">Day-Trade</th>
              <th className="p-2 font-medium">IR Devido</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.mes} className="border-b last:border-0" data-testid="tax-calculation-row">
                <td className="p-2 font-medium">{item.mes}</td>
                <td className="p-2 tabular-nums">{formatBRL(item.totalVendas)}</td>
                <td className="p-2 tabular-nums">{formatBRL(item.totalCompras)}</td>
                <td className={`p-2 tabular-nums ${item.ganhoLiquido >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {formatBRL(item.ganhoLiquido)}
                </td>
                <td className="p-2">
                  {item.operacaoDayTrade ? (
                    <span className="rounded bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-yellow-800">
                      Day-Trade
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Swing</span>
                  )}
                </td>
                <td className="p-2 tabular-nums font-medium">
                  {item.impostoDevido > 0 ? formatBRL(item.impostoDevido) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
