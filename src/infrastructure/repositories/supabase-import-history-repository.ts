import type { IImportHistoryRepository } from "@/application/ports/import-history-repository";
import { ImportJob, ImportJobId } from "@/core/domain/import-export";

export class SupabaseImportHistoryRepository implements IImportHistoryRepository {
  constructor(private readonly supabase: any) {}

  async save(job: ImportJob): Promise<void> {
    const { error } = await this.supabase.from("import_jobs").insert(job.toJSON());
    if (error) throw new Error(`Erro ao salvar import job: ${error.message}`);
  }

  async findById(jobId: string): Promise<ImportJob | null> {
    const { data, error } = await this.supabase
      .from("import_jobs")
      .select("*")
      .eq("id", jobId)
      .single();
    if (error || !data) return null;
    return ImportJob.fromJSON(data);
  }

  async findAll(): Promise<ImportJob[]> {
    const { data, error } = await this.supabase
      .from("import_jobs")
      .select("*")
      .order("createdAt", { ascending: false });
    if (error) return [];
    return data.map((d: any) => ImportJob.fromJSON(d));
  }

  async update(job: ImportJob): Promise<void> {
    const { error } = await this.supabase
      .from("import_jobs")
      .update(job.toJSON())
      .eq("id", job.id.value);
    if (error) throw new Error(`Erro ao atualizar import job: ${error.message}`);
  }

  async delete(jobId: string): Promise<void> {
    const { error } = await this.supabase.from("import_jobs").delete().eq("id", jobId);
    if (error) throw new Error(`Erro ao deletar import job: ${error.message}`);
  }

  async findByStatus(status: string): Promise<ImportJob[]> {
    const { data, error } = await this.supabase
      .from("import_jobs")
      .select("*")
      .eq("status", status);
    if (error) return [];
    return data.map((d: any) => ImportJob.fromJSON(d));
  }

  async findByUserId(userId: string): Promise<ImportJob[]> {
    const { data, error } = await this.supabase
      .from("import_jobs")
      .select("*")
      .eq("metadata->>usuarioId", userId)
      .order("createdAt", { ascending: false });
    if (error) return [];
    return data.map((d: any) => ImportJob.fromJSON(d));
  }
}
