# Lio Feliz - Documentação Oficial

# ADR-007: Automação em Primeiro Lugar

**Status:** ✅ Aprovado

**Data:** 09/07/2026

---

## Contexto

Investidores de longo prazo realizam operações esporádicas, mas precisam de informações atualizadas constantemente.

Manualmente, isso exigiria:

- atualizar cotações diariamente;
- verificar dividendos pendentes;
- conferir eventos corporativos;
- recalcular posições e patrimônio.

O investidor não deve precisar executar essas tarefas.

---

## Problema

Como garantir que a automação seja tratada como requisito fundamental e não como funcionalidade secundária?

---

## Alternativas Consideradas

### Alternativa 1: Automação como feature futura

Primeiro implementar o funcionamento manual, depois automatizar.

Rejeitada porque gera dívida técnica: o manual vira o padrão e a automação nunca é priorizada.

### Alternativa 2: Automação como requisito de design (escolhida)

Toda funcionalidade deve ser projetada considerando a automação desde o início.

A interface manual existe como fallback, não como padrão.

---

## Decisão

A automação deve ser tratada como requisito fundamental de design, não como funcionalidade futura.

Toda funcionalidade deve ser projetada considerando:

- como será automatizada;
- quais dados de origem serão utilizados;
- como será feita a validação automática;
- como serão tratados conflitos;
- como o usuário será informado.

Automações implementadas:

| Processo             | Status                        |
| -------------------- | ----------------------------- |
| Cotações             | ✅ Automático via BRAPI/Yahoo |
| Dividendos           | ✅ Automático via BRAPI/Yahoo |
| Splits/Bonificações  | 🟡 Parcial                    |
| Eventos Corporativos | 🔴 Pendente                   |
| Rebalanceamento      | 🔴 Pendente                   |
| Imposto de Renda     | 🔴 Pendente                   |

A Engine Orchestrator (`07_TECHNICAL_ANNEXES/05_ENGINE_ORCHESTRATOR.md`) é a camada responsável por coordenar todas as automações.

---

## Consequências

Positivas:

- Sistema sempre atualizado com mínimo esforço do usuário.
- Automação tratada como cidadã de primeira classe na arquitetura.
- Redução de erros humanos.

Negativas:

- Maior complexidade inicial de implementação.
- Dependência de qualidade dos dados de origem para automação segura.
- Necessidade de fallback manual quando a automação falha.

---

## Documentos Relacionados

- `01_VISION.md` — pilar da Automação.
- `06_BUSINESS_RULES/00_GLOBAL_RULES.md` — diretrizes de automação.
- `07_TECHNICAL_ANNEXES/05_ENGINE_ORCHESTRATOR.md` — coordenação central.
- `07_TECHNICAL_ANNEXES/00_ENGINE_GUIDELINES.md` — padrões para engines.
- `16_PRODUCT_BACKLOG.md` — FEAT-009: Atualizações Automáticas.

---

## Histórico

| Data       | Versão | Descrição       |
| ---------- | ------ | --------------- |
| 09/07/2026 | 1.0    | Criação do ADR. |
