import { DomainError } from "../errors";

export class PlanNotFoundError extends DomainError {
  constructor(planId: string) {
    super("PLAN_NOT_FOUND", `Plano "${planId}" nao encontrado`);
  }
}

export class SubscriptionNotFoundError extends DomainError {
  constructor(subscriptionId: string) {
    super("SUBSCRIPTION_NOT_FOUND", `Assinatura "${subscriptionId}" nao encontrada`);
  }
}

export class PlanNotAllowedError extends DomainError {
  constructor(capability: string) {
    super("PLAN_NOT_ALLOWED", `Capability "${capability}" nao disponivel no plano atual`);
  }
}

export class BillingError extends DomainError {
  constructor(message: string) {
    super("BILLING_ERROR", `Erro de cobranca: ${message}`);
  }
}

export class SubscriptionExpiredError extends DomainError {
  constructor(subscriptionId: string) {
    super("SUBSCRIPTION_EXPIRED", `Assinatura "${subscriptionId}" expirada`);
  }
}
