import { Result } from "../result";
import { BillingCycle } from "./billing-cycle";
import { BillingCycleId } from "./subscription-types";
import type { Subscription } from "./subscription";
import { BillingError } from "./errors";

export class BillingSimulator {
  simulateBilling(subscription: Subscription, monthlyPrice: number): Result<BillingCycle> {
    if (!subscription.isActive) {
      return Result.fail(new BillingError("Assinatura nao esta ativa"));
    }

    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const cycle = BillingCycle.create({
      id: BillingCycleId.generate(),
      subscriptionId: subscription.id.value,
      periodStart,
      periodEnd,
      amount: monthlyPrice,
      status: "PAID",
      simulatedAt: now,
    });

    return Result.ok(cycle);
  }

  cancelBilling(subscription: Subscription): Result<BillingCycle> {
    const cycle = BillingCycle.create({
      id: BillingCycleId.generate(),
      subscriptionId: subscription.id.value,
      periodStart: new Date(),
      periodEnd: new Date(),
      amount: 0,
      status: "PAID",
      simulatedAt: new Date(),
    });

    return Result.ok(cycle);
  }
}
