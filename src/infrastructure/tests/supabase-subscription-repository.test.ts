import { describe, it, expect, vi, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Assinatura } from "@/application/ports";
import { SupabaseSubscriptionRepository } from "@/infrastructure/repositories/supabase-subscription-repository";
import {
  Plan,
  Subscription,
  BillingCycle,
  PlanId,
  SubscriptionId,
  BillingCycleId,
} from "@/core/domain/subscriptions";

function createMockSupabase() {
  const mockQuery = {
    select: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn(),
  };
  const mockFrom = vi.fn().mockReturnValue(mockQuery);
  return { supabase: { from: mockFrom } as unknown as SupabaseClient, mockQuery, mockFrom };
}

describe("SupabaseSubscriptionRepository", () => {
  let repo: SupabaseSubscriptionRepository;
  let mockQuery: ReturnType<typeof createMockSupabase>["mockQuery"];
  let mockFrom: ReturnType<typeof createMockSupabase>["mockFrom"];

  beforeEach(() => {
    const mock = createMockSupabase();
    repo = new SupabaseSubscriptionRepository(mock.supabase);
    mockQuery = mock.mockQuery;
    mockFrom = mock.mockFrom;
  });

  describe("ObterPlanoAtivo (geracao antiga, ainda usada por GerenciarAssinaturaService)", () => {
    it("retorna null quando nao ha assinatura ativa", async () => {
      mockQuery.maybeSingle.mockResolvedValue({ data: null, error: null });

      const result = await repo.ObterPlanoAtivo("user-1");

      expect(result).toBeNull();
      expect(mockFrom).toHaveBeenCalledWith("subscriptions");
      expect(mockQuery.eq).toHaveBeenCalledWith("user_id", "user-1");
      expect(mockQuery.eq).toHaveBeenCalledWith("status", "ACTIVE");
    });

    it("retorna assinatura com recursos do plano quando encontrada", async () => {
      mockQuery.maybeSingle
        .mockResolvedValueOnce({
          data: {
            id: "sub-1",
            plan_id: "premium",
            user_id: "user-1",
            start_date: "2026-01-01T00:00:00.000Z",
            end_date: null,
            trial_end_date: null,
            status: "ACTIVE",
          },
          error: null,
        })
        .mockResolvedValueOnce({
          data: {
            id: "premium",
            name: "Premium",
            tier: "PREMIUM",
            monthly_price: 49.9,
            description: "Completo",
            capabilities: ["*"],
          },
          error: null,
        });

      const result = await repo.ObterPlanoAtivo("user-1");

      expect(result).not.toBeNull();
      expect(result!.usuarioId).toBe("user-1");
      expect(result!.plano).toBe("premium");
      expect(result!.recursosLiberados).toEqual(["*"]);
      expect(result!.dataExpiracao).toBeNull();
    });
  });

  describe("Salvar (geracao antiga)", () => {
    it("executa upsert com id deterministico por usuario", async () => {
      mockQuery.upsert.mockResolvedValue({ error: null });

      const assinatura: Assinatura = {
        usuarioId: "user-1",
        plano: "basic",
        dataAtivacao: new Date("2026-01-01"),
        dataExpiracao: new Date("2027-01-01"),
        recursosLiberados: ["import"],
      };

      await repo.Salvar(assinatura);

      expect(mockQuery.upsert).toHaveBeenCalledTimes(1);
      const arg = mockQuery.upsert.mock.calls[0][0];
      expect(arg.id).toBe("legacy-user-1");
      expect(arg.user_id).toBe("user-1");
      expect(arg.plan_id).toBe("basic");
      expect(arg.status).toBe("ACTIVE");
    });

    it("lanca erro quando upsert falha", async () => {
      mockQuery.upsert.mockResolvedValue({ error: { message: "db error" } });

      const assinatura: Assinatura = {
        usuarioId: "user-1",
        plano: "basic",
        dataAtivacao: new Date(),
        dataExpiracao: null,
        recursosLiberados: [],
      };

      await expect(repo.Salvar(assinatura)).rejects.toThrow("db error");
    });
  });

  describe("ListarPlanosDisponiveis (geracao antiga)", () => {
    it("retorna planos mapeados da tabela subscription_plans", async () => {
      mockQuery.select.mockResolvedValue({
        data: [
          {
            id: "free",
            name: "Free",
            tier: "FREE",
            monthly_price: 0,
            description: "Gratis",
            capabilities: [],
          },
          {
            id: "premium",
            name: "Premium",
            tier: "PREMIUM",
            monthly_price: 49.9,
            description: "Completo",
            capabilities: ["*"],
          },
        ],
        error: null,
      });

      const result = await repo.ListarPlanosDisponiveis();

      expect(result).toHaveLength(2);
      expect(result[0].planoId).toBe("free");
      expect(result[1].precoMensal).toBe(49.9);
    });

    it("retorna array vazio quando sem dados", async () => {
      mockQuery.select.mockResolvedValue({ data: null, error: { message: "no data" } });

      const result = await repo.ListarPlanosDisponiveis();

      expect(result).toEqual([]);
    });
  });

  describe("savePlan / findPlanById / findAllPlans", () => {
    it("savePlan executa upsert com colunas corretas", async () => {
      mockQuery.upsert.mockResolvedValue({ error: null });

      const plan = Plan.create({
        id: PlanId.create("premium"),
        name: "Premium",
        tier: "PREMIUM",
        monthlyPrice: 49.9,
        description: "Completo",
        capabilities: ["*"],
      });

      await repo.savePlan(plan);

      const arg = mockQuery.upsert.mock.calls[0][0];
      expect(arg.id).toBe("premium");
      expect(arg.monthly_price).toBe(49.9);
      expect(arg.capabilities).toEqual(["*"]);
    });

    it("findPlanById retorna null quando nao encontrado", async () => {
      mockQuery.maybeSingle.mockResolvedValue({ data: null, error: null });

      const result = await repo.findPlanById("inexistente");

      expect(result).toBeNull();
    });

    it("findPlanById mapeia a row pro domínio Plan", async () => {
      mockQuery.maybeSingle.mockResolvedValue({
        data: {
          id: "basic",
          name: "Basic",
          tier: "BASIC",
          monthly_price: 19.9,
          description: "Avancado",
          capabilities: ["carteira:write"],
        },
        error: null,
      });

      const result = await repo.findPlanById("basic");

      expect(result).not.toBeNull();
      expect(result!.id.value).toBe("basic");
      expect(result!.tier).toBe("BASIC");
      expect(result!.monthlyPrice).toBe(19.9);
    });

    it("findAllPlans mapeia todas as rows", async () => {
      mockQuery.select.mockResolvedValue({
        data: [
          {
            id: "free",
            name: "Free",
            tier: "FREE",
            monthly_price: 0,
            description: "",
            capabilities: [],
          },
        ],
        error: null,
      });

      const result = await repo.findAllPlans();

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Plan);
    });
  });

  describe("saveSubscription / findSubscriptionsByUser / findAllActiveSubscriptions / findSubscriptionById", () => {
    it("saveSubscription executa upsert com colunas corretas", async () => {
      mockQuery.upsert.mockResolvedValue({ error: null });

      const subscription = Subscription.create({
        id: SubscriptionId.create("sub-1"),
        planId: "premium",
        userId: "user-1",
        startDate: new Date("2026-01-01"),
        endDate: null,
        trialEndDate: null,
        status: "ACTIVE",
      });

      await repo.saveSubscription(subscription);

      const arg = mockQuery.upsert.mock.calls[0][0];
      expect(arg.id).toBe("sub-1");
      expect(arg.plan_id).toBe("premium");
      expect(arg.user_id).toBe("user-1");
      expect(arg.status).toBe("ACTIVE");
    });

    it("findSubscriptionsByUser mapeia todas as assinaturas do usuario", async () => {
      mockQuery.eq.mockResolvedValue({
        data: [
          {
            id: "sub-1",
            plan_id: "premium",
            user_id: "user-1",
            start_date: "2026-01-01T00:00:00.000Z",
            end_date: null,
            trial_end_date: null,
            status: "ACTIVE",
          },
        ],
        error: null,
      });

      const result = await repo.findSubscriptionsByUser("user-1");

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(Subscription);
      expect(result[0].isActive).toBe(true);
    });

    it("findAllActiveSubscriptions filtra por status ACTIVE", async () => {
      mockQuery.eq.mockResolvedValue({ data: [], error: null });

      await repo.findAllActiveSubscriptions();

      expect(mockQuery.eq).toHaveBeenCalledWith("status", "ACTIVE");
    });

    it("findSubscriptionById retorna null quando nao encontrado", async () => {
      mockQuery.maybeSingle.mockResolvedValue({ data: null, error: null });

      const result = await repo.findSubscriptionById("sub-inexistente");

      expect(result).toBeNull();
    });
  });

  describe("saveBillingCycle / findBillingCyclesBySubscription", () => {
    it("saveBillingCycle executa upsert com colunas corretas", async () => {
      mockQuery.upsert.mockResolvedValue({ error: null });

      const cycle = BillingCycle.create({
        id: BillingCycleId.create("bill-1"),
        subscriptionId: "sub-1",
        periodStart: new Date("2026-01-01"),
        periodEnd: new Date("2026-01-31"),
        amount: 49.9,
        status: "PAID",
        simulatedAt: new Date("2026-01-01"),
      });

      await repo.saveBillingCycle(cycle);

      const arg = mockQuery.upsert.mock.calls[0][0];
      expect(arg.id).toBe("bill-1");
      expect(arg.subscription_id).toBe("sub-1");
      expect(arg.amount).toBe(49.9);
      expect(arg.status).toBe("PAID");
    });

    it("findBillingCyclesBySubscription mapeia as rows", async () => {
      mockQuery.eq.mockResolvedValue({
        data: [
          {
            id: "bill-1",
            subscription_id: "sub-1",
            period_start: "2026-01-01T00:00:00.000Z",
            period_end: "2026-01-31T00:00:00.000Z",
            amount: 49.9,
            status: "PAID",
            simulated_at: "2026-01-01T00:00:00.000Z",
          },
        ],
        error: null,
      });

      const result = await repo.findBillingCyclesBySubscription("sub-1");

      expect(result).toHaveLength(1);
      expect(result[0]).toBeInstanceOf(BillingCycle);
      expect(result[0].amount).toBe(49.9);
    });
  });
});
