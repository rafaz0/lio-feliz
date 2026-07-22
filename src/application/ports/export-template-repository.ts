import type { ExportTemplate, ExportJob } from "@/core/domain/advanced-export";

export interface IExportTemplateRepository {
  saveTemplate(template: ExportTemplate): Promise<void>;
  findTemplateById(templateId: string): Promise<ExportTemplate | null>;
  findAllTemplates(): Promise<ExportTemplate[]>;

  saveJob(job: ExportJob): Promise<void>;
  findJobById(jobId: string): Promise<ExportJob | null>;
  findJobsByPortfolio(portfolioId: string): Promise<ExportJob[]>;
}
