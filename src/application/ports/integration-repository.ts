import type { IntegrationConfig } from "@/core/domain/integrations";
import type { SyncLog } from "@/core/domain/integrations";

export interface IIntegrationRepository {
  save(config: IntegrationConfig): Promise<void>;
  findById(id: string): Promise<IntegrationConfig | null>;
  findAll(): Promise<IntegrationConfig[]>;
  update(config: IntegrationConfig): Promise<void>;
  delete(id: string): Promise<void>;

  saveSyncLog(log: SyncLog): Promise<void>;
  findSyncLogsByIntegration(integrationId: string): Promise<SyncLog[]>;
  findLatestSyncLog(integrationId: string): Promise<SyncLog | null>;
}
