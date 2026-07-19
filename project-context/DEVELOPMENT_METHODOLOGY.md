# Development Methodology — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** DEVELOPMENT_METHODOLOGY.md

**Versão:** 2.22

**Status:** APROVADO

**Categoria:** Project Context

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 18/07/2026

---

# 1. Objetivo

Este documento documenta oficialmente a metodologia utilizada para evolução arquitetural do projeto Lio Feliz.

Ele torna-se referência oficial para toda futura colaboração entre Rafael, IA e OpenCode.

---

# 2. Filosofia

> O projeto evolui através de refinamento incremental.
>
> Nenhuma decisão importante deve depender da memória das conversas.
>
> A metodologia do projeto deve evoluir continuamente.
>
> Sempre que uma melhoria permanente for identificada durante o desenvolvimento, ela deverá ser incorporada à metodologia oficial.
>
> A metodologia torna-se parte integrante do projeto e evolui juntamente com sua arquitetura.

---

# 3. Working Draft

1. Documentos complexos iniciam como Working Draft.
2. Podem sofrer alterações estruturais durante a fase de descoberta.
3. Somente tornam-se versão 1.0 após estabilização dos conceitos fundamentais.

---

# 4. Refinamento Incremental

```
Discussão

↓

Working Draft

↓

Refinamento

↓

Nova Versão

↓

Versão Oficial
```

---

# 5. Atualizações do Projeto

Sempre que existir:

- novo Marco Arquitetural;

ou

- conjunto significativo de refinamentos;

deverá ser gerado um único prompt consolidado para atualização do projeto.

Evitar múltiplos prompts pequenos.

---

# 6. Preservação do Conhecimento

> Regra Permanente nº 12

Sempre que surgir:

- novo conceito;
- nova metodologia;
- decisão adiada;
- alteração permanente do fluxo de trabalho;

essa informação deverá obrigatoriamente ser registrada através de:

- documento oficial;
- evolução planejada;
- ou Working Draft.

Nunca permanecer apenas na conversa.

> **Lição aprendida (GOV-006):** Durante a implementação da Core Foundation observou-se que sugestões não materializadas tinham alta probabilidade de serem esquecidas entre conversas. A partir deste marco, toda melhoria deve gerar imediatamente uma implementação, um prompt ou um registro metodológico (BK). Nenhuma recomendação arquitetural, metodológica ou operacional pode permanecer exclusivamente como texto na resposta da IA.

> **Lição aprendida (GOV-008):** Durante a sprint de consolidação documental, o OpenCode executou implementações em `C:\lio-feliz` — um clone residual — ao invés do diretório canônico `H:\Lio Feliz\`. A causa raiz foi a ausência de verificação explícita do working directory antes do início da execução. A partir deste marco, toda sessão deve verificar o working directory como passo zero antes de qualquer operação. Nenhuma implementação pode ocorrer em diretório não canônico.

> **Lição aprendida (GOV-009):** Após GOV-008, foi confirmado que dois clones válidos existiam simultaneamente. O clone residual `C:\lio-feliz` foi removido e um bundle de backup foi criado. A partir deste marco, o projeto possui exatamente um clone oficial. Qualquer referência futura a outro clone constitui erro operacional.

> **Lição aprendida (GOV-010):** A inicialização do ambiente também faz parte da engenharia. O workspace deve ser validado antes do bootstrap. Um Workspace Guard (tools/workspace-check.ps1) foi criado como passo zero obrigatório. Nenhuma sessão do OpenCode pode iniciar sem validação prévia do workspace oficial. A abertura manual do OpenCode em diretório arbitrário constitui violação de protocolo.

> **Lição aprendida (GOV-011):** O Workspace Guard foi endurecido para ser um guardião bloqueante. Além das verificações básicas, agora valida fingerprint, documentos obrigatórios, detecta clones duplicados e exibe banner de identidade. Nenhuma atividade de engenharia pode começar antes da validação completa. O PASSO 0 é inomitível.

---

# 7. Metodologia de Trabalho com IA

**IA-001 —** Sempre que uma melhoria surgir durante a criação de um prompt, ela deverá ser incorporada automaticamente ao próprio prompt. Nunca apresentada separadamente.

**IA-002 —** Antes de finalizar qualquer prompt para o OpenCode, a IA deverá realizar uma Auditoria de Conhecimento. Objetivo: garantir que nenhuma decisão importante permaneça apenas na conversa.

**IA-003 —** Sempre consolidar todas as decisões tomadas desde a última atualização do projeto em um único prompt, quando possível.

**IA-004 —** Quando uma decisão não puder ser implementada imediatamente, indicar automaticamente onde ela deverá ser registrada.

**IA-005 —** A IA deverá distinguir entre: conhecimento do domínio, metodologia, governança e documentação, registrando cada informação no local apropriado.

**IA-006 —** Sempre que identificar uma melhoria metodológica durante a elaboração de um prompt, a IA deverá incorporá-la ao prompt atual. Nunca deixar melhorias importantes para um prompt futuro.

**IA-007 —** Ao encerrar uma sessão importante de arquitetura, a IA deverá verificar se existe alguma decisão que faria falta caso a conversa fosse encerrada naquele momento. Se existir, essa decisão deverá ser incorporada imediatamente ao próximo prompt de atualização.

**IA-008 — Avaliação Automática de Atualização do Projeto**

Ao concluir qualquer bloco significativo de desenvolvimento arquitetural, a IA deverá realizar automaticamente uma avaliação da Sprint.

Essa avaliação deverá informar:

- quantidade de decisões consolidadas;
- quantidade de novos conceitos descobertos;
- novos marcos arquiteturais;
- necessidade (ou não) de atualização do projeto;
- justificativa da decisão;
- próximo marco esperado.

O usuário não deverá precisar perguntar se é o momento adequado para atualizar o projeto. Essa responsabilidade passa a ser da IA.

**IA-009 — Classificação Automática das Descobertas**

Sempre que surgir uma nova informação durante uma discussão arquitetural, a IA deverá classificá-la automaticamente como uma das categorias abaixo:

- Conceito do Domínio
- Business Rule
- Arquitetura
- Governança
- Metodologia
- Evolução Planejada

Essa classificação determinará automaticamente onde a informação deverá ser registrada futuramente.

**Objetivo:** Evitar perda de conhecimento e facilitar a organização da documentação.

**IA-010 — Consolidação Inteligente de Prompts**

Sempre que um prompt para o OpenCode estiver sendo elaborado, toda melhoria identificada durante sua construção deverá ser incorporada imediatamente ao próprio prompt.

A IA não deverá apresentar melhorias metodológicas importantes separadamente.

Caso exista dúvida sobre a conveniência da alteração, deverá consultar o usuário antes da geração do prompt.

**Objetivo:** Eliminar retrabalho e garantir que cada prompt represente o estado mais atualizado do projeto.

**IA-015 — Persistência Operacional**

Após concluir a Baseline da sessão, a IA deverá manter o Estado Operacional ativo durante toda a conversa.

Esse estado somente poderá ser alterado quando ocorrer uma das situações abaixo:

- novo Pacote de Sincronização;
- nova Baseline;
- mudança explícita de objetivo pelo usuário;
- nova evidência objetiva aprovada.

A Baseline não encerra após a primeira resposta. O Estado Operacional permanece ativo durante toda a sessão. O protocolo deverá ser revalidado sempre que ocorrer mudança significativa de contexto.

**IA-016 — Relatórios Operacionais**

Todo Relatório Consolidado Final deverá conter obrigatoriamente:

### Sugestões Técnicas

Cada sugestão deverá informar:

- descrição;
- justificativa;
- benefício esperado;
- impacto;
- necessidade ou não de DEC.

Caso não existam sugestões, registrar explicitamente:

"Nenhuma sugestão identificada."

### Oportunidades Futuras

Registrar melhorias observadas durante a implementação que:

- não pertencem ao escopo do PS atual;
- não justificam interrupção da execução;
- podem originar futuros INS ou PS.

Caso inexistentes, registrar explicitamente:

"Nenhuma oportunidade identificada."

**IA-025 — Continuidade Operacional**

A IA deverá assumir que o objetivo atual permanece válido até que exista:

- solicitação explícita do usuário;
- nova Baseline;
- evidência objetiva que justifique alteração.

**IA-026 — Autoverificação Operacional**

Antes de qualquer resposta relacionada ao projeto, a IA deverá executar internamente:

- Estou no modo correto?
- Existe DEC ativa?
- Existe evidência objetiva para alterar a direção?
- O plano atual permanece válido?
- Esta resposta constitui uma Entrega Relevante?
- Existe algum item registrado no Backlog Estratégico?

Caso não exista evidência objetiva, priorizar a execução do plano vigente.

Se a resposta constituir uma Entrega Relevante, o ritual de encerramento (OP-002) é obrigatório e não poderá ser omitido.

Se existir Backlog Estratégico ativo, verificar se deve ser exibido. Nunca omitir automaticamente.

**IA-027 — Tratamento de Evidências Externas**

Ferramentas auxiliares podem produzir evidências. Essas evidências jamais alteram automaticamente:

- arquitetura;
- metodologia;
- governança;
- documentação oficial.

Toda Evidência Externa deverá ser validada pelo ChatGPT. Somente após validação poderá resultar em:

- INS;
- DEC;
- novo PS;
- atualização documental.

Considera-se Evidência Externa qualquer informação produzida por ferramentas auxiliares durante:

- implementação;
- auditoria;
- validação;
- testes;
- análise documental.

Exemplos: OpenCode, ferramentas de análise estática, validações automatizadas, futuras ferramentas oficialmente adotadas.

**IA-028 — Agrupamento Inteligente de Execução**

Quando um Pacote de Sincronização for dividido em múltiplos prompts, o ChatGPT deverá informar explicitamente ao OpenCode:

- Prompt Único

OU

- Prompt X de N

Somente o último prompt deverá solicitar Relatório Consolidado Final. Todos os anteriores deverão informar explicitamente que o relatório não deve ser gerado.

**IA-029 — Baseline Operacional**

A documentação enviada no início de um chat constitui a Baseline Operacional.

`AI_CONTEXT.md`, `PROJECT_BOOTSTRAP.md` e `DOCUMENTACAO_COMPLETA.md` passam a ser a única fonte oficial de verdade da sessão.

A IA deverá abandonar estados inferidos anteriormente e utilizar exclusivamente essa baseline.

Somente inconsistências internas da documentação ou novas informações fornecidas durante a sessão poderão justificar alterações.

**IA-031 — Continuidade Arquitetural entre Chats**

Toda nova etapa oficial do projeto (PI, DEC, Documento Estrutural, Marco ou equivalente) deverá possuir um Resumo Operacional Canônico antes de ser registrada no `PROJECT_BOOTSTRAP.md`.

O Resumo Operacional Canônico deverá conter obrigatoriamente:

- Nome
- Objetivo
- Motivação
- Entregável esperado
- Estrutura mínima esperada
- Resultado esperado
- Critério de conclusão

O resumo deverá ser elaborado durante o planejamento arquitetural (ChatGPT) e apenas posteriormente incorporado pelo OpenCode.

O OpenCode não deverá criar resumos arquiteturais por iniciativa própria; sua responsabilidade é registrar fielmente o resumo aprovado.

**Objetivo:** Garantir que qualquer novo chat consiga compreender imediatamente a próxima etapa do projeto sem depender da memória do chat anterior ou de documentação externa.

**IA-030 — Gestão Contínua do Backlog Estratégico**

Toda melhoria aprovada e adiada recebe um identificador BK e é registrada no Strategic Backlog (`09_STRATEGIC_BACKLOG.md`).

Toda melhoria recém-identificada deve aparecer automaticamente em 📋 Pendências até seu registro oficial.

Antes de criar um novo PS, verificar se existe BK compatível no Strategic Backlog.

Quando um BK for implementado, atualizar automaticamente o Strategic Backlog.

BKs obsoletos não devem ser removidos; devem ser arquivados com justificativa.

**IA-033 — Materialização das Pl**

As decisões arquiteturais que originam uma Pl são elaboradas externamente (ChatGPT/Arquiteto do Projeto) durante o planejamento arquitetural.

O OpenCode não é autor das Pl. Sua responsabilidade é exclusivamente materializar uma Pl previamente aprovada, registrando-a como documento oficial no repositório.

A materialização não poderá alterar conteúdo arquitetural da Pl. Qualquer divergência arquitetural identificada durante a materialização deverá ser registrada como Oportunidade Futura e tratada em nova versão da Pl, nunca alterada durante a materialização.

**IA-034 — Regra de Dependência entre Pl**

Uma Pl somente poderá servir de base para outra Pl quando atender cumulativamente a:

- existir como documento oficial no repositório (arquivo físico);
- possuir versão identificada (ex.: v1.0);
- possuir status válido conforme metodologia (Draft, Review, Approved, Implementation, Completed, Validated).

Pl sem documento oficial, versão ou status não poderá ser referenciada como base para nova Pl.

**IA-035 — Limites de Responsabilidade da lA**

Uma IA somente poderá validar informações que estejam disponíveis em seu contexto.

O OpenCode pode:

- validar consistência documental;
- validar sincronização;
- validar implementação.

O OpenCode não pode:

- reconstruir decisões arquiteturais;
- descobrir decisões tomadas apenas em conversas;
- criar arquitetura por inferência.

**IA-036 — Classificação de Decisões Estratégicas**

Toda decisão estratégica do projeto deverá ser classificada em exatamente uma das categorias abaixo:

**Princípio Arquitetural** — Verdade fundamental da arquitetura. Registrada na Constituição Arquitetural (`00_CONSTITUTION.md`).

**Pl** — Especificação de engenharia. Registrada como documento PI no `architecture-lab/`.

**Strategic Backlog** — Melhoria futura aprovada. Registrada no `09_STRATEGIC_BACKLOG.md`.

**Documento Metodológico** — Regra de metodologia, governança ou operação. Registrada no documento metodológico correspondente.

Nenhuma decisão estratégica poderá permanecer exclusivamente na memória das conversas. Toda decisão deve ser registrada em sua Fonte Canônica antes do encerramento da etapa.

**IA-036 — Divisão de Responsabilidades ChatGPT/OpenCode**

A engenharia do Lio Feliz opera com dois papéis complementares:

| Papel                                              | Atribuições                                                                                                                                                                             |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ChatGPT** (Arquiteto/Planejador/Auditor/Revisor) | Define objetivos, critérios de aceite e diretrizes. Planeja Slices. Realiza Engineering Review. Audita governança. Preserva documentação permanente. Não implementa código diretamente. |
| **OpenCode** (Agente Executor)                     | Implementa código das Slices. Executa testes, build e lint. Realiza commit, push e relatórios de sincronização. Executa o Workspace Guard.                                              |

O ChatGPT não produz planos detalhados de implementação quando o OpenCode possui contexto suficiente para fazê-lo. Toda implementação obrigatoriamente passa por: Planejamento (ChatGPT) → Implementação (OpenCode) → Engineering Review (ChatGPT) → Auditoria (ChatGPT) → Engineering Closure (ChatGPT).

**IA-037 — Política de Reconstrução de Contexto Estratégico (GOV-013)**

O ChatGPT opera com dois níveis de contexto:

**Contexto Estratégico:** utilizado para planejamento de PI/ER/EWO, revisão arquitetural, auditorias, mudanças metodológicas, definição de estratégia, início de novo domínio. Deve ser reconstruído apenas quando necessário, preferencialmente via `DOCUMENTACAO_COMPLETA.md`.

**Contexto Operacional:** utilizado durante a implementação cotidiana das Slices. O ChatGPT trabalha exclusivamente com relatórios do OpenCode (sync reports, ERs, closures). Não deve solicitar documentação completa neste modo.

A documentação completa somente deve ser solicitada nas situações previstas: início de PI/ER/EWO, mudança significativa de arquitetura, mudança metodológica, início de novo domínio, ou perda de contexto que comprometa decisões estratégicas.

Fora dessas situações, utilizar exclusivamente os relatórios de engenharia.

**IA-038 — Política de Incorporação Contínua de Melhorias (GOV-015)**

Nenhuma oportunidade identificada durante atividades de engenharia poderá permanecer sem destino.

**Destinos obrigatórios:** implementação imediata, incorporação automática na próxima Slice compatível, Backlog (BK), Dívida Técnica (TD), Decisão Rejeitada, Descarte explícito.

**Fluxo:**

1. Pode ser implementada na Slice atual sem alterar arquitetura/PI/EWO? → Incorporar imediatamente.
2. Existe Slice futura que modificará naturalmente o mesmo componente? → Incorporar automaticamente no prompt daquela Slice.
3. Não se enquadra? → Criar BK.
4. Sem valor? → Descartar explicitamente.

**Registro de Conhecimento na Engineering Review:** toda ER deve listar oportunidades identificadas, destino de cada uma, melhorias incorporadas imediatamente, melhorias programadas, BKs, TDs e decisões descartadas.

**ChatGPT:** identifica, classifica, decide destino, incorpora em prompts.
**OpenCode:** executa melhorias incorporadas, registra no relatório, não remove sem justificativa.

**IA-039 — Padronização do Encerramento das Respostas Estratégicas (GOV-016)**

O ❤️ **Saúde do Chat** está oficialmente removido da metodologia. Nenhum documento operacional pode referenciá-lo.

Respostas estratégicas do ChatGPT (planejamento, engenharia, ER, auditoria, estratégia, governança, análise arquitetural) devem encerrar com o formato GOV-016: Estado da Engenharia, Resultado da Auditoria, Conhecimento Capturado, Pendências Oficiais, Painel Executivo.

Utilizar apenas informações objetivas e verificáveis. Não repetir informações já apresentadas. Facilitar retomada em novos chats.

**IA-040 — Governança Evolutiva da Metodologia (GOV-017)**

A metodologia evolui apenas quando há evidências objetivas de necessidade. Origens válidas: Engineering Review, auditoria, retrospectiva, problemas recorrentes, mudança de responsabilidades, decisão arquitetural. Origens inválidas: "Pode ser interessante", "Talvez seja útil", "Achei uma boa ideia".

Fluxo: Problema observado → Evidências → Análise → Proposta → GOV → Documentação → Sincronização.

**Princípio da Metodologia Mínima:** a metodologia deve ser a menor possível. Nova regra só existe quando elimina problema recorrente ou reduz risco.

**Engineering Review:** verificar se existe melhoria metodológica. Se sim, registrar descrição, origem, impacto e destino. Se não, registrar "Nenhuma melhoria metodológica identificada."

**ChatGPT:** identificar problemas recorrentes, avaliar necessidade real, propor GOV apenas com evidências, evitar crescimento desnecessário, identificar consolidação futura.

**OpenCode:** implementar alterações documentais, sincronizar, registrar versões, executar GOV-011. Não criar políticas por iniciativa própria.

| Papel                                              | Atribuições                                                                                                                                                                             |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ChatGPT** (Arquiteto/Planejador/Auditor/Revisor) | Define objetivos, critérios de aceite e diretrizes. Planeja Slices. Realiza Engineering Review. Audita governança. Preserva documentação permanente. Não implementa código diretamente. |
| **OpenCode** (Agente Executor)                     | Implementa código das Slices. Executa testes, build e lint. Realiza commit, push e relatórios de sincronização. Executa o Workspace Guard.                                              |

O ChatGPT não produz planos detalhados de implementação quando o OpenCode possui contexto suficiente para fazê-lo. Toda implementação obrigatoriamente passa por: Planejamento (ChatGPT) → Implementação (OpenCode) → Engineering Review (ChatGPT) → Auditoria (ChatGPT) → Engineering Closure (ChatGPT).

**IA-041 — Execução Automática das Próximas Etapas (GOV-018)**

O fluxo entre ChatGPT e OpenCode segue automaticamente o pipeline abaixo, sem necessidade de confirmações intermediárias.

```
ChatGPT
Planejamento

↓

OpenCode
Implementação

↓

OpenCode
Relatório de Implementação

↓

ChatGPT
Engineering Review

↓

OpenCode
Engineering Closure

↓

OpenCode
Relatório de Closure

↓

ChatGPT
Planejamento da próxima Slice

↓

OpenCode
Implementação
```

Cada etapa entrega obrigatoriamente o artefato esperado para a etapa seguinte.

**Interrupções permitidas:** bloqueador técnico, dúvida arquitetural, ausência de documentação, violação da PI, violação da EWO, falha na Core Foundation, conflito metodológico. Fora dessas situações, o pipeline continua automaticamente.

**ChatGPT:** ao finalizar ER, emitir parecer + conhecimento capturado + melhorias + planejamento da próxima etapa. Não perguntar "Deseja prosseguir?".

**OpenCode:** ao concluir implementação, executar testes + build + relatório. Não perguntar "Deseja Engineering Review?". Após ER aprovada, executar Closure + Git + relatório. Não perguntar "Deseja prosseguir?".

---

# 8. Protocolos de Governança

**PG-019 — Estabilidade das Decisões**

Durante o Modo Execução toda DEC aprovada deverá ser considerada válida.

A reavaliação somente será permitida quando existir evidência objetiva.

Consideram-se evidências objetivas:

- inconsistências identificadas;
- conflitos documentais;
- resultados da implementação;
- auditorias;
- problemas de arquitetura;
- solicitações explícitas do usuário.

Na ausência de evidência objetiva a IA deverá continuar executando o plano vigente.

### Reavaliação Construtiva

Permitida quando baseada em evidências objetivas.

### Reavaliação Improdutiva

Não permitida durante o Modo Execução.

### Fluxo Oficial de Evidências Externas

```
ChatGPT

↓

Define PS

↓

Ferramenta Auxiliar

↓

Executa

↓

Produz Relatório Consolidado Final

↓

Produz Sugestões Técnicas

↓

Produz Oportunidades Futuras

↓

Usuário

↓

Apresenta Relatório

↓

ChatGPT

↓

Valida Evidências

↓

Caso necessário:

  - gera INS;
  - cria DEC;
  - propõe novo PS.
```

---

# 9. Protocolos Operacionais

### OP-002 — Encerramento por Entrega Relevante

Os rituais de encerramento deixam de depender apenas do término de um PS. Passam a depender do conceito de Entrega Relevante.

Considera-se Entrega Relevante toda resposta que:

- cria documentação;
- produz auditorias;
- define arquitetura;
- aprova decisões;
- cria Pacotes de Sincronização;
- gera prompts para implementação;
- consolida conhecimento do projeto.

Toda Entrega Relevante deverá obrigatoriamente encerrar utilizando o formato oficial definido abaixo, sem omissão ou reinterpretação pela IA.

### GOV-016 — Ritual de Encerramento Estratégico (substitui OP-002 e OP-003)

O ❤️ **Saúde do Chat** está oficialmente removido da metodologia. Nenhum documento operacional poderá referenciá-lo.

Toda resposta estratégica do ChatGPT (planejamento, engenharia, ER, auditoria, estratégia, governança, análise arquitetural) deverá encerrar com:

```
📊 Estado da Engenharia
📐 Resultado da Auditoria
💡 Conhecimento Capturado
📋 Pendências Oficiais
📈 Painel Executivo
```

Utilizar apenas informações objetivas e verificáveis. Não repetir informações já apresentadas durante a resposta.

### OP-007 — Classificação das Sugestões

Toda sugestão deverá ser classificada em uma única categoria.

Categorias oficiais:

- Correção
- Otimização
- Simplificação
- Refatoração
- Documentação
- Governança
- Arquitetura

### OP-008 — Fluxo de Múltiplos Prompts

Quando um Pacote de Sincronização for executado em múltiplos prompts:

- Cada prompt deverá ser identificado como "Prompt X de N";
- Somente o último prompt solicitará Relatório Consolidado Final;
- Os anteriores deverão declarar explicitamente: "Não gerar Relatório Consolidado Final nesta etapa."

### OP-009 — Estrutura Padrão de Prompts

Todo prompt enviado ao OpenCode deverá seguir obrigatoriamente a estrutura abaixo:

1. **Objetivo** — O que deve ser feito.
2. **Implementação** — O que implementar e em quais arquivos.
3. **Atualizações Obrigatórias** — Quais documentos devem ser alterados.
4. **DOCUMENTACAO_COMPLETA** — Instrução sobre regeneração ou não.
5. **Relatório Consolidado Final** — Quando aplicável.
6. **Sugestões Técnicas** — Conforme IA-016.
7. **Oportunidades Futuras** — Conforme IA-016.
8. **Registro em SYNC_HISTORY** — Instrução sobre registro ou não.

### OP-010 — Checklist Vinculado aos Protocolos

Todo novo protocolo operacional criado deverá obrigatoriamente atualizar o `AI_OPERATION_CHECKLIST.md`. Caso contrário, o protocolo será considerado incompleto.

### OP-011 — Template Vinculado aos Protocolos

O `PS_TEMPLATE.md` deverá sempre refletir os protocolos IA, PG, OP e PGR vigentes. Sempre que houver alteração operacional relevante, o template deverá ser revisado.

### OP-012 — Classificação Oficial das Pendências

A metodologia reconhece oficialmente três categorias independentes de pendências.

### 1 — Pendências da Sprint

Representam exclusivamente atividades da sprint ativa. Podem ser removidas automaticamente quando concluídas.

### 2 — Backlog Estratégico

Representa melhorias aprovadas que ainda não foram implementadas.

Características:

- nunca poderá desaparecer automaticamente;
- somente poderá ser removido quando implementado ou descartado formalmente por nova DEC, INS ou auditoria.

Sempre que existir backlog estratégico ativo, ele deverá ser apresentado após as Pendências da Sprint.

Toda oportunidade futura aprovada durante auditorias deverá ser registrada oficialmente no Backlog Estratégico. Não poderá permanecer apenas no histórico do chat.

### 3 — Fila de Execução

Representa apenas a sequência planejada do projeto. Não substitui Pendências nem Backlog Estratégico.

### 4 — Melhorias Metodológicas

Melhorias na metodologia do projeto identificadas durante a sprint. Devem ser registradas separadamente das Pendências da Sprint e do Backlog Estratégico.

A Auditoria da Sprint deve distinguir obrigatoriamente entre as quatro categorias acima.

Não é permitido utilizar "Nenhum item identificado" ou equivalente quando existir backlog estratégico previamente registrado no Strategic Backlog. A existência do backlog deve ser reconhecida mesmo quando nenhum item novo foi adicionado. A auditoria deve informar "backlog atualizado" ou "backlog inalterado".

### Ciclo de Vida dos BK

Todo BK deverá seguir o ciclo de vida abaixo:

```
Proposto
    ↓
Validado
    ↓
Registrado
    ↓
Planejado
    ↓
Em Implementação
    ↓
Concluído
    ↓
Arquivado
```

### Princípio da Fonte Canônica

Cada informação relevante do projeto deve possuir uma única fonte canônica. Os demais documentos devem apenas resumir ou referenciar essa informação.

Não é permitido manter cópias independentes de conteúdos que possam divergir ao longo do tempo.

### Ordem Oficial de Precedência Documental

Em caso de divergência entre documentos, a precedência é definida pela ordem abaixo:

```
1. DOCUMENTACAO_COMPLETA.md     Fonte Canônica
2. PROJECT_BOOTSTRAP.md         Memória Executiva
3. AI_CONTEXT.md                Estado Operacional
```

Sempre prevalece o documento de maior precedência.

### OP-013 — Idioma Oficial da Documentação

O português brasileiro é o idioma oficial de toda a documentação do projeto.

O inglês é permitido **exclusivamente** para:

- nomes próprios (ex.: Rafael Santos, Lio Feliz);
- componentes oficiais (ex.: Interpretation Layer, Canonical Investment Model, Engine Core);
- terminologia arquitetural consolidada (ex.: Draft, Approved, Review, Engineering Work Order, Invariant, Contract, Ontology, Pipeline);
- siglas e acrônimos consagrados (ex.: PI, EWO, ER, ADR, BK, IA, OP).

Nenhum documento metodológico, especificação de engenharia, relatório ou comunicado interno deverá utilizar inglês fora dessas exceções.

### OP-014 — Fluxo de Elaboração de PIs

A criação de uma nova PI segue obrigatoriamente as etapas abaixo:

```
Concepção Arquitetural
       ↓
Engineering Review Conceitual
       ↓
Redação da PI
       ↓
Engineering Review Documental
       ↓
      Approved
```

**Concepção Arquitetural:** O Arquiteto (ChatGPT) identifica a necessidade, define o escopo, os objetivos, as entidades envolvidas e os contratos preliminares. O resultado é registrado no Engineering Outlook.

**Engineering Review Conceitual:** O Arquiteto valida a consistência da concepção antes da redação. Verifica alinhamento com PIs existentes, Constitution e Strategic Backlog. Sem aprovação conceitual, a PI não deve ser redigida.

**Redação da PI:** O Arquiteto redige a especificação completa. O OpenCode materializa o documento. Durante esta fase, a PI encontra-se em **Draft**.

**Engineering Review Documental:** Revisão completa da especificação materializada, conforme critérios de consistência interna, externa, semântica e metodológica.

**Approved:** A PI atinge o status Approved, tornando-se imutável e fonte canônica de engenharia.

---

### OP-015 — Política de Consolidação Documental

A quantidade de documentos oficiais é considerada um requisito arquitetural do projeto.

Quanto maior o número de documentos, maior o custo operacional de bootstrap entre sessões de IA. Portanto, a metodologia estabelece os seguintes princípios:

- **Evitar criação de novos documentos** quando o conteúdo puder ser incorporado de forma coerente a documentos canônicos existentes.
- **Priorizar documentos centrais ricos em contexto** (ex.: PROJECT_BOOTSTRAP) como destino de consolidação.
- **Reduzir o custo operacional de bootstrap** entre IAs mantendo o número de documentos oficialmente necessários o menor possível.
- **Considerar o custo operacional da documentação como um requisito arquitetural** — toda criação de novo documento deverá possuir justificativa metodológica clara.
- **Incorporar ao invés de referenciar** quando o conteúdo for pequeno o suficiente para não comprometer a coesão do documento canônico.

Propostas de novos documentos devem ser avaliadas contra estes princípios antes de serem aprovadas.

---

## GOV-M01 — Fluxo Operacional Oficial

Ver `PROJECT_BOOTSTRAP.md` — seção "Divisão de Responsabilidades ChatGPT / OpenCode (GOV-M01)".

Fluxo oficial: **OpenCode → Relatório → Auditoria ChatGPT → Novo Prompt**.

OpenCode é responsável por: elaboração de PI, ER, EWO, implementação, execução de testes, sincronização Git, emissão do relatório operacional.

ChatGPT é responsável por: auditoria técnica, validação arquitetural, validação metodológica, aprovação para a próxima etapa.

---

## GOV-M02 — Sincronização Git Obrigatória

Nenhuma atividade poderá ser considerada concluída sem:

- git add
- git commit
- git push

O relatório final deve conter obrigatoriamente: branch, HEAD, hash do commit, confirmação explícita do push, confirmação de sincronização com origin, Working Tree limpa.

Caso qualquer um desses itens não seja atendido, o relatório deve marcar a atividade como "Encerramento Operacional Pendente".

Ver checklist completo em `AI_OPERATION_CHECKLIST.md` (seção GOV-M02).

---

## GOV-M03 — Melhoria Contínua em Auditorias

Toda melhoria identificada durante auditorias deverá ser:

- avaliada;
- implementada quando compatível;
- registrada oficialmente.

Caso não possa ser implementada: registrar justificativa, registrar motivo técnico, manter como pendência ativa.

Ver detalhes em `PROJECT_BOOTSTRAP.md` (seção GOV-M03 / GOV-015).

---

## GOV-M04 — Template de Pendências Metodológicas

Todo relatório do OpenCode deve conter a seção "Pendências Metodológicas" informando para cada pendência do prompt:

- status (Implementada / Adiada / Rejeitada);
- documentos alterados;
- justificativa (se não implementada).

Nenhuma pendência pode desaparecer sem registro.

---

## GOV-M05 — Política para Pendências Metodológicas

Pendências metodológicas nunca poderão ser classificadas como "opcionais".

Toda pendência receberá exatamente um destes estados:

- **Implementada** — resolvida e sincronizada;
- **Adiada** — com justificativa técnica e pendência mantida como ativa;
- **Rejeitada** — com fundamentação técnica explícita.

Nenhuma pendência pode ser omitida ou ignorada.

---

# 10. Fluxo de Engenharia (PI → EWO → ER)

### 10.1 Engineering Specification (PI)

Toda PI aprovada é um **Contrato Oficial de Implementação**.

Após **Approved**, a PI torna-se a única Fonte Canônica de Engenharia daquela funcionalidade. Toda implementação deve segui-la integralmente. Nenhum prompt pode substituir, resumir ou reinterpretar decisões arquiteturais da PI.

O fluxo de elaboração que antecede o estado Draft é definido pelo protocolo **OP-014 (Fluxo de Elaboração de PIs)**, compreendendo as etapas de Concepção Arquitetural, Engineering Review Conceitual, Redação da PI e Engineering Review Documental antes de atingir Approved.

#### Versionamento Oficial

Toda PI deve possuir:

- **Identificador** (ex.: PI-001)
- **Versão** (ex.: v1.0)
- **Status** (conforme ciclo de vida)
- **Data da versão**
- **Histórico resumido** de alterações

A versão integra oficialmente a identidade da PI. Exemplo: `PI-001 v1.0`.

#### Ciclo de Vida

```
Draft
  ↓
Review
  ↓
Approved
  ↓
Implementation
  ↓
Completed
  ↓
Validated
```

#### Regras de Transição

- **Draft → Review:** PI completa, elegível para revisão.
- **Review → Approved:** Aprovada após revisão técnica. A partir deste estado, implementações podem iniciar.
- **Approved → Implementation:** EWO criada referenciando a PI.
- **Implementation → Completed:** Implementação finalizada conforme a PI.
- **Completed → Validated:** Engineering Review aprovada.

#### Imutabilidade após Approved

Ao atingir **Approved**, a PI torna-se imutável.

Nenhuma alteração arquitetural pode ser realizada nessa versão. Caso necessária, criar nova versão da PI. A versão anterior aprovada permanece preservada para auditoria e rastreabilidade.

Implementações somente podem iniciar quando a PI estiver em **Approved**.

---

### 10.2 Engineering Work Order (EWO)

A EWO é a ordem operacional enviada ao OpenCode.

Ela referencia obrigatoriamente uma ou mais PI aprovadas.

**A EWO não pode criar arquitetura.** Ela apenas executa especificações previamente aprovadas.

#### Template Oficial da EWO

```
# EWO-XXX

**Base de Engenharia:** PI-XXX vX.X
**Objetivo:** [o que deve ser feito]
**Escopo:** [limites da implementação]
**Restrições:** [o que não pode ser feito]
**Arquivos previstos:** [lista de arquivos]
**Critérios de aceite:** [condições para aprovação]
**Relatório obrigatório:** [sim/não]
**Observações:** [informações adicionais]
```

---

### 10.3 Engineering Review (ER)

A ER é a revisão técnica realizada após a implementação.

**A ER não altera arquitetura.** Ela apenas valida aderência à PI.

#### Template Oficial da ER

```
# ER-XXX

**PI Referenciada:** PI-XXX vX.X
**EWO Referenciada:** EWO-XXX

**Conformidade com a PI:** [atende/não atende]
**Respeito aos contratos arquiteturais:** [sim/não]
**Avaliação de regressão:** [baixa/média/alta]
**Complexidade:** [baixa/média/alta]
**Observações técnicas:** [descrição]
**Melhorias sugeridas:** [lista]
**Aprovação final:** [aprovada/reprovada]
```

---

### 10.4 Fluxo Oficial de Engenharia

O fluxo oficial completo do projeto encontra-se documentado no **PROJECT_BOOTSTRAP.md** (seção "Fluxo Oficial da Engenharia", GOV-007). O diagrama abaixo é um resumo metodológico — o fluxo completo com precedência e dependências documentais está no Bootstrap.

```
Necessidade
  ↓
Arquitetura
  ↓
PI
  ↓
Review
  ↓
Approved
  ↓
EWO
  ↓
Implementação
  ↓
Auditoria da Sprint
  ↓
Engineering Review
  ↓
Validação
  ↓
Baseline
```

**GOV-007** adicionou ao fluxo oficial: Mapa de Dependências Documentais (quem gera quem), Papel de Cada Documento (responsabilidade individual) e Regra de Precedência Documental (hierarquia de autoridade). Consulte o Bootstrap para detalhes completos.

---

### 10.5 Fontes Canônicas

- **PROJECT_BOOTSTRAP.md:** Fonte Canônica da metodologia operacional.
- **PI (estado Approved):** Fonte Canônica da engenharia daquela funcionalidade. A versão específica é parte integrante da Fonte Canônica.
- **EWO:** Sem autoridade arquitetural. Apenas referência PI aprovadas.
- **ER:** Não altera arquitetura. Apenas valida aderência.

---

### 10.6 Rastreabilidade Histórica

Cada implementação deve ser vinculada de forma inequívoca à versão da PI que serviu como sua Fonte Canônica. A EWO deve referenciar explicitamente `PI-XXX vX.X`. Não é permitido referenciar apenas o identificador da PI.

Isso garante que auditorias futuras consigam identificar exatamente qual especificação originou determinada implementação.

### 10.7 Regras Operacionais

Antes de gerar qualquer EWO, a IA deverá verificar obrigatoriamente:

- existência da PI referenciada com versão específica (`PI-XXX vX.X`);
- status **Approved** da PI;
- versão vigente da PI;
- ausência de PI mais recente que substitua a referenciada.

Qualquer condição não atendida → interromper a implementação.

---

### 10.7 Compatibilidade com Protocolos Existentes

| Protocolo | Compatibilidade                                         |
| --------- | ------------------------------------------------------- |
| OP-002    | ER substitui auditoria de engenharia; ritual mantido    |
| OP-010    | Novo protocolo deve atualizar AI_OPERATION_CHECKLIST.md |
| OP-012    | EWO não substitui BK; são complementares                |
| IA-026    | EWO dispara Autoverificação antes da geração            |
| IA-032    | Gatilho de Prompt inclui verificação de PI na EWO       |

Nenhuma duplicação de regras existentes. Referências cruzadas utilizadas quando apropriado.

### 10.8 Papeis das Ferramentas

O fluxo de engenharia do Lio Feliz reconhece dois papeis complementares:

#### ChatGPT (Arquiteto do Projeto)

Responsável por:

- Arquitetura
- Engenharia de requisitos
- Pls (criação e aprovação)
- Decisões estruturais
- Evolução metodológica
- Planejamento

#### OpenCode (Engenheiro de Implementação)

Responsável por:

- Materialização documental
- Implementação de código
- Sincronização
- Refatoração
- Auditoria técnica
- Validação de consistência do repositório

> **Observação:** Esses papéis representam responsabilidades dentro do fluxo de trabalho deste projeto, e não capacidades gerais das ferramentas. A documentação descreve o processo específico adotado pelo Lio Feliz, sem fazer afirmações universais sobre o que cada ferramenta pode ou não fazer em outros contextos.

### 10.9 Integração com o Strategic Backlog

O arquivo `architecture-lab/09_STRATEGIC_BACKLOG.md` é a Fonte Canônica para backlog estratégico do projeto.

A Auditoria da Sprint deverá informar apenas:

- backlog atualizado;
- ou backlog inalterado.

Nunca deverá sugerir inexistência de backlog quando ele existir no Strategic Backlog.

---

# 11. Painel Operacional e Indicadores

### Layout Oficial do Painel

O Painel Operacional deverá seguir obrigatoriamente o layout abaixo:

```
📋 Painel Operacional

Projeto:
Modo:
PS Atual:
Marco:

🏛 Governança
[barra de progresso]

🏗 Arquitetura
[barra de progresso]

⚙ Engineering
[barra de progresso]

💻 Código
[barra de progresso]
```

### Política de Exibição

O Painel Operacional deverá ser exibido automaticamente apenas quando ocorrer pelo menos um dos eventos abaixo:

- início de novo chat (Baseline Operacional);
- alteração do PS ativo;
- alteração do Marco;
- alteração dos percentuais;
- solicitação explícita do usuário.

Caso contrário, não deverá ser exibido.

### Separação Visual

O Painel Operacional não deverá conter:

- Saúde do Chat;
- Auditoria;
- Pendências;
- Fila.

Esses elementos pertencem exclusivamente ao encerramento das Entregas Relevantes (OP-002).

### Critérios dos Percentuais

Todos os percentuais do Dashboard deverão possuir critérios objetivos e documentados. Cada domínio deverá possuir:

- total previsto;
- total concluído;
- fórmula de cálculo.

Não será permitido utilizar estimativas subjetivas.

### Atualização dos Indicadores

Os percentuais somente poderão ser alterados quando ocorrer:

- conclusão documental;
- conclusão de PI;
- conclusão de Milestone;
- conclusão de Release;
- outro evento oficialmente definido.

Não poderão ser alterados manualmente sem justificativa documental.

### Documentação das Fórmulas

A fórmula utilizada para cálculo de cada percentual do Dashboard deverá ser registrada oficialmente em `PROJECT_PROGRESS_PANEL.md`, garantindo reprodutibilidade entre diferentes sessões da IA.

---

# 12. Auditoria de Sprint

Este fluxo deverá ser executado sempre antes de qualquer sincronização com o OpenCode.

```
Descoberta

↓

Classificação

↓

Auditoria de Conhecimento

↓

Consolidação

↓

Prompt Único

↓

Atualização do Projeto
```

**Descoberta:** Todo novo conceito ou decisão é identificado durante a discussão arquitetural.

**Classificação:** A IA classifica automaticamente a descoberta (IA-009).

**Auditoria de Conhecimento:** Verifica se alguma decisão importante permanece apenas na conversa (IA-002).

**Consolidação:** Todas as descobertas são reunidas em um único prompt.

**Prompt Único:** Um prompt consolidado é gerado para o OpenCode (IA-003).

**Atualização do Projeto:** O prompt é executado, e o projeto é atualizado.

### Categorias da Auditoria

A Auditoria da Sprint deve observar as categorias oficiais definidas no OP-012 (Classificação Oficial das Pendências), distinguindo obrigatoriamente entre Pendências da Sprint, Backlog Estratégico, Fila de Execução e Melhorias Metodológicas.

---

# 13. Engineering Audit (Prática Recomendada)

Após a conclusão de marcos importantes da engenharia (PIs relevantes, ERs relevantes, grandes EWOs ou conjuntos significativos de implementação), **poderá** ser executada uma Engineering Audit.

A Engineering Audit possui as seguintes características:

- **Natureza exclusivamente analítica** — não altera código, não altera arquitetura, não altera documentação diretamente
- **Produz apenas um relatório técnico** — serve para identificar inconsistências, redundâncias, riscos e oportunidades de melhoria antes da próxima fase da engenharia
- **É recomendada, porém opcional** — sua execução depende da complexidade da etapa concluída
- **Não constitui um novo tipo obrigatório de documento** do projeto

A Engineering Audit complementa (não substitui) a Engineering Review. Enquanto a ER valida aderência à PI, a Audit olha para o estado geral da engenharia (documentação, governança, arquitetura, metodologia) visando preparar o terreno para a próxima fase.

---

# 14. Histórico

### Versão 2.22

GOV-018 — Pipeline Contínuo de Engenharia. IA-041 adicionada em §7. Fluxo automático sem confirmações intermediárias. Interrupções permitidas documentadas.

### Versão 2.21

GOV-017 — Governança Evolutiva da Metodologia. IA-040 adicionada em §7. Princípio da Metodologia Mínima, origens válidas/inválidas, verificação de melhoria metodológica em ERs.

### Versão 2.20

GOV-016 — Padronização do Encerramento das Respostas Estratégicas. ❤️ Saúde do Chat removido. IA-039 adicionada em §7. Ritual GOV-016 substitui OP-002/OP-003.

### Versão 2.19

GOV-015 — Política de Incorporação Contínua de Melhorias. IA-038 adicionada em §7 definindo 6 destinos obrigatórios, fluxo de 4 etapas, Registro de Conhecimento na Engineering Review e novas responsabilidades ChatGPT/OpenCode.

### Versão 2.18

GOV-013 — Política de Reconstrução de Contexto Estratégico. IA-037 adicionada em §7 definindo dois níveis de contexto (Estratégico e Operacional) e situações que justificam solicitar documentação completa.

### Versão 2.17

GOV-012 — Divisão de Responsabilidades ChatGPT/OpenCode. IA-036 adicionada em §7 definindo papéis: ChatGPT como Arquiteto/Planejador/Auditor/Revisor; OpenCode como Agente Executor. Fluxo obrigatório: Planejamento → Implementação → Engineering Review → Auditoria → Engineering Closure.

### Versão 2.16

Sprint Documental GOV-010 — Consolidação final da governança pós-Engineering Audit 001.

- Seção "Engineering Audit" adicionada como prática recomendada (§13).
- Seção "Evoluções Planejadas" (§13 anterior) removida — itens obsoletos (DOMAIN_CONCEPTS.md, EVOLUTION_ROADMAP.md não fazem mais sentido no roadmap atual).
- AI_CONTEXT.md objetivo atualizado para EWO-002.
- PROJECT_BOOTSTRAP: removidos resumos históricos PI-001/002/003; Technical Roadmap movido para Strategic Backlog; Precedência corrigida (Bootstrap #1); ER-004 marcada ✅; Engineering Outlook atualizada (próxima: EWO-002).
- DOCUMENTATION_INDEX v1.37: removidos 9 documentos inexistentes (07_PROJECT_CONTEXT, 08_FEATURES, 09_ROADMAP, 10_CHANGELOG, 11_AI_INSTRUCTIONS, 13_DECISIONS, 14_DESIGN_PRINCIPLES, 15_PRODUCT_PHILOSOPHY, 09_STRATEGIC_BACKLOG caminho errado).
- 09_STRATEGIC_BACKLOG v0.14: BK-010/011/012 marcados Concluídos (implementados via consolidação em PIs, Bootstrap, Glossary).
- ER-C001-C002-001.md criada (stub do relatório de auditoria da Core Foundation).
- Engenharia oficialmente apta para iniciar EWO-002.

### Versão 2.15

OP-015 (Política de Consolidação Documental) adicionado. Custo operacional da documentação reconhecido como requisito arquitetural. Princípios de minimização documental formalizados.

### Versão 2.15

GOV-011 implementado. Lição aprendida: Workspace Guard endurecido como guardião bloqueante. Fingerprint, documentos obrigatórios e detecção de clone duplicado. Compatibilidade com PROJECT_BOOTSTRAP.md v2.30 e AI_OPERATION_CHECKLIST.md v1.30.

### Versão 2.14

GOV-010 implementado. Lição aprendida: a inicialização do ambiente também faz parte da engenharia. Workspace Guard criado como passo zero obrigatório. Compatibilidade com PROJECT_BOOTSTRAP.md v2.29 e AI_OPERATION_CHECKLIST.md v1.29.

### Versão 2.13

GOV-009 implementado. Lição aprendida registrada: clone residual removido, workspace único oficializado. Nenhum clone alternativo é permitido. Compatibilidade com PROJECT_BOOTSTRAP.md v2.28 e AI_OPERATION_CHECKLIST.md v1.28.

### Versão 2.12

GOV-008 implementado. Lição aprendida registrada: verificação de working directory como passo zero obrigatório. Nenhuma implementação em diretório não canônico. Compatibilidade com PROJECT_BOOTSTRAP.md v2.27 e AI_OPERATION_CHECKLIST.md v1.27.

### Versão 2.11

GOV-007 implementado. Fluxo Oficial da Engenharia e Mapa de Dependências Documentais consolidados no PROJECT_BOOTSTRAP. Seção §10 atualizada com referência ao fluxo oficial. Bootstrap v2.26. PROJECT_STATUS v1.34.

### Versão 2.10

GOV-006 atualizado. Duas novas regras metodológicas: (1) Materialização Obrigatória de Melhorias — nenhuma recomendação pode permanecer apenas na resposta; deve ser implementada, convertida em prompt ou registrada como BK. (2) Objetividade Operacional — priorizar progresso concreto, evitar respostas reflexivas sem artefato executável. Lição aprendida registrada: sugestões não materializadas têm alta probabilidade de serem esquecidas entre conversas. Bootstrap v2.25. AI_OPERATION_CHECKLIST v1.26. PROJECT_STATUS v1.33.

### Versão 2.9

GOV-006 (Consolidação da Core Foundation) implementado. C-001 + C-002 concluídos (10 Slices, 175 testes). ER-C001-C002-001 aprovada — classificação Excelente, sem divergências. Core API Frozen: 7 componentes base congelados. Alterações comportamentais passam a exigir ER + PI + EWO. Correções de bug continuam permitidas. Technical Roadmap criado com 4 itens de melhoria futura. Projeto entra em fase de evolução do domínio de investimentos. Bootstrap v2.24. AI_OPERATION_CHECKLIST v1.25. PROJECT_STATUS v1.32.

### Versão 2.7

GOV-005 (Consolidação das Lições Aprendidas da Core Foundation) implementado. C-001 concluída: 5 Slices independentes, 83 testes, zero regressões — evidência de que a estratégia de slices da EWO-001 mostrou-se adequada. Registro do fluxo de conhecimento: Implementação → Validação → Registro documental → Encerramento. Pendência metodológica registrada (BK-008: substituição futura do mecanismo finalize()). Convenções da Core Foundation registradas. Bootstrap v2.23. AI_OPERATION_CHECKLIST v1.19. PROJECT_STATUS v1.31.

### Versão 2.6

GOV-003 (Regras de Governança Pós-Auditoria) implementado. Incorporado ao PROJECT_BOOTSTRAP.md v2.21 e AI_OPERATION_CHECKLIST.md v1.17. Regras: sincronização obrigatória, estado oficial do projeto, fluxo obrigatório de implementação, bloco de sincronização em relatórios, auditoria pós-rebase.

### Versão 2.5

GOV-001 (Idioma Oficial) implementado como OP-013. GOV-002 (Fluxo de Elaboração) implementado como OP-014 com referência em §10.1. OP-003 atualizado com formato padronizado de Decisões Arquiteturais Capturadas.

### Versão 2.4

Seção obrigatória "Decisões Arquiteturais Capturadas" adicionada ao OP-003 (Formato Visual Padronizado). Ritual de encerramento atualizado.

### Versão 2.3

IA-036 (Classificação de Decisões Estratégicas) adicionado. Categorias oficiais: Princípio Arquitetural, PI, Strategic Backlog, Documento Metodológico. Nenhuma decisão pode permanecer exclusivamente na memória das conversas.

### Versão 2.2

Papéis das Ferramentas formalizados (ChatGPT como Arquiteto do Projeto, OpenCode como Engenheiro de Implementação). IA-033 (Materialização das PI), IA-034 (Regra de Dependência entre PI), IA-035 (Limites de Responsabilidade da IA) adicionados em §7. OP-012 atualizado com 4ª categoria (Melhorias Metodológicas) e regra de reconhecimento obrigatório do backlog. §10.8 (Papéis das Ferramentas) e §10.9 (Integração com Strategic Backlog) adicionados. §12 atualizado com referência ao OP-012.

### Versão 2.1

Versionamento e Imutabilidade das PI. PI passa a exigir identificador + versão. Imutabilidade após Approved. EWO e ER passam a referenciar versão específica da PI. Rastreabilidade Histórica formalizada.

### Versão 2.0

Fluxo de Engenharia formalizado (PI → EWO → ER). §10 criado com: Ciclo de Vida de PI (6 estados), Template EWO, Template ER, Fluxo Oficial, Fontes Canônicas, Regras Operacionais. Seções §11-§14 renumeradas. Compatibilidade com protocolos existentes garantida.

### Versão 1.11

OP-002 estabelecido como Fonte Canônica exclusiva da ❤️ Saúde do Chat. Cópia parcial removida do DEVELOPMENT_METHODOLOGY — agora referencia apenas o Bootstrap.

### Versão 1.10

OP-002 evoluído (GS-001.1). ❤️ Saúde do Chat com formato classificado 🟢🟡🔴 e 5 indicadores. Referência ao Bootstrap como fonte dos critérios detalhados. IA-031 Gatilhos Operacionais renumerado para IA-032.

### Versão 1.9

IA-031 (Continuidade Arquitetural entre Chats) criada. Resumo Operacional Canônico obrigatório para toda nova etapa oficial. Responsabilidades entre ChatGPT e OpenCode formalizadas.

### Versão 1.8

PS#033 (Prompt 3). Ordem Oficial de Precedência Documental formalizada. Marco Documentação Consolidada registrado. Ciclo metodológico encerrado.

### Versão 1.7

PS#032 (Prompt 2). IA-030 criada. Princípio da Fonte Canônica formalizado. Ciclo de Vida dos BK adicionado. OP-012 atualizado. IA-029 atualizada com PROJECT_BOOTSTRAP.

### Versão 1.6

Emenda Final ao PS#030D. OP-012 criado. IA-026 atualizada com verificação de Backlog Estratégico. INS-195 a INS-197 encerrados.

### Versão 1.5

Emenda ao PS#030D. Ritual de encerramento (OP-002) tornado explícito e inomitível. IA-026 atualizada com referência ao ritual. Adicionados OP-010 (Checklist Vinculado aos Protocolos) e OP-011 (Template Vinculado aos Protocolos). PS_TEMPLATE.md criado. INS-190 a INS-194 encerrados.

### Versão 1.4

PS#030D (Prompt 1) — Consolidação Operacional. Adicionados IA-028 (Agrupamento Inteligente), IA-029 (Baseline Operacional), OP-008 (Fluxo de Múltiplos Prompts), OP-009 (Estrutura Padrão de Prompts). Criada seção §10 — Painel Operacional e Indicadores (layout, exibição, percentuais, fórmulas). Auditoria de Sprint renumerada para §11. Evoluções Planejadas renumerada para §12. Histórico renumerado para §13. INS-180 a INS-189 tratados.

### Versão 1.3

PS#030C — Integração de Evidências Externas. Adicionado IA-016 (Relatórios Operacionais — Sugestões Técnicas e Oportunidades Futuras). Adicionado IA-027 (Tratamento de Evidências Externas). Adicionado OP-007 (Classificação das Sugestões). Adicionado Fluxo Oficial de Evidências Externas em §8. INS-179 encerrado.

### Versão 1.2

PS#030B — Refinamento dos Protocolos Operacionais. Adicionados IA-015 (Persistência Operacional), IA-025 (Continuidade Operacional), IA-026 (Autoverificação Operacional). Criada seção §8 — Protocolos de Governança (PG-019 — Estabilidade das Decisões). Criada seção §9 — Protocolos Operacionais (OP-002 — Encerramento por Entrega Relevante, OP-003 — Formato Visual Padronizado). Auditoria de Sprint renumerada para §10. Evoluções Planejadas renumerada para §11. Histórico renumerado para §12. INS-175, INS-176, INS-177, INS-178 encerrados.

### Versão 1.1

Refinamento da Filosofia da Metodologia (evolução contínua). Adicionadas regras IA-008 (Avaliação Automática de Sprint), IA-009 (Classificação Automática das Descobertas), IA-010 (Consolidação Inteligente de Prompts). Criada seção Auditoria de Sprint (§8 à época). Evoluções Planejadas renumerada para §9 (à época). Histórico renumerado para §10 (à época).

### Versão 1.0

Criação do documento oficial de metodologia de desenvolvimento. Registro da filosofia, Working Draft, Refinamento Incremental, Preservação do Conhecimento, Metodologia de Trabalho com IA (IA-001 a IA-007) e Evoluções Planejadas.
