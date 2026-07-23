import { Result } from "../result";
import { OnboardingStep, type StepType } from "./onboarding-step";
import { OnboardingStepId, UserProgressId } from "./onboarding-types";
import { UserProgress } from "./user-progress";
import { InvalidStepOrderError } from "./errors";

const DEFAULT_STEPS: Array<{
  stepType: StepType;
  title: string;
  description: string;
  optional: boolean;
}> = [
  {
    stepType: "tutorial",
    title: "Boas-vindas ao Lio Feliz",
    description: "Conheça os principais recursos da plataforma.",
    optional: true,
  },
  {
    stepType: "config",
    title: "Configure sua moeda e estratégia",
    description: "Defina sua moeda principal e percentuais de alocação.",
    optional: false,
  },
  {
    stepType: "first_operation",
    title: "Faça seu primeiro lançamento",
    description: "Registre sua primeira operação de compra ou venda.",
    optional: false,
  },
  {
    stepType: "profile",
    title: "Responda ao questionário de perfil",
    description: "Descubra seu perfil de investidor.",
    optional: false,
  },
  {
    stepType: "glossary_intro",
    title: "Conheça o glossário",
    description: "Explore termos e conceitos do mercado financeiro.",
    optional: true,
  },
];

export class OnboardingFlow {
  getDefaultSteps(): OnboardingStep[] {
    return DEFAULT_STEPS.map((s, i) =>
      OnboardingStep.create({
        id: OnboardingStepId.create(`step-${i + 1}`),
        stepType: s.stepType,
        title: s.title,
        description: s.description,
        order: i + 1,
        optional: s.optional,
      }),
    );
  }

  getNextStep(currentStep: number): OnboardingStep | null {
    const steps = this.getDefaultSteps();
    const next = steps.find((s) => s.order === currentStep + 1);
    return next ?? null;
  }

  hasMoreSteps(currentStep: number): boolean {
    return currentStep < DEFAULT_STEPS.length;
  }

  canSkip(step: OnboardingStep): boolean {
    return step.optional;
  }

  completeStep(progress: UserProgress, step: OnboardingStep): Result<UserProgress> {
    if (step.order !== progress.currentStep) {
      return Result.fail(new InvalidStepOrderError(step.order));
    }

    const nextStep = this.getNextStep(progress.currentStep);
    const isLast = !nextStep;

    const updated = UserProgress.create({
      ...progress.props,
      currentStep: isLast ? progress.currentStep : progress.currentStep + 1,
      status: isLast ? "COMPLETED" : "ACTIVE",
      completedAt: isLast ? new Date() : undefined,
    });

    return Result.ok(updated);
  }

  skipAll(userId: string): UserProgress {
    return UserProgress.create({
      id: UserProgressId.generate(),
      userId,
      currentStep: DEFAULT_STEPS.length,
      status: "SKIPPED",
      startedAt: new Date(),
      completedAt: new Date(),
    });
  }

  startOnboarding(userId: string): UserProgress {
    return UserProgress.create({
      id: UserProgressId.generate(),
      userId,
      currentStep: 1,
      status: "ACTIVE",
      startedAt: new Date(),
    });
  }

  getStepByOrder(order: number): OnboardingStep | null {
    const steps = this.getDefaultSteps();
    return steps.find((s) => s.order === order) ?? null;
  }

  maxSteps(): number {
    return DEFAULT_STEPS.length;
  }
}
