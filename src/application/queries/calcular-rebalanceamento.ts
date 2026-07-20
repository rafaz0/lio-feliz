export interface CalcularRebalanceamentoQuery {
  readonly type: "CalcularRebalanceamentoQuery";
  readonly portfolioId: string;
  readonly valorAporte?: number;
}
