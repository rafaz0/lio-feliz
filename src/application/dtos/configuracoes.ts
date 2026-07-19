import type { EstrategiaConfiguradaDto } from "@/application/dtos/estrategia";
import type { MetaProgressoDto } from "@/application/dtos/metas";

export interface ConfiguracoesDto {
  readonly usuarioId: string;
  readonly estrategia: EstrategiaConfiguradaDto | null;
  readonly metas: MetaProgressoDto[];
}
