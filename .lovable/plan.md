# App tipo Investidor 10 — MVP

App inspirado no Investidor 10 com foco em **página de ativo** (fundamentos + gráfico) e **minha carteira**. Login email/senha + Google. Dados de mercado 100% mockados; operações da carteira persistidas em Lovable Cloud. Integração com B3 fica para uma fase futura — a arquitetura já deixa espaço para plugar (Pluggy, import de CSV do extrato B3, etc.) sem retrabalho.

## Escopo desta entrega

**Públicas**

- `/` — home com busca de ticker, destaques do mercado (mock), CTA de login
- `/ativo/$ticker` — página de ativo (fundamentos, cotação, gráfico, dividendos)
- `/auth` — login/cadastro (email+senha e Google)

**Autenticadas** (`_authenticated/`)

- `/carteira` — posição consolidada, rentabilidade, alocação por setor
- `/carteira/operacoes` — cadastro e histórico de compras/vendas

## Página de ativo

Layout denso, estilo Investidor 10:

- Header: logo, ticker, nome, setor, preço, variação do dia
- Grid de cards de indicadores: P/L, P/VP, DY, ROE, ROIC, Margem Líquida, Dív. Líq./EBITDA, LPA, VPA
- Gráfico de linha (Recharts) — cotação 12 meses
- Tabela de dividendos pagos nos últimos 12 meses
- "Sobre a empresa" (descrição mock)
- Botão "Adicionar à carteira" (só logado) → abre modal de operação pré-preenchido

## Minha carteira

- Cards de topo: patrimônio total, rentabilidade (%), lucro/prejuízo, nº de ativos
- Gráfico de pizza (Recharts) — alocação por setor
- Tabela de posições: ticker, qtd, preço médio, preço atual, valor atual, variação, %
- Formulário de nova operação: ticker, tipo (compra/venda), quantidade, preço, data
- Histórico de operações com editar/excluir

Posição consolidada é **calculada em runtime** a partir das operações + cotação mock (preço médio ponderado, quantidade líquida).

## Integração B3 — preparada, mas não ativada

Sem código de B3 nesta versão. Para não gerar retrabalho quando plugarmos:

- Operações ficam numa tabela genérica `portfolio_operations` com coluna `source` (`manual` | `b3_import` | `pluggy` no futuro)
- Botão desabilitado "Sincronizar com B3 (em breve)" na tela de carteira, sinalizando o roadmap

Quando quiser ativar, os dois caminhos são: import de extrato B3 (CSV/PDF, sem custo, manual) ou Pluggy/Belvo via Open Finance (automático, requer conta e API key).

## Modelo de dados

**Mock em código** (`src/lib/mock-data.ts`)

- ~30 ativos brasileiros (PETR4, VALE3, ITUB4, MGLU3, BBAS3, WEGE3, ITSA4, etc.)
- Fundamentos, cotação atual, série 12 meses, dividendos, setor

**Persistente (Lovable Cloud)**

- `profiles` (id → auth.users, display_name, avatar_url) + trigger auto-create no signup
- `portfolio_operations` (user_id, ticker, side, quantity, price, traded_at, source, created_at) — RLS por `auth.uid()`

## Autenticação

- Email/senha + Google (Lovable Cloud, provider gerenciado)
- Layout `_authenticated/` (integration-managed) gate a carteira
- Redirect após login volta para a rota original

## Fluxo visual

Antes de codar, vou gerar **3 direções visuais** mantendo o DNA data-heavy denso mas variando composição/hierarquia — ex: (1) dark editorial estilo Bloomberg, (2) claro estilo TradingView, (3) híbrido tipo Investidor 10 com cards coloridos. Você escolhe uma e implemento fielmente.

## Stack técnica

- TanStack Start + TanStack Query
- Recharts (linha + pizza)
- shadcn/ui (tabelas, cards, forms, dialog)
- Lovable Cloud (auth Google + email/senha, Postgres com RLS)
- Design tokens em `src/styles.css`
- Rotas separadas por página com `head()` meta individual (SEO)

## Fora de escopo

- Integração B3 real (roadmap acima)
- Rankings/screener, comparador de ativos
- FIIs/ETFs/cripto (só ações nesta versão)
- API de cotação real
- Alertas de preço, watchlist separada, notificações

Aprove para eu gerar as 3 direções visuais e começar a construir.
