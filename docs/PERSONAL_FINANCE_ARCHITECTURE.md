# Arquitetura da Gestão Financeira Integrada — Lio Feliz

**Documento:** PERSONAL_FINANCE_ARCHITECTURE.md

**Versão:** 1.0

**Última atualização:** 25/07/2026

**EWO:** EWO-036

**PI:** PI-016

**Documentos relacionados:**
- `ADR-009` — Decisão arquitetural de separação Carteira / Gestão Financeira
- `USER_FLOWS.md` — Fluxos de navegação da plataforma
- `APPLICATION_STATES.md` — Estados operacionais (Dashboard, Visitante, Demo, etc.)
- `MODULE_ARCHITECTURE.md` — Padrão de módulos reutilizáveis

---

## 1. Objetivo

Este documento define a arquitetura do módulo de **Gestão Financeira Integrada** da plataforma Lio Feliz.

Este módulo representa toda a vida financeira do usuário — não apenas investimentos.

Ele **não substitui** a Carteira de Investimentos.

Ele atua como um **domínio superior** que engloba e contextualiza os investimentos dentro do panorama financeiro completo do usuário.

---

## 2. Separação de Responsabilidades

### Carteira (Domínio Existente)

| Área | Descrição |
|------|-----------|
| Investimentos | Posição consolidada de ativos (ações, FIIs, BDRs, ETFs, stocks) |
| Proventos | Dividendos, JCP, rendimentos recebidos e projetados |
| Rentabilidade | Retorno vs. benchmarks (IBOV, IDIV, IFIX) |
| IRPF | Apuração mensal de imposto de renda |
| Rebalanceamento | Ajuste de alocação por classe/setor |
| Cobertura | Cobertura de proventos sobre despesas |
| Metas de investimento | Metas patrimoniais da carteira |

### Gestão Financeira (Novo Domínio)

| Área | Descrição |
|------|-----------|
| Contas bancárias | Múltiplas contas, saldos, instituições |
| Caixa | Saldo disponível para movimentação |
| Receitas | Salários, freelas, rendimentos externos |
| Despesas | Categorizadas por tipo, fixas vs. variáveis |
| Fluxo de caixa | Entradas vs. saídas mensais |
| Dívidas | Cartão de crédito, empréstimos, parcelamentos |
| Financiamentos | Casa, carro, etc. com saldo devedor e parcelas |
| Patrimônio líquido | Ativos - Passivos (visão consolidada) |
| Patrimônio global | Carteira + Imóveis + Caixa + Outros ativos |

---

## 3. Independência Arquitetural

**Regra obrigatória (R-PF-001):**

> A Carteira de Investimentos deve continuar funcionando integralmente sem a Gestão Financeira.

O novo módulo é **totalmente opcional**.

Nenhuma funcionalidade existente da Carteira pode depender de dados da Gestão Financeira.

A Gestão Financeira é um domínio complementar que se sobrepõe à Carteira apenas quando explicitamente ativado pelo usuário.

### Implicações

- Nenhuma query existente deve ser modificada para incluir dados financeiros
- Nenhum componente da Carteira deve importar módulos da Gestão Financeira
- O fluxo de operações (compra/venda) permanece inalterado sem a Gestão Financeira
- A camada de Presentation da Carteira não depende de dados financeiros

---

## 4. Integração Opcional

A integração entre Carteira e Gestão Financeira é controlada por uma configuração do usuário:

```
Ativar Gestão Financeira Integrada
  [ ] Desativada (padrão)
  [✓] Ativada
```

### Comportamento

| Estado | Efeito |
|--------|--------|
| **Desativada** (padrão) | Nenhuma funcionalidade da Carteira muda. A Gestão Financeira não aparece na navegação. |
| **Ativada** | A Carteira poderá sincronizar dados com o Patrimônio Global. Origens de recursos ficam disponíveis nas operações. O Dashboard exibe visão consolidada. |

### Flag de Configuração

```typescript
interface FinanceIntegrationConfig {
  enabled: boolean;               // Ativado/desativado
  autoSync: boolean;              // Sincronizar automaticamente
  includeInvestments: boolean;    // Incluir carteira no PL
  defaultIncomeSource: string;    // Origem padrão para compras
}
```

---

## 5. Fluxo Conceitual

```
Contas Bancárias
       │
       ▼
   Caixa (saldo disponível)
       │
       ▼
   Carteira de Investimentos
       │
       ▼
   Patrimônio Global
  (Carteira + Imóveis + Caixa + Outros)
       │
       ▼
   Relatórios Financeiros
  (Fluxo de caixa, PL, evolução patrimonial)
```

### Fluxo Detalhado: Compra de Ativo com Origem

```
1. Usuário registra compra de 10 VALE3 a R$ 68,20
2. Sistema pergunta: "Origem do recurso?"
   ├── Caixa (default)
   ├── Conta Bancária (especificar)
   ├── Venda de ativo (especificar)
   ├── Receita externa
   └── Outro
3. Sistema debita do Caixa (se Gestão Financeira ativada)
4. Carteira registra a operação (independente da origem)
5. Patrimônio Global é atualizado (se integração ativada)
```

---

## 6. Origem dos Recursos

Toda operação de compra na Carteira **poderá** informar a origem do recurso utilizado.

### Origens Suportadas

| Origem | Descrição |
|--------|-----------|
| `caixa` | Saldo disponível na Gestão Financeira |
| `conta_bancaria` | Transferência de conta bancária específica |
| `venda_ativo` | Recurso proveniente de venda de outro ativo |
| `receita_externa` | Aporte externo (salário, freela, etc.) |
| `outro` | Origem não categorizada |

### Rastreabilidade

A origem do recurso permitirá:
- Rastrear para onde o dinheiro foi (compra de ativos)
- Rastrear de onde o dinheiro veio (venda de ativos, receitas)
- Calcular fluxo de caixa consolidado (entradas vs. saídas)
- Gerar relatório de destinação de recursos

---

## 7. Patrimônio Global

### Indicadores Previstos

| Indicador | Fórmula | Fonte |
|-----------|---------|-------|
| Patrimônio líquido | Ativos totais - Passivos totais | Gestão Financeira + Carteira |
| Patrimônio bruto | Soma de todos os ativos | Gestão Financeira + Carteira |
| Patrimônio investido | Total aplicado na Carteira | Carteira |
| Caixa | Saldo disponível | Gestão Financeira |
| Renda fixa | Total em renda fixa | Carteira + Gestão Financeira |
| Renda variável | Total em ações, FIIs, stocks | Carteira |
| Imóveis | Valor estimado de imóveis | Gestão Financeira |
| Financiamentos | Saldo devedor total | Gestão Financeira |
| Passivos | Dívidas + financiamentos | Gestão Financeira |

### Cálculo do Patrimônio Líquido

```
PL = (Caixa + Carteira + Imóveis + Outros Ativos) - (Dívidas + Financiamentos + Passivos)
```

---

## 8. Princípios Arquiteturais

### R-PF-001 — Separação entre Investimentos e Finanças Pessoais

Carteira e Gestão Financeira são domínios distintos, com bounded contexts, modelos de dados e responsabilidades próprias. Nenhum depende do outro para funcionar.

### R-PF-002 — Sincronização Opcional

A integração entre os domínios é sempre opt-in. O usuário decide se deseja ou não conectar sua Carteira à Gestão Financeira.

### R-PF-003 — Ausência de Dependência Obrigatória

Nenhuma funcionalidade da Carteira pode depender de dados da Gestão Financeira. O sistema deve funcionar completamente sem ela.

### R-PF-004 — Rastreabilidade Completa

Toda movimentação financeira deve ser rastreável: origem → destino. O usuário deve conseguir responder "de onde veio esse dinheiro?" e "para onde foi esse dinheiro?".

### R-PF-005 — Evolução Incremental

A Gestão Financeira será implementada em ondas: começa com contas e caixa, evolui para receitas/despesas, depois patrimônio global. Cada onda é independente e funcional.

### R-PF-006 — Preservação da Carteira

A Carteira de Investimentos permanece como o módulo central da plataforma. A Gestão Financeira a complementa, não a substitui.

---

## 9. Roadmap Futuro

### PI-017 — Arquitetura da Gestão Financeira

- Definição completa dos bounded contexts
- Modelo de dados de contas bancárias, caixa, receitas, despesas
- ADRs específicos para decisões arquiteturais
- Interface de configuração de integração

### PI-018 — Primeira Implementação Funcional

- Módulo de contas bancárias (CRUD)
- Módulo de caixa (saldo, movimentações)
- Origem de recursos nas operações de compra
- Integração básica com a Carteira

### PI-019 — Fluxo de Caixa e Patrimônio Líquido

- Receitas e despesas (categorizadas)
- Fluxo de caixa mensal
- Cálculo de patrimônio líquido
- Relatório de evolução patrimonial global
- Dashboard financeiro consolidado

---

## 10. Histórico

### Versão 1.0 — 25/07/2026

- Criação do documento.
- Separação de responsabilidades Carteira vs. Gestão Financeira.
- 6 princípios arquiteturais (R-PF-001 a R-PF-006).
- Roadmap em 3 PIs (PI-017, PI-018, PI-019).
- Definição de integração opcional com flag de configuração.
