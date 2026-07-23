import type { IPaymentGateway, PaymentResult } from "@/application/gateways/payment-gateway";

export class StripePaymentGateway implements IPaymentGateway {
  constructor(private readonly stripeSecretKey: string) {}

  async charge(subscriptionId: string, amount: number): Promise<PaymentResult> {
    try {
      const response = await fetch("https://api.stripe.com/v1/payment_intents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          amount: String(Math.round(amount * 100)),
          currency: "brl",
          metadata: { subscriptionId },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          transactionId: "",
          status: "FAILED",
          error: data.error?.message ?? "Falha ao processar pagamento",
        };
      }

      return {
        success: true,
        transactionId: data.id,
        status: "PAID",
      };
    } catch (err) {
      return {
        success: false,
        transactionId: "",
        status: "FAILED",
        error: err instanceof Error ? err.message : "Erro inesperado no gateway",
      };
    }
  }

  async cancel(subscriptionId: string): Promise<void> {
    await fetch(`https://api.stripe.com/v1/subscriptions/${subscriptionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this.stripeSecretKey}`,
      },
    });
  }

  async refund(chargeId: string): Promise<void> {
    await fetch("https://api.stripe.com/v1/refunds", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ payment_intent: chargeId }),
    });
  }
}
