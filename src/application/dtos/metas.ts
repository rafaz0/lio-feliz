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

export interface MetaListDto {
  readonly id: string;
  readonly name: string;
  readonly targetAmount: number;
  readonly currentAmount: number;
  readonly percentage: number;
  readonly targetDate: Date;
  readonly category: string;
  readonly status: string;
}

export interface MetaProgressoDetalhadoDto {
  readonly id: string;
  readonly name: string;
  readonly percentage: number;
  readonly projectedDate: Date | null;
  readonly onTrack: boolean | null;
  readonly contributions: number;
  readonly monthlyAverage: number | null;
  readonly currentAmount: number;
  readonly targetAmount: number;
  readonly remainingAmount: number;
}
