import type { PlanoDetalhadoDto, AssinaturaDto } from "@/application/dtos/assinatura";

export interface PlanViewModel {
  readonly id: string;
  readonly name: string;
  readonly tier: string;
  readonly monthlyPrice: string;
  readonly description: string;
  readonly capabilities: string[];
  readonly isFree: boolean;
}

export interface SubscriptionViewModel {
  readonly id: string;
  readonly planName: string;
  readonly tier: string;
  readonly status: string;
  readonly isActive: boolean;
  readonly startDate: string;
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(cents / 100);
}

export function toPlanViewModel(dto: PlanoDetalhadoDto): PlanViewModel {
  return {
    id: dto.id,
    name: dto.name,
    tier: dto.tier,
    monthlyPrice: formatPrice(dto.monthlyPrice),
    description: dto.description,
    capabilities: dto.capabilities,
    isFree: dto.tier === "FREE",
  };
}

export function toPlanViewModels(dtos: PlanoDetalhadoDto[]): PlanViewModel[] {
  return dtos.map(toPlanViewModel);
}

export function toSubscriptionViewModel(dto: AssinaturaDto): SubscriptionViewModel {
  return {
    id: dto.id,
    planName: dto.planName,
    tier: dto.tier,
    status: dto.status,
    isActive: dto.isActive,
    startDate: new Date(dto.startDate).toLocaleDateString("pt-BR"),
  };
}
