# Project Bootstrap — Lio Feliz

**Documento:** PROJECT_BOOTSTRAP.md

**Versão:** 2.21

**Status:** APROVADO

**Categoria:** Project Context

**Última atualização:** 15/07/2026

---

> **O PROJECT_BOOTSTRAP é o Runtime Operacional oficial da IA.**
>
> Ele deve ser completamente autossuficiente.
>
> Após carregar `AI_CONTEXT.md` e `PROJECT_BOOTSTRAP.md`, a IA deverá conseguir continuar o projeto sem consultar qualquer outro documento.

---

🚀 **Bootstrap Rápido**

Se esta é a primeira interação da IA com o projeto, a ordem recomendada de leitura é:

1. **PROJECT_BOOTSTRAP** (estado atual + baseline arquitetural)
2. **AI_OPERATION_CHECKLIST** (protocolo operacional)
3. **DEVELOPMENT_METHODOLOGY** (regras do projeto)

As PIs (PI-001, PI-002, PI-003) devem ser consultadas apenas quando uma decisão exigir detalhes arquiteturais.

---

# PARTE A — Estado do Projeto

## Projeto

Lio Feliz — Dashboard de Investimentos

## Modo

Execução

## Marco Atual

Documentação Consolidada (Concluído)

## PI Atual

PI-003 v1.0 — Canonical Operations & Event Flow Architecture (Approved)

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

Consolidar a arquitetura do Engineering N1: definir PI-003 e preparar EWO-001.

## DEC Ativas

Nenhuma.

## Backlog Atual

| BK | Descrição | Prioridade | Estado |
|----|-----------|------------|--------|
| BK-005 | PROJECT_MANIFEST.md | Baixa | Proposto |
| BK-006 | Licensing & Feature Access Layer | Média | Proposto |
| BK-007 | Comercialização | Média | Proposto |

## Próxima Etapa

Engineering N1 — Definir PI-003. EWO-001 autorizada (pendente definição da ordem).

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
    📐 Decisões Arquiteturais Capturadas
      • Nome: [nome da decisão]
      • Documento: [documento onde foi incorporada]
      • Impacto: [impacto arquitetural resumido]
      • Status: Nova / Alterada / Consolidada
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

## Regras de Governança Pós-Auditoria (GOV-003)

Incorporadas após AIR-001 e GIT-FORENSICS-001. Nenhuma Sprint, Slice, Engineering Review ou implementação poderá ser considerada concluída sem cumprir integralmente as regras abaixo.

### 1. Sincronização Obrigatória

Após toda implementação concluída, executar obrigatoriamente:

1. Testes (quando disponíveis)
2. Lint
3. `git add`
4. `git commit` (mensagem descritiva)
5. `git push`
6. Confirmar sincronização com o GitHub

Nenhuma Sprint, Slice ou Engineering Review poderá ser considerada concluída antes da confirmação do push.

### 2. Estado Oficial do Projeto

O estado oficial do projeto é o estado do repositório Git versionado.

Relatórios de implementação, documentos arquiteturais ou registros metodológicos não substituem a existência do código no repositório oficial. Toda decisão de continuidade deve ser baseada no que está versionado, não no que foi planejado ou relatado.

### 3. Fluxo Obrigatório de Implementação

Toda implementação deverá seguir rigorosamente o fluxo abaixo:

```
Prompt
  ↓
Implementação
  ↓
Testes (quando disponíveis)
  ↓
Lint
  ↓
Commit
  ↓
Push
  ↓
Confirmação do Push
  ↓
Relatório Final
```

Cada etapa é condição obrigatória para a próxima. Nenhuma etapa pode ser suprimida.

### 4. Bloco Obrigatório nos Relatórios

Todo relatório de implementação deverá conter obrigatoriamente o bloco abaixo ao final:

```
Estado da Sincronização
• Commit: <hash>
• Branch: <nome>
• Push: <confirmado / pendente>
• GitHub: <sincronizado / divergente>
• Working Tree: <limpa / suja>
```

### 5. Auditoria Pós-Rebase

Sempre que ocorrer qualquer das operações abaixo:

- rebase
- merge complexo (com conflitos)
- resolução manual de conflitos

executar obrigatoriamente uma Auditoria de Integridade (AIR) antes de iniciar novas implementações. A auditoria deve verificar, no mínimo:

- marcadores de conflito residuais (`<<<<<<<`, `=======`, `>>>>>>>`)
- integridade dos imports
- build
- lint
- testes (quando disponíveis)

Nenhuma implementação poderá iniciar enquanto a auditoria não for concluída e aprovada.

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
| Próximo passo | Concluído. Engineering N1 consolidado. |
 
> **Resumo Operacional Canônico:** Este resumo deve conter informações suficientes para que uma nova IA consiga iniciar corretamente a etapa sem consultar outros documentos.

### PI-003 v1.0 — Canonical Operations & Event Flow Architecture (Approved)

| Campo | Valor |
|-------|-------|
| Identificador | PI-003 |
| Versão | v1.0 (Approved) |
| Status | Approved |
| Documento | `architecture-lab/PI-003.md` |
| Objetivo | Estabelecer a arquitetura operacional canônica do sistema, definindo como operações financeiras são processadas, transformadas em eventos e utilizadas para derivar o Modelo Canônico (PI-002) |
| Motivação | Completar a Trindade Arquitetural do Engineering N1: interpretação (PI-001) + representação (PI-002) + comportamento operacional (PI-003) |
| Entregável esperado | Especificação completa do modelo operacional, fluxo de eventos, cadeia causal Operação → Evento → Transição → Estado |
| Estrutura | 24 seções: Objetivo, Escopo, Posicionamento, Fundação Conceitual, Princípios (3), Modelo Operacional, Objetivos, Ciclo de Vida, Fluxo de Eventos, Modelo de Eventos, Transições, Rejeições, Idempotência, Responsabilidades (6), Contratos, Invariantes (8), Compatibilidade, Fronteiras, Critérios, Riscos, Evolução, Referências, Conclusão, Histórico |
| Resultado esperado | Trindade Arquitetural do Engineering N1 consolidada |
| Próximo passo | Planejar EWO-001 — Implementação do núcleo arquitetural. |

### PI-002 v1.0 — Canonical Investment Model (Approved)

| Campo | Valor |
|-------|-------|
| Identificador | PI-002 |
| Versão | v1.0 (Approved) |
| Status | Approved |
| Documento | `architecture-lab/PI-002.md` |
| Objetivo | Definir o modelo canônico de representação dos investimentos do sistema, estabelecendo uma estrutura única, extensível e independente da origem dos dados |
| Motivação | Consolidar a linguagem semântica do domínio financeiro antes de iniciar a implementação |
| Entregável esperado | Especificação completa da ontologia, contratos, identidades e invariantes do domínio |
| Estrutura | 25 seções: Objetivo, Posicionamento, Responsabilidades, Excluídas, Canonical Source of Truth, Considerações, Ontologia (2-12), Identidade, Identificadores, Contratos, Invariantes (8), Princípios (4), Temporalidade, Evolução, Compatibilidade, Critérios, Riscos, Future Work, Histórico |
| Resultado esperado | Especificação completa, consistente e aprovada, servindo como base semântica oficial do domínio |
| Próximo passo | Concluído. PI-003 v1.0 Approved — Engineering N1 consolidado. |

## Baseline Arquitetural Atual

### Engineering N1

**Status:** Consolidado

### Arquitetura Oficial

```
PI-001 — Interpretation Layer

    ↓

PI-002 — Canonical Investment Model

    ↓

PI-003 — Canonical Operations & Event Flow Architecture
```

### Resumo Executivo

| PI | Papel | Descrição |
|----|-------|-----------|
| PI-001 | Como interpretar | Transforma informações externas em Operações Canônicas |
| PI-002 | O que representa o domínio | Define a ontologia, identidade, contratos e invariantes do Modelo Canônico |
| PI-003 | Como o domínio evolui | Estabelece a cadeia causal Operação → Evento → Transição → Estado |

### Fluxo Arquitetural Geral

```
Fontes Externas
    ↓
PI-001 — Interpretation Layer
    ↓
Operação Canônica
    ↓
PI-003 — Canonical Operations & Event Flow
    ↓
Estado Derivado
    ↓
PI-002 — Canonical Investment Model
    ↓
Carteira Oficial
```

### Documentos Normativos

- PI-001 — Interpretation Layer
- PI-002 — Canonical Investment Model
- PI-003 — Canonical Operations & Event Flow Architecture

### Próxima EWO

- EWO-001 — Implementação do Núcleo Arquitetural

### Checklist para futuras Engineering Work Orders

Toda EWO deverá demonstrar aderência explícita a:

- [ ] PI-001 — Interpretation Layer
- [ ] PI-002 — Canonical Investment Model
- [ ] PI-003 — Canonical Operations & Event Flow Architecture

---

## Engineering Outlook

### Trindade Arquitetural do Engineering N1 — Consolidada

| PI | Título | Status |
|----|--------|--------|
| PI-001 | Interpretation Layer | ✅ v1.0 Approved |
| PI-002 | Canonical Investment Model | ✅ v1.0 Approved |
| PI-003 | Canonical Operations & Event Flow Architecture | ✅ v1.0 Approved |

A fundação arquitetural do Engineering N1 encontra-se completa. As três especificações estabelecem a base normativa obrigatória para toda implementação futura.

### Próxima Etapa

**ID:** EWO-001

**Título:** Implementação do Núcleo Arquitetural

**Documento:** `architecture-lab/EWO-001.md` (a criar)

**Dependências:** PI-001 Approved, PI-002 Approved, PI-003 Approved.

**Objetivo:** Implementar o núcleo arquitetural do sistema a partir das três PIs aprovadas.

**Observações:**

- EWO-001 encontrava-se autorizada desde a aprovação da PI-001, mas adiada por prioridade arquitetural das PIs do Engineering N1.
- Com a consolidação do Engineering N1, EWO-001 torna-se a próxima etapa oficial.
- PI-004 não demonstrou necessidade arquitetural neste momento. Poderá ser criada futuramente se houver demanda para nova especificação.

### Prioridade Arquitetural

A aprovação de uma PI autoriza sua implementação, mas não determina sua execução imediata.

O Engineering N1 foi consolidado com três PIs aprovadas. A implementação do núcleo arquitetural via EWO-001 constitui a próxima etapa oficial do projeto.

O fluxo metodológico PI → EWO → Implementação → ER permanece inalterado.

## Contrato de Execução

Ao carregar este documento a IA assume automaticamente que:

- todas as decisões anteriores permanecem válidas;
- este documento possui precedência operacional;
- deve continuar exatamente da próxima etapa oficial;
- deve aplicar integralmente todas as regras aqui descritas.

---

# Histórico

## v2.21

GOV-003 implementado. Regras de Governança Pós-Auditoria incorporadas após AIR-001 e GIT-FORENSICS-001: sincronização obrigatória, estado oficial do projeto, fluxo obrigatório de implementação, bloco de sincronização em relatórios, auditoria pós-rebase. AI_OPERATION_CHECKLIST e PROJECT_STATUS sincronizados.

## v2.20

OP-015 implementado. Bootstrap evoluído: Bootstrap Rapido + Baseline Arquitetural Atual adicionados. Custo documental reconhecido como requisito arquitetural.

## v2.19

ER-003 concluída. PI-003 v1.0 (Approved). Engineering N1 consolidado. Engineering Outlook atualizado com a Trindade Arquitetural. Próximo passo: EWO-001.

## v2.18

G-001: Sprint de Governança. GOV-001 e GOV-002 implementados. OP-013/OP-014 adicionados. Formato de Decisões Arquiteturais Capturadas padronizado.

## v2.17

PI-003 definida: Canonical Operations & Event Flow Architecture. Engineering Outlook atualizado com escopo completo.

## v2.16

Engineering Review da PI-002 concluída. PI-002 v1.0 (Approved). Engineering Outlook atualizado: próximo passo é definição da PI-003.

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
