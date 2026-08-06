import { describe, it, expect, vi, beforeEach } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { AsaasPaymentGateway } from "@/infrastructure/gateways/asaas-payment-gateway";
import { asaasClient } from "@/infrastructure/gateways/asaas/asaas-client.server";

vi.mock("@/infrastructure/gateways/asaas/asaas-client.server", () => ({
  asaasClient: {
    findCustomerByExternalReference: vi.fn(),
    createCustomer: vi.fn(),
    createSubscription: vi.fn(),
    cancelSubscription: vi.fn(),
    getPayment: vi.fn(),
    refundPayment: vi.fn(),
  },
}));

function createMockSupabase(opts: {
  subscription?: { id: string; user_id: string } | null;
  profile?: { display_name: string | null; cpf_cnpj: string | null } | null;
  email?: string | null;
}) {
  const updateEq = vi.fn().mockResolvedValue({ error: null });
  const update = vi.fn().mockReturnValue({ eq: updateEq });

  const from = vi.fn((table: string) => {
    if (table === "subscriptions") {
      return {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({
              data: opts.subscription ?? null,
              error: opts.subscription === null ? { message: "not found" } : null,
            }),
          }),
        }),
        update,
      };
    }
    if (table === "profiles") {
      return {
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            maybeSingle: vi.fn().mockResolvedValue({ data: opts.profile ?? null, error: null }),
          }),
        }),
      };
    }
    throw new Error(`unexpected table: ${table}`);
  });

  const supabase = {
    from,
    auth: {
      admin: {
        getUserById: vi.fn().mockResolvedValue({
          data: { user: opts.email ? { email: opts.email } : null },
          error: null,
        }),
      },
    },
  } as unknown as SupabaseClient;

  return { supabase, update, updateEq };
}

describe("AsaasPaymentGateway", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("charge", () => {
    it("retorna FAILED quando a assinatura nao existe", async () => {
      const { supabase } = createMockSupabase({ subscription: null });
      const gateway = new AsaasPaymentGateway(supabase);

      const result = await gateway.charge("sub-1", 49.9);

      expect(result.success).toBe(false);
      expect(result.status).toBe("FAILED");
      expect(result.error).toMatch(/nao encontrada/i);
    });

    it("retorna FAILED quando o usuario nao tem CPF/CNPJ cadastrado", async () => {
      const { supabase } = createMockSupabase({
        subscription: { id: "sub-1", user_id: "user-1" },
        profile: { display_name: "Rafael", cpf_cnpj: null },
      });
      const gateway = new AsaasPaymentGateway(supabase);

      const result = await gateway.charge("sub-1", 49.9);

      expect(result.success).toBe(false);
      expect(result.status).toBe("FAILED");
      expect(result.error).toMatch(/CPF/);
    });

    it("retorna FAILED quando o e-mail do usuario nao e encontrado", async () => {
      const { supabase } = createMockSupabase({
        subscription: { id: "sub-1", user_id: "user-1" },
        profile: { display_name: "Rafael", cpf_cnpj: "12345678900" },
        email: null,
      });
      const gateway = new AsaasPaymentGateway(supabase);

      const result = await gateway.charge("sub-1", 49.9);

      expect(result.success).toBe(false);
      expect(result.status).toBe("FAILED");
      expect(result.error).toMatch(/e-mail/i);
    });

    it("cria cliente novo, assinatura Pix, e retorna PENDING quando tudo existe", async () => {
      const { supabase, update, updateEq } = createMockSupabase({
        subscription: { id: "sub-1", user_id: "user-1" },
        profile: { display_name: "Rafael", cpf_cnpj: "12345678900" },
        email: "rafael@example.com",
      });

      vi.mocked(asaasClient.findCustomerByExternalReference).mockResolvedValue(null);
      vi.mocked(asaasClient.createCustomer).mockResolvedValue({
        id: "cus_123",
        name: "Rafael",
      });
      vi.mocked(asaasClient.createSubscription).mockResolvedValue({
        id: "sub_asaas_456",
        customer: "cus_123",
        status: "ACTIVE",
        billingType: "PIX",
        value: 49.9,
        nextDueDate: "2026-08-06",
      });

      const gateway = new AsaasPaymentGateway(supabase);
      const result = await gateway.charge("sub-1", 49.9);

      expect(asaasClient.createCustomer).toHaveBeenCalledWith(
        expect.objectContaining({ cpfCnpj: "12345678900", externalReference: "user-1" }),
      );
      expect(asaasClient.createSubscription).toHaveBeenCalledWith(
        expect.objectContaining({
          customer: "cus_123",
          billingType: "PIX",
          value: 49.9,
          externalReference: "sub-1",
        }),
      );
      expect(update).toHaveBeenCalledWith(
        expect.objectContaining({
          gateway_customer_id: "cus_123",
          gateway_subscription_id: "sub_asaas_456",
        }),
      );
      expect(updateEq).toHaveBeenCalledWith("id", "sub-1");

      expect(result.success).toBe(false);
      expect(result.status).toBe("PENDING");
      expect(result.transactionId).toBe("sub_asaas_456");
    });

    it("reaproveita cliente existente em vez de criar um novo", async () => {
      const { supabase } = createMockSupabase({
        subscription: { id: "sub-1", user_id: "user-1" },
        profile: { display_name: "Rafael", cpf_cnpj: "12345678900" },
        email: "rafael@example.com",
      });

      vi.mocked(asaasClient.findCustomerByExternalReference).mockResolvedValue({
        id: "cus_existente",
        name: "Rafael",
      });
      vi.mocked(asaasClient.createSubscription).mockResolvedValue({
        id: "sub_asaas_789",
        customer: "cus_existente",
        status: "ACTIVE",
        billingType: "PIX",
        value: 49.9,
        nextDueDate: "2026-08-06",
      });

      const gateway = new AsaasPaymentGateway(supabase);
      await gateway.charge("sub-1", 49.9);

      expect(asaasClient.createCustomer).not.toHaveBeenCalled();
    });

    it("retorna FAILED com a mensagem do erro quando a API do Asaas falha", async () => {
      const { supabase } = createMockSupabase({
        subscription: { id: "sub-1", user_id: "user-1" },
        profile: { display_name: "Rafael", cpf_cnpj: "12345678900" },
        email: "rafael@example.com",
      });

      vi.mocked(asaasClient.findCustomerByExternalReference).mockRejectedValue(
        new Error("Asaas API error (401): unauthorized"),
      );

      const gateway = new AsaasPaymentGateway(supabase);
      const result = await gateway.charge("sub-1", 49.9);

      expect(result.success).toBe(false);
      expect(result.status).toBe("FAILED");
      expect(result.error).toMatch(/unauthorized/);
    });
  });

  describe("cancel", () => {
    it("cancela a assinatura no Asaas quando ha gateway_subscription_id", async () => {
      const supabase = {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              maybeSingle: vi
                .fn()
                .mockResolvedValue({ data: { gateway_subscription_id: "sub_asaas_1" } }),
            }),
          }),
        }),
      } as unknown as SupabaseClient;

      const gateway = new AsaasPaymentGateway(supabase);
      await gateway.cancel("sub-1");

      expect(asaasClient.cancelSubscription).toHaveBeenCalledWith("sub_asaas_1");
    });

    it("nao chama o Asaas quando nunca houve gateway_subscription_id", async () => {
      const supabase = {
        from: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              maybeSingle: vi.fn().mockResolvedValue({ data: { gateway_subscription_id: null } }),
            }),
          }),
        }),
      } as unknown as SupabaseClient;

      const gateway = new AsaasPaymentGateway(supabase);
      await gateway.cancel("sub-1");

      expect(asaasClient.cancelSubscription).not.toHaveBeenCalled();
    });
  });

  describe("refund", () => {
    it("chama refundPayment com o id da cobranca", async () => {
      const supabase = {} as SupabaseClient;
      const gateway = new AsaasPaymentGateway(supabase);

      await gateway.refund("pay_123");

      expect(asaasClient.refundPayment).toHaveBeenCalledWith("pay_123");
    });
  });
});
