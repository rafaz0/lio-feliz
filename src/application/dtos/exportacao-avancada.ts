import type { ExportFormatType } from "@/core/domain/advanced-export";

export interface ExportTemplateDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly format: ExportFormatType;
  readonly version: string;
  readonly isBuiltIn: boolean;
}

export interface ExportJobDto {
  readonly id: string;
  readonly templateId: string;
  readonly portfolioId: string;
  readonly status: string;
  readonly fileUrl?: string;
  readonly checksum?: string;
  readonly sizeBytes?: number;
  readonly error?: string;
  readonly requestedAt: string;
  readonly completedAt?: string;
}

export interface ExportJobListDto {
  readonly jobs: ExportJobDto[];
  readonly total: number;
}
