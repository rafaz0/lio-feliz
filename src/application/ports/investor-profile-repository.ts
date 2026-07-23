import type {
  InvestorProfile,
  RiskQuestionnaire,
  RiskResult,
} from "@/core/domain/investor-profile";

export interface IInvestorProfileRepository {
  saveProfile(profile: InvestorProfile): Promise<void>;
  findProfileByUser(userId: string): Promise<InvestorProfile | null>;

  saveQuestionnaire(questionnaire: RiskQuestionnaire): Promise<void>;
  findQuestionnaireByProfile(profileId: string): Promise<RiskQuestionnaire | null>;

  saveRiskResult(result: RiskResult): Promise<void>;
  findLatestRiskResult(profileId: string): Promise<RiskResult | null>;
}
