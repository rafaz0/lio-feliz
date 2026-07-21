export interface OperacaoRegistradaDto {
  readonly operacaoId: string;
  readonly tipo: string;
  readonly ativoId: string;
  readonly quantidade: number;
  readonly valor: number;
  readonly data: Date;
  readonly status: string;
}

export interface ImportacaoErroDto {
  readonly linha: number;
  readonly tipo: string;
  readonly mensagem: string;
}
