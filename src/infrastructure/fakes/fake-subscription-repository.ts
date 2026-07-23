import type { ISubscriptionRepository, Assinatura, PlanoDto } from "@/application/ports";
import {
  Plan,
  Subscription,
  PlanId,
  SubscriptionId,
  type PlanTier,
} from "@/core/domain/subscriptions";

export class FakeSubscriptionRepository implements ISubscriptionRepository {
  private assinaturas = new Map<string, Assinatura>();
  private domainPlans = new Map<string, Plan>();
  private domainSubscriptions = new Map<string, Subscription>();
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

  setPlanos(planos: PlanoDto[]): void {
    this.planos = planos;
  }

  reset(): void {
    this.assinaturas.clear();
    this.domainPlans.clear();
    this.domainSubscriptions.clear();
    this.planos = [];
  }
}
