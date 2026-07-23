import type { ListarPlanosQuery } from "@/application/queries/listar-planos";
import type { PlanoDetalhadoDto } from "@/application/dtos/assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { ApplicationError } from "@/application/errors/application-error";

export class ListarPlanosService implements IApplicationService<
  ListarPlanosQuery,
  PlanoDetalhadoDto[]
> {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async Execute(_query: ListarPlanosQuery): Promise<PlanoDetalhadoDto[] | ApplicationError> {
    const plans = await this.subscriptionRepo.findAllPlans();
    return plans.map((p) => ({
      id: p.id.value,
      name: p.name,
      tier: p.tier,
      monthlyPrice: p.monthlyPrice,
      description: p.description,
      capabilities: p.capabilities,
    }));
  }
}
