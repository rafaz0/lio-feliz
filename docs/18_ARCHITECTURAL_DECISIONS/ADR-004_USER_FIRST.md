# Lio Feliz - Documentação Oficial

# ADR-004: User First

**Status:** ✅ Aprovado

**Data:** 09/07/2026

---

## Contexto

Durante o desenvolvimento, decisões técnicas podem conflitar com a experiência do usuário.

Uma implementação mais rápida pode gerar uma interface confusa.

Uma arquitetura tecnicamente elegante pode ser difícil de usar.

---

## Problema

Como resolver conflitos entre conveniência de implementação e qualidade da experiência do usuário?

---

## Alternativas Consideradas

### Alternativa 1: Conveniência técnica primeiro

Escolher sempre a solução mais rápida ou mais simples de implementar.

Rejeitada porque prejudica a adoção e a satisfação do usuário.

### Alternativa 2: Equilíbrio sem regra clara

Decidir caso a caso, sem prioridade definida.

Rejeitada porque leva a inconsistências e decisões arbitrárias.

### Alternativa 3: User First (escolhida)

A experiência do usuário possui prioridade sobre conveniências de implementação.

Em caso de conflito, a melhor experiência para o usuário deve prevalecer.

---

## Decisão

A experiência do usuário tem prioridade sobre conveniências de implementação.

Isso significa:

- Se existirem duas soluções tecnicamente equivalentes, escolher a que proporcionar melhor experiência.
- A interface deve ser simples, intuitiva e clara.
- Sempre que houver dúvida entre uma interface bonita e uma interface clara, escolher a interface mais clara.
- O sistema deve ser intuitivo tanto para iniciantes quanto para experientes.

Entretanto, esta decisão não se sobrepõe à Integridade dos Dados. Consistência financeira sempre vem em primeiro lugar.

---

## Consequências

Positivas:

- Usuário satisfeito e com baixa curva de aprendizado.
- Maior adoção e retenção.

Negativas:

- Pode exigir mais esforço de desenvolvimento.
- Soluções tecnicamente mais simples podem ser preteridas.

---

## Documentos Relacionados

- `00_START_HERE.md` — princípio de Experiência do Usuário.
- `01_VISION.md` — simplicidade deve prevalecer sobre complexidade.
- `02_PROJECT_RULES.md` — interface deve ser simples e intuitiva.

---

## Histórico

| Data | Versão | Descrição |
|------|--------|-----------|
| 09/07/2026 | 1.0 | Criação do ADR. |
