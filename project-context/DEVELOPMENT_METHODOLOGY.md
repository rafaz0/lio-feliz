# Development Methodology — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** DEVELOPMENT_METHODOLOGY.md

**Versão:** 1.9

**Status:** APROVADO

**Categoria:** Project Context

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 12/07/2026

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

Toda Entrega Relevante deverá obrigatoriamente encerrar utilizando exatamente a sequência abaixo, sem omissão ou reinterpretação pela IA:

📊 Auditoria da Sprint

📋 Pendências

📌 Fila de Sincronização

❤️ Saúde do Chat

Este ritual torna-se parte oficial da metodologia. Não poderá ser omitido por interpretação da IA.

### OP-003 — Formato Visual Padronizado

Toda Entrega Relevante deverá utilizar o seguinte formato visual ao finalizar a resposta:

📊 Auditoria da Sprint

📋 Pendências

📌 Fila de Sincronização

❤️ Saúde do Chat

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

---

# 10. Painel Operacional e Indicadores

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

# 11. Auditoria de Sprint

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

---

# 12. Evoluções Planejadas

### DOMAIN_CONCEPTS.md

Será criado após aprovação do `02_TRANSACTIONS.md` v1.0.

**Objetivo:** Centralizar todas as definições oficiais do domínio.

### EVOLUTION_ROADMAP.md

Será criado após estabilização do domínio principal.

**Objetivo:** Registrar decisões futuras aprovadas.

---

# 13. Histórico

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
