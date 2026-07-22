export interface AtualizarTaxaCambioCommand {
  readonly type: "AtualizarTaxaCambioCommand";
  readonly ticker: string;
  readonly currency: string;
  readonly fromCurrency: string;
  readonly toCurrency: string;
  readonly rate: number;
  readonly source: string;
}
