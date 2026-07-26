# Regressão do SiteHeader — Registro Técnico

**Documento:** REGRESSION_SITEHEADER.md

**Versão:** 1.0

**Data:** 23/07/2026

**PS relacionadas:** PS-064, PS-065, PS-066, PS-067, PS-068

---

## Resumo

Durante a conclusão da PI-013 foi identificada uma regressão na Presentation Layer que impedia o funcionamento do SiteHeader. A regressão manifestou-se como:

- menus suspensos (Carteira, Análise) não abriam;
- Theme Toggle não alternava entre Light/Dark;
- erros de runtime no console do navegador.

Após 5 PS de investigação e correção, a regressão foi eliminada.

---

## Causa Raiz Definitiva

A regressão teve **duas causas independentes** que ocorreram simultaneamente:

### 1. Erro de Runtime: `process is not defined`

| Item       | Detalhe                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Origem** | `src/integrations/supabase/client.ts` — fallback `\|\| process.env.SUPABASE_URL` no browser                                          |
| **Efeito** | `ReferenceError: process is not defined` impedia inicialização do Supabase client                                                    |
| **Cadeia** | Supabase client falha → `useSession()` não resolve → SiteHeader não monta → DropdownMenus e ThemeToggle nunca recebem event handlers |

### 2. Erro de Runtime: `@sentry/node` no bundle client

| Item         | Detalhe                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| **Origem**   | `src/start.ts` → `server.ts` → `@sentry/node` → `@sentry/node-core` (import estático)                                       |
| **Efeito**   | Vite dev server processava `start.ts` para o client, carregando `process.versions.node` e `import-in-the-middle` no browser |
| **Sintomas** | `Cannot read properties of undefined (reading 'node')` + `import-in-the-middle does not provide an export`                  |

### 3. Erro de Compilação: Import ausente

| Item       | Detalhe                                                                       |
| ---------- | ----------------------------------------------------------------------------- |
| **Origem** | `src/components/site-header.tsx` — `useConfirmAlertMutation` usado sem import |
| **Efeito** | `ReferenceError: useConfirmAlertMutation is not defined` no runtime           |

---

## Cronologia das Correções

| PS     | Data  | Problema                           | Arquivo                                   | Correção                                                 | Commit                          |
| ------ | ----- | ---------------------------------- | ----------------------------------------- | -------------------------------------------------------- | ------------------------------- |
| PS-064 | 23/07 | `process.env` no client            | `client.ts`                               | Removido fallback `\|\| process.env.*`                   | `721a639`                       |
| PS-065 | 23/07 | `useConfirmAlertMutation` ausente  | `site-header.tsx`                         | Import adicionado                                        | `fbf61ec`                       |
| PS-066 | 23/07 | Auditoria header                   | —                                         | Análise estática completa, sem novos problemas           | —                               |
| PS-067 | 23/07 | `@sentry/node` vazando para client | `vite.config.ts`, `server.ts`, `start.ts` | `ssr.external` + `optimizeDeps.exclude` + dynamic import | `9d6c3f0`, `9f55711`, `ec608f4` |
| PS-068 | 23/07 | Registro documental                | `REGRESSION_SITEHEADER.md`                | Documentação consolidada                                 |                                 |

---

## Arquivos Impactados

| Arquivo                               | Natureza da Correção                                           |
| ------------------------------------- | -------------------------------------------------------------- |
| `src/integrations/supabase/client.ts` | `process.env.*` removido (só `import.meta.env`)                |
| `src/components/site-header.tsx`      | Import de `useConfirmAlertMutation` adicionado                 |
| `vite.config.ts`                      | `ssr.external` + `optimizeDeps.exclude` para `@sentry/node*`   |
| `src/lib/observability/server.ts`     | `@sentry/node` convertido de static import para dynamic import |
| `src/start.ts`                        | `initSentryServer()` chamado com `.catch()` assíncrono         |

---

## Validação Pós-Correção

| Item                            | Status |
| ------------------------------- | ------ |
| Header renderiza sem erros      | ✅     |
| Menu Carteira abre normalmente  | ✅     |
| Menu Análise abre normalmente   | ✅     |
| Theme Toggle alterna Light/Dark | ✅     |
| Notification Panel funciona     | ✅     |
| Sync Indicator funciona         | ✅     |
| Navegação autenticada funciona  | ✅     |
| Navegação pública funciona      | ✅     |
| Console do navegador sem erros  | ✅     |

---

## Lições Aprendidas

1. **Server-only imports no client:** O Vite dev server pode processar módulos server-only (`start.ts`) para o browser. A solução definitiva é usar dynamic `import()` em vez de static `import` para pacotes Node.js no código server-side que possa ser acidentalmente carregado no client.

2. **Módulo `.server.ts` não é suficiente:** A convenção TanStack Start de nomear arquivos como `*.server.ts` não impede que suas dependências sejam processadas pelo Vite dev server no cliente.

3. **Teste de regressão cruzada:** Alterações de infraestrutura (Vercel, Nitro preset) podem expor dependências server-side ao cliente de forma imprevista.

---

## Histórico

### Versão 1.0

- Criação do documento.
- Registro da regressão do SiteHeader e sua correção completa.
- 5 PS executadas, 5 arquivos modificados, 3 causas raiz identificadas.
