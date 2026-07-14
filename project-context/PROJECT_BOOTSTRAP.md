# Project Bootstrap — Lio Feliz

**Documento:** PROJECT_BOOTSTRAP.md

**Versão:** 2.15

**Status:** APROVADO

**Categoria:** Project Context

**Última atualização:** 13/07/2026

---

> **O PROJECT_BOOTSTRAP é o Runtime Operacional oficial da IA.**
>
> Ele deve ser completamente autossuficiente.
>
> Após carregar `AI_CONTEXT.md` e `PROJECT_BOOTSTRAP.md`, a IA deverá conseguir continuar o projeto sem consultar qualquer outro documento.

---

# PARTE A — Estado do Projeto

## Projeto

Lio Feliz — Dashboard de Investimentos

## Modo

Execução

## Marco Atual

Documentação Consolidada (Concluído)

## PI Atual

PI-002 v0.1 — Canonical Investment Model (Draft)

## PS Atual

Nenhum PS ativo no momento.

## Dashboard Executivo

```
📋 Painel Operacional

Projeto: Lio Feliz
Modo: Execução
PS Atual: —
Marco: Documentação Consolidada

🏛 Governanca    [████░░░░░░]  ~60%
🏗 Arquitetura   [████░░░░░░]  ~40%
⚙ Engineering   [██░░░░░░░░]  ~20%
💻 Codigo        [░░░░░░░░░░]  ~0%
```

> Fórmulas dos percentuais em `PROJECT_PROGRESS_PANEL.md`.

## Objetivos Ativos

Consolidar a arquitetura do Engineering N1: realizar Engineering Review da PI-002 para promover a Approved.

## DEC Ativas

Nenhuma.

## Backlog Atual

| BK | Descrição | Prioridade | Estado |
|----|-----------|------------|--------|
| BK-005 | PROJECT_MANIFEST.md | Baixa | Proposto |
| BK-006 | Licensing & Feature Access Layer | Média | Proposto |
| BK-007 | Comercialização | Média | Proposto |

## Próxima Etapa

Engineering N1 — Engineering Review da PI-002 v0.1 (Draft) para Approved.

---

# PARTE B — Runtime Operacional

## Autoverificação Pré-Resposta (IA-026)

Antes de responder, verificar obrigatoriamente:

- [ ] Estou no modo correto?
- [ ] Existe DEC ativa?
- [ ] Existe evidência objetiva para alterar a direção?
- [ ] O plano atual permanece válido?
- [ ] Esta resposta constitui uma Entrega Relevante?
- [ ] Existe alteração no repositório que precisa ser enviada ao GitHub? (GS-002)
- [ ] Existe Backlog Estratégico ativo?
- [ ] Existe melhoria aprovada não registrada no Strategic Backlog?
- [ ] Existe BK compatível antes de criar um novo PS?
- [ ] A tarefa atual possui Template, Protocolo ou Procedimento Oficial?

Se SIM na última verificação → revisar obrigatoriamente a seção correspondente do PROJECT_BOOTSTRAP.md antes de executar a tarefa.

Sem evidência objetiva, executar o plano vigente. Backlog ativo nunca é omitido automaticamente.

## Fluxo Oficial de Inicialização

```
1. Ler AI_CONTEXT.md (identidade, estado, referências)
2. Ler PROJECT_BOOTSTRAP.md (runtime operacional completo)
3. Restaurar Estado Operacional automaticamente
4. Entrar automaticamente em modo Execução
5. Continuar exatamente da próxima etapa oficial
6. Proibido retornar ao modo consultivo sem necessidade
```

## Checklist Obrigatório

- [ ] Estado restaurado
- [ ] Projeto identificado
- [ ] Marco identificado
- [ ] PS identificado
- [ ] Próxima etapa identificada
- [ ] Autoverificação executada
- [ ] Dashboard atualizado quando aplicável
- [ ] Template correto selecionado
- [ ] Ritual de encerramento preparado

## Regras de Comportamento

A IA:
- **executa** — não replaneja decisões consolidadas
- **não propõe alternativas** para decisões já aprovadas
- **não reinicia** discussões encerradas
- **somente questiona** quando faltar informação objetiva
- **continua exatamente** do último Estado Operacional
- **persiste o Estado Operacional** durante toda a conversa (IA-015)
- **evidências externas** não alteram automaticamente documentação — devem ser validadas antes (IA-027)
- **sincroniza com o GitHub imediatamente** após qualquer alteração no repositório (GS-002)

## Dashboard Executivo — Documentação

### Padrão Visual

```
📋 Painel Operacional

Projeto:
Modo:
PS Atual:
Marco:

🏛 Governanca    [progresso]
🏗 Arquitetura   [progresso]
⚙ Engineering   [progresso]
💻 Codigo        [progresso]
```

### Modelo Oficial

Sempre usar o layout acima. Barras com caracteres `█` e `░`.

### Critérios de Atualização

Alterar percentuais apenas mediante: conclusão documental, conclusão de PI, conclusão de Milestone, conclusão de Release ou outro evento oficialmente definido.

### Quando Exibir

Início de novo chat (Baseline), alteração de PS, alteração de Marco, alteração de percentuais, solicitação explícita.

### Quando Ocultar

Não exibir se nenhum dos eventos acima ocorreu. O Painel não contém Saúde do Chat, Auditoria, Pendências ou Fila.

## Ritual Obrigatório de Encerramento

Toda resposta operacional deve terminar com:

```
📊 Auditoria da Sprint
    Avaliar o que foi feito, descoberto e classificado.
    📐 Decisões Arquiteturais Capturadas — registrar cada decisão
    arquitetural incorporada à documentação oficial na sprint,
    com identificador, documento, impacto e status (Nova/Alterada/Consolidada).
📋 Pendências
    Listar pendências abertas da sprint atual e Backlog Estratégico ativo.
❤️ Saúde do Chat
    Status: 🟢 Saudável
```

O bloco **❤️ Saúde do Chat** deve seguir o formato de classificação abaixo.

### Formato do ❤️ Saúde do Chat

**🟢 Saudável** — todos os indicadores na normalidade:

```
❤️ Saúde do Chat

Status: 🟢 Saudável
```

**🟡 Atenção** — um ou mais indicadores com risco moderado. Exibir apenas os que justificam:

```
❤️ Saúde do Chat

Status: 🟡 Atenção

• <indicador 1>
• <indicador 2>
```

**🔴 Crítico** — evidências de perda de confiabilidade. Exibir apenas os responsáveis:

```
❤️ Saúde do Chat

Status: 🔴 Crítico

• <indicador responsável>
• Recomenda-se iniciar um novo chat.
```

### Indicadores de Classificação

| # | Indicador | O que avaliar |
|---|-----------|---------------|
| 1 | Continuidade lógica | Contradições, perda de contexto, repetições anormais |
| 2 | Carga operacional | Quantidade de mensagens, volume de contexto acumulado |
| 3 | Integridade metodológica | Pendências Persistentes preservadas, protocolos respeitados, templates usados |
| 4 | Integridade arquitetural | Propostas incompatíveis com decisões existentes, reconstrução desnecessária |
| 5 | Necessidade de reinicialização | Evidências de que novo chat reduziria risco operacional |

### Regras

- 🟢 usar quando todos os indicadores estiverem normais
- 🟡 usar quando houver risco moderado em ≥1 indicador
- 🔴 usar quando houver evidência objetiva de perda de confiabilidade
- Apenas indicadores responsáveis pelo status devem ser exibidos
- O Ritual é obrigatório e inomitível em toda Entrega Relevante (OP-002)

## Templates Oficiais

### Resposta Operacional (padrão)

Usar para respostas do dia a dia dentro de um PS ativo.

Estrutura: resposta direta + Ritual de Encerramento (quando aplicável).

### Prompt OpenCode

Usar quando for necessário executar alterações via OpenCode.

Estrutura:
1. Objetivo
2. Implementação
3. Atualizações Obrigatórias
4. DOCUMENTACAO_COMPLETA (regenerar ou não)
5. Relatório Consolidado Final (quando aplicável)
6. Sugestões Técnicas
7. Oportunidades Futuras
8. Registro em SYNC_HISTORY

### Múltiplos Prompts

Usar quando um PS exigir mais de um prompt.

Identificar cada prompt como "Prompt X de N". Somente o último solicita RCF.

### Atualização Simples

Usar para manutenções corretivas que não constituem novo PS.

Não gerar RCF. Executar alterações e confirmar.

### Pacotes de Sincronização (PS)

Usar para criar novo PS. Seguir `PS_TEMPLATE.md`. Sempre verificar antes se existe BK compatível no Strategic Backlog (IA-030).

### Engineering Work Order (EWO)

Usar para enviar ordens operacionais ao OpenCode baseadas em PI aprovadas.

Referenciar obrigatoriamente uma ou mais PI em estado **Approved** com a versão específica (`PI-XXX vX.X`).

A EWO não pode criar arquitetura; apenas executa especificações aprovadas.

Estrutura: identificação, PI(s) referenciada(s) com versão, objetivo, escopo, restrições, arquivos previstos, critérios de aceite, relatório obrigatório, observações.

### Engineering Review (ER)

Usar para revisar tecnicamente a implementação após execução da EWO.

A ER não altera arquitetura; apenas valida aderência à PI.

Estrutura: conformidade com PI, respeito a contratos arquiteturais, avaliação de regressão, complexidade, observações, melhorias, aprovação final.

### Checklist Vinculado (OP-010)

Todo novo protocolo operacional deve atualizar `AI_OPERATION_CHECKLIST.md`. Caso contrário, o protocolo é considerado incompleto.

### Template Vinculado (OP-011)

`PS_TEMPLATE.md` deve refletir os protocolos IA, PG, OP, PGR vigentes. Revisar sempre que houver alteração operacional relevante.

## Regras Operacionais

### Quando criar PS

Mudança significativa de arquitetura, metodologia, governança ou documentação que exija planejamento e rastreabilidade.

### Quando utilizar atualização simples

Manutenção corretiva de consistência, pequenos ajustes sem impacto arquitetural.

### Quando gerar relatório

Sempre no último prompt de um PS (Prompt N de N). Nunca em prompts intermediários.

### Quando não gerar relatório

Prompts intermediários, atualizações simples.

### Agrupamento inteligente de prompts

PS dividido em múltiplos prompts: informar "Prompt Único" ou "Prompt X de N".

### Criação de BK

Toda melhoria aprovada e adiada recebe um BK no Strategic Backlog. Verificar se existe BK compatível antes de criar novo PS.

### Registro de oportunidades futuras

Melhorias observadas durante execução que não pertencem ao escopo atual. Registrar em 📋 Pendências e, se aprovadas, migrar para o Strategic Backlog.

### Classificação das Sugestões (OP-007)

Toda sugestão deve ser classificada em uma única categoria: Correção, Otimização, Simplificação, Refatoração, Documentação, Governança ou Arquitetura.

### Verificação Pré-EWO

Antes de gerar qualquer EWO, verificar obrigatoriamente:

- existência da PI referenciada com versão específica (`PI-XXX vX.X`)
- status **Approved** da PI
- versão vigente da PI
- ausência de PI mais recente que substitua a referenciada
- materialização não altera conteúdo arquitetural da PI (IA-033)

Qualquer condição não atendida → interromper a implementação.

## Gestão do Backlog

```
Ideia
    ↓
Pendências (📋)
    ↓
Prompt compatível existe? — Sim → Executar
    ↓ Não
Strategic Backlog (BK)
    ↓
Implementação
    ↓
Atualização do BK (Concluído / Arquivado)
```

## Gatilhos Operacionais (IA-032)

Determinadas tarefas exigem reconsulta obrigatória ao `PROJECT_BOOTSTRAP.md` antes da execução.

### Prompt OpenCode

Antes de gerar qualquer Prompt para o OpenCode:

- Revisar obrigatoriamente o Template Oficial de Prompt.
- Confirmar que toda a estrutura obrigatória está sendo seguida.

### Pacote de Sincronização

Antes de gerar qualquer PS:

- Revisar o template oficial correspondente.

### Alterações Metodológicas

Antes de propor qualquer alteração de Runtime, Governança, Protocolos ou Engenharia:

- Revisar as seções correspondentes do `PROJECT_BOOTSTRAP.md`.
- Confirmar que a proposta não duplica uma regra já existente.

### Alterações Arquiteturais

Antes de propor alterações arquiteturais:

- Revisar as decisões arquiteturais disponíveis no bootstrap.
- Caso exista dúvida ou informação insuficiente, interromper a inferência e solicitar a `DOCUMENTACAO_COMPLETA.md`, o documento específico relacionado ao tema ou o ZIP do projeto, conforme o protocolo de escalonamento documental.

Nunca reconstruir arquitetura por hipótese quando houver possibilidade de existir documentação oficial.

### Gestão de Pendências

Antes de atualizar o bloco de Pendências:

- Revisar as regras de gestão de pendências.
- Garantir que Pendências Persistentes nunca sejam removidas por engano.
- Garantir a separação entre Pendências Persistentes e Pendências da Conversa.
- Verificar se existe backlog estratégico ativo — nunca declarar "Nenhum item identificado" quando houver.

### Materialização de Pl

Antes de materializar uma Pl no repositório:

- Confirmar que a Pl foi criada e aprovada pelo ChatGPT (Arquiteto do Projeto), não pelo OpenCode.
- A materialização não pode alterar conteúdo arquitetural da Pl.
- Se o conteúdo arquitetural não estiver completo, interromper a materialização e registrar pendência.

### Ritual de Encerramento

Antes de gerar o encerramento da resposta:

- Revisar o protocolo OP-002.
- Garantir que todos os blocos obrigatórios estejam presentes.
- Garantir que a estrutura siga o padrão oficial.

## Ordem de Precedência

```
1. DOCUMENTACAO_COMPLETA.md    Fonte Canônica
2. PROJECT_BOOTSTRAP.md         Runtime Operacional
3. AI_CONTEXT.md                Estado Operacional
```

Mesmo que apenas AI_CONTEXT e PROJECT_BOOTSTRAP sejam enviados no início do chat.

## Próximo Passo Operacional

### PI-001 v1.0 — Interpretation Layer (Approved)

| Campo | Valor |
|-------|-------|
| Identificador | PI-001 |
| Versão | v1.0 (Approved) |
| Status | Approved |
| Documento | `architecture-lab/PI-001.md` |
| Objetivo | Projetar a primeira especificação de engenharia responsável por interpretar as intenções do usuário e transformá-las em operações internas do sistema, estabelecendo a ponte entre a interação do usuário e os componentes centrais da arquitetura |
| Motivação | Iniciar oficialmente a fase de Engineering através da criação do primeiro artefato canônico de implementação, preservando a rastreabilidade entre Arquitetura, Engineering e Código |
| Entregável esperado | Documento canônico PI-001 contendo toda a especificação necessária para implementação da camada de interpretação |
| Estrutura | 26 seções: Objetivo, Motivação, Problema, Responsabilidade, Escopo, Fora do Escopo, Critérios de Conclusão, Princípios (5), Fluxo Geral, Contrato de Entrada, Contrato de Saída, Garantias, Invariantes (6), Interfaces, Dependências, Regras Operacionais (6), Tratamento de Falhas, Casos Limite (7), Restrições (5), Critérios de Aceite (7), Impacto, Extensibilidade, Diretrizes (6), Riscos, Critérios de Aprovação, Histórico |
| Resultado esperado | Especificação completa, consistente e aprovada, servindo como base oficial para a implementação da camada de interpretação |
| Próximo passo | EWO-001 autorizada (adiada — ver Engineering Outlook) |

> **Resumo Operacional Canônico:** Este resumo deve conter informações suficientes para que uma nova IA consiga iniciar corretamente a etapa sem consultar outros documentos.

### PI-002 v0.1 — Canonical Investment Model (Draft)

| Campo | Valor |
|-------|-------|
| Identificador | PI-002 |
| Versão | v0.1 (Draft) |
| Status | Draft |
| Documento | `architecture-lab/PI-002.md` |
| Objetivo | Definir o modelo canônico de representação dos investimentos do sistema, estabelecendo uma estrutura única, extensível e independente da origem dos dados |
| Motivação | Consolidar a linguagem semântica do domínio financeiro antes de iniciar a implementação |
| Entregável esperado | Especificação completa da ontologia, contratos, identidades e invariantes do domínio |
| Estrutura | 25 seções: Objetivo, Posicionamento, Responsabilidades, Excluídas, Canonical Source of Truth, Considerações, Ontologia (2-12), Identidade, Identificadores, Contratos, Invariantes (8), Princípios (4), Temporalidade, Evolução, Compatibilidade, Critérios, Riscos, Future Work, Histórico |
| Resultado esperado | Especificação completa, consistente e aprovada, servindo como base semântica oficial do domínio |
| Próximo passo | Engineering Review → Approved |

## Engineering Outlook

### Próxima PI

**ID:** PI-003

**Título:** (a definir)

**Documento:** `architecture-lab/PI-003.md`

**Objetivo:** A definir durante a Engineering Review da PI-002.

**Dependências:** PI-002 Approved.

**Resultado esperado:** A definir.

### PI Atual

**ID:** PI-002

**Título:** Canonical Investment Model

**Status:** Draft v0.1

**Documento:** `architecture-lab/PI-002.md`

**Objetivo:** Definir o modelo canônico de representação dos investimentos do sistema, estabelecendo uma estrutura única, extensível e independente da origem dos dados.

**Escopo previsto:**

- Modelo unificado para todos os tipos de investimentos.
- Identidade canônica dos ativos.
- Contratos fundamentais.
- Estrutura de normalização.
- Compatibilidade com a Interpretation Layer (PI-001).
- Suporte ao mercado brasileiro.
- Preparação para mercados internacionais.
- Preparação para múltiplas moedas.
- Extensibilidade para novos instrumentos financeiros.
- Independência da origem dos dados.

**Dependências:** PI-001 Approved.

**Resultado esperado:** PI-002 Draft concluída.

**Observações:**

- Não iniciar implementação de código.
- A PI-002 deverá utilizar a PI-001 como documento arquitetural base.

### Prioridade Arquitetural

A aprovação de uma PI autoriza sua implementação, mas não determina sua execução imediata.

A ordem efetiva de execução é definida pelo Engineering Outlook. A estratégia oficial do projeto estabelece que a arquitetura do Engineering N1 deve ser consolidada antes do início da implementação.

Consequentemente:

- PI-002 (Canonical Investment Model) possui prioridade arquitetural sobre EWO-001.
- EWO-001 permanece autorizada, porém adiada por decisão arquitetural.
- A implementação será iniciada somente após a consolidação da arquitetura prevista para o Engineering N1, salvo decisão formal em sentido contrário.

O fluxo metodológico PI → EWO → Implementação → ER permanece inalterado. O ajuste refere-se exclusivamente à prioridade temporal das atividades.

> **Fonte Canônica:** O Engineering Outlook representa apenas o planejamento da próxima etapa da engenharia. Ele não substitui PI, Strategic Backlog, Constituição ou Methodology. Após a conclusão da próxima PI, este bloco deverá ser atualizado para refletir a etapa seguinte.

## Contrato de Execução

Ao carregar este documento a IA assume automaticamente que:

- todas as decisões anteriores permanecem válidas;
- este documento possui precedência operacional;
- deve continuar exatamente da próxima etapa oficial;
- deve aplicar integralmente todas as regras aqui descritas.

---

# Histórico

## v2.15

Seção "Decisões Arquiteturais Capturadas" adicionada ao Ritual Obrigatório de Encerramento. AI_OPERATION_CHECKLIST sincronizado.

## v2.14

PI-002 v0.1 (Draft) materializada. Engineering Outlook atualizado com PI-002 como PI Atual e PI-003 como próxima. Próximo Passo Operacional expandido com PI-002.

## v2.13

GS-002 — Sincronização Automática com GitHub. Regra de comportamento e verificação IA-026 adicionadas.

## v2.12

Prioridade Arquitetural. Engineering Outlook esclarecido: PI aprovada não implica implementação imediata. PI-002 definida como prioridade arquitetural sobre EWO-001. AI_OPERATION_CHECKLIST atualizado.

## v2.11

ER-001 concluída. PI-001 promovida a v1.0 (Approved). Próximo passo: EWO-001 → Implementação.

## v2.10

Engineering Outlook (EO-001) adicionado. Seção padronizada para planejamento da próxima PI (PI-002 — Canonical Investment Model). AI_OPERATION_CHECKLIST atualizado com verificação de alinhamento ao EO.

## v2.9

Classificação Arquitetural. BK-006 e BK-007 adicionados ao Backlog. Universalidade e Multi-Mercado registrados como Princípios Arquiteturais na Constituição. IA-036 referenciado.

## v2.8

Consolidação Metodológica. Verificação Pré-EWO atualizada com materialização (IA-033). Gatilho de Materialização de PI adicionado. Gestão de Pendências atualizada com regra de backlog. Papeis das Ferramentas sincronizados com DEVELOPMENT_METHODOLOGY.md v2.2.

## v2.7

PI-001 v0.1 (Draft) criada e registrada. Próximo Passo atualizado com versão, status e documento. Dashboard atualizado com PI Atual.

## v2.6

Versionamento e Imutabilidade das PI. EWO passa a exigir versão específica da PI. Verificação Pré-EWO atualizada com versão.

## v2.5

Fluxo de Engenharia (PI → EWO → ER) integrado ao Runtime. Templates EWO e ER adicionados. Verificação Pré-EWO registrada. Próximo Passo vinculado ao ciclo de vida de PI.

## v2.4

OP-002 consolidado como Fonte Canônica exclusiva da ❤️ Saúde do Chat. Princípio da Fonte Canônica aplicado: cópia removida do DEVELOPMENT_METHODOLOGY.md.

## v2.3

OP-002 evoluído: ❤️ Saúde do Chat com formato padronizado (🟢🟡🔴) e 5 indicadores de classificação. IA-031 Gatilhos renumerado para IA-032. Referências sincronizadas.

## v2.1

Continuidade Arquitetural formalizada. Próximo Passo Operacional expandido com Resumo Operacional Canônico completo do PI-001. Observação canônica sobre autossuficiência entre chats registrada.

## v2.0

Runtime Operacional. Documento reestruturado em Partes A (Estado) e B (Runtime). Fluxo, Checklist, Autoverificação IA-026, Regras, Dashboard, Ritual OP-002, Templates (5 modelos), Precedência, Próximo Passo e Contrato formalizados. Protocolos IA-015, IA-027, IA-030, OP-007, OP-010, OP-011 incorporados. Documento comprovadamente autossuficiente via Auditoria de Runtime (12/07/2026).

## v1.1

PS#033 (Prompt 3). Ordem de Precedência adicionada. Estado atualizado. IA-030 incluída.

## v1.0

Criação do PROJECT_BOOTSTRAP.md. Documento de inicialização rápida.
