import type { SincronizarIntegracaoCommand } from "@/application/commands/sincronizar-integracao";
import type { SyncResultDto } from "@/application/dtos/integracao";
import type { IApplicationService } from "@/application/application-service";
import type { IIntegrationRepository } from "@/application/ports/integration-repository";
import { NotFoundError, ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { SyncLog } from "@/core/domain/integrations";
import type { SyncOrchestrationService } from "@/core/domain/integrations";
import { ConnectionFailedError } from "@/core/domain/integrations";

const RETRY_BACKOFF = [60_000, 300_000, 900_000];

export class SincronizarIntegracaoService implements IApplicationService<SincronizarIntegracaoCommand, SyncResultDto> {
  constructor(
    private readonly integrationRepo: IIntegrationRepository,
    private readonly orchestration: SyncOrchestrationService,
  ) {}

  async Execute(command: SincronizarIntegracaoCommand): Promise<SyncResultDto | ApplicationError> {
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
      const recordsProcessed = await this.executarSincronizacao(command);

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
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido";

      syncLog.fail([errorMessage], "Falha na sincronização");
      config.markError(errorMessage);
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

  private async executarSincronizacao(command: SincronizarIntegracaoCommand): Promise<number> {
    const config = await this.integrationRepo.findById(command.integrationId);
    if (!config) throw new Error("Configuração não encontrada");

    const provider = config.provider;
    let recordsProcessed = 0;

    switch (provider) {
      case "BRAPI":
      case "YAHOO_FINANCE": {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        try {
          const url = provider === "BRAPI"
            ? "https://brapi.dev/api/quote/list"
            : "https://query1.finance.yahoo.com/v8/finance/chart/PETR4.SA";

          const response = await fetch(url, {
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
          });

          if (!response.ok) {
            throw new ConnectionFailedError(
              command.integrationId,
              `HTTP ${response.status}: ${response.statusText}`,
            );
          }

          const data = await response.json();
          recordsProcessed = data?.stocks?.length ?? data?.chart?.result?.length ?? 0;
        } catch (err) {
          if (err instanceof DOMException && err.name === "AbortError") {
            throw new ConnectionFailedError(command.integrationId, "Timeout após 10s");
          }
          if (err instanceof ConnectionFailedError) throw err;
          throw new ConnectionFailedError(
            command.integrationId,
            err instanceof Error ? err.message : "Falha na conexão",
          );
        } finally {
          clearTimeout(timeout);
        }
        break;
      }

      case "CUSTOM":
      case "BANCO_INTER":
      case "XP_INVESTIMENTOS":
        throw new ConnectionFailedError(
          command.integrationId,
          `Conector para ${provider} não implementado. Configure via API pública ou importação manual.`,
        );

      default:
        throw new ConnectionFailedError(
          command.integrationId,
          `Provedor não suportado: ${provider}`,
        );
    }

    return recordsProcessed;
  }
}
