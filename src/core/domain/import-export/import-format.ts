export type ImportFormat = "EXCEL" | "CSV" | "JSON";

export const IMPORT_FORMATS: ImportFormat[] = ["EXCEL", "CSV", "JSON"];

export function isValidImportFormat(value: string): value is ImportFormat {
  return IMPORT_FORMATS.includes(value as ImportFormat);
}
