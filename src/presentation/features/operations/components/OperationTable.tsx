import { cn } from "@/presentation/shared/utils";
import type { OperationViewModel } from "../types/operations.view-model";

interface OperationTableProps {
  operations: OperationViewModel[];
}

const TIPO_STYLES: Record<string, string> = {
  BUY: "text-emerald-500",
  DIVIDEND: "text-sky-500",
  JCP: "text-sky-400",
  SELL: "text-rose-500",
};

export function OperationTable({ operations }: OperationTableProps) {
  if (operations.length === 0) {
    return (
      <p
        data-testid="operation-table-empty"
        className="p-6 text-center text-sm text-muted-foreground"
      >
        Nenhuma operação registrada nesta sessão.
      </p>
    );
  }

  return (
    <div data-testid="operation-table" className="rounded-xl border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-left text-muted-foreground">
            <th className="p-3">Tipo</th>
            <th className="p-3">Ativo</th>
            <th className="p-3 text-right">Quantidade</th>
            <th className="p-3 text-right">Valor</th>
            <th className="p-3">Data</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {operations.map((op) => (
            <tr key={op.id} data-testid="operation-row" className="border-b">
              <td className={cn("p-3 font-medium", TIPO_STYLES[op.tipo] ?? "")}>{op.tipoLabel}</td>
              <td className="p-3">{op.ativoId}</td>
              <td className="p-3 text-right tabular-nums">{op.quantidade}</td>
              <td className="p-3 text-right tabular-nums">{op.valor}</td>
              <td className="p-3">{op.data}</td>
              <td className="p-3 text-xs text-muted-foreground">{op.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
