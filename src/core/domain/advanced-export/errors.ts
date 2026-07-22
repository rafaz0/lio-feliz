import { DomainError } from "../errors";

export class ExportTemplateNotFoundError extends DomainError {
  constructor(templateId: string) {
    super("EXPORT_TEMPLATE_NOT_FOUND", `Template de exportacao "${templateId}" nao encontrado`);
  }
}

export class ExportJobNotFoundError extends DomainError {
  constructor(jobId: string) {
    super("EXPORT_JOB_NOT_FOUND", `Job de exportacao "${jobId}" nao encontrado`);
  }
}

export class InvalidFormatError extends DomainError {
  constructor(format: string) {
    super("INVALID_FORMAT", `Formato de exportacao invalido: "${format}"`);
  }
}

export class ExportFailedError extends DomainError {
  constructor(message: string) {
    super("EXPORT_FAILED", `Falha na exportacao: ${message}`);
  }
}

export class ChecksumMismatchError extends DomainError {
  constructor(expected: string, actual: string) {
    super("CHECKSUM_MISMATCH", `Checksum diverge: esperado ${expected}, obtido ${actual}`);
  }
}
