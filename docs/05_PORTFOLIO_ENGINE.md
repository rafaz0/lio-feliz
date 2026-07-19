# Portfolio Engine

**Projeto:** Lio Feliz

**Documento:** 05_PORTFOLIO_ENGINE.md

**Versão:** 0.20

**Status:** Working Draft

**Nível de Maturidade:** N1 — Working Draft Consolidado

**Categoria:** Arquitetura Patrimonial

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 11/07/2026

**Referência Conceitual:** PORTFOLIO_ENGINE_ARCHITECTURE.md

---

# 1. Objetivo

O Portfolio Engine transforma Fatos Patrimoniais preservados pelo Ledger em Estado Patrimonial consumível.

O Ledger preserva fatos individuais. Consumidores — incluindo usuários, componentes de interface e sistemas externos — necessitam de uma visão consolidada da situação patrimonial. O Engine existe para preencher essa lacuna.

---

# 2. Problema Arquitetural

O Ledger preserva Fatos Patrimoniais individuais de forma imutável e rastreável. Entretanto, consumidores normalmente não necessitam de fatos isolados — necessitam do Estado Patrimonial consolidado.

O Portfolio Engine resolve este problema sem jamais se tornar a fonte primária da verdade patrimonial.

---

# 3. Posicionamento Arquitetural

```
Transaction
    ↓
Transaction Interpretation
    ↓
Trace Transaction
    ↓
Portfolio Ledger
    ↓
Portfolio Engine
```

O Engine é um componente reativo responsável pela derivação e consolidação do Estado Patrimonial a partir dos Fatos Patrimoniais preservados pelo Portfolio Ledger.

---

# 4. Conceitos Fundamentais

### Estado Patrimonial

Representação consolidada e instantânea da situação patrimonial derivada dos Fatos Patrimoniais.

### Consolidação Patrimonial

Transformação de múltiplos Fatos Patrimoniais em uma visão consolidada.

### Derivação Patrimonial

Produção de conhecimento derivado a partir de fatos existentes. O Engine não cria novos fatos.

### Fonte Derivada

Natureza do Engine como consumidor da fonte primária (Ledger).

### Reatividade

Capacidade de reagir às alterações patrimoniais sem participar de sua criação.

### Reconstruibilidade

Possibilidade de reconstruir o Estado Patrimonial utilizando exclusivamente os Fatos Patrimoniais do Ledger.

---

# 5. Responsabilidades

O Portfolio Engine é responsável por:

- derivar Estado Patrimonial a partir dos Fatos Patrimoniais;
- consolidar posições patrimoniais;
- disponibilizar visão instantânea da situação patrimonial;
- reconstruir estados a partir do Ledger quando necessário.

---

# 6. Não Responsabilidades

O Portfolio Engine **não**:

- cria fatos patrimoniais;
- altera fatos patrimoniais;
- interpreta transações;
- executa auditoria;
- realiza rastreabilidade;
- produz relatórios;
- produz analytics;
- produz projeções;
- produz inteligência patrimonial.

---

# 7. Formação do Estado Patrimonial

```
Fatos Patrimoniais (Ledger)
    ↓
Consolidação (Engine)
    ↓
Estado Patrimonial
```

O Engine recebe Fatos Patrimoniais do Ledger, aplica a consolidação e produz o Estado Patrimonial.

---

# 8. Instantaneidade

O Estado Patrimonial representa uma fotografia patrimonial em determinado instante.

Não representa evolução temporal. A evolução é obtida comparando estados patrimoniais de instantes distintos.

---

# 9. Relação com Portfolio Ledger

Ledger = Fonte Primária

Engine = Fonte Derivada

O Ledger não depende do Engine. O Engine depende do Ledger. Trata-se de dependência unidirecional.

---

# 10. Relação com Trace Transaction

Trace responde: **"Como chegamos aqui?"**

Engine responde: **"Como estamos agora?"**

As duas perguntas são complementares. O Trace preserva a cadeia causal. O Engine consolida o resultado.

---

# 11. Ciclo de Vida do Estado Patrimonial

Formalização do ciclo de vida completo do estado patrimonial consolidado.

## 11.1 Formação

O estado patrimonial é formado a partir dos Fatos Patrimoniais registrados no Portfolio Ledger. O Engine consolida esses fatos, aplica derivações e produz uma representação agregada da situação patrimonial em um determinado instante.

## 11.2 Atualização

Novos fatos patrimoniais registrados no Ledger provocam evolução do estado consolidado. A atualização reflete o impacto dos novos fatos sem descartar o estado anterior. O estado evolui por acúmulo, nunca por substituição.

## 11.3 Consolidação

Processo de agregação patrimonial que transforma múltiplos fatos individuais em posições consolidadas. A consolidação não altera os fatos originais — ela os organiza em uma visão coerente do patrimônio.

## 11.4 Consulta

Mecanismos conceituais de acesso ao estado consolidado. A consulta permite recuperar o estado patrimonial em qualquer instante sem comprometer a integridade dos fatos subjacentes.

## 11.5 Reconstrução

Recriação do estado patrimonial a partir dos fatos registrados no Ledger. A reconstrução é consequência direta da preservação integral dos fatos patrimoniais e da capacidade de consolidação do Engine.

---

# 12. Reatividade Patrimonial

Comportamento reativo do Engine diante de mudanças patrimoniais.

## 12.1 Evento de Origem

Mudanças no estado consolidado são originadas exclusivamente por novos fatos patrimoniais registrados no Ledger. O Engine não inicia mudanças — ele reage a elas.

## 12.2 Propagação

O reflexo dos fatos patrimoniais no estado consolidado deve ser completo e consistente. Todo fato registrado no Ledger deve ter seu impacto refletido no estado produzido pelo Engine.

## 12.3 Consistência

Garantia de coerência entre o estado consolidado e os fatos patrimoniais que o originaram. Não pode haver divergência entre o conjunto de fatos e o estado consolidado derivado.

---

# 13. Temporalidade do Estado

Relação do Engine com as dimensões temporais do patrimônio.

## 13.1 Estado Atual

Representação patrimonial presente. Corresponde ao estado consolidado no instante mais recente, refletindo todos os fatos patrimoniais disponíveis.

## 13.2 Estado Histórico

Representação patrimonial em um instante passado. Obtido a partir do conjunto de fatos patrimoniais vigentes naquele momento, sem incluir fatos posteriores.

## 13.3 Estado Reconstruído

Representação recriada a partir da base patrimonial completa. A reconstrução temporal permite recuperar qualquer estado patrimonial passado desde que todos os fatos relevantes estejam preservados.

---

# 14. Escopo do Engine

Limites arquiteturais do Portfolio Engine.

## 14.1 Deve Pertencer

Responsabilidades obrigatórias do Engine:

- Derivar estado patrimonial a partir dos fatos do Ledger
- Consolidar posições patrimoniais
- Disponibilizar visão instantânea da situação patrimonial
- Reconstruir estados a partir do Ledger quando necessário

## 14.2 Pode Pertencer

Capacidades auxiliares que podem estar presentes:

- Indicadores de consistência patrimonial
- Métricas de cobertura entre fatos e estado consolidado
- Inferências patrimoniais não destrutivas

## 14.3 Não Pertence

Responsabilidades exclusivas de outros componentes:

- Criação ou alteração de fatos patrimoniais (Ledger)
- Interpretação de transações (Transaction Interpretation)
- Rastreabilidade causal (Trace Transaction)
- Relatórios, analytics, projeções (domínio analítico)

---

# 15. Relações Arquiteturais Avançadas

Integrações conceituais do Engine com os demais componentes da arquitetura.

### Transaction Interpretation

A Transaction Interpretation (03_TRANSACTION_INTERPRETATION.md) é a origem semântica dos fatos patrimoniais que alimentam o Engine. O Engine não interpreta eventos — ele consolida o resultado de interpretações já realizadas. A interpretação responde "o que este evento significa?". O Engine responde "qual o impacto consolidado no patrimônio?".

### Trace Transaction

O Trace Transaction (TRACE_TRANSACTION.md) fornece explicabilidade do estado patrimonial. Enquanto o Engine consolida o estado atual, o Trace preserva a cadeia causal que levou a esse estado. As duas perspectivas são complementares: o Trace mostra o caminho percorrido, o Engine mostra onde se está.

### Portfolio Ledger

O Portfolio Ledger (04_PORTFOLIO_LEDGER.md) é a fonte canônica patrimonial. O Engine depende integralmente do Ledger para obter os fatos patrimoniais que consolida. O Ledger não conhece o Engine. O Engine não persiste fatos. Trata-se de dependência unidirecional — a base da relação Fonte Primária / Fonte Derivada.

---

# 16. Invariantes Arquiteturais

### INV-E001

O Engine não é fonte primária.

### INV-E002

O Engine não altera Fatos Patrimoniais.

### INV-E003

Todo Estado Patrimonial deve ser derivável do Ledger.

### INV-E004

O Engine depende do Ledger.

### INV-E005

O Estado Patrimonial deve ser reconstruível.

### INV-E006 — Reatividade Patrimonial

O estado consolidado deve refletir adequadamente todos os fatos patrimoniais disponíveis no Ledger. Nenhum fato pode ser ignorado na formação do estado.

### INV-E007 — Consistência de Consolidação

A consolidação não pode produzir divergências patrimoniais. O estado consolidado deve ser coerente com o conjunto de fatos que o originou.

### INV-E008 — Reconstruibilidade do Estado

Estados patrimoniais passados devem ser reconstruíveis a partir do Ledger, utilizando exclusivamente os fatos patrimoniais preservados.

### INV-E009 — Dependência do Ledger

O Engine não deve se tornar fonte primária de verdade patrimonial. Toda informação patrimonial consolidada deve ser derivável do Ledger.

### INV-E010 — Integridade Temporal

Representações temporais do estado patrimonial (atual, histórico, reconstruído) devem permanecer consistentes entre si e com os fatos que as originaram.

---

# 17. Limites de Escopo

Indicadores, Analytics, Relatórios, Rentabilidade e Projeções não fazem parte deste documento.

Suas responsabilidades pertencem a outros componentes da arquitetura.

---

# Histórico

## Versão 0.20

- Evolução do Working Draft para N1 (Working Draft Consolidado).
- Adicionado Ciclo de Vida do Estado Patrimonial (§11): Formação, Atualização, Consolidação, Consulta, Reconstrução.
- Adicionada Reatividade Patrimonial (§12): Evento de Origem, Propagação, Consistência.
- Adicionada Temporalidade do Estado (§13): Estado Atual, Histórico, Reconstruído.
- Adicionado Escopo do Engine (§14): Deve/Pode/Não Pertence.
- Adicionadas Relações Arquiteturais Avançadas (§15): Transaction Interpretation, Trace Transaction, Portfolio Ledger.
- Adicionados INV-E006 a INV-E010 (Reatividade, Consistência, Reconstruibilidade, Dependência, Integridade Temporal).
- Seções renumeradas: antigos §11-§12 deslocados para §16-§17.

## Versão 0.10

- Criação do Working Draft inicial (N0).
- Definição do posicionamento arquitetural (Transaction → Ledger → Engine).
- Conceitos fundamentais: Estado Patrimonial, Consolidação, Derivação, Fonte Derivada, Reatividade, Reconstruibilidade.
- Responsabilidades e não responsabilidades formalizadas.
- Invariantes arquiteturais INV-E001 a INV-E005.
- Base conceitual extraída de PORTFOLIO_ENGINE_ARCHITECTURE.md.
