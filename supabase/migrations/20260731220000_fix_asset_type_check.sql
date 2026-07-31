-- Corrige o CHECK constraint de asset_type, que ficou desatualizado.
-- A migracao original (20260706120000_add_asset_type.sql) so permitia
-- ('stock','fii','bdr','etf','fixed_income','crypto','international','other'),
-- mas o app (assetTypeSchema em operations.functions.ts) ja usa tipos mais
-- especificos ha um tempo ('etf_internacional','stock_us','reit'), que nunca
-- foram liberados aqui. Resultado: erro "violates check constraint" ao
-- comprar um ETF internacional (ou qualquer outro tipo novo).
--
-- Mantem 'international' na lista (nao remove) para nao quebrar linhas
-- antigas que ja tenham esse valor.

ALTER TABLE public.portfolio_operations
  DROP CONSTRAINT IF EXISTS portfolio_operations_asset_type_check;

ALTER TABLE public.portfolio_operations
  ADD CONSTRAINT portfolio_operations_asset_type_check
  CHECK (asset_type IN (
    'stock',
    'fii',
    'bdr',
    'etf',
    'fixed_income',
    'crypto',
    'international',
    'etf_internacional',
    'stock_us',
    'reit',
    'other'
  ));
