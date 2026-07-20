interface TaxSummaryExtendedProps {
  totalOperacoes: number;
  totalVendas: number;
  totalCompras: number;
  ganhoLiquido: number;
  impostoDevido: number;
  impostoPago: number;
  prejuizoCompensarSwing: number;
  prejuizoCompensarDayTrade: number;
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function TaxSummaryExtended({
  totalOperacoes,
  totalVendas,
  totalCompras,
  ganhoLiquido,
  impostoDevido,
  impostoPago,
  prejuizoCompensarSwing,
  prejuizoCompensarDayTrade,
}: TaxSummaryExtendedProps) {
  const saldoAPagar = Math.max(0, impostoDevido - impostoPago);

  return (
    <div data-testid="tax-summary-extended" className="rounded-xl border p-4">
      <h3 className="mb-3 text-sm font-medium">Consolidado Anual</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Operações</p>
          <p className="text-lg font-semibold tabular-nums">{totalOperacoes}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Vendas</p>
          <p className="text-lg font-semibold tabular-nums">{formatBRL(totalVendas)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Compras</p>
          <p className="text-lg font-semibold tabular-nums">{formatBRL(totalCompras)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Ganho Líquido</p>
          <p className={`text-lg font-semibold tabular-nums ${ganhoLiquido >= 0 ? "text-green-600" : "text-red-600"}`}>
            {formatBRL(ganhoLiquido)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">IR Devido</p>
          <p className="text-lg font-semibold tabular-nums text-red-600">{formatBRL(impostoDevido)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">IR Pago</p>
          <p className="text-lg font-semibold tabular-nums">{formatBRL(impostoPago)}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Saldo a Pagar</p>
          <p className={`text-lg font-semibold tabular-nums ${saldoAPagar > 0 ? "text-red-600" : "text-green-600"}`}>
            {saldoAPagar > 0 ? formatBRL(saldoAPagar) : "R$ 0,00"}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Prejuízo Compensar</p>
          <p className="text-lg font-semibold tabular-nums">
            {formatBRL(prejuizoCompensarSwing + prejuizoCompensarDayTrade)}
          </p>
        </div>
      </div>
    </div>
  );
}
