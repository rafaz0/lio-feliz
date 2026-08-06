import { createFileRoute } from "@tanstack/react-router";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Subscription, SubscriptionId, type SubscriptionStatus } from "@/core/domain/subscriptions";

// Webhook real do Asaas. O Asaas nao assina o payload com HMAC — a
// autenticacao e um token fixo configurado ao cadastrar o webhook (painel
// ou API), reenviado no header "asaas-access-token" em toda notificacao.
// Nunca usar a API key do Asaas como esse token (orientacao oficial deles).
// Fluxo Pix sem atraso: PAYMENT_CREATED -> PAYMENT_RECEIVED (sem
// PAYMENT_CONFIRMED no meio). Documentacao consultada em 06/08/2026.

interface AsaasWebhookPayload {
  event: string;
  payment?: {
    id: string;
    subscription?: string;
    status: string;
    value: number;
  };
}

const ACTIVATING_EVENTS = new Set(["PAYMENT_RECEIVED", "PAYMENT_CONFIRMED"]);
const PAST_DUE_EVENTS = new Set(["PAYMENT_OVERDUE"]);

export const Route = createFileRoute("/api/asaas-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const configuredToken = process.env.ASAAS_WEBHOOK_TOKEN;
        const receivedToken = request.headers.get("asaas-access-token");

        if (!configuredToken || receivedToken !== configuredToken) {
          return new Response(JSON.stringify({ error: "invalid token" }), {
            status: 401,
            headers: { "content-type": "application/json" },
          });
        }

        const payload = (await request.json().catch(() => null)) as AsaasWebhookPayload | null;

        // Sempre 200 pra payload que a gente nao sabe interpretar — evita
        // retry infinito do Asaas por causa de evento que nao processamos
        // (ex: eventos de assinatura, que nao carregam "payment").
        if (!payload?.event || !payload.payment?.id) {
          return okResponse();
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        // As tabelas de assinatura (migration 20260806120000) ainda nao
        // existem no `Database` gerado (src/integrations/supabase/types.ts
        // — regenerado a partir de um banco real via `supabase:types`, que
        // exige Docker/Supabase local; nao disponivel aqui). Widening
        // deliberado pra essas tabelas novas, mesmo padrao ja usado nos
        // outros repositorios desta feature (SupabaseSubscriptionRepository,
        // AsaasPaymentGateway) que recebem SupabaseClient sem o generic.
        const supabase = supabaseAdmin as unknown as SupabaseClient;
        const paymentId = payload.payment.id;

        const { data: alreadyProcessed } = await supabase
          .from("billing_webhook_events")
          .select("id")
          .eq("id", paymentId)
          .maybeSingle();

        if (alreadyProcessed) {
          return okResponse();
        }

        await supabase.from("billing_webhook_events").insert({
          id: paymentId,
          event_type: payload.event,
          raw_payload: payload as unknown as Record<string, unknown>,
        });

        const gatewaySubscriptionId = payload.payment.subscription;
        if (gatewaySubscriptionId) {
          await applySubscriptionUpdate(supabase, gatewaySubscriptionId, payload.event);
        }

        return okResponse();
      },
    },
  },
});

function okResponse(): Response {
  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

type SubscriptionRow = {
  id: string;
  plan_id: string;
  user_id: string;
  start_date: string;
  end_date: string | null;
  trial_end_date: string | null;
  status: SubscriptionStatus;
};

async function applySubscriptionUpdate(
  supabaseAdmin: SupabaseClient,
  gatewaySubscriptionId: string,
  event: string,
): Promise<void> {
  const { data } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("gateway_subscription_id", gatewaySubscriptionId)
    .maybeSingle();

  const row = data as unknown as SubscriptionRow | null;
  if (!row) return;

  const subscription = Subscription.create({
    id: SubscriptionId.create(row.id),
    planId: row.plan_id,
    userId: row.user_id,
    startDate: new Date(row.start_date),
    endDate: row.end_date ? new Date(row.end_date) : null,
    trialEndDate: row.trial_end_date ? new Date(row.trial_end_date) : null,
    status: row.status,
  });

  let updated: Subscription;
  if (ACTIVATING_EVENTS.has(event)) {
    updated = subscription.isActive ? subscription.renew() : subscription.activate();
  } else if (PAST_DUE_EVENTS.has(event)) {
    updated = subscription.markPastDue();
  } else {
    return;
  }

  await supabaseAdmin
    .from("subscriptions")
    .update({
      status: updated.status,
      start_date: updated.startDate.toISOString(),
      end_date: updated.endDate?.toISOString() ?? null,
    })
    .eq("id", updated.id.value);
}
