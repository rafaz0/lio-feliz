import { describe, it, expect } from "vitest";
import { MockPaymentGateway } from "@/infrastructure/gateways/mock-payment-gateway";

describe("MockPaymentGateway - blockNonZeroCharges", () => {
  it("por padrao (sem argumento) aprova cobranca com valor > 0", async () => {
    const gateway = new MockPaymentGateway();
    const result = await gateway.charge("sub-1", 4990);
    expect(result.success).toBe(true);
    expect(result.status).toBe("PAID");
  });

  it("com blockNonZeroCharges=true, recusa cobranca com valor > 0", async () => {
    const gateway = new MockPaymentGateway(true);
    const result = await gateway.charge("sub-1", 4990);
    expect(result.success).toBe(false);
    expect(result.status).toBe("FAILED");
    expect(result.error).toContain("gateway de pagamento real");
  });

  it("com blockNonZeroCharges=true, ainda aprova cobranca com valor 0 (plano Free)", async () => {
    const gateway = new MockPaymentGateway(true);
    const result = await gateway.charge("sub-1", 0);
    expect(result.success).toBe(true);
    expect(result.status).toBe("PAID");
  });

  it("com blockNonZeroCharges=true, cobranca recusada fica registrada nas transacoes", async () => {
    const gateway = new MockPaymentGateway(true);
    await gateway.charge("sub-1", 4990);
    const txns = gateway.getTransactions();
    expect(txns.length).toBe(1);
    expect(txns[0].status).toBe("FAILED");
    expect(txns[0].amount).toBe(4990);
  });
});
