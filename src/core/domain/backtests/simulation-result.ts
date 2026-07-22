import { ValueObject } from "../value-object";
import { SimulationResultId, type MonthlyReturn } from "./backtest-types";

export type SimulationResultProps = {
  id: SimulationResultId;
  backtestId: string;
  periodReturns: number;
  benchmarkReturn: number;
  maxDrawdown: number;
  sharpeRatio: number;
  volatility: number;
  alpha: number;
  beta: number;
  dividendYield: number;
  monthlyReturns: MonthlyReturn[];
};

export class SimulationResult extends ValueObject<SimulationResultProps> {
  private constructor(props: SimulationResultProps) {
    super(props);
  }

  static create(props: SimulationResultProps): SimulationResult {
    return new SimulationResult(props);
  }

  get id(): SimulationResultId {
    return this.props.id;
  }

  get backtestId(): string {
    return this.props.backtestId;
  }

  get periodReturns(): number {
    return this.props.periodReturns;
  }

  get benchmarkReturn(): number {
    return this.props.benchmarkReturn;
  }

  get maxDrawdown(): number {
    return this.props.maxDrawdown;
  }

  get sharpeRatio(): number {
    return this.props.sharpeRatio;
  }

  get volatility(): number {
    return this.props.volatility;
  }

  get alpha(): number {
    return this.props.alpha;
  }

  get beta(): number {
    return this.props.beta;
  }

  get dividendYield(): number {
    return this.props.dividendYield;
  }

  get monthlyReturns(): MonthlyReturn[] {
    return this.props.monthlyReturns;
  }

  excessReturn(): number {
    return this.props.periodReturns - this.props.benchmarkReturn;
  }
}
