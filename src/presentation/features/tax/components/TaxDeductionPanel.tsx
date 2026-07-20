interface TaxDeductionPanelProps {
  prejuizoCompensarSwing: number;
  prejuizoCompensarDayTrade: number;
  impostoDevido: number;
  impostoPago: number;
}

function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function TaxDeductionPanel({
  prejuizoCompensarSwing,
  prejuizoCompensarDayTrade,
  impostoDevido,
  impostoPago,
}: TaxDeductionPanelProps) {
  const saldoAPagar = Math.max(0, impostoDevido - impostoPago);
  const totalPrejuizo = prejuizoCompensarSwing + prejuizoCompensarDayTrade;

  return (
    <div data-testid="tax-deduction-panel" className="space-y-3 rounded-xl border p-4">
      <h3 className="text-sm font-medium">Compensação e Deduções</h3>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Prejuízo Swing-Trade</p>
          <p className="text-base font-semibold tabular-nums">
            {formatBRL(prejuizoCompensarSwing)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Prejuízo Day-Trade</p>
          <p className="text-base font-semibold tabular-nums">
            {formatBRL(prejuizoCompensarDayTrade)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Total Prejuízo</p>
          <p className="text-base font-semibold tabular-nums">
            {formatBRL(totalPrejuizo)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Saldo a Pagar</p>
          <p className={`text-base font-semibold tabular-nums ${saldoAPagar > 0 ? "text-red-600" : "text-green-600"}`}>
            {saldoAPagar > 0 ? formatBRL(saldoAPagar) : "R$ 0,00"}
          </p>
        </div>
      </div>

      {totalPrejuizo > 0 && (
        <p className="text-xs text-muted-foreground">
          Prejuízos podem ser compensados com lucros futuros no mesmo tipo de operação.
        </p>
      )}
    </div>
  );
}
