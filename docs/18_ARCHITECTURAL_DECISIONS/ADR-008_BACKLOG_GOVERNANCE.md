# Lio Feliz - Documentação Oficial

# ADR-008: Governança do Backlog

**Status:** ✅ Aprovado

**Data:** 09/07/2026

---

## Contexto

Funcionalidades do Lio Feliz são discutidas em conversas com IAs e com o usuário.

Sem um registro formal, decisões importantes se perdem.

Funcionalidades podem ser implementadas sem documentação prévia.

O escopo do produto pode crescer descontroladamente.

---

## Problema

Como garantir que toda funcionalidade implementada seja previamente aprovada, documentada e rastreável?

---

## Alternativas Consideradas

### Alternativa 1: Confiar na memória das conversas

Manter o backlog informalmente nas conversas com a IA.

Rejeitada porque IAs diferentes não compartilham memória e decisões se perdem.

### Alternativa 2: Backlog apenas mental do usuário

O usuário mantém o backlog em sua própria cabeça ou em notas pessoais.

Rejeitada porque a IA não tem acesso a essas informações e não pode consultá-las.

### Alternativa 3: Backlog documentado e governado (escolhida)

Toda funcionalidade aprovada é registrada em `16_PRODUCT_BACKLOG.md` com ID único, prioridade, categoria e status.

Nenhuma funcionalidade é implementada sem estar no backlog.

---

## Decisão

O backlog oficial do produto é o documento `16_PRODUCT_BACKLOG.md`.

Regras de governança:

1. Nenhuma funcionalidade pode ser implementada sem estar registrada no backlog.
2. Toda funcionalidade aprovada deve ser registrada imediatamente após sua aprovação.
3. Cada funcionalidade possui ID único (FEAT-NNN), prioridade, categoria e ciclo de vida.
4. O ciclo de vida obrigatório é: Ideia → Aprovada → Documentada → Em Desenvolvimento → Testes → Implementada.
5. Funcionalidades implementadas que ainda não possuem FEAT devem ser registradas retroativamente.
6. O backlog é um documento vivo, atualizado sempre que uma funcionalidade muda de status.

A matriz de rastreabilidade (`17_TRACEABILITY_MATRIX.md`) complementa o backlog relacionando cada FEAT às suas regras de negócio, anexos técnicos e implementação.

---

## Consequências

Positivas:

- Toda funcionalidade é rastreável desde a aprovação até a implementação.
- IAs e desenvolvedores consultam a mesma fonte.
- Impede crescimento descontrolado do escopo.
- Facilita priorização e planejamento.

Negativas:

- Exige disciplina para registrar funcionalidades imediatamente.
- Funcionalidades antigas precisam ser retroativamente cadastradas.

---

## Documentos Relacionados

- `16_PRODUCT_BACKLOG.md` — backlog oficial do produto.
- `17_TRACEABILITY_MATRIX.md` — matriz de rastreabilidade.
- `02_PROJECT_RULES.md` — documentação possui prioridade igual ao código.

---

## Histórico

| Data       | Versão | Descrição       |
| ---------- | ------ | --------------- |
| 09/07/2026 | 1.0    | Criação do ADR. |
