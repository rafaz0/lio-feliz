export interface LoteFiscalDto {
  readonly ticker: string;
  readonly quantidade: number;
  readonly custoMedio: number;
  readonly valorTotal: number;
  readonly dataAquisicao: string;
}

export interface ImpostoMensalDto {
  readonly mes: string;
  readonly totalVendas: number;
  readonly totalCompras: number;
  readonly ganhoLiquido: number;
  readonly impostoDevido: number;
  readonly prejuizoCompensar: number;
  readonly operacaoDayTrade: boolean;
}

export interface ConsolidadoAnualDto {
  readonly totalOperacoes: number;
  readonly totalVendas: number;
  readonly totalCompras: number;
  readonly ganhoLiquido: number;
  readonly impostoDevido: number;
  readonly impostoPago: number;
  readonly prejuizoCompensarSwing: number;
  readonly prejuizoCompensarDayTrade: number;
}

export interface DeclaracaoDto {
  readonly ano: number;
  readonly totalOperacoes: number;
  readonly totalProventos: number;
  readonly impostoDevido: number;
  readonly impostoPago: number;
  readonly prejuizoCompensar: number;
  readonly lotes: LoteFiscalDto[];
  readonly impostoMensal: ImpostoMensalDto[];
  readonly consolidadoAnual: ConsolidadoAnualDto;
}
