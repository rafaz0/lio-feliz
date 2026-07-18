export interface AssinaturaAtualizadaDto {
  readonly usuarioId: string;
  readonly plano: string;
  readonly dataAtivacao: Date;
  readonly dataExpiracao: Date | null;
  readonly recursosLiberados: string[];
}
