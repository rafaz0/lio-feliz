-- Assinaturas reais (Plan/Subscription/BillingCycle) — antes 100% em memória
-- (FakeSubscriptionRepository, recriado a cada carregamento de página).
-- IDs são strings geradas pelo domínio (ex: "sub-<timestamp>-<random>"),
-- não UUID — ver src/core/domain/subscriptions/subscription-types.ts.

CREATE TABLE public.subscription_plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('FREE', 'BASIC', 'PREMIUM')),
  monthly_price NUMERIC(18,2) NOT NULL DEFAULT 0,
  description TEXT NOT NULL DEFAULT '',
  capabilities TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.subscriptions (
  id TEXT PRIMARY KEY,
  plan_id TEXT NOT NULL REFERENCES public.subscription_plans(id),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  trial_end_date TIMESTAMPTZ,
  status TEXT NOT NULL CHECK (status IN ('TRIAL', 'ACTIVE', 'CANCELLED', 'PAST_DUE', 'EXPIRED')),
  gateway_customer_id TEXT,
  gateway_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX subscriptions_user_idx ON public.subscriptions(user_id);
CREATE INDEX subscriptions_status_idx ON public.subscriptions(status) WHERE status = 'ACTIVE';
CREATE INDEX subscriptions_gateway_subscription_idx ON public.subscriptions(gateway_subscription_id)
  WHERE gateway_subscription_id IS NOT NULL;

CREATE TABLE public.billing_cycles (
  id TEXT PRIMARY KEY,
  subscription_id TEXT NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  amount NUMERIC(18,2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'PAID', 'FAILED')),
  gateway_payment_id TEXT,
  simulated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX billing_cycles_subscription_idx ON public.billing_cycles(subscription_id);

-- Idempotência de webhook: um payment.id do Asaas só é processado uma vez.
CREATE TABLE public.billing_webhook_events (
  id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL,
  raw_payload JSONB NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.subscription_plans TO authenticated;
GRANT ALL ON public.subscription_plans TO service_role;

GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

GRANT SELECT ON public.billing_cycles TO authenticated;
GRANT ALL ON public.billing_cycles TO service_role;

GRANT ALL ON public.billing_webhook_events TO service_role;

ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_webhook_events ENABLE ROW LEVEL SECURITY;

-- Planos são públicos (qualquer usuário autenticado pode ver as opções).
CREATE POLICY "Anyone authenticated can view plans" ON public.subscription_plans
  FOR SELECT TO authenticated USING (true);

-- Assinatura e ciclos de cobrança: usuário só enxerga os próprios.
-- Escrita é sempre via service role (fronteira de servidor do checkout/webhook),
-- nunca direto do cliente — por isso não há política de INSERT/UPDATE aqui.
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own billing cycles" ON public.billing_cycles
  FOR SELECT TO authenticated USING (
    subscription_id IN (SELECT id FROM public.subscriptions WHERE user_id = auth.uid())
  );

-- billing_webhook_events não tem política SELECT/INSERT para authenticated:
-- só service_role (webhook handler) toca essa tabela.

CREATE TRIGGER subscription_plans_set_updated_at BEFORE UPDATE ON public.subscription_plans
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER subscriptions_set_updated_at BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed dos 3 planos (hoje recriados em memória em __root.tsx a cada carregamento
-- de página). Capabilities alinhadas com DEFAULT_CAPABILITIES
-- (src/core/domain/subscriptions/authorization-service.ts).
-- Valores em reais (ex. 19.90) — o __root.tsx atual usa 1990/4990 e o
-- formatador (Intl.NumberFormat BRL) trata como reais, não centavos, o que
-- hoje exibiria "R$ 1.990,00"/"R$ 4.990,00". Isso nunca foi notado porque os
-- planos pagos ficam desabilitados ("Em breve") — usando os valores corretos
-- aqui (19.90/49.90) para não herdar o bug na tabela real.
INSERT INTO public.subscription_plans (id, name, tier, monthly_price, description, capabilities) VALUES
  ('free', 'Free', 'FREE', 0, 'Acesso basico a plataforma', ARRAY['carteira:read', 'dashboard:basic', 'proventos:read']),
  ('basic', 'Basic', 'BASIC', 19.90, 'Recursos avancados para investidores', ARRAY['carteira:read', 'carteira:write', 'dashboard:full', 'proventos:read', 'relatorios:csv']),
  ('premium', 'Premium', 'PREMIUM', 49.90, 'Acesso completo com todos os recursos', ARRAY['*'])
ON CONFLICT (id) DO NOTHING;
