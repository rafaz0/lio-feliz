export interface ObterTaxaCambioQuery {
  readonly type: "ObterTaxaCambioQuery";
  readonly ticker: string;
  readonly currency?: string;
  readonly date?: string;
}
