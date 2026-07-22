import type { AllocationWeight, BenchmarkRef } from "@/core/domain/backtests";

export interface SalvarEstrategiaCommand {
  readonly type: "SalvarEstrategiaCommand";
  readonly name: string;
  readonly allocations: AllocationWeight[];
  readonly benchmark: BenchmarkRef;
  readonly userId: string;
}
