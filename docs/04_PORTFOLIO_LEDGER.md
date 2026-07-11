# Portfolio Ledger

**Projeto:** Lio Feliz

**Documento:** 04_PORTFOLIO_LEDGER.md

**Versão:** 0.10

**Status:** Working Draft

**Nível de Maturidade:** N0 — Working Draft Inicial

**Categoria:** Arquitetura Patrimonial

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 10/07/2026

---

# 1. Objetivo

O Portfolio Ledger é o Registro Canônico de Fatos Patrimoniais do sistema Lio Feliz.

Sua finalidade é preservar verdades patrimoniais já interpretadas e torná-las disponíveis para consumo pelos componentes posteriores da arquitetura.

O Ledger não processa, interpreta, calcula, projeta ou gera relatórios. Ele registra e preserva.

---

# 2. Problema Arquitetural

Após a interpretação econômica de uma operação (03_TRANSACTION_INTERPRETATION.md), o sistema precisa de um componente responsável por registrar e preservar os fatos patrimoniais resultantes de forma íntegra, rastreável e consumível.

O problema central que o Ledger resolve é:

- Onde os fatos patrimoniais são registrados após a interpretação?
- Como garantir que o registro seja íntegro e rastreável?
- Como disponibilizar esses fatos para consumo por componentes posteriores sem que o Ledger se torne um processador?

Sem um Ledger formal, os fatos patrimoniais seriam registrados de forma ad hoc, comprometendo a integridade e a rastreabilidade da cadeia causal patrimonial.

---

# 3. Conceitos Fundamentais

### Fato Patrimonial

Alteração patrimonial reconhecida pelo domínio após a interpretação econômica de uma operação.

Exemplos conceituais:
- aumento de posição;
- redução de posição;
- geração de renda;
- incorporação patrimonial;
- alteração patrimonial derivada de evento corporativo.

### Registro Patrimonial

Representação persistente de um Fato Patrimonial no Ledger.

Cada registro possui vínculo rastreável com a interpretação e a operação que o originaram.

### Estado Patrimonial

Instantâneo do patrimônio do usuário em um determinado momento, composto pelo conjunto de Registros Patrimoniais vigentes.

### Posição Patrimonial

Agregação conceitual de registros relativos a um mesmo ativo ou classe de ativos.

A Posição é derivada dos Fatos Patrimoniais, não definida por eles.

### Integridade Patrimonial

Garantia de que todo Fato Patrimonial registrado:
- possui origem rastreável;
- é consistente com a interpretação que o gerou;
- não pode ser alterado sem preservar a cadeia causal.

---

# 4. Responsabilidades do Ledger

- Registrar Fatos Patrimoniais decorrentes de interpretações econômicas.
- Preservar a integridade dos registros patrimoniais.
- Garantir rastreabilidade entre cada registro e sua origem (operação + interpretação).
- Disponibilizar Fatos Patrimoniais para consumo pelo Portfolio Engine e demais componentes autorizados.
- Manter o Estado Patrimonial consistente ao longo do tempo.

---

# 5. Não Responsabilidades

O Portfolio Ledger **não** é responsável por:

- processar operações;
- interpretar operações;
- realizar cálculos patrimoniais (preço médio, IR, rentabilidade);
- gerar projeções ou simulações;
- gerar relatórios ou dashboards;
- definir regras de negócio;
- validar interpretações.

Essas responsabilidades pertencem a outros componentes da arquitetura.

---

# 6. Formação dos Registros Patrimoniais

A cadeia conceitual de formação dos registros no Ledger segue o fluxo:

```
Operação
    ↓
Interpretação
    ↓
Fato Patrimonial
    ↓
Ledger
```

**Operação:** Evento econômico real (02_TRANSACTIONS.md).

**Interpretação:** Atribuição de significado econômico (03_TRANSACTION_INTERPRETATION.md).

**Fato Patrimonial:** Alteração patrimonial reconhecida, resultado da interpretação.

**Ledger:** Registro canônico do Fato Patrimonial.

O Trace Transaction (TRACE_TRANSACTION.md) preserva os vínculos de rastreabilidade entre cada etapa deste fluxo.

---

# 7. Integridade Patrimonial

O Ledger preserva as seguintes garantias conceituais:

### Imutabilidade Causal

Registros patrimoniais não podem ser alterados sem preservar a cadeia causal que os originou.

### Consistência com a Interpretação

O Fato Patrimonial registrado deve refletir fielmente a interpretação que o gerou.

### Rastreabilidade Obrigatória

Todo registro possui vínculo explícito com sua operação de origem e sua interpretação.

### Completude

O conjunto de registros do Ledger deve ser suficiente para reconstruir o Estado Patrimonial em qualquer momento.

---

# 8. Relação com TRACE_TRANSACTION

O Trace Transaction (TRACE_TRANSACTION.md) e o Portfolio Ledger possuem responsabilidades distintas e complementares:

| Aspecto | Trace Transaction | Portfolio Ledger |
|---------|-------------------|------------------|
| Responsabilidade | Preservar a cadeia causal | Registrar Fatos Patrimoniais |
| O que preserva | Vínculos entre origem e efeito | Fatos Patrimoniais em si |
| Consumidores | Auditoria, debugging, explicabilidade | Portfolio Engine, relatórios |

O Trace Transaction navega pela cadeia causal. O Ledger armazena os fatos que compõem essa cadeia.

---

# 9. Relação com PORTFOLIO_ENGINE

O Portfolio Engine (05_PORTFOLIO_ENGINE.md) é o principal consumidor dos Fatos Patrimoniais registrados no Ledger.

O fluxo conceitual de consumo:

```
Ledger
    ↓ (Fatos Patrimoniais)
Portfolio Engine
    ↓ (Cálculos, derivações)
Resultados Patrimoniais
```

O Ledger fornece os Fatos Patrimoniais brutos. O Engine aplica cálculos, derivações e transformações analíticas para produzir resultados patrimoniais (posições, saldos, indicadores).

O Ledger não conhece os algoritmos do Engine. O Engine não persiste fatos patrimoniais.

---

# 10. Invariantes Arquiteturais

### INV-L001

Todo registro representa um Fato Patrimonial.

### INV-L002

Todo Fato Patrimonial possui origem rastreável.

### INV-L003

Nenhum registro existe sem interpretação válida.

### INV-L004

O Ledger não altera significado econômico.

### INV-L005

O Ledger não realiza cálculos patrimoniais.

---

# 11. Limites de Escopo

### O que o Ledger faz

- Registra Fatos Patrimoniais.
- Preserva integridade e rastreabilidade.
- Disponibiliza Fatos Patrimoniais para consumo.

### O que o Ledger não faz

- Não processa operações.
- Não interpreta eventos.
- Não realiza cálculos.
- Não gera relatórios.
- Não define regras de negócio.

### O que pertence ao Portfolio Engine

- Cálculo de preço médio.
- Cálculo de rentabilidade.
- Cálculo de IR.
- Projeções e simulações.
- Derivação de indicadores.
- Geração de resultados analíticos.

---

# Histórico

## Versão 0.10

- Criação do Working Draft inicial (N0).
- Definição da identidade arquitetural do Portfolio Ledger como Registro Canônico de Fatos Patrimoniais.
- Conceitos fundamentais: Fato Patrimonial, Registro Patrimonial, Estado Patrimonial, Posição Patrimonial, Integridade Patrimonial.
- Responsabilidades e não responsabilidades formalizadas.
- Relações com Trace Transaction e Portfolio Engine estabelecidas.
- Invariantes arquiteturais INV-L001 a INV-L005.
