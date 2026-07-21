import type { ExportarRelatorioCommand } from "@/application/commands/exportar-relatorio";
import type { ExportJobDto } from "@/application/dtos/importacao";
import type { IApplicationService } from "@/application/application-service";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ExportarRelatorioService implements IApplicationService<ExportarRelatorioCommand, ExportJobDto> {
  constructor(
    private readonly projectionRepo: IProjectionRepository,
  ) {}

  async Execute(command: ExportarRelatorioCommand): Promise<ExportJobDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const projections = await this.projectionRepo.ObterProjecoes(command.portfolioId);
    if (!projections) {
      return new ValidationError("PROJECTION_NOT_FOUND", "Projeções não encontradas para o portfólio");
    }

    const exportId = `export_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    return {
      id: exportId,
      templateId: command.templateId,
      formato: command.formato,
      status: "COMPLETED",
      fileName: `relatorio_${command.templateId}_${Date.now()}.${command.formato.toLowerCase()}`,
      fileUrl: `/api/exports/${exportId}/download`,
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };
  }

  private validar(command: ExportarRelatorioCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.portfolioId) errors.portfolioId = ["Campo obrigatório"];
    if (!command.formato) errors.formato = ["Formato é obrigatório"];
    if (!command.templateId) errors.templateId = ["Template é obrigatório"];
    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}
