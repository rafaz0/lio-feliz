# Estados da Aplicação — Lio Feliz

**Documento:** APPLICATION_STATES.md

**Versão:** 1.0

**Última atualização:** 25/07/2026

---

## 1. Objetivo

Este documento descreve os diferentes estados operacionais da plataforma Lio Feliz, definindo o que cada categoria de usuário pode visualizar e como o sistema se comporta em cada ambiente.

---

## 2. Visitante (Não autenticado)

### O que pode visualizar

| Funcionalidade | Rota | Observação |
|---------------|------|------------|
| Home / Mercado | `/` | Índices, ativos em alta/baixa, tabela de ativos |
| Página de Ativo | `/ativo/$ticker` | Cotações, fundamentos, dividendos |
| Página de FII | `/fii/$ticker` | Detalhes do fundo imobiliário |
| Dividendos | `/dividendos` | Calendário de proventos |
| Análise | `/analise` | FIIs, rankings, setores, comparador |
| Watchlist | `/watchlist` | Lista local (localStorage) |
| Rankings | `/rankings` | Rankings de ações e FIIs |
| Setores | `/setores` | Agrupamento por setor |
| Comparador | `/comparar` | Comparação lado a lado |
| Calculadoras | `/calculadoras` | 5 calculadoras financeiras |
| Carteiras Recomendadas | `/carteiras-recomendadas` | Carteiras pré-definidas |
| Notícias | `/noticias` | Notícias do mercado |

### O que NÃO pode visualizar

| Funcionalidade | Motivo |
|---------------|--------|
| Carteira pessoal | Requer autenticação |
| Dashboard pessoal | Requer autenticação |
| Metas pessoais | Requer autenticação |
| Provisionador | Requer autenticação |
| IRPF | Requer autenticação |
| Lançamentos | Requer autenticação |
| Sincronização | Requer autenticação |

### Comportamento

- Tentativa de acesso a rota autenticada → redireciona para `/login`
- Botão "Entrar" no header → `/login`
- Dados mock são exibidos quando dados reais não estão disponíveis

---

## 3. Usuário Autenticado

### O que fica disponível

Além de todas as funcionalidades do visitante:

| Funcionalidade | Rota | Observação |
|---------------|------|------------|
| **Dashboard (Hub)** | `/dashboard` | Primeira tela pós-login |
| Carteira | `/carteira` | Módulo com 12 abas |
| Metas | `/metas` | Metas financeiras |
| Provisionador | `/provisionador` | Projeção de dividendos |
| IRPF | `/irpf` | Apuração de imposto |
| Sincronização | `/sync` | Sincronização de dados |
| Configurações | `/settings` | Preferências do usuário |
| Checkout | `/checkout` | Planos e assinatura |

### Comportamento

- Header exibe nome do usuário + menu dropdown
- SyncIndicator visível no header
- NotificationPanel disponível
- Dados reais da carteira (operações, posições, proventos)
- MobileNav exibido em telas pequenas

### Fluxo de navegação principal

```
Login → Dashboard → Carteira → Ativo → Análise
                  → Dividendos
                  → Metas
                  → Provisionador
                  → IRPF
```

---

## 4. Desenvolvedor (Modo DEV)

### Ativação

Ativado quando:
- Hostname é `localhost` ou `127.0.0.1` (verificação via `isLocalDev()` em `route.tsx`)
- `DEV_MODE=true` no arquivo `.env`

### Comportamentos exclusivos

| Comportamento | Local | Detalhe |
|--------------|-------|---------|
| **DEV_USER** | `route.tsx:15` | Usuário mock `dev-user-0000` bypassa autenticação Supabase |
| **DEV_STORE** | `operations.functions.ts:42` | Operações armazenadas em memória volátil |
| **Auth bypass** | `auth-middleware.ts:38` | Middleware ignora sessão Supabase |
| **Dados mock** | Vários | Fallback para `mock-data.ts` e `fii-mock-data.ts` quando APIs falham |
| **DEV_MODE flag** | Múltiplos server functions | Define se usa Supabase ou store em memória |

### Quando o DEV_USER é usado

1. **`route.tsx` (beforeLoad):** Se `isLocalDev()`, retorna `{ id: "dev-user-0000" }` — nenhuma chamada ao Supabase é feita
2. **`auth-middleware.ts`:** Se `DEV_MODE=true`, retorna `userId = "dev-user-0000"` sem validar sessão
3. **`use-session.ts`:** Se `isLocalDev()`, retorna usuário mock `DEV_USER`

### Dados mock vs. reais

| Contexto | DEV_MODE | Produção |
|----------|---------|----------|
| Operações | `DEV_STORE` (array em memória) | Supabase `portfolio_operations` |
| Cotações | BRAPI/Yahoo (API real) | BRAPI/Yahoo (API real) |
| Câmbio | AwesomeAPI (API real) | AwesomeAPI (API real) |
| Ativos (fallback) | `mock-data.ts` (20 ações) | Mesmo fallback |
| FIIs (fallback) | `fii-mock-data.ts` (20 FIIs) | Mesmo fallback |

---

## 5. Produção

### Comportamento esperado

| Aspecto | Comportamento |
|---------|---------------|
| Autenticação | Obrigatória via Supabase Auth para rotas `/_authenticated` |
| Sessão | Validada em toda requisição (`requireSupabaseAuth`) |
| Banco de dados | Supabase PostgreSQL (tabelas `portfolio_*`, `financial_*`) |
| Cotações | BRAPI (B3) + CoinGecko (cripto) + Yahoo Finance (internacional) |
| Cache | TanStack Query com `staleTime` configurado por query |
| Deploy | Vercel (GitHub Integration) |
| Monitoramento | Sentry (erros + performance) |

### Diferenças entre ambientes

| Aspecto | Localhost | Produção |
|---------|-----------|----------|
| Auth | Bypass automático (DEV_USER) | Supabase Auth completo |
| Sessão | Mock | Real (`supabase.auth.getUser()`) |
| Operações | Memória volátil (DEV_STORE) | Supabase persistente |
| Dados mock | Exibidos como fallback | Exibidos como fallback |
| Build | `npm run dev` | `npm run build` + Vercel |

### Modo Desenvolvedor (`.env`)

```env
DEV_MODE=true   # Ativa store em memória + bypass de auth
DEV_MODE=false  # Produção — usa Supabase real
```

---

## 6. Histórico

### Versão 1.0 — 25/07/2026

- Criação do documento.
- 4 estados documentados: Visitante, Autenticado, Desenvolvedor, Produção.
- Diferenças entre localhost e produção registradas.
- Comportamentos DEV_USER/DEV_STORE/DEV_MODE mapeados.
