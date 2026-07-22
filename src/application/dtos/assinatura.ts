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
