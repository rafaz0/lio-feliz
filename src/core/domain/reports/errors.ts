import { DomainError } from "../errors";

export class InvalidReportTemplateError extends DomainError {
  constructor(message = "Template de relatório inválido") {
    super("INVALID_REPORT_TEMPLATE", message);
  }
}

export class InvalidReportFormatError extends DomainError {
  constructor(message = "Formato de relatório não suportado") {
    super("INVALID_REPORT_FORMAT", message);
  }
}

export class InvalidReportScheduleError extends DomainError {
  constructor(message = "Agendamento de relatório inválido") {
    super("INVALID_REPORT_SCHEDULE", message);
  }
}

export class ReportNotFoundError extends DomainError {
  constructor(reportId: string) {
    super("REPORT_NOT_FOUND", `Relatório "${reportId}" não encontrado`);
  }
}

export class ReportFileTooLargeError extends DomainError {
  constructor(sizeBytes: number) {
    super("REPORT_FILE_TOO_LARGE", `Relatório excede 50MB (${sizeBytes} bytes)`);
  }
}
