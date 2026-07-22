import type { OnboardingStepDto, UserProgressDto } from "@/application/dtos/onboarding";

export interface OnboardingViewModel {
  readonly progress: UserProgressDto;
  readonly currentStep: OnboardingStepDto | null;
  readonly nextStep: OnboardingStepDto | null;
  readonly hasMoreSteps: boolean;
  readonly progressPercent: number;
}
