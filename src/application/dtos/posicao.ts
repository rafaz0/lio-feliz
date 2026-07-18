import type { RentabilidadeDto } from "./rentabilidade";

export interface PosicaoDetalhadaDto {
  readonly ticker: string;
  readonly nome: string;
  readonly classe: string;
  readonly quantidade: number;
  readonly precoMedio: number;
  readonly valorTotal: number;
  readonly rentabilidade: RentabilidadeDto;
}
