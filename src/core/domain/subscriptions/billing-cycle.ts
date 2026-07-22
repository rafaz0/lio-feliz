import { ValueObject } from "../value-object";
import { BillingCycleId, type BillingStatus } from "./subscription-types";

export type BillingCycleProps = {
  id: BillingCycleId;
  subscriptionId: string;
  periodStart: Date;
  periodEnd: Date;
  amount: number;
  status: BillingStatus;
  simulatedAt: Date;
};

export class BillingCycle extends ValueObject<BillingCycleProps> {
  private constructor(props: BillingCycleProps) { super(props); }
  static create(props: BillingCycleProps): BillingCycle { return new BillingCycle(props); }
  get id(): BillingCycleId { return this.props.id; }
  get subscriptionId(): string { return this.props.subscriptionId; }
  get periodStart(): Date { return this.props.periodStart; }
  get periodEnd(): Date { return this.props.periodEnd; }
  get amount(): number { return this.props.amount; }
  get status(): BillingStatus { return this.props.status; }
  get simulatedAt(): Date { return this.props.simulatedAt; }
}
