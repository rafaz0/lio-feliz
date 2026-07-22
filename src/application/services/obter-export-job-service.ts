import type { ObterExportJobQuery } from "@/application/queries/obter-export-job";
import type { ExportJobDto } from "@/application/dtos/exportacao-avancada";
import type { IApplicationService } from "@/application/application-service";
import type { IExportTemplateRepository } from "@/application/ports/export-template-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterExportJobService
  implements IApplicationService<ObterExportJobQuery, ExportJobDto>
{
  constructor(private readonly exportRepo: IExportTemplateRepository) {}

  async Execute(query: ObterExportJobQuery): Promise<ExportJobDto | ApplicationError> {
    const job = await this.exportRepo.findJobById(query.jobId);
    if (!job) return new NotFoundError("ExportJob", query.jobId);

    return {
      id: job.id.value,
      templateId: job.templateId,
      portfolioId: job.portfolioId,
      status: job.status,
      fileUrl: job.fileUrl,
      checksum: job.checksum,
      sizeBytes: job.sizeBytes,
      error: job.error,
      requestedAt: job.requestedAt.toISOString(),
      completedAt: job.completedAt?.toISOString(),
    };
  }
}
