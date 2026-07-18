import type { AlocacaoDto } from "./patrimonio";

export interface DiferencaAlocacaoDto {
  readonly classe: string;
  readonly percentualAtual: number;
  readonly percentualDesejado: number;
  readonly diferenca: number;
}

export interface SugestaoAporteDto {
  readonly classe: string;
  readonly valorSugerido: number;
}

export interface RebalanceamentoDto {
  readonly alocacaoAtual: AlocacaoDto[];
  readonly alocacaoDesejada: AlocacaoDto[];
  readonly diferencas: DiferencaAlocacaoDto[];
  readonly sugestaoAportes: SugestaoAporteDto[];
}
