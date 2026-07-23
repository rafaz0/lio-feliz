import type { SupabaseClient } from "@supabase/supabase-js";
import type { IInvestorProfileRepository } from "@/application/ports/investor-profile-repository";
import {
  InvestorProfile,
  RiskQuestionnaire,
  RiskResult,
  InvestorProfileId,
  RiskQuestionnaireId,
  RiskResultId,
  type RiskLevel,
  type InvestmentHorizon,
  type Answer,
} from "@/core/domain/investor-profile";

interface SerializedProfile {
  id: string;
  userId: string;
  riskLevel: string;
  investmentHorizon: string;
  totalPortfolioValue: number;
  createdAt: string;
  updatedAt: string;
}
interface SerializedQuestionnaire {
  id: string;
  profileId: string;
  answers: Answer[];
  totalScore: number;
  riskLevel: string;
}
interface SerializedResult {
  id: string;
  profileId: string;
  riskLevel: string;
  score: number;
  generatedAt: string;
}

export class SupabaseInvestorProfileRepository implements IInvestorProfileRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async saveProfile(profile: InvestorProfile): Promise<void> {
    const s: SerializedProfile = {
      id: profile.id.value,
      userId: profile.userId,
      riskLevel: profile.riskLevel,
      investmentHorizon: profile.investmentHorizon,
      totalPortfolioValue: profile.totalPortfolioValue,
      createdAt: profile.createdAt.toISOString(),
      updatedAt: profile.updatedAt.toISOString(),
    };
    const { error } = await this.supabase
      .from("investor_profiles")
      .upsert({ id: profile.id.value, dados: s }, { onConflict: "id" });
    if (error) throw new Error(`Falha ao salvar perfil: ${error.message}`);
  }

  async findProfileByUser(userId: string): Promise<InvestorProfile | null> {
    const { data, error } = await this.supabase.from("investor_profiles").select("dados").single();
    if (error || !data) return null;
    const s = data.dados as SerializedProfile;
    if (s.userId !== userId) return null;
    return InvestorProfile.create({
      id: InvestorProfileId.create(s.id),
      userId: s.userId,
      riskLevel: s.riskLevel as RiskLevel,
      investmentHorizon: s.investmentHorizon as InvestmentHorizon,
      totalPortfolioValue: s.totalPortfolioValue,
      createdAt: new Date(s.createdAt),
      updatedAt: new Date(s.updatedAt),
    });
  }

  async saveQuestionnaire(q: RiskQuestionnaire): Promise<void> {
    const s: SerializedQuestionnaire = {
      id: q.id.value,
      profileId: q.profileId,
      answers: q.answers,
      totalScore: q.totalScore,
      riskLevel: q.riskLevel,
    };
    const { error } = await this.supabase
      .from("investor_questionnaires")
      .upsert({ id: q.id.value, dados: s }, { onConflict: "id" });
    if (error) throw new Error(`Falha ao salvar questionario: ${error.message}`);
  }

  async findQuestionnaireByProfile(profileId: string): Promise<RiskQuestionnaire | null> {
    const { data, error } = await this.supabase
      .from("investor_questionnaires")
      .select("dados")
      .single();
    if (error || !data) return null;
    const s = data.dados as SerializedQuestionnaire;
    if (s.profileId !== profileId) return null;
    return RiskQuestionnaire.create({
      id: RiskQuestionnaireId.create(s.id),
      profileId: s.profileId,
      answers: s.answers,
      totalScore: s.totalScore,
      riskLevel: s.riskLevel as RiskLevel,
    });
  }

  async saveRiskResult(r: RiskResult): Promise<void> {
    const s: SerializedResult = {
      id: r.id.value,
      profileId: r.profileId,
      riskLevel: r.riskLevel,
      score: r.score,
      generatedAt: r.generatedAt.toISOString(),
    };
    const { error } = await this.supabase
      .from("investor_risk_results")
      .upsert({ id: r.id.value, dados: s }, { onConflict: "id" });
    if (error) throw new Error(`Falha ao salvar resultado: ${error.message}`);
  }

  async findLatestRiskResult(profileId: string): Promise<RiskResult | null> {
    const { data, error } = await this.supabase.from("investor_risk_results").select("dados");
    if (error || !data) return null;
    const results = data
      .map((d: { dados: SerializedResult }) => d.dados)
      .filter((r: SerializedResult) => r.profileId === profileId)
      .map((s: SerializedResult) =>
        RiskResult.create({
          id: RiskResultId.create(s.id),
          profileId: s.profileId,
          riskLevel: s.riskLevel as RiskLevel,
          score: s.score,
          generatedAt: new Date(s.generatedAt),
        }),
      );
    if (results.length === 0) return null;
    return results.reduce((a: RiskResult, b: RiskResult) =>
      a.generatedAt > b.generatedAt ? a : b,
    );
  }
}
