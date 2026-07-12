# Mapa de Convergência — PS#029

**Projeto:** Lio Feliz

**Data:** 11/07/2026

**Objetivo:** Classificação dos componentes de código segundo aderência à cadeia arquitetural oficial (Transaction → Interpretation → Trace → Ledger → Engine).

---

## Legenda

| Classificação | Significado |
|--------------|-------------|
| **KEEP** | Componente aderente. Pode ser mantido com ajustes mínimos. |
| **REFACTOR** | Componente aproveitável, porém necessita reestruturação para alinhamento arquitetural. |
| **REMOVE** | Componente incompatível, obsoleto ou duplicado. |

---

## 1. Núcleo Arquitetural (Transaction → Interpretation → Trace → Ledger → Engine)

### Transaction Layer

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| Operações CRUD | `src/lib/operations.functions.ts` | Compatível | KEEP |
| Modelos de Operação | `supabase/migrations/20260704...sql` (portfolio_operations) | Compatível | KEEP |
| Tipos de Operação (enum) | `supabase/migrations/20260704...sql` (operation_side, operation_source) | Compatível | KEEP |
| Asset Type | `supabase/migrations/20260706...sql` (asset_type) | Compatível | KEEP |
| Diálogo de Operação | `src/components/add-operation-dialog.tsx` | Compatível | KEEP |
| Tabela de Operações | `src/components/operations-content.tsx` | Compatível | KEEP |

### Interpretation Layer (CRITICAL GAP)

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| Asset Type Inference | `src/lib/portfolio/asset-types.ts` | Compatível | KEEP |
| Tax Rules Engine | `src/lib/tax/rules.ts` | Compatível | KEEP |
| **Dedicated Interpretation Module** | ❌ **Não existe** | **Ausente** | **REFACTOR** |
| Interpretação embutida em rotas | `src/routes/_authenticated/carteira.index.tsx` | Violação arquitetural | REFACTOR |
| Interpretação embutida em componentes | `src/components/proventos-content.tsx` | Violação arquitetural | REFACTOR |

### Trace Layer (CRITICAL GAP)

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| **Dedicated Trace Module** | ❌ **Não existe** | **Ausente** | **REFACTOR** |
| Rastreabilidade via TRACE_TRANSACTION.md | Apenas documental | Não implementada | REFACTOR |

### Ledger Layer

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| Tabela portfolio_operations | `supabase/migrations/` (tabela) | Compatível | KEEP |
| Supabase Client | `src/integrations/supabase/client.ts` | Compatível | KEEP |
| Supabase Server Client | `src/integrations/supabase/client.server.ts` | Compatível | KEEP |
| Supabase Types | `src/integrations/supabase/types.ts` | Compatível | KEEP |
| **Dedicated Ledger Abstraction** | ❌ **Não existe** | **Ausente** | **REFACTOR** |
| Consultas diretas em rotas | Múltiplas rotas _authenticated/ | Violação arquitetural | REFACTOR |

### Engine Layer

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| Core Models | `src/lib/portfolio/models.ts` | Compatível | KEEP |
| Consolidator | `src/lib/portfolio/consolidator.ts` | Parcialmente alinhado | REFACTOR |
| Portfolio History | `src/lib/portfolio/history.ts` | Parcialmente alinhado | REFACTOR |
| Portfolio barrel | `src/lib/portfolio/index.ts` | Compatível | KEEP |

---

## 2. Integrações com Fontes Externas

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| Yahoo Finance | `src/lib/yahoo.server.ts` | Independente | KEEP |
| CoinGecko | `src/lib/coingecko.server.ts` | Independente | KEEP |
| BRAPI / Data Functions | `src/lib/data-functions.ts` | Independente | REFACTOR |
| Quotes Router | `src/lib/quotes.functions.ts` | Independente | KEEP |
| Exchange Rate | `src/lib/exchange.server.ts` | Independente | KEEP |
| Market Indices | `src/lib/market-indices.ts` | Independente | KEEP |

---

## 3. Business Rules

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| Tax Rules | `src/lib/tax/rules.ts` | Alinhado | KEEP |
| Tax barrel | `src/lib/tax/index.ts` | Compatível | KEEP |
| Valuation (Graham/Bazin) | `src/lib/valuation.ts` | Alinhado | KEEP |
| Scorecard | `src/lib/scorecard.ts` | Alinhado | KEEP |
| Technical Indicators | `src/lib/technical-indicators.ts` | Alinhado | KEEP |
| Recommended Portfolios | `src/lib/recommended-portfolios.ts` | Alinhado | KEEP |
| Dividend Projections | `src/lib/dividend-projections.ts` | Alinhado | KEEP |
| Goals | `src/lib/goals.ts` | Alinhado | KEEP |
| Watchlist | `src/lib/watchlist.ts` | Alinhado | KEEP |

---

## 4. Rotas (UI)

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| Root Layout | `src/routes/__root.tsx` | Compatível | KEEP |
| Auth | `src/routes/auth.tsx` | Compatível | KEEP |
| Homepage | `src/routes/index.tsx` | Compatível | KEEP |
| Asset Detail | `src/routes/ativo.$ticker.tsx` | Monolítico (67KB) | REFACTOR |
| FII Detail | `src/routes/fii.$ticker.tsx` | Monolítico (26KB) | REFACTOR |
| Portfolio Dashboard | `src/routes/_authenticated/carteira.index.tsx` | Monolítico (33KB) | REFACTOR |
| Portfolio Rentability | `src/routes/_authenticated/carteira.rentabilidade.tsx` | Aceitável | KEEP |
| Portfolio Patrimony | `src/routes/_authenticated/carteira.patrimonio.tsx` | Aceitável | KEEP |
| Portfolio Analysis | `src/routes/_authenticated/carteira.analise.tsx` | Aceitável | KEEP |
| Portfolio Coverage | `src/routes/_authenticated/carteira.cobertura.tsx` | Aceitável | KEEP |
| Provisioner | `src/routes/_authenticated/provisionador.tsx` | Aceitável | REFACTOR |
| Rankings | `src/routes/rankings.tsx` | Aceitável | KEEP |
| Compare | `src/routes/comparar.tsx` | Aceitável | KEEP |
| Watchlist | `src/routes/watchlist.index.tsx` | Aceitável | KEEP |
| Redirect routes | Múltiplos (carteira.*, metas, irpf) | Ruído | KEEP |

---

## 5. Componentes de Domínio

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| Site Header | `src/components/site-header.tsx` | Compatível | KEEP |
| IRPF Content | `src/components/irpf-content.tsx` | Misto (UI + regra) | REFACTOR |
| Metas Content | `src/components/metas-content.tsx` | Aceitável | KEEP |
| Proventos Content | `src/components/proventos-content.tsx` | Misto (UI + regra) | REFACTOR |
| Safe Boundary | `src/components/safe-boundary.tsx` | Compatível | KEEP |
| Theme Toggle | `src/components/theme-toggle.tsx` | Compatível | KEEP |
| Delta Pct | `src/components/delta-pct.tsx` | Compatível | KEEP |
| shadcn/ui (46) | `src/components/ui/*` | Terceiros | KEEP |

---

## 6. Mock Data

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| Stocks Mock | `src/lib/mock-data.ts` | Provisório | KEEP (condicional) |
| FII Mock | `src/lib/fii-mock-data.ts` | Provisório | KEEP (condicional) |

---

## 7. Hooks e Utilitários

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| useSession | `src/hooks/use-session.ts` | Compatível | KEEP |
| useMobile | `src/hooks/use-mobile.tsx` | Compatível | KEEP |
| Theme Hook | `src/lib/theme.ts` | Compatível | KEEP |
| Format | `src/lib/format.ts` | Compatível | KEEP |
| Utils (cn) | `src/lib/utils.ts` | Compatível | KEEP |

---

## 8. Infraestrutura

| Componente | Arquivo | Estado | Ação |
|-----------|---------|--------|------|
| Start Entry | `src/start.ts` | Compatível | KEEP |
| Server Entry | `src/server.ts` | Compatível | KEEP |
| Router Config | `src/router.tsx` | Compatível | KEEP |
| Route Tree | `src/routeTree.gen.ts` | Auto-gerado | KEEP |
| Auth Attacher | `src/integrations/supabase/auth-attacher.ts` | Compatível | KEEP |
| Auth Middleware | `src/integrations/supabase/auth-middleware.ts` | Compatível | KEEP |
| Lovable Integration | `src/integrations/lovable/index.ts` | Compatível | KEEP |
| Error Capture | `src/lib/error-capture.ts` | Compatível | KEEP |
| Error Page | `src/lib/error-page.ts` | Compatível | KEEP |

---

## Resumo Quantitativo

| Classificação | Quantidade |
|--------------|-----------|
| **KEEP** | ~85 componentes |
| **REFACTOR** | ~15 componentes |
| **REMOVE** | 0 |

### REFACTOR prioritário:
1. **Criar módulo de Interpretation** (gap crítico)
2. **Criar módulo de Trace Transaction** (gap crítico)
3. **Criar abstração de Ledger** (gap crítico)
4. **Refatorar Consolidator** para alinhamento com Engine N1
5. **Decompor ativo.$ticker.tsx** (67KB → módulos)
6. **Decompor carteira.index.tsx** (33KB → módulos)
7. **Extrair regras de negócio** de componententes mistos (proventos-content, irpf-content)
8. **Separar queries Supabase** das rotas para Ledger layer
