# Deploy — Lio Feliz

**Documento:** DEPLOY.md

**Versão:** 1.0

**Última atualização:** 23/07/2026

---

## Plataforma Oficial

**Vercel** (conforme ADR-013-001).

TanStack Start tem suporte nativo a Vercel, com deploy simplificado por `git push`.

---

## Pré-requisitos

1. Conta na [Vercel](https://vercel.com) (plano Hobby é suficiente)
2. Repositório GitHub conectado à Vercel
3. Secrets configurados no Vercel Dashboard ou GitHub Secrets

---

## Variáveis de Ambiente

Todas as variáveis devem ser configuradas no Vercel Dashboard (Settings → Environment Variables).

### Obrigatórias

| Variável | Descrição | Origem |
|----------|-----------|--------|
| `SUPABASE_URL` | URL do projeto Supabase | Supabase Dashboard → Settings → API |
| `SUPABASE_PUBLISHABLE_KEY` | Chave anônima do Supabase | Supabase Dashboard → Settings → API |
| `BRAPI_TOKEN` | Token da API BRAPI | [brapi.dev](https://brapi.dev) → Dashboard |
| `DEV_MODE` | `false` em produção | Sempre `false` em produção |

### Opcionais

| Variável | Descrição | Origem |
|----------|-----------|--------|
| `SENTRY_DSN` | DSN do Sentry para monitoramento | Sentry Dashboard → Settings → Client Keys (DSN) |

### Stripe (para ambiente com pagamentos reais)

| Variável | Descrição |
|----------|-----------|
| `STRIPE_SECRET_KEY` | Chave secreta do Stripe (começa com `sk_live_` ou `sk_test_`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Chave publicável do Stripe (começa com `pk_live_` ou `pk_test_`) |

---

## Deploy Automático (GitHub + Vercel)

### 1. Conectar o Repositório

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Importe o repositório `rafaz0/lio-feliz`
3. Selecione a branch `main`

### 2. Configurar o Projeto

A Vercel detectará automaticamente o `vercel.json` na raiz. Configurações:

| Campo | Valor |
|-------|-------|
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |
| **Framework** | `null` (TanStack Start, detecção automática) |
| **Regions** | `gru1` (São Paulo) |

### 3. Configurar Variáveis de Ambiente

Adicionar todas as variáveis listadas em [Variáveis de Ambiente](#variáveis-de-ambiente) no Vercel Dashboard.

### 4. Deploy

- **Automático:** todo push para `main` dispara deploy
- **Manual:**`vercel --prod` via CLI

Após o deploy, a Vercel fornecerá uma URL no formato `https://lio-feliz.vercel.app`.

---

## Deploy Manual (CLI)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (produção)
vercel --prod
```

---

## CI/CD (GitHub Actions)

O pipeline de CI/CD está configurado em `.github/workflows/ci.yml` e executa:

1. **Lint** — `eslint .`
2. **Testes** — `vitest run`
3. **Build** — `vite build`

O deploy para a Vercel é feito pelo [Vercel GitHub Integration](https://vercel.com/docs/deployments/git), não pelo GitHub Actions. A integração nativa da Vercel com GitHub oferece:

- Deploy automático em todo push para `main`
- Preview Deployments para PRs
- Rollback com 1 clique no Vercel Dashboard

---

## Health Check

Após o deploy, verificar:

```
GET https://<url>/api/health
```

Resposta esperada:

```json
{ "status": "ok", "timestamp": "2026-07-23T..." }
```

---

## Rollback

Pelo Vercel Dashboard:

1. Acesse o projeto na [Vercel](https://vercel.com)
2. Navegue até **Deployments**
3. Clique no menu (⋯) do deployment desejado
4. Selecione **Promote to Production**

Tempo estimado: ~2 minutos.

---

## Domínio Personalizado

Configurar no Vercel Dashboard:

1. Settings → Domains
2. Adicionar domínio (ex.: `app.liofeliz.com.br`)
3. Configurar DNS (aponte para os nameservers da Vercel ou registro CNAME)

---

## Monitoramento

### Sentry (Recomendado)

1. Criar projeto no [Sentry](https://sentry.io)
2. Configurar `SENTRY_DSN` nas variáveis de ambiente
3. O Sentry já está integrado via `src/lib/observability/server.ts`

### Logs

Os logs de produção são acessíveis pelo Vercel Dashboard:

- **Logs de Função:** Deployments → Function Logs
- **Logs de Build:** Deployments → Build Logs

---

## Histórico

### Versão 1.0

- Criação do documento.
- Plataforma oficial: Vercel (ADR-013-001).
- CI/CD via Vercel GitHub Integration.
- Sentry como ferramenta de monitoramento.
