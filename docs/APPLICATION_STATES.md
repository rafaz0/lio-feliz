# Estados da Aplicação — Lio Feliz

**Documento:** APPLICATION_STATES.md

**Versão:** 2.0

**Última atualização:** 25/07/2026

---

## 1. Objetivo

Este documento descreve os diferentes estados operacionais da plataforma Lio Feliz, definindo o que cada categoria de usuário pode visualizar e como o sistema se comporta em cada ambiente.

Consulte também:

- `USER_FLOWS.md` — fluxos de navegação detalhados
- `PERSONAL_FINANCE_ARCHITECTURE.md` — arquitetura da Gestão Financeira
- `ADR-009` — separação Carteira / Gestão Financeira
- `MODULE_ARCHITECTURE.md` — padrão de módulos

---

## 2. Visitante (Não autenticado)

**Objetivo:** Explorar a plataforma sem compromisso.

**Permissões:** Apenas leitura de dados públicos.

| Funcionalidade         | Rota                      | Observação                                      |
| ---------------------- | ------------------------- | ----------------------------------------------- |
| Home / Mercado         | `/`                       | Índices, ativos em alta/baixa, tabela de ativos |
| Página de Ativo        | `/ativo/$ticker`          | Cotações, fundamentos, dividendos               |
| Página de FII          | `/fii/$ticker`            | Detalhes do fundo imobiliário                   |
| Dividendos             | `/dividendos`             | Calendário de proventos                         |
| Análise                | `/analise`                | FIIs, rankings, setores, comparador             |
| Watchlist              | `/watchlist`              | Lista local (localStorage)                      |
| Rankings               | `/rankings`               | Rankings de ações e FIIs                        |
| Setores                | `/setores`                | Agrupamento por setor                           |
| Comparador             | `/comparar`               | Comparação lado a lado                          |
| Calculadoras           | `/calculadoras`           | 5 calculadoras financeiras                      |
| Carteiras Recomendadas | `/carteiras-recomendadas` | Carteiras pré-definidas                         |
| Notícias               | `/noticias`               | Notícias do mercado                             |

**Limitações:** Não acessa Carteira, Dashboard, Metas, Provisionador, IRPF, Sincronização.

**Comportamento:** Tentativa de acesso a rota autenticada → redireciona para `/login`.

---

## 3. Demo (Usuário simulado)

**Status:** 🟡 Previsto (PI-021)

**Objetivo:** Permitir exploração completa da plataforma sem cadastro.

**Permissões:** Acesso de leitura a todos os módulos com dados fictícios.

**Módulos acessíveis (previstos):**

- Dashboard com carteira demo
- Carteira completa com operações fictícias
- Proventos simulados
- Provisionador com dados de exemplo
- Metas demonstrativas
- IRPF simulado

**Limitações:**

- Nenhuma operação de escrita persiste
- Nenhum dado real é criado ou alterado
- Isolamento completo — dados demo não se misturam com dados reais
- Sessão demo expira após período configurado

**Arquitetura:**

```
Usuário Demo
  → Sessão isolada (sem acesso a Supabase real)
  → Dados mock persistidos apenas em memória
  → Mesma Experience Layer, mesmos componentes
  → Nenhuma rota ou componente exclusivo do demo
```

---

## 4. Usuário Autenticado

**Objetivo:** Gerenciar investimentos reais e finanças pessoais.

**Permissões:** Leitura e escrita nos próprios dados.

Além de todas as funcionalidades do visitante:

| Funcionalidade      | Rota             | Observação              |
| ------------------- | ---------------- | ----------------------- |
| **Dashboard (Hub)** | `/dashboard`     | Primeira tela pós-login |
| Carteira            | `/carteira`      | Módulo com 12 abas      |
| Metas               | `/metas`         | Metas financeiras       |
| Provisionador       | `/provisionador` | Projeção de dividendos  |
| IRPF                | `/irpf`          | Apuração de imposto     |
| Sincronização       | `/sync`          | Sincronização de dados  |
| Configurações       | `/settings`      | Preferências do usuário |
| Checkout            | `/checkout`      | Planos e assinatura     |

**Comportamento:** Header com nome do usuário, SyncIndicator, NotificationPanel, MobileNav.

**Fluxo principal:**

```
Login → Dashboard → Carteira → Ativo → Análise
                  → Dividendos
                  → Metas
                  → Provisionador
                  → IRPF
```

---

## 5. Desenvolvedor (Modo DEV)

**Objetivo:** Desenvolvimento e testes sem dependência de serviços externos.

**Ativação:** Hostname `localhost` / `127.0.0.1` ou `DEV_MODE=true` no `.env`.

**Comportamentos exclusivos:**

| Comportamento     | Detalhe                                                    |
| ----------------- | ---------------------------------------------------------- |
| **DEV_USER**      | Usuário mock `dev-user-0000` bypassa autenticação Supabase |
| **DEV_STORE**     | Operações armazenadas em memória volátil                   |
| **Auth bypass**   | Middleware ignora sessão Supabase                          |
| **Dados mock**    | Fallback para `mock-data.ts` e `fii-mock-data.ts`          |
| **DEV_MODE flag** | Server functions usam store em memória vs. Supabase        |

**Arquivos envolvidos:** `route.tsx`, `auth-middleware.ts`, `use-session.ts`, `operations.functions.ts`.

---

## 6. Administrador

**Status:** 🟡 Previsto (PI futura)

**Objetivo:** Gerenciar usuários, planos e configurações globais.

**Permissões (previstas):**

- Visualizar todos os usuários
- Gerenciar planos e assinaturas
- Configurar taxas e limites
- Auditar operações
- Acessar logs do sistema

**Módulos exclusivos (previstos):**

- Painel administrativo
- Gestão de usuários
- Auditoria de operações
- Configurações globais

---

## 7. Dashboard — Estados de Funcionamento

O Dashboard (`/dashboard`) opera em 4 estados:

| Estado | Descrição             | Resultado            | Componente                 |
| ------ | --------------------- | -------------------- | -------------------------- |
| **A**  | Carteira ativa        | Dashboard completo   | `DashboardView`            |
| **B**  | Sem carteira          | Empty state amigável | `DashboardEmpty`           |
| **C**  | Carteira vazia        | Indicadores zerados  | `DashboardView` (fallback) |
| **D**  | Modo dev sem carteira | Mesmo do Estado B    | `DashboardEmpty`           |

### Regra de Tratamento de Erros (R-DB-001)

Nenhum erro interno deve ser exibido ao usuário. `NotFoundError("Portfolio")` → `DashboardEmpty`. Erros de rede → `DashboardError` com mensagem genérica.

---

## 8. Produção

| Aspecto       | Comportamento                        |
| ------------- | ------------------------------------ |
| Autenticação  | Obrigatória via Supabase Auth        |
| Sessão        | Validada em toda requisição          |
| Banco         | Supabase PostgreSQL                  |
| Cotações      | BRAPI + CoinGecko + Yahoo Finance    |
| Cache         | TanStack Query (staleTime por query) |
| Deploy        | Vercel (GitHub Integration)          |
| Monitoramento | Sentry                               |

### Diferenças Localhost vs. Produção

| Aspecto    | Localhost         | Produção             |
| ---------- | ----------------- | -------------------- |
| Auth       | Bypass (DEV_USER) | Supabase Auth        |
| Sessão     | Mock              | Real                 |
| Operações  | Memória volátil   | Supabase persistente |
| Dados mock | Fallback ativo    | Fallback ativo       |

---

## 9. Roadmap de Estados

| PI     | Estado   | Previsão                           |
| ------ | -------- | ---------------------------------- |
| PI-017 | —        | Arquitetura da Gestão Financeira   |
| PI-018 | —        | Implementação da Gestão Financeira |
| PI-019 | —        | Fluxo de Caixa                     |
| PI-020 | —        | Patrimônio Global                  |
| PI-021 | 🟡 Demo  | Modo Demo                          |
| PI-022 | 🟡 Admin | Estados Operacionais completos     |

## 10. Histórico

### Versão 2.0 — 25/07/2026

- Adicionados estados Demo (seção 3) e Administrador (seção 6).
- Seção 9: Roadmap de Estados.
- Referências cruzadas para USER_FLOWS.md, PERSONAL_FINANCE_ARCHITECTURE.md, ADR-009.

### Versão 1.1 — 25/07/2026

- Seção 7: Dashboard com 4 estados + R-DB-001.

### Versão 1.0 — 25/07/2026

- Criação. 4 estados: Visitante, Autenticado, Desenvolvedor, Produção.
