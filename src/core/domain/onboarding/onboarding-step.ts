import { ValueObject } from "../value-object";
import { OnboardingStepId, type StepType } from "./onboarding-types";

export type OnboardingStepProps = {
  id: OnboardingStepId;
  stepType: StepType;
  title: string;
  description: string;
  order: number;
  optional: boolean;
};

export class OnboardingStep extends ValueObject<OnboardingStepProps> {
  private constructor(props: OnboardingStepProps) {
    super(props);
  }
  static create(props: OnboardingStepProps): OnboardingStep {
    return new OnboardingStep(props);
  }
  get id(): OnboardingStepId {
    return this.props.id;
  }
  get stepType(): StepType {
    return this.props.stepType;
  }
  get title(): string {
    return this.props.title;
  }
  get description(): string {
    return this.props.description;
  }
  get order(): number {
    return this.props.order;
  }
  get optional(): boolean {
    return this.props.optional;
  }
}
