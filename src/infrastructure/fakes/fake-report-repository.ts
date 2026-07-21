import type { IReportRepository } from "@/application/ports/report-repository";
import { ReportExecution, ReportSchedule, ReportTemplate, BUILT_IN_TEMPLATES, ReportTemplateId } from "@/core/domain/reports";

export class FakeReportRepository implements IReportRepository {
  private executions = new Map<string, ReportExecution>();
  private schedules = new Map<string, ReportSchedule>();
  private templates: ReportTemplate[] = BUILT_IN_TEMPLATES.map((p) => ReportTemplate.create(p));

  async saveExecution(execution: ReportExecution): Promise<void> {
    this.executions.set(execution.id.value, execution);
  }

  async findExecutionById(executionId: string): Promise<ReportExecution | null> {
    return this.executions.get(executionId) ?? null;
  }

  async findExecutionsByPortfolio(portfolioId: string): Promise<ReportExecution[]> {
    return Array.from(this.executions.values()).filter((e) => e.portfolioId === portfolioId);
  }

  async saveSchedule(schedule: ReportSchedule): Promise<void> {
    this.schedules.set(schedule.id.value, schedule);
  }

  async findScheduleById(scheduleId: string): Promise<ReportSchedule | null> {
    return this.schedules.get(scheduleId) ?? null;
  }

  async findSchedulesByPortfolio(portfolioId: string): Promise<ReportSchedule[]> {
    return Array.from(this.schedules.values()).filter((s) => s.portfolioId === portfolioId);
  }

  async findActiveSchedules(): Promise<ReportSchedule[]> {
    return Array.from(this.schedules.values()).filter((s) => s.isActive);
  }

  async deleteSchedule(scheduleId: string): Promise<void> {
    this.schedules.delete(scheduleId);
  }

  async findTemplateById(templateId: string): Promise<ReportTemplate | null> {
    return this.templates.find((t) => t.id.value === templateId) ?? null;
  }

  async findAllTemplates(): Promise<ReportTemplate[]> {
    return this.templates;
  }

  reset(): void {
    this.executions.clear();
    this.schedules.clear();
    this.templates = BUILT_IN_TEMPLATES.map((p) => ReportTemplate.create(p));
  }
}
