# Engineering Review — Organização Funcional dos Módulos (PI-014)

**Documento:** ER_MODULE_ORGANIZATION.md

**Versão:** 1.0

**Data:** 24/07/2026

---

## 1. Situação Atual

### Módulos Implementados

| Módulo | Rota | Natureza | Abas |
|--------|------|----------|------|
| Carteira | `/carteira` | Privada (autenticada) | Resumo, Patrimônio, Proventos, Rentabilidade, Cobertura, Análises, Movimentações, Metas, IRPF, Rebalanceamento, Histórico, Configurações |
| Análise | `/analise` | Pública | FIIs, Rankings, Setores, Comparador, Watchlist, Calculadoras, Notícias |
| Proventos | `/proventos` | **Mista** (pública + privada) | Calendário, Recebidos, Provisionador, Cobertura |

### Problema Identificado

O módulo Proventos mistura conteúdo público (Calendário de Dividendos — acessível sem login) com conteúdo privado (Recebidos, Provisionador, Cobertura — dependentes da carteira do usuário).

Isso gera:

- Inconsistência arquitetural: um mesmo módulo mistura dois níveis de autenticação
- Confusão conceitual: "Dividendos" (mercado) vs "Proventos" (carteira)
- Duplicidade: Carteira já possui abas "Proventos" e "Cobertura" idênticas às do módulo Proventos

---

## 2. Separação Público vs Privado

### Funcionalidades Públicas (Mercado)

| Funcionalidade | Rota Atual | Natureza |
|---------------|-----------|----------|
| Calendário de Dividendos | `/dividendos` | Pública |
| Rankings de Dividend Yield | `/rankings` | Pública |
| Detalhe do Ativo (DY, histórico) | `/ativo/$ticker` | Pública |

### Funcionalidades Privadas (Carteira do Usuário)

| Funcionalidade | Rota Atual | Natureza |
|---------------|-----------|----------|
| Proventos Recebidos | `/carteira/proventos` | Privada |
| Provisionador | `/provisionador` | Privada |
| Cobertura de Despesas | `/carteira/cobertura` | Privada |
| Metas de Dividendos | `/metas` | Privada |

---

## 3. Proposta Arquitetural

### Módulos Públicos (sem autenticação)

| Módulo | Rotas | Conteúdo |
|--------|-------|----------|
| Mercado | `/` | Busca de ativos, índices, maiores altas/baixas |
| Dividendos | `/dividendos` | **Calendário de dividendos do mercado** (público) |
| Análise | `/analise` | FIIs, Rankings, Setores, Comparador, Watchlist, Calculadoras, Notícias |
| Ferramentas | *(a definir)* | Calculadoras, Carteiras Recomendadas |

### Módulos Privados (autenticados)

| Módulo | Rotas | Conteúdo |
|--------|-------|----------|
| Carteira | `/carteira` | Resumo, Patrimônio, Rentabilidade, **Proventos**, Cobertura, Análises, Movimentações, Metas, IRPF, Rebalanceamento, Histórico, Configurações |
| Metas | `/metas` | Metas financeiras (standalone) |
| Provisionador | `/provisionador` | Provisionador de dividendos (standalone) |

### Decisão Arquitetural

**Reverter o módulo Proventos.**

- `dividendos.tsx` volta a ser a rota pública de Calendário de Dividendos
- O menu superior volta a exibir "Dividendos" (público) em vez de "Proventos"
- O conteúdo privado (Recebidos, Cobertura) permanece exclusivamente na Carteira
- Provisionador permanece como página standalone autenticada

### Módulo Carteira como Referência

A Carteira permanece como o módulo de referência da aplicação (único módulo 100% privado e autenticado). Ela centraliza TODO o conteúdo relacionado à carteira do usuário — incluindo proventos recebidos, cobertura e demais funcionalidades privadas.

---

## 4. Impactos

### Técnicos

| Item | Impacto |
|------|---------|
| Rotas `/proventos/*` | Podem ser removidas ou redirecionadas |
| SiteHeader | "Proventos" → "Dividendos" (link direto a `/dividendos`) |
| MobileNav | Ajuste do link |
| Nenhuma alteração em ModuleLayout ou componentes base | ✅ Nenhuma |

### Arquiteturais

- Nenhuma Frozen Baseline alterada
- Nenhum componente estrutural modificado
- Apenas reorganização de rotas e links

### Navegação

- Menu superior: "Proventos" → "Dividendos"
- Dividendos permanece público (sem autenticação)
- Carteira mantém todas as abas privadas

### Usuário

- Maior clareza conceitual: "Dividendos" = mercado, "Carteira" = meus dados
- Usuários não autenticados podem continuar acessando o calendário de dividendos

---

## 5. Plano de Migração

### Passo 1 — Reverter módulo Proventos

- Remover `src/routes/proventos.tsx` e sub-páginas
- Manter `dividendos.tsx` como rota pública em `/dividendos`
- Atualizar SiteHeader: "Proventos" → "Dividendos"

### Passo 2 — Ajustar navegação

- Manter link direto a `/dividendos` no menu superior
- Remover link a `/proventos` do MobileNav
- Restaurar link a `/carteira/proventos` no MobileNav (dentro do módulo Carteira)

### Passo 3 — Documentar

- Atualizar MODULE_ARCHITECTURE.md com a organização revisada
- Registrar ADR-014-003: Separação Público-Privado

---

## 6. ADR-014-003 — Separação Público-Privado

| Campo | Valor |
|-------|-------|
| Contexto | Módulo Proventos misturava conteúdo público (calendário de dividendos) com funcionalidades privadas (proventos recebidos, provisionador, cobertura). |
| Decisão | Manter separação clara entre módulos públicos (Mercado, Dividendos, Análise) e privados (Carteira). Nenhum módulo deve misturar os dois níveis de autenticação. |
| Consequências | Carteira centraliza todo conteúdo privado. Dividendos permanece público. MobileNav reflete a separação. |

---

## 7. Histórico

### Versão 1.0

- Criação da Engineering Review.
- Identificação da inconsistência no módulo Proventos (mista público-privado).
- Proposta de reversão: Dividendos (público) + Carteira (privado).
- ADR-014-003 registrado.
- Nenhum código alterado — apenas análise e documentação.
