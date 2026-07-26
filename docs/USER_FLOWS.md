# Mapeamento de Fluxos de Navegação — Lio Feliz

**Documento:** USER_FLOWS.md

**Versão:** 1.0

**Última atualização:** 25/07/2026

**EWO:** EWO-027

**PI:** PI-015

---

## 1. Objetivo

Este documento descreve os fluxos oficiais de navegação da plataforma Lio Feliz.

Ele mapeia como o usuário percorre os módulos públicos e privados, identifica integrações entre áreas funcionais e serve como referência para futuras implementações de forma a garantir coerência na experiência de navegação.

Este documento **não define** arquitetura de software, componentes ou estilos visuais.

---

## 2. Princípios de Navegação

Os fluxos de navegação da plataforma obedecem aos seguintes princípios:

### P-NAV-001 — Navegação não redundante

Cada funcionalidade possui exatamente um caminho principal de acesso. Evitar múltiplas entradas que levem ao mesmo destino por rotas diferentes, exceto quando justificado por contexto distinto (ex: acesso à análise de um ativo via carteira vs. via mercado).

### P-NAV-002 — Redução de cliques

O usuário deve alcançar qualquer funcionalidade em no máximo 3 cliques a partir da Home. Módulos profundos (ex: detalhe de ativo dentro da carteira) podem exigir até 4 cliques, desde que o contexto seja preservado.

### P-NAV-003 — Preservação de contexto

Ao navegar entre módulos relacionados, o contexto do usuário deve ser preservado sempre que possível. Ex: ao clicar em um ativo na carteira, o usuário deve ser levado à página de detalhe daquele ativo — não a uma lista genérica.

### P-NAV-004 — Reutilização de componentes

Navegação deve utilizar os componentes existentes: `ModuleLayout`, `ModuleTabs`, `ModuleBreadcrumb`, `ModuleSection`, `SiteHeader`, `MobileNav`. Não criar novos padrões de navegação sem necessidade arquitetural validada.

### P-NAV-005 — Identidade de cada módulo

Cada módulo mantém identidade visual e comportamental própria através de `ModuleLayout`. A navegação interna do módulo usa `ModuleTabs`. O usuário deve sentir que está dentro de um contexto específico (ex: "estou na Carteira") ao navegar por suas abas.

---

## 3. Fluxos Públicos

Fluxos que não exigem autenticação. Qualquer visitante pode percorrê-los.

### 3.1 Visitante → Home → Mercado

```
Visitante
  │
  ▼
Home (/) — visão geral do mercado
  │
  ├── ▶ Barra de índices (IBOV, IDIV, IFIX, etc.)
  ├── ▶ Panorama do mercado (cobertura, altas, baixas)
  ├── ▶ Tabela de todos os ativos (busca por nome/ticker)
  ├── ▶ Grid de links rápidos
  │
  ▼
Mercado completo (/) — a própria Home já é a visão de mercado
```

A página inicial (`/`) funciona como vitrine do mercado. O visitante chega à plataforma e imediatamente vê índices, ativos em alta/baixa e uma tabela buscável com todos os ativos disponíveis.

### 3.2 Home → Página de Ativo

```
Home (/)
  │
  ├── ▶ Clicar em ativo na tabela
  ├── ▶ Buscar ticker na barra de busca do header
  └── ▶ Clicar em link "Ver {ticker}" no hero
        │
        ▼
  Página do Ativo (/ativo/$ticker)
        │
        ├── ▶ Cotações, fundamentos, gráfico
        ├── ▶ Dividendos históricos
        ├── ▶ Indicadores financeiros
        └── ▶ Botão "Adicionar à watchlist"
```

### 3.2 Home → FII

```
Home (/)
  │
  ├── ▶ Card "Fundos Imobiliários" no grid
  ├── ▶ Link no footer
  └── ▶ Link no menu móvel
        │
        ▼
  FIIs (/fiis) — lista de FIIs
        │
        ▼
  Página do FII (/fii/$ticker) — detalhe do fundo
```

### 3.3 Home → Análise (Pública)

```
Home (/)
  │
  ▼
  Análise (/analise)
        │
        ├── Visão geral (índice)
        ├── FIIs (/analise/fiis)
        ├── Rankings (/analise/rankings)
        ├── Setores (/analise/setores)
        ├── Comparar (/analise/comparar)
        ├── Calculadoras (/analise/calculadoras)
        ├── Watchlist (/analise/watchlist)
        └── Notícias (/analise/noticias)
```

### 3.4 Home → Dividendos

```
Home (/)
  │
  ├── ▶ Link no menu principal "Dividendos"
  ├── ▶ Card "Agenda de Dividendos" no grid
  └── ▶ Link no footer
        │
        ▼
  Calendário de Dividendos (/dividendos)
        │
        ├── ▶ Calendário mensal de proventos
        ├── ▶ Filtros por ticker, tipo, data
        └── ▶ Link para detalhe do ativo
```

### 3.5 Home → Ferramentas Públicas

```
Home (/)
  │
  ├── Watchlist (/watchlist)
  ├── Rankings (/rankings)
  ├── Setores (/setores)
  ├── Comparador (/comparar)
  ├── Calculadoras (/calculadoras)
  ├── Carteiras Recomendadas (/carteiras-recomendadas)
  └── Notícias (/noticias)
```

### 3.6 Ativo → Comparador

```
Página do Ativo (/ativo/$ticker)
  │
  └── ▶ Botão "Comparar" (se disponível)
        │
        ▼
  Comparador (/comparar) — ativo pré-selecionado
```

### 3.7 Fluxo de Autenticação

```
Visitante
  │
  ▼
  Home (/)
  │
  ├── ▶ Botão "Entrar" no header
  └── ▶ Tentativa de acesso a rota autenticada (redireciona)
        │
        ▼
  Login (/auth ou /login)
        │
        ├── ▶ Login com email/senha
        ├── ▶ Magic link (Supabase Auth)
        └── ▶ Cadastro (/register)
              │
              ▼
        Home autenticada (/)
              │
              ├── ▶ Header agora exibe nome do usuário + menu
              └── ▶ Rotas autenticadas liberadas
```

---

## 4. Fluxos Privados (Autenticados)

Fluxos que exigem login. O layout `_authenticated` aplica verificação de sessão e renderiza `MobileNav`.

### 4.1 Login → Dashboard (Hub Central)

```
Login
  │
  ▼
  Home (/)
  │
  ├── ▶ MobileNav: ícone Dashboard
  └── ▶ (usuário logado pode acessar diretamente)
        │
        ▼
  Dashboard (/dashboard) — Hub Central
        │
        ├── ▶ Saudação personalizada ("Olá, {nome}")
        │
        ├── ▶ Acesso Rápido (atalhos para módulos)
        │     ├── Carteira (/carteira)
        │     ├── Análise (/analise)
        │     ├── Dividendos (/dividendos)
        │     ├── Mercado (/)
        │     ├── Metas (/metas)
        │     ├── Provisionador (/provisionador)
        │     ├── Watchlist (/watchlist)
        │     └── Comparador (/comparar)
        │
        ├── ▶ Sua Carteira
        │     ├── KPIs (Patrimônio, Investido, Disponível, Evolução)
        │     ├── Insights (intelligence layer)
        │     ├── Patrimônio Consolidado
        │     ├── Alocação por Classe (gráfico)
        │     └── Evolução Patrimonial (gráfico)
        │
        └── ▶ Alertas e Notificações (preparado para futuras funcionalidades)
              ├── Link para Rebalanceamento
              └── Link para Cobertura
```

### 4.2 Login → Carteira → Resumo

```
Login
  │
  ▼
  Home (/)
  │
  ├── ▶ Link "Carteira" no menu principal
  ├── ▶ Card "Carteira" no grid
  ├── ▶ Link "Minha carteira" no menu do usuário
  └── ▶ MobileNav: ícone Carteira
        │
        ▼
  Carteira (/carteira) — layout do módulo
        │
        ├── ModuleBreadcrumb: Início > Carteira
        ├── ModuleHeader: "Carteira" + descrição
        ├── ModuleTabs: [Resumo, Lançamentos, Rentabilidade, Patrimônio, Análise, ...]
        │
        ▼
  Resumo da Carteira (/carteira) — visão geral
        │
        ├── ▶ Gráfico de evolução patrimonial (AreaChart)
        ├── ▶ Posições consolidadas por ativo
        ├── ▶ Alocação por tipo/setor
        ├── ▶ Últimos proventos
        └── ▶ Metas e progresso
```

### 4.2 Carteira → Patrimônio

```
Carteira (/carteira)
  │
  └── ▶ Aba "Patrimônio"
        │
        ▼
  Patrimônio (/carteira/patrimonio)
        │
        ├── ▶ Gráfico de evolução patrimonial detalhado
        ├── ▶ Linha do tempo de aportes
        └── ▶ Comparativo: valor de mercado vs. total investido
```

### 4.3 Carteira → Rentabilidade

```
Carteira (/carteira)
  │
  └── ▶ Aba "Rentabilidade"
        │
        ▼
  Rentabilidade (/carteira/rentabilidade)
        │
        ├── ▶ Rentabilidade acumulada vs. benchmarks (IBOV, IDIV, IFIX)
        └── ▶ Gráfico comparativo
```

### 4.4 Carteira → Proventos

```
Carteira (/carteira)
  │
  └── ▶ Aba "Proventos"
        │
        ▼
  Proventos (/carteira/proventos)
        │
        ├── ▶ Dividendos e JCP recebidos (agrupados por ticker)
        ├── ▶ Proventos projetados
        ├── ▶ Timeline de recebimentos
        └── ▶ Botão "Sincronizar proventos" (auto-sync)
```

### 4.5 Carteira → Lançamentos (Operações)

```
Carteira (/carteira)
  │
  └── ▶ Aba "Lançamentos"
        │
        ▼
  Lançamentos (/carteira/lancamentos)
        │
        ├── ▶ Histórico de compras e vendas
        ├── ▶ Botão "Novo lançamento" → AddOperationDialog
        └── ▶ Abas: Proventos | Bonificação (no diálogo)
```

### 4.6 Carteira → Análise do Ativo

```
Carteira (/carteira)
  │
  └── ▶ Clicar em um ativo na lista de posições
        │
        ▼
  Análise do Ativo (/carteira/analise)
        │
        ├── ▶ Gráfico de evolução do ativo na carteira
        ├── ▶ Rentabilidade do ativo
        ├── ▶ Dividendos recebidos do ativo
        └── ▶ Link para página pública do ativo (/ativo/$ticker)
```

### 4.7 Carteira → IRPF

```
Carteira (/carteira)
  │
  └── ▶ Aba "IRPF"
        │
        ▼
  IRPF (/carteira/irpf)
        │
        ├── ▶ Apuração mensal de IRPF
        ├── ▶ Ganhos líquidos por mês
        ├── ▶ Day-trade vs. swing-trade
        └── ▶ Exportação CSV
```

### 4.8 Carteira → Metas

```
Carteira (/carteira)
  │
  └── ▶ Aba "Metas"
        │
        ▼
  Metas (/carteira/metas)
        │
        ├── ▶ Metas financeiras (patrimônio, renda passiva)
        ├── ▶ Progresso por meta
        └── ▶ Contribuições mensais
```

### 4.9 Carteira → Cobertura

```
Carteira (/carteira)
  │
  └── ▶ Aba "Cobertura"
        │
        ▼
  Cobertura (/carteira/cobertura)
        │
        ├── ▶ Cobertura de proventos sobre despesas
        └── ▶ Projeção de independência financeira
```

### 4.10 Carteira → Rebalanceamento

```
Carteira (/carteira)
  │
  └── ▶ Aba "Rebalanceamento"
        │
        ▼
  Rebalanceamento (/carteira/rebalanceamento)
        │
        ├── ▶ Alocação atual vs. alocação alvo
        ├── ▶ Sugestões de aporte/venda
        └── ▶ Simulação de rebalanceamento
```

### 4.11 Carteira → Histórico

```
Carteira (/carteira)
  │
  └── ▶ Aba "Histórico"
        │
        ▼
  Histórico (/carteira/historico)
        │
        ├── ▶ Timeline completa de eventos da carteira
        └── ▶ Filtros por tipo de operação
```

### 4.12 Carteira → Configurações

```
Carteira (/carteira)
  │
  └── ▶ Aba "Configurações"
        │
        ▼
  Configurações (/carteira/configuracoes)
        │
        ├── ▶ Preferências de exibição
        └── ▶ Metas de alocação
```

### 4.13 Dashboard

```
Login
  │
  ▼
  Home (/)
  │
  ├── ▶ MobileNav: ícone Dashboard
  └── ▶ (usuário logado vê dashboard aprimorado)
        │
        ▼
  Dashboard (/dashboard)
        │
        ├── ▶ Resumo executivo da carteira
        ├── ▶ Insights (intelligence layer)
        └── ▶ Ações rápidas
```

### 4.14 Provisionador

```
Carteira (/carteira)
  │
  └── ▶ (link externo ou acesso direto)
        │
        ▼
  Menu do usuário → "Provisionador"
        │
        ▼
  Provisionador (/provisionador)
        │
        ├── ▶ Provisionador de dividendos com timeline
        └── ▶ Projeção de renda passiva futura
```

### 4.15 IRPF (Standalone)

```
Menu do usuário → "IRPF"
  │
  ▼
  IRPF (/irpf)
        │
        ├── ▶ Helper completo de IRPF
        ├── ▶ Exportação CSV para declaração
        └── ▶ Cálculo de impostos mensais
```

---

## 5. Mapa de Navegação por Módulo

### Módulo Carteira (12 abas)

```
/carteira
  │
  ├── /carteira/             → Resumo (índice)
  ├── /carteira/lancamentos  → Lançamentos
  ├── /carteira/rentabilidade→ Rentabilidade
  ├── /carteira/patrimonio   → Patrimônio
  ├── /carteira/analise      → Análise
  ├── /carteira/cobertura    → Cobertura
  ├── /carteira/proventos    → Proventos
  ├── /carteira/metas        → Metas
  ├── /carteira/irpf         → IRPF
  ├── /carteira/historico    → Histórico
  ├── /carteira/rebalanceamento → Rebalanceamento
  └── /carteira/configuracoes → Configurações
```

### Módulo Análise (8 páginas: 1 layout + 1 índice + 6 abas)

```
/analise
  │
  ├── /analise/             → Início (índice)
  ├── /analise/fiis         → FIIs
  ├── /analise/rankings     → Rankings
  ├── /analise/setores      → Setores
  ├── /analise/comparar     → Comparar
  ├── /analise/calculadoras → Calculadoras
  ├── /analise/watchlist    → Watchlist
  └── /analise/noticias     → Notícias
```

---

## 6. Integrações Esperadas

Oportunidades de conexão entre módulos para criar jornadas completas.

### 6.1 Carteira → Ativo

```
Posição na Carteira
  │
  └── ▶ Clique no ticker
        │
        ▼
  Página Pública do Ativo (/ativo/$ticker)
        │
        ├── ▶ Fundamentos completos
        ├── ▶ Histórico de preços
        ├── ▶ Dividendos
        └── ▶ Botão "Voltar para Carteira"
```

**Status:** ✅ Funcional (link direto via ticker)

### 6.2 Ativo → Mercado

```
Página do Ativo (/ativo/$ticker)
  │
  └── ▶ Link para setor/segmento
        │
        ▼
  Visão de Mercado (/) — filtrada por segmento
```

**Status:** ⚠️ Parcial — setor visível no ativo, mas sem link direto para filtro no mercado

### 6.3 Mercado → Dividendos

```
Mercado (/) — tabela de ativos
  │
  └── ▶ Coluna DY (Dividend Yield)
        │
        ▼
  Dividendos (/dividendos) — calendário completo
```

**Status:** ✅ Funcional (link no menu principal)

### 6.4 Dividendos → Empresa

```
Dividendos (/dividendos)
  │
  ├── ▶ Clique no ticker (coluna "Ativo")
  │     │
  │     ▼
  │   Página do Ativo (/ativo/$ticker) ou FII (/fii/$ticker)
  │
  └── ▶ Clique no nome da empresa (coluna "Empresa")
        │
        ▼
  Página do Ativo (/ativo/$ticker) ou FII (/fii/$ticker)
```

**Status:** ✅ Implementado (EWO-028) — nome da empresa também é clicável, link direto para página do ativo

### 6.5 Empresa → Análise

```
Página do Ativo (/ativo/$ticker)
  │
  ├── ▶ Botão "Análise" no header do ativo
  │     │
  │     ▼
  │   Módulo Análise (/analise) — visão geral
  │
  └── ▶ Link "Comparar" (quando disponível)
        │
        ▼
  Comparador (/comparar)
```

**Status:** ✅ Implementado (EWO-028) — botão "Análise" no cabeçalho da página do ativo

### 6.6 Análise → Comparador

```
Análise (/analise)
  │
  └── ▶ Aba "Comparar"
        │
        ▼
  Comparador (/comparar)
```

**Status:** ✅ Funcional (ModuleTabs no módulo Análise)

### 6.7 Comparador → Carteira

```
Comparador (/comparar)
  │
  ├── ▶ Botão "Minha Carteira" no header
  │     │
  │     ▼
  │   Carteira (/carteira)
  │
  └── ▶ Ticker clicável → Página do Ativo (/ativo/$ticker)
        │
        └── ▶ "Adicionar à carteira" na página do ativo
```

**Status:** ✅ Implementado (EWO-028) — botão "Minha Carteira" no header do comparador + tickers clicáveis para página de detalhe

### 6.8 Watchlist → Ativo

```
Watchlist (/watchlist)
  │
  └── ▶ Clique no ticker
        │
        ▼
  Página do Ativo (/ativo/$ticker)
```

**Status:** ✅ Funcional

### 6.9 Calculadoras → Carteira

```
Calculadoras (/calculadoras)
  │
  └── ▶ Resultado de simulação
        │
        ▼
  "Aplicar na carteira" ou "Definir meta"
```

**Status:** ❌ Não implementado — calculadoras são independentes

### 6.10 Carteira → Provisionador

```
Carteira (/carteira) — aba Proventos
  │
  └── ▶ Botão "Provisionador completo"
        │
        ▼
  Provisionador (/provisionador)
```

**Status:** ✅ Implementado (EWO-028) — botão "Provisionador completo" na aba Proventos

### 6.11 Proventos → IRPF

```
Proventos (/carteira/proventos) ou (/carteira)
  │
  └── ▶ "Ver apuração IRPF"
        │
        ▼
  IRPF (/carteira/irpf) ou (/irpf)
```

**Status:** ✅ Funcional (abas no módulo Carteira)

---

## 7. Matriz de Navegação

| Origem                     | Destino                          | Tipo            | Auth | Observações                                 |
| -------------------------- | -------------------------------- | --------------- | ---- | ------------------------------------------- |
| Home (`/`)                 | Ativo (`/ativo/$ticker`)         | Público         | Não  | Click na tabela, busca, ou hero             |
| Home (`/`)                 | FII (`/fii/$ticker`)             | Público         | Não  | Via `/fiis` ou link direto                  |
| Home (`/`)                 | Dividendos (`/dividendos`)       | Público         | Não  | Menu principal ou grid                      |
| Home (`/`)                 | Análise (`/analise`)             | Público         | Não  | Menu principal                              |
| Home (`/`)                 | Watchlist (`/watchlist`)         | Público         | Não  | Grid de links rápidos                       |
| Home (`/`)                 | Rankings (`/rankings`)           | Público         | Não  | Grid ou menu móvel                          |
| Home (`/`)                 | Setores (`/setores`)             | Público         | Não  | Grid ou menu móvel                          |
| Home (`/`)                 | Comparador (`/comparar`)         | Público         | Não  | Grid ou menu                                |
| Home (`/`)                 | Calculadoras (`/calculadoras`)   | Público         | Não  | Grid ou footer                              |
| Home (`/`)                 | Carteiras Recomendadas           | Público         | Não  | Grid ou footer                              |
| Home (`/`)                 | Notícias (`/noticias`)           | Público         | Não  | Grid ou footer                              |
| Home (`/`)                 | Login (`/auth`)                  | Público         | Não  | Header "Entrar"                             |
| Home (`/`)                 | Carteira (`/carteira`)           | Privado         | Sim  | Menu principal, grid, MobileNav             |
| Home (`/`)                 | Metas (`/metas`)                 | Privado         | Sim  | Grid (se logado)                            |
| Home (`/`)                 | Provisionador                    | Privado         | Sim  | Grid (se logado)                            |
| Home (`/`)                 | Dashboard (`/dashboard`)         | Privado         | Sim  | MobileNav                                   |
| Análise (`/analise`)       | FIIs (`/analise/fiis`)           | Público         | Não  | Aba do módulo                               |
| Análise (`/analise`)       | Rankings (`/analise/rankings`)   | Público         | Não  | Aba do módulo                               |
| Análise (`/analise`)       | Comparar (`/analise/comparar`)   | Público         | Não  | Aba do módulo                               |
| Análise (`/analise`)       | Calculadoras                     | Público         | Não  | Aba do módulo                               |
| Análise (`/analise`)       | Watchlist (`/analise/watchlist`) | Público         | Não  | Aba do módulo                               |
| Carteira (`/carteira`)     | Resumo (`/carteira/`)            | Privado         | Sim  | Aba índice do módulo                        |
| Carteira (`/carteira`)     | Lançamentos                      | Privado         | Sim  | Aba do módulo                               |
| Carteira (`/carteira`)     | Rentabilidade                    | Privado         | Sim  | Aba do módulo                               |
| Carteira (`/carteira`)     | Patrimônio                       | Privado         | Sim  | Aba do módulo                               |
| Carteira (`/carteira`)     | Análise                          | Privado         | Sim  | Aba do módulo                               |
| Carteira (`/carteira`)     | Cobertura                        | Privado         | Sim  | Aba do módulo                               |
| Carteira (`/carteira`)     | Proventos                        | Privado         | Sim  | Aba do módulo                               |
| Carteira (`/carteira`)     | Metas                            | Privado         | Sim  | Aba do módulo                               |
| Carteira (`/carteira`)     | IRPF                             | Privado         | Sim  | Aba do módulo                               |
| Carteira (`/carteira`)     | Rebalanceamento                  | Privado         | Sim  | Aba do módulo                               |
| Carteira (`/carteira`)     | Configurações                    | Privado         | Sim  | Aba do módulo                               |
| Carteira (posição)         | Ativo (`/ativo/$ticker`)         | Privado→Público | Não  | Click no ticker da posição                  |
| Ativo (`/ativo/$ticker`)   | Comparador (`/comparar`)         | Público         | Não  | Botão "Comparar"                            |
| Ativo (`/ativo/$ticker`)   | Análise (`/analise`)             | Público         | Não  | Botão "Análise" no header (EWO-028)         |
| Comparador (`/comparar`)   | Carteira (`/carteira`)           | Privado         | Sim  | Botão "Minha Carteira" (EWO-028)            |
| Comparador (`/comparar`)   | Ativo (`/ativo/$ticker`)         | Público         | Não  | Ticker clicável na tabela e cards (EWO-028) |
| Dividendos (`/dividendos`) | Ativo (`/ativo/$ticker`)         | Público         | Não  | Click no ticker ou nome da empresa          |
| Proventos Carteira         | Provisionador                    | Privado         | Sim  | Botão "Provisionador completo" (EWO-028)    |
| Watchlist (`/watchlist`)   | Ativo (`/ativo/$ticker`)         | Público         | Não  | Click no ticker                             |
| Menu Usuário               | IRPF (`/irpf`)                   | Privado         | Sim  | Dropdown do usuário                         |
| Menu Usuário               | Carteira/Proventos               | Privado         | Sim  | Dropdown do usuário                         |
| MobileNav                  | Dashboard                        | Privado         | Sim  | Ícone Home                                  |
| Dashboard                  | Carteira (`/carteira`)           | Privado         | Sim  | Quick Action (EWO-030)                      |
| Dashboard                  | Análise (`/analise`)             | Público         | Não  | Quick Action (EWO-030)                      |
| Dashboard                  | Dividendos (`/dividendos`)       | Público         | Não  | Quick Action (EWO-030)                      |
| Dashboard                  | Mercado (`/`)                    | Público         | Não  | Quick Action (EWO-030)                      |
| Dashboard                  | Metas (`/metas`)                 | Privado         | Sim  | Quick Action (EWO-030)                      |
| Dashboard                  | Provisionador                    | Privado         | Sim  | Quick Action (EWO-030)                      |
| Dashboard                  | Watchlist (`/watchlist`)         | Público         | Não  | Quick Action (EWO-030)                      |
| Dashboard                  | Comparador (`/comparar`)         | Público         | Não  | Quick Action (EWO-030)                      |
| Dashboard                  | Rebalanceamento                  | Privado         | Sim  | Link seção Alertas (EWO-030)                |
| Dashboard                  | Cobertura                        | Privado         | Sim  | Link seção Alertas (EWO-030)                |
| MobileNav                  | Carteira                         | Privado         | Sim  | Ícone Wallet                                |
| MobileNav                  | Dividendos                       | Público         | Não  | Ícone PiggyBank                             |
| MobileNav                  | Metas                            | Privado         | Sim  | Ícone Target                                |
| MobileNav                  | Análise                          | Privado         | Sim  | Ícone BarChart3                             |

---

## 8. Oportunidades Futuras

As oportunidades abaixo foram identificadas durante o mapeamento dos fluxos de navegação. Nenhuma deve ser implementada nesta EWO.

### OF-001 — Deep linking: Comparador → Carteira

O comparador não possui integração com a carteira do usuário. Um ativo pesquisado no comparador poderia oferecer "Ver posição na carteira" ou "Adicionar à carteira". Isso criaria um ciclo completo: Mercado → Comparador → Carteira.

### OF-002 — Navegação contextual: Ativo → Setor no Mercado

A página do ativo exibe o setor, mas não oferece um link para ver outros ativos do mesmo setor no mercado. Um link "Ver setor {nome} no mercado" melhoraria a descoberta.

### OF-003 — Proventos → Provisionador (link direto)

A aba Proventos da Carteira não possui link direto para o Provisionador de Dividendos. Adicionar um botão "Ver provisionador completo" na aba Proventos melhoraria a continuidade.

### OF-004 — Calculadoras → Metas (aplicar resultado)

As calculadoras são independentes. Um botão "Definir como meta" ao final de uma simulação (ex: Juros Compostos) permitiria criar uma meta na carteira com o valor calculado.

### OF-005 — Dashboard como hub central

O Dashboard (`/dashboard`) tem potencial para ser o primeiro destino pós-login, substituindo a Home pública como landing page para usuários autenticados. Isso reduziria um clique no fluxo Login → Carteira.

### OF-006 — Breadcrumb consistente em páginas avulsas

Páginas avulsas (ex: `/calculadoras`, `/watchlist`) não possuem `ModuleBreadcrumb`. Aplicar o componente padronizado melhoraria a orientação do usuário.

### OF-007 — Ativo → Análise (link contextual)

A página do ativo poderia oferecer "Analisar" como ação, levando a uma visão de análise contextualizada para aquele ativo específico dentro do módulo Análise.

### OF-008 — Notificações de navegação

Quando o usuário é redirecionado para login por tentar acessar rota autenticada, não há mensagem explicativa. Uma notificação toast "Faça login para acessar esta funcionalidade" melhoraria a experiência.

### OF-009 — Sincronização automática visível

O status da sincronização de proventos (SyncIndicator) existe no header, mas não há feedback visual na aba Proventos sobre o último sync. Um timestamp "Última sincronização: {data}" melhoraria a transparência.

### OF-010 — Atalho de teclado para busca global

A barra de busca no header poderia ser ativada por atalho de teclado (ex: `Ctrl+K` ou `/`) para acesso rápido a qualquer ativo, reduzindo o tempo de navegação.

---

## 9. Histórico

### Versão 1.2 — 25/07/2026

- EWO-030: Dashboard transformado em Hub Central.
- Novo fluxo: Login → Dashboard (saudação, acesso rápido, carteira, alertas).
- 10 novas entradas na matriz de navegação (Quick Actions + Alertas).
- 8 atalhos de acesso rápido para módulos principais.

### Versão 1.1 — 25/07/2026

- EWO-028: Status de integrações atualizados com as implementações.
- Comparador → Carteira: ✅ Implementado (botão "Minha Carteira" + tickers clicáveis).
- Dividendos → Empresa: ✅ Implementado (nome da empresa também clicável).
- Ativo → Análise: ✅ Implementado (botão "Análise" no header do ativo).
- Proventos → Provisionador: ✅ Implementado (botão "Provisionador completo").
- Matriz de navegação expandida com 5 novas entradas.

### Versão 1.0 — 25/07/2026

- Criação do documento.
- Mapeamento de 7 fluxos públicos e 15 fluxos privados.
- Documentação de 2 módulos (Carteira com 12 abas, Análise com 6 abas).
- 11 integrações entre módulos identificadas e classificadas.
- 10 oportunidades futuras registradas.
- Matriz de navegação com 34 entradas.
