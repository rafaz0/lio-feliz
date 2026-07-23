import type { ISubscriptionRepository } from "@/application/ports/subscription-repository";
import type { IPaymentGateway } from "@/application/gateways/payment-gateway";
import { BillingCycle, BillingCycleId } from "@/core/domain/subscriptions";

export interface BillingJobResult {
  totalProcessed: number;
  successful: number;
  failed: number;
  cancelled: number;
}

export class BillingJobService {
  constructor(
    private readonly subscriptionRepo: ISubscriptionRepository,
    private readonly paymentGateway: IPaymentGateway,
  ) {}

  async processMonthlyBilling(): Promise<BillingJobResult> {
    const subscriptions = await this.subscriptionRepo.findAllActiveSubscriptions();
    let successful = 0;
    let failed = 0;
    let cancelled = 0;

    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    for (const subscription of subscriptions) {
      const plan = await this.subscriptionRepo.findPlanById(subscription.planId);
      if (!plan) continue;

      const existingCycles = await this.subscriptionRepo.findBillingCyclesBySubscription(
        subscription.id.value,
      );
      const alreadyPaidThisPeriod = existingCycles.some(
        (c) => c.status === "PAID" && c.periodStart.getTime() === periodStart.getTime(),
      );
      if (alreadyPaidThisPeriod) continue;

      const result = await this.executeChargeWithRetry(
        subscription.id.value,
        plan.monthlyPrice,
        periodStart,
        periodEnd,
      );

      if (result === "PAID") {
        successful++;
      } else if (result === "CANCELLED") {
        cancelled++;
      } else {
        failed++;
      }
    }

    return { totalProcessed: subscriptions.length, successful, failed, cancelled };
  }

  private async executeChargeWithRetry(
    subscriptionId: string,
    amount: number,
    periodStart: Date,
    periodEnd: Date,
  ): Promise<"PAID" | "FAILED" | "CANCELLED"> {
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      let chargeResult;
      try {
        chargeResult = await this.paymentGateway.charge(subscriptionId, amount);
      } catch {
        chargeResult = {
          success: false,
          transactionId: "",
          status: "FAILED" as const,
          error: "Gateway error",
        };
      }

      if (chargeResult.success) {
        const cycle = BillingCycle.create({
          id: BillingCycleId.generate(),
          subscriptionId,
          periodStart,
          periodEnd,
          amount,
          status: "PAID",
          simulatedAt: new Date(),
        });
        await this.subscriptionRepo.saveBillingCycle(cycle);
        return "PAID";
      }

      const failedCycle = BillingCycle.create({
        id: BillingCycleId.generate(),
        subscriptionId,
        periodStart,
        periodEnd,
        amount,
        status: "FAILED",
        simulatedAt: new Date(),
      });
      await this.subscriptionRepo.saveBillingCycle(failedCycle);
    }

    const subscription = await this.subscriptionRepo.findSubscriptionById(subscriptionId);
    if (subscription) {
      const cancelled = subscription.cancel();
      await this.subscriptionRepo.saveSubscription(cancelled);
    }

    return "CANCELLED";
  }
}
