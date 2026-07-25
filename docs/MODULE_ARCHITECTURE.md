# Arquitetura de Módulos — Lio Feliz

**Documento:** MODULE_ARCHITECTURE.md

**Versão:** 1.0

**Última atualização:** 23/07/2026

---

## 1. Objetivo

Este documento define o padrão arquitetural de módulos funcionais da plataforma Lio Feliz. Um módulo é uma área completa da aplicação que agrupa funcionalidades relacionadas sob uma navegação interna consistente, substituindo o modelo anterior de páginas isoladas com menus dropdown.

---

## 2. Conceito de Módulo

Um módulo funcional representa uma área temática da aplicação. Diferente do modelo anterior (onde cada página era independente e a navegação entre elas ocorria via dropdowns no menu superior), o módulo oferece:

- **Entrada única** no menu superior (link direto, sem dropdown)
- **Navegação interna** via tabs (ModuleTabs)
- **Contexto visual** consistente (breadcrumb, header, layout)
- **Permanência** — o usuário sente que está dentro de uma área específica

### Módulos Implementados

| Módulo | Rota | Abas | Referência |
|--------|------|------|------------|
| Carteira | `/carteira` | 12 abas | ✅ Piloto |
| Análise | `/analise` | 7 abas | ✅ Segundo módulo |

---

## 3. Arquitetura

### Hierarquia Padrão

```
Menu Superior (link direto)
       │
       ▼
┌─────────────────────────────┐
│  ModuleLayout               │
│  ┌───────────────────────┐  │
│  │  ModuleBreadcrumb     │  │
│  │  Ex: Início > Carteira│  │
│  ├───────────────────────┤  │
│  │  ModuleHeader         │  │
│  │  Título + descrição   │  │
│  ├───────────────────────┤  │
│  │  ModuleTabs           │  │
│  │  [Tab1] [Tab2] [Tab3] │  │
│  ├───────────────────────┤  │
│  │  Outlet (conteúdo)    │  │
│  │  ┌─────────────────┐  │  │
│  │  │  ModuleSection  │  │  │
│  │  │  Título + desc  │  │  │
│  │  │  Conteúdo       │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

### Fluxo de Navegação

1. Usuário clica no link do módulo no **SiteHeader** (ex: "Carteira")
2. Rota principal do módulo é carregada (ex: `/carteira`)
3. `ModuleLayout` renderiza breadcrumb, header, tabs e `Outlet`
4. A rota índice (`/carteira`) exibe a visão geral do módulo
5. O usuário navega entre sub-páginas via `ModuleTabs`
6. Cada aba carrega uma rota filha no `Outlet`

---

## 4. Componentes Oficiais

### ModuleLayout

**Arquivo:** `src/components/module-layout.tsx`

**Responsabilidade:** Layout padrão de página-módulo. Compõe breadcrumb, header, tabs e conteúdo.

**Props:**
| Prop | Tipo | Obrigatório | Descrição |
|------|------|-------------|-----------|
| `title` | `string` | Sim | Título do módulo |
| `description` | `string` | Não | Descrição exibida abaixo do título |
| `breadcrumbs` | `BreadcrumbItem[]` | Sim | Itens do breadcrumb |
| `tabs` | `ModuleTab[]` | Não | Abas de navegação interna |
| `action` | `ReactNode` | Não | Elemento de ação no header |
| `children` | `ReactNode` | Sim | Conteúdo (Outlet ou seções) |

**Uso:**
```tsx
<ModuleLayout
  title="Carteira"
  description="Posição consolidada, proventos e patrimônio."
  breadcrumbs={[{ label: "Carteira", to: "/carteira" }]}
  tabs={TABS}
>
  <Outlet />
</ModuleLayout>
```

### ModuleHeader

**Arquivo:** `src/components/module-header.tsx`

**Responsabilidade:** Cabeçalho padronizado com título, descrição e ação opcional.

### ModuleBreadcrumb

**Arquivo:** `src/components/module-breadcrumb.tsx`

**Responsabilidade:** Navegação contextual com ícone Home + links + último item inativo.

**Regras:**
- Primeiro item é sempre o link "Início" (`/`)
- Itens intermediários são links clicáveis
- O último item é texto não-clicável

### ModuleTabs

**Arquivo:** `src/components/module-tabs.tsx`

**Responsabilidade:** Navegação interna do módulo via abas. Utiliza `useLocation()` do TanStack Router para determinar aba ativa.

**Regras:**
- Abas usam `Link` do TanStack Router para navegação
- Aba ativa é destacada com `bg-background text-foreground shadow-sm`
- Suporta `aria-selected` e `role="tablist"` para acessibilidade
- Em telas pequenas, labels são truncadas automaticamente

### ModuleSection

**Arquivo:** `src/components/module-section.tsx`

**Responsabilidade:** Seção de conteúdo dentro de uma página-módulo.

**Props opcionais:** `title`, `description`, `action`, `id`, `className`

---

## 5. Estrutura de Rotas

### Padrão Oficial

```
/[module]              → Rota principal (ModuleLayout + Outlet)
/[module]/             → Rota índice (visão geral do módulo)
/[module]/[subpage]    → Sub-páginas do módulo
```

### Exemplos

```
/carteira              → Layout do módulo Carteira
/carteira/             → Visão geral (Resumo)
/carteira/patrimonio   → Sub-página Patrimônio
/carteira/proventos    → Sub-página Proventos
/carteira/metas        → Sub-página Metas

/analise               → Layout do módulo Análise
/analise/              → Visão geral (landing page)
/analise/fiis          → Sub-página FIIs
/analise/rankings      → Sub-página Rankings
```

### Arquivos no Sistema

```
src/routes/
  [module].tsx              → Layout do módulo (createFileRoute + ModuleLayout)
  [module].index.tsx        → Rota índice
  [module].[subpage].tsx    → Sub-páginas
```

---

## 6. Convenções

### Nomenclatura

| Item | Padrão | Exemplo |
|------|--------|---------|
| Rota principal | `[module].tsx` | `carteira.tsx` |
| Rota índice | `[module].index.tsx` | `carteira.index.tsx` |
| Sub-página | `[module].[subpage].tsx` | `carteira.patrimonio.tsx` |
| Componente do módulo | PascalCase | `ModuleLayout`, `ModuleTabs` |
| Tab label | Curto, descritivo | "Patrimônio", não "Visão Patrimonial Completa" |

### Organização

```
src/routes/
  carteira.tsx                  → Layout
  carteira.index.tsx            → Resumo (índice)
  carteira.patrimonio.tsx       → Patrimônio
  carteira.proventos.tsx        → Proventos
  carteira.rentabilidade.tsx    → Rentabilidade
  ...
```

### Padrão de Breadcrumb

- Primeiro item: sempre link para `/`
- Itens do módulo: último item sem link
- Labels curtas e consistentes

### Padrão de Tabs

- Primeira aba: visão geral do módulo (rota índice)
- Labels sem ícones (ou ícones pequenos e consistentes)
- Ordem: do mais geral para o mais específico
- Abas com links para funcionalidades externas devem ter "Versão completa"

### Padrão de Placeholders

Quando uma sub-página ainda não possui implementação completa:

```tsx
<ModuleSection title="Título" description="Descrição.">
  <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card px-6 py-16 text-center">
    <Icon className="mb-3 size-10 text-muted-foreground/40" strokeWidth={1.5} />
    <h3 className="text-sm font-medium text-foreground">Título</h3>
    <p className="mt-1 max-w-xs text-xs text-muted-foreground">Descrição do placeholder.</p>
    <Button asChild variant="outline" size="sm" className="mt-4 gap-1.5">
      <Link to="/rota-existente"><ExternalLink className="size-3.5" /> Versão completa</Link>
    </Button>
  </div>
</ModuleSection>
```

### Padrão de Ações

- Ações no canto direito do `ModuleHeader`
- Botões de ação no `ModuleSection.action`
- Links "Voltar" quando aplicável

---

## 7. Regras Oficiais

### R-MOD-001 — Reutilização antes de criar

Nenhum componente de módulo deve ser criado se um equivalente já existir em `src/components/`. Sempre verificar `ModuleLayout`, `ModuleTabs`, `ModuleSection`, `Skeleton*`, `EmptyState`, `ErrorState` antes de criar novos componentes.

### R-MOD-002 — Composição antes de herança

Módulos devem compor componentes existentes, não estender ou herdar. Todo componente de módulo aceita `children` e `className` para personalização.

### R-MOD-003 — Consistência visual

Todo módulo deve seguir exatamente a hierarquia: `ModuleLayout → Breadcrumb → Header → Tabs → Outlet`. Não criar variações de layout por módulo.

### R-MOD-004 — Frozen Baselines

Nenhuma implementação de módulo pode alterar Core, Domain, Application ou Infrastructure. Todo código de módulo pertence exclusivamente à Presentation Layer.

### R-MOD-005 — Rota única no menu superior

Cada módulo deve ter exatamente uma entrada no menu superior (link direto, sem dropdown). Navegação interna é responsabilidade do `ModuleTabs`.

---

## 8. Guia para Criação de Novos Módulos

### Checklist

- [ ] **Rota principal** — criar `[module].tsx` com `createFileRoute` + `ModuleLayout`
- [ ] **Tabs** — definir array de `ModuleTab[]` com labels e rotas
- [ ] **ModuleLayout** — configurar title, description, breadcrumbs, tabs
- [ ] **Breadcrumb** — definir `[{ label: "Module", to: "/module" }]`
- [ ] **ModuleHeader** — title e description obrigatórios
- [ ] **Rota índice** — criar `[module].index.tsx` com visão geral
- [ ] **Sub-páginas** — criar `[module].[subpage].tsx` para cada aba
- [ ] **Placeholders** — usar `ModuleSection` + placeholder pattern para páginas sem implementação
- [ ] **SiteHeader** — adicionar link direto no menu superior (remover dropdown se existir)
- [ ] **MobileNav** — adicionar entrada se aplicável
- [ ] **Testes** — Smoke Test: navegar por todas as abas
- [ ] **404** — verificar que nenhuma aba retorna 404

### Passo a Passo

1. Criar `src/routes/[module].tsx` com `ModuleLayout` + `ModuleTabs` + `Outlet`
2. Criar `src/routes/[module].index.tsx` com visão geral
3. Para cada aba, criar `src/routes/[module].[subpage].tsx`
4. Atualizar `src/components/site-header.tsx`: substituir dropdown por link direto
5. Executar `npm run dev` e testar navegação
6. Verificar build: `npm run build`

---

## 9. Experience Layer — Componentes de Experiência

A biblioteca `src/components/experience/` contém componentes reutilizáveis de UX que enriquecem os módulos com informações contextuais e ações rápidas.

### Componentes Disponíveis

| Componente | Arquivo | Finalidade | Props principais |
|-----------|---------|------------|------------------|
| `ContextPanel` | `context-panel.tsx` | Painel lateral com seções de informação contextual | `sections`, `title` |
| `QuickActions` | `quick-actions.tsx` | Grade de atalhos para navegação | `items`, `columns` |
| `RelatedLinks` | `related-links.tsx` | Lista de links relacionados | `items`, `title` |
| `RecentActivity` | `recent-activity.tsx` | Timeline de atividades recentes | `items`, `maxItems` |
| `SmartHints` | `smart-hints.tsx` | Dicas/banners contextuais dispensáveis | `hints`, `dismissible` |

### Regras de Uso (R-EXP)

### R-EXP-001 — Composição antes de duplicação

Sempre verificar `src/components/experience/` antes de criar novos padrões de UX inline. Se o componente atender à necessidade, reutilizá-lo.

### R-EXP-002 — Dados estáticos como preparação

Os componentes aceitam props simples. Dados dinâmicos (via queries/queries) devem ser preparados no módulo consumidor e passados como props. Nenhum componente da Experience Layer faz fetching próprio.

### R-EXP-003 — Compatibilidade com ModuleLayout

Todos os componentes são compatíveis com `ModuleLayout`, `ModuleSection` e `Card`. Podem ser aninhados dentro de qualquer container visual existente.

---

## 10. Histórico

### Versão 1.0

- Criação do documento.
- Padrão arquitetural de módulos formalizado.
- Módulos de referência: Carteira (12 abas) e Análise (7 abas).
- 5 regras oficiais (R-MOD-001 a R-MOD-005).
- Checklist para criação de novos módulos.
