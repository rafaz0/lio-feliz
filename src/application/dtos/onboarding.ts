export interface OnboardingStepDto {
  readonly order: number;
  readonly stepType: string;
  readonly title: string;
  readonly description: string;
  readonly optional: boolean;
  readonly isCurrent: boolean;
}

export interface UserProgressDto {
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly status: string;
  readonly isCompleted: boolean;
  readonly isSkipped: boolean;
  readonly startedAt: string;
}

export interface OnboardingCompletoDto {
  readonly progress: UserProgressDto;
  readonly currentStep: OnboardingStepDto | null;
  readonly nextStep: OnboardingStepDto | null;
  readonly hasMoreSteps: boolean;
}
