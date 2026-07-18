import type { PeriodoDto } from "./historico";

export interface RentabilidadeDto {
  readonly ativoId: string;
  readonly periodo: PeriodoDto;
  readonly valorizacao: number;
  readonly rentabilidadeTotal: number;
  readonly rentabilidadePeriodo: number;
}
