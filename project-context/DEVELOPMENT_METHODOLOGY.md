# Development Methodology — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** DEVELOPMENT_METHODOLOGY.md

**Versão:** 1.8

**Status:** APROVADO

**Categoria:** Project Context

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 10/07/2026

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

# 4. Desenvolvimento por Ciclos de Maturidade

Todo documento evolui através dos seguintes níveis de maturidade:

- **Nível 0 — Ideia**: Conceito identificado, sem registro formal.
- **Nível 1 — Working Draft**: Documento criado, em evolução ativa.
- **Nível 2 — Consistente**: Conceitos estabilizados, estrutura consolidada.
- **Nível 3 — Integrado**: Documento coerente com os demais documentos do domínio.
- **Nível 4 — Validado**: Revisado e aprovado pela equipe.
- **Nível 5 — Oficial**: Promovido a documentação oficial (v1.0+).

---

# 5. Refinamento Incremental

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

# 6. Atualizações do Projeto

Sempre que existir:

- novo Marco Arquitetural;

ou

- conjunto significativo de refinamentos;

deverá ser gerado um único prompt consolidado para atualização do projeto.

Evitar múltiplos prompts pequenos.

---

# 7. Preservação do Conhecimento

> Regra Permanente nº 12

Sempre que surgir:

- novo conceito;
- nova metodologia;
- decisão adiada;
- alteração permanente do fluxo de trabalho;

essa informação deverá obrigatoriamente ser registrada através de pelo menos uma das seguintes ações:

- atualização imediata de um documento existente;
- inclusão como evolução planejada;
- inclusão como pendência formal em um Working Draft;
- inclusão na metodologia, quando alterar permanentemente o processo de desenvolvimento.

Nunca permanecer apenas na conversa.

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

**Classificação:** A IA classifica automaticamente a descoberta.

**Auditoria de Conhecimento:** Verifica se alguma decisão importante permanece apenas na conversa.

**Consolidação:** Todas as descobertas são reunidas em um único prompt.

**Prompt Único:** Um prompt consolidado é gerado para o OpenCode.

**Atualização do Projeto:** O prompt é executado, e o projeto é atualizado.

---

# 9. Metodologia de Trabalho com IA

**IA-001 —** Sempre que uma melhoria surgir durante a criação de um prompt, ela deverá ser incorporada automaticamente ao próprio prompt. Nunca apresentada separadamente.

**IA-002 —** Antes de finalizar qualquer prompt para o OpenCode, a IA deverá realizar uma Auditoria de Conhecimento. Objetivo: garantir que nenhuma decisão importante permaneça apenas na conversa.

**IA-003 —** Sempre consolidar todas as decisões tomadas desde a última atualização do projeto em um único prompt, quando possível.

**IA-004 —** Quando uma decisão não puder ser implementada imediatamente, indicar automaticamente onde ela deverá ser registrada.

**IA-005 —** A IA deverá distinguir entre: conhecimento do domínio, metodologia, governança e documentação, registrando cada informação no local apropriado.

**IA-006 —** Sempre que identificar uma melhoria metodológica durante a elaboração de um prompt, a IA deverá incorporá-la ao prompt atual. Nunca deixar melhorias importantes para um prompt futuro.

**IA-007 —** Ao encerrar uma sessão importante de arquitetura, a IA deverá verificar se existe alguma decisão que faria falta caso a conversa fosse encerrada naquele momento. Se existir, essa decisão deverá ser incorporada imediatamente ao próximo prompt de atualização.

---

### IA-008 — Auditoria da Sprint

A Auditoria da Sprint é o registro formal do conhecimento produzido em cada sessão de desenvolvimento.

Deverá conter obrigatoriamente:

- decisões;
- hipóteses;
- evoluções planejadas;
- insights;
- itens adicionados na fila de sincronização;
- itens aguardando prompt;
- itens aguardando OpenCode;
- novos registros KB;
- alterações de Categoria;
- alterações de Status;
- conhecimentos promovidos;
- conhecimentos arquivados.

---

### IA-009 — Fila de Sincronização

A Fila de Sincronização é responsável por registrar tudo aquilo que ainda não foi incorporado oficialmente ao projeto.

A fila deve existir apenas até a geração do Prompt de Sincronização correspondente.

Após a criação do prompt, os itens deixam de ser considerados pendentes para fins de desenvolvimento.

Cada item da fila deverá conter obrigatoriamente:

- categoria (KB-T1 a KB-T4);
- documento destino;
- status;
- próxima ação.

---

### IA-010 — Baseline Obrigatória

Antes de elaborar qualquer resposta relacionada ao projeto, a IA deverá revisar todas as regras metodológicas vigentes (IA-001 até a última).

Após elaborar a resposta, deverá verificar novamente se todas as regras foram efetivamente aplicadas.

Essa verificação passa a ser obrigatória.

---

### IA-011 — Sincronização Conceitual

Após a criação de um Prompt de Sincronização:

- o desenvolvimento continua normalmente;
- o projeto passa a considerar conceitualmente aquelas alterações como sincronizadas;
- permanece apenas a pendência operacional de execução no OpenCode e validação do relatório.

A sincronização nunca interrompe o desenvolvimento arquitetural.

---

### IA-012 — Especialização dos Prompts

Toda sincronização deverá ser organizada por responsabilidade.

Categorias oficiais:

- Domínio;
- Metodologia;
- Governança.

Cada prompt altera apenas os documentos pertencentes à sua categoria.

---

### IA-013 — Pacotes de Sincronização

Toda sincronização oficial deverá ocorrer através de um Pacote de Sincronização.

Cada pacote poderá conter um ou mais prompts especializados.

Somente o último prompt deverá solicitar o Relatório Consolidado Final.

---

### IA-014 — Classificação do Conhecimento

Sempre que surgir uma ideia relevante durante o desenvolvimento, ela deverá obrigatoriamente receber uma classificação oficial antes do fim da Sprint.

Categorias:

- Decisão
- Hipótese
- Evolução Planejada
- Insight

Nenhuma ideia poderá permanecer apenas na conversa.

---

### IA-015 — Protocolo de Pré-Resposta

Esta regra é **obrigatória e bloqueante**. Nenhuma resposta técnica poderá ser produzida antes de sua conclusão.

**Em uma nova conversa, a primeira ação obrigatória é localizar e ler o AI_CONTEXT.md.**

Caso o AI_CONTEXT esteja indisponível, a IA deverá interromper o fluxo normal e solicitar o documento ao usuário antes de prosseguir.

Antes de qualquer resposta relacionada ao projeto, a IA deverá obrigatoriamente:

1. Localizar e ler o AI_CONTEXT.md.
2. Validar o AI_CONTEXT.
3. Identificar a versão atual do projeto.
4. Identificar o documento atualmente em desenvolvimento.
5. Confirmar o último Pacote de Sincronização.
6. Confirmar que está utilizando a metodologia vigente.
7. Validar conformidade com IA-001 até IA-014.
8. Verificar se a resposta produz novo conhecimento arquitetural, metodológico ou operacional.
9. Registrar esse conhecimento na Auditoria da Sprint quando aplicável.

---

### IA-016 — Relatórios dos Pacotes de Sincronização

Prompts intermediários não geram Relatório Consolidado.

Apenas o último Prompt de cada Pacote de Sincronização gera o Relatório Consolidado Final.

Os Prompts intermediários continuam atualizando normalmente a documentação e a governança.

---

# 10. Fluxo Oficial de Preservação do Conhecimento

```
Nova ideia
     ↓
Classificação (IA-014)
     ↓
Fila de Sincronização (IA-009)
     ↓
Prompt de Sincronização
     ↓
   OpenCode
     ↓
Documentação Oficial
     ↓
Regenerar AI_CONTEXT
     ↓
Baseline Atualizada
```

Nenhuma ideia poderá ignorar esse fluxo.

---

# 11. Baseline da Conversa

Sempre que uma nova conversa for iniciada, antes de qualquer discussão arquitetural deverá ser executada uma Fase 0 obrigatória.

Caso o AI_CONTEXT esteja disponível, ele deverá substituir a leitura individual dos documentos de contexto.

Os documentos oficiais continuam sendo a fonte de verdade. O AI_CONTEXT apenas consolida essas informações.

A Fase 0 consiste em:

1. Utilizar o AI_CONTEXT como fonte primária de contexto.
2. Validar a consistência da documentação.
3. Identificar o último Pacote de Sincronização aplicado.
4. Executar o Protocolo de Pré-Resposta (IA-015).
5. Declarar explicitamente a Baseline carregada.
6. Somente após isso iniciar novas decisões arquiteturais.

Esta etapa torna-se obrigatória para todos os futuros ciclos de desenvolvimento.

---

# 12. Ciclo de Vida do Conhecimento

Todo conhecimento possui duas classificações independentes.

- **Categoria** define a natureza do conhecimento.
- **Status** define seu estágio de maturidade.

A mudança de Categoria e a mudança de Status são processos independentes e poderão ocorrer em momentos distintos.

---

# 13. AI_CONTEXT

## Natureza

AI_CONTEXT é um documento derivado. Ele não contém conhecimento inédito. Nunca deve ser editado manualmente. Deve ser regenerado automaticamente após cada Pacote de Sincronização. Sua única finalidade é servir como interface entre OpenCode e ChatGPT.

## Documento Oficial de Inicialização

AI_CONTEXT.md passa a ser o documento oficial de inicialização das conversas com IA.

Sempre que uma nova conversa for iniciada, a IA deverá utilizar o AI_CONTEXT como fonte primária de contexto.

## Fluxo Oficial de Inicialização

```
Nova Conversa
     ↓
Receber AI_CONTEXT
     ↓
Executar Baseline (Fase 0)
     ↓
Executar Protocolo de Pré-Resposta (IA-015)
     ↓
Prosseguir normalmente
```

---

# 14. Objetivos Arquiteturais

Os documentos são instrumentos para atingir um Objetivo Arquitetural (OA-XXX).

- Um objetivo pode envolver vários documentos.
- Um documento pode participar de diferentes objetivos ao longo da evolução do projeto.

### OA-001 — Modelagem do Domínio Patrimonial

**Objetivo:** Definir como o sistema representa, registra, interpreta e reconstrói alterações patrimoniais.

---

# 15. Checkpoint de Sincronização

Sempre que um Working Draft atingir o nível planejado para a sprint, deverá ser consolidado através de um Pacote de Sincronização antes do início de um novo Working Draft dependente.

---

# 16. Evoluções Planejadas

### DOMAIN_CONCEPTS.md

Será criado após aprovação do `02_TRANSACTIONS.md` v1.0.

**Objetivo:** Centralizar todas as definições oficiais do domínio.

### EVOLUTION_ROADMAP.md

Será criado após estabilização do domínio principal.

**Objetivo:** Registrar decisões futuras aprovadas.

---

# 17. Histórico

### Versão 1.8

IA-015 fortalecida: localizar AI_CONTEXT é a primeira ação obrigatória; indisponibilidade é bloqueante. Nenhuma resposta técnica antes da conclusão da Baseline.

### Versão 1.7

Criada seção AI_CONTEXT (§13) como documento oficial de inicialização. Adicionadas IA-015 (Protocolo de Pré-Resposta) e IA-016 (Relatórios dos Pacotes). Baseline da Conversa atualizada para utilizar AI_CONTEXT como fonte primária. Seções 13-16 renumeradas para 14-17.

### Versão 1.6

Criada seção "Ciclo de Vida do Conhecimento" (§12). IA-008 expandida (status do conhecimento). KNOWLEDGE_BACKLOG.md v1.2 (status oficiais, estrutura padronizada, KB-004, KB-005). Seções 13-15 renumeradas para 14-16.

### Versão 1.5

Criada seção "Baseline da Conversa" (§11) com Fase 0 obrigatória. Seções 12-14 renumeradas para 13-15.

### Versão 1.4

Criada seção "Fluxo Oficial de Preservação do Conhecimento" (§10). IA-008 expandida (7 itens obrigatórios). IA-009 reformulada (categoria, documento destino, status, próxima ação). Seções 11-13 renumeradas para 12-14.

### Versão 1.3

Adicionada IA-014 (Classificação do Conhecimento). IA-009 expandida (categoria, documento de destino, motivo da classificação). KNOWLEDGE_BACKLOG.md criado como instrumento oficial da IA-014.

### Versão 1.2

Adicionados Ciclos de Maturidade (Níveis 0-5). Regra nº 12 fortalecida com 4 ações obrigatórias. IA-008 a IA-013 formalizadas (Auditoria da Sprint, Fila de Sincronização, Baseline Obrigatória, Sincronização Conceitual, Especialização dos Prompts, Pacotes de Sincronização). Criada seção Objetivos Arquiteturais (OA-001). Criada seção Checkpoint de Sincronização. IA-008/009/010 anteriores substituídas pelas versões formais. Seções renumeradas.

### Versão 1.1

Refinamento da Filosofia da Metodologia (evolução contínua). Adicionadas regras IA-008 (Avaliação Automática de Sprint), IA-009 (Classificação Automática das Descobertas), IA-010 (Consolidação Inteligente de Prompts). Criada seção Auditoria de Sprint (§8). Evoluções Planejadas renumerada para §9. Histórico renumerado para §10.

### Versão 1.0

Criação do documento oficial de metodologia de desenvolvimento. Registro da filosofia, Working Draft, Refinamento Incremental, Preservação do Conhecimento, Metodologia de Trabalho com IA (IA-001 a IA-007) e Evoluções Planejadas.
