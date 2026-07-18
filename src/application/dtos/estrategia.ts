export interface EstrategiaConfiguradaDto {
  readonly usuarioId: string;
  readonly percentuais: Record<string, number>;
  readonly moeda: string;
  readonly toleranciaRebalanceamento: number;
  readonly dataAtualizacao: Date;
}
