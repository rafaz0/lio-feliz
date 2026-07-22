import type { ObterPerfilQuery } from "@/application/queries/obter-perfil";
import type { InvestidorPerfilCompletoDto } from "@/application/dtos/investidor-perfil";
import type { IApplicationService } from "@/application/application-service";
import type { IInvestorProfileRepository } from "@/application/ports/investor-profile-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterPerfilService
  implements IApplicationService<ObterPerfilQuery, InvestidorPerfilCompletoDto>
{
  constructor(private readonly profileRepo: IInvestorProfileRepository) {}

  async Execute(query: ObterPerfilQuery): Promise<InvestidorPerfilCompletoDto | ApplicationError> {
    const profile = await this.profileRepo.findProfileByUser(query.userId);
    if (!profile) return new NotFoundError("InvestorProfile", query.userId);

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
