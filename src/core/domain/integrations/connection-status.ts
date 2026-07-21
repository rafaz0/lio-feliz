import { ValueObject } from "../value-object";
import type { SyncStatus } from "./sync-log";

export class ConnectionStatus extends ValueObject<ConnectionStatus> {
  private constructor(
    private readonly _lastSync: Date | null,
    private readonly _status: SyncStatus,
    private readonly _totalErrors: number,
  ) { super(); }

  get lastSync(): Date | null { return this._lastSync; }
  get status(): SyncStatus { return this._status; }
  get totalErrors(): number { return this._totalErrors; }

  static create(props: {
    lastSync: Date | null;
    status: SyncStatus;
    totalErrors: number;
  }): ConnectionStatus {
    return new ConnectionStatus(props.lastSync, props.status, props.totalErrors);
  }

  equals(other: ConnectionStatus): boolean {
    return (
      this._lastSync?.getTime() === other._lastSync?.getTime() &&
      this._status === other._status &&
      this._totalErrors === other._totalErrors
    );
  }

  toJSON() {
    return {
      lastSync: this._lastSync?.toISOString() ?? null,
      status: this._status,
      totalErrors: this._totalErrors,
    };
  }

  static fromJSON(data: ReturnType<ConnectionStatus["toJSON"]>): ConnectionStatus {
    const instance = Object.create(ConnectionStatus.prototype);
    instance._lastSync = data.lastSync ? new Date(data.lastSync) : null;
    instance._status = data.status;
    instance._totalErrors = data.totalErrors;
    return instance;
  }
}
