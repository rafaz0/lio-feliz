import { EntityId } from "../entity-id";

export class ExportTemplateId extends EntityId {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): ExportTemplateId {
    return new ExportTemplateId(value);
  }
  static generate(): ExportTemplateId {
    return new ExportTemplateId(`et-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class ExportJobId extends EntityId {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): ExportJobId {
    return new ExportJobId(value);
  }
  static generate(): ExportJobId {
    return new ExportJobId(`ej-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export type ExportFormatType = "PDF" | "CSV" | "JSON" | "XLSX";

export type ExportStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export type ExportFormatOptions = {
  pageSize?: "A4" | "Letter";
  orientation?: "portrait" | "landscape";
  includeLogo?: boolean;
};

export type ExportFormat = {
  type: ExportFormatType;
  options?: ExportFormatOptions;
};
