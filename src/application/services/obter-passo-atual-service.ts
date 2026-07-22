import type { ObterPassoAtualQuery } from "@/application/queries/obter-passo-atual";
import type { OnboardingCompletoDto } from "@/application/dtos/onboarding";
import type { IApplicationService } from "@/application/application-service";
import type { IConfigurationRepository } from "@/application/ports/configuration-repository";
import type { IGlossaryRepository } from "@/application/ports/glossary-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { OnboardingFlow } from "@/core/domain/onboarding";

export class ObterPassoAtualService
  implements IApplicationService<ObterPassoAtualQuery, OnboardingCompletoDto>
{
  private readonly flow = new OnboardingFlow();

  constructor(
    private readonly configRepo: IConfigurationRepository,
    private readonly glossaryRepo?: IGlossaryRepository,
  ) {}

  async Execute(query: ObterPassoAtualQuery): Promise<OnboardingCompletoDto | ApplicationError> {
    const progressJson = await this.configRepo.findOnboardingProgress(query.userId);
    if (!progressJson) return new NotFoundError("Onboarding", query.userId);

    const data = JSON.parse(progressJson);
    const currentStep = this.flow.getStepByOrder(data.currentStep);

    if (currentStep?.stepType === "glossary_intro" || currentStep?.stepType === "tutorial") {
      try {
        if (this.glossaryRepo) {
          await this.glossaryRepo.findAllTerms();
        }
      } catch { /* fallback */ }
    }

    const nextStep = this.flow.getNextStep(data.currentStep);

    return {
      progress: {
        currentStep: data.currentStep,
        totalSteps: this.flow.maxSteps(),
        status: data.status,
        isCompleted: data.status === "COMPLETED",
        isSkipped: data.status === "SKIPPED",
        startedAt: data.startedAt,
      },
      currentStep: currentStep ? {
        order: currentStep.order, stepType: currentStep.stepType,
        title: currentStep.title, description: currentStep.description,
        optional: currentStep.optional, isCurrent: true,
      } : null,
      nextStep: nextStep ? {
        order: nextStep.order, stepType: nextStep.stepType,
        title: nextStep.title, description: nextStep.description,
        optional: nextStep.optional, isCurrent: false,
      } : null,
      hasMoreSteps: this.flow.hasMoreSteps(data.currentStep),
    };
  }
}
