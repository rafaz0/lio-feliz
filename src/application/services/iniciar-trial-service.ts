import type { IniciarTrialCommand } from "@/application/commands/iniciar-trial";
import type { AssinaturaDto } from "@/application/dtos/assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import { NotFoundError, ValidationError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { Subscription, SubscriptionId } from "@/core/domain/subscriptions";

export class IniciarTrialService implements IApplicationService<
  IniciarTrialCommand,
  AssinaturaDto
> {
  constructor(private readonly subscriptionRepo: ISubscriptionRepository) {}

  async Execute(command: IniciarTrialCommand): Promise<AssinaturaDto | ApplicationError> {
    if (!command.userId) return new ValidationError("USER_ID_REQUIRED", "UserId obrigatorio");
    if (!command.planId) return new ValidationError("PLAN_ID_REQUIRED", "PlanId obrigatorio");

    const existing = await this.subscriptionRepo.findSubscriptionsByUser(command.userId);
    if (existing.some((s) => s.isActive || s.isTrial)) {
      return new ValidationError(
        "ALREADY_ACTIVE",
        "Usuario ja possui assinatura ativa ou em trial",
      );
    }

    const plan = await this.subscriptionRepo.findPlanById(command.planId);
    if (!plan) return new NotFoundError("Plan", command.planId);

    const sub = Subscription.startTrial({
      id: SubscriptionId.generate(),
      planId: command.planId,
      userId: command.userId,
      trialDurationDays: command.trialDurationDays,
    });

    await this.subscriptionRepo.saveSubscription(sub);

    return {
      id: sub.id.value,
      planId: sub.planId,
      userId: sub.userId,
      planName: plan.name,
      tier: plan.tier,
      startDate: sub.startDate.toISOString(),
      endDate: sub.trialEndDate?.toISOString() ?? null,
      status: sub.status,
      isActive: sub.isActive,
    };
  }
}
