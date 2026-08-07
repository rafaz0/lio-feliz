-- Corrige achado CRITICO do Security Advisor do Supabase: as 4 views
-- criadas em 20260727000000_create_portfolio_views.sql nao tinham
-- security_invoker, entao rodavam com o dono da view (postgres, que
-- ignora RLS) em vez do usuario que consulta — na pratica, qualquer
-- usuario logado conseguiria ver os dados de TODOS os usuarios atraves
-- dessas views, ignorando a regra "cada um ve so o proprio dado" que
-- existe em portfolio_operations. security_invoker = on faz a view
-- respeitar o RLS de quem esta consultando, sem mudar nenhuma logica.
ALTER VIEW public.vw_patrimonio SET (security_invoker = on);
ALTER VIEW public.vw_historico SET (security_invoker = on);
ALTER VIEW public.vw_posicoes SET (security_invoker = on);
ALTER VIEW public.vw_proventos SET (security_invoker = on);
