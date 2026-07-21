import { Result } from "../result";
import { ReportTemplate, BUILT_IN_TEMPLATES, type ReportExportFormat, type ReportTemplateId } from "./report-template";
import { ReportExecution, ReportExecutionId, type ReportParameters } from "./report-execution";
import { InvalidReportFormatError, InvalidReportTemplateError, ReportFileTooLargeError } from "./errors";

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;

export class ReportRenderingService {
  getBuiltInTemplates(): ReportTemplate[] {
    return BUILT_IN_TEMPLATES.map((props) => ReportTemplate.create(props));
  }

  findTemplate(templateId: ReportTemplateId): ReportTemplate | null {
    const props = BUILT_IN_TEMPLATES.find((t) => t.id.value === templateId.value);
    return props ? ReportTemplate.create(props) : null;
  }

  createExecution(
    templateId: ReportTemplateId,
    portfolioId: string,
    format: ReportExportFormat,
    parameters: ReportParameters,
  ): Result<ReportExecution> {
    const template = this.findTemplate(templateId);
    if (!template) {
      return Result.fail(new InvalidReportTemplateError(`Template "${templateId.value}" nao encontrado`));
    }

    if (!template.supportsFormat(format)) {
      return Result.fail(
        new InvalidReportFormatError(`Formato "${format}" nao suportado pelo template "${template.name}"`),
      );
    }

    const execution = ReportExecution.create({
      id: ReportExecutionId.generate(),
      templateId,
      portfolioId,
      status: "PENDING",
      format,
      parameters,
      requestedAt: new Date(),
    });

    return Result.ok(execution);
  }

  validateFileSize(sizeBytes: number): Result<void> {
    if (sizeBytes > MAX_FILE_SIZE_BYTES) {
      return Result.fail(new ReportFileTooLargeError(sizeBytes));
    }
    return Result.ok(undefined as unknown as void);
  }
}
