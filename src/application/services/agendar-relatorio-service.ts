import type { AgendarRelatorioCommand } from "@/application/commands/agendar-relatorio";
import type { ReportScheduleDto } from "@/application/dtos/relatorio";
import type { IApplicationService } from "@/application/application-service";
import type { IReportRepository } from "@/application/ports/report-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import {
  ReportSchedule,
  ReportScheduleId,
  ReportTemplateId,
  ReportRenderingService,
} from "@/core/domain/reports";

const CRON_REGEX = /^(\S+\s){4}\S+$/;

export class AgendarRelatorioService implements IApplicationService<
  AgendarRelatorioCommand,
  ReportScheduleDto
> {
  private readonly renderingService = new ReportRenderingService();

  constructor(private readonly reportRepo: IReportRepository) {}

  async Execute(command: AgendarRelatorioCommand): Promise<ReportScheduleDto | ApplicationError> {
    const validationError = this.validar(command);
    if (validationError) return validationError;

    const templateId = ReportTemplateId.create(command.templateId);
    const template = this.renderingService.findTemplate(templateId);
    if (!template) {
      return new ValidationError("DOMAIN_ERROR", "Template de relatório não encontrado");
    }

    if (!template.supportsFormat(command.format)) {
      return new ValidationError(
        "DOMAIN_ERROR",
        `Formato "${command.format}" não é suportado pelo template "${template.name}"`,
      );
    }

    const schedule = ReportSchedule.create({
      id: ReportScheduleId.generate(),
      templateId,
      portfolioId: command.portfolioId,
      cron: command.cron,
      format: command.format,
      parameters: command.parameters,
      recipientEmails: command.recipientEmails,
      isActive: command.isActive,
    });

    await this.reportRepo.saveSchedule(schedule);

    return {
      id: schedule.id.value,
      templateId: schedule.templateId.value,
      templateName: template.name,
      portfolioId: schedule.portfolioId,
      cron: schedule.cron,
      format: schedule.format,
      isActive: schedule.isActive,
      lastRun: schedule.lastRun?.toISOString(),
      nextRun: schedule.nextRun?.toISOString(),
      recipientEmails: schedule.recipientEmails,
    };
  }

  private validar(command: AgendarRelatorioCommand): ValidationError | null {
    const errors: Record<string, string[]> = {};
    if (!command.templateId) errors.templateId = ["Campo obrigatório"];
    if (!command.portfolioId) errors.portfolioId = ["Campo obrigatório"];
    if (!command.cron) errors.cron = ["Expressão cron é obrigatória"];
    else if (!CRON_REGEX.test(command.cron.trim())) errors.cron = ["Expressão cron inválida"];

    if (!command.format) errors.format = ["Formato é obrigatório"];

    return Object.keys(errors).length > 0
      ? new ValidationError("VALID_ERROR", "Dados de entrada inválidos", errors)
      : null;
  }
}
