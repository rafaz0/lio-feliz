# Readiness Criteria — Lio Feliz

**Documento:** 06_READINESS_CRITERIA.md

**Categoria:** Working Draft

**Versão:** 0.10

**Maturidade:** N0 — Ideia

**Status:** Em Descoberta

**Última atualização:** 12/07/2026

---

# 1. Objetivo

Este documento define os critérios mínimos que devem ser satisfeitos antes do início de qualquer Implementation Plan ou implementação relevante do projeto Lio Feliz.

Seu objetivo é impedir o início prematuro de implementações sem preparação adequada.

---

# 2. Escopo

O documento responde:

- O que significa uma implementação estar pronta para começar?
- Quais critérios mínimos devem ser atendidos?
- Como verificar a prontidão?
- Como relacionar a prontidão às dependências?
- Como registrar evidências de prontidão?

---

# 3. Princípios

### RC-001 — Prontidão Verificável

Todo critério de prontidão deve poder ser verificado objetivamente antes do início da implementação.

### RC-002 — Evidências Objetivas

Cada critério de prontidão deve ser acompanhado por evidências concretas que comprovem seu atendimento.

### RC-003 — Dependências Resolvidas

Nenhuma implementação pode iniciar enquanto existirem dependências não resolvidas.

### RC-004 — Pré-requisitos Completos

Todos os pré-requisitos documentais, arquiteturais e técnicos devem estar satisfeitos antes do início.

### RC-005 — Autorização para Início

A transição do estado Planejado para Execução exige autorização formal baseada na verificação dos critérios.

---

# 4. Critérios de Prontidão

Um Implementation Plan deverá verificar, no mínimo:

### Documentação disponível

Toda documentação necessária para a implementação deve existir e estar aprovada.

### Dependências resolvidas

Todas as dependências declaradas no plano devem estar no estado Resolvida conforme `05_DEPENDENCY_MANAGEMENT.md`.

### Arquitetura aprovada

A arquitetura que será implementada deve estar aprovada e documentada.

### Recursos preparados

Ambientes, ferramentas, acessos e demais recursos necessários devem estar disponíveis.

### Critérios claramente definidos

Os critérios de conclusão do plano devem estar definidos antes do início da execução.

---

# 5. Evidências

Cada critério de prontidão deverá possuir evidências verificáveis.

Exemplos de evidências:

- Documento aprovado com versão e status registrados
- Dependência marcada como Resolvida no sistema de gestão
- ADR ou decisão arquitetural registrada
- Checklist de ambiente preenchido e validado
- Critérios de conclusão documentados no plano

---

# 6. Relação com Dependency Management

Dependências resolvidas constituem um dos critérios obrigatórios de prontidão.

Um Implementation Plan não pode ser considerado pronto enquanto existir qualquer dependência no estado Pendente ou Bloqueada.

O estado das dependências é verificado conforme `05_DEPENDENCY_MANAGEMENT.md`.

---

# 7. Relação com Implementation Plans

Todo Implementation Plan deverá declarar explicitamente que atende aos critérios de prontidão antes do início da execução.

Esta declaração deve ser registrada formalmente e acompanhada das evidências correspondentes.

O Ciclo de Vida do plano (conforme `03_IMPLEMENTATION_PLAN.md`) transita de Planejamento para Execução somente após a verificação de prontidão.

---

# 8. Estado Atual

| Aspecto             | Valor                                         |
| ------------------- | --------------------------------------------- |
| Marco Atual         | Convergência Arquitetural                     |
| Sprint Atual        | PS#030                                        |
| Objetivo Atual      | Estruturar os critérios oficiais de prontidão |
| Critérios Definidos | 5 critérios mínimos                           |

Nenhum Implementation Plan foi submetido à verificação de prontidão até o momento.

---

# 9. Evolução Prevista

Versões futuras deste documento poderão incorporar:

- checklists automáticos;
- validações automatizadas;
- integração com os futuros Pacotes de Implementação (PI);
- indicadores quantitativos de prontidão.

---

# Histórico

## v0.10

Criação do Readiness Criteria. Estrutura inicial com 5 princípios, 5 critérios mínimos, modelo de evidências e relação com Dependency Management e Implementation Plans.
