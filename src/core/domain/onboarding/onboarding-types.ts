import { EntityId } from "../entity-id";

export class OnboardingStepId extends EntityId {
  private constructor(value: string) { super(value); }
  static create(value: string): OnboardingStepId { return new OnboardingStepId(value); }
  static generate(): OnboardingStepId {
    return new OnboardingStepId(`os-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export class UserProgressId extends EntityId {
  private constructor(value: string) { super(value); }
  static create(value: string): UserProgressId { return new UserProgressId(value); }
  static generate(): UserProgressId {
    return new UserProgressId(`up-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  }
}

export type StepStatus = "PENDING" | "ACTIVE" | "COMPLETED" | "SKIPPED";
export type StepType = "tutorial" | "config" | "first_operation" | "profile" | "glossary_intro";
