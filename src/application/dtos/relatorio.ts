export interface ReportTemplateDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly supportedFormats: string[];
  readonly icon: string;
  readonly isBuiltIn: boolean;
}

export interface ReportExecutionDto {
  readonly id: string;
  readonly templateId: string;
  readonly templateName: string;
  readonly portfolioId: string;
  readonly status: string;
  readonly format: string;
  readonly fileUrl?: string;
  readonly error?: string;
  readonly requestedAt: string;
  readonly completedAt?: string;
  readonly sizeBytes?: number;
}

export interface ReportScheduleDto {
  readonly id: string;
  readonly templateId: string;
  readonly templateName: string;
  readonly portfolioId: string;
  readonly cron: string;
  readonly format: string;
  readonly isActive: boolean;
  readonly lastRun?: string;
  readonly nextRun?: string;
  readonly recipientEmails: string[];
}

export interface ReportTemplateListDto {
  readonly templates: ReportTemplateDto[];
}

export interface ReportExecutionDetailDto {
  readonly execution: ReportExecutionDto;
}

export interface ReportScheduleListDto {
  readonly schedules: ReportScheduleDto[];
}
