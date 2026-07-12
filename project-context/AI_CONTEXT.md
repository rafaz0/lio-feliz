# AI Context — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** AI_CONTEXT.md

**Versão:** 2.3

**Status:** APROVADO

**Categoria:** Project Context

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 10/07/2026

**PS associado:** PS#027

---

> **Observação oficial:**
>
> AI_CONTEXT é um documento **derivado**, não documentação oficial.
>
> Ele não contém decisões inéditas e nunca deve ser editado manualmente.
>
> Sua finalidade exclusiva é consolidar informações da documentação oficial
> para fornecer contexto otimizado ao ChatGPT.
>
> Toda alteração deve ocorrer na documentação oficial.
> O AI_CONTEXT é regenerado automaticamente após cada Pacote de Sincronização.

---

# 1. Utilização

Este documento deve ser **o primeiro arquivo lido em toda nova conversa**.

Ele reconstrói o estado operacional completo do projeto: metodologia vigente, regras da IA, Working Drafts ativos, Knowledge Backlog, Pacotes de Sincronização e prioridades.

**Após sua leitura, a IA deverá obrigatoriamente:**
1. Executar a Baseline da Conversa (Fase 0).
2. Executar o Protocolo de Pré-Resposta (IA-015).
3. Somente então responder tecnicamente ao usuário.

O AI_CONTEXT **não substitui** a documentação oficial (`docs/`). Ele representa uma consolidação operacional da documentação para fins de reconstrução de contexto.

---

# 2. Filosofia do AI_CONTEXT

- Preservar conhecimento crítico.
- Minimizar a quantidade de arquivos enviados ao ChatGPT.
- Nunca substituir a documentação oficial.
- Ser regenerado automaticamente.
- Servir exclusivamente como artefato de integração entre OpenCode e ChatGPT.

---

# 3. Estado Atual do Projeto

| Aspecto | Status |
|---------|--------|
| **Versão do projeto** | Pós Consolidação nº 1 |
| **Documentação oficial** | 43 documentos |
| **Project Context** | 9 documentos |
| **Business Rules** | 5 criados (13 previstos) |
| **Technical Annexes** | 8 criados (13 previstos) |
| **ADRs** | 8 aprovados |
| **Product Backlog** | 21 FEATs (v1.4) |
| **Último PS concluído** | PS#027 — Evolução 05_PORTFOLIO_ENGINE para N1 — **Marco de Implementação 🟢 ATINGIDO** |
| **Documento em desenvolvimento** | 04_PORTFOLIO_LEDGER.md (N1 → N2) |
| **Working Drafts ativos** | 02_TRANSACTIONS.md (v0.92, N1 → consolidando), 03_TRANSACTION_INTERPRETATION.md (v0.70, N4), TRACE_TRANSACTION.md (v0.30, N2), 04_PORTFOLIO_LEDGER.md (v0.20, N1), 05_PORTFOLIO_ENGINE.md (v0.10, N0) |
| **Fonte Canônica** | H:\Lio Feliz |

**Principais pendências:**
- Evoluir 04_PORTFOLIO_LEDGER.md (N1 → N2)
- Evoluir 05_PORTFOLIO_ENGINE.md (N0 → N1)
- Promover 02_TRANSACTIONS.md para N5
- Criar demais Business Rules (06 a 13)
- KB-001 a KB-005 no Knowledge Backlog

---

# 4. Metodologia Oficial

## Filosofia de Desenvolvimento

- O projeto evolui através de refinamento incremental.
- Nenhuma decisão importante deve depender da memória das conversas.
- A metodologia do projeto deve evoluir continuamente.
- Sempre que uma melhoria permanente for identificada, ela deverá ser incorporada à metodologia oficial.
- A metodologia torna-se parte integrante do projeto e evolui juntamente com sua arquitetura.

## Working Draft

1. Documentos complexos iniciam como Working Draft.
2. Podem sofrer alterações estruturais durante a fase de descoberta.
3. Somente tornam-se versão 1.0 após estabilização dos conceitos fundamentais.

## Ciclos de Maturidade

| Nível | Descrição |
|-------|-----------|
| N0 — Ideia | Conceito identificado, sem registro formal |
| N1 — Working Draft | Documento criado, em evolução ativa |
| N2 — Consistente | Conceitos estabilizados, estrutura consolidada |
| N3 — Integrado | Documento coerente com os demais documentos do domínio |
| N4 — Validado | Revisado e aprovado pela equipe |
| N5 — Oficial | Promovido a documentação oficial (v1.0+) |

## Refinamento Incremental

```
Discussão → Working Draft → Refinamento → Nova Versão → Versão Oficial
```

## Atualizações do Projeto

Sempre que existir novo Marco Arquitetural ou conjunto significativo de refinamentos, deverá ser gerado um único prompt consolidado para atualização do projeto. Evitar múltiplos prompts pequenos.

## Preservação do Conhecimento (Regra Permanente nº 12)

Sempre que surgir novo conceito, nova metodologia, decisão adiada ou alteração permanente do fluxo de trabalho, essa informação deverá obrigatoriamente ser registrada através de pelo menos uma das seguintes ações:

- atualização imediata de um documento existente;
- inclusão como evolução planejada;
- inclusão como pendência formal em um Working Draft;
- inclusão na metodologia, quando alterar permanentemente o processo de desenvolvimento.

Nunca permanecer apenas na conversa.

## Auditoria da Sprint

```
Descoberta → Classificação → Auditoria de Conhecimento → Consolidação → Prompt Único → Atualização do Projeto
```

**Descoberta:** Todo novo conceito ou decisão é identificado durante a discussão arquitetural.
**Classificação:** A IA classifica automaticamente a descoberta.
**Auditoria de Conhecimento:** Verifica se alguma decisão importante permanece apenas na conversa.
**Consolidação:** Todas as descobertas são reunidas em um único prompt.
**Prompt Único:** Um prompt consolidado é gerado para o OpenCode.
**Atualização do Projeto:** O prompt é executado, e o projeto é atualizado.

## Fila de Sincronização

Registra tudo que ainda não foi incorporado oficialmente ao projeto. Deve existir apenas até a geração do Prompt de Sincronização. Cada item contém obrigatoriamente: categoria (KB-T1 a KB-T4), documento destino, status, próxima ação.

## Fluxo Oficial de Preservação do Conhecimento

```
Nova ideia → Classificação (IA-014) → Fila de Sincronização (IA-009) → Prompt de Sincronização → OpenCode → Documentação Oficial → Regenerar AI_CONTEXT → Baseline Atualizada
```

Nenhuma ideia poderá ignorar esse fluxo.

## Baseline da Conversa (Fase 0)

Sempre que uma nova conversa for iniciada, antes de qualquer discussão arquitetural deverá ser executada uma Fase 0 obrigatória. Caso o AI_CONTEXT esteja disponível, ele deverá substituir a leitura individual dos documentos de contexto. Os documentos oficiais continuam sendo a fonte de verdade.

A Fase 0 consiste em:
1. Utilizar o AI_CONTEXT como fonte primária de contexto.
2. Validar a consistência da documentação.
3. Identificar o último Pacote de Sincronização aplicado.
4. Executar o Protocolo de Pré-Resposta (IA-015).
5. Declarar explicitamente a Baseline carregada.
6. Somente após isso iniciar novas decisões arquiteturais.

Após a execução da Baseline, quando relevante, a IA deverá apresentar um resumo compacto do Painel de Progresso (PROJECT_PROGRESS_PANEL.md), contendo: progresso do Domínio Principal, Business Rules e status do Marco de Implementação. O resumo deve permanecer enxuto para respeitar PG-015 (Economia de Contexto).

## Ciclo de Vida do Conhecimento

Todo conhecimento possui duas classificações independentes:
- **Categoria** define a natureza do conhecimento.
- **Status** define seu estágio de maturidade.

A mudança de Categoria e a mudança de Status são processos independentes.

## AI_CONTEXT (Documento Oficial de Inicialização)

AI_CONTEXT é um documento derivado. Deve ser regenerado automaticamente após cada Pacote de Sincronização. Sua única finalidade é servir como interface entre OpenCode e ChatGPT.

Fluxo Oficial de Inicialização:
```
Nova Conversa → Receber AI_CONTEXT → Executar Baseline (Fase 0) → Executar Protocolo de Pré-Resposta (IA-015) → Prosseguir normalmente
```

## Objetivos Arquiteturais

### OA-001 — Modelagem do Domínio Patrimonial

**Objetivo:** Definir como o sistema representa, registra, interpreta e reconstrói alterações patrimoniais.

## Checkpoint de Sincronização

Sempre que um Working Draft atingir o nível planejado para a sprint, deverá ser consolidado através de um Pacote de Sincronização antes do início de um novo Working Draft dependente.

---

# 5. Regras Permanentes da IA

**IA-001 —** Sempre que uma melhoria surgir durante a criação de um prompt, ela deverá ser incorporada automaticamente ao próprio prompt. Nunca apresentada separadamente.

**IA-002 —** Antes de finalizar qualquer prompt para o OpenCode, a IA deverá realizar uma Auditoria de Conhecimento. Objetivo: garantir que nenhuma decisão importante permaneça apenas na conversa.

**IA-003 —** Sempre consolidar todas as decisões tomadas desde a última atualização do projeto em um único prompt, quando possível.

**IA-004 —** Quando uma decisão não puder ser implementada imediatamente, indicar automaticamente onde ela deverá ser registrada.

**IA-005 —** A IA deverá distinguir entre: conhecimento do domínio, metodologia, governança e documentação, registrando cada informação no local apropriado.

**IA-006 —** Sempre que identificar uma melhoria metodológica durante a elaboração de um prompt, a IA deverá incorporá-la ao prompt atual. Nunca deixar melhorias importantes para um prompt futuro.

**IA-007 —** Ao encerrar uma sessão importante de arquitetura, a IA deverá verificar se existe alguma decisão que faria falta caso a conversa fosse encerrada naquele momento. Se existir, essa decisão deverá ser incorporada imediatamente ao próximo prompt de atualização.

**IA-008 — Auditoria da Sprint**
A Auditoria da Sprint é o registro formal do conhecimento produzido em cada sessão de desenvolvimento. Deverá conter obrigatoriamente: decisões, hipóteses, evoluções planejadas, insights, itens adicionados na fila de sincronização, itens aguardando prompt, itens aguardando OpenCode, novos registros KB, alterações de Categoria, alterações de Status, conhecimentos promovidos, conhecimentos arquivados.

**IA-009 — Fila de Sincronização**
Responsável por registrar tudo que ainda não foi incorporado oficialmente ao projeto. Deve existir apenas até a geração do Prompt de Sincronização correspondente. Cada item contém obrigatoriamente: categoria (KB-T1 a KB-T4), documento destino, status, próxima ação.

**IA-010 — Baseline Obrigatória**
Antes de elaborar qualquer resposta relacionada ao projeto, a IA deverá revisar todas as regras metodológicas vigentes (IA-001 até a última). Após elaborar a resposta, deverá verificar novamente se todas as regras foram efetivamente aplicadas.

**IA-011 — Sincronização Conceitual**
Após a criação de um Prompt de Sincronização, o desenvolvimento continua normalmente. O projeto passa a considerar conceitualmente aquelas alterações como sincronizadas. Permanece apenas a pendência operacional de execução no OpenCode e validação do relatório. A sincronização nunca interrompe o desenvolvimento arquitetural.

**IA-012 — Especialização dos Prompts**
Toda sincronização deverá ser organizada por responsabilidade. Categorias oficiais: Domínio, Metodologia, Governança. Cada prompt altera apenas os documentos pertencentes à sua categoria.

**IA-013 — Pacotes de Sincronização**
Toda sincronização oficial deverá ocorrer através de um Pacote de Sincronização. Cada pacote poderá conter um ou mais prompts especializados. Somente o último prompt deverá solicitar o Relatório Consolidado Final.

**IA-014 — Classificação do Conhecimento**
Sempre que surgir uma ideia relevante durante o desenvolvimento, ela deverá obrigatoriamente receber uma classificação oficial antes do fim da Sprint. Categorias: Decisão, Hipótese, Evolução Planejada, Insight. Nenhuma ideia poderá permanecer apenas na conversa.

**IA-015 — Protocolo de Pré-Resposta**
Antes de qualquer resposta relacionada ao projeto, a IA deverá obrigatoriamente:
1. Validar o AI_CONTEXT.
2. Identificar a versão atual do projeto.
3. Identificar o documento atualmente em desenvolvimento.
4. Confirmar o último Pacote de Sincronização.
5. Confirmar que está utilizando a metodologia vigente.
6. Validar conformidade com IA-001 até IA-019.
7. Verificar se a resposta produz novo conhecimento arquitetural, metodológico ou operacional.
8. Registrar esse conhecimento na Auditoria da Sprint quando aplicável.

**IA-016 — Relatórios dos Pacotes de Sincronização**
Prompts intermediários não geram Relatório Consolidado. Apenas o último Prompt de cada Pacote de Sincronização gera o Relatório Consolidado Final. Os Prompts intermediários continuam atualizando normalmente a documentação e a governança. Ao concluir o último Prompt, o OpenCode exibe o Relatório Consolidado Final no chat e registra o resumo permanente em `project-context/SYNC_HISTORY.md`.

**IA-017 — Padronização dos Artefatos Reutilizáveis**
Garante consistência, legibilidade, reutilização, rastreabilidade e eliminação de ambiguidades em todos os artefatos reutilizáveis. Todo artefato deverá ser entregue em um único bloco Markdown autocontido, sem divisões ou explicações internas. Todo Prompt de Sincronização deverá conter identificação obrigatória (Pacote, Prompt, Título, Objetivo), delimitação de escopo explícita e declaração de encerramento (intermediário ou final).

**IA-018 — Governança de Pendências e Continuidade Operacional**
Garante que sugestões, decisões aprovadas, recomendações e melhorias identificadas durante as conversas não desapareçam. Formaliza Pendências de Governança (PG), Decisões Aprovadas Pendentes de Sincronização (DAPS), ciclo de vida obrigatório, separação entre conhecimento e trabalho, e encerramento formal de auditorias.

**IA-019 — Economia de Contexto**
Preserva conhecimento utilizando o menor volume de texto possível, sem perda de significado, rastreabilidade, executabilidade ou contexto necessário. Aplica-se à Auditoria da Sprint (apenas novos itens), Pendências Abertas (apenas ativos) e Fila de Sincronização (apenas próximos passos).

**IA-020 — Continuidade Operacional (PG-012, DAPS-001, DAPS-002)**
Toda PG ou DAPS aprovada deve permanecer visível até implementação ou encerramento. A IA deve monitorar a saúde do chat (🟢/🟡/🔴) e recomendar troca preventiva quando identificar degradação de contexto, excesso de complexidade ou risco de perda de rastreabilidade.

**IA-021 — Economia de Anexos e Painel de Progresso (PG-015, PG-016)**
DOCUMENTACAO_COMPLETA.md solicitado apenas em novo chat, grande evolução ou necessidade global. ZIP solicitado apenas para validação cruzada ou inspeção estrutural. Painel de Progresso compacto com estágio atual, evolução documental e próximos marcos.

**IA-022 — Padronização Metodológica (PG-013, PG-014, EP-001)**
Rastreabilidade obrigatória para INS, DEC, PG, DAPS, EP com unicidade e continuidade histórica. Respostas operacionais seguem: 📊 Auditoria da Sprint → 📋 Pendências Abertas → 📌 Fila de Sincronização. Maturidade documental: N0=20%, N1=40%, N2=60%, N3=80%, N4=90%, N5=100%.

**IA-023 — Inicialização Padronizada**
Sempre que um novo chat receber a baseline adequada, executar automaticamente PG-017. Apresentar diagnóstico inicial contendo: último PS, próximo PS, estado do Painel, pendências, recomendações abertas e saúde do chat.

**IA-024 — Persistência de Recomendações**
Aplicar PG-018. A IA deve manter recomendações abertas visíveis, impedir desaparecimento de recomendações aprovadas e registrar encerramento formal.

---

# 6. Knowledge Backlog

## Categorias Oficiais

| Código | Categoria | Descrição |
|--------|-----------|-----------|
| KB-T1 | Decisão | Conhecimento aprovado. Deve ser incorporado imediatamente. |
| KB-T2 | Hipótese | Conhecimento promissor em validação. |
| KB-T3 | Evolução Planejada | Melhoria válida com implementação adiada. |
| KB-T4 | Insight | Percepção relevante sem maturidade suficiente. |

## Status Oficiais

| Status | Descrição |
|--------|-----------|
| Planejado | Aguardando início da avaliação |
| Em Avaliação | Em análise para validação ou descarte |
| Validado | Confirmado, aguardando promoção |
| Promovido | Incorporado à documentação oficial |
| Arquivado | Avaliado e descartado ou substituído |

## Registros Ativos

| Código | Título | Categoria | Status |
|--------|--------|-----------|--------|
| KB-001 | Padronização da Evolução dos Working Drafts | KB-T3 | Planejado |
| KB-002 | Identificadores Permanentes para Conceitos do Domínio | KB-T4 | Planejado |
| KB-003 | Baseline Obrigatória da Conversa | KB-T3 | Planejado |
| KB-004 | Critérios Oficiais dos Níveis de Maturidade | KB-T3 | Planejado |
| KB-005 | Reposicionamento Conceitual do Portfolio Ledger | KB-T4 | Em Avaliação |

---

# 7. Working Drafts Ativos

| Documento | Versão | Nível | Status | Próximos Passos |
|-----------|--------|-------|--------|-----------------|
| 02_TRANSACTIONS.md | v0.92 | N1 → N5 (consolidando) | 🟡 Em elaboração | Promover a N5 |
| 03_TRANSACTION_INTERPRETATION.md | v0.70 | N4 (Integrado) | 🟢 Validado | Promover a N5 |
| TRACE_TRANSACTION.md | v0.30 | N2 (Consistente) | 🟢 Validado | Promover a N3 |
| 04_PORTFOLIO_LEDGER.md | v0.30 | N2 (Consistente) | 🟢 Validado | Promover a N3 |

<!-- PS#026A entry removed. Governance PS already consolidated in v2.1 history. -->
| 05_PORTFOLIO_ENGINE.md | v0.20 | N1 (Working Draft Consolidado) | 🟢 Validado | Promover a N2 |

---

# 8. Últimos Pacotes de Sincronização

| PS | Foco | Principais Entregas |
|----|------|---------------------|
| PS#007 | Domínio + Metodologia | 02_TRANSACTIONS.md v0.92 (N1, R1–R12), DEVELOPMENT_METHODOLOGY v1.2 (IA-008 a IA-013, Ciclos N0–N5, OA-001) |
| PS#008 | Interpretação Patrimonial | 03_TRANSACTION_INTERPRETATION.md v0.10→v0.60 (N0→N3), BR-030 a BR-037, 8 Casos, Conclusões |
| PS#009 | Gestão do Conhecimento | KNOWLEDGE_BACKLOG.md, IA-014, IA-008/IA-009 expandidas, Fluxo Oficial, Baseline da Conversa, Ciclo de Vida, KB-001 a KB-005 |
| PS#010 | Infraestrutura + Metodologia | AI_CONTEXT (v1.0→v1.2), IA-015, IA-016, Migração H:, Fluxo de Inicialização, WORKFLOW v1.3, DEVELOPMENT_METHODOLOGY v1.7 |
| PS#011 | Inicialização de Conversas | AGENTS.md com direcionamento ao AI_CONTEXT, IA-015 fortalecida, Fluxo de Inicialização detalhado, AI_CONTEXT v1.3 |
| PS#012 | Padronização dos Artefatos Reutilizáveis | IA-017 criada, IA-016 expandida (Relatório Operacional, Histórico Permanente), SYNC_HISTORY.md criado, DEVELOPMENT_METHODOLOGY v1.9, AI_CONTEXT v1.4 |
| PS#013 | Diretrizes Operacionais | Diretrizes Operacionais da Conversa adicionadas ao AI_CONTEXT (Auditoria Contínua, Fila Contínua, Preservação Preventiva, Distinção Conversa/Conhecimento, Continuidade Operacional, Análise Global, Suporte Não Técnico). AI_CONTEXT v1.5. |
| PS#014 | Trace Transaction | TRACE_TRANSACTION_ARCHITECTURE.md v1.0 criado. DOCUMENTATION_INDEX v2.3 (seção 7). |
| PS#015 | Governança de Pendências | IA-018 (PG, DAPS, ciclo de vida), IA-019 (Economia de Contexto), Padronização Visual, Critérios DOCUMENTACAO_COMPLETA.md e ZIP. DEVELOPMENT_METHODOLOGY v1.10. AI_CONTEXT v1.6. |
| PS#016 | Working Draft Trace Transaction | TRACE_TRANSACTION.md v0.10 (N0) criado. Documentação oficial: 39 documentos. |
| PS#017 | Evolução Trace Transaction N1 | TRACE_TRANSACTION.md N0→N1 (v0.20). Trace Identity, Eventos Compostos, Granularidade, Navegação Bidirecional. |
| PS#018 | Working Draft Portfolio Ledger | 04_PORTFOLIO_LEDGER.md v0.10 (N0) criado. Documentação oficial: 40 documentos. |
| PS#019 | Evolução Portfolio Ledger N1 | 04_PORTFOLIO_LEDGER.md N0→N1 (v0.20). Imutabilidade, Compensação, Reconstruibilidade. |
| PS#020 | Arquitetura Portfolio Engine | PORTFOLIO_ENGINE_ARCHITECTURE.md v1.0 criado (Contrato Arquitetural). Documentação oficial: 41 documentos. |
| PS#021 | Working Draft Portfolio Engine | 05_PORTFOLIO_ENGINE.md v0.10 (N0) criado. Documentação oficial: 42 documentos. |
| PS#022 | Consolidação da Governança | PG-012, DAPS-001, DAPS-002, PG-015, PG-016, EP-001, PG-013, PG-014. DEVELOPMENT_METHODOLOGY v1.11. AI_CONTEXT v1.7. |
| PS#023 | Painel de Progresso | PROJECT_PROGRESS_PANEL.md v1.0 criado. Documentação oficial: 43 documentos. AI_CONTEXT v1.8. |
| PS#024 | Evolução N3→N4 | 03_TRANSACTION_INTERPRETATION.md v0.70 (N4). Interpretation Identity, Cadeia, Navegação, Reconstruibilidade, Consistência. INV-I006 a INV-I010. AI_CONTEXT v1.9. |
| PS#025 | Evolução N1→N2 | TRACE_TRANSACTION.md v0.30 (N2). Ciclo de Vida, Tipos, Escopo, Reconstrução. INV-006 a INV-010. AI_CONTEXT v2.0. |
| PS#026A | Governança de Transição e Continuidade | PG-017 (Protocolo de Inicialização de Chat), PG-018 (Registro Persistente de Recomendações), DAPS-003 (Checklist de Transição), EP-002 (Baseline Mínima de Continuidade), IA-023, IA-024. DEVELOPMENT_METHODOLOGY v1.12. AI_CONTEXT v2.1. |
| PS#026 | Evolução Portfolio Ledger N1→N2 | 04_PORTFOLIO_LEDGER.md v0.30 (N2). Ciclo de Vida, Tipos, Escopo, Cadeia, Relações Avançadas. INV-L011 a INV-L015. Domínio 71,7%. Marco: Ledger ≥ N2 🟢. AI_CONTEXT v2.2. |
| PS#027 | Evolução Portfolio Engine N0→N1 | 05_PORTFOLIO_ENGINE.md v0.20 (N1). Ciclo de Vida, Reatividade, Temporalidade, Escopo, Relações. INV-E006 a INV-E010. Domínio 75,0%. **Marco de Implementação 🟢 ATINGIDO.** AI_CONTEXT v2.3. |

---

# 9. Próximas Prioridades

1. **Iniciar implementação** (Marco de Implementação 🟢 ATINGIDO)
2. **Criar demais Business Rules** (06 a 13)
3. **Avaliar KB-001 a KB-005** conforme surgirem oportunidades

---

# 10. Checklist de Baseline

Este checklist deve ser seguido obrigatoriamente sempre que uma nova conversa for iniciada.

- [ ] Recebi e li o AGENTS.md (ponto de entrada automático).
- [ ] Localizei e li o AI_CONTEXT (documento oficial de inicialização).
- [ ] Executei a Fase 0 (Baseline da Conversa).
- [ ] Executei o Protocolo de Pré-Resposta (IA-015).
- [ ] Identifiquei a versão atual do projeto.
- [ ] Identifiquei o documento em desenvolvimento (04_PORTFOLIO_LEDGER.md).
- [ ] Identifiquei o último Pacote de Sincronização aplicado (PS#027).
- [ ] Identifiquei a Fonte Canônica (H:\Lio Feliz).
- [ ] Identifiquei pendências abertas.
- [ ] Identifiquei Working Drafts ativos.
- [ ] Estou pronta para continuar exatamente do ponto onde o projeto foi interrompido.

---

# 11. Critérios de Consolidação

O AI_CONTEXT é construído a partir dos seguintes critérios:

- Informações críticas devem ser preservadas integralmente.
- Informações operacionais podem ser resumidas.
- Nenhuma decisão arquitetural pode existir apenas no AI_CONTEXT.
- O documento sempre deve refletir fielmente a documentação oficial.
- Todo o conteúdo é derivado exclusivamente de: docs/, PROJECT_CONTEXT.md, PROJECT_STATUS.md, WORKFLOW.md, DEVELOPMENT_METHODOLOGY.md e KNOWLEDGE_BACKLOG.md.

---

# 12. Diretrizes Operacionais da Conversa

## Auditoria Contínua

Durante a evolução do projeto, a IA deverá executar continuamente a Auditoria da Sprint (IA-008).

Sempre que forem identificados:
- Insights;
- Hipóteses;
- Decisões;
- Evoluções Planejadas;
- Descobertas arquiteturais relevantes;
- Descobertas metodológicas relevantes;

a IA deverá classificá-los explicitamente utilizando as categorias oficiais do projeto.

O objetivo é evitar que conhecimentos relevantes permaneçam apenas em conteúdo conversacional.

---

## Fila de Sincronização Contínua

Durante a evolução do projeto, a IA deverá manter continuamente a Fila de Sincronização (IA-009).

Sempre que uma descoberta indicar necessidade futura de atualização da documentação oficial, a IA deverá registrar explicitamente a recomendação na Fila de Sincronização.

O objetivo é garantir rastreabilidade entre descobertas realizadas durante a conversa e futuras sincronizações com o repositório oficial.

---

## Preservação Preventiva do Conhecimento

A IA deverá evitar que conhecimentos relevantes permaneçam apenas em mensagens conversacionais.

Sempre que apropriado, deverá sinalizar explicitamente:

- itens que merecem preservação;
- itens que merecem validação futura;
- itens que merecem promoção para documentação oficial;
- itens que representam apenas hipóteses ainda não validadas.

---

## Distinção entre Conversa e Conhecimento

A IA deverá diferenciar explicitamente:

- conteúdo conversacional;
- conhecimento arquitetural;
- conhecimento metodológico;
- conhecimento oficial;
- conhecimento candidato à sincronização.

O objetivo é facilitar futuras auditorias e reduzir risco de perda de contexto.

---

## Continuidade Operacional

Salvo quando houver motivo explícito para não fazê-lo, respostas que produzirem conhecimento relevante para o projeto deverão encerrar com:

- Auditoria da Sprint (IA-008);
- Fila de Sincronização (IA-009).

O objetivo é preservar rastreabilidade e continuidade entre sessões.

---

## Análise Global do Projeto

A IA deverá avaliar continuamente se o contexto disponível é suficiente para análises arquiteturais consistentes.

Quando identificar que:

- múltiplos documentos passaram a possuir forte dependência entre si;
- uma decisão exigir visão transversal de diversos módulos;
- houver necessidade de auditoria arquitetural ampla;
- houver risco de conclusões incorretas por insuficiência de contexto documental;
- houver necessidade de validação global de consistência;

a IA deverá recomendar explicitamente o envio de uma cópia completa do projeto (ZIP ou equivalente).

A recomendação deverá informar:

- o motivo da necessidade;
- os documentos potencialmente envolvidos;
- os benefícios esperados da análise global.

O envio do projeto completo deverá ser tratado como mecanismo complementar ao AI_CONTEXT, utilizado para análises aprofundadas e validações arquiteturais abrangentes.

---

## Suporte ao Usuário Não Técnico

A IA deverá considerar que o usuário não possui perfil técnico de desenvolvimento de software.

Sempre que forem produzidos:

- Prompts de Sincronização;
- Procedimentos operacionais;
- Artefatos reutilizáveis;
- Instruções destinadas ao OpenCode;

a IA deverá priorizar soluções que minimizem edições manuais.

Quando um Prompt ainda não tiver sido executado e receber alterações durante sua elaboração, a IA deverá fornecer uma nova versão completa e consolidada do Prompt.

Deverão ser evitadas instruções que exijam:

- localizar trechos manualmente;
- mesclar versões manualmente;
- editar documentos intermediários;
- reconstruir artefatos reutilizáveis.

O objetivo é garantir simplicidade operacional, reduzir risco de erro humano e manter conformidade com o princípio de artefatos autocontidos definido pela IA-017.

---

# 13. Continuidade Operacional

## DAPS-001 — Saúde do Chat

Níveis:
- 🟢 Saudável — Chat dentro da capacidade operacional recomendada.
- 🟡 Atenção — Chat ainda utilizável, porém acumulando complexidade.
- 🔴 Troca Recomendada — Chat próximo do limite operacional seguro.

Escala conceitual: 100% (recém-iniciado), 80% (confortável), 60% (atenção), 40% (troca recomendada), 20% (alto risco).

## DAPS-002 — Troca Planejada de Chat

Recomendar novo chat quando houver: degradação de contexto, complexidade excessiva, reexplicação recorrente, excesso de pacotes ou risco de perda de rastreabilidade. Recomendação preventiva, nunca corretiva.

## PG-017 — Protocolo de Inicialização de Chat

Fluxo oficial: 1. Ler AI_CONTEXT.md → 2. Identificar Último PS → 3. Identificar Próximo PS → 4. Ler PROJECT_PROGRESS_PANEL.md → 5. Carregar PGs, DAPS, EPs e PGRs abertos → 6. Avaliar Saúde do Chat anterior → 7. Apresentar Diagnóstico Inicial Compacto.

## PG-018 — Registro Persistente de Recomendações

Ciclo de vida: Aberta → Em Avaliação → Aprovada → Implementada/Descartada → Encerrada. Identificadores: PGR-001, PGR-002... Recomendações abertas visíveis nos diagnósticos; aprovadas permanecem até implementação; encerradas podem sair.

## DAPS-003 — Checklist de Transição de Chat

Antes da troca: ☐ AI_CONTEXT atualizado ☐ Último PS registrado ☐ Próximo PS definido ☐ PROJECT_PROGRESS_PANEL atualizado ☐ Pendências abertas atualizadas ☐ Recomendações abertas atualizadas ☐ Saúde do Chat registrada ☐ DOCUMENTACAO_COMPLETA regenerada (quando necessário).

## EP-002 — Baseline Mínima de Continuidade

Operação Normal: AI_CONTEXT.md. Auditoria Arquitetural: AI_CONTEXT.md + DOCUMENTACAO_COMPLETA.md. Revisão Estrutural Profunda: ZIP completo. Alinhado com PG-015.

---

# 14. Painel de Progresso

Compacto. Deve conter: estágio atual do projeto, evolução documental, próximos marcos.

Maturidade documental (EP-001): N0=20%, N1=40%, N2=60%, N3=80%, N4=90%, N5=100%.

---

# 15. Padronização Visual Operacional

Respostas operacionais obrigatoriamente na ordem:

```
📊 Auditoria da Sprint
📋 Pendências Abertas
📌 Fila de Sincronização
```

Indicadores: 🟢 Saudável, 🟡 Atenção, 🔴 Troca Recomendada.

---

# Histórico

## Versão 2.3

- PS#027: 05_PORTFOLIO_ENGINE.md evoluído para v0.20 (N1).
- Working Drafts ativos e prioridades atualizados.
- Último PS atualizado para PS#027.
- **Marco de Implementação 🟢 ATINGIDO.**

## Versão 2.2

- PS#026: 04_PORTFOLIO_LEDGER.md evoluído para v0.30 (N2).
- Working Drafts ativos e prioridades atualizados.
- Último PS atualizado para PS#026. Checklist atualizado.

## Versão 2.1

- PS#026A: PG-017 (Protocolo de Inicialização de Chat), PG-018 (Registro Persistente de Recomendações), DAPS-003 (Checklist de Transição), EP-002 (Baseline Mínima de Continuidade), IA-023, IA-024.
- DEVELOPMENT_METHODOLOGY atualizado para v1.12.

## Versão 2.0

- TRACE_TRANSACTION.md atualizado para v0.30 (N2).
- Working Drafts ativos e prioridades atualizados.
- Último PS atualizado para PS#025. Checklist atualizado.

## Versão 1.9

- 03_TRANSACTION_INTERPRETATION.md atualizado para v0.70 (N4).
- Working Drafts ativos e prioridades atualizados.
- Último PS atualizado para PS#024. Checklist atualizado.

## Versão 1.8

- PROJECT_PROGRESS_PANEL.md v1.0 adicionado como referência.
- Baseline atualizada: apresentar resumo compacto do Painel de Progresso quando relevante.
- Estado atual atualizado: documentação oficial 43 documentos, último PS#023.
- PS#023 registrado na tabela de Pacotes.

## Versão 1.7

- IA-020 adicionada (Continuidade Operacional — PG-012, DAPS-001, DAPS-002).
- IA-021 adicionada (Economia de Anexos e Painel de Progresso — PG-015, PG-016).
- IA-022 adicionada (Padronização Metodológica — PG-013, PG-014, EP-001).
- Working Drafts ativos atualizados: 04_PORTFOLIO_LEDGER.md e 05_PORTFOLIO_ENGINE.md adicionados.
- Último PS atualizado para PS#022. Checklist atualizado.
- Documentação oficial: 40 documentos. Project Context: 9 documentos.

## Versão 1.6

- IA-018 adicionada (Governança de Pendências e Continuidade Operacional — PG, DAPS, ciclo de vida, encerramento de auditorias).
- IA-019 adicionada (Economia de Contexto).
- Padronização Visual Operacional (📊📋📌) documentada.
- Critérios para recomendar DOCUMENTACAO_COMPLETA.md e ZIP formalizados.
- Último PS atualizado para PS#015. Checklist atualizado.

## Versão 1.5

## Versão 1.4

- IA-017 adicionada (Padronização dos Artefatos Reutilizáveis).
- IA-016 expandida (Relatório Operacional, Histórico Permanente em SYNC_HISTORY.md).
- Estado atual atualizado: Project Context 8 documentos, último PS#012.
- Checklist de Baseline atualizado para PS#012 e IA-017.
- PS#012 registrado.

## Versão 1.3

- Adicionada seção "Utilização" oficializando AI_CONTEXT como primeiro arquivo a ser lido.
- IA-015 fortalecida (localizar AI_CONTEXT como primeira ação, indisponibilidade como bloqueante).
- Fluxo de Inicialização detalhado (Leitura automática AGENTS.md → Localizar AI_CONTEXT → Ler → Baseline → Protocolo).
- PS#011 registrado.

## Versão 1.2

- AI_CONTEXT formalizado como documento oficial de inicialização das conversas com IA.
- Baseline atualizada para utilizar AI_CONTEXT como fonte primária.
- Adicionadas IA-015 (Protocolo de Pré-Resposta) e IA-016 (Relatórios).
- Adicionado Fluxo de Inicialização e referência à nova Fonte Canônica.
- Checklist de Baseline atualizado com novas etapas.
- PS#010 registrado como último Pacote de Sincronização.

## Versão 1.1

- Conteúdo consolidado: Estado Atual, Metodologia Oficial, Regras IA, Knowledge Backlog, Working Drafts, Pacotes, Prioridades, Checklist de Baseline, Critérios.
- Adicionada Filosofia do AI_CONTEXT.
- Documento funcional para inicialização de novas conversas.

## Versão 1.0

- Criação do documento derivado de integração com ChatGPT.
- Estrutura inicial definida (9 seções, conteúdo a ser preenchido).
