# AI Context — Lio Feliz

**Documento:** AI_CONTEXT.md

**Versão:** 2.09

**Status:** APROVADO

**Categoria:** Project Context

**Última atualização:** 06/08/2026 (v2.09)

> **Continuidade entre chats:** A continuidade entre sessões depende do `PROJECT_BOOTSTRAP.md`, que contém o Resumo Operacional Canônico. Ver "Objetivo Atual" abaixo para o estado real mais recente — o rastro formal PI → ER → EWO tem lacunas conhecidas entre PI-014 e PI-018 (ver nota abaixo).

---

**Aviso:** Este documento contém apenas identidade, estado operacional, objetivo atual e referências obrigatórias. Consulte `PROJECT_BOOTSTRAP.md` para o Runtime Operacional completo (regras, templates, rituais, fluxos). O Runtime é autossuficiente — não é necessário consultar `DEVELOPMENT_METHODOLOGY.md` para executar operações.

**⚠️ Lacuna de governança conhecida (não tentar reconstruir retroativamente — decisão já tomada pelo Rafael):** Em algum ponto entre a PI-013 e a PI-018, o OpenCode parou de criar os documentos de ER (Engineering Review) mesmo continuando a seguir as diretrizes e implementar via EWO. Resultado: existem EWOs marcadas `CONCLUÍDO` (ex: EWO-021) cuja PI pai ainda está em `DRAFT` (ex: PI-014), porque a aprovação formal nunca foi registrada — mas a implementação em si aconteceu. **Trate o status de cada `architecture-lab/EWO-0XX.md` e a presença real do código como fonte de verdade sobre "o que foi feito"; não confie apenas no status da PI/ER para isso.**

**⚠️ Lacuna de governança nova, descoberta em 06/08/2026 (esta versão corrige uma afirmação falsa das versões 2.00–2.07 deste documento):** as versões anteriores afirmavam que PI-017/018/019 estavam "em DRAFT, sem nenhuma EWO criada" e eram "as únicas frentes genuinamente não iniciadas". **Isso é falso** — verificado direto no código e no `git log`, não apenas nos documentos. Existem pelo menos **EWO-041 a EWO-069** implementadas (commits de 25–26/07/2026, antes até da conclusão formal registrada da PI-013), cobrindo o escopo das três PIs:

- **PI-017 (Gestão Financeira):** EWO-041 a EWO-045 implementadas por completo — Core Domain, Application e rotas reais (`/finance/contas`, `/finance/despesas`, `/finance/receitas`, `/finance/dividas`, `/finance/patrimonio`). Existe até `docs/PI-017_ENGINEERING_CLOSURE.md` marcado 🟢 FECHADO. **Porém a feature está órfã**: não há nenhum link para `/finance` em `src/components/site-header.tsx` nem `mobile-nav.tsx` (os arquivos reais de menu), e todo o backend usa repositórios **fake em memória** (`src/infrastructure/repositories/finance/fake-*.ts`) — nunca foi conectado ao Supabase. Ou seja: código pronto e "fechado" no papel, mas invisível e sem persistência real para qualquer usuário. Decisão pendente do Rafael: ativar (linkar no menu + implementar repositório Supabase) ou descartar.
- **PI-019 (Comercial/Assinaturas):** EWO-047 a EWO-056 implementam exatamente o sistema de planos/billing/feature-gates/checkout que este documento já vinha descrevendo em outras seções (gateway mock, `RequireCapability`, `/assinaturas`, `/checkout`) — só que sem nunca ter sido associado à PI-019 aqui. Essa frente **não é "não iniciada"**; é o que já estava sendo corrigido e endurecido (ver mitigações de 04/08/2026 abaixo).
- **PI-018 (Demo/Perfis/Ambientes):** EWO-046 (Modo Demo) implementada com ADR-018-001, depois estabilizada em vários commits — e mais tarde a entrada de "Modo Demo" foi removida da tela de login (commit `fb54740`, dentro do lote de correções táticas de 27–31/07 já registrado abaixo). Não investigado a fundo se o restante da infraestrutura de demo continua íntegra ou parcialmente morta.

Nenhuma dessas ~29 EWOs (041–069) tem documento formal em `architecture-lab/EWO-0XX.md` nem Engineering Closure em `docs/` (exceto a própria PI-017). Não tentar reconstruir esses documentos retroativamente — mesma decisão já tomada para a lacuna anterior. **Ao ler "PI-017/018/019 em DRAFT" em qualquer documento antigo (`PROJECT_STATUS.md` v2.27 e anteriores, ou histórico deste arquivo abaixo de v2.08), tratar como desatualizado.**

---

# Identidade

Projeto Lio Feliz — Dashboard de Investimentos. Stack: TanStack Start, Tailwind CSS, shadcn/ui, Supabase, Vercel.

# Estado Operacional

Manter durante toda a sessão: Projeto ativo, Objetivo atual, Modo, PS vigente, DEC ativas, Baseline válida, Protocolos ativos.

# Objetivo Atual

**Estado real verificado em 31/07/2026** (reconciliado direto com o código, não só com os documentos de planejamento):

- **EWO-013 (Presentation Layer — Backtests 14, Alertas 15) — 🟢 CONCLUÍDA hoje.** Os componentes já existiam prontos (`src/presentation/features/backtests`, `.../alerts`) mas não estavam plugados em nenhuma rota. Criadas `/backtests` e `/alertas` (`_authenticated`), adicionadas ao menu mobile e desktop. Verificado rodando a app — ambas renderizam corretamente (gate de plano Free/Basic funcionando).
- **EWO-014 (CI/CD, testes E2E, observabilidade) — auditada em 01/08/2026, SEM fechamento formal.** As 5 slices foram verificadas contra o código real: parcialmente implementadas (Slices 1-4 PARCIALMENTE CONCLUÍDAS, Slice 5 PENDENTE). Pendências reais: typecheck ausente no CI, `initSentry()` client nunca chamado, Playwright não roda em CI, code splitting ausente. Decisão do Rafael: se vira tarefa nova pra fechar as pendências ou fica em aberto.
- **EWO-003 (migração do portfólio legado para o novo domínio) — 🟢 CONCLUÍDA hoje (01/08/2026).** As 4 slices foram executadas via `PROMPT_EWO003_EXECUCAO.md`: Slice 1 `ConsultarCarteiraService` (ex-`consolidatePortfolio`), Slice 2 `ObterEvolucaoCarteiraService` (ex-`buildPortfolioHistory`), Slice 3 migração dos arquivos de frontend para os services + tipos movidos para `src/shared/types/portfolio.ts`, Slice 4 avaliou a remoção do módulo legado. **Decisão da Slice 4:** o módulo legado `src/lib/portfolio/` NÃO foi removido — o barrel `@/lib/portfolio` permanece redirecionando tipos para shared e `inferAssetType` para `src/lib/asset-types.ts`, porque `operations.functions.ts`/`data-functions.ts` (fora de escopo) ainda o importam e o `legacy-equivalence.test.ts` (oráculo permanente) depende das funções de cálculo. **Desvio documentado:** os services foram nomeados `ConsultarCarteiraService`/`ObterEvolucaoCarteiraService` porque `consultar-posicao-service.ts` e `obter-historico-patrimonial-service.ts` já existiam (PI-005, interface diferente baseada em `IProjectionRepository`). Baseline de testes: 1171 passed (era 1156), 15 testes de integração novos, zero regressão numérica.
- **PI-017, PI-018, PI-019 — DRAFT, sem nenhuma EWO criada.** Essas são genuinamente as únicas frentes "não iniciadas" (diferente de EWO-013/014/021, que tinham código pronto sem status formal).
- Entre 27/07 e 31/07 houve uma sequência de correções táticas de produção não ligadas a nenhuma PI/EWO formal: performance da aba "Meu Plano" (causa raiz: `ObterPlanoAtivoService` retornando `NotFoundError`), integração Bolsai como fonte principal de indicadores, congelamento dos módulos Finance/Notícias no menu, correções de UI mobile, remoção do modo demo do login. Ver `git log` para o histórico completo — não há PROMPT_*.md correspondente pra essas (foram direto, sem handoff formal pro OpenCode).
- **01/08/2026 — correção tática de risco de negócio (não ligada a PI/EWO formal):** o gateway de pagamento é mock (aprova qualquer assinatura sem cobrar) e, desde a EWO-013, as rotas Pro (`/alertas`, `/backtests`) estão ao vivo — ou seja, qualquer visitante podia virar "Pro" de graça clicando em assinar. Mitigação rápida aplicada: botão "Assinar" desabilitado pra planos pagos em `CheckoutForm.tsx` (mostra "Em breve" em vez de processar), removido o bloco de "dados de pagamento simulado" que não fazia mais sentido sem fluxo de pagamento ativo. **Isso é só mitigação de frontend** — o endpoint/mutation de checkout ainda aceitaria a chamada se acionado diretamente (ex: via API), não é uma correção de backend. Resolver de verdade exige implementar o gateway real (Asaas, decisão já registrada) ou bloquear no backend também. Testes (`vitest run checkout`, 15 passando) e build verdes.

**Achados de 04/08/2026 (correção de risco de negócio, ver histórico v2.08 abaixo para detalhe completo):** a mitigação do pagamento mock foi endurecida (`MockPaymentGateway.blockNonZeroCharges`, recusa cobrança > 0 fora de `DEV`) e descoberto que só 3 das 9 áreas com selo "PRO" tinham `<RequireCapability>` de verdade — corrigido nas 6 restantes (Metas, Provisionador, Rebalanceamento, Rankings, Setores, Calculadoras). **Confirmado visualmente pelo Rafael em produção em 06/08/2026: o bloqueio está funcionando.** Efeito colateral aceito: como o pagamento real (Asaas) ainda não existe e o mock está bloqueado em produção, hoje **nenhum usuário consegue virar Pro de verdade** — o produto não está vendável ainda, só protegido contra acesso gratuito indevido.

**Próximo passo em aberto (revisado 06/08/2026, ver lacuna de governança nova acima):** três frentes candidatas, decisão do Rafael:
(a) Resolver o pagamento real via Asaas — é o que desbloqueia o produto ser vendável de verdade (hoje ninguém consegue assinar um plano pago em produção).
(b) Decidir o destino da Gestão Financeira órfã (PI-017) — ativar (linkar no menu + Supabase) ou descartar código morto.
(c) PI-018/PI-019 não são mais candidatas a "próxima frente" — já têm implementação substancial (ver lacuna de governança acima); qualquer trabalho ali é continuação/correção, não início.

# Referências Obrigatórias

| Documento                    | Propósito                                                |
| ---------------------------- | -------------------------------------------------------- |
| `PROJECT_BOOTSTRAP.md`       | Runtime Operacional (regras, templates, rituais, fluxos) |
| `DEVELOPMENT_METHODOLOGY.md` | Metodologia oficial — fonte de verdade dos protocolos    |
| `AI_OPERATION_CHECKLIST.md`  | Checklist executável obrigatório                         |
| `DOCUMENTACAO_COMPLETA.md`   | Consolidação completa para consulta                      |
| `09_STRATEGIC_BACKLOG.md`    | Repositório de melhorias estratégicas                    |
| `PS_TEMPLATE.md`             | Template oficial de Pacotes de Sincronização             |

---

# Histórico

### Versão 2.09

**Fundação do pagamento real via Asaas — Fase 0 (06/08/2026).** Objetivo:
destravar o item 1 das pendências (hoje ninguém consegue virar Pro de
verdade em produção). Escopo desta fase: tudo que dá pra construir sem
chave de API do Asaas (Rafael tem conta, ainda sem chave). Não é
"pagamento funcionando" — é a fundação verificada por testes automatizados,
sem nenhuma chamada de rede real ainda.

**Construído:** `AsaasPaymentGateway` (usa a API de Assinaturas nativa do
Asaas — `POST /v3/subscriptions` — que gera cada ciclo de cobrança sozinha,
via Pix; `charge()` sempre retorna `PENDING`, confirmação só chega por
webhook) + `asaas-client.server.ts` (wrapper HTTP server-only); webhook real
`src/routes/api.asaas-webhook.ts` (valida header `asaas-access-token`,
idempotente por `payment.id`, ativa/renova assinatura em
`PAYMENT_RECEIVED`/`PAYMENT_CONFIRMED`, marca `PAST_DUE` em
`PAYMENT_OVERDUE`) — substitui a ideia de usar o stub
`api.stripe-webhook.ts` (nunca foi implementado de verdade, ficou como
está); nova fronteira de servidor `src/lib/checkout.server.ts`
(`createServerFn` com `requireAuth` — o `userId` agora vem da sessão real
no servidor, não do que o navegador manda, fechando uma lacuna de segurança
que existia desde sempre no fluxo antigo); `SupabaseSubscriptionRepository`
reescrito do zero (antes implementava só 3 métodos de uma interface que já
exige ~10 — o resto rodava sobre `FakeSubscriptionRepository`, em memória,
recriado a cada carregamento de página, mesmo em produção); nova migration
com as tabelas reais (`subscription_plans`, `subscriptions`,
`billing_cycles`, `billing_webhook_events`) e RLS; `PaymentResult` ganhou o
estado `PENDING`; `SubscriptionStatus` ganhou `PENDING_PAYMENT`
(`AssinarPlanoService` não ativa mais a assinatura antes da confirmação
real quando o gateway é assíncrono). Verificado: 1203 testes passando (1175
→ 1203, 0 regressão), typecheck sem erro novo (331 pré-existentes antes e
depois — nenhum deles em arquivo tocado aqui), lint limpo, build de
produção verde. Nada commitado ainda.

**Achado no caminho — `GerenciarAssinaturaService` não é código morto.**
Investigação inicial (nesta mesma sessão, ver lacuna de governança de
06/08/2026 acima) sugeria que os métodos antigos `ObterPlanoAtivo`/
`Salvar`/`ListarPlanosDisponiveis` da interface `ISubscriptionRepository`
(nomenclatura PT, tipos `Assinatura`/`PlanoDto`) eram vestígio de uma
geração anterior sem uso real. Busca no código mostrou o contrário:
`GerenciarAssinaturaService` (ativar/cancelar/alterar assinatura) usa esses
métodos de verdade — só não está ligado a nenhuma UI (mais um caso do
padrão "implementado mas inalcançável"). Em vez de apagar, o repositório
novo implementa os dois grupos de métodos sobre as mesmas tabelas
normalizadas (sem schema paralelo) — nenhum dos dois quebra.

**Lacunas conhecidas, decisão pendente do Rafael:**
1. **CPF/CNPJ é obrigatório pra criar cliente no Asaas** (confirmado na
   documentação oficial) e não existe em lugar nenhum do app hoje — coluna
   nova `profiles.cpf_cnpj` criada (nullable), mas nenhuma tela pede esse
   dado ainda. Sem isso, `AsaasPaymentGateway.charge()` falha com erro
   claro em vez de travar — mas ninguém consegue assinar de verdade até
   existir um lugar pra coletar CPF (onboarding ou checkout).
2. **Duas UIs de assinatura pagam, só uma foi migrada.** `/checkout`
   (`CheckoutForm.tsx`) agora usa a fronteira de servidor nova. `/assinaturas`
   (`SubscriptionsPage.tsx`, via `use-subscriptions-mutation.ts`) tem um
   botão "Assinar" pra plano pago que **continua no caminho antigo**
   (dispatcher client-side, `MockPaymentGateway` fixo em `__root.tsx`) — hoje
   seguro (a mitigação de 04/08 bloqueia cobrança > 0 em produção), mas vai
   ficar preso no mock mesmo depois do Asaas entrar em produção, a menos que
   também seja migrado ou as duas telas sejam consolidadas em uma.
3. **Migrations criadas, não aplicadas.** Sem Docker/Supabase local neste
   ambiente — `supabase/migrations/20260806120000_create_subscriptions.sql`
   e `..._add_cpf_cnpj_to_profiles.sql` existem no repo mas nunca rodaram
   contra um banco real. `src/integrations/supabase/types.ts` (gerado via
   `supabase:types`) também não reflete as tabelas novas — os repositórios
   novos usam `SupabaseClient` sem o generic `Database` de propósito, pra
   não travar no typecheck até isso ser regenerado.
4. **Fase 1 (sandbox) e Fase 2 (produção) não começaram** — dependem da
   chave de API do Asaas (sandbox exige conta separada da produção,
   confirmado na documentação) e de decisão explícita do Rafael antes de
   qualquer chamada de rede real acontecer.

### Versão 2.08

**Reconciliação de documentação (06/08/2026), pedida pelo Rafael.** Duas correções:

1. **Confirmação visual em produção:** o Rafael logou de verdade no site publicado e confirmou que o bloqueio `RequireCapability` aplicado em 04/08/2026 (commit `0f1c9af`) está funcionando nas 6 áreas (Metas, Provisionador, Rebalanceamento, Rankings, Setores, Calculadoras) — item que estava pendente de verificação manual desde a mitigação.
2. **Correção de uma afirmação falsa deste documento (presente desde a v2.00):** a alegação de que PI-017/018/019 estavam "em DRAFT, sem nenhuma EWO criada" foi verificada contra o `git log` e o código real e está **incorreta** — existem EWO-041 a EWO-069 implementadas (commits de 25–26/07/2026), incluindo o módulo de Gestão Financeira completo (PI-017, mas órfão: sem link no menu e sem persistência Supabase) e todo o sistema de assinaturas/billing/feature-gates (PI-019, que na verdade já era o sistema sendo corrigido nas seções acima deste próprio documento, só nunca associado à PI-019 aqui). Ver seção "⚠️ Lacuna de governança nova" no topo deste documento para o detalhe completo. `PROJECT_STATUS.md` v2.27 mantém a mesma afirmação errada — corrigir na próxima revisão desse arquivo.

### Versão 2.07

**Tarefas pequenas (01/08/2026).** Três entregas independentes via `PROMPT_TAREFAS_PEQUENAS_01_08.md`:
- **Tarefa A — Auditoria da EWO-014:** status das 5 slices atualizados com evidência do código real. Slices 1-4 marcadas PARCIALMENTE CONCLUÍDAS, Slice 5 PENDENTE. Pendências reais: typecheck ausente no CI (`ci-cd.yml` roda lint+test+build, sem `tsc --noEmit`); `initSentry()` client nunca é chamado (Sentry server OK, health OK, ErrorBoundary OK); Playwright não roda em CI + só 2 browsers + retries 1; code splitting ausente + bundle não verificado. Engineering Closure NÃO emitido.
- **Tarefa B — Limpeza de referências ao Lovable no AGENTS.md:** bloco `LOVABLE:BEGIN/END` removido, "Supabase Auth via Lovable Cloud Auth" → "Supabase Auth", branch `main` descrita sem menção ao Lovable. `grep -i lovable AGENTS.md` → zero ocorrências.
- **Tarefa C — Bug `dev-user-0000`:** substituído por UUID v4 fixo `f9ff10aa-beac-4f63-a7f5-d477ad5d0da0` em 13 ocorrências (src/ + docs/APPLICATION_STATES.md). Só afeta DEV_MODE local. Baseline: 1171 testes passando, build e lint verdes.

### Versão 2.06

**EWO-003 CONCLUÍDA (01/08/2026).** Migração do portfólio legado (`src/lib/portfolio/`) para o novo domínio executada via `PROMPT_EWO003_EXECUCAO.md`. Slices 1-4 implementadas: `ConsultarCarteiraService` (posições, substitui `consolidatePortfolio`), `ObterEvolucaoCarteiraService` (histórico semanal, substitui `buildPortfolioHistory`), mapper `Operation → FinancialEvent` em `src/application/mappers/`, tipos movidos para `src/shared/types/portfolio.ts`, `inferAssetType` movido para `src/lib/asset-types.ts`. 11 arquivos de frontend migrados (zero imports diretos de `@/lib/portfolio`). Slice 4: módulo legado mantido (barrel redireciona tipos; funções de cálculo preservadas como oráculo do `legacy-equivalence.test.ts`; `operations.functions.ts`/`data-functions.ts` fora de escopo dependem do barrel). Desvio documentado: nomes dos services distintos dos propostos na EWO-003 por conflito com services existentes da PI-005. Baseline de testes: 1156 → 1171 passed (15 testes de integração novos), build e lint verdes, 0 erros TS novos.

### Versão 2.05

**Mitigação de risco de plano Pro gratuito (01/08/2026).** Botão "Assinar" desabilitado no `CheckoutForm.tsx` pra planos pagos (gateway de pagamento continua mock, e desde a EWO-013 as rotas Pro estão ao vivo — risco real de qualquer visitante virar Pro sem pagar). Mitigação de frontend apenas, não resolve o backend. Preparado `PROMPT_EWO003_EXECUCAO.md` (self-sufficient, cabeçalho DeepSeek V4 Flash) pra execução da EWO-003 via OpenCode — substitui o `PROMPT_MIGRACAO_PORTFOLIO.md` antigo, que estava desatualizado desde que a EWO-003 foi criada com o mapeamento completo.

### Versão 2.04

**Reconciliação de documentação (31/07/2026).** "Objetivo Atual" estava desatualizado e continha uma contradição interna (nota de continuidade citava PI-014/ER-014, seção abaixo citava PI-018/ER-018). Reconciliado com o código real: EWO-013 concluída nesta sessão (rotas de Backtests/Alertas plugadas), EWO-014 confirmada já implementada no código (falta só fechamento formal), EWO-003 confirmada em rascunho aguardando decisão. Documentada a lacuna de governança PI-014→PI-018 (EWOs concluídas com PI pai em draft) como conhecida e intencionalmente não reconstruída. `PROJECT_STATE.md` (raiz) e `docs/PROJECT_STATE.md` marcados como desatualizados/não oficiais, apontando para este documento e para `PROJECT_STATUS.md`.

### Versão 2.00

**PI-013 CONCLUÍDA.** Todos os 5 blocos materializados: A (Vercel Deploy), B (UX Excellence), C (Intelligence Layer), D (Feature Completion), E (Licensing & Access). 5 EWOs (EWO-016 a EWO-020), 24 slices, ~1.2k linhas adicionadas. Zero alterações em Core Domain. Stack oficial: GitHub + Supabase + Vercel + Sentry. Próxima etapa: definição do próximo roadmap estratégico.

### Versão 1.21

EWO-019 CONCLUÍDA. Bloco D da PI-013 (Feature Completion) materializado: SyncIndicator, NotificationBell, NotificationPanel com confirmação, useSyncStatus com dados reais. 5 Slices, 4 componentes, 202 linhas. FEAT-009 e FEAT-008 implementados. Nenhum Core Domain alterado. Próxima etapa: Bloco E (Licensing & Access — EWO-020).

### Versão 1.20

EWO-018 CONCLUÍDA. Bloco C da PI-013 (Intelligence Layer) materializado: InsightCard, InsightSection, 4 geradores (patrimônio, dividendos, metas, rebalanceamento), hook unificado useAllInsights. 4 Slices, 10 arquivos, 421 linhas. Nenhum Core Domain alterado. Conformidade R-021 validada. Próxima etapa: Bloco D da PI-013 (EWO-019) ou próximo roadmap.

### Versão 1.19

EWO-017 CONCLUÍDA. Bloco B da PI-013 (UX Excellence) materializado: MobileNav, SkeletonCard/Chart/Table, EmptyState, ErrorState/NotFoundState/RouteErrorBoundary, prefers-reduced-motion, ARIA labels, focus-visible. 5 Slices, 4 componentes, 277 linhas adicionadas. Nenhum Core Domain alterado. Próxima etapa: Bloco C da PI-013 (Intelligence Layer — EWO-018).

### Versão 1.18

EWO-016 CONCLUÍDA. Bloco A da PI-013 (Production Deployment) materializado: Vercel configurada como plataforma oficial (ADR-013-001), Nitro preset ajustado, Cloudflare Workers substituído, variáveis de ambiente validadas. Stack oficial: GitHub + Supabase + Vercel. Lovable registrado como legado. Próxima etapa: Bloco B da PI-013 (UX Excellence — EWO-017).

### Versão 1.17

EWO-015 CONCLUÍDA. Bloco C da PI-012 (Comercialização) materializado: IPaymentGateway, billing real com retry e webhook, checkout integrado. 4 Slices, 12 testes novos, 14 arquivos. Nenhum Core Domain alterado. Próxima etapa: definição do roadmap pós-PI-012.

### Versão 1.16

GOV-M06 — Baseline Lock. Baseline Congelada após Gate de Entrada. PI, ER, EWO congelados durante EWO ativa. Fluxo oficial atualizado. Projeto apto para EWO-004.

### Versão 1.15

GOV-M06 — Baseline Lock. Baseline Congelada após Gate de Entrada. PI, ER, EWO congelados durante EWO ativa. Fluxo oficial atualizado. Projeto apto para EWO-004.

### Versão 1.14

GOV-M01 a GOV-M05 implementados. Fluxo operacional formalizado. Git sync obrigatório. Template de pendências metodológicas. Projeto apto para EWO-004.

### Versão 1.13

EWO-003 CONCLUÍDA. Objetivo atualizado para Infrastructure Layer como próxima etapa.

### Versão 1.12

EWO-002 CONCLUÍDA. Objetivo atualizado para Application Layer como próxima etapa.

### Versão 1.10

Referência de Continuidade Arquitetural adicionada. Nova seção "Continuidade entre chats" formalizada.

### Versão 1.9

Aviso atualizado: Bootstrap Runtime é autossuficiente (não requer DEVELOPMENT_METHODOLOGY.md para execução).

### Versão 1.8

Simplificado. Conteúdo reduzido a identidade, estado, objetivo e referências. Regras operacionais migradas para PROJECT_BOOTSTRAP.md v2.0.

### Versão 1.7

PS#033 (Prompt 3). Marco Documentação Consolidada. Ordem de Precedência. Ciclo encerrado.
