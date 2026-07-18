export interface ConsultarRentabilidadeQuery {
  readonly portfolioId: string;
  readonly ativoId?: string;
  readonly periodo: {
    readonly inicio: Date;
    readonly fim: Date;
  };
}
