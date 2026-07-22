import type { SupabaseClient } from "@supabase/supabase-js";
import type { IExportTemplateRepository } from "@/application/ports/export-template-repository";
import {
  ExportTemplate, ExportJob, ExportTemplateId, ExportJobId,
  type ExportFormatType, type ExportStatus,
} from "@/core/domain/advanced-export";

interface SerializedTemplate {
  id: string; name: string; description: string; format: string;
  version: string; schema: Record<string, unknown>; isBuiltIn: boolean;
}

interface SerializedJob {
  id: string; templateId: string; portfolioId: string;
  parameters: Record<string, unknown>; status: string;
  fileUrl?: string; checksum?: string; sizeBytes?: number;
  error?: string; requestedAt: string; completedAt?: string;
}

export class SupabaseExportTemplateRepository implements IExportTemplateRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async saveTemplate(template: ExportTemplate): Promise<void> {
    const s: SerializedTemplate = {
      id: template.id.value, name: template.name, description: template.description,
      format: template.format, version: template.version, schema: template.schema,
      isBuiltIn: template.isBuiltIn,
    };
    const { error } = await this.supabase.from("export_templates").upsert(
      { id: template.id.value, dados: s, updated_at: new Date().toISOString() }, { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar template: ${error.message}`);
  }

  async findTemplateById(templateId: string): Promise<ExportTemplate | null> {
    const { data, error } = await this.supabase.from("export_templates").select("dados").eq("id", templateId).single();
    if (error || !data) return null;
    return this.deserializeTemplate(data.dados as SerializedTemplate);
  }

  async findAllTemplates(): Promise<ExportTemplate[]> {
    const { data, error } = await this.supabase.from("export_templates").select("dados");
    if (error || !data) return [];
    return data.map((d: { dados: SerializedTemplate }) => this.deserializeTemplate(d.dados));
  }

  async saveJob(job: ExportJob): Promise<void> {
    const s: SerializedJob = {
      id: job.id.value, templateId: job.templateId, portfolioId: job.portfolioId,
      parameters: job.parameters, status: job.status, fileUrl: job.fileUrl,
      checksum: job.checksum, sizeBytes: job.sizeBytes, error: job.error,
      requestedAt: job.requestedAt.toISOString(), completedAt: job.completedAt?.toISOString(),
    };
    const { error } = await this.supabase.from("export_jobs").upsert(
      { id: job.id.value, dados: s, updated_at: new Date().toISOString() }, { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar job: ${error.message}`);
  }

  async findJobById(jobId: string): Promise<ExportJob | null> {
    const { data, error } = await this.supabase.from("export_jobs").select("dados").eq("id", jobId).single();
    if (error || !data) return null;
    return this.deserializeJob(data.dados as SerializedJob);
  }

  async findJobsByPortfolio(portfolioId: string): Promise<ExportJob[]> {
    const { data, error } = await this.supabase.from("export_jobs").select("dados");
    if (error || !data) return [];
    return data.map((d: { dados: SerializedJob }) => d.dados)
      .filter((j: SerializedJob) => j.portfolioId === portfolioId)
      .map((j: SerializedJob) => this.deserializeJob(j));
  }

  private deserializeTemplate(s: SerializedTemplate): ExportTemplate {
    return ExportTemplate.create({
      id: ExportTemplateId.create(s.id), name: s.name, description: s.description,
      format: s.format as ExportFormatType, version: s.version,
      schema: s.schema, isBuiltIn: s.isBuiltIn,
    });
  }

  private deserializeJob(s: SerializedJob): ExportJob {
    return ExportJob.create({
      id: ExportJobId.create(s.id), templateId: s.templateId, portfolioId: s.portfolioId,
      parameters: s.parameters, status: s.status as ExportStatus,
      fileUrl: s.fileUrl, checksum: s.checksum, sizeBytes: s.sizeBytes,
      error: s.error, requestedAt: new Date(s.requestedAt),
      completedAt: s.completedAt ? new Date(s.completedAt) : undefined,
    });
  }
}
