import { ValueObject } from "../value-object";
import { type AllocationWeight, type BenchmarkRef, StrategyId } from "./backtest-types";

export type StrategyProps = {
  id: StrategyId;
  name: string;
  allocations: AllocationWeight[];
  benchmark: BenchmarkRef;
  userId: string;
  createdAt: Date;
  isActive: boolean;
};

export class Strategy extends ValueObject<StrategyProps> {
  private constructor(props: StrategyProps) {
    super(props);
  }

  static create(props: StrategyProps): Strategy {
    return new Strategy(props);
  }

  get id(): StrategyId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get allocations(): AllocationWeight[] {
    return this.props.allocations;
  }

  get benchmark(): BenchmarkRef {
    return this.props.benchmark;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  totalAllocationPercentage(): number {
    return this.props.allocations.reduce((sum, a) => sum + a.weightPercentage, 0);
  }

  activate(): Strategy {
    return Strategy.create({ ...this.props, isActive: true });
  }

  deactivate(): Strategy {
    return Strategy.create({ ...this.props, isActive: false });
  }
}
