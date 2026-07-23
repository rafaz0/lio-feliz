import type { AvancarPassoCommand } from "@/application/commands/avancar-passo";
import type { OnboardingCompletoDto } from "@/application/dtos/onboarding";
import type { IApplicationService } from "@/application/application-service";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { OnboardingFlow } from "@/core/domain/onboarding";

export class AvancarPassoService implements IApplicationService<
  AvancarPassoCommand,
  OnboardingCompletoDto
> {
  private readonly flow = new OnboardingFlow();

  constructor(private readonly configRepo: IConfigurationRepository) {}

  async Execute(command: AvancarPassoCommand): Promise<OnboardingCompletoDto | ApplicationError> {
    const progressJson = await this.configRepo.findOnboardingProgress(command.userId);
    if (!progressJson) return new NotFoundError("Onboarding", command.userId);

    const progressData = JSON.parse(progressJson);
    const progress = this.flow.startOnboarding(command.userId);
    const currentStepDef = this.flow.getStepByOrder(progressData.currentStep);

    if (!currentStepDef) return new NotFoundError("Step", String(progressData.currentStep));

    const result = this.flow.completeStep(progress, currentStepDef);
    if (result.isFailure) return new NotFoundError("Step", "completion_failed");

    await this.configRepo.saveOnboardingProgress(
      command.userId,
      JSON.stringify({
        currentStep: result.value!.currentStep,
        status: result.value!.status,
        startedAt: result.value!.startedAt.toISOString(),
        completedAt: result.value!.completedAt?.toISOString(),
      }),
    );

    const updatedProgress = result.value!;
    const currentStep = this.flow.getStepByOrder(updatedProgress.currentStep);
    const nextStep = this.flow.getNextStep(updatedProgress.currentStep);

    return {
      progress: {
        currentStep: updatedProgress.currentStep,
        totalSteps: this.flow.maxSteps(),
        status: updatedProgress.status,
        isCompleted: updatedProgress.isCompleted,
        isSkipped: updatedProgress.isSkipped,
        startedAt: updatedProgress.startedAt.toISOString(),
      },
      currentStep: currentStep
        ? {
            order: currentStep.order,
            stepType: currentStep.stepType,
            title: currentStep.title,
            description: currentStep.description,
            optional: currentStep.optional,
            isCurrent: true,
          }
        : null,
      nextStep: nextStep
        ? {
            order: nextStep.order,
            stepType: nextStep.stepType,
            title: nextStep.title,
            description: nextStep.description,
            optional: nextStep.optional,
            isCurrent: false,
          }
        : null,
      hasMoreSteps: this.flow.hasMoreSteps(updatedProgress.currentStep),
    };
  }
}
