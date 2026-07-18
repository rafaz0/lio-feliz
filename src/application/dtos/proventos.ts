export interface ProventoDto {
  readonly ativoId: string;
  readonly ticker: string;
  readonly tipo: string;
  readonly valor: number;
  readonly dataPagamento: Date;
  readonly dataBase: Date;
}

export interface ProventosDto {
  readonly proventos: ProventoDto[];
  readonly totalPeriodo: number;
  readonly totalAcumulado: number;
}
