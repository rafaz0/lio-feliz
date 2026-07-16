# AI Operation Checklist — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** AI_OPERATION_CHECKLIST.md

**Versão:** 1.25

**Status:** APROVADO

**Categoria:** Project Context

**Última atualização:** 15/07/2026

---

**Objetivo:** Checklist operacional obrigatório antes de qualquer resposta relacionada ao projeto. Transforma IA-026 em procedimento executável.

---

## Pré-Resposta

Antes de responder, verificar:

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

Se SIM → revisar obrigatoriamente a seção correspondente do PROJECT_BOOTSTRAP.md antes de executar a tarefa.

Caso não exista evidência objetiva, priorizar a execução do plano vigente.

Se existir Backlog Estratégico ativo, verificar se deve ser exibido. Nunca omitir automaticamente.

---

## Entrega Relevante — Ritual Obrigatório

Se a resposta for uma Entrega Relevante, o ritual abaixo é **obrigatório e inomitível**:

- [ ] 📊 Auditoria da Sprint (incluir 📐 Decisões Arquiteturais Capturadas)
- [ ] 📋 Pendências
- [ ] 📌 Fila de Sincronização
- [ ] ❤️ Saúde do Chat

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

Se for gerar um prompt para o OpenCode, seguir a estrutura:

- [ ] Objetivo
- [ ] Implementação
- [ ] Atualizações Obrigatórias
- [ ] DOCUMENTACAO_COMPLETA (regenerar ou não)
- [ ] Relatório Consolidado Final (quando aplicável)
- [ ] Sugestões Técnicas
- [ ] Oportunidades Futuras
- [ ] Registro em SYNC_HISTORY

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

## Sincronização GitHub (GS-002)

- [ ] Após alterações no repositório, executar `git add`, `git commit`, `git push`.
- [ ] Verificar se todos os arquivos modificados foram incluídos.
- [ ] Mensagem de commit descritiva.
- [ ] Push confirmado com sucesso no GitHub.
- [ ] Working tree limpa após o push.
- [ ] Relatório de implementação contém bloco "Estado da Sincronização" (GOV-003).

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

# Histórico

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
