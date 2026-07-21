import type { RendaFixaViewModel } from "../types/fixed-income.view-model";

interface FixedIncomeListProps {
  assets: RendaFixaViewModel[];
}

export function FixedIncomeList({ assets }: FixedIncomeListProps) {
  return (
    <div data-testid="fixed-income-list" className="space-y-3">
      {assets.map((asset) => (
        <div
          key={asset.id}
          data-testid="fixed-income-item"
          className="rounded-lg border border-border bg-card p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold">{asset.ticker}</p>
              <p className="text-sm text-muted-foreground">
                {asset.name} · {asset.institution}
              </p>
            </div>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {asset.productTypeLabel}
            </span>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-muted-foreground">Valor nominal</dt>
              <dd className="font-medium">{asset.nominalValue}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Taxa</dt>
              <dd className="font-medium">
                {asset.rate} {asset.rateType}
              </dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Projetado</dt>
              <dd className="font-medium">{asset.projectedValue}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Retorno</dt>
              <dd className="font-medium">{asset.totalReturnPercent.toFixed(2)}%</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Emissão</dt>
              <dd className="font-medium">{asset.issueDate}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Vencimento</dt>
              <dd className="font-medium">{asset.maturityDate}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Total juros</dt>
              <dd className="font-medium">{asset.totalJuros}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Amortização</dt>
              <dd className="font-medium">{asset.totalAmortizacao}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}
