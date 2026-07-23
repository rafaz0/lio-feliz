import { ValueObject } from "../value-object";
import { ExportJobId, type ExportStatus } from "./export-types";

export type ExportJobProps = {
  id: ExportJobId;
  templateId: string;
  portfolioId: string;
  parameters: Record<string, unknown>;
  status: ExportStatus;
  fileUrl?: string;
  checksum?: string;
  sizeBytes?: number;
  error?: string;
  requestedAt: Date;
  completedAt?: Date;
};

export class ExportJob extends ValueObject<ExportJobProps> {
  private constructor(props: ExportJobProps) {
    super(props);
  }
  static create(props: ExportJobProps): ExportJob {
    return new ExportJob(props);
  }

  get id(): ExportJobId {
    return this.props.id;
  }
  get templateId(): string {
    return this.props.templateId;
  }
  get portfolioId(): string {
    return this.props.portfolioId;
  }
  get parameters(): Record<string, unknown> {
    return this.props.parameters;
  }
  get status(): ExportStatus {
    return this.props.status;
  }
  get fileUrl(): string | undefined {
    return this.props.fileUrl;
  }
  get checksum(): string | undefined {
    return this.props.checksum;
  }
  get sizeBytes(): number | undefined {
    return this.props.sizeBytes;
  }
  get error(): string | undefined {
    return this.props.error;
  }
  get requestedAt(): Date {
    return this.props.requestedAt;
  }
  get completedAt(): Date | undefined {
    return this.props.completedAt;
  }

  markProcessing(): ExportJob {
    return ExportJob.create({ ...this.props, status: "PROCESSING" });
  }

  markCompleted(fileUrl: string, checksum: string, sizeBytes: number): ExportJob {
    return ExportJob.create({
      ...this.props,
      status: "COMPLETED",
      fileUrl,
      checksum,
      sizeBytes,
      completedAt: new Date(),
    });
  }

  markFailed(error: string): ExportJob {
    return ExportJob.create({ ...this.props, status: "FAILED", error, completedAt: new Date() });
  }
}
