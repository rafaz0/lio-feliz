export interface ObterHistoricoPatrimonialQuery {
  readonly type: "ObterHistoricoPatrimonialQuery";
  readonly portfolioId: string;
  readonly periodo: {
    readonly inicio: Date;
    readonly fim: Date;
  };
}
