import { describe, it, expect, vi, beforeEach } from "vitest";
import { BillingJobService } from "@/application/services/billing-job-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { IPaymentGateway } from "@/application/gateways/payment-gateway";
import {
  Plan,
  Subscription,
  BillingCycle,
  PlanId,
  SubscriptionId,
  BillingCycleId,
} from "@/core/domain/subscriptions";

function createActiveSubscription(
  overrides?: Partial<{
    id: string;
    planId: string;
    userId: string;
  }>,
): Subscription {
  return Subscription.create({
    id: SubscriptionId.create(overrides?.id ?? "sub-001"),
    planId: overrides?.planId ?? "plan-premium",
    userId: overrides?.userId ?? "user-001",
    startDate: new Date("2026-01-01"),
    endDate: null,
    status: "ACTIVE",
  });
}

function createPremiumPlan(): Plan {
  return Plan.create({
    id: PlanId.create("plan-premium"),
    name: "Premium",
    tier: "PREMIUM",
    monthlyPrice: 29.9,
    description: "Plano premium",
    capabilities: ["read", "write", "admin"],
  });
}

function createBasicPlan(): Plan {
  return Plan.create({
    id: PlanId.create("plan-basic"),
    name: "Basic",
    tier: "BASIC",
    monthlyPrice: 9.9,
    description: "Plano basico",
    capabilities: ["read", "write"],
  });
}

describe("BillingJobService", () => {
  let repo: ISubscriptionRepository;
  let gateway: IPaymentGateway;

  beforeEach(() => {
    repo = {
      ObterPlanoAtivo: vi.fn(),
      Salvar: vi.fn(),
      ListarPlanosDisponiveis: vi.fn().mockResolvedValue([]),
      savePlan: vi.fn(),
      findPlanById: vi.fn(),
      findAllPlans: vi.fn().mockResolvedValue([]),
      saveSubscription: vi.fn(),
      findSubscriptionsByUser: vi.fn().mockResolvedValue([]),
      findAllActiveSubscriptions: vi.fn(),
      findSubscriptionById: vi.fn(),
      saveBillingCycle: vi.fn(),
      findBillingCyclesBySubscription: vi.fn().mockResolvedValue([]),
    };

    gateway = {
      charge: vi.fn(),
      cancel: vi.fn(),
      refund: vi.fn(),
    };
  });

  describe("processMonthlyBilling", () => {
    it("charges all active subscriptions and returns PAID on success", async () => {
      const sub = createActiveSubscription();
      vi.mocked(repo.findAllActiveSubscriptions!).mockResolvedValue([sub]);
      vi.mocked(repo.findPlanById!).mockResolvedValue(createPremiumPlan());
      vi.mocked(gateway.charge!).mockResolvedValue({
        success: true,
        transactionId: "tx-001",
        status: "PAID",
      });

      const service = new BillingJobService(repo, gateway);
      const result = await service.processMonthlyBilling();

      expect(result.totalProcessed).toBe(1);
      expect(result.successful).toBe(1);
      expect(result.failed).toBe(0);
      expect(result.cancelled).toBe(0);
      expect(gateway.charge).toHaveBeenCalledWith(sub.id.value, 29.9);
      expect(repo.saveBillingCycle).toHaveBeenCalledTimes(1);
      const savedCycle = vi.mocked(repo.saveBillingCycle).mock.calls[0][0];
      expect(savedCycle.status).toBe("PAID");
      expect(savedCycle.amount).toBe(29.9);
    });

    it("returns PAID for subscriptions without a plan", async () => {
      const sub = createActiveSubscription();
      vi.mocked(repo.findAllActiveSubscriptions!).mockResolvedValue([sub]);
      vi.mocked(repo.findPlanById!).mockResolvedValue(null);

      const service = new BillingJobService(repo, gateway);
      const result = await service.processMonthlyBilling();

      expect(result.totalProcessed).toBe(1);
      expect(result.successful).toBe(0);
      expect(result.failed).toBe(0);
      expect(gateway.charge).not.toHaveBeenCalled();
    });

    it("skips subscriptions already with a PAID cycle this period", async () => {
      const sub = createActiveSubscription();
      const now = new Date();
      const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const paidCycle = BillingCycle.create({
        id: BillingCycleId.generate(),
        subscriptionId: sub.id.value,
        periodStart,
        periodEnd: new Date(now.getFullYear(), now.getMonth() + 1, 0),
        amount: 29.9,
        status: "PAID",
        simulatedAt: now,
      });

      vi.mocked(repo.findAllActiveSubscriptions!).mockResolvedValue([sub]);
      vi.mocked(repo.findPlanById!).mockResolvedValue(createPremiumPlan());
      vi.mocked(repo.findBillingCyclesBySubscription!).mockResolvedValue([paidCycle]);

      const service = new BillingJobService(repo, gateway);
      const result = await service.processMonthlyBilling();

      expect(result.totalProcessed).toBe(1);
      expect(result.successful).toBe(0);
      expect(gateway.charge).not.toHaveBeenCalled();
    });

    it("retries 3 times on failure and cancels subscription", async () => {
      const sub = createActiveSubscription();
      vi.mocked(repo.findAllActiveSubscriptions!).mockResolvedValue([sub]);
      vi.mocked(repo.findPlanById!).mockResolvedValue(createPremiumPlan());
      vi.mocked(gateway.charge!).mockResolvedValue({
        success: false,
        transactionId: "",
        status: "FAILED",
        error: "Payment declined",
      });
      vi.mocked(repo.findSubscriptionById!).mockResolvedValue(sub);

      const service = new BillingJobService(repo, gateway);
      const result = await service.processMonthlyBilling();

      expect(result.totalProcessed).toBe(1);
      expect(result.successful).toBe(0);
      expect(result.failed).toBe(0);
      expect(result.cancelled).toBe(1);
      expect(gateway.charge).toHaveBeenCalledTimes(3);
      expect(repo.saveBillingCycle).toHaveBeenCalledTimes(3);
      const savedCycles = vi.mocked(repo.saveBillingCycle).mock.calls.map((c) => c[0]);
      savedCycles.forEach((cycle) => {
        expect(cycle.status).toBe("FAILED");
      });
      expect(repo.saveSubscription).toHaveBeenCalledTimes(1);
      const savedSub = vi.mocked(repo.saveSubscription).mock.calls[0][0];
      expect(savedSub.status).toBe("CANCELLED");
    });

    it("retries and succeeds on second attempt", async () => {
      const sub = createActiveSubscription();
      vi.mocked(repo.findAllActiveSubscriptions!).mockResolvedValue([sub]);
      vi.mocked(repo.findPlanById!).mockResolvedValue(createPremiumPlan());
      vi.mocked(gateway.charge!)
        .mockResolvedValueOnce({
          success: false,
          transactionId: "",
          status: "FAILED",
          error: "Network error",
        })
        .mockResolvedValueOnce({
          success: true,
          transactionId: "tx-002",
          status: "PAID",
        });

      const service = new BillingJobService(repo, gateway);
      const result = await service.processMonthlyBilling();

      expect(result.totalProcessed).toBe(1);
      expect(result.successful).toBe(1);
      expect(result.failed).toBe(0);
      expect(result.cancelled).toBe(0);
      expect(gateway.charge).toHaveBeenCalledTimes(2);
      expect(repo.saveBillingCycle).toHaveBeenCalledTimes(2);

      const cycles = vi.mocked(repo.saveBillingCycle).mock.calls.map((c) => c[0]);
      expect(cycles[0].status).toBe("FAILED");
      expect(cycles[1].status).toBe("PAID");
    });

    it("processes multiple subscriptions in one batch", async () => {
      const sub1 = createActiveSubscription({ id: "sub-001", userId: "user-001" });
      const sub2 = createActiveSubscription({ id: "sub-002", userId: "user-002" });
      const sub3 = createActiveSubscription({
        id: "sub-003",
        userId: "user-003",
        planId: "plan-basic",
      });

      vi.mocked(repo.findAllActiveSubscriptions!).mockResolvedValue([sub1, sub2, sub3]);
      vi.mocked(repo.findPlanById!).mockImplementation((planId) => {
        if (planId === "plan-premium") return Promise.resolve(createPremiumPlan());
        if (planId === "plan-basic") return Promise.resolve(createBasicPlan());
        return Promise.resolve(null);
      });
      vi.mocked(gateway.charge!).mockResolvedValue({
        success: true,
        transactionId: "tx-001",
        status: "PAID",
      });

      const service = new BillingJobService(repo, gateway);
      const result = await service.processMonthlyBilling();

      expect(result.totalProcessed).toBe(3);
      expect(result.successful).toBe(3);
      expect(gateway.charge).toHaveBeenCalledTimes(3);
      expect(repo.saveBillingCycle).toHaveBeenCalledTimes(3);
    });

    it("handles gateway throwing an error gracefully", async () => {
      const sub = createActiveSubscription();
      vi.mocked(repo.findAllActiveSubscriptions!).mockResolvedValue([sub]);
      vi.mocked(repo.findPlanById!).mockResolvedValue(createPremiumPlan());
      vi.mocked(gateway.charge!).mockRejectedValue(new Error("Connection failed"));

      const service = new BillingJobService(repo, gateway);
      const result = await service.processMonthlyBilling();

      expect(result.totalProcessed).toBe(1);
      expect(result.successful).toBe(0);
      expect(result.failed).toBe(0);
      expect(result.cancelled).toBe(1);
      expect(gateway.charge).toHaveBeenCalledTimes(3);
    });
  });
});
