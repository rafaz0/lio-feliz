import type { RenovarAssinaturaCommand } from "@/application/commands/renovar-assinatura";
import type { AssinaturaDto } from "@/application/dtos/assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import { NotFoundError, ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";

export class RenovarAssinaturaService implements IApplicationService<
  RenovarAssinaturaCommand,
  AssinaturaDto
> {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async Execute(command: RenovarAssinaturaCommand): Promise<AssinaturaDto | ApplicationError> {
    const sub = await this.subscriptionRepo.findSubscriptionById(command.subscriptionId);
    if (!sub) return new NotFoundError("Subscription", command.subscriptionId);
    if (!sub.isActive)
      return new ValidationError("SUBSCRIPTION_NOT_ACTIVE", "Assinatura nao esta ativa");

    const renewed = sub.renew(1);
    await this.subscriptionRepo.saveSubscription(renewed);

    const plan = await this.subscriptionRepo.findPlanById(renewed.planId);

    return {
      id: renewed.id.value,
      planId: renewed.planId,
      userId: renewed.userId,
      planName: plan?.name ?? "—",
      tier: plan?.tier ?? "FREE",
      startDate: renewed.startDate.toISOString(),
      endDate: renewed.endDate?.toISOString() ?? null,
      status: renewed.status,
      isActive: renewed.isActive,
    };
  }
}
