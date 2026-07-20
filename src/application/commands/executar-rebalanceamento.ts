export interface AcaoRebalanceamentoDto {
  readonly classe: string;
  readonly valor: number;
  readonly tipo: "aporte" | "venda";
}

export interface ExecutarRebalanceamentoCommand {
  readonly type: "ExecutarRebalanceamentoCommand";
  readonly portfolioId: string;
  readonly acoes: AcaoRebalanceamentoDto[];
}
