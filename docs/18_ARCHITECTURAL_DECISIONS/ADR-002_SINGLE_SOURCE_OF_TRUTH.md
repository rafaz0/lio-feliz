# Lio Feliz - Documentação Oficial

# ADR-002: Single Source of Truth

**Status:** ✅ Aprovado

**Data:** 09/07/2026

---

## Contexto

Sistemas financeiros frequentemente calculam o mesmo valor em múltiplos lugares.

Patrimônio, preço médio e posições podem ser recalculados por diferentes módulos, gerando divergências.

O usuário pode editar manualmente valores calculados, criando inconsistências.

---

## Problema

Como garantir que todas as telas e módulos do sistema apresentem exatamente os mesmos valores para a mesma informação?

---

## Alternativas Consideradas

### Alternativa 1: Livre recálculo em qualquer módulo

Cada módulo recalcula o que precisa quando precisa.

Rejeitada porque leva a divergências e dificulta auditoria.

### Alternativa 2: Banco de dados como única fonte

Armazenar valores calculados no banco e consultá-los.

Rejeitada porque valores derivados (patrimônio, preço médio) ficam desatualizados se a fonte primária mudar.

### Alternativa 3: Single Source of Truth (escolhida)

Cada informação possui exatamente uma fonte oficial.

Dados derivados são sempre recalculados a partir de suas fontes, nunca editados manualmente.

---

## Decisão

Cada informação no sistema deve possuir uma única fonte oficial.

Exemplos:

| Informação | Fonte Oficial |
|------------|---------------|
| Movimentações | Lançamentos do usuário ou sincronização aprovada |
| Eventos Corporativos | Integrações externas ou cadastro controlado |
| Posições | Calculadas a partir das movimentações |
| Patrimônio | Calculado a partir das posições e cotações |
| Preço médio | Calculado exclusivamente pelas movimentações válidas |

Nenhum dado derivado pode ser editado manualmente.

---

## Consequências

Positivas:

- Consistência garantida entre todos os módulos.
- Auditoria simplificada.
- Remoção de divergências de cálculo.

Negativas:

- Obriga a ter uma engine centralizada de consolidação (Portfolio Consolidation Engine).
- Impede edição direta de valores derivados pelo usuário.

---

## Documentos Relacionados

- `06_BUSINESS_RULES/00_GLOBAL_RULES.md` — define o princípio de Fonte de Verdade.
- `07_TECHNICAL_ANNEXES/03_PORTFOLIO_CONSOLIDATION_ENGINE.md` — engine responsável por consolidar os dados.
- `06_BUSINESS_RULES/01_PORTFOLIO.md` — a carteira nunca realiza cálculos diretamente.

---

## Histórico

| Data | Versão | Descrição |
|------|--------|-----------|
| 09/07/2026 | 1.0 | Criação do ADR. |
