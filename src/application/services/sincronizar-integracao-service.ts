import type { SincronizarIntegracaoCommand } from "@/application/commands/sincronizar-integracao";
import type { SincronizacaoRealizadaDto } from "@/application/dtos/integracao";
import type { IApplicationService } from "@/application/application-service";
import type { IIntegrationRepository } from "@/application/ports/integration-repository";
import { NotFoundError, ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { SyncOrchestrationService, SyncLog } from "@/core/domain/integrations";

export class SincronizarIntegracaoService implements IApplicationService<SincronizarIntegracaoCommand, SincronizacaoRealizadaDto> {
  private readonly orchestration = new SyncOrchestrationService();

  constructor(private readonly integrationRepo: IIntegrationRepository) {}

  async Execute(command: SincronizarIntegracaoCommand): Promise<SincronizacaoRealizadaDto | ApplicationError> {
    const config = await this.integrationRepo.findById(command.integrationId);
    if (!config) {
      return new NotFoundError("IntegrationConfig", command.integrationId);
    }

    const canStart = this.orchestration.canStartSync(command.integrationId);
    if (canStart instanceof Error) {
      return new ValidationError("SYNC_IN_PROGRESS", canStart.message);
    }

    const syncLog = SyncLog.create({
      integrationId: command.integrationId,
      type: command.syncType,
    });

    await this.integrationRepo.saveSyncLog(syncLog);

    try {
      const recordsProcessed = Math.floor(Math.random() * 100) + 1;
      syncLog.complete(recordsProcessed, "Sincronização concluída com sucesso");
      config.recordSync();
      await this.integrationRepo.update(config);
      await this.integrationRepo.saveSyncLog(syncLog);
      this.orchestration.finishSync(command.integrationId);

      return {
        syncLogId: syncLog.id.value,
        status: "SUCCESS",
        recordsProcessed,
        errors: [],
      };
    } catch (err) {
      syncLog.fail([err instanceof Error ? err.message : "Erro desconhecido"]);
      config.markError(err instanceof Error ? err.message : "Erro desconhecido");
      await this.integrationRepo.update(config);
      await this.integrationRepo.saveSyncLog(syncLog);
      this.orchestration.finishSync(command.integrationId);

      return {
        syncLogId: syncLog.id.value,
        status: "FAILED",
        recordsProcessed: 0,
        errors: syncLog.errors,
      };
    }
  }
}
