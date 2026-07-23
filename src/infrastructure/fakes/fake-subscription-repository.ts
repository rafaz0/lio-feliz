import type { ISubscriptionRepository, Assinatura, PlanoDto } from "@/application/ports";
import {
  Plan,
  Subscription,
  BillingCycle,
  PlanId,
  SubscriptionId,
  type PlanTier,
} from "@/core/domain/subscriptions";

export class FakeSubscriptionRepository implements ISubscriptionRepository {
  private assinaturas = new Map<string, Assinatura>();
  private domainPlans = new Map<string, Plan>();
  private domainSubscriptions = new Map<string, Subscription>();
  private billingCycles = new Map<string, BillingCycle>();
  private planos: PlanoDto[] = [];

  async ObterPlanoAtivo(usuarioId: string): Promise<Assinatura | null> {
    return this.assinaturas.get(usuarioId) ?? null;
  }

  async Salvar(assinatura: Assinatura): Promise<void> {
    this.assinaturas.set(assinatura.usuarioId, assinatura);
  }

  async ListarPlanosDisponiveis(): Promise<PlanoDto[]> {
    return this.planos;
  }

  async savePlan(plan: Plan): Promise<void> {
    this.domainPlans.set(plan.id.value, plan);
  }

  async findPlanById(planId: string): Promise<Plan | null> {
    return this.domainPlans.get(planId) ?? null;
  }

  async findAllPlans(): Promise<Plan[]> {
    return Array.from(this.domainPlans.values());
  }

  async saveSubscription(subscription: Subscription): Promise<void> {
    this.domainSubscriptions.set(subscription.id.value, subscription);
  }

  async findSubscriptionsByUser(userId: string): Promise<Subscription[]> {
    return Array.from(this.domainSubscriptions.values()).filter((s) => s.userId === userId);
  }

  async findAllActiveSubscriptions(): Promise<Subscription[]> {
    return Array.from(this.domainSubscriptions.values()).filter((s) => s.isActive);
  }

  async findSubscriptionById(id: string): Promise<Subscription | null> {
    return this.domainSubscriptions.get(id) ?? null;
  }

  async saveBillingCycle(cycle: BillingCycle): Promise<void> {
    this.billingCycles.set(cycle.id.value, cycle);
  }

  async findBillingCyclesBySubscription(subscriptionId: string): Promise<BillingCycle[]> {
    return Array.from(this.billingCycles.values()).filter(
      (c) => c.subscriptionId === subscriptionId,
    );
  }

  setPlanos(planos: PlanoDto[]): void {
    this.planos = planos;
  }

  reset(): void {
    this.assinaturas.clear();
    this.domainPlans.clear();
    this.domainSubscriptions.clear();
    this.billingCycles.clear();
    this.planos = [];
  }
}
