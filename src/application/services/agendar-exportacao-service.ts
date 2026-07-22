import type { AgendarExportacaoCommand } from "@/application/commands/agendar-exportacao";
import type { ExportJobDto } from "@/application/dtos/exportacao-avancada";
import type { IApplicationService } from "@/application/application-service";
import type { IExportTemplateRepository } from "@/application/ports/export-template-repository";
import type { IReportRepository } from "@/application/ports/report-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class AgendarExportacaoService
  implements IApplicationService<AgendarExportacaoCommand, ExportJobDto>
{
  constructor(
    private readonly exportRepo: IExportTemplateRepository,
    private readonly reportRepo: IReportRepository,
  ) {}

  async Execute(command: AgendarExportacaoCommand): Promise<ExportJobDto | ApplicationError> {
    const template = await this.exportRepo.findTemplateById(command.templateId);
    if (!template) {
      return new NotFoundError("ExportTemplate", command.templateId);
    }

    const schedule = await this.reportRepo.findScheduleById(command.templateId);

    if (schedule) {
      const updated = schedule;
      await this.reportRepo.saveSchedule(updated);
    }

    return {
      id: `scheduled-${command.templateId}`,
      templateId: command.templateId,
      portfolioId: command.portfolioId,
      status: "PENDING",
      requestedAt: new Date().toISOString(),
    };
  }
}
