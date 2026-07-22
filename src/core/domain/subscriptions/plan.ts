import { ValueObject } from "../value-object";
import { PlanId, type PlanTier } from "./subscription-types";

export type PlanProps = {
  id: PlanId;
  name: string;
  tier: PlanTier;
  monthlyPrice: number;
  description: string;
  capabilities: string[];
};

export class Plan extends ValueObject<PlanProps> {
  private constructor(props: PlanProps) { super(props); }
  static create(props: PlanProps): Plan { return new Plan(props); }

  get id(): PlanId { return this.props.id; }
  get name(): string { return this.props.name; }
  get tier(): PlanTier { return this.props.tier; }
  get monthlyPrice(): number { return this.props.monthlyPrice; }
  get description(): string { return this.props.description; }
  get capabilities(): string[] { return this.props.capabilities; }

  hasCapability(capability: string): boolean {
    return this.props.capabilities.includes("*") || this.props.capabilities.includes(capability);
  }
}
