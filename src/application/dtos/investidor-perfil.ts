import type { RiskLevel, InvestmentHorizon, Answer } from "@/core/domain/investor-profile";

export interface InvestorProfileDto {
  readonly id: string;
  readonly userId: string;
  readonly riskLevel: RiskLevel;
  readonly investmentHorizon: InvestmentHorizon;
  readonly totalPortfolioValue: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface RiskResultDto {
  readonly id: string;
  readonly profileId: string;
  readonly riskLevel: RiskLevel;
  readonly score: number;
  readonly generatedAt: string;
}

export interface QuestionarioPerguntasDto {
  readonly id: string;
  readonly text: string;
  readonly options: string[];
}

export interface InvestidorPerfilCompletoDto {
  readonly profile: InvestorProfileDto;
  readonly lastResult?: RiskResultDto;
}
