-- Add asset_type column to portfolio_operations
ALTER TYPE public.operation_source ADD VALUE IF NOT EXISTS 'api_import';

ALTER TABLE public.portfolio_operations
  ADD COLUMN asset_type TEXT NOT NULL DEFAULT 'stock'
  CHECK (asset_type IN ('stock', 'fii', 'bdr', 'etf', 'fixed_income', 'crypto', 'international', 'other'));

ALTER TABLE public.portfolio_operations
  ADD COLUMN currency TEXT NOT NULL DEFAULT 'BRL'
  CHECK (currency IN ('BRL', 'USD'));

-- Backfill existing rows based on ticker pattern
UPDATE public.portfolio_operations
  SET asset_type = 'fii'
  WHERE ticker ~ '^\w+11$';

UPDATE public.portfolio_operations
  SET asset_type = 'stock'
  WHERE asset_type = 'stock'
    AND ticker ~ '^[A-Z0-9]{4,6}\d$';
