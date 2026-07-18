# Project Bootstrap — Lio Feliz

**Documento:** PROJECT_BOOTSTRAP.md

**Versão:** 2.49

**Status:** APROVADO

**Categoria:** Project Context

**Última atualização:** 18/07/2026

---

> **O PROJECT_BOOTSTRAP é o Runtime Operacional oficial da Engenharia.**
>
> Ele consolida todo o conhecimento operacional permanente necessário para a
> continuidade da engenharia — não apenas um snapshot do estado atual do projeto.
>
> Ao carregar apenas `PROJECT_BOOTSTRAP.md` e `AI_OPERATION_CHECKLIST.md`,
> uma nova IA deve conseguir compreender corretamente:
> * o estado atual da engenharia;
> * o fluxo metodológico vigente;
> * as decisões permanentes;
> * as responsabilidades dos agentes;
> * o próximo objetivo macro da engenharia;
> * as pendências estratégicas;
> * o comportamento esperado durante toda a execução do projeto.
>
> Nenhum documento histórico (PROJECT_STATUS, SYNC_HISTORY, GOVs passados)
> deve ser necessário para restaurar informações operacionais permanentes.

---

🚀 **Bootstrap Rápido**

O Runtime Operacional do projeto é composto exclusivamente por:

1. **PROJECT_BOOTSTRAP** — Memória operacional permanente da engenharia
2. **AI_OPERATION_CHECKLIST** — Protocolo operacional executável

Estes dois documentos são **autossuficientes** para restaurar o estado operacional completo.

Documentos complementares devem ser consultados apenas quando necessário:
- **DEVELOPMENT_METHODOLOGY** — Regras metodológicas detalhadas
- **PIs (PI-001, PI-002, PI-003)** — Detalhamento arquitetural
- **PROJECT_STATUS / SYNC_HISTORY** — Histórico cronológico (não contêm decisões permanentes)

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

🏛 Governanca    [█████████░░]  ~90%
🏗 Arquitetura   [████████░░]   ~80%
⚙ Engineering   [████████░░]   ~80%
💻 Codigo        [█████░░░░░]   ~50%
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

A próxima etapa oficial da engenharia é a implementação do domínio patrimonial via **EWO-002** (Aprovada). Próxima Slice: **Slice 3** — Eventos de Rendimento: Dividend e JCP.

## Engineering Outlook

> **Aviso:** Esta seção é apenas orientativa. Não define arquitetura, não substitui PI, Engineering Review ou EWO. Seu único objetivo é orientar a continuidade do projeto.

### Estado Atual da Engenharia

- Trindade Arquitetural do Engineering N1 consolidada (PI-001, PI-002, PI-003)
- EWO-001 concluído — Core Foundation + Modelo Canônico (10 Slices, 175 testes)
- Core API congelada (7 componentes estáveis)
- **PI-004 concluída** — Arquitetura do Domínio Patrimonial consolidada
- **ER-004 aprovada** — Gap analysis validada, aderência ao Core Foundation confirmada
- O projeto está oficialmente na **fase de implementação do domínio patrimonial**

### Próxima Frente de Engenharia

A próxima etapa oficial é a **EWO-002** — Implementação do Domínio Patrimonial (Portfolio, Financial Events, Projections, WealthProjection). ER-004 já aprovada; 8-11 slices estimadas.

### Documentação Prevista

| Documento | Finalidade | Status |
|-----------|------------|--------|
| PI-004 | Arquitetura do Domínio Patrimonial | ✅ Concluído |
| ER-004 | Engineering Review da PI-004 | ✅ Aprovada |
| EWO-002 | Implementação do Domínio Patrimonial | ✅ Aprovada |

### Observações Relevantes

- Engineering N1 consolidado (PI-001, PI-002, PI-003 aprovados)
- PI-004 aprovada — 12 Decisões Arquiteturais (DA-001 a DA-012), 13 Invariantes (I-001 a I-013)
- Personal Finance Domain e Decision Support definidos como módulos complementares
- ER-004 aprovada — 8-11 slices para EWO-002
- EWO-001 concluído — detalhes na seção abaixo
- Backlog estratégico com 4 BKs ativos (BK-005 a BK-008)

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

## Divisão de Responsabilidades ChatGPT / OpenCode

A engenharia do Lio Feliz opera com dois papéis complementares e bem definidos.

### ChatGPT — Planejamento, Arquitetura e Governança

O ChatGPT atua como:

- **Arquiteto de Implementação**: define objetivos, critérios de aceite e diretrizes de implementação com base nas PIs, ERs e EWOs aprovadas
- **Planejador Estratégico**: organiza a ordem de execução, identifica dependências e elabora a estratégia de Slices
- **Auditor Técnico**: valida conformidade arquitetural, metodológica e documental
- **Revisor de Engenharia**: realiza Engineering Reviews ao final de cada Slice
- **Guardião da Governança**: preserva a integridade dos documentos permanentes (Bootstrap, Checklist, Protocolos)

**O ChatGPT não produz planos detalhados de implementação quando o OpenCode possui contexto suficiente para fazê-lo.** O ChatGPT concentra-se na validação metodológica, arquitetural e estratégica, delegando a execução concreta ao OpenCode.

### OpenCode — Execução, Implementação e Sincronização

O OpenCode atua como **Agente Executor** e é responsável por:

- leitura contínua do repositório e do workspace
- implementação do código das Slices
- execução de testes, build e lint
- commit e push
- relatórios de sincronização
- execução do Workspace Guard (GOV-011)
- validação do estado do Git (Branch, HEAD, Remote, Working Tree)
- confirmação do WORKSPACE_FINGERPRINT

### Fluxo de Trabalho Integrado

```
ChatGPT: Planejamento → Diretrizes → Revisão → Auditoria
    ↓                                                        ↓
OpenCode: Implementação → Testes → Build → Commit → Push → Relatório
    ↓
Engineering Review (ChatGPT)
    ↓
Engineering Closure (ChatGPT)
```

Toda implementação obrigatoriamente passa por:

**Planejamento → Implementação → Engineering Review → Auditoria → Engineering Closure**

### PASSO 0 — Workspace Validation (Responsabilidade do Agente Executor)

Este passo pertence exclusivamente ao **Agente Executor** (OpenCode). Conforme definido acima, o ChatGPT não executa o Workspace Guard, não valida o estado do Git, não verifica Branch, HEAD, Remote ou Working Tree.

Ao receber o PROJECT_BOOTSTRAP.md e o AI_OPERATION_CHECKLIST.md, o ChatGPT deve assumir que o PASSO 0 já foi executado quando houver evidência operacional suficiente, por exemplo:

* o usuário informar que o bootstrap foi realizado;
* for apresentado o relatório do Workspace Guard;
* a conversa for continuação de uma sessão iniciada pelo OpenCode.

Na ausência dessa evidência, o ChatGPT apenas registra que a validação do workspace permanece sob responsabilidade do Agente Executor, sem bloquear a restauração do contexto arquitetural.

## Fluxo Oficial de Inicialização

```
 PASSO 0.  Workspace Validation — Agente Executor (GOV-011)
      ↓
 1. Ler AI_CONTEXT.md (identidade, estado, referências)
 2. Ler PROJECT_BOOTSTRAP.md (runtime operacional completo)
 3. Restaurar Estado Operacional automaticamente
 4. Entrar automaticamente em modo Execução
 5. Continuar exatamente da próxima etapa oficial
 6. Proibido retornar ao modo consultivo sem necessidade
```

## Checklist Obrigatório

- [ ] Workspace Guard executado (GOV-011)
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

## Política de Reconstrução de Contexto Estratégico (GOV-013)

O ChatGPT opera com dois níveis de contexto, conforme o tipo de atividade.

### Contexto Estratégico

Utilizado para atividades que exigem visão completa do projeto:

- planejamento de nova PI, ER ou EWO
- revisão arquitetural
- auditorias
- mudanças metodológicas
- definição de estratégia
- início de novo domínio do sistema

O Contexto Estratégico deve ser reconstruído **apenas quando realmente necessário**, preferencialmente através de um único documento consolidado contendo o estado atual da engenharia (`DOCUMENTACAO_COMPLETA.md`).

### Contexto Operacional

Utilizado durante a implementação cotidiana das Slices. O ChatGPT trabalha prioritariamente com:

- relatórios produzidos pelo OpenCode
- Engineering Reviews
- Engineering Closures
- Relatórios de Sincronização

Nesse modo, **não deve solicitar novamente a documentação completa do projeto**.

### Situações que justificam solicitar documentação consolidada

A documentação completa (Contexto Estratégico) somente deve ser solicitada quando houver necessidade real de reconstrução:

- início de uma nova PI
- início de uma nova ER
- início de uma nova EWO
- mudança significativa de arquitetura
- mudança importante de metodologia
- início de um novo domínio do sistema
- quando o próprio ChatGPT identificar perda de contexto que comprometa decisões estratégicas

Fora dessas situações, utilizar exclusivamente os relatórios produzidos durante a engenharia.

### Objetivos da Política

- reduzir necessidade de anexos
- reduzir reconstruções desnecessárias de contexto
- diminuir custo operacional das conversas
- preservar consistência metodológica
- manter o ChatGPT focado em estratégia e auditoria

## Política de Incorporação Contínua de Melhorias (GOV-015)

Nenhuma oportunidade identificada durante atividades de engenharia poderá permanecer sem destino.

### Destinos Obrigatórios

Toda oportunidade deverá receber exatamente um dos seguintes destinos:
- **Implementação imediata** — incorporada na Slice atual
- **Incorporação automática** — programada para a próxima Slice compatível
- **Backlog (BK)** — registrada como melhoria futura
- **Dívida Técnica (TD)** — registrada como débito técnico
- **Decisão Rejeitada** — analisada e rejeitada com justificativa
- **Descarte explícito** — sem valor suficiente para implementação

### Fluxo Obrigatório

1. **Etapa 1 — Implementação imediata?** A melhoria pode ser implementada na Slice atual sem alterar arquitetura, PI, EWO ou aumentar risco? → Incorporar imediatamente. Não criar BK.
2. **Etapa 2 — Slice futura compatível?** Existe Slice que naturalmente modificará o mesmo componente? → Incorporar automaticamente no prompt daquela Slice. Registrar como acompanhamento metodológico. Não criar BK.
3. **Etapa 3 — Backlog.** Criar BK.
4. **Etapa 4 — Descarte explícito.** Sem valor suficiente.

### Responsabilidades

**ChatGPT:** identificar oportunidades, classificá-las, decidir destino, incorporar melhorias em prompts futuros. Passa a exercer também otimização contínua da implementação, não apenas auditoria.

**OpenCode:** executar melhorias incorporadas no prompt, não removê-las sem justificativa arquitetural, registrar quais foram incorporadas, manter rastreabilidade.

### Registro de Conhecimento na Engineering Review

Toda Engineering Review deverá conter obrigatoriamente ao final:
- Oportunidades identificadas
- Destino de cada oportunidade
- Melhorias incorporadas imediatamente
- Melhorias programadas para próxima Slice
- BK criados
- TD criadas
- Decisões descartadas

## Governança Evolutiva da Metodologia (GOV-017)

A metodologia evolui apenas quando há evidências objetivas de necessidade. Novas regras metodológicas não podem ser criadas por conveniência ou preferência.

### Origens Válidas

Toda nova regra metodológica deverá possuir origem verificável em:
- Engineering Review
- Auditoria
- Retrospectiva de Sprint
- Problema recorrente observado durante implementação, planejamento ou sincronização
- Mudança estrutural de responsabilidades
- Decisão arquitetural com impacto metodológico permanente

### Origens Inválidas

Não são consideradas justificativas válidas: "Pode ser interessante", "Talvez seja útil", "Achei uma boa ideia" ou qualquer outra sem evidência objetiva.

### Fluxo de Evolução

```
Problema observado
    ↓
Evidências coletadas
    ↓
Análise técnica
    ↓
Proposta metodológica
    ↓
Implementação da GOV
    ↓
Atualização da documentação
    ↓
Sincronização
    ↓
Metodologia oficial atualizada
```

### Engineering Review

Durante toda ER, o ChatGPT deverá verificar se existe melhoria metodológica identificada. Se sim, registrar descrição, origem, impacto esperado e destino (implementar imediatamente, BK, TD ou descartar). Se não, registrar "Nenhuma melhoria metodológica identificada."

### Princípio da Metodologia Mínima

A metodologia deve permanecer a menor possível. Uma nova regra somente pode existir quando eliminar um problema recorrente ou reduzir significativamente o risco da engenharia.

### Consolidação Metodológica

Ao término de grandes marcos (ex: encerramento de EWO), avaliar atividade de Consolidação Metodológica para eliminar redundâncias, reorganizar documentos e reduzir custo de manutenção, sem alterar decisões aprovadas.

### Responsabilidades

**ChatGPT:** identificar problemas recorrentes, avaliar necessidade real de evolução, propor novas GOV apenas com evidências, evitar crescimento desnecessário da documentação, identificar consolidação futura.

**OpenCode:** implementar alterações documentais, sincronizar, registrar versões, executar GOV-011. Não criar novas políticas metodológicas por iniciativa própria.

---

## Pipeline Contínuo de Engenharia (GOV-018)

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

### Comportamento

Cada etapa entrega obrigatoriamente o artefato esperado para a etapa seguinte.

O pipeline só é interrompido quando existe:

- bloqueador técnico;
- dúvida arquitetural;
- ausência de documentação;
- violação da PI;
- violação da EWO;
- falha na Core Foundation;
- conflito metodológico.

Fora dessas situações, o fluxo continua automaticamente.

### Responsabilidades

**ChatGPT:** ao finalizar uma Engineering Review, emitir parecer, registrar conhecimento capturado, identificar melhorias para o próximo prompt e produzir imediatamente o Planejamento da próxima etapa. Não perguntar "Deseja prosseguir?".

**OpenCode:** ao concluir implementação, executar testes, validar build e emitir Relatório de Implementação. Não perguntar "Deseja Engineering Review?". Após ER aprovada, executar Engineering Closure, sincronizar Git e emitir Relatório de Closure. Não perguntar "Deseja prosseguir para a próxima Slice?".

---

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

Não exibir se nenhum dos eventos acima ocorreu. O Painel não contém Auditoria, Pendências ou Fila.

## Ritual de Encerramento Estratégico (GOV-016)

Respostas do ChatGPT em atividades relevantes (planejamento, engenharia, Engineering Review, auditoria, estratégia, governança, análise arquitetural) devem encerrar com o formato abaixo.

Utilizar apenas informações objetivas e verificáveis. Não repetir informações já apresentadas durante a resposta.

### Formato Oficial

```
📊 Estado da Engenharia
    EWO atual:
    Slice atual:
    Situação:
    Próxima etapa imediata:

📐 Resultado da Auditoria
    [Itens efetivamente analisados — ex: conformidade arquitetural,
    aderência à PI/EWO, Core Foundation preservada, rastreabilidade]

💡 Conhecimento Capturado
    [Melhorias incorporadas, BK criados, TD criadas,
    decisões descartadas, ou "Nenhum novo conhecimento registrado."]

📋 Pendências Oficiais
    [Apenas pendências decorrentes da conversa atual]

📈 Painel Executivo
    EWO em execução:
    Slices concluídas:
    Engineering Reviews aprovadas:
    Closures concluídas:
    Bloqueadores ativos:
```

### Regras

- Refletir exclusivamente o papel estratégico do ChatGPT
- Utilizar apenas informações objetivas e verificáveis
- Evitar estimativas subjetivas
- Não repetir informações já apresentadas durante a resposta
- Facilitar a retomada da conversa em novos chats
- Obrigatório em toda Entrega Relevante (GOV-016)

## Templates Oficiais

### Resposta Operacional (padrão)

Usar para respostas do dia a dia dentro de um PS ativo.

Estrutura: resposta direta + Ritual de Encerramento (quando aplicável).

### Prompt OpenCode (Agente Executor)

Usar quando for necessário executar alterações via OpenCode ou qualquer Agente Executor.

Estrutura:
1. Objetivo
2. Implementação
3. Atualizações Obrigatórias
4. DOCUMENTACAO_COMPLETA (regenerar ou não)
5. Relatório Consolidado Final (quando aplicável)
6. Sugestões Técnicas
7. Oportunidades Futuras
8. Registro em SYNC_HISTORY

**Lembrete Operacional Obrigatório** — Deve ser acrescentado ao final de todo prompt destinado ao Agente Executor:

```
--- Lembrete Operacional Obrigatório (GOV-009) ---

Ao concluir esta atividade, execute o ciclo completo de sincronização,
salvo instrução explícita do usuário em contrário.

Checklist obrigatório:
• Workspace Guard (quando aplicável);
• Testes / Build / Lint (quando aplicáveis);
• git add;
• git commit;
• git push;
• Confirmar sincronização no repositório remoto;
• Confirmar Working Tree limpa;
• Registrar HEAD;
• Atualizar a documentação de governança pertinente;
• Emitir o relatório final de sincronização.

O encerramento da Sprint somente deve ocorrer após a confirmação
da sincronização completa.
```

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

# Sincronização Operacional (GOV-009)

## Regra de Sincronização Obrigatória

Sempre que qualquer arquivo oficial do projeto for criado, modificado, removido ou aprovado, a IA deverá executar obrigatoriamente o ciclo completo de sincronização antes de considerar a atividade encerrada.

Toda implementação, seja de código ou documentação, deve encerrar obrigatoriamente o ciclo completo de sincronização, salvo quando houver instrução explícita do usuário para interromper o processo.

### Ciclo Completo de Sincronização

1. Verificar os arquivos modificados;
2. Validar que as alterações foram aprovadas;
3. Atualizar a documentação relacionada, quando necessário;
4. Executar build, lint e testes, quando aplicável;
5. `git add`;
6. `git commit` (mensagem compatível com a alteração);
7. `git push`;
8. Confirmar que a sincronização foi concluída com sucesso;
9. Registrar o HEAD final;
10. Emitir o Relatório de Sincronização.

### Consistência do Estado da Sincronização

Os estados abaixo são mutuamente dependentes e nunca podem ser apresentados de forma inconsistente.

**Exemplo incorreto:**
```
• Commit: pendente
• Push: pendente
• GitHub: sincronizado
```

**Exemplo correto (antes da sincronização):**
```
• Commit: pendente
• Push: pendente
• GitHub: não sincronizado
• Working Tree: suja
```

**Exemplo correto (após a sincronização):**
```
• Commit: confirmado
• Push: confirmado
• GitHub: sincronizado
• Working Tree: limpa
• HEAD registrado
```

O relatório final deve refletir fielmente o estado real do repositório.

### Aplicação

Esta regra aplica-se a toda implementação, seja de código ou documentação, incluindo alterações de governança, metodologia, templates e documentação arquitetural. O encerramento de qualquer Sprint, Slice ou Engineering Review somente ocorre após a confirmação da sincronização completa.

### Relatório de Sincronização Obrigatório

O relatório de encerramento referido no passo 8 do ciclo completo deverá conter, no mínimo:

- Tipo da atividade;
- Documentos alterados;
- Arquivos alterados;
- Resumo das alterações;
- Status do build, lint e testes;
- Commit e hash;
- Push confirmado;
- Status da sincronização remota;
- Pendências existentes.

### Exceção

Caso nenhuma alteração persistente tenha sido produzida durante a atividade, a seguinte mensagem substitui o relatório:

> Não foi realizada sincronização Git porque nenhuma alteração persistente foi produzida nesta atividade.

### Falha de Sincronização

Se a sincronização falhar em qualquer etapa, a atividade permanece com status **Pendente de Sincronização** e o relatório deve informar:

- qual etapa falhou;
- qual comando não foi concluído;
- quais arquivos permanecem pendentes;
- quais ações são necessárias para concluir a sincronização.

---

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
• Commit: <hash> / pendente
• Branch: <nome>
• Push: confirmado / pendente
• GitHub: sincronizado / não sincronizado / divergente
• Working Tree: limpa / suja
• HEAD registrado: <hash> / ---
```

**Regra de consistência:** Os campos são mutuamente dependentes. Se `Commit` é pendente, `Push` não pode ser confirmado e `GitHub` não pode ser sincronizado. Se `Push` é confirmado e `GitHub` é sincronizado, a `Working Tree` deve estar limpa. HEAD deve estar registrado quando o ciclo de sincronização foi concluído.

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

### Promoção de Conhecimento Permanente (SYNC-001)

Toda decisão que altere permanentemente a forma como futuras IAs deverão operar deve obrigatoriamente ser promovida para o **PROJECT_BOOTSTRAP.md** e, quando aplicável, para o **AI_OPERATION_CHECKLIST.md**.

Documentos históricos (PROJECT_STATUS, SYNC_HISTORY, GOVs passados) **não substituem** essa atualização. O Bootstrap é a memória operacional permanente; os demais documentos são apenas registros cronológicos.

**Regra:** Ao final de toda implementação que introduza uma regra, protocolo, convenção, responsabilidade ou comportamento operacional novo, verificar:
1. A decisão está refletida no PROJECT_BOOTSTRAP.md?
2. Se aplicável, está refletida no AI_OPERATION_CHECKLIST.md?
3. Um novo chat iniciado apenas com esses dois documentos restauraria corretamente a decisão?

Se a resposta para (3) for NÃO → a implementação está incompleta.

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
1. PROJECT_BOOTSTRAP.md         Runtime Operacional (memória permanente)
2. DOCUMENTACAO_COMPLETA.md     Fonte Canônica Consolidada
3. AI_CONTEXT.md                Estado Operacional
```

Mesmo que apenas AI_CONTEXT e PROJECT_BOOTSTRAP sejam enviados no início do chat.

## Próximo Passo Operacional

### PI-004 v1.0 — Modelo Patrimonial do Lio Feliz (Approved)

| Campo | Valor |
|-------|-------|
| Identificador | PI-004 |
| Versão | v1.0 (Approved) |
| Status | Approved |
| Documento | `architecture-lab/PI-004.md` |
| Objetivo | Definir a arquitetura do domínio patrimonial: Aggregate Root Portfolio, Financial Events, Projections, Bounded Contexts, Invariantes |
| Entregável esperado | Especificação completa da arquitetura patrimonial (12 DAs, 13 Invariantes, 4 Bounded Contexts) |
| Resultado | Arquitetura do domínio patrimonial consolidada |
| Próximo passo | **EWO-002** — Slice 1 (CLOSED), Slice 2 (CLOSED), Slice 3 (IMPLEMENTADO). Próxima etapa: **Engineering Review da Slice 3**. |

> **Resumo Operacional Canônico:** PI-004 aprovada define Portfolio como Aggregate Root principal, Financial Events como mecanismo de evolução patrimonial, Projections como visões derivadas. Personal Finance Domain e Decision Support como módulos complementares. ER-004 validou aderência ao Core Foundation e estimou 8-11 slices para EWO-002.

### ER-004 v1.0 — Engineering Review da PI-004 (Approved)

| Campo | Valor |
|-------|-------|
| Identificador | ER-004 |
| Versão | v1.0 (Approved) |
| Status | Approved |
| Documento | `architecture-lab/ER-004.md` |
| PI Referenciada | PI-004 v1.0 (Approved) |
| Resultado | Gap analysis completa, aderência ao Core Foundation validada, 8-11 slices estimadas. Aprovada para EWO-002. |

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

- EWO-002 — Implementação do Domínio Patrimonial

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

O fluxo abaixo estabelece a cadeia completa desde a visão do produto até o registro histórico. Cada documento possui responsabilidade distinta e precedência definida.

**Regra fundamental:** a **PI (Product Increment) define a arquitetura**; a **EWO (Engineering Work Order) apenas materializa essa arquitetura em Slices de implementação**. Nenhuma EWO deve ser interpretada como documento de definição arquitetural.

```
PROJECT_BOOTSTRAP
        ↓
Product Increment (PI) — Define a arquitetura
        ↓
Engineering Review (ER) — Valida a arquitetura (quando aplicável)
        ↓
Engineering Wave (EWO) — Materializa a arquitetura em Slices
        ↓
Implementação das Slices
        ↓
Validação (Build + Lint + Testes)
        ↓
Commit + Push
        ↓
Sprint Report
        ↓
Governança (GOV) — Se houver evolução metodológica
        ↓
PROJECT_STATUS — Histórico permanente
```

Este é o fluxo oficial do projeto. Nenhuma implementação pode ignorá-lo.

---

# Mapa de Dependências Documentais (GOV-007)

| Documento | Finalidade | Pode gerar |
|---|---|---|
| PI | **Define** arquitetura — fonte canônica de engenharia | ER, EWO |
| ER | **Valida** arquitetura — não altera, apenas analisa | PI revisada, GOV, BK |
| EWO | **Materializa** arquitetura em Slices — não define arquitetura | Slices |
| Slice | **Implementa** código | Sprint Report |
| Sprint Report | **Registra** evidências de execução | PROJECT_STATUS |
| GOV | **Evolui** metodologia | Bootstrap, Checklist |
| PROJECT_STATUS | **Preserva** histórico oficial | Nunca gera implementação |

## Papel de cada documento

| Documento | Papel |
|---|---|
| PI | Define arquitetura. Fonte canônica de engenharia. Nenhum outro documento pode criar ou modificar arquitetura. |
| ER | Valida arquitetura executada. Não altera. Apenas analisa. |
| EWO | Planeja e organiza a implementação. Não cria arquitetura. Materializa decisões já aprovadas em PIs. |
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
PI Approved (fonte exclusiva de arquitetura)
        ↓
ER
        ↓
EWO (executa arquitetura, não a define)
        ↓
GOV
        ↓
Sprint Reports
        ↓
PROJECT_STATUS
```

Documentos de maior precedência prevalecem sobre os de menor precedência. Documentos ausentes não têm autoridade. Nenhum documento de nível inferior pode contrariar a arquitetura definida por uma PI Approved.

---

# Verificação de Workspace (GOV-008)

**Contexto:** Durante a sprint de consolidação documental, o OpenCode utilizou `C:\lio-feliz` como working directory, divergindo do caminho canônico `H:\Lio Feliz\` definido no AGENTS.md. A causa raiz foi a ausência de verificação explícita do working directory antes do início da execução.

## Natureza da Regra

A verificação de workspace é uma **responsabilidade do Agente Executor** (OpenCode ou ferramenta similar com acesso ao sistema de arquivos local). O ChatGPT não possui acesso ao workspace e, portanto, não executa esta verificação — apenas assume sua conclusão mediante evidência operacional suficiente.

## Causa Raiz

| Fator | Detalhe |
|-------|---------|
| Working directory padrão | A sessão foi iniciada em `C:\`, sem vinculação a um workspace específico |
| AGENTS.md não consultado | A instrução explícita "Sempre verifique o working directory antes de iniciar" não foi executada antes da implementação |
| Ausência de bloqueio | Nenhum mecanismo automático impede a IA de operar em diretório não canônico |
| Clone residual | `C:\lio-feliz` existia como clone residual, mas não era o diretório oficial |

## Medidas Preventivas

1. **Passo 0 no Fluxo de Inicialização:** Verificar working directory antes de qualquer operação (responsabilidade do Agente Executor).
2. **Checklist Obrigatório:** Item "Working directory verificado" adicionado como primeira verificação.
3. **Autoverificação IA-026 expandida:** Nova pergunta "O working directory corresponde ao caminho canônico do projeto?" adicionada.
4. **Regra de comportamento adicionada:** Se o working directory divergir do canônico, interromper e reportar antes de iniciar qualquer implementação.

## Regra de Comportamento (Agente Executor)

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

A inicialização do workspace é responsabilidade do **Agente Executor** (OpenCode ou ferramenta similar com acesso local). O ChatGPT não executa esta etapa, apenas a assume como concluída quando há evidência operacional suficiente.

O Agente Executor **deve** ser iniciado exclusivamente pelos scripts oficiais localizados em `tools/`. Nunca abrir diretamente um clone ou iniciar o Agente Executor de um diretório arbitrário.

## Scripts Oficiais

| Script | Finalidade |
|--------|-----------|
| `tools/workspace-check.ps1` | Workspace Guard — valida diretório, git, remote, HEAD, branch e working tree. Exit Code 0 = OK, 1 = erro. Reutilizável por outras automações. |
| `tools/start-opencode.ps1` | Inicialização completa: valida workspace e abre o OpenCode. |
| `tools/start-opencode.bat` | Equivalente CMD para ambientes sem PowerShell. |

## Fluxo Obrigatório de Inicialização

```
 PASSO 0.  Workspace Validation — Agente Executor (tools/workspace-check.ps1)
      ↓
 1. Ler AI_CONTEXT.md
 2. Ler PROJECT_BOOTSTRAP.md
 3. Restaurar Estado Operacional
 4. Entrar em modo Execução
 5. Continuar da próxima etapa oficial
```

O Passo 0 é inomitível para o Agente Executor. Se o Workspace Guard falhar, nenhuma operação subsequente pode ocorrer.

## Regra de Inicialização

- Toda sessão do Agente Executor para o Lio Feliz deve começar executando `tools\workspace-check.ps1`.
- O script `tools\start-opencode.ps1` (ou `.bat`) é o método oficial de abertura do projeto.
- Iniciar o Agente Executor manualmente de qualquer outro diretório constitui violação de protocolo.

---

# Hardening da Inicialização do Workspace (GOV-011)

## Workspace Guard Bloqueante

O `workspace-check.ps1` foi endurecido para atuar como **guardião bloqueante**. As seguintes verificações são obrigatórias:

| # | Verificação | Critério |
|---|-------------|----------|
| 1 | Diretório oficial | `H:\Lio Feliz` deve existir |
| 2 | Git toplevel | `git rev-parse --show-toplevel` deve corresponder exatamente |
| 3 | Remote | `origin` deve ser `git@github.com:rafaz0/lio-feliz.git` |
| 4 | HEAD | `git rev-parse HEAD` deve existir |
| 5 | Branch | Deve ser `main` |
| 6 | Working Tree | Verificada (limpa/suja — informativo, não bloqueante) |
| 7 | Documentos obrigatórios | AGENTS.md, PROJECT_BOOTSTRAP.md, AI_OPERATION_CHECKLIST.md, WORKSPACE_FINGERPRINT.md |
| 8 | Clone duplicado | Verifica existência de `C:\lio-feliz` (alerta) |

**Se qualquer item obrigatório falhar:** o Workspace Guard imprime erro em vermelho, explica o motivo e retorna Exit Code 1. O script `start-opencode.ps1` (e `.bat`) bloqueia a abertura do OpenCode.

## Workspace Fingerprint

O arquivo `project-context/WORKSPACE_FINGERPRINT.md` é a identidade oficial do workspace. Sua existência é validada pelo Workspace Guard em toda inicialização.

## Verificação de Clone Duplicado

O Workspace Guard verifica automaticamente a existência de `C:\lio-feliz`. Se existir, emite alerta sem apagar automaticamente.

## Workspace Identity

No início de toda execução, o Workspace Guard exibe:

```
============================================
  LIO FELIZ
  Workspace Oficial
  H:\Lio Feliz
  Branch: main
  HEAD:   xxxxxxx
  Remote: git@github.com:rafaz0/lio-feliz.git
============================================
```

## Regra Operacional

Nenhuma atividade de engenharia pode começar antes da validação completa do Workspace Guard. O PASSO 0 é inomitível e obrigatório para o Agente Executor.

## Escopo da Regra

Esta regra aplica-se exclusivamente ao **Agente Executor** (ferramenta com acesso ao sistema de arquivos local). O ChatGPT não executa o Workspace Guard — apenas assume sua conclusão quando houver evidência operacional suficiente (relatório do Guard, confirmação do usuário, continuidade de sessão iniciada por Agente Executor).

## Nova Convenção

O Workspace Oficial do projeto Lio Feliz é: `H:\Lio Feliz`.

Todo clone adicional é considerado secundário. Jamais iniciar engenharia em outro clone sem Engineering Review documentada.

## Scripts Atualizados

| Script | Descrição |
|--------|-----------|
| `tools/workspace-check.ps1` | Workspace Guard — guardião bloqueante com fingerprint, clone check e banner |
| `tools/start-opencode.ps1` | Inicialização oficial — delega ao Workspace Guard, bloqueia se falhar |
| `tools/start-opencode.bat` | Equivalente CMD — delega ao Workspace Guard via PowerShell |

---

# Technical Roadmap (GOV-006)

Melhorias futuras identificadas durante a Engineering Review (ER-C001-C002-001). **Não constituem dívida técnica atual e não bloqueiam nenhuma Sprint.**

---

# Próximos Documentos Previstos (GOV-006)

Os documentos abaixo estão previstos para criação futura. **Ainda não existem** — deverão ser criados apenas quando a evolução do projeto exigir.

### EWO-002 — Implementação do Domínio Patrimonial

**Finalidade:** Materializar a arquitetura aprovada pela PI-004 em Slices de implementação para o domínio patrimonial (Portfolio, Financial Events, Projections).

**Status:** ✅ Aprovado (v1.1) — 9 Slices definidas, Engineering Gate aprovado, pronta para execução.

### GOV-007 — Lições da Próxima Wave

**Finalidade:** Registrar as lições aprendidas após a conclusão da próxima Engineering Wave, caso novas convenções sejam necessárias.

**Status:** Previsto

---

# EWO-001 — Detalhamento

**Título:** Implementação do Núcleo Arquitetural (Core Foundation + Modelo Canônico)
**Status:** ✅ Concluído

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

---

# EWO-002 — Detalhamento

**Título:** Implementação do Domínio Patrimonial
**Status:** ✅ Em execução

| Slice | Componentes | Testes | Commit | Status |
|---|---|---|---|---|
| Slice 1 — Fundação | FinancialEvent (abstração base), Position | 22 | `2b18059` | ✅ CLOSED |
| Slice 2 — Operações | BuyEvent, SellEvent | 24 | `8763e65` | ✅ CLOSED |
| Slice 3 — Rendimentos | DividendEvent, JcpEvent | 24 | `c62444d` | ✅ CLOSED |
| Slice 4 — Corporativos/Ajuste | Bonus, Split, Grouping, Amortization, Adjustment | 59 | `16b5714` | ✅ CLOSED |
| Slice 5 — Portfolio + Invariants | Portfolio Aggregate Root | 13 | `9364605` | ✅ CLOSED |
| Slice 6 — Projeções | PortfolioProjector | 19 | `d7a72c3` | ✅ CLOSED |
| Slice 7 — Analíticas | Asset Allocation, Performance | 10 | `37668de` | ✅ CLOSED |
| Slice 8 — Consolidada | Portfolio History, Wealth Projection | 8 | `d31f56f` | ✅ CLOSED |
| Slice 9 — Consolidação | Todas DAs + Invariantes | 9 | `fb686ca` | ✅ CLOSED |

**Progresso: 9/9 Slices concluídas. 362 testes. Zero regressões. ✅ EWO-002 CONCLUÍDA**

## Contrato de Execução

Ao carregar este documento a IA assume automaticamente que:

- todas as decisões anteriores permanecem válidas;
- este documento possui precedência operacional;
- deve continuar exatamente da próxima etapa oficial;
- deve aplicar integralmente todas as regras aqui descritas.

---

# Histórico

## v2.49

Slice 9 (EWO-002) — Consolidação Final implementada. Relatório de Cobertura Arquitetural (EWO-002-COVERAGE.md) emitido. 12/12 DAs materializadas. 11/13 Invariantes validadas (2 fora de escopo). 9 novos testes de consolidação. Total: 362 testes, zero regressões. Core Foundation inalterada. **EWO-002 oficialmente CONCLUÍDA.**

## v2.48

Slice 8 (EWO-002) implementada e CLOSED. PortfolioHistoryCalculator + WealthProjectionCalculator implementados — 8 novos testes. KB-006 (Otimização Incremental do History) registrado. Slices 1-8 concluídas (8/9). 353 testes, zero regressões. Próxima Slice: 9 — Consolidação Final (Todas DAs + Invariantes).

## v2.47

Engineering Closure da Slice 7 (EWO-002). Asset Allocation e Performance implementados — projeções analíticas derivadas de Positions. ER APROVADA. Slice 7 oficialmente CLOSED. KC-005 registrado. Slices 1-7 concluídas (7/9). 345 testes, zero regressões. Próxima Slice: 8 — Portfolio History, Wealth Projection.

## v2.46

Engineering Closure da Slice 6 (EWO-002). PortfolioProjector implementado — projeção determinística de FinancialEvents para Positions. ER APROVADA. Slice 6 oficialmente CLOSED. KC-002, KC-003, KC-004 registrados. Slices 1-6 concluídas (6/9). 335 testes, zero regressões. Próxima Slice: 7 — Asset Allocation, Performance.

## v2.45

Engineering Closure da Slice 5 (EWO-002). Portfolio Aggregate Root implementado com invariantes I-001 e I-006. ER APROVADA. Slice 5 oficialmente CLOSED. KC-001 registrado. Slices 1-5 concluídas (5/9). 316 testes, zero regressões. Próxima Slice: 6 — PortfolioProjector.

## v2.44

GOV-018 — Pipeline Contínuo de Engenharia institucionalizado. Fluxo automático sem confirmações intermediárias. Responsabilidades de cada etapa definidas. Exceções para interrupção documentadas. PROJECT_BOOTSTRAP v2.44, AI_OPERATION_CHECKLIST v1.40, AI_ENGINEERING_PROTOCOL atualizado, DEVELOPMENT_METHODOLOGY IA-041 adicionado, AGENTS.md atualizado.

## v2.43

GOV-017 — Governança Evolutiva da Metodologia institucionalizada. Origens válidas/inválidas, fluxo de evolução, Princípio da Metodologia Mínima, Consolidação Metodológica, verificação obrigatória em ERs. PROJECT_BOOTSTRAP v2.43, AI_OPERATION_CHECKLIST v1.39, AI_ENGINEERING_PROTOCOL atualizado, DEVELOPMENT_METHODOLOGY IA-040 adicionado.

## v2.42

GOV-016 — Padronização do Encerramento das Respostas Estratégicas do ChatGPT. ❤️ Saúde do Chat removido oficialmente da metodologia. Novo Ritual de Encerramento Estratégico institucionalizado (Estado da Engenharia, Resultado da Auditoria, Conhecimento Capturado, Pendências Oficiais, Painel Executivo). PROJECT_BOOTSTRAP v2.42, AI_OPERATION_CHECKLIST v1.38, AI_ENGINEERING_PROTOCOL atualizado, DEVELOPMENT_METHODOLOGY IA-039 adicionado.

## v2.41

GOV-015 — Política de Incorporação Contínua de Melhorias institucionalizada. 6 destinos obrigatórios, fluxo em 4 etapas, Registro de Conhecimento na Engineering Review, novas responsabilidades ChatGPT/OpenCode. PROJECT_BOOTSTRAP v2.41, AI_OPERATION_CHECKLIST v1.37, AI_ENGINEERING_PROTOCOL atualizado, DEVELOPMENT_METHODOLOGY IA-038 adicionado, AGENTS.md atualizado.

## v2.40

Slice 3 — DividendEvent e JcpEvent implementados. 245/245 testes passando (16/16). EWO-002 progresso: 3/9 Slices. PROJECT_BOOTSTRAP v2.40.

## v2.39

Engineering Closure da Slice 2 (EWO-002). ER APROVADA. BuyEvent e SellEvent implementados e testados (24 testes). 221/221 testes passando, zero regressões. Próximo passo atualizado para Slice 3. EWO-002 detalhamento adicionado com tabela de progresso (2/9 Slices concluídas). PROJECT_BOOTSTRAP v2.39, SYNC_HISTORY v1.35.

## v2.38

GOV-013 — Política de Reconstrução de Contexto Estratégico institucionalizada. Dois níveis de contexto definidos: Estratégico (planejamento, revisão, auditoria — documentação completa) e Operacional (implementação cotidiana — apenas relatórios do OpenCode). Situações que justificam solicitar documentação consolidada formalizadas. Objetivos da política documentados. PROJECT_BOOTSTRAP v2.38, AI_OPERATION_CHECKLIST v1.36, AI_ENGINEERING_PROTOCOL atualizado, DEVELOPMENT_METHODOLOGY IA-037 adicionado.

## v2.37

GOV-012 — Divisão de Responsabilidades ChatGPT/OpenCode institucionalizada. ChatGPT: Arquiteto de Implementação, Planejador Estratégico, Auditor Técnico, Revisor de Engenharia, Guardião da Governança. OpenCode: Agente Executor (implementação, testes, build, lint, commit, push, relatórios). Fluxo integrado documentado. PROJECT_BOOTSTRAP v2.37, AI_OPERATION_CHECKLIST v1.35, AI_ENGINEERING_PROTOCOL atualizado, DEVELOPMENT_METHODOLOGY IA-036 adicionado.

## v2.36

Política de Sincronização Obrigatória institucionalizada. Regra expandida: aplica-se a toda criação, modificação, remoção ou aprovação de arquivos oficiais. Ciclo completo ampliado de 8 para 10 etapas (verificação de arquivos + validação de aprovação + atualização de documentação). Relatório de Sincronização Obrigatório definido com 11 campos. Exceção documentada (ausência de alterações persistentes). Falha de sincronização com status "Pendente de Sincronização" e procedimento de relato. AI_OPERATION_CHECKLIST v1.34 sincronizado. Bootstrap v2.36.

## v2.35

Sprint Documental GOV-010 — Consolidação final da governança pós-Engineering Audit 001.
- AI_CONTEXT.md: Objetivo Atual atualizado para EWO-002.
- PROJECT_BOOTSTRAP limpo: removidos resumos históricos PI-001/002/003 da seção "Próximo Passo Operacional"; Technical Roadmap movido para Strategic Backlog; Ordem de Precedência corrigida (Bootstrap #1); ER-004 marcada ✅ em Próximos Documentos Previstos; Engineering Outlook atualizada (PI-004✅, ER-004✅, EWO-002 próxima).
- DOCUMENTATION_INDEX v1.37: removidos 9 documentos inexistentes (07_PROJECT_CONTEXT, 08_FEATURES, 09_ROADMAP, 10_CHANGELOG, 11_AI_INSTRUCTIONS, 13_DECISIONS, 14_DESIGN_PRINCIPLES, 15_PRODUCT_PHILOSOPHY, 09_STRATEGIC_BACKLOG caminho incorreto).
- 09_STRATEGIC_BACKLOG v0.14: BK-010 (GOV-003), BK-011 (GOV-004), BK-012 (GOV-005) marcados Concluídos.
- ER-C001-C002-001.md criada (stub do relatório de auditoria da Core Foundation).
- DEVELOPMENT_METHODOLOGY v2.16: seção Engineering Audit adicionada (§13), seção 13 obsoleta (Evoluções Planejadas) removida.
- AI_OPERATION_CHECKLIST verificada — sem redundâncias com Bootstrap.
- Governança consolidada — engenharia oficialmente apta para EWO-002.
Bootstrap v2.35. AI_OPERATION_CHECKLIST v1.33. PROJECT_STATUS v1.43. DOCUMENTATION_INDEX v1.37.

## v2.34

PI-004 aprovada — Arquitetura do Domínio Patrimonial consolidada. 12 Decisões Arquiteturais (DA-001 a DA-012), 13 Invariantes (I-001 a I-013). **Decisões permanentes promovidas (SYNC-001): Personal Finance Domain (domínio complementar opcional, não altera Investment Domain, alimenta apenas Wealth Projection) e Decision Support (camada consultiva superior, natureza analítica, nunca modifica domínio).** ER-004.md criada (Approved). Engineering Outlook atualizado: PI-004 ✅, ER-004 prevista, EWO-002 após ER-004. Bootstrap v2.34. AI_OPERATION_CHECKLIST v1.33. PROJECT_STATUS v1.42. DOCUMENTATION_INDEX v1.36.

## v2.33

SYNC-001 implementado. PROJECT_BOOTSTRAP consolidado como Runtime Operacional da Engenharia (memória permanente, não snapshot). Header expandido com escopo explícito de continuidade. Bootstrap Rápido reformulado: Runtime composto exclusivamente por Bootstrap + Checklist. Engineering Outlook consolidado em PARTE A com estado, próxima frente, documentação prevista e observações. EWO-001 detalhamento preservado em seção própria. Nova regra "Promoção de Conhecimento Permanente" adicionada às Regras Operacionais. Bootstrap v2.33. AI_OPERATION_CHECKLIST v1.33. PROJECT_STATUS v1.41. DOCUMENTATION_INDEX v1.35.

## v2.32

GOV-009 implementado. Sincronização Operacional: nova seção com regra de sincronização obrigatória, ciclo completo de 8 etapas, regra de consistência do estado da sincronização com exemplos válidos e inválidos. Bloco Obrigatório nos Relatórios expandido com HEAD e regra de consistência. Template Prompt OpenCode atualizado com Lembrete Operacional Obrigatório (GOV-009). Dashboard: Governança ~90%. Bootstrap v2.32. AI_OPERATION_CHECKLIST v1.32. PROJECT_STATUS v1.40. DOCUMENTATION_INDEX v1.34.

## v2.31

GOV-008 refinado. PASSO 0 generalizado para "Agente Executor", desacoplado de ferramenta específica (OpenCode). ChatGPT explicitamente excluído da responsabilidade de validação de workspace. Fluxo Oficial da Engenharia refinado: PI como fonte exclusiva de arquitetura, EWO como mero materializador. Regra de Precedência Documental reforçada. Dashboard: Governança ~85%. Bootstrap v2.31. AI_OPERATION_CHECKLIST v1.31. PROJECT_STATUS v1.39. DOCUMENTATION_INDEX v1.33.

## v2.30

GOV-011 implementado. Hardening da Inicialização do Workspace. Workspace Guard tornado guardião bloqueante com 8 verificações obrigatórias. WORKSPACE_FINGERPRINT.md criado como identidade oficial. Detecção de clone duplicado. Workspace Identity banner. Regra operacional: nenhuma engenharia antes da validação. Convenção: workspace oficial único. Bootstrap v2.30. AI_OPERATION_CHECKLIST v1.30. PROJECT_STATUS v1.38. DEVELOPMENT_METHODOLOGY v2.15. DOCUMENTATION_INDEX v1.32.

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
