import type { IPaymentGateway, PaymentResult } from "@/application/gateways/payment-gateway";

export class FakePaymentGateway implements IPaymentGateway {
  private chargeResults: Map<string, PaymentResult> = new Map();
  private cancelledIds: string[] = [];
  private refundedIds: string[] = [];
  private shouldFail = false;

  async charge(subscriptionId: string, amount: number): Promise<PaymentResult> {
    if (this.shouldFail) {
      const result: PaymentResult = {
        success: false,
        transactionId: `fail-${Date.now()}`,
        status: "FAILED",
        error: "Simulated failure",
      };
      this.chargeResults.set(subscriptionId, result);
      return result;
    }

    const result: PaymentResult = {
      success: true,
      transactionId: `tx-${Date.now()}`,
      status: "PAID",
    };
    this.chargeResults.set(subscriptionId, result);
    return result;
  }

  async cancel(subscriptionId: string): Promise<void> {
    this.cancelledIds.push(subscriptionId);
  }

  async refund(chargeId: string): Promise<void> {
    this.refundedIds.push(chargeId);
  }

  setShouldFail(fail: boolean): void {
    this.shouldFail = fail;
  }

  getChargeResult(subscriptionId: string): PaymentResult | undefined {
    return this.chargeResults.get(subscriptionId);
  }

  wasCancelled(subscriptionId: string): boolean {
    return this.cancelledIds.includes(subscriptionId);
  }

  reset(): void {
    this.chargeResults.clear();
    this.cancelledIds = [];
    this.refundedIds = [];
    this.shouldFail = false;
  }
}
