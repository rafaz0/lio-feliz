export interface InternationalSummaryViewModel {
  readonly totalValorBRL: number;
  readonly totalAtivos: number;
  readonly moedas: string[];
}

export interface InternationalAssetViewModel {
  readonly ticker: string;
  readonly name: string;
  readonly exchange: string;
  readonly currency: string;
  readonly assetType: string;
  readonly valorOriginal: number;
  readonly valorBRL: string;
  readonly taxaCambio: number;
}

export function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

export function toInternationalSummaryViewModel(
  assets: InternationalAssetViewModel[],
): InternationalSummaryViewModel {
  return {
    totalValorBRL: assets.reduce((acc, a) => acc + a.valorOriginal * a.taxaCambio, 0),
    totalAtivos: assets.length,
    moedas: [...new Set(assets.map((a) => a.currency))],
  };
}
