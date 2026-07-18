export interface SincronizacaoErroDto {
  readonly fonte: string;
  readonly linha: number;
  readonly tipo: string;
  readonly mensagem: string;
}

export interface SincronizacaoRealizadaDto {
  readonly fonte: string;
  readonly dataSincronizacao: Date;
  readonly totalProcessado: number;
  readonly totalNovo: number;
  readonly totalIgnorado: number;
  readonly erros: SincronizacaoErroDto[];
}
