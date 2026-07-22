import { ValueObject } from "../value-object";
import { BacktestId, type BacktestStatus, type DateRange } from "./backtest-types";

export type BacktestProps = {
  id: BacktestId;
  strategyId: string;
  dateRange: DateRange;
  snapshotId: string;
  status: BacktestStatus;
  createdAt: Date;
  completedAt?: Date;
  error?: string;
};

export class Backtest extends ValueObject<BacktestProps> {
  private constructor(props: BacktestProps) {
    super(props);
  }

  static create(props: BacktestProps): Backtest {
    return new Backtest(props);
  }

  get id(): BacktestId {
    return this.props.id;
  }

  get strategyId(): string {
    return this.props.strategyId;
  }

  get dateRange(): DateRange {
    return this.props.dateRange;
  }

  get snapshotId(): string {
    return this.props.snapshotId;
  }

  get status(): BacktestStatus {
    return this.props.status;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get completedAt(): Date | undefined {
    return this.props.completedAt;
  }

  get error(): string | undefined {
    return this.props.error;
  }

  markRunning(): Backtest {
    return Backtest.create({ ...this.props, status: "RUNNING" });
  }

  markCompleted(): Backtest {
    return Backtest.create({ ...this.props, status: "COMPLETED", completedAt: new Date() });
  }

  markFailed(error: string): Backtest {
    return Backtest.create({ ...this.props, status: "FAILED", error, completedAt: new Date() });
  }
}
