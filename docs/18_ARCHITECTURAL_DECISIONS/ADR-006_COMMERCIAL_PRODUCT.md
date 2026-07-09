# Lio Feliz - Documentação Oficial

# ADR-006: Produto Comercial

**Status:** ✅ Aprovado

**Data:** 09/07/2026

---

## Contexto

O Lio Feliz é desenvolvido como um produto comercial, não como um projeto pessoal ou open source.

Isso implica a necessidade de:

- planos de assinatura;
- modelo Free para aquisição de usuários;
- modelo Premium para receita recorrente;
- controle de acesso por funcionalidade;
- escalabilidade para múltiplos usuários pagantes.

---

## Problema

Como estruturar o sistema para suportar um modelo comercial com planos Free e Premium sem comprometer a arquitetura ou a experiência do usuário?

---

## Alternativas Consideradas

### Alternativa 1: Produto gratuito com doações

Manter o produto totalmente gratuito, financiado por doações.

Rejeitada porque não sustenta o desenvolvimento de longo prazo.

### Alternativa 2: Produto pago único

Cobrar uma taxa única de acesso vitalício.

Rejeitada porque não gera receita recorrente para manutenção contínua.

### Alternativa 3: Assinatura com planos Free e Premium (escolhida)

Modelo Freemium:

- Plano Gratuito: recursos básicos, sem comprometer a experiência.
- Plano Premium: todos os recursos avançados mediante assinatura mensal/anual.
- Feature Flags por plano para controle de acesso.

---

## Decisão

O Lio Feliz deve ser estruturado como um produto comercial com modelo de assinatura.

Isso implica:

- Planos Free e Premium bem definidos.
- Feature Flags controladas por plano.
- Subscription Engine para autenticação, planos, permissões, renovação e cancelamento.
- Período de testes para novos usuários experimentarem recursos Premium.
- Nenhuma funcionalidade essencial da gestão patrimonial pode ficar restrita ao plano Premium de forma que torne o plano Free inutilizável.

A decisão de quais funcionalidades são Free vs Premium deve ser documentada e reavaliada periodicamente.

---

## Consequências

Positivas:

- Modelo de negócio sustentável.
- Aquisição de usuários via plano gratuito.
- Receita recorrente para evolução contínua.

Negativas:

- Complexidade adicional (Subscription Engine, Feature Flags).
- Decisões difíceis sobre o que é Free vs Premium.
- Risco de canibalização se o plano Free for muito generoso.

---

## Documentos Relacionados

- `15_PRODUCT_PHILOSOPHY.md` — princípios filosóficos do produto.
- `16_PRODUCT_BACKLOG.md` — FEAT-001 a FEAT-004, FEAT-010.
- `17_TRACEABILITY_MATRIX.md` — rastreamento das features comerciais.

---

## Histórico

| Data | Versão | Descrição |
|------|--------|-----------|
| 09/07/2026 | 1.0 | Criação do ADR. |
