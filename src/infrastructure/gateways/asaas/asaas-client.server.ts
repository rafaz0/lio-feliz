// Wrapper HTTP fino para a API do Asaas. Server-only — nunca deve ser
// importado por código que roda no navegador (a chave de API vive aqui).
// Base de referência: https://docs.asaas.com (consultada em 06/08/2026).

const SANDBOX_BASE_URL = "https://api-sandbox.asaas.com/v3";
const PRODUCTION_BASE_URL = "https://api.asaas.com/v3";

export type AsaasBillingType = "PIX" | "BOLETO" | "CREDIT_CARD" | "UNDEFINED";
export type AsaasSubscriptionCycle =
  | "WEEKLY"
  | "BIWEEKLY"
  | "MONTHLY"
  | "BIMONTHLY"
  | "QUARTERLY"
  | "SEMIANNUALLY"
  | "YEARLY";

export interface AsaasCustomer {
  id: string;
  name: string;
  email?: string;
  externalReference?: string;
}

export interface AsaasSubscription {
  id: string;
  customer: string;
  status: string;
  billingType: AsaasBillingType;
  value: number;
  nextDueDate: string;
  externalReference?: string;
}

export interface AsaasPayment {
  id: string;
  subscription?: string;
  customer: string;
  status: string;
  value: number;
  billingType: AsaasBillingType;
  externalReference?: string;
}

export class AsaasApiError extends Error {
  constructor(
    message: string,
    readonly statusCode: number,
  ) {
    super(message);
    this.name = "AsaasApiError";
  }
}

function resolveBaseUrl(): string {
  const env = process.env.ASAAS_ENV ?? "sandbox";
  return env === "production" ? PRODUCTION_BASE_URL : SANDBOX_BASE_URL;
}

function requireApiKey(): string {
  const key = process.env.ASAAS_API_KEY;
  if (!key) {
    throw new Error(
      "ASAAS_API_KEY nao configurada — necessaria pra qualquer chamada real ao Asaas.",
    );
  }
  return key;
}

async function asaasFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${resolveBaseUrl()}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      access_token: requireApiKey(),
      ...init?.headers,
    },
  });

  const body = (await res.json().catch(() => null)) as
    | (T & { errors?: { code: string; description: string }[] })
    | null;

  if (!res.ok) {
    const description = body?.errors?.[0]?.description ?? res.statusText;
    throw new AsaasApiError(`Asaas API error (${res.status}): ${description}`, res.status);
  }

  return body as T;
}

export const asaasClient = {
  async createCustomer(params: {
    name: string;
    email?: string;
    cpfCnpj?: string;
    externalReference: string;
  }): Promise<AsaasCustomer> {
    return asaasFetch<AsaasCustomer>("/customers", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  async findCustomerByExternalReference(externalReference: string): Promise<AsaasCustomer | null> {
    const result = await asaasFetch<{ data: AsaasCustomer[] }>(
      `/customers?externalReference=${encodeURIComponent(externalReference)}`,
    );
    return result.data[0] ?? null;
  },

  async createSubscription(params: {
    customer: string;
    billingType: AsaasBillingType;
    value: number;
    nextDueDate: string;
    cycle: AsaasSubscriptionCycle;
    description?: string;
    externalReference: string;
  }): Promise<AsaasSubscription> {
    return asaasFetch<AsaasSubscription>("/subscriptions", {
      method: "POST",
      body: JSON.stringify(params),
    });
  },

  async cancelSubscription(subscriptionId: string): Promise<void> {
    await asaasFetch<unknown>(`/subscriptions/${subscriptionId}`, { method: "DELETE" });
  },

  async getPayment(paymentId: string): Promise<AsaasPayment> {
    return asaasFetch<AsaasPayment>(`/payments/${paymentId}`);
  },

  async refundPayment(paymentId: string): Promise<void> {
    await asaasFetch<unknown>(`/payments/${paymentId}/refund`, { method: "POST" });
  },
};
