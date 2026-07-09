# Lio Feliz - Documentação Oficial

# ADR-005: Mínimo de Ações do Usuário

**Status:** ✅ Aprovado

**Data:** 09/07/2026

---

## Contexto

Sistemas de gestão de investimentos frequentemente exigem que o usuário realize tarefas manuais repetitivas:

- atualizar cotações manualmente;
- lançar dividendum por dividendum;
- conferir eventos corporativos um a um;
- recalcular posições após cada operação.

Isso consome tempo, gera erros e afasta o usuário da plataforma.

---

## Problema

Como reduzir ao máximo a quantidade de ações manuais que o usuário precisa realizar para manter sua carteira atualizada?

---

## Alternativas Consideradas

### Alternativa 1: Usuário responsável por tudo

O usuário lança, atualiza e confere todas as informações manualmente.

Rejeitada porque contradiz a visão do projeto de automatizar processos.

### Alternativa 2: Automação total sem confirmação

O sistema executa todas as atualizações automaticamente sem qualquer intervenção.

Rejeitada porque pode gerar inconsistências não detectadas e frustração.

### Alternativa 3: Mínimo de ações com segurança (escolhida)

O sistema automatiza tudo que é seguro automatizar.

Quando há risco de inconsistência, solicita confirmação.

O usuário nunca é obrigado a realizar tarefas que o sistema pode executar.

---

## Decisão

O sistema deve reduzir ao máximo as ações manuais do usuário.

Automatizar sempre que seguro:

- cotações;
- dividendos;
- eventos corporativos;
- sincronizações;
- atualizações cadastrais.

Quando houver risco, solicitar confirmação.

O usuário nunca deve ser obrigado a sincronizar manualmente para utilizar o sistema.

Toda automação deve ser reversível e rastreável.

---

## Consequências

Positivas:

- Usuário mantém a carteira atualizada com mínimo esforço.
- Redução de erros manuais.
- Maior engajamento com a plataforma.

Negativas:

- Exige implementação robusta de automação (Orchestrator, Engines).
- Risco de automação incorreta se os dados de origem forem inconsistentes.

---

## Documentos Relacionados

- `00_START_HERE.md` — princípio de Automação.
- `01_VISION.md` — pilar da Automação.
- `06_BUSINESS_RULES/00_GLOBAL_RULES.md` — regras de automação e sincronização.
- `07_TECHNICAL_ANNEXES/05_ENGINE_ORCHESTRATOR.md` — coordenação das automações.
- `16_PRODUCT_BACKLOG.md` — FEAT-009: Atualizações Automáticas.

---

## Histórico

| Data | Versão | Descrição |
|------|--------|-----------|
| 09/07/2026 | 1.0 | Criação do ADR. |
