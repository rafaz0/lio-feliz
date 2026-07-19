import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/presentation/shared/utils";
import type { PortfolioSummaryViewModel } from "../types/portfolio.view-model";
import { AllocationBadge } from "./AllocationBadge";

interface PortfolioSummaryProps {
  summary: PortfolioSummaryViewModel;
}

export function PortfolioSummary({ summary }: PortfolioSummaryProps) {
  return (
    <Card data-testid="portfolio-summary">
      <CardHeader>
        <CardTitle>Resumo da Carteira</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm text-muted-foreground">Patrimônio Total</p>
          <p className="text-xl font-semibold tabular-nums">{summary.patrimonioTotal}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Investido</p>
          <p className="text-xl font-semibold tabular-nums">{summary.patrimonioInvestido}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Disponível</p>
          <p className="text-xl font-semibold tabular-nums">{summary.saldoDisponivel}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Evolução Mensal</p>
          <p
            className={cn(
              "text-xl font-semibold tabular-nums",
              summary.evolucaoMensalTrend === "up" && "text-emerald-500",
              summary.evolucaoMensalTrend === "down" && "text-rose-500",
            )}
          >
            {summary.evolucaoMensal}
          </p>
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          <p className="text-sm text-muted-foreground">
            Referência: {summary.dataReferencia} · {summary.totalAtivos} classes de ativos
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {summary.alocacao.map((item) => (
              <AllocationBadge key={item.classe} allocation={item} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
