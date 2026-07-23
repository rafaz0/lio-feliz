# BR-17 — Educação (Glossário, Tooltips e Learning Paths)

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-010 (Onda 5 — Módulo 17)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Educação** do Lio Feliz. O módulo oferece um glossário enriquecido de termos financeiros, tooltips contextuais e trilhas de aprendizado para auxiliar o investidor de longo prazo.

Nenhum componente existente da interface é modificado para exibir tooltips — a injeção ocorre exclusivamente via `TooltipProvider` no Composition Root (NC-010-003).

---

## 2. Modelo de Domínio

### 2.1 `GlossaryTerm` (Entidade)

Um verbete do glossário.

| Atributo       | Tipo             | Regra                                 |
| -------------- | ---------------- | ------------------------------------- |
| `id`           | `GlossaryTermId` | Identificador único                   |
| `term`         | `string`         | Nome do termo (ex: "Dividendo", "DY") |
| `definition`   | `string`         | Definição completa                    |
| `category`     | `TermCategory`   | Categoria temática                    |
| `synonyms`     | `string[]`       | Sinônimos (busca alternativa)         |
| `relatedTerms` | `string[]`       | Termos relacionados                   |

### 2.2 `Tooltip` (Entidade)

Tooltip contextual associado a um componente da interface.

| Atributo          | Tipo              | Regra                                                        |
| ----------------- | ----------------- | ------------------------------------------------------------ |
| `id`              | `TooltipId`       | Identificador único                                          |
| `targetComponent` | `string`          | Identificador do componente alvo (ex: "dividend-yield-card") |
| `termKey`         | `string`          | Chave do termo glossário relacionado                         |
| `text`            | `string`          | Texto curto do tooltip                                       |
| `difficulty`      | `DifficultyLevel` | Nível de dificuldade                                         |

> **Nota:** Tooltip é exclusivamente fonte de dados. A renderização visual é feita pelo `TooltipProvider` (camada Presentation), sem modificar componentes existentes (NC-010-003).

### 2.3 `LearningPath` (Entidade)

Trilha de aprendizado com passos ordenados.

| Atributo      | Tipo              | Regra                                    |
| ------------- | ----------------- | ---------------------------------------- |
| `id`          | `LearningPathId`  | Identificador único                      |
| `name`        | `string`          | Nome da trilha (ex: "Começando em FIIS") |
| `description` | `string`          | Descrição da trilha                      |
| `steps`       | `string[]`        | Lista de chaves de termos na ordem       |
| `difficulty`  | `DifficultyLevel` | Nível de dificuldade                     |

### 2.4 Value Objects

**TermCategory**

```typescript
enum TermCategory {
  CONCEITO = "CONCEITO",
  TIPO_ATIVO = "TIPO_ATIVO",
  INDICADOR = "INDICADOR",
  ESTRATEGIA = "ESTRATEGIA",
  TRIBUTACAO = "TRIBUTACAO",
  MERCADO = "MERCADO",
}
```

**DifficultyLevel**

```typescript
enum DifficultyLevel {
  BASIC = "BASIC",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
```

---

## 3. Serviço de Domínio: `GlossaryIndexer`

| Método                   | Descrição                                                       |
| ------------------------ | --------------------------------------------------------------- |
| `lookup(term)`           | Retorna termos que correspondem exatamente ao termo ou sinônimo |
| `search(query)`          | Busca termos por substring no termo, definição ou sinônimos     |
| `getTooltips(component)` | Retorna tooltips associados a um componente específico          |

---

## 4. Invariantes

- **I-001 (Tooltip como fonte de dados):** `Tooltip` nunca é renderizado diretamente. É consumido exclusivamente pelo `TooltipProvider`.
- **I-002 (Termo único):** `term` em `GlossaryTerm` é único.
- **I-003 (Tooltip vinculado):** `Tooltip.termKey` deve referenciar um `GlossaryTerm` existente.
- **I-004 (Mínimo de passos):** `LearningPath.steps` deve conter ao menos 1 termo.

---

## 5. Não-escopo

- Renderização de tooltips (responsabilidade do `TooltipProvider` na Presentation)
- Conteúdo gerado por IA (apenas conteúdo curado manualmente)
- Gamificação ou progresso do usuário nas trilhas
- Tradução de termos para outros idiomas
