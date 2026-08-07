-- Corrige o aviso "Auth RLS Initialization Plan" do Supabase Advisor:
-- policies que chamam auth.uid() diretamente fazem o Postgres reavaliar a
-- funcao a cada linha da tabela, em vez de uma vez so por consulta.
-- Envolver em (select auth.uid()) permite o planner tratar como valor
-- estavel (InitPlan), avaliado uma unica vez. Nao muda nenhuma logica de
-- autorizacao — so performance, mais relevante conforme as tabelas
-- crescerem. Cobre profiles/portfolio_operations (27/07) e
-- subscriptions/billing_cycles (06/08, mesma classe de aviso que ainda nao
-- tinha aparecido no Advisor por serem tabelas novas).

-- profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING ((select auth.uid()) = id) WITH CHECK ((select auth.uid()) = id);

-- portfolio_operations
DROP POLICY IF EXISTS "Users can view their own operations" ON public.portfolio_operations;
CREATE POLICY "Users can view their own operations" ON public.portfolio_operations
  FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can insert their own operations" ON public.portfolio_operations;
CREATE POLICY "Users can insert their own operations" ON public.portfolio_operations
  FOR INSERT TO authenticated WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can update their own operations" ON public.portfolio_operations;
CREATE POLICY "Users can update their own operations" ON public.portfolio_operations
  FOR UPDATE TO authenticated USING ((select auth.uid()) = user_id) WITH CHECK ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users can delete their own operations" ON public.portfolio_operations;
CREATE POLICY "Users can delete their own operations" ON public.portfolio_operations
  FOR DELETE TO authenticated USING ((select auth.uid()) = user_id);

-- subscriptions (migration 20260806120000, mesma classe de aviso)
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view their own subscriptions" ON public.subscriptions
  FOR SELECT TO authenticated USING ((select auth.uid()) = user_id);

-- billing_cycles
DROP POLICY IF EXISTS "Users can view their own billing cycles" ON public.billing_cycles;
CREATE POLICY "Users can view their own billing cycles" ON public.billing_cycles
  FOR SELECT TO authenticated USING (
    subscription_id IN (
      SELECT id FROM public.subscriptions WHERE user_id = (select auth.uid())
    )
  );
