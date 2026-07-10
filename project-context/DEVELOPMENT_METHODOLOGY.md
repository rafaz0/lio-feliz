# Development Methodology — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** DEVELOPMENT_METHODOLOGY.md

**Versão:** 1.1

**Status:** APROVADO

**Categoria:** Project Context

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 09/07/2026

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

---

# 8. Auditoria de Sprint

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

# 9. Evoluções Planejadas

### DOMAIN_CONCEPTS.md

Será criado após aprovação do `02_TRANSACTIONS.md` v1.0.

**Objetivo:** Centralizar todas as definições oficiais do domínio.

### EVOLUTION_ROADMAP.md

Será criado após estabilização do domínio principal.

**Objetivo:** Registrar decisões futuras aprovadas.

---

# 10. Histórico

### Versão 1.1

Refinamento da Filosofia da Metodologia (evolução contínua). Adicionadas regras IA-008 (Avaliação Automática de Sprint), IA-009 (Classificação Automática das Descobertas), IA-010 (Consolidação Inteligente de Prompts). Criada seção Auditoria de Sprint (§8). Evoluções Planejadas renumerada para §9. Histórico renumerado para §10.

### Versão 1.0

Criação do documento oficial de metodologia de desenvolvimento. Registro da filosofia, Working Draft, Refinamento Incremental, Preservação do Conhecimento, Metodologia de Trabalho com IA (IA-001 a IA-007) e Evoluções Planejadas.
