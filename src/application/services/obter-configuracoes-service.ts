import type { ObterConfiguracoesQuery } from "@/application/queries/obter-configuracoes";
import type { ConfiguracoesDto } from "@/application/dtos/configuracoes";
import type { EstrategiaConfiguradaDto } from "@/application/dtos/estrategia";
import type { MetaProgressoDto } from "@/application/dtos/metas";
import type { IApplicationService } from "@/application/application-service";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterConfiguracoesService implements IApplicationService<
  ObterConfiguracoesQuery,
  ConfiguracoesDto
> {
  constructor(private readonly configRepo: IConfigurationRepository) {}

  async Execute(query: ObterConfiguracoesQuery): Promise<ConfiguracoesDto | ApplicationError> {
    if (!query.usuarioId) {
      return new ValidationError("VALID_ERROR", "usuarioId é obrigatório");
    }

    const estrategia = await this.configRepo.ObterEstrategia(query.usuarioId);
    const metasRepo = await this.configRepo.ObterMetas(query.usuarioId);

    const estrategiaDto: EstrategiaConfiguradaDto | null = estrategia
      ? {
          usuarioId: estrategia.usuarioId,
          percentuais: estrategia.percentuais,
          moeda: estrategia.moeda,
          toleranciaRebalanceamento: estrategia.toleranciaRebalanceamento,
          dataAtualizacao: new Date(),
        }
      : null;

    const metas: MetaProgressoDto[] = metasRepo.map((m) => ({
      nome: m.nome,
      valorAlvo: m.valorAlvo,
      valorAtual: 0,
      percentualConcluido: 0,
      prazo: m.prazo,
    }));

    return {
      usuarioId: query.usuarioId,
      estrategia: estrategiaDto,
      metas,
    };
  }
}
