import type { SupabaseClient } from "@supabase/supabase-js";
import type { IReportRepository } from "@/application/ports/report-repository";
import { ReportExecution, ReportExecutionId, ReportSchedule, ReportScheduleId, ReportTemplate, ReportTemplateId, BUILT_IN_TEMPLATES } from "@/core/domain/reports";
import type { ReportParameters, ReportStatus, ReportExportFormat } from "@/core/domain/reports";

interface SerializedExecution {
  id: string;
  templateId: string;
  portfolioId: string;
  status: string;
  format: string;
  parameters: ReportParameters;
  fileUrl?: string;
  error?: string;
  requestedAt: string;
  completedAt?: string;
  sizeBytes?: number;
}

interface SerializedSchedule {
  id: string;
  templateId: string;
  portfolioId: string;
  cron: string;
  format: string;
  parameters: ReportParameters;
  recipientEmails: string[];
  isActive: boolean;
  lastRun?: string;
  nextRun?: string;
}

export class SupabaseReportRepository implements IReportRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async saveExecution(execution: ReportExecution): Promise<void> {
    const serialized = this.serializeExecution(execution);
    const { error } = await this.supabase.from("report_executions").upsert(
      { id: execution.id.value, dados: serialized, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar execução de relatório: ${error.message}`);
  }

  async findExecutionById(executionId: string): Promise<ReportExecution | null> {
    const { data, error } = await this.supabase
      .from("report_executions")
      .select("dados")
      .eq("id", executionId)
      .single();
    if (error || !data) return null;
    return this.deserializeExecution(data.dados as unknown as SerializedExecution);
  }

  async findExecutionsByPortfolio(portfolioId: string): Promise<ReportExecution[]> {
    const { data, error } = await this.supabase
      .from("report_executions")
      .select("dados")
      .eq("dados->>portfolioId", portfolioId)
      .order("dados->>requestedAt", { ascending: false });
    if (error || !data) return [];
    return data.map((row) => this.deserializeExecution(row.dados as unknown as SerializedExecution));
  }

  async saveSchedule(schedule: ReportSchedule): Promise<void> {
    const serialized = this.serializeSchedule(schedule);
    const { error } = await this.supabase.from("report_schedules").upsert(
      { id: schedule.id.value, dados: serialized, updated_at: new Date().toISOString() },
      { onConflict: "id" },
    );
    if (error) throw new Error(`Falha ao salvar agendamento: ${error.message}`);
  }

  async findScheduleById(scheduleId: string): Promise<ReportSchedule | null> {
    const { data, error } = await this.supabase
      .from("report_schedules")
      .select("dados")
      .eq("id", scheduleId)
      .single();
    if (error || !data) return null;
    return this.deserializeSchedule(data.dados as unknown as SerializedSchedule);
  }

  async findSchedulesByPortfolio(portfolioId: string): Promise<ReportSchedule[]> {
    const { data, error } = await this.supabase
      .from("report_schedules")
      .select("dados")
      .eq("dados->>portfolioId", portfolioId);
    if (error || !data) return [];
    return data.map((row) => this.deserializeSchedule(row.dados as unknown as SerializedSchedule));
  }

  async findActiveSchedules(): Promise<ReportSchedule[]> {
    const { data, error } = await this.supabase
      .from("report_schedules")
      .select("dados")
      .eq("dados->>isActive", true);
    if (error || !data) return [];
    return data.map((row) => this.deserializeSchedule(row.dados as unknown as SerializedSchedule));
  }

  async deleteSchedule(scheduleId: string): Promise<void> {
    const { error } = await this.supabase.from("report_schedules").delete().eq("id", scheduleId);
    if (error) throw new Error(`Falha ao excluir agendamento: ${error.message}`);
  }

  async findTemplateById(templateId: string): Promise<ReportTemplate | null> {
    const props = BUILT_IN_TEMPLATES.find((t) => t.id.value === templateId);
    return props ? ReportTemplate.create(props) : null;
  }

  async findAllTemplates(): Promise<ReportTemplate[]> {
    return BUILT_IN_TEMPLATES.map((p) => ReportTemplate.create(p));
  }

  private serializeExecution(execution: ReportExecution): SerializedExecution {
    return {
      id: execution.id.value,
      templateId: execution.templateId.value,
      portfolioId: execution.portfolioId,
      status: execution.status,
      format: execution.format,
      parameters: execution.parameters,
      fileUrl: execution.fileUrl,
      error: execution.error,
      requestedAt: execution.requestedAt.toISOString(),
      completedAt: execution.completedAt?.toISOString(),
      sizeBytes: execution.sizeBytes,
    };
  }

  private deserializeExecution(data: SerializedExecution): ReportExecution {
    return ReportExecution.create({
      id: ReportExecutionId.create(data.id),
      templateId: ReportTemplateId.create(data.templateId),
      portfolioId: data.portfolioId,
      status: data.status as ReportStatus,
      format: data.format as ReportExportFormat,
      parameters: data.parameters,
      fileUrl: data.fileUrl,
      error: data.error,
      requestedAt: new Date(data.requestedAt),
      completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
      sizeBytes: data.sizeBytes,
    });
  }

  private serializeSchedule(schedule: ReportSchedule): SerializedSchedule {
    return {
      id: schedule.id.value,
      templateId: schedule.templateId.value,
      portfolioId: schedule.portfolioId,
      cron: schedule.cron,
      format: schedule.format,
      parameters: schedule.parameters,
      recipientEmails: schedule.recipientEmails,
      isActive: schedule.isActive,
      lastRun: schedule.lastRun?.toISOString(),
      nextRun: schedule.nextRun?.toISOString(),
    };
  }

  private deserializeSchedule(data: SerializedSchedule): ReportSchedule {
    return ReportSchedule.create({
      id: ReportScheduleId.create(data.id),
      templateId: ReportTemplateId.create(data.templateId),
      portfolioId: data.portfolioId,
      cron: data.cron,
      format: data.format as ReportExportFormat,
      parameters: data.parameters,
      recipientEmails: data.recipientEmails,
      isActive: data.isActive,
      lastRun: data.lastRun ? new Date(data.lastRun) : undefined,
      nextRun: data.nextRun ? new Date(data.nextRun) : undefined,
    });
  }
}
