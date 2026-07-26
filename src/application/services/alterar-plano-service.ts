import type { AlterarPlanoCommand } from "@/application/commands/alterar-plano";
import type { AssinaturaDto } from "@/application/dtos/assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import { NotFoundError, ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class AlterarPlanoService implements IApplicationService<
  AlterarPlanoCommand,
  AssinaturaDto
> {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async Execute(command: AlterarPlanoCommand): Promise<AssinaturaDto | ApplicationError> {
    const sub = await this.subscriptionRepo.findSubscriptionById(command.subscriptionId);
    if (!sub) return new NotFoundError("Subscription", command.subscriptionId);

    const newPlan = await this.subscriptionRepo.findPlanById(command.newPlanId);
    if (!newPlan) return new NotFoundError("Plan", command.newPlanId);

    const changed = command.isDowngrade
      ? sub.downgrade(command.newPlanId, new Date())
      : sub.upgrade(command.newPlanId);

    await this.subscriptionRepo.saveSubscription(changed);

    return {
      id: changed.id.value,
      planId: changed.planId,
      userId: changed.userId,
      planName: newPlan.name,
      tier: newPlan.tier,
      startDate: changed.startDate.toISOString(),
      endDate: changed.endDate?.toISOString() ?? null,
      status: changed.status,
      isActive: changed.isActive,
    };
  }
}
