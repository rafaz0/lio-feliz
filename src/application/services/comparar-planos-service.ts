import type { CompararPlanosQuery } from "@/application/queries/comparar-planos";
import type { ComparacaoPlanosDto, FeatureDto } from "@/application/dtos/assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { ApplicationError } from "@/application/errors/application-error";

const ALL_FEATURES: FeatureDto[] = [
  { id: "carteira:read", name: "Visualizar Carteira", description: "Acompanhe seus ativos em tempo real", includedIn: ["FREE", "BASIC", "PREMIUM"] },
  { id: "dashboard:basic", name: "Dashboard Basico", description: "Visao geral do patrimonio", includedIn: ["FREE", "BASIC", "PREMIUM"] },
  { id: "proventos:read", name: "Visualizar Proventos", description: "Acompanhe dividendos e JCP recebidos", includedIn: ["FREE", "BASIC", "PREMIUM"] },
  { id: "carteira:write", name: "Gerenciar Carteira", description: "Adicione e remova ativos da carteira", includedIn: ["BASIC", "PREMIUM"] },
  { id: "dashboard:full", name: "Dashboard Completo", description: "Dashboard com graficos e metricas avancadas", includedIn: ["BASIC", "PREMIUM"] },
  { id: "relatorios:csv", name: "Exportar Relatorios", description: "Exporte relatorios em formato CSV", includedIn: ["BASIC", "PREMIUM"] },
  { id: "analise:risco", name: "Analise de Risco", description: "Metricas de risco do portfolio", includedIn: ["PREMIUM"] },
  { id: "analise:rentabilidade", name: "Rentabilidade Detalhada", description: "Rentabilidade por periodo e comparacao com benchmarks", includedIn: ["PREMIUM"] },
  { id: "relatorios:avancados", name: "Relatorios Avancados", description: "Relatorios personalizados com filtros", includedIn: ["PREMIUM"] },
  { id: "metas:ilimitadas", name: "Metas Ilimitadas", description: "Crie metas ilimitadas de dividendos", includedIn: ["PREMIUM"] },
  { id: "proventos:projecao", name: "Projecao de Proventos", description: "Projecao futura de proventos", includedIn: ["PREMIUM"] },
  { id: "carteira:rebalanceamento", name: "Rebalanceamento", description: "Sugestoes de rebalanceamento da carteira", includedIn: ["PREMIUM"] },
];

export class CompararPlanosService implements IApplicationService<
  CompararPlanosQuery,
  ComparacaoPlanosDto
> {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async Execute(_query: CompararPlanosQuery): Promise<ComparacaoPlanosDto | ApplicationError> {
    const plans = await this.subscriptionRepo.findAllPlans();

    const planos = plans.map((p) => ({
      id: p.id.value,
      name: p.name,
      tier: p.tier,
      monthlyPrice: p.monthlyPrice,
      description: p.description,
      featureIds: p.capabilities.includes("*")
        ? ALL_FEATURES.map((f) => f.id)
        : ALL_FEATURES.filter((f) => f.includedIn.includes(p.tier)).map((f) => f.id),
      isFree: p.tier === "FREE",
    }));

    return { planos, features: ALL_FEATURES };
  }
}
