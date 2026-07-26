import type { IPaymentGateway, PaymentResult } from "@/application/gateways/payment-gateway";

/** Placeholder — Stripe nao esta integrado. */
export class StripePaymentGateway implements IPaymentGateway {
  constructor(_stripeSecretKey?: string) {}

  async charge(_subscriptionId: string, _amount: number): Promise<PaymentResult> {
    throw new Error(
      "StripePaymentGateway: Not Implemented. Use PAYMENT_GATEWAY_PROVIDER=mock para ambiente de desenvolvimento.",
    );
  }

  async cancel(_subscriptionId: string): Promise<void> {
    throw new Error("StripePaymentGateway: Not Implemented.");
  }

  async refund(_chargeId: string): Promise<void> {
    throw new Error("StripePaymentGateway: Not Implemented.");
  }
}
