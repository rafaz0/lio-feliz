import type { IPaymentGateway } from "@/application/gateways/payment-gateway";
import { MockPaymentGateway } from "./mock-payment-gateway";
import { StripePaymentGateway } from "./stripe-payment-gateway";
import { MercadoPagoPaymentGateway } from "./mercado-pago-payment-gateway";

export type GatewayProvider = "mock" | "stripe" | "mercadopago";

const DEFAULT_PROVIDER: GatewayProvider = "mock";

export class PaymentGatewayFactory {
  private readonly mock: MockPaymentGateway;
  private readonly stripe: StripePaymentGateway;
  private readonly mercadopago: MercadoPagoPaymentGateway;

  constructor() {
    this.mock = new MockPaymentGateway();
    this.stripe = new StripePaymentGateway();
    this.mercadopago = new MercadoPagoPaymentGateway();
  }

  create(provider?: GatewayProvider): IPaymentGateway {
    switch (provider ?? this.resolveProvider()) {
      case "stripe":
        return this.stripe;
      case "mercadopago":
        return this.mercadopago;
      case "mock":
      default:
        return this.mock;
    }
  }

  getMockGateway(): MockPaymentGateway {
    return this.mock;
  }

  private resolveProvider(): GatewayProvider {
    if (typeof process !== "undefined" && process.env?.PAYMENT_GATEWAY_PROVIDER) {
      const env = process.env.PAYMENT_GATEWAY_PROVIDER.toLowerCase() as GatewayProvider;
      if (["mock", "stripe", "mercadopago"].includes(env)) return env;
    }
    return DEFAULT_PROVIDER;
  }
}
