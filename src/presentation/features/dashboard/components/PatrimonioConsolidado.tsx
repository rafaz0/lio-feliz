import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DashboardViewModel } from "../types/dashboard.view-model";

interface PatrimonioConsolidadoProps {
  viewModel: DashboardViewModel;
}

export function PatrimonioConsolidado({ viewModel }: PatrimonioConsolidadoProps) {
  return (
    <Card data-testid="patrimonio-consolidado">
      <CardHeader>
        <CardTitle>Patrimônio Consolidado</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-3">
        <div>
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-xl font-semibold tabular-nums">{viewModel.patrimonioTotal}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Investido</p>
          <p className="text-xl font-semibold tabular-nums">{viewModel.patrimonioInvestido}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Disponível</p>
          <p className="text-xl font-semibold tabular-nums">{viewModel.saldoDisponivel}</p>
        </div>
        <div className="sm:col-span-3">
          <p className="text-sm text-muted-foreground">
            Evolução mensal: <span className="font-medium">{viewModel.evolucaoMensal}</span> ·{" "}
            Referência: {viewModel.dataReferencia}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
