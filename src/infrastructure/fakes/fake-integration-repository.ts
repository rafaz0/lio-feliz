import type { IIntegrationRepository } from "@/application/ports/integration-repository";
import { IntegrationConfig } from "@/core/domain/integrations";
import { SyncLog } from "@/core/domain/integrations";

export class FakeIntegrationRepository implements IIntegrationRepository {
  private configs: Map<string, IntegrationConfig> = new Map();
  private syncLogs: Map<string, SyncLog[]> = new Map();

  async save(config: IntegrationConfig): Promise<void> {
    this.configs.set(config.id.value, config);
  }

  async findById(id: string): Promise<IntegrationConfig | null> {
    return this.configs.get(id) || null;
  }

  async findAll(): Promise<IntegrationConfig[]> {
    return Array.from(this.configs.values());
  }

  async update(config: IntegrationConfig): Promise<void> {
    if (this.configs.has(config.id.value)) {
      this.configs.set(config.id.value, config);
    }
  }

  async delete(id: string): Promise<void> {
    this.configs.delete(id);
  }

  async saveSyncLog(log: SyncLog): Promise<void> {
    const existing = this.syncLogs.get(log.integrationId) || [];
    existing.push(log);
    this.syncLogs.set(log.integrationId, existing);
  }

  async findSyncLogsByIntegration(integrationId: string): Promise<SyncLog[]> {
    return this.syncLogs.get(integrationId) || [];
  }

  async findLatestSyncLog(integrationId: string): Promise<SyncLog | null> {
    const logs = this.syncLogs.get(integrationId) || [];
    if (logs.length === 0) return null;
    return logs.reduce((latest, current) =>
      current.startedAt > latest.startedAt ? current : latest,
    );
  }
}
