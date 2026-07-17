<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

# Projeto: Lio Feliz — Dashboard de Investimentos

> **⚠️ Caminho canônico do projeto:** `H:\Lio Feliz\`
>
> Este é o **único diretório oficial**. Qualquer outro caminho (ex: `C:\lio-feliz`, `C:\Users\...\Temp\...`) NÃO é o diretório do projeto.
> **AÇÃO OBRIGATÓRIA:** Verifique o working directory da ferramenta (ex: Bash `pwd`). Se NÃO for `H:\Lio Feliz\`, interrompa e reporte antes de qualquer operação. (GOV-008)

## Inicialização Obrigatória do Projeto

Este documento (AGENTS.md) contém apenas um resumo superficial do projeto. Ele **não contém todo o contexto necessário** para o desenvolvimento.

A inicialização segue a Ordem de Precedência Documental:

1. **`project-context/AI_CONTEXT.md`** — Estado Operacional e Protocolos
2. **`project-context/PROJECT_BOOTSTRAP.md`** — Memória Executiva
3. **`docs/DOCUMENTACAO_COMPLETA.md`** — Fonte Canônica (consulta quando necessário)

> **Instrução obrigatória para a IA:**
>
> Leia integralmente `project-context/AI_CONTEXT.md` e `project-context/PROJECT_BOOTSTRAP.md`, execute a Autoverificação Operacional (IA-026), e continue exatamente do último PS registrado.

---

## O Que Estamos Construindo

Um dashboard de carteira de investimentos completo que rivaliza com o **Investidor10**. O foco é **investidor de longo prazo** (fundamentos, dividendos, FIIs, ações BR, stocks US, ETFs). O usuário registra operações de compra/venda e o sistema calcula posição consolidada, rentabilidade, proventos recebidos, IRPF, etc.

## Stack

- **Framework:** TanStack Start (React + SSR + Vite + Nitro)
- **UI:** Tailwind CSS + shadcn/ui (Radix primitives)
- **Build target:** Cloudflare Module Worker
- **Banco:** Supabase (PostgreSQL) — mas `DEV_MODE=true` usa store em memória
- **Auth:** Supabase Auth via Lovable Cloud Auth
- **Deploy:** Cloudflare (npx wrangler)

## Como Rodar

```bash
cd "H:\Lio Feliz"
npm run dev    # http://localhost:8080
npm run build  # produção
```

Type checking (PowerShell):
```powershell
powershell -ExecutionPolicy Bypass -Command "& 'node_modules\.bin\tsc' --noEmit"
```

## DEV_MODE

`DEV_MODE=true` no `.env` — operações em memória (sem Supabase). Tudo funciona localmente. O servidor reinicia com alterações.

## Branches

- `main` — branch conectada ao Lovable. Commits pushados sincronizam com o editor Lovable.
- **Nunca** force push, rebase, amend ou squash commits já publicados.

## Estrutura do Projeto

### Rotas Autenticadas (requer login via Supabase)
- `/carteira` — visão geral da carteira (gráfico evolução, posições, alocação, proventos)
- `/carteira/lancamentos` — histórico de operações + botão sincronizar proventos
- `/carteira/rentabilidade` — rentabilidade vs benchmarks (IBOV, IDIV, IFIX)
- `/carteira/patrimonio` — evolução patrimonial detalhada
- `/carteira/analise` — análise de risco
- `/carteira/cobertura` — cobertura de proventos
- `/carteira/proventos` — proventos recebidos + projetados
- `/carteira/metas` — metas financeiras
- `/carteira/irpf` — apuração IRPF mensal
- `/irpf` — helper IRPF com exportação CSV

### Rotas Públicas
- `/` — página inicial com busca de 500+ ativos
- `/ativo/$ticker` — detalhe do ativo (fundamentos Yahoo + BRAPI)
- `/fii/$ticker` — detalhe do FII
- `/dividendos` — calendário de dividendos
- `/rankings` — rankings ações/FIIs
- `/comparar` — comparador de ativos
- `/calculadoras` — 5 calculadoras (Juros Compostos, Reserva, DCF, Preço Teto, CDB)
- `/provisionador` — provisionador de dividendos com timeline
- `/watchlist` — watchlist pessoal (localStorage)
- `/noticias` — notícias do mercado
- `/carteiras-recomendadas` — 5 carteiras pré-definidas

### Libs Core
| Arquivo | Descrição |
|---------|-----------|
| `src/lib/portfolio/models.ts` | Tipos (`AssetType`, `Operation`, `OperationSide`, `Position`, `PortfolioSummary`, `PortfolioHistoryPoint`) |
| `src/lib/portfolio/asset-types.ts` | `inferAssetType` e listas de tickers conhecidos |
| `src/lib/portfolio/consolidator.ts` | `calcPositions`, `consolidatePortfolio` |
| `src/lib/portfolio/history.ts` | `buildPortfolioHistory` |
| `src/lib/portfolio/index.ts` | Barrel — re-exporta tudo para `@/lib/portfolio` |
| `src/lib/portfolio.ts` | Barrel — re-exporta de `./portfolio/` (compatibilidade com imports existentes) |
| `src/lib/tax/rules.ts` | `TAX_RULES`, `calcMonthSummaries`, `calcGainPerTicker`, `classifyDayTrade`, `exportToCsv` e demais funções de apuração IRPF |
| `src/lib/tax/index.ts` | Barrel do módulo fiscal |
| `src/lib/operations.functions.ts` | Server functions: `listOperations`, `createOperation`, `deleteOperation`, `syncPendingDividends` |
| `src/lib/yahoo.server.ts` | Yahoo Finance + BRAPI: cotações, dividendos, stockDividends (splits/bonus), fundamentos, cache |
| `src/lib/data-functions.ts` | Server functions combinadas: `getAssetData`, `getAssetList`, `getRealProjections` |
| `src/lib/quotes.functions.ts` | Server function BRAPI para cotações em tempo real |
| `src/lib/exchange.server.ts` | Câmbio USD-BRL via AwesomeAPI |
| `src/lib/coingecko.server.ts` | Cotações cripto via CoinGecko |
| `src/lib/format.ts` | `formatBRL`, `formatDate`, `formatQty` |
| `src/lib/mock-data.ts` | Mock de 20 ações (fallback) |
| `src/lib/fii-mock-data.ts` | Mock de 20 FIIs |

### Componentes Chave
| Componente | Descrição |
|-----------|-----------|
| `src/components/add-operation-dialog.tsx` | Diálogo de lançamento com layout por tipo de ativo + abas Provento/Bonificação |
| `src/components/operations-content.tsx` | Tabela de histórico de operações + botão Sincronizar + auto-sync |
| `src/components/irpf-content.tsx` | Cálculo IRPF mensal |

## Data Flow: Carteira

1. Usuário registra operações via `createOperation` (compra, venda, dividendo, bonificação)
2. `listOperations` retorna todas as operações
3. `consolidatePortfolio(operations, priceOverrides, exchangeRates)` calcula:
   - Posições consolidadas por ticker (qty, avgPrice, totalCost, currentValue, pnl)
   - Alocação por tipo/setor
   - Totais da carteira
4. `buildPortfolioHistory(operations, priceOverrides, exchangeRates)` gera série temporal para gráficos
5. Dividendos reduzem `totalCost`, bonificações aumentam `qty`

## Dividendos: Formato de Armazenamento

Operações de dividendo armazenam:
- `quantity` = número de cotas na data do dividendo
- `price` = valor por cota (ex: 0.35)
- Total recebido = `quantity * price`
- `metadata.tipo_provento` = `"dividendo"` ou `"jcp"`
- `metadata.auto_sync` = `true` (se veio da sincronização automática)

## Sincronização Automática

`syncPendingDividends` (server function, POST):
1. Para cada ticker com posição aberta:
2. **BR stocks:** tenta `fetchBRAPIDividends` (dados mensais precisos, distingue DIVIDENDO vs JCP) → fallback `fetchYahooDividends`
3. **US/International stocks:** `fetchYahooDividends`
4. Pula dividendos já registrados (mesma data + ticker)
5. Calcula cotas na data (processa buy/sell/bonus até a data)
6. Cria operação `{ side: "dividend", quantity: cotas, price: valor_por_cota }`
7. Também detecta bonificações, splits, grupamentos via `fetchBRAPIStockDividends`
   - Bonificação: `{ side: "bonus", quantity: aumento }`
   - Split/Desdobramento: cria bonus operation com cotas extras
   - Reverse split/Grupamento: não cria (complexo)

## AssetType completo
```
stock | fii | bdr | etf | fixed_income | crypto | etf_internacional | stock_us | reit | other
```

## inferAssetType lógica
1. Known sets (KNOWN_STOCK_US, KNOWN_REITS, KNOWN_ETF_INTL, KNOWN_ETF_BR, KNOWN_BDR, KNOWN_BR_STOCKS)
2. FII: `/^\w+11$/` (exceto se já for ETF/BDR conhecido)
3. BR stock: `/^[A-Z0-9]{4,6}\d$/`
4. BDR: `/^[A-Z]{3,6}3\d$/`
5. Crypto prefix match
6. Fixed income prefix match
7. US ticker fallback: `/^[A-Z]{1,5}(\.[A-Z]{1,2})?$/`
8. `"other"` como fallback

---

# O QUE FAZER DEPOIS — Bugs e Pendências

## 🔴 Bug 1: Histórico de operações mostra dividendos e bonificações (não deveria)

**Local:** `src/components/operations-content.tsx`

**Problema:** O usuário quer que a aba Lançamentos mostre **apenas** compras e vendas. Dividendos e bonificações estão poluindo a visualização. A sincronização automática (auto-sync) também não deveria estar nesta aba — ou pelo menos o botão "Sincronizar proventos" deveria ficar na aba de Proventos.

**Solução sugerida:**
- Filtrar `ops` no `operations-content.tsx` para mostrar apenas `side === "buy" || side === "sell"`
- Mostrar dividendos/bonus em lista separada (ou na aba Proventos)
- Mover o botão Sync e o auto-sync `useEffect` para a aba de Proventos (`carteira.proventos.tsx` ou `proventos-content.tsx`)

## 🔴 Bug 2: Aba de proventos está vazia

**Local:** `src/routes/_authenticated/carteira.proventos.tsx` e/ou `src/components/proventos-content.tsx`

**Problema:** A página de proventos não exibe os dividendos registrados nas operações.

**Solução sugerida:**
- Verificar se `proventos-content.tsx` está usando as operações reais (filtradas por `side === "dividend"`)
- Ou criar um novo componente que liste os dividendos agrupados por ticker
- Os dividendos syncados via BRAPI/Yahoo devem aparecer aqui

## 🔴 Bug 3: Sincronização fica "carregando" infinitamente

**Local:** `src/components/operations-content.tsx` (auto-sync useEffect)

**Problema:** O `useEffect` de auto-sync dispara a mutation `syncMut.mutate()` que faz uma chamada POST ao servidor. Se o servidor não responder ou demorar, fica carregando para sempre.

**Solução sugerida:**
- Adicionar timeout na server function (já tem `AbortSignal.timeout(10000)` nas chamadas BRAPI)
- Adicionar `retry: false` ou `retry: 1` na mutation
- Melhor: mover sync para a aba de proventos e remover auto-sync da aba de lançamentos

## 🔴 Bug 4: Gráficos de evolução patrimonial não são "linha ascendente"

**Local:** `src/routes/_authenticated/carteira.index.tsx` (AreaChart) e `carteira.patrimonio.tsx`

**Problema:** O usuário quer que os gráficos mostrem **patrimônio acumulado** (linha sempre subindo, refletindo aportes + valorização), não apenas a valorização. Atualmente o gráfico mostra `value` (patrimônio total) que já é o valor acumulado. Talvez o problema seja que o gráfico usa `Area` com fill e o usuário quer visualmente uma "linha ascendente" mais limpa.

**Solução sugerida:**
- Verificar se `buildPortfolioHistory` está gerando dados corretos de `value` (patrimônio total) e `invested` (total investido)
- O `value` já inclui aportes + valorização, deveria ser uma linha ascendente naturalmente
- Talvez o problema seja que o investido (`invested`) está maior que o valor de mercado (`value`), fazendo a linha descer
- Considerar mostrar gráfico de `value - invested` (lucro acumulado) como alternativa
- Trocar `AreaChart` por `LineChart` se preferir visual mais limpo

## 🟡 Melhorias Desejadas (Prioridade Média)

- **error/notFound components** em páginas que ainda não têm
- **Responsividade mobile**
- **Skeletons para loading** em todas as páginas
- **Diálogo de lançamento:** busca BRAPI/Yahoo com autocomplete funcional (além das sugestões fixas)
- **Tesouro Direto** como layout separado no diálogo (exibir Taxa, Vencimento, Valor investido)

## 🟢 Melhorias Futuras (Baixa Prioridade)

- Alertas de proventos próximos
- Carteira recomendada personalizada
- Exportação de dados
- Comparação com meta de renda passiva

---

# Como Usar os Agentes Customizados

O OpenCode possui agentes especializados para cada fase do desenvolvimento.
Use **@** seguido do nome do agente para invocá-los.

## Divisão de Responsabilidades

| Papel | Ferramenta | Responsabilidade |
|-------|-----------|-----------------|
| **Arquiteto / Revisor / Auditor / Otimizador** | ChatGPT | Planejamento, definição de diretrizes, Engineering Review, auditoria de governança, **identificação e incorporação contínua de melhorias (GOV-015)** |
| **Executor** | OpenCode | Implementação de código, testes, build, lint, commit, push, relatórios, **execução de melhorias incorporadas no prompt (GOV-015)** |

## Agentes do OpenCode

| Comando | Função | Quando usar |
|---------|--------|-------------|
| `@architect ...` | Criar/revisar PIs e arquitetura | Antes de começar uma nova implementação |
| `@reviewer ...` | Revisar código e gerar ERs | Após implementação concluída |
| `@planner ...` | Criar EWOs e planejar sprints | Quando uma PI estiver aprovada |
| `@auditor ...` | Auditar governança e qualidade | Periodicamente ou antes de commits |
| `@ai-context ...` | Carregar contexto completo do projeto | No início da sessão |
| `@prompt-generator ...` | Criar prompts estruturados | Quando precisar preparar instruções |

**Alternar entre Build e Plan:** Use **Tab** para trocar entre o agente Build (executa código) e Plan (apenas planeja, sem modificar arquivos).

**Dica:** Tenha uma sessão para planejamento e outra para execução. Use `/new` para criar nova sessão e `/sessions` para alternar.

# Contexto para o Próximo Agente

## Para acessar o projeto

```bash
# Caminho do projeto
cd "H:\Lio Feliz"

# Iniciar servidor
npm run dev

# Type check
powershell -ExecutionPolicy Bypass -Command "& 'node_modules\.bin\tsc' --noEmit"

# Build
npm run build
```

Servidor roda em `http://localhost:8080`.

## Último commit enviado

Branch `main` em `rafaz0/lio-feliz`, commit `8f7f5e5`:
"feat: sincronizacao automatica de proventos (BRAPI + Yahoo), correcao inferAssetType, examples expandido, dividendos por cota, split/bonus detection"

27 arquivos modificados, 2361 inserções, 640 deleções.

## Data Architecture (resumo)

- **Cotações ao vivo:** BRAPI batch (B3) + CoinGecko (cripto) + Yahoo Finance (internacional)
- **Fundamentos:** Yahoo Finance + mock-data como fallback
- **Dividendos:** BRAPI quote endpoint (`?dividends=true&range=5y`) para BR, Yahoo Finance para US
- **Cache:** Memória com expiração (1h fundamentos, 5min câmbio, 5min cotações)
- **Câmbio:** AwesomeAPI (`USD-BRL`)

## Tipos de operação suportados

| side | Descrição | quantity | price | Efeito no portfolio |
|------|-----------|----------|-------|---------------------|
| buy | Compra | cotas compradas | preço por cota | +qty, +custo |
| sell | Venda | cotas vendidas | preço por cota | -qty, -custo (proporcional) |
| dividend | Dividendo/JCP | cotas na data | valor por cota | -custo (total = qty * price) |
| bonus | Bonificação/Split | cotas bônus | 0 | +qty, sem custo |

## Contas do usuário (se precisar logar)

O sistema usa Supabase Auth com magic link. Em DEV_MODE, algumas funcionalidades não precisam de auth, mas as rotas autenticadas redirecionam para login. O usuário pode estar logado no navegador.
