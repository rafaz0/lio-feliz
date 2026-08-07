-- Bug pego em teste real: a migration 20260806120000 criou o CHECK de
-- status sem "PENDING_PAYMENT" (adicionado depois no dominio TypeScript,
-- src/core/domain/subscriptions/subscription-types.ts, mas esquecido aqui).
-- Sem isso, toda assinatura via gateway assincrono (Asaas/Pix) falha ao
-- salvar com "violates check constraint subscriptions_status_check".
ALTER TABLE public.subscriptions DROP CONSTRAINT subscriptions_status_check;
ALTER TABLE public.subscriptions ADD CONSTRAINT subscriptions_status_check
  CHECK (status IN ('TRIAL', 'ACTIVE', 'CANCELLED', 'PAST_DUE', 'EXPIRED', 'PENDING_PAYMENT'));
