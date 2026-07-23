import { DomainError } from "../errors";

export class OnboardingNotFoundError extends DomainError {
  constructor(userId: string) {
    super("ONBOARDING_NOT_FOUND", `Onboarding para usuario "${userId}" nao encontrado`);
  }
}

export class StepAlreadyCompletedError extends DomainError {
  constructor(step: number) {
    super("STEP_ALREADY_COMPLETED", `Passo ${step} ja foi concluido`);
  }
}

export class InvalidStepOrderError extends DomainError {
  constructor(step: number) {
    super("INVALID_STEP_ORDER", `Passo ${step} invalido (deve estar entre 1 e 5)`);
  }
}
