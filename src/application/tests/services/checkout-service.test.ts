import { describe, it, expect, beforeEach } from "vitest";
import { CheckoutService } from "@/application/services/checkout-service";
import { FakeSubscriptionRepository } from "@/infrastructure/fakes/fake-subscription-repository";
import { MockPaymentGateway } from "@/infrastructure/gateways/mock-payment-gateway";
import { Plan, PlanId } from "@/core/domain/subscriptions";
import type { IniciarCheckoutCommand } from "@/application/commands/iniciar-checkout";

describe("CheckoutService", () => {
  let repo: FakeSubscriptionRepository;
  let gateway: MockPaymentGateway;
  let service: CheckoutService;

  beforeEach(async () => {
    repo = new FakeSubscriptionRepository();
    gateway = new MockPaymentGateway();
    service = new CheckoutService(repo, gateway);

    await repo.savePlan(
      Plan.create({
        id: PlanId.create("free"),
        name: "Free",
        tier: "FREE",
        monthlyPrice: 0,
        description: "Gratuito",
        capabilities: ["*"],
      }),
    );
    await repo.savePlan(
      Plan.create({
        id: PlanId.create("basic"),
        name: "Basic",
        tier: "BASIC",
        monthlyPrice: 1990,
        description: "Basico",
        capabilities: ["*"],
      }),
    );
    await repo.savePlan(
      Plan.create({
        id: PlanId.create("premium"),
        name: "Premium",
        tier: "PREMIUM",
        monthlyPrice: 4990,
        description: "Premium",
        capabilities: ["*"],
      }),
    );
  });

  it("cria nova assinatura gratuita sem cobranca", async () => {
    const cmd: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-1",
      tipo: "nova_assinatura",
      planId: "free",
    };
    const result = await service.Execute(cmd);
    expect(result).not.toBeInstanceOf(Error);
    if (result instanceof Error) return;
    expect(result.status).toBe("APPROVED");
    expect(result.amount).toBe(0);
  });

  it("cria nova assinatura paga com sucesso", async () => {
    gateway.setBehavior("approve");
    const cmd: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-2",
      tipo: "nova_assinatura",
      planId: "basic",
    };
    const result = await service.Execute(cmd);
    if (result instanceof Error) return;
    expect(result.status).toBe("APPROVED");
    expect(result.amount).toBe(1990);
    expect(result.subscriptionId).toBeDefined();
    expect(result.transactionId).toBeDefined();
  });

  it("recusa pagamento quando gateway declina", async () => {
    gateway.setBehavior("decline");
    const cmd: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-3",
      tipo: "nova_assinatura",
      planId: "basic",
    };
    const result = await service.Execute(cmd);
    if (result instanceof Error) return;
    expect(result.status).toBe("DECLINED");
    expect(result.message).toContain("recusado");
  });

  it("rejeita nova assinatura se usuario ja tem ativa", async () => {
    gateway.setBehavior("approve");
    const cmd1: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-4",
      tipo: "nova_assinatura",
      planId: "basic",
    };
    await service.Execute(cmd1);

    const cmd2: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-4",
      tipo: "nova_assinatura",
      planId: "premium",
    };
    const result2 = await service.Execute(cmd2);
    expect(result2).toBeInstanceOf(Error);
  });

  it("realiza upgrade de plano", async () => {
    gateway.setBehavior("approve");
    await service.Execute({
      type: "IniciarCheckoutCommand",
      userId: "user-5",
      tipo: "nova_assinatura",
      planId: "basic",
    });
    const subs = await repo.findSubscriptionsByUser("user-5");
    const active = subs.find((s) => s.isActive);

    const upgradeCmd: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-5",
      tipo: "upgrade",
      planId: "premium",
      subscriptionId: active?.id.value,
    };
    const result = await service.Execute(upgradeCmd);
    if (result instanceof Error) return;
    expect(result.status).toBe("APPROVED");
    expect(result.tipo).toBe("upgrade");
    expect(result.planId).toBe("premium");
  });

  it("realiza downgrade de plano", async () => {
    gateway.setBehavior("approve");
    await service.Execute({
      type: "IniciarCheckoutCommand",
      userId: "user-6",
      tipo: "nova_assinatura",
      planId: "premium",
    });
    const subs = await repo.findSubscriptionsByUser("user-6");
    const active = subs.find((s) => s.isActive);

    const downgradeCmd: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-6",
      tipo: "downgrade",
      planId: "basic",
      subscriptionId: active?.id.value,
    };
    const result = await service.Execute(downgradeCmd);
    if (result instanceof Error) return;
    expect(result.status).toBe("APPROVED");
    expect(result.tipo).toBe("downgrade");
  });

  it("cancela assinatura", async () => {
    gateway.setBehavior("approve");
    await service.Execute({
      type: "IniciarCheckoutCommand",
      userId: "user-7",
      tipo: "nova_assinatura",
      planId: "basic",
    });

    const cancelCmd: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-7",
      tipo: "cancelamento",
    };
    const result = await service.Execute(cancelCmd);
    if (result instanceof Error) return;
    expect(result.status).toBe("APPROVED");
    expect(result.tipo).toBe("cancelamento");
  });

  it("reativa assinatura cancelada", async () => {
    gateway.setBehavior("approve");
    await service.Execute({
      type: "IniciarCheckoutCommand",
      userId: "user-8",
      tipo: "nova_assinatura",
      planId: "basic",
    });
    await service.Execute({
      type: "IniciarCheckoutCommand",
      userId: "user-8",
      tipo: "cancelamento",
    });

    const reativarCmd: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-8",
      tipo: "reativacao",
    };
    const result = await service.Execute(reativarCmd);
    if (result instanceof Error) return;
    expect(result.status).toBe("APPROVED");
    expect(result.tipo).toBe("reativacao");
  });

  it("inicia trial", async () => {
    const cmd: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-9",
      tipo: "trial",
      planId: "premium",
    };
    const result = await service.Execute(cmd);
    if (result instanceof Error) return;
    expect(result.status).toBe("APPROVED");
    expect(result.tipo).toBe("trial");
    expect(result.message).toContain("14 dias");
  });

  it("valida plano inexistente", async () => {
    const cmd: IniciarCheckoutCommand = {
      type: "IniciarCheckoutCommand",
      userId: "user-10",
      tipo: "nova_assinatura",
      planId: "plano-inexistente",
    };
    const result = await service.Execute(cmd);
    expect(result).toBeInstanceOf(Error);
  });
});
