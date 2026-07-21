import type { ObterIntegracoesQuery } from "@/application/queries/obter-integracoes";
import type { IntegracoesListDto } from "@/application/dtos/integracao";
import type { IApplicationService } from "@/application/application-service";
import type { IIntegrationRepository } from "@/application/ports/integration-repository";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterIntegracoesService implements IApplicationService<ObterIntegracoesQuery, IntegracoesListDto> {
  constructor(private readonly integrationRepo: IIntegrationRepository) {}

  async Execute(_query: ObterIntegracoesQuery): Promise<IntegracoesListDto | ApplicationError> {
    const configs = await this.integrationRepo.findAll();
    return {
      integrations: configs.map(c => ({
        id: c.id.value,
        provider: c.provider,
        name: c.name,
        authType: c.authType,
        status: c.status,
        lastSyncAt: c.lastSyncAt?.toISOString(),
        errorMessage: c.errorMessage,
        createdAt: c.createdAt.toISOString(),
        updatedAt: c.updatedAt.toISOString(),
      })),
    };
  }
}
