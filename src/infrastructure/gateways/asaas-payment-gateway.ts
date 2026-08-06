import type { SupabaseClient } from "@supabase/supabase-js";
import type { IPaymentGateway, PaymentResult } from "@/application/gateways/payment-gateway";
import { asaasClient } from "@/infrastructure/gateways/asaas/asaas-client.server";

type SubscriptionRow = { id: string; user_id: string };
type ProfileRow = { display_name: string | null; cpf_cnpj: string | null };

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

// Gateway real via Asaas. charge() cria (ou reaproveita) o cliente no Asaas
// e uma assinatura com cobranca Pix — o Asaas gera a cobranca de cada ciclo
// sozinho, e a confirmacao de pagamento chega so por webhook (ver
// src/routes/api.asaas-webhook.ts), nunca no retorno de charge(). Por isso
// charge() sempre retorna PENDING quando a criacao da assinatura no Asaas
// da certo — nunca PAID.
export class AsaasPaymentGateway implements IPaymentGateway {
  constructor(private readonly supabase: SupabaseClient) {}

  async charge(subscriptionId: string, amount: number): Promise<PaymentResult> {
    const { data: subscriptionRow, error: subError } = await this.supabase
      .from("subscriptions")
      .select("id, user_id")
      .eq("id", subscriptionId)
      .maybeSingle();

    if (subError || !subscriptionRow) {
      return {
        success: false,
        transactionId: "",
        status: "FAILED",
        error: "Assinatura nao encontrada para cobranca.",
      };
    }

    const { user_id: userId } = subscriptionRow as SubscriptionRow;

    const { data: profileRow } = await this.supabase
      .from("profiles")
      .select("display_name, cpf_cnpj")
      .eq("id", userId)
      .maybeSingle();

    const profile = profileRow as ProfileRow | null;

    if (!profile?.cpf_cnpj) {
      return {
        success: false,
        transactionId: "",
        status: "FAILED",
        error: "CPF/CNPJ nao cadastrado — obrigatorio pra cobranca via Pix no Asaas.",
      };
    }

    const { data: authUser } = await this.supabase.auth.admin.getUserById(userId);
    const email = authUser?.user?.email;

    if (!email) {
      return {
        success: false,
        transactionId: "",
        status: "FAILED",
        error: "E-mail do usuario nao encontrado — obrigatorio pra cobranca no Asaas.",
      };
    }

    try {
      let customer = await asaasClient.findCustomerByExternalReference(userId);
      if (!customer) {
        customer = await asaasClient.createCustomer({
          name: profile.display_name ?? email,
          email,
          cpfCnpj: profile.cpf_cnpj,
          externalReference: userId,
        });
      }

      const asaasSubscription = await asaasClient.createSubscription({
        customer: customer.id,
        billingType: "PIX",
        value: amount,
        nextDueDate: todayIso(),
        cycle: "MONTHLY",
        description: "Assinatura Lio Feliz",
        externalReference: subscriptionId,
      });

      await this.supabase
        .from("subscriptions")
        .update({
          gateway_customer_id: customer.id,
          gateway_subscription_id: asaasSubscription.id,
        })
        .eq("id", subscriptionId);

      return {
        success: false,
        transactionId: asaasSubscription.id,
        status: "PENDING",
      };
    } catch (err) {
      return {
        success: false,
        transactionId: "",
        status: "FAILED",
        error: err instanceof Error ? err.message : "Erro desconhecido no gateway Asaas.",
      };
    }
  }

  async cancel(subscriptionId: string): Promise<void> {
    const { data } = await this.supabase
      .from("subscriptions")
      .select("gateway_subscription_id")
      .eq("id", subscriptionId)
      .maybeSingle();

    const gatewaySubscriptionId = (data as { gateway_subscription_id: string | null } | null)
      ?.gateway_subscription_id;

    if (gatewaySubscriptionId) {
      await asaasClient.cancelSubscription(gatewaySubscriptionId);
    }
  }

  async refund(chargeId: string): Promise<void> {
    await asaasClient.refundPayment(chargeId);
  }
}
