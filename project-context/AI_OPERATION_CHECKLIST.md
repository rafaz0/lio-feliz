# AI Operation Checklist — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** AI_OPERATION_CHECKLIST.md

**Versão:** 1.44

**Status:** APROVADO

**Categoria:** Project Context

**Última atualização:** 22/07/2026

---

**Objetivo:** Checklist operacional obrigatório antes de qualquer resposta relacionada ao projeto. Transforma IA-026 em procedimento executável.

---

## Divisão de Responsabilidades

Conforme definido no PROJECT_BOOTSTRAP:

- **ChatGPT** — Arquiteto de Implementação, Planejador Estratégico, Auditor Técnico, Revisor de Engenharia, Guardião da Governança
- **OpenCode (Agente Executor)** — Implementação de código, testes, build, lint, commit, push, relatórios de sincronização, Workspace Guard

O ChatGPT não produz planos detalhados de implementação quando o OpenCode possui contexto suficiente. O ChatGPT concentra-se em validação metodológica, arquitetural e estratégica.

## PASSO 0 — Workspace Validation (GOV-011)

> **Nota para o ChatGPT:** O Workspace Validation pertence exclusivamente ao **Agente Executor (OpenCode)**. O ChatGPT não executa o Workspace Guard, não valida Git, Branch, HEAD, Remote ou Working Tree. Ao receber este documento, assuma que o PASSO 0 já foi executado quando houver evidência operacional suficiente (relatório do Guard, confirmação do usuário, continuidade de sessão prévia do OpenCode). Na ausência dessa evidência, registre a pendência sem bloquear a restauração do contexto arquitetural.

**Checklist do Agente Executor (OpenCode):**

- [ ] Workspace Guard executado (`tools/workspace-check.ps1`) — Exit Code 0
- [ ] Working directory confirmado: `H:\Lio Feliz\`
- [ ] Git toplevel confirmado: `H:\Lio Feliz\`
- [ ] Remote confirmado: `git@github.com:rafaz0/lio-feliz.git`
- [ ] Branch confirmada: `main`
- [ ] Working Tree limpa (ou aviso registrado)
- [ ] WORKSPACE_FINGERPRINT.md existe e é válido
- [ ] Nenhum clone duplicado detectado (ou alerta registrado)

**Se o Workspace Guard falhar (Exit Code != 0) → interromper imediatamente. Nenhuma operação de engenharia pode prosseguir.**

---

## Pré-Resposta

Antes de responder, verificar:

### Para o ChatGPT (funções de arquitetura, revisão e governança):

- [ ] Estou atuando dentro do meu papel (Arquiteto/Planejador/Auditor/Revisor)? (GOV-012)
- [ ] Existe documentação arquitetural suficiente (PI, ER, EWO) para a atividade? (AI_ENGINEERING_PROTOCOL)
- [ ] A tarefa atual requer implementação direta de código? Se sim, delegar ao OpenCode.
- [ ] O OpenCode possui contexto suficiente para executar a implementação sem plano detalhado do ChatGPT?

### Para o OpenCode (Agente Executor):

- [ ] O working directory corresponde ao caminho canônico `H:\Lio Feliz\`? (GOV-008)
- [ ] A implementação respeita integralmente os limites da PI/ER/EWO vigente?

### Verificação de Contexto (GOV-013)

- [ ] A atividade atual exige Contexto Estratégico (PI/ER/EWO/arquitetura/auditoria/mudança metodológica)?
  - Se SIM → solicitar documentação consolidada (`DOCUMENTACAO_COMPLETA.md`)
  - Se NÃO → utilizar apenas relatórios operacionais (sync reports, ERs, closures)
- [ ] Existe relatório recente do OpenCode suficiente para o contexto atual?
- [ ] A requisição de documentação completa é justificada por uma das situações previstas na GOV-013?

### Comum a ambos:

- [ ] Já consultei o `20_PROJECT_MAP.md` para visão macro do projeto? (IA-042)
- [ ] Estou no modo correto?
- [ ] Existe DEC ativa?
- [ ] Existe evidência objetiva para alterar a direção?
- [ ] O plano atual permanece válido?
- [ ] Esta resposta constitui uma Entrega Relevante?
- [ ] Existe alteração no repositório que precisa ser enviada ao GitHub? (GS-002)
- [ ] Existe algum item registrado no Backlog Estratégico?
- [ ] Existe melhoria aprovada ainda não registrada no Strategic Backlog?
- [ ] Existe BK compatível antes da criação deste PS?
- [ ] A tarefa atual possui Template, Protocolo ou Procedimento Oficial?
- [ ] Existe oportunidade de melhoria identificada nesta atividade? (GOV-015)
  - Se SIM → aplicar fluxo de 4 etapas: implementação imediata → Slice futura → BK → descarte

Se SIM → revisar obrigatoriamente a seção correspondente do PROJECT_BOOTSTRAP.md antes de executar a tarefa.

Caso não exista evidência objetiva, priorizar a execução do plano vigente.

Se existir Backlog Estratégico ativo, verificar se deve ser exibido. Nunca omitir automaticamente.

---

## Entrega Relevante — Ritual Obrigatório

Se a resposta for uma Entrega Relevante, o ritual abaixo é **obrigatório e inomitível**:

- [ ] 📊 Estado da Engenharia
- [ ] 📐 Resultado da Auditoria
- [ ] 💡 Conhecimento Capturado
- [ ] 📋 Pendências Oficiais
- [ ] 📈 Painel Executivo

---

## Painel Operacional

Exibir o Painel Operacional apenas quando ocorrer:

- [ ] Início de novo chat (Baseline Operacional)
- [ ] Alteração do PS ativo
- [ ] Alteração do Marco
- [ ] Alteração dos percentuais
- [ ] Solicitação explícita do usuário

Caso contrário, não exibir.

---

## Prompt para OpenCode

> **GOV-P013:** O cabeçalho `Modelo recomendado: <modelo>` é obrigatório em todo prompt. Consulte `PROMPT_MASTER.md` (§1) para a Matriz de Seleção de Modelos.

Se for gerar um prompt para o OpenCode, seguir a estrutura:

- [ ] **Cabeçalho obrigatório:** `Modelo recomendado: <modelo>` (DeepSeek V4 Flash / DeepSeek V4 Pro / GLM-5.2)
- [ ] Objetivo
- [ ] Implementação
- [ ] Atualizações Obrigatórias
- [ ] DOCUMENTACAO_COMPLETA (regenerar ou não)
- [ ] Relatório Consolidado Final (quando aplicável)
- [ ] Sugestões Técnicas
- [ ] Oportunidades Futuras
- [ ] Registro em SYNC_HISTORY

### GOV-P014-003 — Resumo Estatístico no Relatório Consolidado

Quando aplicável, o Relatório Consolidado Final deve incluir um resumo estatístico dos artefatos implementados, por exemplo:

- [ ] Entidades criadas
- [ ] Value Objects criados
- [ ] Domain Services criados
- [ ] Ports definidos
- [ ] Commands criados
- [ ] Queries criadas
- [ ] DTOs criados
- [ ] Repositórios (Fake + Supabase)
- [ ] Testes criados e resultados

### GOV-P014-004 — Bloco de Rastreabilidade (Opcional)

Quando aplicável, adicionar um bloco de rastreabilidade contendo:

- [ ] Regras de negócio aplicadas (R-xxx)
- [ ] Invariantes implementadas (I-xxx)
- [ ] Não Conformidades tratadas (NC-xxx)
- [ ] Riscos mitigados

### GOV-P014-005 — Estado da EWO no Relatório

Incluir no Relatório Consolidado Final um bloco resumindo o estado atual da Engineering Work Order:

- [ ] Módulos concluídos
- [ ] Slices concluídas
- [ ] Slices pendentes
- [ ] Situação geral da EWO (🟢 FECHADA / 🟡 EM ANDAMENTO / ⏳ PENDENTE)

Esse resumo deve permitir auditorias rápidas sem necessidade de abrir a EWO completa.

### GOV-M02 — Sincronização Git Obrigatória

Checklist obrigatório no relatório final de toda atividade:

- [ ] branch informada
- [ ] HEAD registrado
- [ ] hash do commit informado
- [ ] push realizado com sucesso
- [ ] origin sincronizada
- [ ] Working Tree limpa

Caso qualquer item não seja atendido, marcar como "Encerramento Operacional Pendente".

### GOV-M04 — Pendências Metodológicas no Relatório

- [ ] Todas as pendências do prompt foram listadas com status
- [ ] Nenhuma pendência desapareceu sem registro
- [ ] Para cada pendência: Implementada / Adiada / Rejeitada
- [ ] Documentos alterados foram listados (quando aplicável)

### GOV-M06 — Baseline Lock

- [ ] O Gate de Entrada foi concluído antes da implementação?
- [ ] PI, ER e EWO estão em regime de congelamento?
- [ ] Durante a EWO ativa, alguma alteração arquitetural foi feita diretamente nos documentos congelados?
  - Se SIM → interromper: a alteração deve passar por nova avaliação arquitetural
- [ ] Alterações planejadas se limitam a: ortografia, formatação, referências cruzadas, status, versões, encerramento?
- [ ] Se houve necessidade arquitetural descoberta: foi registrada como NC/oportunidade e encaminhada para avaliação?
- [ ] A arquitetura aprovada foi modificada silenciosamente?
  - Se SIM → NC grave: reverter alteração e reportar
- [ ] Justificativa registrada para pendências não implementadas

## Qualidade dos Prompts para o Agente Executor (SYNC-001)

O Agente Executor não possui acesso às conversas do ChatGPT. Ele executa exclusivamente o que está descrito no prompt recebido.

**Regra:** Todo prompt produzido para o Agente Executor deve ser **autossuficiente**. Não deve depender de contexto implícito nem assumir conhecimento proveniente de conversas anteriores.

Checklist de prompt autossuficiente:

- [ ] **Cabeçalho com modelo recomendado incluso? (GOV-P013)**
- [ ] Contexto suficiente para compreender o problema?
- [ ] Problema identificado explicitamente?
- [ ] Objetivo claro e mensurável?
- [ ] Implementação esperada detalhada?
- [ ] Restrições documentadas?
- [ ] Critérios de aceite definidos?
- [ ] Atualizações documentais esperadas listadas?
- [ ] Lembrete Operacional Obrigatório (GOV-009) incluído ao final?

---

## Estado Operacional

- [ ] Projeto ativo conhecido
- [ ] Objetivo atual definido
- [ ] Modo da sessão identificado
- [ ] PS vigente registrado
- [ ] DEC ativas mapeadas
- [ ] Baseline válida carregada
- [ ] Protocolos ativos aplicados

---

## Fluxo de Engenharia (PI → EWO → ER)

- [ ] Antes de gerar EWO: PI existe, está Approved, versão vigente, sem PI mais recente?
- [ ] Implementação segue integralmente a PI referenciada?
- [ ] Materialização não altera conteúdo arquitetural da PI? (IA-033)
- [ ] A PI a ser usada como base possui documento oficial, versão e status válido? (IA-034)
- [ ] A EWO materializa arquitetura já definida pela PI — não cria nem modifica arquitetura?
- [ ] Nenhuma EWO está sendo interpretada como documento de definição arquitetural?

## Continuidade Arquitetural (IA-031)

- [ ] A próxima etapa oficial possui Resumo Operacional Canônico no PROJECT_BOOTSTRAP.md?
- [ ] Caso não possua: registrar pendência e impedir o encerramento definitivo da etapa até que o resumo seja criado e incorporado

## Materialização de Documentos (IA-033)

- [ ] A PI foi criada pelo ChatGPT (Arquiteto do Projeto), não pelo OpenCode?
- [ ] A materialização preserva o conteúdo arquitetural original sem alterações?

## Limites de Responsabilidade (IA-035)

- [ ] Estou validando apenas informações disponíveis no meu contexto?
- [ ] Não estou reconstruindo decisões arquiteturais ausentes?
- [ ] Não estou criando arquitetura por inferência?

## Engineering Outlook (EO-001)

- [ ] A tarefa atual corresponde à próxima etapa descrita no Engineering Outlook?
- [ ] Caso negativo: reconsultar o PROJECT_BOOTSTRAP.md antes da execução.
- [ ] A existência de uma PI aprovada não implica início automático da implementação.
- [ ] Antes de iniciar qualquer EWO, verificar se o Engineering Outlook define outra prioridade arquitetural.

## Classificação de Decisões Estratégicas (IA-036)

- [ ] A decisão estratégica foi classificada em exatamente uma categoria?
- [ ] Categoria: Princípio Arquitetural / PI / Strategic Backlog / Documento Metodológico?
- [ ] Foi registrada na Fonte Canônica adequada?
- [ ] Não permaneceu exclusivamente na memória da conversa?

## Checklist Vinculado (OP-010)

- [ ] Todo novo protocolo operacional criado atualizou AI_OPERATION_CHECKLIST.md?
- [ ] PS_TEMPLATE.md reflete os protocolos IA, PG, OP, PGR vigentes? (OP-011)

---

---

## Política de Sincronização Obrigatória

Sempre que qualquer arquivo oficial do projeto for criado, modificado, removido ou aprovado, a IA deverá executar obrigatoriamente o ciclo completo de sincronização antes de considerar a atividade encerrada.

### Ciclo Completo de Sincronização

1. Verificar os arquivos modificados.
2. Validar que as alterações foram aprovadas.
3. Atualizar a documentação relacionada, quando necessário.
4. Executar build, lint e testes, quando aplicável.
5. Realizar commit com mensagem compatível com a alteração.
6. Realizar push para o repositório remoto.
7. Confirmar que a sincronização foi concluída com sucesso.
8. Emitir o Relatório de Sincronização.

### Relatório de Sincronização Obrigatório

Ao final de qualquer atividade que produza alterações persistentes, a IA deverá emitir obrigatoriamente um relatório contendo, no mínimo:

- Tipo da atividade;
- Documentos alterados;
- Arquivos alterados;
- Resumo das alterações;
- Status do build;
- Status do lint;
- Status dos testes;
- Commit realizado;
- Push realizado;
- Status da sincronização remota;
- Pendências existentes.

### Exceção

Caso nenhuma alteração tenha sido persistida no repositório, a IA deverá informar explicitamente:

> Não foi realizada sincronização Git porque nenhuma alteração persistente foi produzida nesta atividade.

Essa mensagem é obrigatória e substitui o Relatório de Sincronização.

### Critério de Encerramento

Nenhuma atividade poderá ser considerada concluída enquanto existir alguma alteração aprovada ainda não sincronizada com o repositório remoto.

Caso a sincronização falhe, a atividade deverá permanecer com status **Pendente de Sincronização**, e a IA deverá informar claramente:

- qual etapa falhou;
- qual comando não foi concluído;
- quais arquivos permanecem pendentes;
- quais ações são necessárias para concluir a sincronização.

É proibido informar que uma atividade foi concluída quando houver alterações locais ainda não sincronizadas.

---

## Sincronização GitHub (GS-002 / GOV-009)

- [ ] Validações aplicáveis executadas (testes, build, lint)?
- [ ] `git add` executado (todos os arquivos modificados incluídos)?
- [ ] `git commit` executado (mensagem descritiva)?
- [ ] `git push` confirmado com sucesso no repositório remoto?
- [ ] Repositório remoto recebeu o commit (confirmado)?
- [ ] Working tree limpa após o push?
- [ ] HEAD final registrado?
- [ ] Relatório de implementação contém bloco "Estado da Sincronização" (GOV-003)?

**Regra de consistência do estado da sincronização:** Os campos do bloco
"Estado da Sincronização" são mutuamente dependentes. Commit pendente →
Push não pode ser confirmado → GitHub não pode ser sincronizado. Push
confirmado + GitHub sincronizado → Working Tree deve estar limpa. HEAD
deve estar registrado quando o ciclo de sincronização foi concluído.

## Checklist Obrigatório de Encerramento (GOV-004)

Ao final de toda implementação, slice ou engineering review, verificar:

- [ ] ☐ Código implementado
- [ ] ☐ Testes aprovados
- [ ] ☐ Lint aprovado
- [ ] ☐ Build aprovado
- [ ] ☐ Commit criado
- [ ] ☐ Push confirmado
- [ ] ☐ GitHub sincronizado
- [ ] ☐ Working Tree limpa
- [ ] ☐ Relatório emitido
- [ ] ☐ HEAD registrado

## Materialização Obrigatória de Melhorias (GOV-006)

Ao encerrar qualquer implementação, verificar:

- [ ] Houve alguma melhoria identificada durante esta implementação?
- [ ] Todas as melhorias foram:
  - implementadas imediatamente; ou
  - convertidas em prompt para implementação posterior; ou
  - registradas como BK (Strategic Backlog)?
- [ ] Alguma sugestão permaneceu apenas na resposta?
- [ ] Se SIM → operação considerada incompleta — a melhoria precisa ser materializada antes do encerramento.

## Verificação Pós-Sincronização (GOV-004)

Após o push, executar:

- [ ] Checkout limpo ou `git stash`
- [ ] Build em ambiente limpo
- [ ] Lint
- [ ] Testes (quando disponíveis)
- [ ] Estado sincronizado confirmado íntegro

## Convenções da Core Foundation (GOV-005)

Ao implementar classes que estendem a Core Foundation:

- [ ] Toda subclasse de `DomainEvent` invoca `this.finalize()` ao final do construtor
- [ ] `Entity` NÃO executa `validate()` no construtor (ER-C002-001)
- [ ] Eventos registrados via `addDomainEvent()` (protected) — nunca expostos diretamente
- [ ] Value Objects permanecem totalmente imutáveis

## Core API Frozen (GOV-006)

Ao propor alterações nos componentes da Core Foundation:

- [ ] O componente a ser alterado está na lista congelada? (Result, DomainError, ValueObject, EntityId, Entity, AggregateRoot, DomainEvent)
- [ ] Se SIM: existe ER específica que justifique a alteração?
- [ ] Se SIM: as PIs correspondentes foram atualizadas?
- [ ] Se SIM: o EWO correspondente foi atualizado?
- [ ] Se NÃO (é correção de bug): a correção não altera comportamento esperado da API pública?
- [ ] Se NÃO (é nova classe estendendo Core Foundation): sem restrições — o congelamento não se aplica

## Auditoria Pós-Operação Crítica (GOV-003)

Executar obrigatoriamente após rebase, merge com conflitos ou resolução manual de conflitos:

- [ ] Auditoria de Integridade (AIR) executada antes de novas implementações.
- [ ] Ausência de marcadores de conflito (`<<<<<<<`, `=======`, `>>>>>>>`).
- [ ] Build executa sem erros.
- [ ] Lint sem erros críticos (excluindo formatação).
- [ ] Testes (quando disponíveis) executam sem falhas.
- [ ] Estado oficial do repositório registrado no relatório.

## Backlog Estratégico e Strategic Backlog

- [ ] Existe Backlog Estratégico ativo?
- [ ] Deve ser exibido nesta resposta?
- [ ] Não foi omitido automaticamente?
- [ ] Existe melhoria aprovada ainda não registrada no Strategic Backlog?
- [ ] Existe BK compatível antes da criação deste PS?

---

## Registro de Conhecimento da Engineering Review (GOV-015)

Seção obrigatória ao final de toda Engineering Review:

- [ ] Oportunidades identificadas foram listadas?
- [ ] Cada oportunidade possui destino definido (implementação imediata / Slice futura / BK / TD / rejeitada / descartada)?
- [ ] Melhorias incorporadas imediatamente foram registradas?
- [ ] Melhorias programadas para próxima Slice foram documentadas?
- [ ] Nenhuma oportunidade ficou sem classificação?
- [ ] Existe melhoria metodológica identificada? (GOV-017)
  - Se SIM → registrar descrição, origem da evidência, impacto esperado e destino
  - Se NÃO → registrar "Nenhuma melhoria metodológica identificada."

## Pipeline Contínuo de Engenharia (GOV-018)

- [ ] A próxima etapa está definida pelo pipeline? (GOV-018)
  - Se SIM → executar sem solicitar confirmação
  - Se NÃO → verificar se existe bloqueador; se não houver, prosseguir
- [ ] Existe bloqueador que justifique interrupção do pipeline?
  - Bloqueadores válidos: técnico, arquitetural, documentação, PI, EWO, Core Foundation, metodologia
  - Se NÃO houver bloqueador → continuar automaticamente

---

# Histórico

### Versão 1.43

GOV-M06 — Baseline Lock. Checklist de verificação de congelamento de PI, ER e EWO durante EWO ativa. Compatibilidade com PROJECT_BOOTSTRAP v2.54.

### Versão 1.42

GOV-M01 a GOV-M05. GOV-M02 — Sincronização Git Obrigatória (checklist de sync no relatório final). GOV-M04 — Pendências Metodológicas no relatório (status obrigatório para cada pendência). Compatibilidade com PROJECT_BOOTSTRAP v2.53.

### Versão 1.40

GOV-018 — Pipeline Contínuo de Engenharia. Nova seção de verificação do pipeline na Pré-Resposta com regras de interrupção. Compatibilidade com PROJECT_BOOTSTRAP v2.44.

### Versão 1.39

GOV-017 — Governança Evolutiva da Metodologia. Nova verificação de melhoria metodológica no Registro de Conhecimento da Engineering Review. Compatibilidade com PROJECT_BOOTSTRAP v2.43.

### Versão 1.38

GOV-016 — Padronização do Encerramento das Respostas Estratégicas. ❤️ Saúde do Chat removido. Novo formato obrigatório para Entregas Relevantes: Estado da Engenharia, Resultado da Auditoria, Conhecimento Capturado, Pendências Oficiais, Painel Executivo. Compatibilidade com PROJECT_BOOTSTRAP v2.42.

### Versão 1.37

GOV-015 — Política de Incorporação Contínua de Melhorias. Nova verificação na Pré-Resposta para oportunidades de melhoria. Nova seção "Registro de Conhecimento da Engineering Review" ao final do checklist. Compatibilidade com PROJECT_BOOTSTRAP v2.41.

### Versão 1.36

GOV-013 — Política de Reconstrução de Contexto Estratégico. Nova seção "Verificação de Contexto" na Pré-Resposta com questões para determinar se Contexto Estratégico ou Operacional é necessário. Compatibilidade com PROJECT_BOOTSTRAP v2.38.

### Versão 1.35

GOV-012 — Divisão de Responsabilidades ChatGPT/OpenCode. Pré-Resposta reorganizada por papel (ChatGPT: arquitetura/revisão/governança; OpenCode: execução). Compatibilidade com PROJECT_BOOTSTRAP v2.37.

### Versão 1.34

Política de Sincronização Obrigatória institucionalizada. Nova seção com ciclo completo (8 etapas), Relatório de Sincronização Obrigatório (11 campos), exceção para ausência de alterações e status "Pendente de Sincronização" em caso de falha. Compatibilidade com PROJECT_BOOTSTRAP.md v2.36.

### Versão 1.33

SYNC-001 implementado. Nova seção "Qualidade dos Prompts para o Agente Executor" com regra de autossuficiência e checklist de 8 itens. Compatibilidade com PROJECT_BOOTSTRAP.md v2.33.

### Versão 1.32

GOV-009 implementado. Sincronização GitHub (GS-002) expandida com ciclo completo de 8 etapas e regra de consistência do estado da sincronização (commit pendente → push não confirmado → github não sincronizado). Compatibilidade com PROJECT_BOOTSTRAP.md v2.32.

### Versão 1.31

GOV-008 refinado. PASSO 0 explicitado como responsabilidade exclusiva do Agente Executor. Nota para ChatGPT adicionada: não executa validação de workspace, apenas assume conclusão mediante evidência. Pré-Resposta atualizada com marcação "(Agente Executor apenas)". Fluxo de Engenharia expandido: verificações de que EWO não define arquitetura. Compatibilidade com PROJECT_BOOTSTRAP.md v2.31.

### Versão 1.30

GOV-011 implementado. PASSO 0 endurecido: 8 verificações obrigatórias, validação de WORKSPACE_FINGERPRINT.md, detecção de clone duplicado. Bloqueio total se Workspace Guard falhar. Compatibilidade com PROJECT_BOOTSTRAP.md v2.30.

### Versão 1.29

GOV-010 implementado. Novo PASSO 0 — Workspace Validation. Execução obrigatória do Workspace Guard antes de qualquer operação. Bloqueio total se a validação falhar. Compatibilidade com PROJECT_BOOTSTRAP.md v2.29.

### Versão 1.28

GOV-009 implementado. Clone residual C:\lio-feliz removido. Workspace oficial exclusivo confirmado: H:\Lio Feliz\. Compatibilidade com PROJECT_BOOTSTRAP.md v2.28.

### Versão 1.27

GOV-008 implementado. Nova verificação "O working directory corresponde ao caminho canônico H:\Lio Feliz\?" adicionada como primeiro item da Pré-Resposta. Compatibilidade com PROJECT_BOOTSTRAP.md v2.27.

### Versão 1.26

GOV-006 atualizado. Nova seção "Materialização Obrigatória de Melhorias" — toda melhoria deve ser implementada, convertida em prompt ou registrada como BK. Proibido deixar sugestões soltas. Compatibilidade com PROJECT_BOOTSTRAP.md v2.25.

### Versão 1.25

GOV-006 incorporado. Nova seção "Core API Frozen" com checklist de verificação obrigatória antes de alterar componentes congelados. Compatibilidade com PROJECT_BOOTSTRAP.md v2.24.

### Versão 1.19

GOV-005 incorporado. Nova seção "Convenções da Core Foundation" com checklist de DomainEvent.finalize(), sem validate() no Entity, encapsulamento de eventos, imutabilidade de ValueObjects. Compatibilidade com PROJECT_BOOTSTRAP.md v2.23.

### Versão 1.18

GOV-004 incorporado. Novas seções: "Checklist Obrigatório de Encerramento" (10 itens) e "Verificação Pós-Sincronização". Compatibilidade com PROJECT_BOOTSTRAP.md v2.22 e EWO-001.md.

### Versão 1.17

GOV-003 incorporado. GS-002 expandido com verificação de push confirmado e working tree limpa. Nova seção "Auditoria Pós-Operação Crítica" adicionada. Compatibilidade com PROJECT_BOOTSTRAP.md v2.21.

### Versão 1.16

Seção obrigatória "Decisões Arquiteturais Capturadas" adicionada ao ritual de encerramento de Entregas Relevantes.

### Versão 1.15

GS-002 — Sincronização Automática com GitHub. Verificação pré-resposta e seção de sincronização adicionadas. Compatibilidade com PROJECT_BOOTSTRAP.md v2.13.

### Versão 1.14

Prioridade Arquitetural. EO-001 esclarecido: PI aprovada não implica implementação imediata. Verificação de prioridade antes de EWO adicionada. Compatibilidade com PROJECT_BOOTSTRAP.md v2.12.

### Versão 1.13

Engineering Outlook (EO-001). Adicionada verificação de alinhamento ao Engineering Outlook. Compatibilidade com PROJECT_BOOTSTRAP.md v2.10.

### Versão 1.12

Classificação Arquitetural. Adicionada verificação de classificação de decisões estratégicas (IA-036). Compatibilidade com DEVELOPMENT_METHODOLOGY.md v2.3.

### Versão 1.11

Consolidação Metodológica. Adicionadas verificações de materialização (IA-033), dependência entre PI (IA-034) e limites de responsabilidade (IA-035). Compatibilidade com DEVELOPMENT_METHODOLOGY.md v2.2.

### Versão 1.10

PI-001 v0.1 (Draft) materializada. Compatibilidade com Bootstrap v2.7.

### Versão 1.9

Verificação Pré-EWO atualizada: PI deve ser referenciada com versão específica (PI-XXX vX.X). Compatibilidade com v2.1.

### Versão 1.8

Fluxo de Engenharia (PI → EWO → ER). Seção de verificação pré-EWO adicionada. Compatibilidade com DEVELOPMENT_METHODOLOGY.md v2.0.

### Versão 1.7

OP-002 evoluído (GS-001.1). IA-031 Gatilhos Operacionais renumerado para IA-032. Referência no histórico corrigida.

### Versão 1.6

IA-026 expandida: nova verificação "A tarefa atual possui Template, Protocolo ou Procedimento Oficial?" adicionada. IA-032 Gatilhos Operacionais refletidos.

### Versão 1.5

Continuidade Arquitetural (IA-031). Adicionada seção "Continuidade Arquitetural" com validação de Resumo Operacional Canônico.

### Versão 1.4

PS#033 (Prompt 3). Marco Documentação Consolidada. Ciclo metodológico encerrado.

### Versão 1.3

PS#032 (Prompt 2). Adicionadas verificações de Strategic Backlog (IA-030). Seção "Backlog Estratégico" renomeada para "Backlog Estratégico e Strategic Backlog".

### Versão 1.2

Emenda Final ao PS#030D. Adicionada verificação de Backlog Estratégico (IA-026, INS-196). Adicionada seção "Backlog Estratégico" no checklist.

### Versão 1.1

Emenda ao PS#030D. Ritual de encerramento tornado obrigatório e inomitível. Adicionada seção "Checklist Vinculado" (OP-010, OP-011).

### Versão 1.0

Criação do AI_OPERATION_CHECKLIST.md. Checklist baseado em IA-026, OP-002, OP-003, OP-009 e Painel Operacional.
