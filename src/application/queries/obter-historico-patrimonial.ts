export interface ObterHistoricoPatrimonialQuery {
  readonly portfolioId: string;
  readonly periodo: {
    readonly inicio: Date;
    readonly fim: Date;
  };
}
