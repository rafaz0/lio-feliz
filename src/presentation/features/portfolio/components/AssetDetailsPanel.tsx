import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/presentation/shared/utils";
import type { AssetViewModel } from "../types/portfolio.view-model";

interface AssetDetailsPanelProps {
  asset: AssetViewModel;
}

export function AssetDetailsPanel({ asset }: AssetDetailsPanelProps) {
  return (
    <Card data-testid="asset-details-panel">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {asset.ticker}
          <span className="text-sm font-normal text-muted-foreground">{asset.nome}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2">
        <Detail label="Classe" value={asset.classe} />
        <Detail label="Quantidade" value={asset.quantidade} />
        <Detail label="Preço Médio" value={asset.precoMedio} />
        <Detail label="Valor Total" value={asset.valorTotal} />
        <Detail label="Valorização" value={asset.valorizacao} trend={trend(asset.valorizacao)} />
        <Detail
          label="Rentab. Total"
          value={asset.rentabilidadeTotal}
          trend={trend(asset.rentabilidadeTotal)}
        />
        <Detail
          label="Rentab. Período"
          value={asset.rentabilidadePeriodo}
          trend={trend(asset.rentabilidadePeriodo)}
        />
      </CardContent>
    </Card>
  );
}

function Detail({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend?: "up" | "down" | "neutral";
}) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p
        className={cn(
          "tabular-nums",
          trend === "up" && "text-emerald-500",
          trend === "down" && "text-rose-500",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function trend(valor: string): "up" | "down" | "neutral" {
  if (valor.startsWith("+")) return "up";
  if (valor.startsWith("-")) return "down";
  return "neutral";
}
