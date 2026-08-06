-- CPF/CNPJ e necessario pra criar um cliente no Asaas (campo obrigatorio na
-- API deles, confirmado na documentacao) e hoje nao existe em lugar nenhum
-- do app. Nullable de proposito: coletar isso ainda nao faz parte do
-- onboarding/checkout (fica pra quando a Fase 1 — teste em sandbox — for
-- desenhar onde pedir esse dado ao usuario). Sem esse valor, o checkout
-- pago falha com uma mensagem clara em vez de travar.
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cpf_cnpj TEXT;
