import { ValueObject } from "../value-object";
import { EntityId } from "../entity-id";
import type { ImportFormat } from "./import-format";
import type { ImportSource, ImportError } from "./errors";
import { isValidImportSource, MAX_IMPORT_RECORDS, ImportRecordLimitError, ImportSourceError, InvalidImportFormatError } from "./errors";
import { isValidImportFormat } from "./import-format";

export class ImportJobId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value?: string): ImportJobId {
    return new ImportJobId(value ?? `import_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }

  static fromString(value: string): ImportJobId {
    return new ImportJobId(value);
  }
}

export type ImportJobStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export interface ImportJobMetadata {
  usuarioId: string;
  fonte?: string;
  observacoes?: string;
}

export class ImportJob extends ValueObject<ImportJob> {
  private constructor(
    private readonly _id: ImportJobId,
    private readonly _fileName: string,
    private readonly _fileSize: number,
    private readonly _format: ImportFormat,
    private readonly _source: ImportSource,
    private readonly _metadata: ImportJobMetadata,
    private _status: ImportJobStatus,
    private readonly _createdAt: Date,
    private _completedAt: Date | undefined = undefined,
    private readonly _totalRecords: number,
    private _processedRecords: number = 0,
    private _errorRecords: number = 0,
    private readonly _errors: ImportError[] = [],
  ) {
    super();
  }

  get id(): ImportJobId { return this._id; }
  get fileName(): string { return this._fileName; }
  get fileSize(): number { return this._fileSize; }
  get format(): ImportFormat { return this._format; }
  get source(): ImportSource { return this._source; }
  get metadata(): ImportJobMetadata { return this._metadata; }
  get status(): ImportJobStatus { return this._status; }
  get createdAt(): Date { return this._createdAt; }
  get completedAt(): Date | undefined { return this._completedAt; }
  get totalRecords(): number { return this._totalRecords; }
  get processedRecords(): number { return this._processedRecords; }
  get errorRecords(): number { return this._errorRecords; }
  get errors(): ImportError[] { return [...this._errors]; }

  static create(props: {
    fileName: string;
    fileSize: number;
    format: ImportFormat;
    source: ImportSource;
    metadata: ImportJobMetadata;
    totalRecords: number;
  }): ImportJob {
    if (!isValidImportSource(props.source)) {
      throw new ImportSourceError(`Fonte inválida: ${props.source}`);
    }
    if (!isValidImportFormat(props.format)) {
      throw new InvalidImportFormatError(`Formato inválido: ${props.format}`);
    }
    if (props.totalRecords > MAX_IMPORT_RECORDS) {
      throw new ImportRecordLimitError(MAX_IMPORT_RECORDS, props.totalRecords);
    }

    return new ImportJob(
      ImportJobId.create(),
      props.fileName,
      props.fileSize,
      props.format as ImportFormat,
      props.source as ImportSource,
      props.metadata,
      "PENDING",
      new Date(),
      undefined,
      props.totalRecords,
    );
  }

  startProcessing(): void {
    this._status = "PROCESSING";
  }

  complete(): void {
    this._status = "COMPLETED";
    this._completedAt = new Date();
  }

  fail(errors: ImportError[]): void {
    this._status = "FAILED";
    this._completedAt = new Date();
    this._errors.push(...errors);
    this._errorRecords = this._errors.length;
  }

  addSuccess(recordsProcessed: number): void {
    this._processedRecords += recordsProcessed;
    if (this._processedRecords >= this._totalRecords) {
      this.complete();
    }
  }

  addError(error: ImportError): void {
    this._errors.push(error);
    this._errorRecords = this._errors.length;
  }

  toJSON() {
    return {
      id: this._id.value,
      fileName: this._fileName,
      fileSize: this._fileSize,
      format: this._format,
      source: this._source,
      metadata: this._metadata,
      status: this._status,
      createdAt: this._createdAt.toISOString(),
      completedAt: this._completedAt?.toISOString(),
      totalRecords: this._totalRecords,
      processedRecords: this._processedRecords,
      errorRecords: this._errorRecords,
      errors: [...this._errors],
    };
  }

  static fromJSON(data: ReturnType<ImportJob["toJSON"]>): ImportJob {
    const instance = Object.create(ImportJob.prototype);
    instance._id = ImportJobId.fromString(data.id);
    instance._fileName = data.fileName;
    instance._fileSize = data.fileSize;
    instance._format = data.format;
    instance._source = data.source;
    instance._metadata = data.metadata;
    instance._status = data.status;
    instance._createdAt = new Date(data.createdAt);
    instance._completedAt = data.completedAt ? new Date(data.completedAt) : undefined;
    instance._totalRecords = data.totalRecords;
    instance._processedRecords = data.processedRecords;
    instance._errorRecords = data.errorRecords;
    instance._errors = [...data.errors];
    return instance;
  }
}
