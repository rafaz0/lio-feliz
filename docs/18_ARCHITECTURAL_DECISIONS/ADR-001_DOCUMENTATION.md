# Lio Feliz - Documentação Oficial

# ADR-001: Documentação como Fonte de Verdade

**Status:** ✅ Aprovado

**Data:** 09/07/2026

---

## Contexto

O projeto Lio Feliz possui uma equipe reduzida e depende de assistência de IA para desenvolvimento.

Sem uma documentação centralizada, as decisões ficam dispersas em conversas, perdendo-se com o tempo.

IAs diferentes podem receber contextos diferentes, gerando inconsistências.

---

## Problema

Como garantir que todas as IAs e desenvolvedores possuam o mesmo entendimento do projeto, independentemente de quando ou por quem foram contratados?

---

## Alternativas Consideradas

### Alternativa 1: Código como única fonte de verdade

Confiar exclusivamente no código para documentar decisões.

Rejeitada porque o código expressa *como* algo foi implementado, não *por que* foi decidido dessa forma.

### Alternativa 2: README.md como documentação principal

Manter toda documentação em um único README.

Rejeitada porque documentos longos são difíceis de navegar e raramente lidos por completo.

### Alternativa 3: Documentação como fonte de verdade (escolhida)

Manter documentação organizada em múltiplos arquivos, cada um com responsabilidade única.

---

## Decisão

A documentação oficial localizada na pasta `docs/` é a autoridade máxima sobre regras de negócio, arquitetura e comportamento esperado do sistema.

Toda IA ou desenvolvedor deve ler a documentação completa antes de qualquer alteração.

A documentação possui prioridade igual ao código.

Nenhuma alteração significativa pode ocorrer sem a correspondente atualização da documentação.

---

## Consequências

Positivas:

- Todas as IAs partem da mesma base de conhecimento.
- Decisões ficam registradas permanentemente.
- Novos integrantes podem se contextualizar rapidamente.

Negativas:

- Exige disciplina para manter a documentação atualizada.
- A documentação precisa ser verificada regularmente contra o código.

---

## Documentos Relacionados

- `00_START_HERE.md` — define a ordem de leitura obrigatória.
- `02_PROJECT_RULES.md` — documentação possui prioridade igual ao código.
- `DOCUMENTATION_INDEX.md` — índice oficial de todos os documentos.

---

## Histórico

| Data | Versão | Descrição |
|------|--------|-----------|
| 09/07/2026 | 1.0 | Criação do ADR. |
