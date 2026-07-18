export interface MetaProgressoDto {
  readonly nome: string;
  readonly valorAlvo: number;
  readonly valorAtual: number;
  readonly percentualConcluido: number;
  readonly prazo: Date;
}

export interface ProgressoMetasDto {
  readonly metas: MetaProgressoDto[];
  readonly progressoGeral: number;
}
