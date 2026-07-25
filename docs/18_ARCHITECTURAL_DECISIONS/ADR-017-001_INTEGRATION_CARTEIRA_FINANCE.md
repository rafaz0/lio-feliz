# Lio Feliz - Documentação Oficial

# ADR-017-001: Arquitetura de Integração entre Carteira e Gestão Financeira

**Status:** ✅ Aprovado

**Data:** 25/07/2026

---

## Contexto

A PI-017 (Arquitetura da Gestão Financeira) definiu a Gestão Financeira como um domínio complementar opcional, com bounded contexts próprios (Contas, Caixa, Receitas, Despesas, Dívidas, Patrimônio Global). As EWOs 041 e 042 implementaram a fundação: Contas, Caixa, Receitas e Despesas.

A próxima etapa natural é permitir que a Carteira de Investimentos e a Gestão Financeira troquem informações de forma controlada — por exemplo, registrar a origem dos recursos de uma compra, ou consolidar o patrimônio total do usuário.

No entanto, essa comunicação entre domínios independentes precisa de uma arquitetura clara que preserve o isolamento, evite dependências circulares e mantenha a Carteira funcionando sem a Gestão Financeira.

O ADR-009 já estabeleceu a separação de domínios. O ADR-017-002 estabeleceu a política de feature flags. Este ADR completa o trio definindo **como** a integração ocorre quando ativada.

---

## Problema

Como permitir que a Carteira de Investimentos e a Gestão Financeira troquem informações sem:

- criar dependência direta entre os domínios;
- violar o princípio de isolamento (R-PF-001, R-PF-003);
- introduzir acoplamento temporário ou circular;
- comprometer a integridade dos dados de cada domínio;
- exigir modificações na Carteira quando a integração está desativada.

---

## Decisão

### Decisão 1: Integração Orientada a Eventos com Camada de Mediação

Adotar uma arquitetura de **mediação** entre os dois domínios, utilizando uma camada intermediária (`FinanceIntegrationService`) que orquestra a comunicação sem que os domínios se conheçam.

```
Carteira (domínio origem)
    │
    │  (1) Operação registrada (compra/venda/dividendo)
    ▼
FinanceIntegrationService  ← ativado apenas se FinanceIntegrationConfig.enabled = true
    │
    │  (2) Sincroniza com Gestão Financeira
    ▼
Gestão Financeira (domínio destino)
    ├── Caixa (débito/crédito)
    ├── Patrimônio Global (consolidação)
    └── Origem de recursos (rastreabilidade)
```

### Regras da Decisão

1. **A Carteira nunca chama a Gestão Financeira diretamente.** Toda comunicação passa pelo `FinanceIntegrationService`.
2. **O `FinanceIntegrationService` só é carregado quando `FinanceIntegrationConfig.enabled = true`.** Quando desativado, zero overhead.
3. **A Gestão Financeira nunca chama a Carteira.** Ela apenas recebe dados sincronizados.
4. **A sincronização é unidirecional (Carteira → Gestão Financeira).** A Gestão Financeira não modifica a Carteira.
5. **A leitura de dados da Carteira para o Patrimônio Global é feita através dos repositórios existentes da Carteira**, não via acoplamento direto.

---

## Fluxo de Integração

### Integração Manual (primeira versão)

Na primeira implementação (EWO-043), a sincronização será **manual e explícita**:

```
1. Usuário registra compra de 10 VALE3 a R$ 68,20
2. Sistema pergunta: "Origem do recurso?" (campo adicional no formulário)
3. Usuário seleciona: Caixa / Conta Bancária / Venda de ativo / Receita externa / Outro
4. Carteira registra a operação normal (independente da origem)
5. FinanceIntegrationService.onBuyOperation(operation, source) é chamado
6. Gestão Financeira debita o valor do Caixa (se source = "cash")
7. Transação é registrada no extrato da conta de origem
```

### Sincronização Automática (futura)

Em versões futuras, a sincronização automática poderá ser ativada via `FinanceIntegrationConfig.autoSync`:

```
1. Toda operação na Carteira dispara um evento interno
2. FinanceIntegrationService escuta e processa automaticamente
3. Caixa é atualizado sem intervenção do usuário
4. Usuário pode revisar as movimentações no extrato
```

---

## Ownership

| Informação | Dono | Acesso pela Gestão Financeira |
|-----------|------|-------------------------------|
| Ativos (ações, FIIs, ETFs) | Carteira | Leitura (via repositório) |
| Operações (compra/venda) | Carteira | Leitura (via integração) |
| Proventos (dividendos, JCP) | Carteira | Leitura (via integração) |
| Contas bancárias | Gestão Financeira | Escrita própria |
| Caixa (saldo disponível) | Gestão Financeira | Escrita própria + sincronizada |
| Receitas | Gestão Financeira | Escrita própria |
| Despesas | Gestão Financeira | Escrita própria |
| Dívidas e financiamentos | Gestão Financeira | Escrita própria |
| Patrimônio Global | Gestão Financeira (cálculo) | Leitura da Carteira + dados próprios |

---

## Estratégia de Integração

### Isolamento

- Cada domínio possui seus próprios repositórios e banco de dados.
- Nenhuma foreign key entre tabelas de domínios diferentes.
- A camada de mediação (`FinanceIntegrationService`) é o único ponto de contato.

### Desacoplamento

- `FinanceIntegrationService` implementa uma interface (`IFinanceIntegrationService`).
- A Carteira depende apenas da interface, não da implementação concreta.
- Quando a integração está desativada, um `NullFinanceIntegrationService` (no-op) é injetado.

### Prevenção de Dependências Circulares

- A comunicação é estritamente **unidirecional**: Carteira → Gestão Financeira.
- A Gestão Financeira **nunca** inicia comunicação com a Carteira.
- Para leitura de dados da Carteira (Patrimônio Global), a Gestão Financeira acessa os repositórios da Carteira diretamente, não via serviço.

---

## Eventos

A integração expõe os seguintes pontos de extensão (eventos arquiteturais):

| Evento | Gatilho | Ação na Gestão Financeira |
|--------|---------|---------------------------|
| `onBuyOperation` | Compra de ativo | Débito do Caixa (se origem informada) |
| `onSellOperation` | Venda de ativo | Crédito do Caixa |
| `onDividendReceived` | Provento recebido | Crédito do Caixa |
| `syncPortfolioToGlobalWealth` | Solicitação explícita | Atualiza Patrimônio Global |

---

## Resolução de Conflitos

| Cenário | Estratégia |
|---------|------------|
| Saldo do Caixa insuficiente para compra | Aviso ao usuário. A compra é registrada na Carteira mesmo assim (R-PF-003). A sincronização do Caixa falha mas não bloqueia a operação. |
| Duplicidade de sincronização | Operações sincronizadas possuem identificador único (`operationId`). A Gestão Financeira ignora operações já processadas (idempotência). |
| Exclusão de operação na Carteira | A sincronização registra uma movimentação de estorno na Gestão Financeira. |

---

## Impacto Arquitetural

| Camada | Impacto |
|--------|---------|
| **DDD** | Nenhum. A mediação respeita bounded contexts. |
| **Clean Architecture** | Nenhum. `FinanceIntegrationService` é um service de Application Layer. |
| **CQRS** | Nenhum. A integração usa commands (onBuyOperation, etc.) — compatível com CQRS. |
| **Experience Layer** | Nenhum. A Experience Layer não é alterada. |
| **FinanceIntegrationConfig** | ADR-017-002 respeitado. A integração só ativa quando `enabled = true`. |

### Componentes Preservados

- `BankAccount`, `CashTransaction` — inalterados.
- `IncomeEntry`, `ExpenseEntry` — inalterados.
- `ModuleLayout`, `ModuleTabs` — inalterados.
- `Dashboard` — inalterado (novos blocos futuros).

### Componentes Novos (previstos para EWO-043)

| Componente | Tipo |
|-----------|------|
| `IFinanceIntegrationService` | Interface |
| `FinanceIntegrationService` | Implementação concreta |
| `NullFinanceIntegrationService` | No-op para quando desativado |

---

## Consequências

### Positivas

- Integração controlada e auditável.
- Carteira permanece completamente independente quando desativada.
- Zero overhead quando a feature flag está desligada.
- Sincronização unidirecional elimina risco de loops.
- Idempotência protege contra duplicidade.

### Negativas

- A sincronização manual adiciona um passo extra no fluxo de compra.
- A leitura direta de repositórios da Carteira pela Gestão Financeira (para PL) quebra parcialmente o isolamento estrito, mas é necessária para o cálculo do Patrimônio Global.
- O `NullFinanceIntegrationService` adiciona complexidade de injeção de dependência.

### Neutras

- A evolução para sincronização automática exigirá mecanismo de eventos (futuro).

---

## Referências

- `architecture-lab/PI-017.md` — Arquitetura da Gestão Financeira (§8 Integração, §14 ADR-017-001).
- `architecture-lab/ER-017.md` — Engineering Review (R01 — criar ADR-017-001).
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-009_PERSONAL_FINANCE_SEPARATION.md` — Separação de domínios.
- `docs/18_ARCHITECTURAL_DECISIONS/ADR-017-002_FEATURE_FLAGS_AND_FINANCE_INTEGRATION_CONFIG.md` — Feature flags.
- `docs/PERSONAL_FINANCE_ARCHITECTURE.md` — Documento de origem.
- R-PF-001, R-PF-002, R-PF-003 — Princípios de independência.
