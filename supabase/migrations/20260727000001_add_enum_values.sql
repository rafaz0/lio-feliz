-- ============================================================
-- ARQUIVO A — rodar PRIMEIRO, em execução separada
-- ============================================================
-- Adiciona os valores 'dividend' e 'bonus' ao enum operation_side.
-- O PostgreSQL NÃO permite usar valores recém-adicionados na mesma
-- transação em que foram criados, por isso este arquivo deve ser
-- executado ANTES do restante das migrações, em uma chamada separada
-- no SQL Editor.
-- ============================================================

ALTER TYPE public.operation_side ADD VALUE IF NOT EXISTS 'dividend';
ALTER TYPE public.operation_side ADD VALUE IF NOT EXISTS 'bonus';
