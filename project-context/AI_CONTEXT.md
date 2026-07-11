# AI Context — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** AI_CONTEXT.md

**Versão:** 1.3

**Status:** APROVADO

**Categoria:** Project Context

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 10/07/2026

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
| **Documentação oficial** | 37 documentos |
| **Project Context** | 7 documentos |
| **Business Rules** | 9 criados (15 previstos) |
| **Technical Annexes** | 8 criados (13 previstos) |
| **ADRs** | 8 aprovados |
| **Product Backlog** | 21 FEATs (v1.4) |
| **Último PS concluído** | PS#011 — Inicialização de Conversas |
| **Documento em desenvolvimento** | 03_TRANSACTION_INTERPRETATION.md (v0.60, N3) |
| **Working Drafts ativos** | 02_TRANSACTIONS.md (v0.92, N1), 03_TRANSACTION_INTERPRETATION.md (v0.60, N3) |
| **Fonte Canônica** | H:\Lio Feliz |

**Principais pendências:**
- Criar demais Business Rules (06 a 13)
- Criar Technical Annexes pendentes (03 a 07)
- Criar documentos complementares (07 a 15)
- KB-001 a KB-005 no Knowledge Backlog
- Refinar 03_TRANSACTION_INTERPRETATION.md (N3)

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
6. Validar conformidade com IA-001 até IA-014.
7. Verificar se a resposta produz novo conhecimento arquitetural, metodológico ou operacional.
8. Registrar esse conhecimento na Auditoria da Sprint quando aplicável.

**IA-016 — Relatórios dos Pacotes de Sincronização**
Prompts intermediários não geram Relatório Consolidado. Apenas o último Prompt de cada Pacote de Sincronização gera o Relatório Consolidado Final. Os Prompts intermediários continuam atualizando normalmente a documentação e a governança.

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
| 02_TRANSACTIONS.md | v0.92 | N1 (Working Draft) | 🟡 Em elaboração | Consolidar Nível 2 |
| 03_TRANSACTION_INTERPRETATION.md | v0.60 | N3 (Integrado) | 🟡 Em elaboração | Refinar para N4 |

---

# 8. Últimos Pacotes de Sincronização

| PS | Foco | Principais Entregas |
|----|------|---------------------|
| PS#007 | Domínio + Metodologia | 02_TRANSACTIONS.md v0.92 (N1, R1–R12), DEVELOPMENT_METHODOLOGY v1.2 (IA-008 a IA-013, Ciclos N0–N5, OA-001) |
| PS#008 | Interpretação Patrimonial | 03_TRANSACTION_INTERPRETATION.md v0.10→v0.60 (N0→N3), BR-030 a BR-037, 8 Casos, Conclusões |
| PS#009 | Gestão do Conhecimento | KNOWLEDGE_BACKLOG.md, IA-014, IA-008/IA-009 expandidas, Fluxo Oficial, Baseline da Conversa, Ciclo de Vida, KB-001 a KB-005 |
| PS#010 | Infraestrutura + Metodologia | AI_CONTEXT (v1.0→v1.2), IA-015, IA-016, Migração H:, Fluxo de Inicialização, WORKFLOW v1.3, DEVELOPMENT_METHODOLOGY v1.7 |
| PS#011 | Inicialização de Conversas | AGENTS.md com direcionamento ao AI_CONTEXT, IA-015 fortalecida, Fluxo de Inicialização detalhado, AI_CONTEXT v1.3 |

---

# 9. Próximas Prioridades

1. **Refinar 03_TRANSACTION_INTERPRETATION.md** (Working Draft N3 → N4)
2. **Construir próximos Working Drafts** (04_PORTFOLIO_LEDGER.md, 05_PORTFOLIO_ENGINE.md)
3. **Criar demais Business Rules** (06 a 13)
4. **Criar Technical Annexes pendentes** (03_REBALANCING_ALGORITHMS a 07_PERFORMANCE_GUIDELINES)
5. **Criar documentos complementares** (07_PROJECT_CONTEXT.md a 15_PRODUCT_PHILOSOPHY.md)
6. **Avaliar KB-001 a KB-005** conforme surgirem oportunidades

---

# 10. Checklist de Baseline

Este checklist deve ser seguido obrigatoriamente sempre que uma nova conversa for iniciada.

- [ ] Recebi e li o AGENTS.md (ponto de entrada automático).
- [ ] Localizei e li o AI_CONTEXT (documento oficial de inicialização).
- [ ] Executei a Fase 0 (Baseline da Conversa).
- [ ] Executei o Protocolo de Pré-Resposta (IA-015).
- [ ] Identifiquei a versão atual do projeto.
- [ ] Identifiquei o documento em desenvolvimento (03_TRANSACTION_INTERPRETATION.md).
- [ ] Identifiquei o último Pacote de Sincronização aplicado (PS#011).
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

# Histórico

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
