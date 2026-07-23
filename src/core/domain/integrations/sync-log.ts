import { ValueObject } from "../value-object";
import { EntityId } from "../entity-id";

export class SyncLogId extends EntityId {
  private constructor(value: string) {
    super(value);
  }
  static create(value?: string): SyncLogId {
    return new SyncLogId(value ?? crypto.randomUUID());
  }
}

export type SyncStatus = "RUNNING" | "SUCCESS" | "PARTIAL" | "FAILED";
export type SyncType = "MANUAL" | "SCHEDULED" | "WEBHOOK";

export class SyncLog extends ValueObject<SyncLog> {
  private constructor(
    private readonly _id: SyncLogId,
    private readonly _integrationId: string,
    private readonly _type: SyncType,
    private _status: SyncStatus,
    private readonly _startedAt: Date,
    private _completedAt?: Date,
    private _recordsProcessed: number = 0,
    private _errors: string[] = [],
    private _message?: string,
  ) {
    super();
  }

  get id(): SyncLogId {
    return this._id;
  }
  get integrationId(): string {
    return this._integrationId;
  }
  get type(): SyncType {
    return this._type;
  }
  get status(): SyncStatus {
    return this._status;
  }
  get startedAt(): Date {
    return this._startedAt;
  }
  get completedAt(): Date | undefined {
    return this._completedAt;
  }
  get recordsProcessed(): number {
    return this._recordsProcessed;
  }
  get errors(): string[] {
    return [...this._errors];
  }
  get message(): string | undefined {
    return this._message;
  }

  static create(props: { integrationId: string; type: SyncType }): SyncLog {
    return new SyncLog(SyncLogId.create(), props.integrationId, props.type, "RUNNING", new Date());
  }

  complete(recordsProcessed: number, message?: string): void {
    this._status = "SUCCESS";
    this._completedAt = new Date();
    this._recordsProcessed = recordsProcessed;
    this._message = message;
  }

  fail(errors: string[], message?: string): void {
    this._status = "FAILED";
    this._completedAt = new Date();
    this._errors = [...errors];
    this._message = message;
  }

  partial(recordsProcessed: number, errors: string[], message?: string): void {
    this._status = "PARTIAL";
    this._completedAt = new Date();
    this._recordsProcessed = recordsProcessed;
    this._errors = [...errors];
    this._message = message;
  }

  addError(error: string): void {
    this._errors.push(error);
  }

  toJSON() {
    return {
      id: this._id.value,
      integrationId: this._integrationId,
      type: this._type,
      status: this._status,
      startedAt: this._startedAt.toISOString(),
      completedAt: this._completedAt?.toISOString(),
      recordsProcessed: this._recordsProcessed,
      errors: [...this._errors],
      message: this._message,
    };
  }

  static fromJSON(data: ReturnType<SyncLog["toJSON"]>): SyncLog {
    const instance = Object.create(SyncLog.prototype);
    instance._id = SyncLogId.create(data.id);
    instance._integrationId = data.integrationId;
    instance._type = data.type;
    instance._status = data.status;
    instance._startedAt = new Date(data.startedAt);
    instance._completedAt = data.completedAt ? new Date(data.completedAt) : undefined;
    instance._recordsProcessed = data.recordsProcessed;
    instance._errors = [...data.errors];
    instance._message = data.message;
    return instance;
  }
}
