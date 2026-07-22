import type { CalcularPerfilCommand } from "@/application/commands/calcular-perfil";
import type { InvestidorPerfilCompletoDto } from "@/application/dtos/investidor-perfil";
import type { IApplicationService } from "@/application/application-service";
import type { IInvestorProfileRepository } from "@/application/ports/investor-profile-repository";
import type { IProjectionRepository } from "@/application/ports/projection-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class CalcularPerfilService
  implements IApplicationService<CalcularPerfilCommand, InvestidorPerfilCompletoDto>
{
  constructor(
    private readonly profileRepo: IInvestorProfileRepository,
    private readonly projectionRepo?: IProjectionRepository,
  ) {}

  async Execute(command: CalcularPerfilCommand): Promise<InvestidorPerfilCompletoDto | ApplicationError> {
    const profile = await this.profileRepo.findProfileByUser(command.userId);
    if (!profile) return new NotFoundError("InvestorProfile", command.userId);

    const latestResult = await this.profileRepo.findLatestRiskResult(profile.id.value);

    return {
      profile: {
        id: profile.id.value, userId: profile.userId,
        riskLevel: profile.riskLevel, investmentHorizon: profile.investmentHorizon,
        totalPortfolioValue: profile.totalPortfolioValue,
        createdAt: profile.createdAt.toISOString(), updatedAt: profile.updatedAt.toISOString(),
      },
      lastResult: latestResult ? {
        id: latestResult.id.value, profileId: latestResult.profileId,
        riskLevel: latestResult.riskLevel, score: latestResult.score,
        generatedAt: latestResult.generatedAt.toISOString(),
      } : undefined,
    };
  }
}
