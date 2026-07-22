import type { IInvestorProfileRepository } from "@/application/ports/investor-profile-repository";
import { InvestorProfile, RiskQuestionnaire, RiskResult, InvestorProfileId, RiskQuestionnaireId, RiskResultId } from "@/core/domain/investor-profile";

export class FakeInvestorProfileRepository implements IInvestorProfileRepository {
  private profiles = new Map<string, InvestorProfile>();
  private questionnaires = new Map<string, RiskQuestionnaire>();
  private results = new Map<string, RiskResult>();

  async saveProfile(profile: InvestorProfile): Promise<void> { this.profiles.set(profile.userId, profile); }
  async findProfileByUser(userId: string): Promise<InvestorProfile | null> { return this.profiles.get(userId) ?? null; }

  async saveQuestionnaire(q: RiskQuestionnaire): Promise<void> { this.questionnaires.set(q.id.value, q); }
  async findQuestionnaireByProfile(profileId: string): Promise<RiskQuestionnaire | null> {
    return Array.from(this.questionnaires.values()).find((q) => q.profileId === profileId) ?? null;
  }

  async saveRiskResult(r: RiskResult): Promise<void> { this.results.set(r.id.value, r); }
  async findLatestRiskResult(profileId: string): Promise<RiskResult | null> {
    const filtered = Array.from(this.results.values()).filter((r) => r.profileId === profileId);
    if (filtered.length === 0) return null;
    return filtered.reduce((a, b) => (a.generatedAt > b.generatedAt ? a : b));
  }

  reset(): void { this.profiles.clear(); this.questionnaires.clear(); this.results.clear(); }
}
