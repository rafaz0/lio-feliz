import type { DividendViewModel } from "../types/dividends.view-model";

interface DividendCardProps {
  dividend: DividendViewModel;
  onSelect?: (dividend: DividendViewModel) => void;
}

export function DividendCard({ dividend, onSelect }: DividendCardProps) {
  return (
    <button
      type="button"
      data-testid="dividend-card"
      onClick={() => onSelect?.(dividend)}
      className="flex w-full items-center justify-between rounded-lg border p-3 text-left text-sm hover:bg-muted"
    >
      <div>
        <p className="font-medium">{dividend.ticker}</p>
        <p className="text-xs text-muted-foreground">{dividend.tipoLabel}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{dividend.valor}</p>
        <p className="text-xs text-muted-foreground">{dividend.dataPagamento}</p>
      </div>
    </button>
  );
}
