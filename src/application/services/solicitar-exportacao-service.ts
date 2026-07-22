import type { SolicitarExportacaoCommand } from "@/application/commands/solicitar-exportacao";
import type { ExportJobDto } from "@/application/dtos/exportacao-avancada";
import type { IApplicationService } from "@/application/application-service";
import type { IExportTemplateRepository } from "@/application/ports/export-template-repository";
import { ValidationError, NotFoundError, InternalError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { ExportComposer } from "@/core/domain/advanced-export";

export class SolicitarExportacaoService
  implements IApplicationService<SolicitarExportacaoCommand, ExportJobDto>
{
  private readonly composer = new ExportComposer();

  constructor(private readonly exportRepo: IExportTemplateRepository) {}

  async Execute(command: SolicitarExportacaoCommand): Promise<ExportJobDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const template = await this.exportRepo.findTemplateById(command.templateId);
    if (!template) {
      return new NotFoundError("ExportTemplate", command.templateId);
    }

    const job = this.composer.createJob(template, command.portfolioId, command.parameters);
    await this.exportRepo.saveJob(job);

    const processing = job.markProcessing();
    await this.exportRepo.saveJob(processing);

    try {
      const result = this.composer.compose(template, command.parameters);
      if (result.isFailure) {
        const failed = processing.markFailed(result.error!.message);
        await this.exportRepo.saveJob(failed);
        return new InternalError("EXPORT_FAILED", result.error!.message);
      }

      const completed = processing.markCompleted(
        `/api/exports/${job.id.value}/download`,
        result.value!.checksum,
        result.value!.bytes.length,
      );
      await this.exportRepo.saveJob(completed);

      return {
        id: completed.id.value,
        templateId: completed.templateId,
        portfolioId: completed.portfolioId,
        status: completed.status,
        fileUrl: completed.fileUrl,
        checksum: completed.checksum,
        sizeBytes: completed.sizeBytes,
        requestedAt: completed.requestedAt.toISOString(),
        completedAt: completed.completedAt?.toISOString(),
      };
    } catch (err) {
      const failed = processing.markFailed(err instanceof Error ? err.message : "Erro inesperado");
      await this.exportRepo.saveJob(failed);
      return new InternalError("EXPORT_FAILED", err instanceof Error ? err.message : "Erro inesperado");
    }
  }

  private validar(command: SolicitarExportacaoCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.templateId) errors.templateId = ["Template obrigatorio"];
    if (!command.portfolioId) errors.portfolioId = ["Carteira obrigatoria"];
    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada invalidos", errors)
      : null;
  }
}
