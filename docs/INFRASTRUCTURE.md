# Infraestrutura — Lio Feliz

**Documento:** INFRASTRUCTURE.md

**Versão:** 2.0

**Última atualização:** 23/07/2026

> ⚠️ **ATENÇÃO — Schema Atual:** O banco de dados possui apenas o schema inicial (3 migrations do período Lovable). **25 tabelas precisam ser criadas** para refletir o estado atual da arquitetura. Veja §Plano de Migração.

---

## Stack de Infraestrutura Oficial

| Componente | Plataforma | Finalidade |
|-----------|-----------|------------|
| Código-fonte | **GitHub** | Versionamento, CI/CD quality gates |
| Banco de dados | **Supabase** | PostgreSQL, Auth, Storage, RLS |
| Hospedagem | **Vercel** | SSR (TanStack Start), CDN, SSL, deploy automatizado |
| Monitoramento | **Sentry** | Error tracking, performance (opcional) |
| APIs de dados | **BRAPI** | Cotações B3 em tempo real |
| Pagamentos | **Stripe** | Gateway de pagamento (opcional, ver ADR-012-001) |

> **Lovable** foi a plataforma de origem do projeto e permanece como ferramenta de desenvolvimento e preview, mas **não faz parte da infraestrutura oficial de produção**. O build e deploy oficiais são gerenciados exclusivamente por GitHub + Vercel.

---

## Supabase

### Projeto

| Atributo | Valor |
|----------|-------|
| Project ID | `shllrynjuqtkdvmjjrqj` |
| URL | `https://c--d9eeb228-0d67-489c-90e4-4386bd0d3438-prod.lovable.cloud` |
| Região | us-east-1 (default) |

> **Nota:** A URL atual é um proxy Lovable. Para produção, recomenda-se usar a URL direta do Supabase Dashboard (`https://shllrynjuqtkdvmjjrqj.supabase.co`).

### Variáveis de Ambiente

#### Produção (Vercel)

```env
# Obrigatórias
NITRO_PRESET=vercel
SUPABASE_URL=https://shllrynjuqtkdvmjjrqj.supabase.co
SUPABASE_PUBLISHABLE_KEY=<anon_key>
BRAPI_TOKEN=<token>
DEV_MODE=false

# Opcionais
SENTRY_DSN=<dsn>
```

#### Desenvolvimento Local (`.env`)

```env
SUPABASE_PROJECT_ID=shllrynjuqtkdvmjjrqj
SUPABASE_URL=https://shllrynjuqtkdvmjjrqj.supabase.co
SUPABASE_PUBLISHABLE_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
VITE_SUPABASE_PROJECT_ID=shllrynjuqtkdvmjjrqj
VITE_SUPABASE_PUBLISHABLE_KEY=<anon_key>
VITE_SUPABASE_URL=https://shllrynjuqtkdvmjjrqj.supabase.co
BRAPI_TOKEN=<token>
DEV_MODE=true
```

> **Nota:** Em ambiente Lovable sandbox, a `SUPABASE_URL` pode ser um proxy Lovable (`https://c--<uuid>-prod.lovable.cloud`). Em produção, usar sempre a URL direta do Supabase Dashboard.

### Bootstrap do Banco

#### Pré-requisitos

1. CLI do Supabase instalada:
   ```bash
   npm install -g supabase
   ```

2. Acesso ao projeto (token de acesso):
   ```bash
   supabase login
   ```

3. Link do projeto local:
   ```bash
   supabase link --project-ref shllrynjuqtkdvmjjrqj
   ```

#### Aplicar Migrations

```bash
supabase db push
```

O comando acima aplica todas as migrations em `supabase/migrations/` na ordem cronológica definida pelos timestamps dos arquivos.

#### Ordem de Execução

| Ordem | Migration | Descrição |
|-------|-----------|-----------|
| 1 | `20260704151014_...` | Schema base: profiles, portfolio_operations, triggers, auto-create profile |
| 2 | `20260704151048_...` | Segurança: revoga EXECUTE de handle_new_user() de papéis públicos |
| 3 | `20260706120000_...` | Extensão: asset_type, currency, api_import para operation_source |

#### Verificação Pós-Bootstrap

Após aplicar as migrations, verificar:

```sql
-- 1. Tabelas criadas
SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public';

-- 2. ENUMs
SELECT typname, enumlabels FROM pg_enum;

-- 3. RLS ativo
SELECT relname, relrowsecurity FROM pg_class
  WHERE relrowsecurity = true;
```

### Migrations: Relatório de Validação

#### Resumo

| Arquivo | Linhas | Status | Observação |
|---------|--------|--------|------------|
| `20260704151014_...sql` | 88 | ✅ Válida | Schema base completo |
| `20260704151048_...sql` | 2 | ✅ Válida | Segurança — revoga EXECUTE |
| `20260706120000_...sql` | 20 | ⚠️ Válida, com ressalvas | Ver abaixo |

#### Observações sobre Migrations

1. **Ordem cronológica**: ✅ Correta. As migrations estão em ordem crescente de timestamp.

2. **Idempotência**: ✅ As migrations usam `CREATE` (não `CREATE IF NOT EXISTS`) para tabelas, o que significa que falham se executadas duas vezes. Isso é esperado para migrations tradicionais. Para re-execução segura, usar `supabase db push` que gerencia o histórico de versões.

3. **Ressalva na migração 3** (`20260706120000_add_asset_type`):
   - O UPDATE backfill para `asset_type = 'stock'` é redundante (já é o DEFAULT).
   - O CHECK constraint de `asset_type` usa `'international'` mas o domínio atual (`AssetType` em `src/lib/portfolio/models.ts`) usa `'etf_internacional'`, `'stock_us'`, `'reit'`. Isso significa que operações com esses tipos não poderão ser inseridas via SQL direto. No entanto, como o sistema usa `DEV_MODE=true` (store em memória) atualmente, isso não bloqueia a operação do sistema.
   - O valor `operation_source` tem o valor legado `'pluggy'` que não é mais usado pelo sistema.

4. **Schema incompleto**: As migrations representam o schema inicial do Lovable. Módulos implementados posteriormente (assinaturas, backtests, alertas, educação, etc.) através de EWOs não possuem migrations correspondentes. Essas tabelas precisam ser criadas manualmente ou através de novas migrations quando o banco for promovido a produção real.

#### Compatibilidade com Novo Projeto Supabase

- As migrations são SQL puro e não dependem de configurações específicas do projeto Lovable original.
- Dependente de `auth.users` (tabela do Supabase Auth) — presente em todo projeto Supabase.
- Nenhuma extensão especial (`pg_*`) além das que o Supabase já fornece por padrão.
- ✅ **Compatível** com qualquer projeto Supabase que tenha Auth habilitado.

---

## Procedimento Completo de Bootstrap

### Primeira Vez (projeto novo)

```bash
# 1. Instalar Supabase CLI
npm install -g supabase

# 2. Login
supabase login

# 3. Criar projeto no Supabase Dashboard
#    - Acessar https://supabase.com/dashboard/projects
#    - Clicar em "New project"
#    - Preencher: nome, database password, região

# 4. Link projeto local
supabase link --project-ref <project-ref>

# 5. Aplicar migrations
supabase db push

# 6. Verificar
supabase db check
```

### Projeto Existente (migrations já aplicadas parcialmente)

```bash
# 1. Link
supabase link --project-ref shllrynjuqtkdvmjjrqj

# 2. Verificar status
supabase migration list

# 3. Aplicar pendentes
supabase db push
```

---

## Plano de Migração do Schema

### Status Atual

| Item | Valor |
|------|-------|
| Migrations existentes | 3 (schema Lovable inicial) |
| Tabelas cobertas | 2 (`profiles`, `portfolio_operations`) |
| Tabelas necessárias (código) | 34 |
| Views necessárias | 4 |
| Tabelas a criar | **32** |
| Enums a criar/estender | 2+ |

### Catálogo Completo de Tabelas

Legenda: ✅ = já existe na migration | ⬜ = precisa criar | 🔧 = precisa alterar

#### Grupo 1 — Schema Base (já existe, inalterado)

| Tabela | Padrão | Status | Descrição |
|--------|--------|--------|-----------|
| `profiles` | Normalizada | ✅ | Perfis de usuário (trigger on auth.users) |
| `portfolio_operations` | Normalizada | ✅ | Operações de compra/venda |

#### Grupo 2 — Assinaturas e Planos (normalizadas)

| Tabela | Padrão | Status | Upsert Key | Descrição |
|--------|--------|--------|------------|-----------|
| `assinaturas` | Normalizada | ⬜ | `usuario_id` | Assinaturas de usuário |
| `planos` | Normalizada | ⬜ | (nenhum) | Planos disponíveis |

**Colunas de `assinaturas`:** `usuario_id TEXT PK, plano TEXT, data_ativacao TIMESTAMPTZ, data_expiracao TIMESTAMPTZ, recursos_liberados JSONB`

**Colunas de `planos`:** `plano_id TEXT PK, nome TEXT, descricao TEXT, preco_mensal NUMERIC, recursos JSONB`

#### Grupo 3 — Modelo Patrimonial (normalizadas)

| Tabela | Padrão | Status | Upsert Key | Descrição |
|--------|--------|--------|------------|-----------|
| `assets` | Normalizada | ⬜ | `id` | Catálogo de ativos |
| `declaracoes_fiscais` | Normalizada | ⬜ | `id` | Declarações fiscais anuais |
| `metas_financeiras` | Normalizada | ⬜ | `usuario_id, meta_id` | Metas financeiras dos usuários |
| `estrategias_configuracao` | Normalizada | ⬜ | `usuario_id` | Estratégia de alocação do usuário |

**Colunas de `assets`:** `id UUID PK, ticker TEXT UNIQUE, name TEXT, asset_type TEXT, is_active BOOLEAN, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ`

**Colunas de `declaracoes_fiscais`:** `id UUID PK, portfolio_id TEXT, ano INTEGER, lotes JSONB, eventos JSONB, consolidado JSONB, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ`

**Colunas de `metas_financeiras`:** `id UUID PK, usuario_id TEXT, meta_id TEXT, nome TEXT, valor_alvo NUMERIC, prazo DATE, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ`

**Colunas de `estrategias_configuracao`:** `usuario_id TEXT PK, dados JSONB, created_at TIMESTAMPTZ, updated_at TIMESTAMPTZ`

#### Grupo 4 — Tabelas JSONB (id + dados + updated_at)

| Tabela | Upsert Key | Colunas Extras | Descrição |
|--------|------------|---------------|-----------|
| `portfolios` | `id` | `usuario_id TEXT` | Carteiras de investimento |
| `investor_profiles` | `id` | — | Perfis de investidor |
| `investor_questionnaires` | `id` | — | Questionários de risco |
| `investor_risk_results` | `id` | — | Resultados de risco |
| `fixed_income` | `id` | — | Renda fixa |
| `financial_goals` | `id` | — | Metas financeiras (JSONB) |
| `foreign_assets` | `id` | — | Ativos internacionais |
| `exchange_rates` | `id` | — | Taxas de câmbio |
| `report_executions` | `id` | — | Execuções de relatório |
| `report_schedules` | `id` | — | Agendamentos de relatório |
| `glossary_terms` | `id` | — | Termos do glossário |
| `tooltips` | `id` | — | Tooltips educacionais |
| `learning_paths` | `id` | — | Trilhas de aprendizado |
| `alert_rules` | `id` | — | Regras de alerta |
| `alerts` | `dedup_key` | `dedup_key TEXT` | Alertas gerados |
| `alert_deliveries` | `id` | — | Entregas de alerta |
| `strategies` | `id` | — | Estratégias de backtest |
| `backtests` | `id` | — | Execuções de backtest |
| `simulation_results` | `id` | — | Resultados de simulação |
| `backtest_snapshots` | `id` | — | Snapshots de backtest |
| `comparison_sets` | `id` | — | Conjuntos de comparação |
| `scorecards` | `id` | — | Scorecards |
| `export_templates` | `id` | — | Templates de exportação |
| `export_jobs` | `id` | — | Jobs de exportação |
| `integrations` | `id` | — | Configurações de integração |
| `sync_logs` | `id` | — | Logs de sincronização |
| `import_jobs` | `id` | — | Jobs de importação |

> **Schema padrão JSONB:** `id UUID PK DEFAULT gen_random_uuid(), dados JSONB NOT NULL, updated_at TIMESTAMPTZ DEFAULT now()`. Tabelas com `usuario_id` ou `dedup_key` adicionam coluna extra.

#### Grupo 5 — Views (derivadas de tabelas existentes)

| View | Descrição | Dados |
|------|-----------|-------|
| `vw_patrimonio` | Patrimônio consolidado por portfolio | portfolio_id, patrimonio_total, investido, alocação, evolução |
| `vw_posicoes` | Posições detalhadas por portfolio | ticker, quantidade, preço médio, valor total, rentabilidade |
| `vw_historico` | Histórico patrimonial | data, patrimonio_total, investido |
| `vw_proventos` | Proventos recebidos | ticker, tipo, valor, data_pagamento |

### Enums

| Enum | Valores Atuais | Valores Necessários | Status |
|------|---------------|--------------------|--------|
| `operation_side` | `buy, sell` | `buy, sell` | ✅ Ok |
| `operation_source` | `manual, b3_import, pluggy, api_import` | `manual, b3_import, api_import` | ⚠️ `pluggy` não usado |
| (novo) `asset_type_v2` | — | `stock, fii, bdr, etf, fixed_income, crypto, etf_internacional, stock_us, reit, other` | ⬜ Criar |
| (novo) `subscription_status` | — | `ACTIVE, CANCELLED, EXPIRED` | ⬜ Criar |
| (novo) `billing_status` | — | `PENDING, PAID, FAILED` | ⬜ Criar |

### Políticas RLS Necessárias

| Tabela | Política | Regra |
|--------|----------|-------|
| Todas as tabelas com `usuario_id` | SELECT | `auth.uid() = usuario_id` |
| Todas as tabelas com `usuario_id` | INSERT | `auth.uid() = usuario_id` |
| Todas as tabelas com `usuario_id` | UPDATE | `auth.uid() = usuario_id` |
| Todas as tabelas com `usuario_id` | DELETE | `auth.uid() = usuario_id` |
| Tabelas JSONB sem `usuario_id` | SELECT | via `dados->>'userId'` ou similar |

### Índices Recomendados

| Tabela | Índice | Tipo |
|--------|--------|------|
| `portfolio_operations` | `(user_id, ticker)` | B-tree (já existe) |
| `portfolio_operations` | `(user_id, traded_at DESC)` | B-tree (já existe) |
| `portsfolios` | `(dados->>'userId')` | GIN/btree |
| `financial_goals` | `(dados->>'category')` | GIN/btree |
| `financial_goals` | `(dados->>'status')` | GIN/btree |
| `alerts` | `(dedup_key)` | UNIQUE (já existe via upsert) |
| `alerts` | `(dados->>'userId')` | GIN/btree |
| `alert_rules` | `(dados->>'userId')` | GIN/btree |
| `import_jobs` | `(status)` | B-tree |
| `import_jobs` | `(metadata->>'usuarioId')` | GIN/btree |
| `declaracoes_fiscais` | `(portfolio_id, ano)` | B-tree |

### Estratégia de Migração Incremental

#### Fase 1 — Tabelas Essenciais (para operação básica com DEV_MODE=false)

Ordem proposta (respeitando dependências):

```
1. Enums (asset_type_v2, subscription_status, billing_status)
2. Assets (assets)
3. Assinaturas (assinaturas, planos)
4. Portfolios + Estratégias (portfolios, estrategias_configuracao)
5. Metas financeiras (metas_financeiras)
```

#### Fase 2 — Módulos de Domínio

```
6. Renda fixa (fixed_income), Ativos internacionais (foreign_assets, exchange_rates)
7. Perfil do investidor (investor_profiles, investor_questionnaires, investor_risk_results)
8. Relatórios (report_executions, report_schedules)
```

#### Fase 3 — Alertas e Backtests

```
9. Alertas (alert_rules, alerts, alert_deliveries)
10. Backtests (strategies, backtests, simulation_results, backtest_snapshots)
```

#### Fase 4 — Comparação, Exportação e Glossário

```
11. Comparação (comparison_sets, scorecards)
12. Exportação (export_templates, export_jobs)
13. Glossário (glossary_terms, tooltips, learning_paths)
```

#### Fase 5 — Views

```
14. Views patrimoniais (vw_patrimonio, vw_posicoes, vw_historico, vw_proventos)
```

### Dependências Entre Migrations

| Migration | Depende de | Motivo |
|-----------|-----------|--------|
| `integrations` | Nenhuma | Tabela isolada |
| `sync_logs` | `integrations` | FK lógica via `integrationId` |
| `import_jobs` | Nenhuma | Tabela isolada |
| `alerts` | `alert_rules` | FK lógica via `ruleId` |
| `alert_deliveries` | `alerts` | FK lógica via `alertId` |
| `scorecards` | `comparison_sets` | FK lógica via `comparisonSetId` |
| `backtests` | `strategies` | FK lógica via `strategyId` |
| `simulation_results` | `backtests` | FK lógica via `backtestId` |
| `backtest_snapshots` | `backtests` | FK lógica via `snapshotId` |
| `declaracoes_fiscais` | `portfolios` | FK via `portfolio_id` |

> Nota: As FKs são lógicas (valores em JSONB), não constraints físicas. A ordem acima é recomendada para clareza, não imposta pelo banco.

### Correções Necessárias em Migrações Existentes

| Migration | Problema | Correção Recomendada |
|-----------|----------|---------------------|
| `20260706120000_add_asset_type` | CHECK constraint usa `'international'` mas domínio usa `'etf_internacional'`, `'stock_us'`, `'reit'` | Remover CHECK e usar constraint atualizada |
| `20260706120000_add_asset_type` | Segundo UPDATE é redundante (`asset_type = 'stock'` onde já é `'stock'`) | Remover linha redundante |
| `operation_source` ENUM | `'pluggy'` não é mais usado | Remover ou ignorar |

---

## Histórico

### Versão 2.0

- **PS-056:** Plano completo de migração do schema Supabase.
- Catálogo de 34 tabelas, 4 views, 5 enums.
- Estratégia em 5 fases com 14 migrations incrementais.
- Mapeamento de RLS, índices, dependências e correções necessárias.
- Schema base (3 migrations Lovable) vs. schema atual documentado.

### Versão 1.1

- Adicionada seção de variáveis de ambiente para produção e desenvolvimento.
- Adicionada `SUPABASE_SERVICE_ROLE_KEY` à documentação.
- Esclarecida a diferença entre URL direta Supabase e proxy Lovable.
- Adicionada `NITRO_PRESET` à documentação de variáveis obrigatórias.

### Versão 1.0

- Criação do documento INFRASTRUCTURE.md.
- Infraestrutura oficial: GitHub + Supabase + Vercel.
- Lovable registrado como legado (não faz parte da infra oficial).
- Relatório de validação das 3 migrations existentes.
- Procedimento de bootstrap do banco documentado.
