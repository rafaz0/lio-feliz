import type { InvestorProfileDto, RiskResultDto } from "@/application/dtos/investidor-perfil";

export interface ProfileViewModel {
  readonly riskLevel: string;
  readonly riskLevelLabel: string;
  readonly investmentHorizon: string;
  readonly horizonLabel: string;
  readonly score: number;
}

const RISK_LABELS: Record<string, string> = {
  CONSERVADOR: "Conservador", MODERADO: "Moderado", ARROJADO: "Arrojado",
};

const HORIZON_LABELS: Record<string, string> = {
  CURTO_PRAZO: "Curto Prazo (ate 2 anos)",
  MEDIO_PRAZO: "Medio Prazo (2-5 anos)",
  LONGO_PRAZO: "Longo Prazo (acima de 5 anos)",
};

export function toProfileViewModel(profile: InvestorProfileDto, result?: RiskResultDto): ProfileViewModel {
  return {
    riskLevel: profile.riskLevel,
    riskLevelLabel: RISK_LABELS[profile.riskLevel] ?? profile.riskLevel,
    investmentHorizon: profile.investmentHorizon,
    horizonLabel: HORIZON_LABELS[profile.investmentHorizon] ?? profile.investmentHorizon,
    score: result?.score ?? 0,
  };
}
