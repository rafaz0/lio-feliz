import type { SupabaseClient } from "@supabase/supabase-js";
import type { ISubscriptionRepository, Assinatura, PlanoDto } from "@/application/ports";
import {
  Plan,
  Subscription,
  BillingCycle,
  PlanId,
  SubscriptionId,
  BillingCycleId,
  type PlanTier,
  type SubscriptionStatus,
  type BillingStatus,
} from "@/core/domain/subscriptions";

type PlanRow = {
  id: string;
  name: string;
  tier: string;
  monthly_price: number;
  description: string;
  capabilities: string[];
};

type SubscriptionRow = {
  id: string;
  plan_id: string;
  user_id: string;
  start_date: string;
  end_date: string | null;
  trial_end_date: string | null;
  status: string;
};

type BillingCycleRow = {
  id: string;
  subscription_id: string;
  period_start: string;
  period_end: string;
  amount: number;
  status: string;
  simulated_at: string;
};

export class SupabaseSubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  // --- Geração antiga (Assinatura/PlanoDto) — ainda usada de verdade por
  // GerenciarAssinaturaService (confirmado por busca no código, não é morta
  // como pareceu à primeira vista). Implementada como leitura/escrita sobre
  // as mesmas tabelas normalizadas da geração atual, não um schema paralelo.
  // "Salvar" não recebe um id de assinatura (o shape Assinatura não tem um)
  // — usa um id determinístico por usuário pra preservar a semântica de "uma
  // assinatura por usuário" que o FakeSubscriptionRepository já tinha (Map
  // chaveado por usuarioId).

  async ObterPlanoAtivo(usuarioId: string): Promise<Assinatura | null> {
    const { data, error } = await this.supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", usuarioId)
      .eq("status", "ACTIVE")
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    const row = data as unknown as SubscriptionRow;
    const plan = await this.findPlanById(row.plan_id);

    return {
      usuarioId: row.user_id,
      plano: row.plan_id,
      dataAtivacao: new Date(row.start_date),
      dataExpiracao: row.end_date ? new Date(row.end_date) : null,
      recursosLiberados: plan?.capabilities ?? [],
    };
  }

  async Salvar(assinatura: Assinatura): Promise<void> {
    const { error } = await this.supabase.from("subscriptions").upsert(
      {
        id: `legacy-${assinatura.usuarioId}`,
        plan_id: assinatura.plano,
        user_id: assinatura.usuarioId,
        start_date: assinatura.dataAtivacao.toISOString(),
        end_date: assinatura.dataExpiracao?.toISOString() ?? null,
        status:
          assinatura.dataExpiracao && assinatura.dataExpiracao <= new Date()
            ? "CANCELLED"
            : "ACTIVE",
      },
      { onConflict: "id" },
    );

    if (error) {
      throw new Error(`Failed to save subscription: ${error.message}`);
    }
  }

  async ListarPlanosDisponiveis(): Promise<PlanoDto[]> {
    const { data, error } = await this.supabase.from("subscription_plans").select("*");

    if (error || !data) {
      return [];
    }

    return (data as unknown as PlanRow[]).map((row) => ({
      planoId: row.id,
      nome: row.name,
      descricao: row.description,
      precoMensal: row.monthly_price,
      recursos: row.capabilities,
    }));
  }

  // --- Geração atual (Plan/Subscription/BillingCycle) — usada por
  // AssinarPlanoService, ObterPlanoAtivoService, BillingJobService.

  async savePlan(plan: Plan): Promise<void> {
    const { error } = await this.supabase.from("subscription_plans").upsert(
      {
        id: plan.id.value,
        name: plan.name,
        tier: plan.tier,
        monthly_price: plan.monthlyPrice,
        description: plan.description,
        capabilities: plan.capabilities,
      },
      { onConflict: "id" },
    );

    if (error) {
      throw new Error(`Failed to save plan: ${error.message}`);
    }
  }

  async findPlanById(planId: string): Promise<Plan | null> {
    const { data, error } = await this.supabase
      .from("subscription_plans")
      .select("*")
      .eq("id", planId)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return this.mapPlanRow(data as unknown as PlanRow);
  }

  async findAllPlans(): Promise<Plan[]> {
    const { data, error } = await this.supabase.from("subscription_plans").select("*");

    if (error || !data) {
      return [];
    }

    return (data as unknown as PlanRow[]).map((row) => this.mapPlanRow(row));
  }

  async saveSubscription(subscription: Subscription): Promise<void> {
    const { error } = await this.supabase.from("subscriptions").upsert(
      {
        id: subscription.id.value,
        plan_id: subscription.planId,
        user_id: subscription.userId,
        start_date: subscription.startDate.toISOString(),
        end_date: subscription.endDate?.toISOString() ?? null,
        trial_end_date: subscription.trialEndDate?.toISOString() ?? null,
        status: subscription.status,
      },
      { onConflict: "id" },
    );

    if (error) {
      throw new Error(`Failed to save subscription: ${error.message}`);
    }
  }

  async findSubscriptionsByUser(userId: string): Promise<Subscription[]> {
    const { data, error } = await this.supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", userId);

    if (error || !data) {
      return [];
    }

    return (data as unknown as SubscriptionRow[]).map((row) => this.mapSubscriptionRow(row));
  }

  async findAllActiveSubscriptions(): Promise<Subscription[]> {
    const { data, error } = await this.supabase
      .from("subscriptions")
      .select("*")
      .eq("status", "ACTIVE");

    if (error || !data) {
      return [];
    }

    return (data as unknown as SubscriptionRow[]).map((row) => this.mapSubscriptionRow(row));
  }

  async findSubscriptionById(id: string): Promise<Subscription | null> {
    const { data, error } = await this.supabase
      .from("subscriptions")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    return this.mapSubscriptionRow(data as unknown as SubscriptionRow);
  }

  async saveBillingCycle(cycle: BillingCycle): Promise<void> {
    const { error } = await this.supabase.from("billing_cycles").upsert(
      {
        id: cycle.id.value,
        subscription_id: cycle.subscriptionId,
        period_start: cycle.periodStart.toISOString(),
        period_end: cycle.periodEnd.toISOString(),
        amount: cycle.amount,
        status: cycle.status,
        simulated_at: cycle.simulatedAt.toISOString(),
      },
      { onConflict: "id" },
    );

    if (error) {
      throw new Error(`Failed to save billing cycle: ${error.message}`);
    }
  }

  async findBillingCyclesBySubscription(subscriptionId: string): Promise<BillingCycle[]> {
    const { data, error } = await this.supabase
      .from("billing_cycles")
      .select("*")
      .eq("subscription_id", subscriptionId);

    if (error || !data) {
      return [];
    }

    return (data as unknown as BillingCycleRow[]).map((row) =>
      BillingCycle.create({
        id: BillingCycleId.create(row.id),
        subscriptionId: row.subscription_id,
        periodStart: new Date(row.period_start),
        periodEnd: new Date(row.period_end),
        amount: row.amount,
        status: row.status as BillingStatus,
        simulatedAt: new Date(row.simulated_at),
      }),
    );
  }

  private mapPlanRow(row: PlanRow): Plan {
    return Plan.create({
      id: PlanId.create(row.id),
      name: row.name,
      tier: row.tier as PlanTier,
      monthlyPrice: row.monthly_price,
      description: row.description,
      capabilities: row.capabilities,
    });
  }

  private mapSubscriptionRow(row: SubscriptionRow): Subscription {
    return Subscription.create({
      id: SubscriptionId.create(row.id),
      planId: row.plan_id,
      userId: row.user_id,
      startDate: new Date(row.start_date),
      endDate: row.end_date ? new Date(row.end_date) : null,
      trialEndDate: row.trial_end_date ? new Date(row.trial_end_date) : null,
      status: row.status as SubscriptionStatus,
    });
  }
}
