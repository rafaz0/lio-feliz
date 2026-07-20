import type { LoteFiscalDto } from "@/presentation/shared/types/application-layer";

interface TaxLotTableProps {
  lotes: LoteFiscalDto[];
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

export function TaxLotTable({ lotes }: TaxLotTableProps) {
  if (lotes.length === 0) {
    return (
      <div data-testid="tax-lot-table-empty" className="text-sm text-muted-foreground">
        Nenhum lote fiscal disponível.
      </div>
    );
  }

  return (
    <div data-testid="tax-lot-table" className="space-y-3">
      <h3 className="text-sm font-medium">Lotes Fiscais</h3>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="p-2 font-medium">Ativo</th>
              <th className="p-2 font-medium">Quantidade</th>
              <th className="p-2 font-medium">Custo Médio</th>
              <th className="p-2 font-medium">Valor Total</th>
              <th className="p-2 font-medium">Data Aquisição</th>
            </tr>
          </thead>
          <tbody>
            {lotes.map((lote, index) => (
              <tr
                key={`${lote.ticker}-${index}`}
                className="border-b last:border-0"
                data-testid="tax-lot-row"
              >
                <td className="p-2 font-medium">{lote.ticker}</td>
                <td className="p-2 tabular-nums">{lote.quantidade}</td>
                <td className="p-2 tabular-nums">{formatBRL(lote.custoMedio)}</td>
                <td className="p-2 tabular-nums">{formatBRL(lote.valorTotal)}</td>
                <td className="p-2 tabular-nums">{formatDate(lote.dataAquisicao)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
