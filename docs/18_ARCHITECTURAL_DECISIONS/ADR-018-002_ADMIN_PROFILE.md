# Lio Feliz - Documentação Oficial

# ADR-018-002: Arquitetura do Perfil Administrador

**Status:** ✅ Aprovado

**Data:** 25/07/2026

---

## Contexto

A PI-018 (Plataforma de Demonstração, Perfis de Usuário e Ambientes) definiu 5 perfis de usuário, incluindo o perfil **Administrador**. A ER-018 validou a arquitetura e recomendou a formalização do Perfil Administrador em ADR próprio.

Atualmente, a plataforma Lio Feliz não possui qualquer funcionalidade administrativa. A gestão de usuários, planos e configurações depende de acesso direto ao banco Supabase. Isso é insustentável para operação em produção.

O Perfil Administrador resolve esse problema criando um perfil operacional com acesso controlado a dados de todos os usuários, sem modificar a arquitetura existente.

---

## Problema

Como criar um perfil administrativo na plataforma sem:

- modificar o fluxo de autenticação existente;
- expor dados de usuários a não-administradores;
- permitir elevação de privilégio pela interface;
- comprometer a segurança dos dados;
- violar o isolamento entre perfis definido na PI-018.

---

## Decisão

### Decisão 1: Perfil Operacional, Não Domínio de Negócio

O Administrador **não** é um domínio de negócio. É um perfil operacional da camada de aplicação. Ele não possui entidades próprias, repositórios ou regras de negócio. Ele apenas concede acesso a funcionalidades existentes de leitura e gerenciamento.

### Regras da Decisão (R-ADMIN)

| Regra                                   | Descrição                                                                                                                |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **R-ADMIN-001** — Perfil operacional    | Administrador é um perfil, não um domínio. Não possui entidades, VOs ou repositórios próprios.                           |
| **R-ADMIN-002** — Acesso por role       | O perfil é determinado por uma role `admin` no Supabase Auth (ou campo equivalente em `user_metadata`).                  |
| **R-ADMIN-003** — Leitura global        | Administrador pode ler dados de qualquer usuário, mas não pode modificá-los sem autorização explícita.                   |
| **R-ADMIN-004** — Sem auto-cadastro     | Não é possível tornar-se administrador pela interface. A role deve ser atribuída via banco ou console Supabase.          |
| **R-ADMIN-005** — Isolamento preservado | O Administrador acessa os mesmos repositórios dos demais perfis. O filtro por `userId` é removido quando a role é admin. |

---

## Matriz de Permissões

### Permissões Administrativas vs. Comuns

| Ação                          | Usuário comum | Administrador       |
| ----------------------------- | ------------- | ------------------- |
| Ler próprios dados            | ✅            | ✅                  |
| Ler dados de qualquer usuário | ❌            | ✅                  |
| Criar/alterar próprios dados  | ✅            | ✅                  |
| Criar/alterar dados de outros | ❌            | ❌ (apenas suporte) |
| Gerenciar planos              | ❌            | ✅                  |
| Visualizar logs do sistema    | ❌            | ✅                  |
| Configurar flags globais      | ❌            | ✅                  |
| Acessar `/admin`              | ❌            | ✅                  |
| Elevar privilégio             | ❌            | ❌                  |

### Módulos Administrativos

| Módulo            | Descrição                      | Leitura | Escrita |
| ----------------- | ------------------------------ | ------- | ------- |
| **Usuários**      | Listar, visualizar, buscar     | ✅      | ❌      |
| **Planos**        | Gerenciar planos e assinaturas | ✅      | ✅      |
| **Logs**          | Visualizar logs do sistema     | ✅      | ❌      |
| **Configurações** | Flags globais, taxas, limites  | ✅      | ✅      |

---

## Relação com os Demais Perfis

```
Isolamento entre perfis (R-PF-018-001, R-ADMIN-005):

Visitante → Dados públicos apenas
Demo      → DEV_STORE isolado por sessionId
Usuário   → Próprios dados no Supabase
Dev       → DEV_STORE volátil + bypass auth
Admin     → Leitura de todos os domínios (filtro userId removido)
```

O Administrador **não compete** com os demais perfis. Ele é um Usuário comum que possui uma role adicional `admin` no Supabase Auth. Quando autenticado como admin, o sistema:

1. Mantém todos os dados e permissões do Usuário comum.
2. Adiciona acesso ao painel `/admin`.
3. Adiciona capacidade de leitura global (remoção do filtro `userId` em consultas administrativas).

---

## Navegação

### Rota /admin

| Aspecto      | Comportamento                                                                                |
| ------------ | -------------------------------------------------------------------------------------------- |
| URL          | `/admin` (rota filha de `_authenticated`)                                                    |
| Visibilidade | Apenas para usuários com role `admin`                                                        |
| Ocultação    | Usuários não-admin não veem o link. Acesso direto por URL redireciona para 404 ou Dashboard. |
| Header       | Link "Admin" visível apenas para administradores                                             |
| Layout       | ModuleLayout com tabs administrativas                                                        |

### Estrutura de Rotas (conceitual)

```
/admin                  → Visão geral (dashboard admin)
/admin/usuarios         → Lista de usuários
/admin/planos           → Gerenciamento de planos
/admin/logs             → Logs do sistema
/admin/configuracoes    → Configurações globais
```

### Proteção

A rota `/admin` é protegida por:

1. **Rota**: `beforeLoad` verifica se `user.role === "admin"`
2. **Componente**: `AdminRoute` wrapper que redireciona para Dashboard se não for admin
3. **API**: Server functions administrativas verificam a role antes de executar

---

## Segurança

### Mecanismos de Proteção

| Camada         | Mecanismo                  | Descrição                                     |
| -------------- | -------------------------- | --------------------------------------------- |
| **Rota**       | `beforeLoad`               | Verifica role antes de carregar o componente  |
| **Componente** | `AdminRoute`               | Wrapper que redireciona se não for admin      |
| **API**        | Server function middleware | Verifica role antes de executar queries       |
| **URL**        | Proteção em 3 camadas      | Acesso direto a `/admin` sem role redireciona |

### Fluxo de Autenticação

```
Usuário faz login (fluxo existente)
  → Supabase Auth retorna user com user_metadata.role
  → Sistema verifica role
  → Se role === "admin":
      → Header exibe link "Admin"
      → Rota /admin fica acessível
      → Server functions admin liberadas
  → Se role !== "admin":
      → Nada muda
      → /admin retorna 404
```

### Prevenção de Elevação de Privilégio

| Cenário                                                     | Comportamento                                      |
| ----------------------------------------------------------- | -------------------------------------------------- |
| Usuário tenta acessar `/admin` sem role                     | Redirecionado para Dashboard (via `beforeLoad`)    |
| Usuário tenta chamar server function admin sem role         | Erro `AuthorizationError`                          |
| Usuário tenta modificar `user_metadata.role` pela interface | Impossível — alteração apenas via Supabase console |
| Sessão demo tenta acessar `/admin`                          | Redirecionado para Home (demo não tem role admin)  |

---

## Feature Flags

### ADMIN_ENABLED

A flag `ADMIN_ENABLED` controla a disponibilidade do módulo administrativo:

```typescript
// Integrada ao sistema de feature flags (ADR-017-002)
interface AdminConfig {
  enabled: boolean; // ADMIN_ENABLED
  auditLogging: boolean; // Logs de auditoria
  userManagement: boolean; // Gestão de usuários
}
```

| Estado                    | Comportamento                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| `enabled: false` (padrão) | Rota `/admin` retorna 404. Link admin oculto. Server functions administrativas retornam erro. |
| `enabled: true`           | Painel admin acessível para usuários com role `admin`.                                        |

### Hierarquia de Flags

```
ADMIN_ENABLED (ambiente)
  │
  └── role === "admin" (usuário)
        │
        └── Acesso ao /admin liberado
```

---

## Compatibilidade

| Documento                 | Compatibilidade                             |
| ------------------------- | ------------------------------------------- |
| **PI-001 a PI-018**       | ✅ Nenhuma alteração                        |
| **ER-018**                | ✅ ADR formaliza decisão validada (R02)     |
| **ADR-017-001**           | ✅ Integração preservada                    |
| **ADR-017-002**           | ✅ Feature flags expandidas (ADMIN_ENABLED) |
| **ADR-018-001**           | ✅ Perfil Admin não conflita com Demo       |
| **APPLICATION_STATES.md** | ✅ Perfil Admin documentado                 |
| **USER_FLOWS.md**         | ✅ Fluxos de navegação não alterados        |

---

## Consequências

### Positivas

- Gestão de usuários sem acesso direto ao banco.
- Auditoria centralizada.
- Isolamento total entre perfis.
- Segurança em 3 camadas (rota, componente, API).
- Feature flag permite desligar admin em produção.

### Negativas

- Dependência de role no Supabase Auth.
- Necessidade de migração para adicionar role a usuários existentes.
- Complexidade adicional de testes (múltiplos perfis).

### Neutras

- O `beforeLoad` existente precisa ser estendido para verificar role.
- Server functions administrativas são novas, não modificam existentes.

---

## Referências

- `architecture-lab/PI-018.md` — Plataforma de Demonstração (§4 Perfis, §5.3 Modo Administrador).
- `architecture-lab/ER-018.md` — Engineering Review (R02 — criar ADR-018-002).
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-017-002_FEATURE_FLAGS_AND_FINANCE_INTEGRATION_CONFIG.md` — Feature flags.
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-018-001_DEMO_MODE.md` — Modo Demo.
- R-ADMIN-001 a R-ADMIN-005 — Regras do Perfil Administrador (este ADR).
- R-PF-018-001 a R-PF-018-004 — Regras de perfil da PI-018.
