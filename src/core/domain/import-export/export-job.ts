import { ValueObject } from "../value-object";
import type { ImportFormat } from "./import-format";

export interface ExportJobMetadata {
  usuarioId: string;
  tipoRelatorio: string;
  filtros?: Record<string, any>;
}

export class ExportJob extends ValueObject<ExportJob> {
  private constructor(
    private readonly _id: string,
    private readonly _format: ImportFormat,
    private readonly _metadata: ExportJobMetadata,
    private _status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED",
    private readonly _createdAt: Date,
    private _completedAt?: Date,
    private readonly _fileName: string,
    private readonly _fileUrl?: string,
    private readonly _downloadUrl?: string,
  ) {}

  get id(): string {
    return this._id;
  }

  get format(): ImportFormat {
    return this._format;
  }

  get metadata(): ExportJobMetadata {
    return this._metadata;
  }

  get status(): "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" {
    return this._status;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get completedAt(): Date | undefined {
    return this._completedAt;
  }

  get fileName(): string {
    return this._fileName;
  }

  get fileUrl(): string | undefined {
    return this._fileUrl;
  }

  get downloadUrl(): string | undefined {
    return this._downloadUrl;
  }

  static create(props: {
    metadata: ExportJobMetadata;
    format: ImportFormat;
    fileName: string;
  }): ExportJob {
    const id = `export_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const createdAt = new Date();
    const status = "PENDING" as const;

    return new ExportJob(
      id,
      props.format,
      props.metadata,
      status,
      createdAt,
      undefined,
      props.fileName,
    );
  }

  complete(fileUrl: string, downloadUrl: string): void {
    this._status = "COMPLETED";
    this._completedAt = new Date();
    this._fileUrl = fileUrl;
    this._downloadUrl = downloadUrl;
  }

  fail(): void {
    this._status = "FAILED";
    this._completedAt = new Date();
  }

  inProgress(): void {
    this._status = "PROCESSING";
  }

  toJSON() {
    return {
      id: this._id,
      format: this._format,
      metadata: this._metadata,
      status: this._status,
      createdAt: this._createdAt.toISOString(),
      completedAt: this._completedAt?.toISOString(),
      fileName: this._fileName,
      fileUrl: this._fileUrl,
      downloadUrl: this._downloadUrl,
    };
  }

  static fromJSON(data: ReturnType<ExportJob["toJSON"]>): ExportJob {
    const instance = Object.create(ExportJob.prototype);
    instance['_id'] = data.id;
    instance['_format'] = data.format;
    instance['_metadata'] = data.metadata;
    instance['_status'] = data.status;
    instance['_createdAt'] = new Date(data.createdAt);
    instance['_completedAt'] = data.completedAt ? new Date(data.completedAt) : undefined;
    instance['_fileName'] = data.fileName;
    instance['_fileUrl'] = data.fileUrl;
    instance['_downloadUrl'] = data.downloadUrl;
    return instance;
  }
}
