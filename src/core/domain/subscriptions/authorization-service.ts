import { Result } from "../result";
import { Plan } from "./plan";
import type { Subscription } from "./subscription";
import { PlanNotAllowedError } from "./errors";

export const DEFAULT_CAPABILITIES: Record<string, string[]> = {
  FREE: ["carteira:read", "dashboard:basic", "proventos:read"],
  BASIC: ["carteira:read", "carteira:write", "dashboard:full", "proventos:read", "relatorios:csv"],
  PREMIUM: ["*"],
};

export class AuthorizationService {
  private readonly planCapabilities: Record<string, string[]>;

  constructor(planCapabilities?: Record<string, string[]>) {
    this.planCapabilities = planCapabilities ?? DEFAULT_CAPABILITIES;
  }

  checkAccess(userId: string, requiredCapability: string, subscription: Subscription | null, plans: Plan[]): Result<boolean> {
    const activePlan = subscription?.isActive
      ? plans.find((p) => p.id.value === subscription.planId)
      : plans.find((p) => p.tier === "FREE");

    if (!activePlan) return Result.ok(false);

    const allowed = activePlan.hasCapability(requiredCapability);

    if (!allowed) {
      return Result.fail(new PlanNotAllowedError(requiredCapability));
    }

    return Result.ok(true);
  }

  getCapabilitiesForTier(tier: string): string[] {
    return this.planCapabilities[tier] ?? this.planCapabilities["FREE"];
  }

  hasCapability(userId: string, capability: string, subscription: Subscription | null): boolean {
    const tier = subscription?.isActive ? this.getPlanTier(subscription) : "FREE";
    const caps = this.getCapabilitiesForTier(tier);
    return caps.includes("*") || caps.includes(capability);
  }

  private getPlanTier(subscription: Subscription): string {
    return "FREE";
  }
}
