# Strategic Backlog — Lio Feliz

**Documento:** 09_STRATEGIC_BACKLOG.md

**Versão:** 0.13

**Maturidade:** N0 — Ideia

**Status:** Em Descoberta

**Última atualização:** 13/07/2026

---

**Aviso:** Repositório oficial de melhorias estratégicas aprovadas para implementação futura. Nenhuma melhoria aprovada pode depender exclusivamente da memória do chat.

---

# Ciclo de Vida dos BK

```
Proposto → Validado → Registrado → Planejado → Em Implementação → Concluído → Arquivado
```

---

# Backlog Atual

## BK-005 — PROJECT_MANIFEST.md

| Campo | Valor |
|-------|-------|
| Estado | Proposto |
| Descrição | Inventário técnico do projeto contendo documentos, dependências, versões e relações |
| Motivação | Centralizar informações de inventário atualmente dispersas |
| Benefícios | Visibilidade completa da estrutura técnica do projeto |
| Prioridade | Baixa |
| Bloqueios | Nenhum |
| Critério de revisão | Após estabilização do Engineering N1. Não implementar neste PS. |

---

## BK-006 — Licensing & Feature Access Layer

| Campo | Valor |
|-------|-------|
| Estado | Proposto |
| Descrição | Camada de licenciamento e controle de acesso a funcionalidades planos, assinatura, licenciamento e controle de funcionalidades |
| Motivação | Formalizar evolução futura da arquitetura para suportar comercialização |
| Benefícios | Arquitetura preparada para modelo de negócio sem reestruturação |
| Prioridade | Média |
| Bloqueios | Nenhum |
| Critério de revisão | Após estabilização do Engineering N1 e definição do modelo de negócio. |

---

## BK-007 — Comercialização

| Campo | Valor |
|-------|-------|
| Estado | Proposto |
| Descrição | Suporte a planos, assinatura, licenciamento e controle de funcionalidades para comercialização do sistema |
| Motivação | Registrar oficialmente a preparação arquitetural para modelo de negócio |
| Benefícios | Arquitetura preparada para comercialização sem reestruturação |
| Prioridade | Média |
| Bloqueios | Nenhum |
| Critério de revisão | Após definição do modelo de negócio e estabilização do Engineering N1. |

---

## BK-008 — GOV-001: Idioma Oficial da Documentação

| Campo | Valor |
|-------|-------|
| Estado | Concluído |
| Descrição | Formalizar português brasileiro como idioma oficial das especificações. Permitir inglês apenas para nomes próprios e terminologia oficialmente adotada. |
| Motivação | Padronização linguística da documentação |
| Benefícios | Consistência terminológica, eliminação de ambiguidades |
| Prioridade | Média |
| Bloqueios | Nenhum |
| Implementação | OP-013 adicionado ao DEVELOPMENT_METHODOLOGY.md. Bootstrap sincronizado. |
| Data | 13/07/2026 |

---

## BK-009 — GOV-002: Fluxo Oficial de Elaboração de PIs

| Campo | Valor |
|-------|-------|
| Estado | Concluído |
| Descrição | Formalizar o fluxo: Concepção Arquitetural → Engineering Review Conceitual → Redação da PI → Engineering Review Documental → Approved. |
| Motivação | Falta de registro formal do fluxo de criação de PIs |
| Benefícios | Clareza sobre o processo de maturação das PIs |
| Prioridade | Média |
| Bloqueios | Nenhum |
| Implementação | OP-014 adicionado ao DEVELOPMENT_METHODOLOGY.md. §10.1 referenciado. |
| Data | 13/07/2026 |

---

## BK-010 — GOV-003: Glossário Arquitetural Compartilhado

| Campo | Valor |
|-------|-------|
| Estado | Proposto |
| Descrição | Centralizar os conceitos arquiteturais utilizados pelas PIs em um glossário compartilhado |
| Motivação | Evitar dispersão de definições entre múltiplos documentos |
| Benefícios | Consistência entre PIs, facilidade de consulta |
| Prioridade | Baixa |
| Bloqueios | Nenhum |
| Critério de revisão | Após estabilização do Engineering N1. |

---

## BK-011 — GOV-004: Referências Normativas

| Campo | Valor |
|-------|-------|
| Estado | Proposto |
| Descrição | Padronização de referências normativas entre documentos |
| Motivação | Referências atualmente sem padrão formal |
| Benefícios | Rastreabilidade e consistência documental |
| Prioridade | Baixa |
| Bloqueios | Nenhum |
| Critério de revisão | Após estabilização do Engineering N1. |

---

## BK-012 — GOV-005: Política de Identificadores Arquiteturais

| Campo | Valor |
|-------|-------|
| Estado | Proposto |
| Descrição | Avaliar padronização da numeração de PAs, IAs e demais identificadores arquiteturais |
| Motivação | Possível conflito de numeração entre PIs |
| Benefícios | Padronização e rastreabilidade dos identificadores |
| Prioridade | Baixa |
| Bloqueios | Nenhum |
| Critério de revisão | Após estabilização do Engineering N1. |

---

# Backlog Concluído

## BK-001 — Simplificar AI_CONTEXT

| Campo | Valor |
|-------|-------|
| Estado | Concluído |
| Descrição | Reduzir AI_CONTEXT a Estado Operacional, Objetivos, Estado da Execução, Protocolos e Referências |
| Motivação | Documento estava excessivamente grande com duplicações desnecessárias |
| Benefícios | Menor consumo de contexto, manutenção simplificada |
| Prioridade | Baixa |
| Bloqueios | Nenhum |
| Critério de revisão | Implementado no PS#032 |

---

## BK-002 — Auditoria de Referências

| Campo | Valor |
|-------|-------|
| Estado | Concluído |
| Descrição | Executar auditoria completa das referências: último PS, versões, referências cruzadas, documentos oficiais, sincronização geral |
| Motivação | Garantir consistência documental após múltiplas emendas e PS |
| Benefícios | Documentação consistente e confiável |
| Prioridade | Baixa |
| Bloqueios | Nenhum |
| Critério de revisão | Implementado no PS#032 |

---

## BK-003 — Criação do Strategic Backlog

| Campo | Valor |
|-------|-------|
| Estado | Concluído |
| Descrição | Criar 09_STRATEGIC_BACKLOG.md como repositório oficial de melhorias estratégicas aprovadas |
| Motivação | Formalizar o repositório de melhorias que não podiam mais depender apenas da memória do chat |
| Benefícios | Rastreabilidade completa das melhorias estratégicas |
| Prioridade | Baixa |
| Bloqueios | Nenhum |
| Critério de revisão | Implementado no PS#032 |

---

## BK-004 — Registro Oficial do PROJECT_BOOTSTRAP

| Campo | Valor |
|-------|-------|
| Estado | Concluído |
| Descrição | Registrar PROJECT_BOOTSTRAP.md como documento oficial de inicialização rápida |
| Motivação | Formalizar a nova camada documental em todas as referências oficiais |
| Benefícios | Consistência documental e rastreabilidade |
| Prioridade | Baixa |
| Bloqueios | Nenhum |
| Critério de revisão | Implementado no PS#032 |

---

# Histórico

## v0.12

GOV-001 a GOV-005 registrados como BK-008 a BK-012. Pendências metodológicas formalizadas no backlog.

## v0.11

Classificação Arquitetural. BK-006 (Licensing & Feature Access Layer) e BK-007 (Comercialização) registrados como Strategic Backlog. Universalidade e Multi-Mercado classificados como Princípios Arquiteturais na Constituição.

## v0.10

Criação do Strategic Backlog. BK-001, BK-002, BK-003, BK-004 e BK-005 registrados. BKs concluídos movidos para "Backlog Concluído".
