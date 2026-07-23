import { ValueObject } from "../value-object";
import { EntityId } from "../entity-id";
import type { ReportExportFormat, ReportTemplateId } from "./report-template";

export class ReportExecutionId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): ReportExecutionId {
    return new ReportExecutionId(value);
  }

  static generate(): ReportExecutionId {
    return new ReportExecutionId(
      `exec-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    );
  }
}

export type ReportStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export type ReportParameters = {
  startDate?: Date;
  endDate?: Date;
  tickers?: string[];
  categories?: string[];
};

export type ReportExecutionProps = {
  id: ReportExecutionId;
  templateId: ReportTemplateId;
  portfolioId: string;
  status: ReportStatus;
  format: ReportExportFormat;
  parameters: ReportParameters;
  fileUrl?: string;
  error?: string;
  requestedAt: Date;
  completedAt?: Date;
  sizeBytes?: number;
};

export class ReportExecution extends ValueObject<ReportExecutionProps> {
  private constructor(props: ReportExecutionProps) {
    super(props);
  }

  static create(props: ReportExecutionProps): ReportExecution {
    return new ReportExecution(props);
  }

  get id(): ReportExecutionId {
    return this.props.id;
  }

  get templateId(): ReportTemplateId {
    return this.props.templateId;
  }

  get portfolioId(): string {
    return this.props.portfolioId;
  }

  get status(): ReportStatus {
    return this.props.status;
  }

  get format(): ReportExportFormat {
    return this.props.format;
  }

  get parameters(): ReportParameters {
    return this.props.parameters;
  }

  get fileUrl(): string | undefined {
    return this.props.fileUrl;
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

  get sizeBytes(): number | undefined {
    return this.props.sizeBytes;
  }

  markCompleted(fileUrl: string, sizeBytes: number): ReportExecution {
    return ReportExecution.create({
      ...this.props,
      status: "COMPLETED",
      fileUrl,
      sizeBytes,
      completedAt: new Date(),
    });
  }

  markFailed(error: string): ReportExecution {
    return ReportExecution.create({
      ...this.props,
      status: "FAILED",
      error,
      completedAt: new Date(),
    });
  }

  markProcessing(): ReportExecution {
    return ReportExecution.create({
      ...this.props,
      status: "PROCESSING",
    });
  }
}
