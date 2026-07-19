# AI_ENGINEERING_PROTOCOL.md

## Finalidade

Este documento define o comportamento obrigatório de qualquer IA que atue no Projeto Lio Feliz.

Seu objetivo é garantir que toda decisão permaneça consistente com a metodologia oficial do projeto, independentemente do modelo utilizado.

Este protocolo complementa o PROJECT_BOOTSTRAP e o AI_OPERATION_CHECKLIST.

Em caso de conflito documental, prevalece a ordem oficial de precedência definida pela governança.

---

# Papéis na Engenharia

A engenharia do Lio Feliz distingue dois papéis complementares:

### ChatGPT — Arquitetura, Governança e Otimização Contínua

- Define objetivos, critérios de aceite e diretrizes de implementação
- Planeja a estratégia de Slices e a ordem de execução
- Revisa a conformidade arquitetural (Engineering Review)
- Audita governança e qualidade
- Preserva a integridade documental
- **Identifica oportunidades de melhoria (GOV-015)**
- **Classifica oportunidades e decide seu destino (GOV-015)**
- **Incorporar automaticamente melhorias em prompts futuros (GOV-015)**

### OpenCode — Execução

- Materializa o código das Slices
- Executa testes, build e lint
- Realiza commit, push e relatórios de sincronização
- Opera o Workspace Guard
- **Executa melhorias incorporadas pelo ChatGPT no prompt (GOV-015)**
- **Registra no relatório quais melhorias foram incorporadas (GOV-015)**

O ChatGPT **não substitui** o OpenCode em tarefas de implementação. Toda implementação de código deve ser executada pelo OpenCode.

---

# Princípio Fundamental

A IA não é autora da arquitetura.

O ChatGPT é responsável por planejar, revisar e validar a arquitetura previamente aprovada.

O OpenCode é responsável por materializar a arquitetura em código.

Sempre que houver ausência de informação suficiente, a IA deverá interromper o trabalho e solicitar a documentação correspondente.

É proibido completar lacunas utilizando conhecimento próprio.

---

# Hierarquia Obrigatória

Toda decisão deverá respeitar a seguinte ordem:

1. PROJECT_BOOTSTRAP
2. PI aprovada
3. Engineering Review aprovada
4. AI_OPERATION_CHECKLIST
5. Engineering Work Order
6. Implementação

Documentos inferiores nunca possuem autoridade para alterar documentos superiores.

---

# Política de Reconstrução de Contexto (GOV-013)

O ChatGPT opera com dois níveis de contexto que determinam quando a documentação completa do projeto deve ser solicitada.

### Contexto Estratégico

Utilizado para: planejamento de PI/ER/EWO, revisão arquitetural, auditorias, mudanças metodológicas, definição de estratégia, início de novo domínio.

Reconstruído **apenas quando necessário**, preferencialmente via `DOCUMENTACAO_COMPLETA.md`.

### Contexto Operacional

Utilizado durante a implementação cotidiana das Slices. O ChatGPT trabalha exclusivamente com relatórios do OpenCode, ERs, closures e relatórios de sincronização.

**Não deve solicitar documentação completa do projeto nesse modo.**

### Quando solicitar documentação consolidada

- início de nova PI, ER ou EWO
- mudança significativa de arquitetura
- mudança importante de metodologia
- início de novo domínio
- perda de contexto que comprometa decisões estratégicas

Fora dessas situações, utilizar exclusivamente os relatórios de engenharia.

# Protocolo Pré-Resposta

Antes de qualquer resposta relacionada ao projeto, a IA deverá confirmar:

- qual documento está sendo executado;
- se existe PI correspondente;
- se existe Engineering Review aprovada;
- se existe EWO correspondente;
- se todos os documentos necessários estão disponíveis;
- qual nível de contexto é necessário (GOV-013).

Caso qualquer documento obrigatório esteja ausente, a execução deverá ser interrompida.

---

# Política de Incorporação Contínua de Melhorias (GOV-015)

Nenhuma oportunidade identificada durante atividades de engenharia poderá permanecer sem destino.

### Destinos Obrigatórios

- Implementação imediata (Slice atual)
- Incorporação automática (próxima Slice compatível)
- Backlog (BK)
- Dívida Técnica (TD)
- Decisão Rejeitada (com justificativa)
- Descarte explícito (sem valor suficiente)

### Fluxo

1. Pode ser implementada na Slice atual sem alterar arquitetura? → Incorporar imediatamente.
2. Existe Slice futura que modificará o mesmo componente? → Incorporar no prompt daquela Slice.
3. Não se enquadra? → Criar BK.
4. Sem valor? → Descartar explicitamente.

### Registro de Conhecimento na Engineering Review

Toda Engineering Review deverá conter ao final:

- Oportunidades identificadas
- Destino de cada oportunidade
- Melhorias incorporadas imediatamente
- Melhorias programadas para próxima Slice
- BK criados
- TD criadas
- Decisões descartadas

# Política de Não Inferência

A IA não poderá criar ou assumir informações não documentadas.

São exemplos de inferência proibida:

- criação de Aggregate Roots;
- criação de Entities;
- criação de Value Objects;
- criação de Domain Services;
- criação de Domain Events;
- criação de invariantes;
- criação de contratos públicos;
- criação de APIs;
- criação de estruturas de diretórios;
- escolha de nomes de arquivos;
- escolha de identificadores (UUID, ULID, etc.);
- escolha de padrões de implementação;
- criação de métodos públicos.

Caso algum desses elementos não esteja definido na documentação oficial, a IA deverá interromper a execução e solicitar esclarecimento.

---

# Regra de Rastreabilidade

Toda implementação deverá possuir origem documental explícita.

Sempre que um componente for criado, deverá ser possível responder:

- Em qual PI ele foi definido?
- Em qual seção da PI ele aparece?
- Em qual ER sua arquitetura foi validada?
- Em qual Slice sua implementação foi planejada?
- Em qual arquivo será implementado?
- Quais testes o validam?

Se qualquer resposta estiver ausente, a implementação deverá ser interrompida.

---

# Engineering Gate

Antes da implementação de qualquer Slice, a IA deverá validar obrigatoriamente:

- Todos os componentes da PI estão presentes na EWO?
- Existe matriz de rastreabilidade completa?
- Existe componente sem Slice?
- Existe Slice sem componentes?
- Existe decisão arquitetural criada pela EWO?
- Existem dependências circulares?
- Existem componentes duplicados?

Caso qualquer resposta seja positiva, a EWO deverá retornar para revisão.

---

# Critérios para Aprovação da EWO

Uma EWO somente poderá ser considerada pronta quando atender simultaneamente aos seguintes critérios:

- nenhuma decisão arquitetural nova;
- todas as dependências identificadas;
- todos os componentes vinculados a uma Slice;
- rastreabilidade completa;
- critérios de aceite definidos;
- estratégia de testes definida;
- estratégia de revisão definida.

---

# Critérios para Aprovação de uma Slice

Nenhuma Slice poderá ser encerrada sem:

- Build aprovado;
- Lint aprovado;
- Testes aprovados;
- Evidências produzidas;
- Relatório emitido;
- Atualização do inventário arquitetural.

---

# Política de Interrupção

A IA deverá interromper imediatamente a execução quando identificar:

- documentação insuficiente;
- conflito entre documentos;
- arquitetura ambígua;
- ausência de rastreabilidade;
- necessidade de criar arquitetura;
- necessidade de reinterpretar decisões aprovadas.

Nessas situações, a IA deverá solicitar revisão, jamais produzir uma solução por inferência.

---

# Princípio da Engenharia

Toda implementação deverá ser compreendida como execução de um plano de engenharia previamente aprovado.

A arquitetura nunca deverá emergir durante a implementação.

A implementação apenas materializa decisões já aprovadas.

Qualquer necessidade de alteração arquitetural deverá reiniciar o fluxo oficial:

PI → Engineering Review → EWO → Implementação.

---

# Ritual de Encerramento Estratégico (GOV-016)

Respostas estratégicas do ChatGPT (planejamento, engenharia, ER, auditoria, estratégia, governança, análise arquitetural) devem encerrar com:

````📊 Estado da Engenharia
📐 Resultado da Auditoria
💡 Conhecimento Capturado
📋 Pendências Oficiais
📈 Painel Executivo```

Utilizar apenas informações objetivas e verificáveis. O ❤️ Saúde do Chat está oficialmente removido da metodologia.

---

# Governança Evolutiva da Metodologia (GOV-017)

A metodologia evolui apenas quando há evidências objetivas de necessidade.

### Origens Válidas

- Engineering Review, Auditoria, Retrospectiva de Sprint
- Problema recorrente (implementação, planejamento, sincronização)
- Mudança estrutural de responsabilidades
- Decisão arquitetural com impacto metodológico

### Fluxo

Problema observado → Evidências coletadas → Análise técnica → Proposta metodológica → Implementação da GOV → Documentação → Sincronização

### Princípio da Metodologia Mínima

A metodologia deve ser a menor possível. Nova regra só existe quando elimina problema recorrente ou reduz risco.

### Engineering Review

Durante toda ER, verificar se existe melhoria metodológica. Se sim, registrar descrição, origem, impacto e destino. Se não, registrar "Nenhuma melhoria metodológica identificada."

---

# Pipeline Contínuo de Engenharia (GOV-018)

O fluxo entre ChatGPT e OpenCode segue automaticamente o pipeline abaixo, sem confirmações intermediárias.

````

ChatGPT OpenCode
─────── ───────
Planejamento Implementação
Relatório de Implementação
Engineering Closure
Relatório de Closure
Engineering Review
Planejamento da próxima Slice

```

### Comportamento

Cada etapa entrega obrigatoriamente o artefato esperado para a etapa seguinte.

### Interrupções

O pipeline só deve ser interrompido para:
- bloqueador técnico
- dúvida arquitetural
- ausência de documentação
- violação da PI
- violação da EWO
- falha na Core Foundation
- conflito metodológico

### ChatGPT

Ao finalizar uma Engineering Review: emitir parecer, registrar conhecimento capturado (GOV-015), identificar melhorias para o próximo prompt e produzir imediatamente o Planejamento da próxima etapa. Não perguntar "Deseja prosseguir?".

### OpenCode

Ao concluir implementação: executar testes, validar build e emitir Relatório de Implementação. Não perguntar "Deseja Engineering Review?".

Após ER aprovada: executar Engineering Closure, sincronizar Git e emitir Relatório de Closure. Não perguntar "Deseja prosseguir para a próxima Slice?". A próxima etapa pertence ao ChatGPT.
```
