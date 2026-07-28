-- Add missing columns to portfolio_operations if not present
ALTER TABLE public.portfolio_operations ADD COLUMN IF NOT EXISTS fee numeric(18,4) NOT NULL DEFAULT 0;
ALTER TABLE public.portfolio_operations ADD COLUMN IF NOT EXISTS irrf numeric(18,4) NOT NULL DEFAULT 0;
ALTER TABLE public.portfolio_operations ADD COLUMN IF NOT EXISTS other_costs numeric(18,4) NOT NULL DEFAULT 0;
ALTER TABLE public.portfolio_operations ADD COLUMN IF NOT EXISTS metadata jsonb;
ALTER TABLE public.portfolio_operations ADD COLUMN IF NOT EXISTS asset_type text NOT NULL DEFAULT 'stock';
ALTER TABLE public.portfolio_operations ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'BRL';

-- Create portfolio views for production dashboard
-- These views aggregate data from portfolio_operations for the dashboard and portfolio pages.
-- They are a stopgap: real-time market prices are applied at the application layer.

-- vw_patrimonio: current portfolio snapshot per user
CREATE OR REPLACE VIEW public.vw_patrimonio AS
WITH buy_cost AS (
  SELECT
    user_id,
    SUM(price * quantity) AS total_invested,
    SUM(quantity) AS total_quantity
  FROM public.portfolio_operations
  WHERE side = 'buy'
  GROUP BY user_id
),
sell_cost AS (
  SELECT
    user_id,
    SUM(price * quantity) AS total_sold,
    SUM(quantity) AS total_sold_qty
  FROM public.portfolio_operations
  WHERE side = 'sell'
  GROUP BY user_id
),
alocacao AS (
  SELECT
    o.user_id,
    COALESCE(ao.classe, o.asset_type) AS classe,
    SUM(o.price * o.quantity) AS valor,
    CASE WHEN SUM(o.price * o.quantity) > 0 THEN 1.0 ELSE 0 END AS percentual
  FROM public.portfolio_operations o
  LEFT JOIN LATERAL (
    SELECT CASE
      WHEN o.ticker ~ '^\w+11$' THEN 'FIIs'
      WHEN o.asset_type = 'fixed_income' THEN 'Renda Fixa'
      WHEN o.currency = 'USD' THEN 'Internacional'
      WHEN o.asset_type = 'crypto' THEN 'Cripto'
      ELSE 'Ações'
    END AS classe
  ) ao ON true
  WHERE o.side = 'buy'
  GROUP BY o.user_id, ao.classe
)
SELECT
  COALESCE(b.user_id, s.user_id) AS portfolio_id,
  COALESCE(b.total_invested, 0) - COALESCE(s.total_sold, 0) AS patrimonio_total,
  COALESCE(b.total_invested, 0) AS patrimonio_investido,
  0::numeric AS saldo_disponivel,
  'BRL' AS moeda,
  NOW() AS data_referencia,
  COALESCE(
    jsonb_agg(
      jsonb_build_object(
        'classe', a.classe,
        'valor', a.valor,
        'percentual', CASE
          WHEN (COALESCE(b.total_invested, 0) - COALESCE(s.total_sold, 0)) > 0
          THEN ROUND((a.valor::numeric / (COALESCE(b.total_invested, 0) - COALESCE(s.total_sold, 0)) * 100)::numeric, 2)
          ELSE 0
        END
      )
    ) FILTER (WHERE a.classe IS NOT NULL),
    '[]'::jsonb
  ) AS alocacao,
  0::numeric AS evolucao_mensal
FROM buy_cost b
FULL JOIN sell_cost s ON b.user_id = s.user_id
LEFT JOIN alocacao a ON COALESCE(b.user_id, s.user_id) = a.user_id
GROUP BY COALESCE(b.user_id, s.user_id), b.total_invested, s.total_sold;

-- vw_historico: daily portfolio values (snapshot from operations)
CREATE OR REPLACE VIEW public.vw_historico AS
WITH valor_por_operacao AS (
  SELECT
    user_id,
    traded_at,
    CASE
      WHEN side = 'buy'  THEN price * quantity
      WHEN side = 'sell' THEN -(price * quantity)
      ELSE 0
    END AS valor_liquido,
    CASE WHEN side IN ('buy','sell') THEN price * quantity ELSE 0 END AS capital_movimentado
  FROM public.portfolio_operations
)
SELECT
  user_id AS portfolio_id,
  traded_at::text AS data,
  SUM(capital_movimentado) OVER (PARTITION BY user_id ORDER BY traded_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS patrimonio_total,
  SUM(CASE WHEN valor_liquido > 0 THEN valor_liquido ELSE 0 END) OVER (PARTITION BY user_id ORDER BY traded_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS patrimonio_investido
FROM valor_por_operacao
ORDER BY user_id, traded_at;

-- vw_posicoes: current positions per ticker
CREATE OR REPLACE VIEW public.vw_posicoes AS
WITH buy AS (
  SELECT
    user_id,
    ticker,
    asset_type,
    currency,
    SUM(quantity) AS qtd,
    SUM(price * quantity) AS total_cost
  FROM public.portfolio_operations
  WHERE side = 'buy'
  GROUP BY user_id, ticker, asset_type, currency
),
sell AS (
  SELECT
    user_id,
    ticker,
    SUM(quantity) AS qtd,
    SUM(price * quantity) AS total_sold
  FROM public.portfolio_operations
  WHERE side = 'sell'
  GROUP BY user_id, ticker
)
SELECT
  b.user_id AS portfolio_id,
  b.ticker AS asset_id,
  b.ticker,
  b.ticker AS nome,
  CASE
    WHEN b.ticker ~ '^\w+11$' THEN 'FIIs'
    WHEN b.asset_type = 'fixed_income' THEN 'Renda Fixa'
    WHEN b.currency = 'USD' THEN 'Internacional'
    WHEN b.asset_type = 'crypto' THEN 'Cripto'
    ELSE 'Ações'
  END AS classe,
  COALESCE(b.qtd, 0) - COALESCE(s.qtd, 0) AS quantidade,
  CASE WHEN (COALESCE(b.qtd, 0) - COALESCE(s.qtd, 0)) > 0
    THEN (b.total_cost - COALESCE(s.total_sold, 0)) / (COALESCE(b.qtd, 0) - COALESCE(s.qtd, 0))
    ELSE 0
  END AS preco_medio,
  b.total_cost - COALESCE(s.total_sold, 0) AS valor_total,
  0 AS valorizacao,
  0 AS rentabilidade_total,
  0 AS rentabilidade_periodo
FROM buy b
LEFT JOIN sell s ON b.user_id = s.user_id AND b.ticker = s.ticker
WHERE (COALESCE(b.qtd, 0) - COALESCE(s.qtd, 0)) > 0;

-- vw_proventos: dividend operations per ticker
CREATE OR REPLACE VIEW public.vw_proventos AS
SELECT
  user_id AS portfolio_id,
  ticker AS asset_id,
  ticker,
  COALESCE(metadata->>'tipo_provento', 'dividendo') AS tipo,
  price AS valor,
  traded_at AS data_pagamento,
  traded_at AS data_base
FROM public.portfolio_operations
WHERE side = 'dividend';

-- Grant access to authenticated users
-- RLS on the underlying portfolio_operations table ensures each user
-- sees only their own rows when querying these views.
GRANT SELECT ON public.vw_patrimonio TO authenticated;
GRANT SELECT ON public.vw_historico TO authenticated;
GRANT SELECT ON public.vw_posicoes TO authenticated;
GRANT SELECT ON public.vw_proventos TO authenticated;
