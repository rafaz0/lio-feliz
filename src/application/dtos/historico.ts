export interface PeriodoDto {
  readonly inicio: Date;
  readonly fim: Date;
}

export interface PontoHistoricoDto {
  readonly data: Date;
  readonly patrimonioTotal: number;
  readonly patrimonioInvestido: number;
}

export interface HistoricoPatrimonialDto {
  readonly portfolioId: string;
  readonly periodo: PeriodoDto;
  readonly pontos: PontoHistoricoDto[];
}
