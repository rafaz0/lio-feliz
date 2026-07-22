# Lio Feliz - Documentação Oficial

# 07_TECHNICAL_ANNEXES/00_INDEX.md

**Projeto:** Lio Feliz

**Documento:** 07_TECHNICAL_ANNEXES/00_INDEX.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 07/07/2026

---

# Objetivo

Esta pasta reúne todos os anexos técnicos do Lio Feliz.

Os anexos técnicos complementam a documentação oficial descrevendo algoritmos, fórmulas matemáticas, pseudocódigo, fluxos internos, exemplos completos e decisões de implementação.

Enquanto as Regras de Negócio descrevem o comportamento esperado do sistema, os Anexos Técnicos descrevem como esse comportamento deverá ser implementado.

---

# Hierarquia

Em caso de conflito entre documentos, deverá ser seguida a seguinte prioridade:

1. 00_START_HERE.md
2. 01_VISION.md
3. 02_PROJECT_RULES.md
4. 03_PRODUCT_REQUIREMENTS.md
5. 04_DATA_MODEL.md
6. 05_SYSTEM_ARCHITECTURE.md
7. 06_BUSINESS_RULES/
8. 07_TECHNICAL_ANNEXES/

Os anexos técnicos nunca poderão alterar uma regra de negócio.

Eles apenas especificam sua implementação.

---

# Estrutura Inicial

07_TECHNICAL_ANNEXES/

00_INDEX.md

00_ENGINE_GUIDELINES.md

01_PRICE_AVERAGE_ALGORITHMS.md

02_CORPORATE_ACTION_ENGINE.md

03_PORTFOLIO_CONSOLIDATION_ENGINE.md

04_INSIGHT_ENGINE.md

05_ENGINE_ORCHESTRATOR.md

06_HEALTH_ENGINE.md

03_REBALANCING_ALGORITHMS.md

04_IR_CALCULATIONS.md

05_CORPORATE_ACTION_EXAMPLES.md

06_CURRENCY_CONVERSION.md

07_PERFORMANCE_GUIDELINES.md

08_BACKTEST_ALGORITHMS.md

09_ALERT_EVENTS.md

10_EXPORTACAO_FORMATOS.md

Novos anexos poderão ser adicionados futuramente.

---

# Objetivos dos Anexos

Cada anexo deverá conter sempre que possível:

- algoritmo completo;
- pseudocódigo;
- fórmulas;
- exemplos;
- casos extremos;
- exceções;
- impacto em outros módulos;
- justificativa técnica.

---

# Princípios

Os algoritmos deverão ser:

- determinísticos;
- reproduzíveis;
- auditáveis;
- independentes da interface;
- independentes do banco de dados.

---

# Histórico

## Versão 1.0

Criação da estrutura oficial dos anexos técnicos.
