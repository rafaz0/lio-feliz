import { ValueObject } from "../value-object";
import { EntityId } from "../entity-id";

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
    private readonly _format: string,
    private readonly _source: string,
    private readonly _metadata: ImportJobMetadata,
    private _status: ImportJobStatus,
    private readonly _createdAt: Date,
    private _completedAt?: Date,
    private readonly _totalRecords: number,
    private _processedRecords: number = 0,
    private _errorRecords: number = 0,
    private readonly _errors: string[] = [],
  ) {
    super();
  }

  get id(): ImportJobId { return this._id; }
  get fileName(): string { return this._fileName; }
  get fileSize(): number { return this._fileSize; }
  get format(): string { return this._format; }
  get source(): string { return this._source; }
  get metadata(): ImportJobMetadata { return this._metadata; }
  get status(): ImportJobStatus { return this._status; }
  get createdAt(): Date { return this._createdAt; }
  get completedAt(): Date | undefined { return this._completedAt; }
  get totalRecords(): number { return this._totalRecords; }
  get processedRecords(): number { return this._processedRecords; }
  get errorRecords(): number { return this._errorRecords; }
  get errors(): string[] { return this._errors; }

  static create(props: {
    fileName: string;
    fileSize: number;
    format: string;
    source: string;
    metadata: ImportJobMetadata;
    totalRecords: number;
  }): ImportJob {
    return new ImportJob(
      ImportJobId.create(),
      props.fileName,
      props.fileSize,
      props.format,
      props.source,
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

  fail(errors: string[]): void {
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

  addError(error: string): void {
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
      errors: this._errors,
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
