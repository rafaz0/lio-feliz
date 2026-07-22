import type { DateRange } from "@/core/domain/backtests";

export interface ExecutarBacktestCommand {
  readonly type: "ExecutarBacktestCommand";
  readonly strategyId: string;
  readonly dateRange: DateRange;
}
