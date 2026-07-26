import type { IPaymentGateway, PaymentResult } from "@/application/gateways/payment-gateway";

export type MockBehavior = "approve" | "decline" | "random";

export interface MockTransaction {
  id: string;
  subscriptionId: string;
  amount: number;
  status: "PAID" | "FAILED" | "REFUNDED";
  createdAt: Date;
  refundedAt: Date | null;
}

let nextId = 1;
function generateId(): string {
  return `mock-txn-${nextId++}-${Date.now()}`;
}

export class MockPaymentGateway implements IPaymentGateway {
  private transactions = new Map<string, MockTransaction>();
  private behavior: MockBehavior = "approve";
  private failCount = 0;

  setBehavior(behavior: MockBehavior): void {
    this.behavior = behavior;
  }

  getBehavior(): MockBehavior {
    return this.behavior;
  }

  getTransactions(): MockTransaction[] {
    return Array.from(this.transactions.values());
  }

  clearTransactions(): void {
    this.transactions.clear();
  }

  async charge(subscriptionId: string, amount: number): Promise<PaymentResult> {
    const id = generateId();

    const shouldFail =
      this.behavior === "decline" ? true : this.behavior === "random" ? Math.random() < 0.4 : false;

    if (shouldFail) {
      this.failCount++;
      const txn: MockTransaction = {
        id,
        subscriptionId,
        amount,
        status: "FAILED",
        createdAt: new Date(),
        refundedAt: null,
      };
      this.transactions.set(id, txn);

      return {
        success: false,
        transactionId: id,
        status: "FAILED",
        error: `Pagamento recusado (mock: ${this.behavior}). Transação #${id}.`,
      };
    }

    const txn: MockTransaction = {
      id,
      subscriptionId,
      amount,
      status: "PAID",
      createdAt: new Date(),
      refundedAt: null,
    };
    this.transactions.set(id, txn);

    return {
      success: true,
      transactionId: id,
      status: "PAID",
    };
  }

  async cancel(subscriptionId: string): Promise<void> {
    for (const [, txn] of this.transactions) {
      if (txn.subscriptionId === subscriptionId && txn.status === "PAID" && !txn.refundedAt) {
        txn.status = "REFUNDED";
        txn.refundedAt = new Date();
      }
    }
  }

  async refund(chargeId: string): Promise<void> {
    const txn = this.transactions.get(chargeId);
    if (txn && txn.status === "PAID") {
      txn.status = "REFUNDED";
      txn.refundedAt = new Date();
    }
  }
}
