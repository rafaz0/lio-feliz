export interface PlanoDetalhadoDto {
  readonly id: string;
  readonly name: string;
  readonly tier: string;
  readonly monthlyPrice: number;
  readonly description: string;
  readonly capabilities: string[];
}

export interface AssinaturaDto {
  readonly id: string;
  readonly planId: string;
  readonly userId: string;
  readonly planName: string;
  readonly tier: string;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly status: string;
  readonly isActive: boolean;
}

export interface AcessoDto {
  readonly userId: string;
  readonly capability: string;
  readonly allowed: boolean;
  readonly planTier: string;
}

export interface AssinaturaAtualizadaDto {
  readonly usuarioId: string;
  readonly plano: string;
  readonly dataAtivacao: Date;
  readonly dataExpiracao: Date | null;
  readonly recursosLiberados: string[];
}

export interface FeatureDto {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly includedIn: string[];
  readonly limit?: number;
}

export interface ComparacaoPlanosDto {
  readonly planos: PlanoComparacaoDto[];
  readonly features: FeatureDto[];
}

export interface PlanoComparacaoDto {
  readonly id: string;
  readonly name: string;
  readonly tier: string;
  readonly monthlyPrice: number;
  readonly description: string;
  readonly featureIds: string[];
  readonly isFree: boolean;
}
