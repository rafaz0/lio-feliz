import { DomainError } from "../errors";

export interface ImportError {
  readonly line: number;
  readonly field: string;
  readonly message: string;
  readonly code?: string;
}

export type ImportSource =
  | "BRAPI"
  | "BANC00XXXX"
  | "XP_INVEST"
  | "YAHOO_BR"
  | "LOCAL"
  | "CSV"
  | "EXCEL"
  | "JSON";

export const IMPORT_SOURCES: ImportSource[] = [
  "BRAPI", "BANC00XXXX", "XP_INVEST", "YAHOO_BR", "LOCAL",
  "CSV", "EXCEL", "JSON",
];

export function isValidImportSource(value: string): value is ImportSource {
  return IMPORT_SOURCES.includes(value as ImportSource);
}

export const MAX_IMPORT_RECORDS = 5000;

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

export class ImportRecordLimitError extends DomainError {
  constructor(limit: number, actual: number) {
    super("IMPORT_RECORD_LIMIT", `Limite máximo de ${limit} registros excedido (${actual})`);
  }
}
