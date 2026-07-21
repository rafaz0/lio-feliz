import type { ObterRelatorioExecutadoQuery } from "@/application/queries/obter-relatorio-executado";
import type { ReportExecutionDetailDto } from "@/application/dtos/relatorio";
import type { IApplicationService } from "@/application/application-service";
import type { IReportRepository } from "@/application/ports/report-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { ReportRenderingService } from "@/core/domain/reports";

export class ObterRelatorioExecutadoService
  implements IApplicationService<ObterRelatorioExecutadoQuery, ReportExecutionDetailDto>
{
  private readonly renderingService = new ReportRenderingService();

  constructor(private readonly reportRepo: IReportRepository) {}

  async Execute(query: ObterRelatorioExecutadoQuery): Promise<ReportExecutionDetailDto | ApplicationError> {
    const execution = await this.reportRepo.findExecutionById(query.executionId);
    if (!execution) {
      return new NotFoundError("ReportExecution", query.executionId);
    }

    const template = this.renderingService.findTemplate(execution.templateId);

    return {
      execution: {
        id: execution.id.value,
        templateId: execution.templateId.value,
        templateName: template?.name ?? execution.templateId.value,
        portfolioId: execution.portfolioId,
        status: execution.status,
        format: execution.format,
        fileUrl: execution.fileUrl,
        error: execution.error,
        requestedAt: execution.requestedAt.toISOString(),
        completedAt: execution.completedAt?.toISOString(),
        sizeBytes: execution.sizeBytes,
      },
    };
  }
}
