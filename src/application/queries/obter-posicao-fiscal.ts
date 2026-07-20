export interface ObterPosicaoFiscalQuery {
  readonly type: "ObterPosicaoFiscalQuery";
  readonly portfolioId: string;
  readonly ativoId?: string;
  readonly periodo: string;
}
