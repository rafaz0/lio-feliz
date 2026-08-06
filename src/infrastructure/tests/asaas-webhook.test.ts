import { describe, it, expect, vi, beforeEach } from "vitest";

const mockAdmin = {
  from: vi.fn(),
};

vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: mockAdmin,
}));

async function getHandler() {
  const { Route } = await import("@/routes/api.asaas-webhook");
  const options = (
    Route as unknown as {
      options: { server: { handlers: { POST: (ctx: { request: Request }) => Promise<Response> } } };
    }
  ).options;
  return options.server.handlers.POST;
}

function buildRequest(body: unknown, token: string | null): Request {
  const headers = new Headers({ "content-type": "application/json" });
  if (token !== null) headers.set("asaas-access-token", token);
  return new Request("https://lio-feliz.vercel.app/api/asaas-webhook", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

describe("api/asaas-webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ASAAS_WEBHOOK_TOKEN = "test-token-123";
  });

  it("rejeita com 401 quando o token esta ausente ou incorreto", async () => {
    const handler = await getHandler();

    const res = await handler({
      request: buildRequest({ event: "PAYMENT_RECEIVED" }, "token-errado"),
    });

    expect(res.status).toBe(401);
    expect(mockAdmin.from).not.toHaveBeenCalled();
  });

  it("retorna 401 quando ASAAS_WEBHOOK_TOKEN nao esta configurado", async () => {
    delete process.env.ASAAS_WEBHOOK_TOKEN;
    const handler = await getHandler();

    const res = await handler({ request: buildRequest({ event: "PAYMENT_RECEIVED" }, "qualquer") });

    expect(res.status).toBe(401);
  });

  it("retorna 200 sem processar quando o payload nao tem payment.id", async () => {
    const handler = await getHandler();

    const res = await handler({
      request: buildRequest({ event: "SUBSCRIPTION_CREATED" }, "test-token-123"),
    });

    expect(res.status).toBe(200);
    expect(mockAdmin.from).not.toHaveBeenCalled();
  });

  it("e idempotente: nao reprocessa um payment.id ja registrado", async () => {
    mockAdmin.from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          maybeSingle: vi.fn().mockResolvedValue({ data: { id: "pay_123" } }),
        }),
      }),
    });

    const handler = await getHandler();
    const res = await handler({
      request: buildRequest(
        { event: "PAYMENT_RECEIVED", payment: { id: "pay_123", status: "RECEIVED", value: 49.9 } },
        "test-token-123",
      ),
    });

    expect(res.status).toBe(200);
    expect(mockAdmin.from).toHaveBeenCalledWith("billing_webhook_events");
    // so a leitura de idempotencia, nunca insert nem leitura de subscriptions
    expect(mockAdmin.from).toHaveBeenCalledTimes(1);
  });

  it("ativa a assinatura PENDING_PAYMENT quando recebe PAYMENT_RECEIVED", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    const subscriptionUpdateEq = vi.fn().mockResolvedValue({ error: null });
    const subscriptionUpdate = vi.fn().mockReturnValue({ eq: subscriptionUpdateEq });

    mockAdmin.from.mockImplementation((table: string) => {
      if (table === "billing_webhook_events") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({ maybeSingle: vi.fn().mockResolvedValue({ data: null }) }),
          }),
          insert,
        };
      }
      if (table === "subscriptions") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              maybeSingle: vi.fn().mockResolvedValue({
                data: {
                  id: "sub-1",
                  plan_id: "premium",
                  user_id: "user-1",
                  start_date: "2026-08-06T00:00:00.000Z",
                  end_date: null,
                  trial_end_date: null,
                  status: "PENDING_PAYMENT",
                },
              }),
            }),
          }),
          update: subscriptionUpdate,
        };
      }
      throw new Error(`unexpected table ${table}`);
    });

    const handler = await getHandler();
    const res = await handler({
      request: buildRequest(
        {
          event: "PAYMENT_RECEIVED",
          payment: { id: "pay_456", subscription: "asaas-sub-1", status: "RECEIVED", value: 49.9 },
        },
        "test-token-123",
      ),
    });

    expect(res.status).toBe(200);
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({ id: "pay_456", event_type: "PAYMENT_RECEIVED" }),
    );
    expect(subscriptionUpdate).toHaveBeenCalledWith(expect.objectContaining({ status: "ACTIVE" }));
    expect(subscriptionUpdateEq).toHaveBeenCalledWith("id", "sub-1");
  });

  it("marca PAST_DUE quando recebe PAYMENT_OVERDUE", async () => {
    const subscriptionUpdateEq = vi.fn().mockResolvedValue({ error: null });
    const subscriptionUpdate = vi.fn().mockReturnValue({ eq: subscriptionUpdateEq });

    mockAdmin.from.mockImplementation((table: string) => {
      if (table === "billing_webhook_events") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({ maybeSingle: vi.fn().mockResolvedValue({ data: null }) }),
          }),
          insert: vi.fn().mockResolvedValue({ error: null }),
        };
      }
      if (table === "subscriptions") {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              maybeSingle: vi.fn().mockResolvedValue({
                data: {
                  id: "sub-1",
                  plan_id: "premium",
                  user_id: "user-1",
                  start_date: "2026-08-06T00:00:00.000Z",
                  end_date: null,
                  trial_end_date: null,
                  status: "ACTIVE",
                },
              }),
            }),
          }),
          update: subscriptionUpdate,
        };
      }
      throw new Error(`unexpected table ${table}`);
    });

    const handler = await getHandler();
    await handler({
      request: buildRequest(
        {
          event: "PAYMENT_OVERDUE",
          payment: { id: "pay_789", subscription: "asaas-sub-1", status: "OVERDUE", value: 49.9 },
        },
        "test-token-123",
      ),
    });

    expect(subscriptionUpdate).toHaveBeenCalledWith(
      expect.objectContaining({ status: "PAST_DUE" }),
    );
  });
});
