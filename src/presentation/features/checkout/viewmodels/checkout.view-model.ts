import type { PlanoDetalhadoDto } from "@/application/dtos/assinatura";

export interface CheckoutPlanViewModel {
  readonly id: string;
  readonly name: string;
  readonly tier: string;
  readonly monthlyPrice: string;
  readonly description: string;
  readonly capabilities: string[];
  readonly isFree: boolean;
}

export function toCheckoutPlanViewModel(dto: PlanoDetalhadoDto): CheckoutPlanViewModel {
  return {
    id: dto.id,
    name: dto.name,
    tier: dto.tier,
    monthlyPrice: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(dto.monthlyPrice),
    description: dto.description,
    capabilities: dto.capabilities,
    isFree: dto.tier === "FREE",
  };
}

export function toCheckoutPlanViewModels(dtos: PlanoDetalhadoDto[]): CheckoutPlanViewModel[] {
  return dtos.map(toCheckoutPlanViewModel);
}
