export interface ObterCronogramaPagamentosQuery {
  readonly type: "ObterCronogramaPagamentosQuery";
  readonly portfolioId: string;
  readonly apenasFuturos?: boolean;
}
