import { describe, it, expect, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { PaymentGatewayFactory } from "@/infrastructure/gateways/payment-gateway-factory";
import { MockPaymentGateway } from "@/infrastructure/gateways/mock-payment-gateway";
import { StripePaymentGateway } from "@/infrastructure/gateways/stripe-payment-gateway";
import { MercadoPagoPaymentGateway } from "@/infrastructure/gateways/mercado-pago-payment-gateway";
import { AsaasPaymentGateway } from "@/infrastructure/gateways/asaas-payment-gateway";

describe("PaymentGatewayFactory", () => {
  let factory: PaymentGatewayFactory;

  beforeEach(() => {
    factory = new PaymentGatewayFactory();
  });

  it("retorna MockPaymentGateway por padrao", () => {
    const gateway = factory.create();
    expect(gateway).toBeInstanceOf(MockPaymentGateway);
  });

  it("retorna MockPaymentGateway para provider=mock", () => {
    const gateway = factory.create("mock");
    expect(gateway).toBeInstanceOf(MockPaymentGateway);
  });

  it("retorna StripePaymentGateway para provider=stripe", () => {
    const gateway = factory.create("stripe");
    expect(gateway).toBeInstanceOf(StripePaymentGateway);
  });

  it("retorna MercadoPagoPaymentGateway para provider=mercadopago", () => {
    const gateway = factory.create("mercadopago");
    expect(gateway).toBeInstanceOf(MercadoPagoPaymentGateway);
  });

  it("StripePaymentGateway lanca NotImplemented", async () => {
    const gateway = factory.create("stripe");
    await expect(gateway.charge("sub-1", 100)).rejects.toThrow("Not Implemented");
    await expect(gateway.cancel("sub-1")).rejects.toThrow("Not Implemented");
    await expect(gateway.refund("tx-1")).rejects.toThrow("Not Implemented");
  });

  it("MercadoPagoPaymentGateway lanca NotImplemented", async () => {
    const gateway = factory.create("mercadopago");
    await expect(gateway.charge("sub-1", 100)).rejects.toThrow("Not Implemented");
    await expect(gateway.cancel("sub-1")).rejects.toThrow("Not Implemented");
    await expect(gateway.refund("tx-1")).rejects.toThrow("Not Implemented");
  });

  it("MockPaymentGateway processa charge com sucesso no modo approve", async () => {
    const gateway = factory.create("mock") as MockPaymentGateway;
    gateway.setBehavior("approve");
    const result = await gateway.charge("sub-1", 1000);
    expect(result.success).toBe(true);
    expect(result.status).toBe("PAID");
  });

  it("MockPaymentGateway falha charge no modo decline", async () => {
    const gateway = factory.create("mock") as MockPaymentGateway;
    gateway.setBehavior("decline");
    const result = await gateway.charge("sub-1", 1000);
    expect(result.success).toBe(false);
    expect(result.status).toBe("FAILED");
  });

  it("MockPaymentGateway rastreia transacoes", async () => {
    const gateway = factory.create("mock") as MockPaymentGateway;
    await gateway.charge("sub-1", 500);
    await gateway.charge("sub-2", 1000);
    const txns = gateway.getTransactions();
    expect(txns.length).toBe(2);
    expect(txns[0].amount).toBe(500);
    expect(txns[1].amount).toBe(1000);
  });

  it("getMockGateway retorna instancia do Mock", () => {
    const mock = factory.getMockGateway();
    expect(mock).toBeInstanceOf(MockPaymentGateway);
    expect(mock.getBehavior()).toBe("approve");
  });

  it("lanca erro ao pedir provider=asaas sem SupabaseClient no construtor", () => {
    expect(() => factory.create("asaas")).toThrow(/SupabaseClient/);
  });

  it("retorna AsaasPaymentGateway para provider=asaas quando ha SupabaseClient", () => {
    const fakeSupabase = {} as SupabaseClient;
    const factoryComSupabase = new PaymentGatewayFactory(fakeSupabase);

    const gateway = factoryComSupabase.create("asaas");

    expect(gateway).toBeInstanceOf(AsaasPaymentGateway);
  });
});
