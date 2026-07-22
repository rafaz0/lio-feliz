export interface AtivosInternacionaisDto {
  readonly ativos: Array<{
    ticker: string;
    name: string;
    exchange: string;
    currency: string;
    assetType: string;
    valorOriginal: number;
    valorBRL: number;
    taxaCambio: number;
  }>;
}

export interface TaxaCambioDto {
  readonly ticker: string;
  readonly currency: string;
  readonly fromCurrency: string;
  readonly toCurrency: string;
  readonly rate: number;
  readonly source: string;
  readonly lastUpdated: string;
  readonly isFresh: boolean;
}
