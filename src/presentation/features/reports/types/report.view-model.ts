import type { ReportTemplateDto, ReportExecutionDto, ReportScheduleDto } from "@/application/dtos/relatorio";

export interface ReportTemplateCardViewModel {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly supportedFormats: string[];
  readonly icon: string;
  readonly isBuiltIn: boolean;
}

export interface ReportExecutionHistoryViewModel {
  readonly id: string;
  readonly templateName: string;
  readonly status: string;
  readonly format: string;
  readonly requestedAt: string;
  readonly completedAt?: string;
  readonly error?: string;
  readonly fileUrl?: string;
}

export interface ReportScheduleViewModel {
  readonly id: string;
  readonly templateName: string;
  readonly cron: string;
  readonly format: string;
  readonly isActive: boolean;
  readonly lastRun?: string;
  readonly nextRun?: string;
  readonly recipientEmails: string[];
}

export interface ReportsPageViewModel {
  readonly templates: ReportTemplateCardViewModel[];
  readonly recentExecutions: ReportExecutionHistoryViewModel[];
  readonly schedules: ReportScheduleViewModel[];
}

export function toTemplateCardViewModel(dto: ReportTemplateDto): ReportTemplateCardViewModel {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    category: dto.category,
    supportedFormats: dto.supportedFormats,
    icon: dto.icon,
    isBuiltIn: dto.isBuiltIn,
  };
}

export function toExecutionHistoryViewModel(dto: ReportExecutionDto): ReportExecutionHistoryViewModel {
  return {
    id: dto.id,
    templateName: dto.templateName,
    status: dto.status,
    format: dto.format,
    requestedAt: dto.requestedAt,
    completedAt: dto.completedAt,
    error: dto.error,
    fileUrl: dto.fileUrl,
  };
}

export function toScheduleViewModel(dto: ReportScheduleDto): ReportScheduleViewModel {
  return {
    id: dto.id,
    templateName: dto.templateName,
    cron: dto.cron,
    format: dto.format,
    isActive: dto.isActive,
    lastRun: dto.lastRun,
    nextRun: dto.nextRun,
    recipientEmails: dto.recipientEmails,
  };
}

export function toReportsPageViewModel(
  templates: ReportTemplateDto[],
  executions: ReportExecutionDto[],
  schedules: ReportScheduleDto[],
): ReportsPageViewModel {
  return {
    templates: templates.map(toTemplateCardViewModel),
    recentExecutions: executions.slice(0, 10).map(toExecutionHistoryViewModel),
    schedules: schedules.map(toScheduleViewModel),
  };
}
