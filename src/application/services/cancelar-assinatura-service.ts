import type { CancelarAssinaturaCommand } from "@/application/commands/cancelar-assinatura";
import type { AssinaturaDto } from "@/application/dtos/assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import { NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { BillingSimulator } from "@/core/domain/subscriptions";

export class CancelarAssinaturaService
  implements IApplicationService<CancelarAssinaturaCommand, AssinaturaDto>
{
  private readonly billingSimulator = new BillingSimulator();

  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async Execute(command: CancelarAssinaturaCommand): Promise<AssinaturaDto | ApplicationError> {
    const subscriptions = await this.subscriptionRepo.findSubscriptionsByUser(command.userId);
    const active = subscriptions.find((s) => s.isActive);
    if (!active) return new NotFoundError("Subscription", command.userId);

    const cancelled = active.cancel();
    await this.subscriptionRepo.saveSubscription(cancelled);
    this.billingSimulator.cancelBilling(cancelled);

    const plan = await this.subscriptionRepo.findPlanById(cancelled.planId);

    return {
      id: cancelled.id.value,
      planId: cancelled.planId,
      userId: cancelled.userId,
      planName: plan?.name ?? "—",
      tier: plan?.tier ?? "FREE",
      startDate: cancelled.startDate.toISOString(),
      endDate: cancelled.endDate?.toISOString() ?? null,
      status: cancelled.status,
      isActive: cancelled.isActive,
    };
  }
}
