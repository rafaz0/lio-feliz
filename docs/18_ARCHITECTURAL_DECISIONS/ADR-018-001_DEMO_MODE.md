# Lio Feliz - Documentação Oficial

# ADR-018-001: Arquitetura do Modo Demo

**Status:** ✅ Aprovado

**Data:** 25/07/2026

---

## Contexto

A PI-018 (Plataforma de Demonstração, Perfis de Usuário e Ambientes) definiu 5 perfis de usuário, incluindo o perfil **Demo**. A ER-018 validou a arquitetura e recomendou a formalização do Modo Demo em ADR próprio.

Atualmente, visitantes só podem acessar páginas públicas da plataforma. Para experimentar funcionalidades como Carteira, Dashboard e Gestão Financeira, é obrigatório criar uma conta e autenticar-se no Supabase. Isso cria uma barreira de entrada que reduz a taxa de conversão de visitantes para usuários ativos.

O Modo Demo resolve esse problema permitindo que qualquer visitante explore a plataforma completa sem cadastro, utilizando dados fictícios isolados.

---

## Problema

Como permitir que visitantes não autenticados explorem a plataforma completa sem:

- comprometer dados reais de usuários;
- criar risco de segurança;
- exigir cadastro no Supabase;
- poluir o banco de dados com dados temporários;
- permitir que alterações no modo demo afetem outros usuários.

---

## Decisão

### Decisão 1: Sessão Demo Descartável

Criar um mecanismo de sessão volátil para o Modo Demo:

```
Visitante → clica "Experimentar" → sessão demo criada em memória
  → dados seed carregados
  → todas as rotas liberadas (leitura + escrita simulada)
  → sessão expira após 30min inatividade ou 24h
  → ao expirar: todos os dados descartados
```

### Regras da Decisão (R-DEMO)

| Regra                                  | Descrição                                                                                                                                                      |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **R-DEMO-001** — Sessão volátil        | Nenhum dado do modo Demo persiste além da sessão. Sem Supabase, sem localStorage permanente.                                                                   |
| **R-DEMO-002** — Escrita simulada      | Operações de escrita (criar operação, registrar receita, etc.) são aceitas mas não persistem. Ao recarregar a página, os dados voltam ao estado seed original. |
| **R-DEMO-003** — Isolamento total      | Sessões demo são independentes entre si. Nenhuma sessão demo acessa dados de outra ou de usuários reais.                                                       |
| **R-DEMO-004** — Sem autenticação      | O modo Demo não exige cadastro no Supabase. A identidade do usuário é gerada localmente (UUID volátil).                                                        |
| **R-DEMO-005** — Expiração obrigatória | Toda sessão demo expira automaticamente após período configurado (padrão: 30min inatividade, 24h total).                                                       |
| **R-DEMO-006** — Indicador visual      | A interface deve exibir um badge ou indicador visual informando que o usuário está em modo Demo.                                                               |

---

## Fluxo Operacional

### 1. Ativação

```
Home (/)
  │
  ├── Botão "Experimentar" no hero
  └── Botão "Experimentar" na página de login
        │
        ▼
  Gera UUID de sessão demo (ex: "demo-{uuid}")
        │
        ▼
  Cria DEV_STORE isolado para esta sessão
        │
        ▼
  Carrega seed data (carteira, operações, metas, GF)
        │
        ▼
  Redireciona para /dashboard
```

### 2. Uso

```
Usuário navega, cria operações, altera dados
  → Toda operação de escrita usa DEV_STORE da sessão
  → Dados persistem apenas enquanto a sessão está ativa
  → Ao recarregar a página, dados retornam ao estado seed
```

### 3. Expiração

```
30 minutos de inatividade
  OU
24 horas desde a criação
  │
  ▼
  Sessão invalidada
  │
  ▼
  DEV_STORE da sessão é descartado
  │
  ▼
  Usuário redirecionado para Home
  Badge "Sessão expirada" exibido
```

### 4. Logout Antecipado

```
Usuário clica "Sair" ou "Criar conta"
  → Sessão demo encerrada
  → Dados descartados
  → Se "Criar conta": redireciona para /register
  → Se "Sair": redireciona para Home
```

---

## Dados de Demonstração

### Estrutura

Os dados demo seguem exatamente a mesma estrutura dos dados reais, permitindo reutilizar todos os componentes existentes:

```
src/seed/
  demo-data.ts             → Ponto de entrada
  demo-portfolio.ts        → Carteira com 5-8 ativos
  demo-operations.ts       → 12 meses de operações
  demo-dividends.ts        → Proventos recebidos
  demo-goals.ts            → Metas financeiras
  demo-finance.ts          → Gestão Financeira (contas, receitas, despesas)
```

### Carregamento

Os dados são carregados no `DEV_STORE` no momento da criação da sessão demo. O `DEV_STORE` existente (`operations.functions.ts:42`) é estendido para suportar múltiplas sessões isoladas.

### Reinicialização

Ao recarregar a página, o estado do `DEV_STORE` é perdido (memória volátil). Uma nova sessão demo pode ser iniciada, recarregando os dados seed.

---

## Persistência

| Aspecto        | Comportamento                                                |
| -------------- | ------------------------------------------------------------ |
| Armazenamento  | Memória volátil (variáveis em processo Node.js)              |
| Banco de dados | Nenhuma chamada ao Supabase é feita                          |
| localStorage   | Apenas para controle de sessão (demo session ID)             |
| Duração        | Enquanto a sessão estiver ativa + janela do navegador aberta |
| Descarte       | Ao expirar ou fazer logout                                   |

---

## Feature Flags

O Modo Demo utiliza a flag `DEMO_MODE`, que se relaciona com as demais flags conforme a hierarquia:

```
1. DEV_MODE (ambiente localhost) → bypass auth + DEV_STORE
2. DEMO_MODE (qualquer ambiente) → sessão volátil + dados seed
3. ADMIN_ENABLED (produção) → painel admin (futuro)
4. FINANCE_INTEGRATION (config. usuário) → integração Carteira/GF

Resolução:
  Ambiente → Perfil → Configuração do usuário → Permissão final
```

| Flag                | Modo Demo | Modo Dev    | Produção    |
| ------------------- | --------- | ----------- | ----------- |
| DEMO_MODE           | ✅ Ativa  | ❌          | ❌          |
| DEV_MODE            | ❌        | ✅ Ativa    | ❌          |
| ADMIN_ENABLED       | ❌        | ❌          | Condicional |
| FINANCE_INTEGRATION | Simulada  | Condicional | Condicional |

---

## Navegação

### Indicador Visual

Quando o Modo Demo está ativo, a interface deve exibir:

| Elemento            | Localização                  | Descrição                                                                |
| ------------------- | ---------------------------- | ------------------------------------------------------------------------ |
| Badge "Demo"        | SiteHeader (ao lado do nome) | Amarelo/âmbar, texto "Demo"                                              |
| Aviso "Sessão Demo" | Topo do Dashboard            | "Você está usando uma conta demonstrativa. Seus dados não serão salvos." |
| Botão "Criar conta" | Header e Dashboard           | Destacado, substitui "Entrar"                                            |

### Comportamento da Navegação

- O header exibe os mesmos links de um usuário autenticado
- Um badge "Demo" é exibido ao lado do nome
- O MobileNav exibe os mesmos ícones
- Tentativas de escrita exibem toast "Funcionalidade simulada no modo Demo"

---

## Segurança

| Requisito                | Mecanismo                                                                                    |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| Sem acesso a dados reais | Sessão demo usa DEV_STORE isolado por sessionId. Nenhuma query ao Supabase.                  |
| Sem persistência         | Operações de escrita usam DEV_STORE volátil. Nenhuma chamada a `supabase.from(...).insert()` |
| Isolamento entre sessões | Cada sessão demo tem seu próprio DEV_STORE (Map keyed by sessionId)                          |
| Expiração forçada        | Timer de inatividade (30min) e expiração absoluta (24h)                                      |

---

## Compatibilidade

| Componente                    | Compatibilidade                                            |
| ----------------------------- | ---------------------------------------------------------- |
| **PI-001 a PI-018**           | ✅ Nenhuma alteração                                       |
| **ER-018**                    | ✅ ADR formaliza decisão validada                          |
| **ADR-017-001**               | ✅ Integração Carteira/GF simulada no modo Demo            |
| **ADR-017-002**               | ✅ Feature flags respeitadas. DEMO_MODE é extensão natural |
| **Dashboard Hub**             | ✅ Dashboard demo com dados seed                           |
| **Experience Layer**          | ✅ Componentes reutilizados sem modificação                |
| **Gestão Financeira**         | ✅ Dados demo de GF incluídos                              |
| **ModuleLayout / ModuleTabs** | ✅ Navegação inalterada                                    |
| **DEV_STORE**                 | ✅ Mecanismo existente estendido para múltiplas sessões    |

---

## Consequências

### Positivas

- Visitantes podem explorar a plataforma completa sem cadastro.
- Zero risco de contaminação de dados reais.
- Código reutilizado integralmente — sem componentes novos.
- Mecanismo de expiração evita acúmulo de sessões órfãs.
- Isolamento por sessionId no DEV_STORE existente.

### Negativas

- Dados seed precisam ser mantidos atualizados com a estrutura real.
- Sessões demo consomem memória do servidor (mitigado por expiração).
- Escrita simulada pode causar frustração se não for claramente sinalizada.

### Neutras

- O DEV_STORE existente precisa ser estendido para suportar múltiplas sessões.

---

## Referências

- `architecture-lab/PI-018.md` — Plataforma de Demonstração (§5.1 Modo Demo, §6 Dados Demo).
- `architecture-lab/ER-018.md` — Engineering Review que validou o Modo Demo.
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-017-002_FEATURE_FLAGS_AND_FINANCE_INTEGRATION_CONFIG.md` — Feature flags.
- `src/lib/operations.functions.ts` — DEV_STORE existente.
- R-DEMO-001 a R-DEMO-006 — Regras do Modo Demo (este ADR).
- R-PF-018-001 a R-PF-018-004 — Regras de perfil da PI-018.
