import type { ObterStatusSincronizacaoQuery } from "@/application/queries/obter-status-sincronizacao";
import type { SyncStatusDto } from "@/application/dtos/integracao";
import type { IApplicationService } from "@/application/application-service";
import type { IIntegrationRepository } from "@/application/ports/integration-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import type { SyncOrchestrationService } from "@/core/domain/integrations";

export class ObterStatusSincronizacaoService implements IApplicationService<
  ObterStatusSincronizacaoQuery,
  SyncStatusDto
> {
  constructor(
    private readonly integrationRepo: IIntegrationRepository,
    private readonly orchestration: SyncOrchestrationService,
  ) {}

  async Execute(query: ObterStatusSincronizacaoQuery): Promise<SyncStatusDto | ApplicationError> {
    const config = await this.integrationRepo.findById(query.integrationId);
    if (!config) {
      return new NotFoundError("IntegrationConfig", query.integrationId);
    }

    const logs = await this.integrationRepo.findSyncLogsByIntegration(query.integrationId);
    const status = this.orchestration.calculateSyncStatus(logs);

    return {
      integrationId: query.integrationId,
      lastSync: status.lastSync?.toISOString() ?? null,
      status: status.status,
      totalErrors: status.totalErrors,
      logs: logs.map((l) => ({
        id: l.id.value,
        integrationId: l.integrationId,
        type: l.type,
        status: l.status,
        startedAt: l.startedAt.toISOString(),
        completedAt: l.completedAt?.toISOString(),
        recordsProcessed: l.recordsProcessed,
        errors: l.errors,
        message: l.message,
      })),
    };
  }
}
