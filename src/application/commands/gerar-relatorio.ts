import type { ReportExportFormat, ReportParameters } from "@/core/domain/reports";

export interface GerarRelatorioCommand {
  readonly type: "GerarRelatorioCommand";
  readonly templateId: string;
  readonly portfolioId: string;
  readonly format: ReportExportFormat;
  readonly parameters: ReportParameters;
}
