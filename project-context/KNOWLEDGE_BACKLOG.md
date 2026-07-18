# Knowledge Backlog — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** KNOWLEDGE_BACKLOG.md

**Versão:** 1.3

**Status:** APROVADO

**Categoria:** Project Context

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 10/07/2026

---

# 1. Objetivo

Registrar conhecimentos relevantes que ainda não foram promovidos para documentação oficial.

Seu objetivo é preservar descobertas, hipóteses, evoluções metodológicas e insights arquiteturais, garantindo que nenhuma informação importante dependa da memória da conversa.

---

# 2. Classificação Oficial

| Categoria | Código | Descrição |
|-----------|--------|-----------|
| Decisão | KB-T1 | Conhecimento aprovado. Deve ser incorporado imediatamente à documentação oficial. |
| Hipótese | KB-T2 | Conhecimento promissor, porém ainda em validação. Deve permanecer registrado até sua aprovação ou descarte. |
| Evolução Planejada | KB-T3 | Melhoria considerada válida, mas cuja implementação foi adiada. Permanece registrada para futura avaliação. |
| Insight | KB-T4 | Percepção relevante ainda sem maturidade suficiente. Permanece registrada para evitar perda de conhecimento. |

---

# 3. Status do Conhecimento

Os registros do Knowledge Backlog deverão possuir, independentemente da Categoria, um Status oficial.

| Status | Descrição |
|--------|-----------|
| Planejado | Conhecimento identificado, aguardando início da avaliação. |
| Em Avaliação | Conhecimento em análise para validação ou descarte. |
| Validado | Conhecimento confirmado, aguardando promoção ou implementação. |
| Promovido | Conhecimento incorporado à documentação oficial. |
| Arquivado | Conhecimento avaliado e descartado ou substituído. |

Categoria e Status possuem responsabilidades distintas:

- **Categoria** responde: "O que este conhecimento representa?"
- **Status** responde: "Em que estágio de maturidade este conhecimento se encontra?"

---

# 4. Estrutura Padrão dos Registros

Todo registro do Knowledge Backlog deverá utilizar a seguinte estrutura:

- Código
- Título
- Categoria
- Status
- Origem
- Documento Relacionado
- Descrição
- Motivação
- Histórico
- Observações

---

# 5. Backlog

## KB-001

**Código:** KB-001

**Título:** Padronização da Evolução dos Working Drafts

**Categoria:** KB-T3 — Evolução Planejada

**Status:** Planejado

**Origem:** OA-001

**Documento Relacionado:** DEVELOPMENT_METHODOLOGY.md

**Descrição:** Os documentos de domínio tendem naturalmente a evoluir seguindo quatro etapas:

1. Estrutura
2. Conceitos Fundamentais
3. Business Rules
4. Casos de Validação

Registrar esta metodologia como possível padrão para futuros documentos.

**Motivação:** O processo de evolução dos Working Drafts segue um padrão consistente na prática, mas ainda não foi formalizado como metodologia oficial.

**Histórico:** Registrado durante o PS#009 Prompt A.

**Observações:** Nenhuma.

---

## KB-002

**Código:** KB-002

**Título:** Identificadores Permanentes para Conceitos do Domínio

**Categoria:** KB-T4 — Insight

**Status:** Planejado

**Origem:** OA-001

**Documento Relacionado:** 04_DATA_MODEL.md

**Descrição:** Avaliar futuramente a criação de identificadores permanentes para Conceitos Fundamentais do Domínio (ex.: DC-001, DC-002...), separados das Business Rules e dos Objetivos Arquiteturais.

**Motivação:** Facilitar rastreabilidade e referência cruzada entre documentos do domínio.

**Histórico:** Registrado durante o PS#009 Prompt A.

**Observações:** Nenhuma.

---

## KB-003

**Código:** KB-003

**Título:** Baseline Obrigatória da Conversa

**Categoria:** KB-T3 — Evolução Planejada

**Status:** Planejado

**Origem:** PS#009

**Documento Relacionado:** DEVELOPMENT_METHODOLOGY.md

**Descrição:** Toda nova sessão baseada em documentação deverá iniciar com uma Fase 0 de carregamento da Baseline antes de qualquer discussão arquitetural.

**Motivação:** Garantir que a IA esteja sempre alinhada com o estado mais recente do projeto antes de tomar decisões arquiteturais.

**Histórico:** Registrado durante o PS#009 Prompt C.

**Observações:** A Fase 0 já foi incorporada ao DEVELOPMENT_METHODOLOGY.md §11.

---

## KB-004

**Código:** KB-004

**Título:** Critérios Oficiais dos Níveis de Maturidade

**Categoria:** KB-T3 — Evolução Planejada

**Status:** Planejado

**Origem:** OA-001

**Documento Relacionado:** DEVELOPMENT_METHODOLOGY.md

**Descrição:** Formalizar critérios objetivos para evolução dos Working Drafts entre N0 e N5.

Proposta inicial:

- N0 — Estrutura
- N1 — Conceitos
- N2 — Business Rules
- N3 — Casos de Validação
- N4 — Revisão Arquitetural
- N5 — Pronto para versão 1.0

**Motivação:** O processo já está consolidado na prática, porém ainda não foi formalizado.

**Histórico:** Registrado durante o PS#009 Prompt D.

**Observações:** Nenhuma.

---

## KB-005

**Código:** KB-005

**Título:** Reposicionamento Conceitual do Portfolio Ledger

**Categoria:** KB-T4 — Insight

**Status:** Em Avaliação

**Origem:** OA-001

**Documento Relacionado:** 03_TRANSACTION_INTERPRETATION.md

**Descrição:** Durante o desenvolvimento do OA-001 observou-se que o núcleo do domínio passou a ser a Interpretação Patrimonial. O Portfolio Ledger passou a ser entendido como um consumidor da Interpretação Oficial. Este insight deverá ser validado durante o desenvolvimento dos documentos 04_PORTFOLIO_LEDGER.md e 05_PORTFOLIO_ENGINE.md. Somente após essa validação poderá ser promovido para documentação oficial.

**Motivação:** Insight identificado durante a análise arquitetural do Pacote de Sincronização #008.

**Histórico:** Registrado durante o PS#009 Prompt D.

**Observações:** Nenhuma.

---

## KB-006

**Código:** KB-006

**Título:** PortfolioHistoryCalculator — Otimização Incremental

**Categoria:** KB-T3 — Evolução Planejada

**Status:** Planejado

**Origem:** Slice 8 — Implementação

**Documento Relacionado:** `src/core/domain/portfolio/portfolio-history.ts`

**Descrição:** O `PortfolioHistoryCalculator.calculate()` reconstrói o Projector do zero para cada snapshot, resultando em complexidade O(n²) no número de eventos. Para portfólios com centenas de eventos, a abordagem é funcional, porém ineficiente.

Solução proposta: permitir que o Projector seja injetado ou mantido incrementalmente entre snapshots, reutilizando o estado projetado do passo anterior em vez de reprojetar todo o histórico a cada evento.

**Motivação:** Evitar degradação de performance em portfólios com grande volume histórico de eventos.

**Histórico:** Registrado durante a Slice 8 (EWO-002).

**Observações:** A implementação atual é correta e suficiente para volumes esperados (centenas de eventos). A otimização deve ser considerada se o volume de eventos crescer significativamente.

---

# Histórico

## Versão 1.3

- Adicionado KB-006 (PortfolioHistoryCalculator — Otimização Incremental).

## Versão 1.2

- Adicionada seção "Status do Conhecimento" com 5 status oficiais.
- Adicionada seção "Estrutura Padrão dos Registros" com 10 campos obrigatórios.
- KB-001, KB-002 e KB-003 migrados para estrutura padronizada.
- Adicionados KB-004 e KB-005.

## Versão 1.1

- Adicionado KB-003 (Baseline Obrigatória da Conversa).

## Versão 1.0

- Criação do documento.
- Definição das 4 categorias oficiais (KB-T1 a KB-T4).
- Primeiras entradas: KB-001 e KB-002.
