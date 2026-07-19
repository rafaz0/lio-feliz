import type { DividendViewModel } from "../types/dividends.view-model";

interface DividendDetailsProps {
  dividend: DividendViewModel | null;
  onClose?: () => void;
}

export function DividendDetails({ dividend, onClose }: DividendDetailsProps) {
  if (!dividend) {
    return null;
  }

  return (
    <aside
      data-testid="dividend-details"
      aria-label="Detalhes do provento"
      className="rounded-xl border p-4 text-sm"
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-medium">{dividend.ticker}</h3>
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            data-testid="dividend-details-close"
            className="text-xs text-muted-foreground hover:underline"
          >
            Fechar
          </button>
        ) : null}
      </div>
      <dl className="space-y-1">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Tipo</dt>
          <dd>{dividend.tipoLabel}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Valor</dt>
          <dd>{dividend.valor}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Data base</dt>
          <dd>{dividend.dataBase}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Pagamento</dt>
          <dd>{dividend.dataPagamento}</dd>
        </div>
      </dl>
    </aside>
  );
}
