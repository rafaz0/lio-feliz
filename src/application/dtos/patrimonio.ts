export interface PatrimonioDto {
  readonly patrimonioTotal: number;
  readonly patrimonioInvestido: number;
  readonly saldoDisponivel: number;
  readonly moeda: string;
  readonly dataReferencia: Date;
  readonly alocacao: AlocacaoDto[];
  readonly evolucaoMensal: number;
}

export interface AlocacaoDto {
  readonly classe: string;
  readonly valor: number;
  readonly percentual: number;
}
