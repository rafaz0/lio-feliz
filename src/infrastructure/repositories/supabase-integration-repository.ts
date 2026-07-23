import type { IIntegrationRepository } from "@/application/ports/integration-repository";
import { IntegrationConfig, SyncLog } from "@/core/domain/integrations";

export class SupabaseIntegrationRepository implements IIntegrationRepository {
  constructor(private readonly supabase: any) {}

  async save(config: IntegrationConfig): Promise<void> {
    const { error } = await this.supabase.from("integrations").insert(config.toJSON());
    if (error) throw new Error(`Erro ao salvar integração: ${error.message}`);
  }

  async findById(id: string): Promise<IntegrationConfig | null> {
    const { data, error } = await this.supabase
      .from("integrations")
      .select("*")
      .eq("id", id)
      .single();
    if (error || !data) return null;
    return IntegrationConfig.fromJSON(data);
  }

  async findAll(): Promise<IntegrationConfig[]> {
    const { data, error } = await this.supabase
      .from("integrations")
      .select("*")
      .order("createdAt", { ascending: false });
    if (error) return [];
    return data.map((d: any) => IntegrationConfig.fromJSON(d));
  }

  async update(config: IntegrationConfig): Promise<void> {
    const { error } = await this.supabase
      .from("integrations")
      .update(config.toJSON())
      .eq("id", config.id.value);
    if (error) throw new Error(`Erro ao atualizar integração: ${error.message}`);
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from("integrations").delete().eq("id", id);
    if (error) throw new Error(`Erro ao deletar integração: ${error.message}`);
  }

  async saveSyncLog(log: SyncLog): Promise<void> {
    const { error } = await this.supabase.from("sync_logs").insert(log.toJSON());
    if (error) throw new Error(`Erro ao salvar sync log: ${error.message}`);
  }

  async findSyncLogsByIntegration(integrationId: string): Promise<SyncLog[]> {
    const { data, error } = await this.supabase
      .from("sync_logs")
      .select("*")
      .eq("integrationId", integrationId)
      .order("startedAt", { ascending: false });
    if (error) return [];
    return data.map((d: any) => SyncLog.fromJSON(d));
  }

  async findLatestSyncLog(integrationId: string): Promise<SyncLog | null> {
    const { data, error } = await this.supabase
      .from("sync_logs")
      .select("*")
      .eq("integrationId", integrationId)
      .order("startedAt", { ascending: false })
      .limit(1)
      .single();
    if (error || !data) return null;
    return SyncLog.fromJSON(data);
  }
}
