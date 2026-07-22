# BR-20 — Perfil do Investidor

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-011 (Onda 6 — Módulo 20)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Perfil do Investidor** do Lio Feliz. O módulo permite ao usuário responder a um questionário de risco e obter uma classificação de perfil (Conservador, Moderado, Arrojado), que pode ser utilizada por funcionalidades futuras de recomendação e personalização.

O `RiskClassifier` é parametrizável e baseado em 8 perguntas objetivas no padrão ANBIMA.

---

## 2. Modelo de Domínio

### 2.1 `InvestorProfile` (Entidade)

Perfil consolidado do investidor.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `InvestorProfileId` | Identificador único |
| `userId` | `string` | ID do usuário |
| `riskLevel` | `RiskLevel` | CONSERVADOR, MODERADO, ARROJADO |
| `investmentHorizon` | `InvestmentHorizon` | CURTO_PRAZO, MEDIO_PRAZO, LONGO_PRAZO |
| `totalPortfolioValue` | `number` | Valor total da carteira (via IProjectionRepository) |
| `createdAt` | `Date` | Data de criação |
| `updatedAt` | `Date` | Data da última atualização |

### 2.2 `RiskQuestionnaire` (Entidade)

Questionário respondido pelo usuário.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `RiskQuestionnaireId` | Identificador único |
| `profileId` | `string` | Perfil associado |
| `answers` | `Answer[]` | Respostas do questionário |
| `totalScore` | `number` | Pontuação total calculada |
| `riskLevel` | `RiskLevel` | Nível de risco resultante |

### 2.3 `RiskResult` (Entidade)

Resultado de uma classificação de risco.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `RiskResultId` | Identificador único |
| `profileId` | `string` | Perfil associado |
| `riskLevel` | `RiskLevel` | Nível classificado |
| `score` | `number` | Pontuação obtida |
| `generatedAt` | `Date` | Data da classificação |

### 2.4 Value Objects

**RiskLevel**: `CONSERVADOR`, `MODERADO`, `ARROJADO`

**InvestmentHorizon**: `CURTO_PRAZO` (≤2 anos), `MEDIO_PRAZO` (2-5 anos), `LONGO_PRAZO` (>5 anos)

**Answer**: questionId (`string`), value (`number` 0-4), weight (`number`)

---

## 3. Questionário (8 Perguntas ANBIMA)

| # | Pergunta | Opções (0-4) |
|---|----------|-------------|
| 1 | Qual o seu objetivo principal com os investimentos? | Preservar patrimônio (0) / Gerar renda (1) / Crescimento moderado (2) / Crescimento agressivo (3) / Máximo retorno (4) |
| 2 | Em quanto tempo você pretende utilizar os recursos investidos? | < 1 ano (0) / 1-2 anos (1) / 2-5 anos (2) / 5-10 anos (3) / > 10 anos (4) |
| 3 | Qual percentual do seu patrimônio total está investido em renda variável? | Não invisto (0) / Até 25% (1) / 25-50% (2) / 50-75% (3) / Acima de 75% (4) |
| 4 | Como você reagiria a uma queda de 20% na sua carteira? | Venderia tudo (0) / Venderia parte (1) / Manteria (2) / Compraria mais um pouco (3) / Compraria muito mais (4) |
| 5 | Qual seu nível de conhecimento sobre investimentos? | Nenhum (0) / Básico (1) / Intermediário (2) / Avançado (3) / Profissional (4) |
| 6 | Qual a origem dos recursos que você investe? | Reserva de emergência (0) / Excedente mensal pequeno (1) / Excedente mensal regular (2) / Renda variável estável (3) / Patrimônio consolidado (4) |
| 7 | Com que frequência você acompanha seus investimentos? | Não acompanho (0) / Anualmente (1) / Mensalmente (2) / Semanalmente (3) / Diariamente (4) |
| 8 | Qual a sua tolerância a oscilações de curto prazo? | Muito baixa (0) / Baixa (1) / Moderada (2) / Alta (3) / Muito alta (4) |

---

## 4. Classificação de Risco

O `RiskClassifier.calculateRiskTotal(answers)` → `RiskResult`:

```
score = Σ(answer.value × answer.weight) / Σ(answer.weights) × 100

 0-33  → CONSERVADOR
34-66  → MODERADO
67-100 → ARROJADO
```

O `RiskClassifier.classify(answers, totalPortfolioValue?)` também pode opcionalmente receber `totalPortfolioValue` de `IProjectionRepository` para enriquecer a classificação.

---

## 5. Invariantes

- **I-001 (8 perguntas):** O questionário deve conter exatamente 8 respostas.
- **I-002 (Score 0-100):** O score normalizado está sempre entre 0 e 100.
- **I-003 (Nível único):** `RiskLevel` é mutuamente exclusivo — apenas um nível por classificação.
- **I-004 (Horizonte derivado):** `InvestmentHorizon` pode ser inferido da questão 2 ou informado manualmente.

---

## 6. Não-escopo

- Recomendação automática de alocação com base no perfil (futuro)
- Integração com módulo de carteira recomendada (futuro)
- Questionário dinâmico com perguntas adaptativas (apenas 8 fixas)

---

## 7. Dependências

- `IProjectionRepository` — para enriquecimento com `totalPortfolioValue`
- `IInvestorProfileRepository` — novo port com 6 métodos
