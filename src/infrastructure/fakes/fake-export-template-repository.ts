import type { IExportTemplateRepository } from "@/application/ports/export-template-repository";
import { ExportTemplate, ExportJob, ExportTemplateId, ExportJobId } from "@/core/domain/advanced-export";

export class FakeExportTemplateRepository implements IExportTemplateRepository {
  private templates = new Map<string, ExportTemplate>();
  private jobs = new Map<string, ExportJob>();

  async saveTemplate(template: ExportTemplate): Promise<void> { this.templates.set(template.id.value, template); }
  async findTemplateById(templateId: string): Promise<ExportTemplate | null> { return this.templates.get(templateId) ?? null; }
  async findAllTemplates(): Promise<ExportTemplate[]> { return Array.from(this.templates.values()); }

  async saveJob(job: ExportJob): Promise<void> { this.jobs.set(job.id.value, job); }
  async findJobById(jobId: string): Promise<ExportJob | null> { return this.jobs.get(jobId) ?? null; }
  async findJobsByPortfolio(portfolioId: string): Promise<ExportJob[]> {
    return Array.from(this.jobs.values()).filter((j) => j.portfolioId === portfolioId);
  }

  reset(): void { this.templates.clear(); this.jobs.clear(); }
}
