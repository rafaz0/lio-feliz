import type { ReportExportFormat, ReportParameters } from "@/core/domain/reports";

export interface AgendarRelatorioCommand {
  readonly type: "AgendarRelatorioCommand";
  readonly templateId: string;
  readonly portfolioId: string;
  readonly cron: string;
  readonly format: ReportExportFormat;
  readonly parameters: ReportParameters;
  readonly recipientEmails: string[];
  readonly isActive: boolean;
}
