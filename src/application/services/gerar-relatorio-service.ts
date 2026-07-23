import type { GerarRelatorioCommand } from "@/application/commands/gerar-relatorio";
import type { ReportExecutionDto } from "@/application/dtos/relatorio";
import type { IApplicationService } from "@/application/application-service";
import type { IReportRepository } from "@/application/ports/report-repository";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { ReportRenderingService, ReportTemplateId } from "@/core/domain/reports";

export class GerarRelatorioService implements IApplicationService<
  GerarRelatorioCommand,
  ReportExecutionDto
> {
  private readonly renderingService = new ReportRenderingService();

  constructor(
    private readonly reportRepo: IReportRepository,
    private readonly projectionRepo: IProjectionRepository,
  ) {}

  async Execute(command: GerarRelatorioCommand): Promise<ReportExecutionDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const templateId = ReportTemplateId.create(command.templateId);
    const result = this.renderingService.createExecution(
      templateId,
      command.portfolioId,
      command.format,
      command.parameters,
    );

    if (result.isFailure) {
      return new ValidationError("DOMAIN_ERROR", result.error!.message);
    }

    const execution = result.value!.markProcessing();
    await this.reportRepo.saveExecution(execution);

    const template = this.renderingService.findTemplate(templateId);

    try {
      const fileUrl = `/api/reports/${execution.id.value}/download`;
      const completed = execution.markCompleted(fileUrl, 0);
      await this.reportRepo.saveExecution(completed);

      return {
        id: completed.id.value,
        templateId: completed.templateId.value,
        templateName: template?.name ?? command.templateId,
        portfolioId: completed.portfolioId,
        status: completed.status,
        format: completed.format,
        fileUrl: completed.fileUrl,
        requestedAt: completed.requestedAt.toISOString(),
        completedAt: completed.completedAt?.toISOString(),
        sizeBytes: completed.sizeBytes,
      };
    } catch (err) {
      const failed = execution.markFailed(
        err instanceof Error ? err.message : "Erro ao gerar relatório",
      );
      await this.reportRepo.saveExecution(failed);

      return {
        id: failed.id.value,
        templateId: failed.templateId.value,
        templateName: template?.name ?? command.templateId,
        portfolioId: failed.portfolioId,
        status: failed.status,
        format: failed.format,
        error: failed.error,
        requestedAt: failed.requestedAt.toISOString(),
        completedAt: failed.completedAt?.toISOString(),
      };
    }
  }

  private validar(command: GerarRelatorioCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.templateId) errors.templateId = ["Campo obrigatório"];
    if (!command.portfolioId) errors.portfolioId = ["Campo obrigatório"];
    if (!command.format) errors.format = ["Formato é obrigatório"];
    if (
      command.parameters?.startDate &&
      command.parameters?.endDate &&
      command.parameters.endDate < command.parameters.startDate
    ) {
      errors.parameters = ["Data final deve ser maior ou igual à data inicial"];
    }

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}
