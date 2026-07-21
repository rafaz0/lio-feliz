import type { ReportExecution, ReportSchedule, ReportTemplate } from "@/core/domain/reports";

export interface IReportRepository {
  saveExecution(execution: ReportExecution): Promise<void>;
  findExecutionById(executionId: string): Promise<ReportExecution | null>;
  findExecutionsByPortfolio(portfolioId: string): Promise<ReportExecution[]>;

  saveSchedule(schedule: ReportSchedule): Promise<void>;
  findScheduleById(scheduleId: string): Promise<ReportSchedule | null>;
  findSchedulesByPortfolio(portfolioId: string): Promise<ReportSchedule[]>;
  findActiveSchedules(): Promise<ReportSchedule[]>;
  deleteSchedule(scheduleId: string): Promise<void>;

  findTemplateById(templateId: string): Promise<ReportTemplate | null>;
  findAllTemplates(): Promise<ReportTemplate[]>;
}
