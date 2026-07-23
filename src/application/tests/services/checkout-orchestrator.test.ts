import { describe, it, expect, vi } from "vitest";
import { CheckoutOrchestrator } from "@/application/services/checkout-orchestrator";
import { AssinarPlanoService } from "@/application/services/assinar-plano-service";
import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { IPaymentGateway } from "@/application/gateways/payment-gateway";
import { ApplicationError, ValidationError } from "@/application/errors/application-error";
import { Plan, PlanId } from "@/core/domain/subscriptions";

function createRepo(): ISubscriptionRepository {
  return {
    ObterPlanoAtivo: vi.fn(),
    Salvar: vi.fn(),
    ListarPlanosDisponiveis: vi.fn().mockResolvedValue([]),
    savePlan: vi.fn(),
    findPlanById: vi.fn(),
    findAllPlans: vi.fn().mockResolvedValue([]),
    saveSubscription: vi.fn(),
    findSubscriptionsByUser: vi.fn().mockResolvedValue([]),
    findAllActiveSubscriptions: vi.fn().mockResolvedValue([]),
    findSubscriptionById: vi.fn(),
    saveBillingCycle: vi.fn(),
    findBillingCyclesBySubscription: vi.fn().mockResolvedValue([]),
  };
}

function createGateway(): IPaymentGateway {
  return {
    charge: vi.fn(),
    cancel: vi.fn(),
    refund: vi.fn(),
  };
}

describe("CheckoutOrchestrator", () => {
  it("returns success with subscription when AssinarPlanoService succeeds", async () => {
    const plan = Plan.create({
      id: PlanId.create("plan-premium"),
      name: "Premium",
      tier: "PREMIUM",
      monthlyPrice: 29.9,
      description: "Plano premium",
      capabilities: ["read", "write"],
    });

    const repo = createRepo();
    vi.mocked(repo.findPlanById!).mockResolvedValue(plan);
    vi.mocked(repo.saveSubscription!).mockResolvedValue(undefined);

    const gateway = createGateway();
    vi.mocked(gateway.charge!).mockResolvedValue({
      success: true,
      transactionId: "tx-001",
      status: "PAID",
    });

    const assinarService = new AssinarPlanoService(repo, undefined, gateway);
    const orchestrator = new CheckoutOrchestrator(assinarService);

    const result = await orchestrator.execute({
      userId: "user-001",
      planId: "plan-premium",
      paymentMethodId: "pm_card_visa",
    });

    expect(result.success).toBe(true);
    expect(result.subscription).toBeDefined();
    expect(result.subscription!.planName).toBe("Premium");
    expect(result.subscription!.status).toBe("ACTIVE");
    expect(result.error).toBeUndefined();
  });

  it("returns error when plan is not found", async () => {
    const repo = createRepo();
    vi.mocked(repo.findPlanById!).mockResolvedValue(null);

    const gateway = createGateway();
    const assinarService = new AssinarPlanoService(repo, undefined, gateway);
    const orchestrator = new CheckoutOrchestrator(assinarService);

    const result = await orchestrator.execute({
      userId: "user-001",
      planId: "plan-inexistente",
      paymentMethodId: "pm_card_visa",
    });

    expect(result.success).toBe(false);
    expect(result.subscription).toBeUndefined();
    expect(result.error).toBeInstanceOf(ApplicationError);
  });

  it("returns error when payment fails", async () => {
    const plan = Plan.create({
      id: PlanId.create("plan-premium"),
      name: "Premium",
      tier: "PREMIUM",
      monthlyPrice: 29.9,
      description: "Plano premium",
      capabilities: ["read", "write"],
    });

    const repo = createRepo();
    vi.mocked(repo.findPlanById!).mockResolvedValue(plan);
    vi.mocked(repo.saveSubscription!).mockResolvedValue(undefined);

    const gateway = createGateway();
    vi.mocked(gateway.charge!).mockResolvedValue({
      success: false,
      transactionId: "",
      status: "FAILED",
      error: "Cartao recusado",
    });

    const assinarService = new AssinarPlanoService(repo, undefined, gateway);
    const orchestrator = new CheckoutOrchestrator(assinarService);

    const result = await orchestrator.execute({
      userId: "user-001",
      planId: "plan-premium",
      paymentMethodId: "pm_card_visa",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(ApplicationError);
    expect((result.error as ValidationError).code).toBe("PAYMENT_FAILED");
  });

  it("returns error when input is invalid", async () => {
    const repo = createRepo();

    const assinarService = new AssinarPlanoService(repo);
    const orchestrator = new CheckoutOrchestrator(assinarService);

    const result = await orchestrator.execute({
      userId: "",
      planId: "",
      paymentMethodId: "pm_card_visa",
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeInstanceOf(ApplicationError);
  });

  it("returns success with free plan (no payment)", async () => {
    const plan = Plan.create({
      id: PlanId.create("plan-free"),
      name: "Free",
      tier: "FREE",
      monthlyPrice: 0,
      description: "Plano gratuito",
      capabilities: ["read"],
    });

    const repo = createRepo();
    vi.mocked(repo.findPlanById!).mockResolvedValue(plan);
    vi.mocked(repo.saveSubscription!).mockResolvedValue(undefined);

    const assinarService = new AssinarPlanoService(repo);
    const orchestrator = new CheckoutOrchestrator(assinarService);

    const result = await orchestrator.execute({
      userId: "user-001",
      planId: "plan-free",
      paymentMethodId: "",
    });

    expect(result.success).toBe(true);
    expect(result.subscription).toBeDefined();
    expect(result.subscription!.tier).toBe("FREE");
    expect(result.error).toBeUndefined();
  });
});
