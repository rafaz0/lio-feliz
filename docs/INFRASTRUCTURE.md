# Infraestrutura — Lio Feliz

**Documento:** INFRASTRUCTURE.md

**Versão:** 1.0

**Última atualização:** 23/07/2026

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

```env
SUPABASE_PROJECT_ID=shllrynjuqtkdvmjjrqj
SUPABASE_URL=https://shllrynjuqtkdvmjjrqj.supabase.co
SUPABASE_PUBLISHABLE_KEY=<anon_key>
```

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

## Histórico

### Versão 1.0

- Criação do documento INFRASTRUCTURE.md.
- Infraestrutura oficial: GitHub + Supabase + Vercel.
- Lovable registrado como legado (não faz parte da infra oficial).
- Relatório de validação das 3 migrations existentes.
- Procedimento de bootstrap do banco documentado.
