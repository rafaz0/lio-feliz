import type { IniciarCheckoutCommand } from "@/application/commands/iniciar-checkout";
import type { CheckoutDto, CheckoutStatus } from "@/application/dtos/checkout";
import type { IApplicationService } from "@/application/application-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { IPaymentGateway } from "@/application/gateways/payment-gateway";
import { ValidationError, NotFoundError } from "@/application/errors/application-error";
import type { ApplicationError } from "@/application/errors/application-error";
import {
  Subscription,
  SubscriptionId,
  BillingCycleId,
  BillingCycle,
} from "@/core/domain/subscriptions";

let nextCheckoutId = 1;
function generateCheckoutId(): string {
  return `chk-${nextCheckoutId++}-${Date.now()}`;
}

export class CheckoutService implements IApplicationService<IniciarCheckoutCommand, CheckoutDto> {
  private checkouts = new Map<
    string,
    { command: IniciarCheckoutCommand; status: CheckoutStatus }
  >();

  constructor(
    private readonly subscriptionRepo: ISubscriptionRepository,
    private readonly paymentGateway: IPaymentGateway,
  ) {}

  async Execute(command: IniciarCheckoutCommand): Promise<CheckoutDto | ApplicationError> {
    if (!command.userId) return new ValidationError("USER_ID_REQUIRED", "UserId obrigatorio");

    switch (command.tipo) {
      case "nova_assinatura":
        return this.handleNewSubscription(command);
      case "upgrade":
        return this.handleUpgrade(command);
      case "downgrade":
        return this.handleDowngrade(command);
      case "renovacao":
        return this.handleRenewal(command);
      case "cancelamento":
        return this.handleCancellation(command);
      case "reativacao":
        return this.handleReactivation(command);
      case "trial":
        return this.handleTrial(command);
      default:
        return new ValidationError("INVALID_TYPE", `Tipo de checkout invalido: ${command.tipo}`);
    }
  }

  private async handleNewSubscription(
    command: IniciarCheckoutCommand,
  ): Promise<CheckoutDto | ApplicationError> {
    if (!command.planId)
      return new ValidationError("PLAN_ID_REQUIRED", "PlanId obrigatorio para nova assinatura");

    const existing = await this.subscriptionRepo.findSubscriptionsByUser(command.userId);
    if (existing.some((s) => s.isActive || s.isTrial)) {
      return new ValidationError("ALREADY_ACTIVE", "Usuario ja possui assinatura ativa");
    }

    const plan = await this.subscriptionRepo.findPlanById(command.planId);
    if (!plan) return new NotFoundError("Plan", command.planId);

    const checkoutId = generateCheckoutId();

    if (plan.monthlyPrice === 0) {
      const sub = Subscription.create({
        id: SubscriptionId.generate(),
        planId: command.planId,
        userId: command.userId,
        startDate: new Date(),
        endDate: null,
        trialEndDate: null,
        status: "ACTIVE",
      });
      await this.subscriptionRepo.saveSubscription(sub);
      this.checkouts.set(checkoutId, { command, status: "APPROVED" });

      return {
        checkoutId,
        userId: command.userId,
        tipo: "nova_assinatura",
        status: "APPROVED",
        planId: command.planId,
        planName: plan.name,
        amount: 0,
        subscriptionId: sub.id.value,
        provider: "mock",
        message: "Plano gratuito ativado com sucesso.",
        proximaAcao: "redirecionar_dashboard",
      };
    }

    const result = await this.paymentGateway.charge(
      SubscriptionId.generate().value,
      plan.monthlyPrice,
    );

    if (!result.success) {
      this.checkouts.set(checkoutId, { command, status: "DECLINED" });
      return {
        checkoutId,
        userId: command.userId,
        tipo: "nova_assinatura",
        status: "DECLINED",
        planId: command.planId,
        planName: plan.name,
        amount: plan.monthlyPrice,
        transactionId: result.transactionId,
        provider: "mock",
        message: result.error ?? "Pagamento recusado.",
      };
    }

    const sub = Subscription.create({
      id: SubscriptionId.generate(),
      planId: command.planId,
      userId: command.userId,
      startDate: new Date(),
      endDate: null,
      trialEndDate: null,
      status: "ACTIVE",
    });
    await this.subscriptionRepo.saveSubscription(sub);

    const cycle = BillingCycle.create({
      id: BillingCycleId.generate(),
      subscriptionId: sub.id.value,
      periodStart: new Date(),
      periodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      amount: plan.monthlyPrice,
      status: "PAID",
      simulatedAt: new Date(),
    });
    await this.subscriptionRepo.saveBillingCycle(cycle);

    this.checkouts.set(checkoutId, { command, status: "APPROVED" });

    return {
      checkoutId,
      userId: command.userId,
      tipo: "nova_assinatura",
      status: "APPROVED",
      planId: command.planId,
      planName: plan.name,
      amount: plan.monthlyPrice,
      subscriptionId: sub.id.value,
      transactionId: result.transactionId,
      provider: "mock",
      message: `Assinatura ${plan.name} ativada com sucesso.`,
      proximaAcao: "redirecionar_dashboard",
    };
  }

  private async handleUpgrade(
    command: IniciarCheckoutCommand,
  ): Promise<CheckoutDto | ApplicationError> {
    if (!command.planId || !command.subscriptionId) {
      return new ValidationError(
        "INVALID_INPUT",
        "PlanId e SubscriptionId obrigatorios para upgrade",
      );
    }

    const sub = await this.subscriptionRepo.findSubscriptionById(command.subscriptionId);
    if (!sub) return new NotFoundError("Subscription", command.subscriptionId);
    if (!sub.isActive) return new ValidationError("NOT_ACTIVE", "Assinatura nao esta ativa");

    const newPlan = await this.subscriptionRepo.findPlanById(command.planId);
    if (!newPlan) return new NotFoundError("Plan", command.planId);

    const upgraded = sub.upgrade(command.planId);
    await this.subscriptionRepo.saveSubscription(upgraded);

    return {
      checkoutId: generateCheckoutId(),
      userId: command.userId,
      tipo: "upgrade",
      status: "APPROVED",
      planId: command.planId,
      planName: newPlan.name,
      amount: newPlan.monthlyPrice,
      subscriptionId: upgraded.id.value,
      provider: "mock",
      message: `Upgrade para ${newPlan.name} realizado com sucesso.`,
      proximaAcao: "redirecionar_assinaturas",
    };
  }

  private async handleDowngrade(
    command: IniciarCheckoutCommand,
  ): Promise<CheckoutDto | ApplicationError> {
    if (!command.planId || !command.subscriptionId) {
      return new ValidationError(
        "INVALID_INPUT",
        "PlanId e SubscriptionId obrigatorios para downgrade",
      );
    }

    const sub = await this.subscriptionRepo.findSubscriptionById(command.subscriptionId);
    if (!sub) return new NotFoundError("Subscription", command.subscriptionId);

    const newPlan = await this.subscriptionRepo.findPlanById(command.planId);
    if (!newPlan) return new NotFoundError("Plan", command.planId);

    const downgraded = sub.downgrade(
      command.planId,
      new Date(new Date().setMonth(new Date().getMonth() + 1)),
    );
    await this.subscriptionRepo.saveSubscription(downgraded);

    return {
      checkoutId: generateCheckoutId(),
      userId: command.userId,
      tipo: "downgrade",
      status: "APPROVED",
      planId: command.planId,
      planName: newPlan.name,
      amount: newPlan.monthlyPrice,
      subscriptionId: downgraded.id.value,
      provider: "mock",
      message: `Downgrade para ${newPlan.name} agendado para o final do periodo.`,
      proximaAcao: "redirecionar_assinaturas",
    };
  }

  private async handleRenewal(
    command: IniciarCheckoutCommand,
  ): Promise<CheckoutDto | ApplicationError> {
    if (!command.subscriptionId) {
      return new ValidationError(
        "SUBSCRIPTION_ID_REQUIRED",
        "SubscriptionId obrigatorio para renovacao",
      );
    }

    const sub = await this.subscriptionRepo.findSubscriptionById(command.subscriptionId);
    if (!sub) return new NotFoundError("Subscription", command.subscriptionId);
    if (!sub.isActive)
      return new ValidationError("NOT_ACTIVE", "Assinatura nao esta ativa para renovacao");

    const plan = await this.subscriptionRepo.findPlanById(sub.planId);
    if (!plan) return new NotFoundError("Plan", sub.planId);

    const result = await this.paymentGateway.charge(sub.id.value, plan.monthlyPrice);

    if (!result.success) {
      return {
        checkoutId: generateCheckoutId(),
        userId: command.userId,
        tipo: "renovacao",
        status: "DECLINED",
        planId: sub.planId,
        planName: plan.name,
        amount: plan.monthlyPrice,
        transactionId: result.transactionId,
        provider: "mock",
        message: result.error ?? "Renovacao recusada.",
      };
    }

    const renewed = sub.renew(1);
    await this.subscriptionRepo.saveSubscription(renewed);

    const cycle = BillingCycle.create({
      id: BillingCycleId.generate(),
      subscriptionId: renewed.id.value,
      periodStart: new Date(),
      periodEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      amount: plan.monthlyPrice,
      status: "PAID",
      simulatedAt: new Date(),
    });
    await this.subscriptionRepo.saveBillingCycle(cycle);

    return {
      checkoutId: generateCheckoutId(),
      userId: command.userId,
      tipo: "renovacao",
      status: "APPROVED",
      planId: sub.planId,
      planName: plan.name,
      amount: plan.monthlyPrice,
      subscriptionId: renewed.id.value,
      transactionId: result.transactionId,
      provider: "mock",
      message: "Assinatura renovada com sucesso.",
      proximaAcao: "redirecionar_assinaturas",
    };
  }

  private async handleCancellation(
    command: IniciarCheckoutCommand,
  ): Promise<CheckoutDto | ApplicationError> {
    const subs = await this.subscriptionRepo.findSubscriptionsByUser(command.userId);
    const active = subs.find((s) => s.isActive);
    if (!active) return new NotFoundError("ActiveSubscription", command.userId);

    const cancelled = active.cancel();
    await this.subscriptionRepo.saveSubscription(cancelled);

    await this.paymentGateway.cancel(active.id.value);

    return {
      checkoutId: generateCheckoutId(),
      userId: command.userId,
      tipo: "cancelamento",
      status: "APPROVED",
      planId: active.planId,
      subscriptionId: cancelled.id.value,
      amount: 0,
      provider: "mock",
      message: "Assinatura cancelada. O acesso permanece ate o final do periodo atual.",
      proximaAcao: "redirecionar_assinaturas",
    };
  }

  private async handleReactivation(
    command: IniciarCheckoutCommand,
  ): Promise<CheckoutDto | ApplicationError> {
    const subs = await this.subscriptionRepo.findSubscriptionsByUser(command.userId);
    const cancelled = subs.find((s) => s.isCancelled);
    if (!cancelled) return new NotFoundError("CancelledSubscription", command.userId);

    const activated = cancelled.activate();
    await this.subscriptionRepo.saveSubscription(activated);

    return {
      checkoutId: generateCheckoutId(),
      userId: command.userId,
      tipo: "reativacao",
      status: "APPROVED",
      planId: activated.planId,
      subscriptionId: activated.id.value,
      amount: 0,
      provider: "mock",
      message: "Assinatura reativada com sucesso.",
      proximaAcao: "redirecionar_assinaturas",
    };
  }

  private async handleTrial(
    command: IniciarCheckoutCommand,
  ): Promise<CheckoutDto | ApplicationError> {
    if (!command.planId)
      return new ValidationError("PLAN_ID_REQUIRED", "PlanId obrigatorio para trial");

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
      trialDurationDays: 14,
    });
    await this.subscriptionRepo.saveSubscription(sub);

    return {
      checkoutId: generateCheckoutId(),
      userId: command.userId,
      tipo: "trial",
      status: "APPROVED",
      planId: command.planId,
      planName: plan.name,
      amount: 0,
      subscriptionId: sub.id.value,
      provider: "mock",
      message: "Periodo de trial de 14 dias iniciado. Aproveite todos os recursos Premium!",
      proximaAcao: "redirecionar_dashboard",
    };
  }
}
