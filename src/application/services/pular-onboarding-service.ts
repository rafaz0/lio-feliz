import type { PularOnboardingCommand } from "@/application/commands/pular-onboarding";
import type { OnboardingCompletoDto } from "@/application/dtos/onboarding";
import type { IApplicationService } from "@/application/application-service";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import type { ApplicationError } from "@/application/errors/application-error";
import { OnboardingFlow } from "@/core/domain/onboarding";

export class PularOnboardingService implements IApplicationService<
  PularOnboardingCommand,
  OnboardingCompletoDto
> {
  private readonly flow = new OnboardingFlow();

  constructor(private readonly configRepo: IConfigurationRepository) {}

  async Execute(
    command: PularOnboardingCommand,
  ): Promise<OnboardingCompletoDto | ApplicationError> {
    const progress = this.flow.skipAll(command.userId);
    await this.configRepo.saveOnboardingProgress(
      command.userId,
      JSON.stringify({
        currentStep: progress.currentStep,
        status: progress.status,
        startedAt: progress.startedAt.toISOString(),
        completedAt: progress.completedAt?.toISOString(),
      }),
    );

    return {
      progress: {
        currentStep: progress.currentStep,
        totalSteps: this.flow.maxSteps(),
        status: progress.status,
        isCompleted: false,
        isSkipped: true,
        startedAt: progress.startedAt.toISOString(),
      },
      currentStep: null,
      nextStep: null,
      hasMoreSteps: false,
    };
  }
}
