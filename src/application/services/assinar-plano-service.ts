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

    let subscription = Subscription.create({
      id: SubscriptionId.generate(),
      planId: command.planId,
      userId: command.userId,
      startDate: new Date(),
      endDate: null,
      trialEndDate: null,
      // Com gateway real, a cobrança pode ser assíncrona (ex: Pix via Asaas
      // — confirmação só chega por webhook), então não ativa de antemão.
      // Sem gateway (plano gratuito, billingSimulator), ativa direto.
      status: this.paymentGateway ? "PENDING_PAYMENT" : "ACTIVE",
    });

    await this.subscriptionRepo.saveSubscription(subscription);

    if (this.paymentGateway) {
      const result = await this.paymentGateway.charge(subscription.id.value, plan.monthlyPrice);
      if (!result.success && result.status !== "PENDING") {
        const cancelled = subscription.cancel();
        await this.subscriptionRepo.saveSubscription(cancelled);
        return new ValidationError("PAYMENT_FAILED", result.error ?? "Falha no pagamento");
      }
      if (result.status === "PAID") {
        subscription = subscription.activate();
        await this.subscriptionRepo.saveSubscription(subscription);
      }
      // status === "PENDING": fica PENDING_PAYMENT — o webhook do gateway
      // ativa quando o pagamento for confirmado de verdade.
    } else {
      this.billingSimulator.simulateBilling(subscription, plan.monthlyPrice);
    }

    if (this.notificationPort && subscription.isActive) {
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
