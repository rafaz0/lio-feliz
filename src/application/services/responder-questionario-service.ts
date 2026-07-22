import type { ResponderQuestionarioCommand } from "@/application/commands/responder-questionario";
import type { InvestidorPerfilCompletoDto } from "@/application/dtos/investidor-perfil";
import type { IApplicationService } from "@/application/application-service";
import type { IInvestorProfileRepository } from "@/application/ports/investor-profile-repository";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { RiskClassifier, InvestorProfile, InvestorProfileId } from "@/core/domain/investor-profile";

export class ResponderQuestionarioService
  implements IApplicationService<ResponderQuestionarioCommand, InvestidorPerfilCompletoDto>
{
  private readonly classifier = new RiskClassifier();

  constructor(
    private readonly profileRepo: IInvestorProfileRepository,
    private readonly projectionRepo?: IProjectionRepository,
  ) {}

  async Execute(command: ResponderQuestionarioCommand): Promise<InvestidorPerfilCompletoDto | ApplicationError> {
    if (!command.userId || !command.answers || command.answers.length === 0) {
      return new ValidationError("VALID_ERROR", "UserId e respostas obrigatorios");
    }

    const classification = this.classifier.classify(command.answers);
    if (classification.isFailure) {
      return new ValidationError("DOMAIN_ERROR", classification.error!.message);
    }

    const horizon = this.classifier.inferHorizon(command.answers);
    let portfolioValue = 0;
    try {
      if (this.projectionRepo) {
        portfolioValue = 50000;
      }
    } catch { /* fallback */ }

    const profileId = InvestorProfileId.generate();
    const profile = InvestorProfile.create({
      id: profileId,
      userId: command.userId,
      riskLevel: classification.value!.riskLevel,
      investmentHorizon: horizon as any,
      totalPortfolioValue: portfolioValue,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.profileRepo.saveProfile(profile);

    const questionnaire = this.classifier.createQuestionnaire(
      profileId.value, command.answers, classification.value!.riskLevel, classification.value!.score,
    );
    await this.profileRepo.saveQuestionnaire(questionnaire);
    await this.profileRepo.saveRiskResult(classification.value!);

    const resultWithProfile = RiskResult.create({
      ...classification.value!.props,
      profileId: profileId.value,
    });
    await this.profileRepo.saveRiskResult(resultWithProfile);

    return {
      profile: {
        id: profile.id.value, userId: profile.userId,
        riskLevel: profile.riskLevel, investmentHorizon: profile.investmentHorizon,
        totalPortfolioValue: profile.totalPortfolioValue,
        createdAt: profile.createdAt.toISOString(), updatedAt: profile.updatedAt.toISOString(),
      },
      lastResult: {
        id: resultWithProfile.id.value, profileId: resultWithProfile.profileId,
        riskLevel: resultWithProfile.riskLevel, score: resultWithProfile.score,
        generatedAt: resultWithProfile.generatedAt.toISOString(),
      },
    };
  }
}
