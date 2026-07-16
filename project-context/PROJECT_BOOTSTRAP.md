# Project Bootstrap — Lio Feliz

**Documento:** PROJECT_BOOTSTRAP.md

**Versão:** 2.29

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

C-001 + C-002 — Core Foundation e Núcleo do Domínio (Concluídos)

## PI Atual

Core API Frozen — Componentes da Core Foundation estabilizados. Nenhuma PI nova em execução.

## PS Atual

Nenhum PS ativo no momento.

## Dashboard Executivo

```
📋 Painel Operacional

Projeto: Lio Feliz
Modo: Execução
PS Atual: —
Marco: C-001 + C-002 (Core Foundation + Núcleo do Domínio)

🏛 Governanca    [████████░░]  ~80%
🏗 Arquitetura   [████████░░]  ~80%
⚙ Engineering   [████████░░]  ~80%
💻 Codigo        [█████░░░░░]  ~50%
```

> Fórmulas dos percentuais em `PROJECT_PROGRESS_PANEL.md`.

## Objetivos Ativos

Evolução do domínio de investimentos. Próxima fase: modelagem financeira (Portfolio, Position, Operation).

## DEC Ativas

Nenhuma.

## Backlog Atual

| BK | Descrição | Prioridade | Estado |
|----|-----------|------------|--------|
| BK | Descrição | Prioridade | Estado |
|----|-----------|------------|--------|
| BK-005 | PROJECT_MANIFEST.md | Baixa | Proposto |
| BK-006 | Licensing & Feature Access Layer | Média | Proposto |
| BK-007 | Comercialização | Média | Proposto |
| BK-008 | Substituição do mecanismo finalize() do DomainEvent | Baixa | Observação |

## Próxima Etapa

Evolução do domínio financeiro. Modelagem dos agregados: Portfolio, Position, Operation, Institution, Dividend, CorporateAction, AssetPrice.

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
0. Verificar working directory (GOV-008)
1. Ler AI_CONTEXT.md (identidade, estado, referências)
2. Ler PROJECT_BOOTSTRAP.md (runtime operacional completo)
3. Restaurar Estado Operacional automaticamente
4. Entrar automaticamente em modo Execução
5. Continuar exatamente da próxima etapa oficial
6. Proibido retornar ao modo consultivo sem necessidade
```

## Checklist Obrigatório

- [ ] Working directory verificado — confere com o caminho canônico (GOV-008)
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
- **materializa toda melhoria** — nenhuma recomendação arquitetural, metodológica ou operacional pode permanecer apenas na resposta: deve ser implementada, convertida em prompt, ou registrada como BK (GOV-006)
- **prioriza progresso concreto** — respostas longas sem artefato executável devem ser evitadas; explicacoes adicionais sao permitidas apenas quando agregam valor real a arquitetura ou evitam decisoes incorretas (GOV-006)

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

### 6. Verificação Pós-Sincronização

Após o push, executar obrigatoriamente:

1. Checkout limpo em diretório temporário (ou `git stash && git checkout -- .` no próprio repositório)
2. `npm install` (se necessário)
3. `npm run build`
4. `npm run lint`
5. Testes (quando disponíveis)
6. Confirmar que o estado sincronizado permanece íntegro

Nenhuma slice pode ser considerada encerrada sem esta verificação.

### 7. Checklist Obrigatório de Encerramento

Toda implementação, slice, sprint ou engineering review deverá encerrar com o checklist abaixo:

```
☐ Código implementado
☐ Testes aprovados
☐ Lint aprovado
☐ Build aprovado
☐ Commit criado
☐ Push confirmado
☐ GitHub sincronizado
☐ Working Tree limpa
☐ Relatório emitido
☐ HEAD registrado
```

O relatório final deverá reproduzir este checklist com o status de cada item.

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

## Convenções da Core Foundation (GOV-005)

Registros formais das decisões de implementação da C-001.

### 1. DomainEvent e finalize()

`Object.freeze()` no construtor da classe base `DomainEvent` impede subclasses que utilizam parameter properties do TypeScript de inicializarem corretamente seu estado.

**Convenção:** Toda subclasse de `DomainEvent` deve invocar `finalize()` ao final do construtor.

Esta decisão não altera a arquitetura, não representa dívida arquitetural; é uma convenção de implementação da Core Foundation.

### 2. Entity e validate()

`Entity` não executa `validate()` no construtor (ER-C002-001). Validação, quando implementada, ocorre após a construção completa.

### 3. AggregateRoot

- Eventos registrados exclusivamente internamente (addDomainEvent é protected).
- Eventos nunca participam da identidade de uma Entity.
- `getDomainEvents()` retorna cópia do array interno (encapsulamento).

### 4. ValueObject

Totalmente imutável. `Object.freeze` no construtor da classe base. Comparação estrutural por `equals()`.

### 5. DomainEvent

- Imutável após `finalize()`.
- Não representa Entity nem ValueObject — não implementa `equals()`.
- Identificador gerado internamente (desacoplado de UUIDv7).
- Timestamp automático (`occurredOn`) definido na construção.

### Prioridade Arquitetural

A aprovação de uma PI autoriza sua implementação, mas não determina sua execução imediata.

O Engineering N1 foi consolidado com três PIs aprovadas. A implementação do núcleo arquitetural via EWO-001 constitui a próxima etapa oficial do projeto.

O fluxo metodológico PI → EWO → Implementação → ER permanece inalterado.

---

# Core API Frozen (GOV-006)

A partir de 15/07/2026, os seguintes componentes da Core Foundation passam a ser considerados **infraestrutura consolidada e estável**:

| Componente | Status | Arquivo |
|---|---|---|
| Result | 🧊 Congelado | `src/core/domain/result.ts` |
| DomainError | 🧊 Congelado | `src/core/domain/errors.ts` |
| ValueObject | 🧊 Congelado | `src/core/domain/value-object.ts` |
| EntityId | 🧊 Congelado | `src/core/domain/entity-id.ts` |
| Entity | 🧊 Congelado | `src/core/domain/entity.ts` |
| AggregateRoot | 🧊 Congelado | `src/core/domain/aggregate-root.ts` |
| DomainEvent | 🧊 Congelado | `src/core/domain/domain-event.ts` |

## Regras do Congelamento

1. **Alterações comportamentais** nestes componentes somente poderão ocorrer mediante:
   - Engineering Review específica que justifique a alteração
   - Atualização das PIs correspondentes
   - Atualização do EWO correspondente

2. **Correções de bug** continuam permitidas sem necessidade de ER específica, desde que:
   - Não alterem o comportamento esperado da API pública
   - Sejam documentadas no commit e no relatório

3. **Refatorações comportamentais** deixam de ser livres — qualquer alteração que modifique contratos públicos, semântica de `equals()`, imutabilidade ou encapsulamento precisa seguir o fluxo completo (ER → PI → EWO).

4. **Novas classes** que estendem a Core Foundation (ex: novos ValueObjects, EntityIds, AggregateRoots) **não** são afetadas pelo congelamento — apenas as classes base listadas acima.

## Resultado da Engineering Review (ER-C001-C002-001)

- **Classificação:** Excelente
- **Divergências encontradas:** Nenhuma
- **Core Foundation aprovada como base definitiva do domínio:** SIM
- **Detalhes completos:** `docs/ER-C001-C002-001.md` (arquivo de relatório)

---

# Documentos Fundamentais do Projeto

### PROJECT_BOOTSTRAP

Documento central de inicialização do projeto. Define o estado operacional atual, os documentos obrigatórios, o fluxo de trabalho e o ponto oficial de continuidade para qualquer novo chat.

### PROJECT_STATUS

Registro histórico do projeto. Contém linha do tempo, versões, Engineering Reviews, Governanças, Sprints e eventos importantes.

### AI_OPERATION_CHECKLIST

Checklist obrigatório executado antes e após qualquer implementação. Garante aderência metodológica, sincronização Git, encerramento e auditorias.

### DEVELOPMENT_METHODOLOGY

Define a metodologia oficial de desenvolvimento, governança, fluxo PI → EWO → Sprint → ER → GOV e regras permanentes do projeto.

### DOCUMENTATION_INDEX

Índice mestre da documentação. Permite localizar rapidamente qualquer documento do projeto.

### PROJECT_STATE

Fotografia resumida do estado atual do projeto. Deve permitir que uma IA compreenda rapidamente em qual estágio o desenvolvimento se encontra.

### PI (Architecture Specification)

Documento de arquitetura de implementação. Define como determinada camada deverá ser construída. Não contém implementação. Congela decisões arquitetônicas.

### Engineering Review (ER)

Documento técnico de revisão. Analisa implementações já concluídas. Pode gerar recomendações. Não implementa mudanças.

### Engineering Wave Order (EWO)

Plano executivo de implementação. Transforma PIs aprovadas em sequência de Sprints. Define ordem de execução.

### Governança (GOV)

Atualizações metodológicas do projeto. Registra novas regras operacionais, convenções e lições aprendidas.

### Sprint

Unidade incremental de implementação. Cada Sprint deve possuir escopo limitado, testes, sincronização Git e relatório final.

---

# Fluxo Oficial da Engenharia (GOV-007)

```
Visão do Produto
        │
        ▼
Product Increment (PI)
        │
        ▼
Engineering Review (ER)   (quando necessário)
        │
        ▼
Engineering Wave (EWO)
        │
        ▼
Implementação das Slices
        │
        ▼
Validação
(Build + Lint + Testes)
        │
        ▼
Commit + Push
        │
        ▼
Sprint Report
        │
        ▼
Governança (GOV)
(se houver evolução metodológica)
        │
        ▼
PROJECT_STATUS
(histórico permanente)
```

Este é o fluxo oficial do projeto. Nenhuma implementação pode ignorá-lo.

---

# Mapa de Dependências Documentais (GOV-007)

| Documento | Finalidade | Pode gerar |
|---|---|---|
| PI | Define arquitetura | ER, EWO |
| ER | Analisa arquitetura | PI revisada, GOV, BK |
| EWO | Planeja implementação | Slices |
| Slice | Implementa código | Sprint Report |
| Sprint Report | Evidências de execução | PROJECT_STATUS |
| GOV | Evolui metodologia | Bootstrap, Checklist |
| PROJECT_STATUS | Histórico oficial | Nunca gera implementação |

## Papel de cada documento

| Documento | Papel |
|---|---|
| PI | Define arquitetura. Fonte canônica de engenharia. |
| ER | Valida arquitetura. Não altera. Apenas analisa. |
| EWO | Planeja implementação. Não cria arquitetura. |
| GOV | Evolui metodologia. Registra lições e convenções. |
| Sprint Report | Registra execução da slice. Evidência de conclusão. |
| PROJECT_STATUS | Preserva histórico permanente. |
| PROJECT_BOOTSTRAP | Coordena toda a operação. Runtime oficial. |
| AI_OPERATION_CHECKLIST | Controla execução operacional. Checklist obrigatório. |

## Regra de Precedência Documental

Em caso de conflito entre documentos, a ordem oficial de autoridade é:

```
PROJECT_BOOTSTRAP
        ↓
PI Approved
        ↓
ER
        ↓
EWO
        ↓
GOV
        ↓
Sprint Reports
        ↓
PROJECT_STATUS
```

Documentos de maior precedência prevalecem sobre os de menor precedência. Documentos ausentes não têm autoridade.

---

# Verificação de Workspace (GOV-008)

**Contexto:** Durante a sprint de consolidação documental, o OpenCode utilizou `C:\lio-feliz` como working directory, divergindo do caminho canônico `H:\Lio Feliz\` definido no AGENTS.md. A causa raiz foi a ausência de verificação explícita do working directory antes do início da execução.

## Causa Raiz

| Fator | Detalhe |
|-------|---------|
| Working directory padrão | A sessão foi iniciada em `C:\`, sem vinculação a um workspace específico |
| AGENTS.md não consultado | A instrução explícita "Sempre verifique o working directory antes de iniciar" não foi executada antes da implementação |
| Ausência de bloqueio | Nenhum mecanismo automático impede a IA de operar em diretório não canônico |
| Clone residual | `C:\lio-feliz` existia como clone residual, mas não era o diretório oficial |

## Medidas Preventivas

1. **Passo 0 no Fluxo de Inicialização:** Verificar working directory antes de qualquer operação.
2. **Checklist Obrigatório:** Item "Working directory verificado" adicionado como primeira verificação.
3. **Autoverificação IA-026 expandida:** Nova pergunta "O working directory corresponde ao caminho canônico do projeto?" adicionada.
4. **Regra de comportamento adicionada:** Se o working directory divergir do canônico, interromper e reportar antes de iniciar qualquer implementação.

## Regra de Comportamento

Se o working directory atual não corresponder ao caminho canônico `H:\Lio Feliz\`:
1. Interromper imediatamente qualquer inferência operacional.
2. Reportar a divergência ao usuário com o caminho correto.
3. Aguardar instruções antes de prosseguir.

Nenhuma implementação, leitura ou alteração de arquivos pode ocorrer em diretório não canônico.

---

# Eliminação do Workspace Duplicado (GOV-009)

**Contexto:** Após GOV-008, foi confirmada a existência de dois clones válidos do mesmo repositório: `C:\lio-feliz` (clone residual) e `H:\Lio Feliz\` (oficial). O clone em C:\lio-feliz foi removido para eliminar definitivamente qualquer possibilidade de operação em diretório não canônico.

## Ação Executada

1. Auditoria de segurança confirmou HEAD `e4b3470`, branch `main`, remote SSH, working tree limpa em ambos os clones.
2. Bundle Git criado em `H:\lio-feliz-backup-gov009.bundle` (987 KB).
3. Clone `C:\lio-feliz` removido completamente (`Remove-Item -Recurse -Force`).
4. Workspace `H:\Lio Feliz\` validado como único clone oficial.

## Regra Definitiva

O projeto Lio Feliz possui **exatamente um** clone oficial: `H:\Lio Feliz\`.

Qualquer referência futura a outro clone constitui erro operacional e deve ser tratado como violação de protocolo.

---

# Inicialização Oficial do Projeto (GOV-010)

O OpenCode **deve** ser iniciado exclusivamente pelos scripts oficiais localizados em `tools/`. Nunca abrir diretamente um clone ou iniciar o OpenCode de um diretório arbitrário.

## Scripts Oficiais

| Script | Finalidade |
|--------|-----------|
| `tools/workspace-check.ps1` | Workspace Guard — valida diretório, git, remote, HEAD, branch e working tree. Exit Code 0 = OK, 1 = erro. Reutilizável por outras automações. |
| `tools/start-opencode.ps1` | Inicialização completa: valida workspace e abre o OpenCode. |
| `tools/start-opencode.bat` | Equivalente CMD para ambientes sem PowerShell. |

## Fluxo Obrigatório de Inicialização

```
0. Executar Workspace Guard (tools/workspace-check.ps1)
1. Ler AI_CONTEXT.md
2. Ler PROJECT_BOOTSTRAP.md
3. Restaurar Estado Operacional
4. Entrar em modo Execução
5. Continuar da próxima etapa oficial
```

O Passo 0 é inomitível. Se o Workspace Guard falhar, nenhuma operação subsequente pode ocorrer.

## Regra de Inicialização

- Toda sessão do OpenCode para o Lio Feliz deve começar executando `tools\workspace-check.ps1`.
- O script `tools\start-opencode.ps1` (ou `.bat`) é o método oficial de abertura do projeto.
- Iniciar o OpenCode manualmente de qualquer outro diretório constitui violação de protocolo.

---

# Technical Roadmap (GOV-006)

Melhorias futuras identificadas durante a Engineering Review (ER-C001-C002-001). **Não constituem dívida técnica atual e não bloqueiam nenhuma Sprint.**

| Item | Descrição | Prazo |
|---|---|---|
| UUID_V7_REGEX compartilhado | Extrair regex duplicado dos 4 identificadores para módulo compartilhado | Médio prazo |
| UUIDv7 para DomainEvent.eventId | Substituir geração atual (`Date.now()` + `Math.random()`) por UUIDv7 | Médio prazo |
| deepFreeze para VOs compostos | Implementar congelamento profundo se VOs aninhados surgirem | Longo prazo |
| Classe base `UuidV7Id` | Abstração entre EntityId e identificadores concretos para reduzir duplicação | Longo prazo |

---

# Próximos Documentos Previstos (GOV-006)

Os documentos abaixo estão previstos para criação futura. **Ainda não existem** — deverão ser criados apenas quando a evolução do projeto exigir.

### PI-004 — Arquitetura do Aggregate Portfolio

**Finalidade:** Definir a arquitetura do Aggregate Portfolio. Responsável por estabelecer as regras de composição da carteira, agregados, invariantes e responsabilidades.

**Status:** Previsto

### EWO-002 — Implementação do Aggregate Portfolio

**Finalidade:** Planejar a implementação da PI-004 em Sprints incrementais.

**Status:** Previsto

### ER-C003-001 — Engineering Review da Próxima Wave

**Finalidade:** Revisar tecnicamente a implementação da próxima Engineering Wave.

**Status:** Previsto

### GOV-007 — Lições da Próxima Wave

**Finalidade:** Registrar as lições aprendidas após a conclusão da próxima Engineering Wave, caso novas convenções sejam necessárias.

**Status:** Previsto

---

# Engineering Outlook

## Fase Atual

A etapa de construção da infraestrutura foi concluída. O projeto entra oficialmente na fase de **evolução do domínio de investimentos**.

### EWO-001 — Concluído

**Título:** Implementação do Núcleo Arquitetural (Core Foundation + Modelo Canônico)

| Fase | Status |
|---|---|
| C-001 — Core Foundation (5 Slices) | ✅ Concluído |
| C-002 — Modelo Canônico (3 Slices) | ✅ Concluído |
| ER-C001-C002-001 | ✅ Aprovada |
| GOV-006 — Consolidação | ✅ Implementado |

| Slice | Componentes | Testes | Commit |
|---|---|---|---|
| C-001 Slice 01 | Result + DomainError | 30 | `a0fdfcb` |
| C-001 Slice 02 | ValueObject | 17 | `4ca45f2` |
| C-001 Slice 03 | Entity + EntityId | 16 | `1fbadf2` |
| C-001 Slice 04 | AggregateRoot | 11 | `2e09435` |
| C-001 Slice 05 | DomainEvent | 9 | `3051a37` |
| C-002 Slice 01A | Ticker | 17 | `5f2f1ab` |
| C-002 Slice 01B | Quantity | 15 | `0c3ede8` |
| C-002 Slice 01C | Money | 23 | `aaa9df3` |
| C-002 Slice 02 | AssetId, PortfolioId, OperationId, InstitutionId | 24 | `d320399` |
| C-002 Slice 03 | Asset | 13 | `05b7259` |

**Total: 10 Slices, 175 testes, zero regressões.**

## Contrato de Execução

Ao carregar este documento a IA assume automaticamente que:

- todas as decisões anteriores permanecem válidas;
- este documento possui precedência operacional;
- deve continuar exatamente da próxima etapa oficial;
- deve aplicar integralmente todas as regras aqui descritas.

---

# Histórico

## v2.29

GOV-010 implementado. Inicialização Oficial do Projeto criada. Scripts: `tools/workspace-check.ps1` (Workspace Guard), `tools/start-opencode.ps1`, `tools/start-opencode.bat`. Passo 0 no Fluxo de Inicialização — Workspace Guard obrigatório antes de qualquer operação. Regra de inicialização: OpenCode deve ser aberto exclusivamente pelos scripts oficiais. Bootstrap v2.29. AI_OPERATION_CHECKLIST v1.29. PROJECT_STATUS v1.37. DEVELOPMENT_METHODOLOGY v2.14.

## v2.28

GOV-009 implementado. Eliminação do Workspace Duplicado. Clone residual `C:\lio-feliz` removido. Bundle de backup criado. Projeto passa a ter exatamente um clone oficial. Bootstrap v2.28. AI_OPERATION_CHECKLIST v1.28. PROJECT_STATUS v1.36. DEVELOPMENT_METHODOLOGY v2.13.

## v2.27

GOV-008 implementado. Verificação de Workspace (GOV-008) adicionada como seção independente. Causa raiz documentada (working directory divergente). Medidas preventivas: Passo 0 no Fluxo de Inicialização, checklist obrigatório expandido, regra de comportamento de bloqueio. Bootstrap v2.27. AI_OPERATION_CHECKLIST v1.27. PROJECT_STATUS v1.35. DEVELOPMENT_METHODOLOGY v2.12.

## v2.26

GOV-007 implementado. Fluxo Oficial da Engenharia documentado (Visão → PI → ER → EWO → Slices → Validação → Commit → Report → GOV → PROJECT_STATUS). Mapa de Dependências Documentais criado (7 documentos, finalidade e geradores). Papéis de cada documento definidos. Regra de Precedência Documental estabelecida (Bootstrap > PI Approved > ER > EWO > GOV > Sprint Reports > PROJECT_STATUS). Bootstrap v2.26.

## v2.25

GOV-006 atualizado. Duas novas regras metodológicas incorporadas: Materialização Obrigatória de Melhorias (toda melhoria deve ser implementada, convertida em prompt ou registrada como BK — proibido deixar sugestões soltas na resposta) e Objetividade Operacional (priorizar progresso concreto, evitar respostas reflexivas sem artefato executável). Regras registradas em "Regras de Comportamento". Bootstrap v2.25. AI_OPERATION_CHECKLIST v1.26. DEVELOPMENT_METHODOLOGY v2.10. PROJECT_STATUS v1.33.

## v2.24

GOV-006 implementado. C-001 + C-002 concluídos: 10 Slices, 175 testes, zero regressões. ER-C001-C002-001 aprovada — Core Foundation classificada como Excelente, sem divergências. Core API Frozen: 7 componentes congelados (Result, DomainError, ValueObject, EntityId, Entity, AggregateRoot, DomainEvent). Engineering Outlook reestruturado — EWO-001 concluído, projeto entra na fase de evolução do domínio de investimentos. Seções adicionadas: Core API Frozen (regras de congelamento), Documentos Fundamentais do Projeto (11 resumos), Technical Roadmap (4 itens), Próximos Documentos Previstos (4 documentos). Dashboard atualizado. Próximo framework: PI-004 (Aggregate Portfolio). AI_OPERATION_CHECKLIST, PROJECT_STATUS, DEVELOPMENT_METHODOLOGY, DOCUMENTATION_INDEX, PROJECT_STATE, EWO-001 sincronizados.

## v2.23

GOV-005 implementado. C-001 (Core Foundation) concluída — 5 Slices, 13 arquivos de domínio, 83 testes, zero regressões. Engineering Outlook atualizado: EWO-001 executado, C-002 como próximo passo. Convenções da Core Foundation registradas: DomainEvent.finalize(), sem validate() no construtor Entity, AggregateRoot encapsulado, ValueObject imutável, DomainEvent sem equals(). BK-008 registrado como pendência de baixa prioridade (finalize()). AI_OPERATION_CHECKLIST, PROJECT_STATUS e DEVELOPMENT_METHODOLOGY sincronizados.

## v2.22

GOV-004 implementado. Consolidação final da governança: verificação pós-sincronização (Fase 5), checklist obrigatório de encerramento (10 itens), EWO-001 refinada com slices independentes. Decisões registradas: validate() pós-construtor (temporária), EntityId desacoplado, Money com escopo reduzido. AI_OPERATION_CHECKLIST e PROJECT_STATUS sincronizados. EWO-001.md criado.

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
