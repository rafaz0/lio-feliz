import type { ObterPlanoAtivoQuery } from "@/application/queries/obter-plano-ativo";
import type { AssinaturaDto } from "@/application/dtos/assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class ObterPlanoAtivoService implements IApplicationService<
  ObterPlanoAtivoQuery,
  AssinaturaDto
> {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async Execute(query: ObterPlanoAtivoQuery): Promise<AssinaturaDto | ApplicationError> {
    const subscriptions = await this.subscriptionRepo.findSubscriptionsByUser(query.userId);
    const active = subscriptions.find((s) => s.isActive);
    if (!active) return new NotFoundError("Subscription", query.userId);

    const plan = await this.subscriptionRepo.findPlanById(active.planId);

    return {
      id: active.id.value,
      planId: active.planId,
      userId: active.userId,
      planName: plan?.name ?? "—",
      tier: plan?.tier ?? "FREE",
      startDate: active.startDate.toISOString(),
      endDate: active.endDate?.toISOString() ?? null,
      status: active.status,
      isActive: active.isActive,
    };
  }
}
