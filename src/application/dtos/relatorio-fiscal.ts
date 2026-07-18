export interface PosicaoFiscalDto {
  readonly ticker: string;
  readonly quantidade: number;
  readonly valorTotal: number;
}

export interface GanhoCapitalDto {
  readonly ticker: string;
  readonly tipo: string;
  readonly valorVenda: number;
  readonly valorCompra: number;
  readonly ganho: number;
}

export interface RelatorioFiscalDto {
  readonly ano: number;
  readonly posicao31Dez: PosicaoFiscalDto[];
  readonly dividendosAno: number;
  readonly jcpAno: number;
  readonly ganhoCapital: GanhoCapitalDto[];
  readonly prejuizoCompensar: number;
}
