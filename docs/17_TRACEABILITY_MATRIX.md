# 17_TRACEABILITY_MATRIX.md

Versão: 2.0
Status: Em desenvolvimento
Categoria: Governança
Responsável: Projeto Lio Feliz
Última atualização: 09/07/2026

---

# 1. Objetivo

Este documento tem como objetivo fornecer uma visão centralizada da rastreabilidade das funcionalidades do projeto Lio Feliz.

Cada funcionalidade cadastrada deverá possuir um identificador único e permanente, permitindo localizar rapidamente todas as suas especificações, regras de negócio, casos de uso, anexos técnicos, decisões arquiteturais e estado atual de desenvolvimento.

A Traceability Matrix não contém regras de negócio nem detalhes de implementação. Sua única responsabilidade é servir como mapa oficial da documentação do projeto.

---

# 2. Filosofia

Toda funcionalidade deve existir apenas uma vez como conceito.

As informações relacionadas a ela permanecem distribuídas em seus respectivos documentos especializados.

A Traceability Matrix apenas conecta essas informações, evitando duplicação de conteúdo e facilitando a navegação pela documentação.

---

# 3. Estrutura da Matriz

Cada linha representa uma funcionalidade.

Campos mínimos:

| Campo | Descrição |
|--------|-----------|
| ID | Identificador permanente da funcionalidade |
| Nome | Nome oficial |
| Prioridade | P1, P2, P3 ou P4 |
| Business Rules | Documento correspondente |
| Use Cases | Documento correspondente |
| Technical Annex | Documento correspondente |
| ADR | Decisão arquitetural relacionada |
| Status da Documentação | Situação da documentação |
| Status do Desenvolvimento | Situação da implementação |

---

# 4. Estados

## Documentação

Valores permitidos:

- 💡 Ideia
- 📝 Em documentação
- ✅ Documentada

## Desenvolvimento

Valores permitidos:

- ⏳ Não iniciada
- 🏗 Em desenvolvimento
- 🧪 Em testes
- ✅ Concluída
- 🚀 Produção

---

# 5. Prioridades

P1 — Essencial (MLP)

Funcionalidades obrigatórias para o lançamento.

P2 — Importante

Melhoram significativamente o produto.

P3 — Evolução

Serão implementadas em versões futuras.

P4 — Backlog

Ideias aprovadas, sem previsão de implementação.

---

# 6. Convenções

Cada funcionalidade utilizará um identificador permanente.

Exemplo:

FEAT-001

FEAT-002

FEAT-003

Esses identificadores deverão ser utilizados em toda a documentação oficial.

---

# 7. Processo de Atualização

A matriz deverá ser atualizada sempre que ocorrer qualquer um dos seguintes eventos:

- criação de uma nova funcionalidade;
- alteração de prioridade;
- criação de Business Rules;
- criação de Use Cases;
- criação de Technical Annexes;
- criação de ADRs;
- conclusão da implementação;
- entrada em produção.

---

# 8. Decisões de Projeto

- A Traceability Matrix é o mapa oficial da documentação.
- Não conterá regras de negócio.
- Não conterá detalhes técnicos.
- Não substituirá nenhum documento especializado.
- Todo novo módulo deverá ser registrado antes do início da implementação.

---

# Matriz de Rastreabilidade

Abaixo estão registradas as funcionalidades do Lio Feliz com seus respectivos identificadores, documentos relacionados e status atuais.

Novas funcionalidades deverão ser adicionadas seguindo a metodologia definida nas seções anteriores.

---

## FEAT-001

| Campo | Valor |
|-------|-------|
| Nome | Sistema de Assinaturas |
| Prioridade | P1 |
| Business Rules | — |
| Use Cases | — |
| Technical Annex | — |
| ADR | ADR-006 |
| Status da Documentação | 📝 Em documentação |
| Status do Desenvolvimento | ⏳ Não iniciada |

---

## FEAT-002

| Campo | Valor |
|-------|-------|
| Nome | Plano Gratuito |
| Prioridade | P1 |
| Business Rules | — |
| Use Cases | — |
| Technical Annex | — |
| ADR | ADR-006 |
| Status da Documentação | 📝 Em documentação |
| Status do Desenvolvimento | ⏳ Não iniciada |

---

## FEAT-003

| Campo | Valor |
|-------|-------|
| Nome | Plano Premium |
| Prioridade | P1 |
| Business Rules | — |
| Use Cases | — |
| Technical Annex | — |
| ADR | ADR-006 |
| Status da Documentação | 📝 Em documentação |
| Status do Desenvolvimento | ⏳ Não iniciada |

---

## FEAT-004

| Campo | Valor |
|-------|-------|
| Nome | Subscription Engine |
| Prioridade | P2 |
| Business Rules | — |
| Use Cases | — |
| Technical Annex | — |
| ADR | ADR-006 |
| Status da Documentação | 💡 Ideia |
| Status do Desenvolvimento | ⏳ Não iniciada |

---

## FEAT-005

| Campo | Valor |
|-------|-------|
| Nome | Integração Oficial com B3 |
| Prioridade | P2 |
| Business Rules | `06_BUSINESS_RULES/11_IMPORT_EXPORT.md` (🔴) |
| Use Cases | — |
| Technical Annex | — |
| ADR | — |
| Status da Documentação | 💡 Ideia |
| Status do Desenvolvimento | ⏳ Não iniciada |

---

## FEAT-006

| Campo | Valor |
|-------|-------|
| Nome | Vida Financeira |
| Prioridade | P2 |
| Business Rules | `06_BUSINESS_RULES/12_INTEGRATIONS.md` (🔴) |
| Use Cases | — |
| Technical Annex | — |
| ADR | ADR-003 |
| Status da Documentação | 📝 Em documentação |
| Status do Desenvolvimento | ⏳ Não iniciada |

---

## FEAT-007

| Campo | Valor |
|-------|-------|
| Nome | Integração Carteira ↔ Vida Financeira |
| Prioridade | P2 |
| Business Rules | `06_BUSINESS_RULES/01_PORTFOLIO.md` ✅ |
| Use Cases | — |
| Technical Annex | — |
| ADR | ADR-003 |
| Status da Documentação | 📝 Em documentação |
| Status do Desenvolvimento | ⏳ Não iniciada |

---

## FEAT-008

| Campo | Valor |
|-------|-------|
| Nome | Notificações Inteligentes |
| Prioridade | P2 |
| Business Rules | — |
| Use Cases | — |
| Technical Annex | `07_TECHNICAL_ANNEXES/04_INSIGHT_ENGINE.md` ✅ |
| ADR | — |
| Status da Documentação | 📝 Em documentação |
| Status do Desenvolvimento | ⏳ Não iniciada |

---

## FEAT-009

| Campo | Valor |
|-------|-------|
| Nome | Atualizações Automáticas |
| Prioridade | P1 |
| Business Rules | `06_BUSINESS_RULES/03_MARKET_DATA.md` ✅ |
| Use Cases | UC-001, UC-002, UC-003 |
| Technical Annex | `07_TECHNICAL_ANNEXES/02_CORPORATE_ACTION_ENGINE.md` ✅, `07_TECHNICAL_ANNEXES/05_ENGINE_ORCHESTRATOR.md` ✅ |
| ADR | ADR-005, ADR-007 |
| Status da Documentação | ✅ Documentada |
| Status do Desenvolvimento | 🏗 Em desenvolvimento |

---

## FEAT-010

| Campo | Valor |
|-------|-------|
| Nome | Feature Flags por Plano |
| Prioridade | P2 |
| Business Rules | — |
| Use Cases | — |
| Technical Annex | — |
| ADR | ADR-006 |
| Status da Documentação | 💡 Ideia |
| Status do Desenvolvimento | ⏳ Não iniciada |

---

# Histórico

## Versão 2.0

Reestruturação do documento: metodologia e matriz de rastreabilidade passam a coexistir no mesmo documento. Adicionada seção "Matriz de Rastreabilidade" com FEAT-001 a FEAT-010.

## Versão 1.0

Criação do documento.
