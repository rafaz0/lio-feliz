import { ValueObject } from "../value-object";
import { EntityId } from "../entity-id";
import type { ReportExportFormat, ReportTemplateId } from "./report-template";
import type { ReportParameters } from "./report-execution";

export class ReportScheduleId extends EntityId {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): ReportScheduleId {
    return new ReportScheduleId(value);
  }

  static generate(): ReportScheduleId {
    return new ReportScheduleId(`sched-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export type ReportScheduleProps = {
  id: ReportScheduleId;
  templateId: ReportTemplateId;
  portfolioId: string;
  cron: string;
  format: ReportExportFormat;
  parameters: ReportParameters;
  recipientEmails: string[];
  isActive: boolean;
  lastRun?: Date;
  nextRun?: Date;
};

export class ReportSchedule extends ValueObject<ReportScheduleProps> {
  private constructor(props: ReportScheduleProps) {
    super(props);
  }

  static create(props: ReportScheduleProps): ReportSchedule {
    return new ReportSchedule(props);
  }

  get id(): ReportScheduleId {
    return this.props.id;
  }

  get templateId(): ReportTemplateId {
    return this.props.templateId;
  }

  get portfolioId(): string {
    return this.props.portfolioId;
  }

  get cron(): string {
    return this.props.cron;
  }

  get format(): ReportExportFormat {
    return this.props.format;
  }

  get parameters(): ReportParameters {
    return this.props.parameters;
  }

  get recipientEmails(): string[] {
    return this.props.recipientEmails;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get lastRun(): Date | undefined {
    return this.props.lastRun;
  }

  get nextRun(): Date | undefined {
    return this.props.nextRun;
  }

  activate(): ReportSchedule {
    return ReportSchedule.create({ ...this.props, isActive: true });
  }

  deactivate(): ReportSchedule {
    return ReportSchedule.create({ ...this.props, isActive: false });
  }

  recordRun(nextRun: Date): ReportSchedule {
    return ReportSchedule.create({
      ...this.props,
      lastRun: new Date(),
      nextRun,
    });
  }
}
