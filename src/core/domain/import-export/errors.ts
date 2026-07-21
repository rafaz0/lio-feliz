import { DomainError } from "../errors";

export class InvalidImportOperationError extends DomainError {
  constructor(message = "Operação de importação inválida") {
    super("INVALID_IMPORT_OPERATION", message);
  }
}

export class InvalidImportFormatError extends DomainError {
  constructor(message = "Formato de importação não suportado") {
    super("INVALID_IMPORT_FORMAT", message);
  }
}

export class ImportSourceError extends DomainError {
  constructor(message = "Fonte de importação inválida") {
    super("IMPORT_SOURCE_ERROR", message);
  }
}

export class ImportValidationError extends DomainError {
  constructor(field: string, message: string) {
    super("IMPORT_VALIDATION_ERROR", `${field}: ${message}`);
  }
}
