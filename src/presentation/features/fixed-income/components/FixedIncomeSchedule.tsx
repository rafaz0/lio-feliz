import type { CronogramaViewModel } from "../types/fixed-income.view-model";

interface FixedIncomeScheduleProps {
  cronograma: CronogramaViewModel;
}

export function FixedIncomeSchedule({ cronograma }: FixedIncomeScheduleProps) {
  return (
    <div data-testid="fixed-income-schedule" className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">Cronograma de pagamentos</h2>
        <div className="flex gap-4 text-sm">
          <span className="text-muted-foreground">
            Juros: <span className="font-medium text-foreground">{cronograma.totalJuros}</span>
          </span>
          <span className="text-muted-foreground">
            Amortização:{" "}
            <span className="font-medium text-foreground">{cronograma.totalAmortizacao}</span>
          </span>
        </div>
      </div>

      {cronograma.items.length === 0 ? (
        <p data-testid="fixed-income-schedule-empty" className="text-sm text-muted-foreground">
          Nenhum pagamento futuro agendado.
        </p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Data</th>
                <th className="px-3 py-2 font-medium">Título</th>
                <th className="px-3 py-2 font-medium">Tipo</th>
                <th className="px-3 py-2 text-right font-medium">Valor</th>
              </tr>
            </thead>
            <tbody>
              {cronograma.items.map((item, index) => (
                <tr
                  key={`${item.assetId}-${item.date}-${item.tipo}-${index}`}
                  className="border-t border-border"
                >
                  <td className="px-3 py-2">{item.date}</td>
                  <td className="px-3 py-2">{item.ticker}</td>
                  <td className="px-3 py-2">{item.tipoLabel}</td>
                  <td className="px-3 py-2 text-right font-medium">{item.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
