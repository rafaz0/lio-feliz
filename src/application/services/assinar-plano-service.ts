import type { AssinarPlanoCommand } from "@/application/commands/assinar-plano";
import type { AssinaturaDto } from "@/application/dtos/assinatura";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { INotificationPort } from "@/application/ports/notification-port";
import type { IPaymentGateway } from "@/application/gateways/payment-gateway";
import { ValidationError, NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import { Subscription, SubscriptionId, BillingSimulator } from "@/core/domain/subscriptions";

export class AssinarPlanoService implements IApplicationService<
  AssinarPlanoCommand,
  AssinaturaDto
> {
  private readonly billingSimulator = new BillingSimulator();

  constructor(
    private readonly subscriptionRepo: ISubscriptionRepository,
    private readonly notificationPort?: INotificationPort,
    private readonly paymentGateway?: IPaymentGateway,
  ) {}

  async Execute(command: AssinarPlanoCommand): Promise<AssinaturaDto | ApplicationError> {
    if (!command.planId || !command.userId) {
      return new ValidationError("VALID_ERROR", "PlanId e UserId obrigatorios");
    }

    const plan = await this.subscriptionRepo.findPlanById(command.planId);
    if (!plan) return new NotFoundError("Plan", command.planId);

    const subscription = Subscription.create({
      id: SubscriptionId.generate(),
      planId: command.planId,
      userId: command.userId,
      startDate: new Date(),
      endDate: null,
      status: "ACTIVE",
    });

    await this.subscriptionRepo.saveSubscription(subscription);

    if (this.paymentGateway) {
      const result = await this.paymentGateway.charge(subscription.id.value, plan.monthlyPrice);
      if (!result.success) {
        const cancelled = subscription.cancel();
        await this.subscriptionRepo.saveSubscription(cancelled);
        return new ValidationError("PAYMENT_FAILED", result.error ?? "Falha no pagamento");
      }
    } else {
      this.billingSimulator.simulateBilling(subscription, plan.monthlyPrice);
    }

    if (this.notificationPort) {
      await this.notificationPort.Notificar(
        command.userId,
        "Assinatura Ativada",
        `Seu plano ${plan.name} foi ativado com sucesso.`,
      );
    }

    return {
      id: subscription.id.value,
      planId: subscription.planId,
      userId: subscription.userId,
      planName: plan.name,
      tier: plan.tier,
      startDate: subscription.startDate.toISOString(),
      endDate: null,
      status: subscription.status,
      isActive: subscription.isActive,
    };
  }
}
