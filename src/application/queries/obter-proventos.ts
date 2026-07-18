export interface ObterProventosQuery {
  readonly type: "ObterProventosQuery";
  readonly portfolioId: string;
  readonly ano?: number;
  readonly ticker?: string;
}
