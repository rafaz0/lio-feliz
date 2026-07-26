import type { IPaymentGateway, PaymentResult } from "@/application/gateways/payment-gateway";

/** Placeholder — Mercado Pago nao esta integrado. */
export class MercadoPagoPaymentGateway implements IPaymentGateway {
  async charge(_subscriptionId: string, _amount: number): Promise<PaymentResult> {
    throw new Error(
      "MercadoPagoPaymentGateway: Not Implemented. Use PAYMENT_GATEWAY_PROVIDER=mock para ambiente de desenvolvimento.",
    );
  }

  async cancel(_subscriptionId: string): Promise<void> {
    throw new Error("MercadoPagoPaymentGateway: Not Implemented.");
  }

  async refund(_chargeId: string): Promise<void> {
    throw new Error("MercadoPagoPaymentGateway: Not Implemented.");
  }
}
