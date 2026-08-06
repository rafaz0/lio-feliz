import type { SupabaseClient } from "@supabase/supabase-js";
import type { IPaymentGateway } from "@/application/gateways/payment-gateway";
import { MockPaymentGateway } from "./mock-payment-gateway";
import { StripePaymentGateway } from "./stripe-payment-gateway";
import { MercadoPagoPaymentGateway } from "./mercado-pago-payment-gateway";
import { AsaasPaymentGateway } from "./asaas-payment-gateway";

export type GatewayProvider = "mock" | "stripe" | "mercadopago" | "asaas";

const DEFAULT_PROVIDER: GatewayProvider = "mock";

export class PaymentGatewayFactory {
  private readonly mock: MockPaymentGateway;
  private readonly stripe: StripePaymentGateway;
  private readonly mercadopago: MercadoPagoPaymentGateway;
  private readonly asaas: AsaasPaymentGateway | null;

  // supabase e opcional porque mock/stripe/mercadopago nao precisam dele —
  // so o provider "asaas" (real) exige, pra ler perfil/CPF e persistir os
  // ids da assinatura no gateway. Sem ele, create("asaas") lanca erro claro
  // em vez de silenciosamente cair pro mock.
  constructor(supabase?: SupabaseClient) {
    this.mock = new MockPaymentGateway();
    this.stripe = new StripePaymentGateway();
    this.mercadopago = new MercadoPagoPaymentGateway();
    this.asaas = supabase ? new AsaasPaymentGateway(supabase) : null;
  }

  create(provider?: GatewayProvider): IPaymentGateway {
    switch (provider ?? this.resolveProvider()) {
      case "stripe":
        return this.stripe;
      case "mercadopago":
        return this.mercadopago;
      case "asaas":
        if (!this.asaas) {
          throw new Error(
            "PaymentGatewayFactory: provider 'asaas' exige um SupabaseClient no construtor.",
          );
        }
        return this.asaas;
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
      if (["mock", "stripe", "mercadopago", "asaas"].includes(env)) return env;
    }
    return DEFAULT_PROVIDER;
  }
}
