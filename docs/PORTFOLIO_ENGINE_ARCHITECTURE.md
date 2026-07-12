# Portfolio Engine Architecture

**Projeto:** Lio Feliz

**Documento:** PORTFOLIO_ENGINE_ARCHITECTURE.md

**Versão:** 1.0

**Status:** Working Draft

**Categoria:** Arquitetura Patrimonial

**Natureza:** Contrato Arquitetural de Consolidação Patrimonial

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 10/07/2026

---

# 1. Objetivo

Preservar os conceitos arquiteturais fundamentais do Portfolio Engine, identificados durante a análise do domínio, antes da criação do Working Draft oficial do componente.

Este documento não define implementação, algoritmos, estruturas de dados, modelos de persistência, APIs ou detalhes técnicos.

---

# 2. Problema Arquitetural

O Portfolio Ledger preserva Fatos Patrimoniais individuais. Entretanto, usuários e componentes consumidores normalmente necessitam conhecer o Estado Patrimonial atual — uma visão consolidada da situação patrimonial em determinado momento.

A diferença fundamental é:

- **Preservação histórica:** responsabilidade do Ledger. Manter cada Fato Patrimonial individual, imutável e rastreável.
- **Consolidação patrimonial:** responsabilidade do Engine. Transformar múltiplos Fatos Patrimoniais em um Estado Patrimonial coerente.

O Portfolio Engine existe para resolver este problema de consolidação, sem jamais se tornar a fonte primária da verdade patrimonial.

---

# 3. Conceitos Fundamentais

### Fonte Primária

O Portfolio Ledger é a fonte primária da verdade patrimonial. Todo Fato Patrimonial reside no Ledger. Nenhum componente pode criar ou alterar fatos sem passar pelo Ledger.

### Fonte Derivada

O Portfolio Engine é uma fonte derivada. Ele produz conhecimento derivado a partir dos Fatos Patrimoniais fornecidos pelo Ledger. Sua saída depende integralmente da integridade dos dados de entrada.

### Estado Patrimonial

Visão consolidada da situação patrimonial em determinado momento. O Estado Patrimonial é produzido pelo Engine a partir da agregação e processamento dos Fatos Patrimoniais do Ledger.

### Consolidação Patrimonial

Processo conceitual de transformação de múltiplos Fatos Patrimoniais em um Estado Patrimonial coerente. A consolidação respeita a ordem causal, o contexto econômico e as regras de derivação definidas pelo domínio.

### Derivação Patrimonial

O Engine não cria novos fatos. Ele deriva conhecimento a partir de fatos já existentes. Derivação inclui: agregação, ordenação, filtragem, aplicação de regras de negócio e transformação analítica.

### Reatividade

O Engine reage a alterações patrimoniais. Ele não participa da criação dessas alterações. Sempre que o Ledger registra um novo Fato Patrimonial, o Engine deve ser capaz de reagir e atualizar o Estado Patrimonial.

### Reconstruibilidade

O Estado Patrimonial pode ser reconstruído a partir do Ledger. Se todos os Fatos Patrimoniais estão preservados, o Engine pode reconstruir o Estado Patrimonial de qualquer momento temporal.

---

# 4. Princípios Arquiteturais

### Princípio 1 — O Engine não é fonte primária

O Engine não armazena Fatos Patrimoniais. Ele processa fatos fornecidos pelo Ledger. Nenhuma informação patrimonial deve existir exclusivamente no Engine.

### Princípio 2 — O Engine não altera Fatos Patrimoniais

O Engine é um consumidor. Ele não modifica, corrige ou compensa Fatos Patrimoniais. Correções são responsabilidade do Ledger.

### Princípio 3 — O Engine depende do Ledger

O Engine não funciona sem o Ledger. Todo processamento depende de Fatos Patrimoniais fornecidos pelo Ledger. Não existe Estado Patrimonial sem Fatos Patrimoniais.

### Princípio 4 — O Engine produz Estado Patrimonial

O resultado do Engine é o Estado Patrimonial consolidado. Este estado é derivado, não primário. Reflete a situação patrimonial em determinado momento com base nos Fatos Patrimoniais disponíveis.

### Princípio 5 — O Engine é reconstruível

Dado o mesmo conjunto de Fatos Patrimoniais, o Engine deve produzir o mesmo Estado Patrimonial. Reconstruibilidade é uma propriedade arquitetural do Engine.

---

# 5. Dependência Arquitetural

```
Transaction
    ↓
Interpretation
    ↓
Trace
    ↓
Ledger
    ↓
Engine
```

### Regras de Dependência

- O Ledger não depende do Engine. O Ledger funciona independentemente e não conhece a existência do Engine.
- O Engine depende do Ledger. O Engine consome Fatos Patrimoniais do Ledger para produzir Estado Patrimonial.
- Nenhum componente depende do Engine para registrar Fatos Patrimoniais.
- O Engine depende integralmente da integridade dos Fatos Patrimoniais fornecidos pelo Ledger.

---

# 6. Relação com o Trace

O Trace Transaction responde: **"Como chegamos aqui?"**

Ele preserva a cadeia causal que conecta cada Estado Patrimonial às operações que lhe deram origem.

O Engine não responde a esta pergunta. Ele depende do Trace para fornecer a rastreabilidade causal.

---

# 7. Relação com o Ledger

O Ledger responde: **"O que aconteceu?"**

Ele registra cada Fato Patrimonial individual, preservando o histórico completo de alterações patrimoniais.

O Engine consome os Fatos Patrimoniais do Ledger e os consolida em Estado Patrimonial.

---

# 8. Papel do Engine

O Engine responde: **"Como estamos agora?"**

Ele transforma múltiplos Fatos Patrimoniais em uma visão consolidada e coerente do patrimônio.

O Engine não responde:
- "O que aconteceu?" → Ledger
- "Como chegamos aqui?" → Trace
- "O que significa?" → Transaction Interpretation

---

# 9. Limites de Escopo

O Portfolio Engine **não** é responsável por:

- auditoria;
- interpretação;
- rastreabilidade;
- registro de fatos;
- relatórios;
- analytics;
- projeções;
- inteligência patrimonial.

Essas responsabilidades pertencem a outros componentes da arquitetura.

---

# 10. Índice de Evolução

Este documento servirá como base conceitual para futuras versões de:

`docs/05_PORTFOLIO_ENGINE.md`

O Working Draft oficial do Portfolio Engine deverá respeitar os conceitos, princípios e limites de escopo definidos neste Contrato Arquitetural.

---

# Histórico

## Versão 1.0

- Criação do documento arquitetural fundacional do Portfolio Engine.
- Natureza: Contrato Arquitetural de Consolidação Patrimonial.
- Definição dos conceitos fundamentais: Fonte Primária, Fonte Derivada, Estado Patrimonial, Consolidação, Derivação, Reatividade, Reconstruibilidade.
- Estabelecimento dos 5 princípios arquiteturais.
- Mapeamento da dependência arquitetural (Transaction → Ledger → Engine).
- Relações com Trace, Ledger e Papel do Engine formalizadas.
