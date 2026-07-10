# Lio Feliz - Documentação Oficial

# 06_BUSINESS_RULES/02_TRANSACTIONS.md

**Projeto:** Lio Feliz

**Documento:** 02_TRANSACTIONS.md

**Versão:** 0.91

**Status:** 🟡 Em elaboração (Working Draft)

**Categoria:** Business Rules

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 09/07/2026

---

> **Observação:** Este documento representa uma versão de trabalho (Working Draft).
>
> Seu conteúdo encontra-se em evolução contínua durante a construção da arquitetura do domínio patrimonial do Lio Feliz.
>
> Enquanto permanecer com status "Em elaboração", conceitos, regras e estruturas poderão ser refinados sem necessidade de compatibilidade retroativa.
>
> Após a aprovação, o documento será promovido para versão oficial.

---

# 1. Objetivo

Este documento define as regras responsáveis pela entrada das alterações patrimoniais no sistema.

Ele formaliza o comportamento esperado entre:

- Operações;
- Eventos;
- Portfolio Ledger;
- Portfolio Engine.

Este documento servirá como uma das principais bases do domínio do sistema.

---

# 2. Filosofia do Domínio

> O Lio Feliz não cria a história patrimonial do usuário.
>
> Ele registra, preserva e reconstrói essa história.

O sistema registra acontecimentos ocorridos na realidade.

O sistema nunca cria fatos patrimoniais.

---

# 3. Conceitos Fundamentais

## Operação

Solicitação para registrar uma alteração patrimonial ocorrida na realidade, independentemente de sua origem.

Origens possíveis:

- Manual
- Importação
- Integração
- API
- Migração
- Backup

## Evento

Registro imutável de um acontecimento patrimonial.

## Portfolio Ledger

Fonte Canônica da História Patrimonial.

## Portfolio Engine

Responsável pela reconstrução dos estados patrimoniais a partir do Ledger.

---

# 4. Fluxo Conceitual

```
Operação

↓

Validação

↓

Evento(s)

↓

Portfolio Ledger

↓

Portfolio Engine

↓

Reconstrução do Estado

↓

Dashboards
Relatórios
Insights
```

**Operação:** Uma solicitação chega ao sistema por qualquer origem (manual, importação, integração, API, migração, backup). Ela representa a intenção de registrar um fato patrimonial.

**Validação:** A operação é validada quanto à consistência dos dados, integridade referencial e conformidade com as regras de negócio.

**Evento(s):** Uma operação válida gera um ou mais Eventos imutáveis que representam os acontecimentos patrimoniais ocorridos.

**Portfolio Ledger:** Os Eventos são armazenados no Ledger, que funciona como a Fonte Canônica da história patrimonial.

**Portfolio Engine:** A Engine lê os Eventos do Ledger e reconstrói os estados patrimoniais para qualquer ponto no tempo.

**Reconstrução do Estado:** O patrimônio, posições, custos e demais estados são derivados dos Eventos, nunca armazenados diretamente.

**Dashboards, Relatórios, Insights:** Os estados reconstruídos alimentam as camadas de apresentação e análise.

---

# 5. Regras Gerais

**Regra 1 —** O domínio trabalha com Operações.

**Regra 2 —** Toda Operação passa por validação.

**Regra 3 —** Uma Operação aprovada gera um ou mais Eventos.

**Regra 4 —** Eventos são imutáveis.

**Regra 5 —** Correções históricas nunca alteram Eventos existentes. Novas correções geram novos Eventos.

**Regra 6 —** O Ledger registra apenas acontecimentos patrimoniais.

**Regra 7 —** O Ledger nunca registra:

- patrimônio;
- posição;
- custo médio;
- rentabilidade;
- dashboards;
- análises;
- estados temporários.

**Regra 8 —** O patrimônio é reconstruído pelo Portfolio Engine.

**Regra 9 —** O domínio não conhece:

- interface;
- formulários;
- rascunhos;
- uploads;
- telas.

Esses conceitos pertencem à camada de aplicação.

---

# 6. Operações Patrimoniais

### Compra

A Compra representa uma transformação entre Recursos Patrimoniais.

Normalmente envolve a redução de um Recurso Patrimonial (ex.: dinheiro) e o aumento de outro (ex.: ativo financeiro).

A Compra não cria patrimônio.

Ela transforma a composição do patrimônio preservando o acontecimento econômico registrado.

Exemplos conceituais:

- Dinheiro → PETR4
- Dinheiro → ETF
- Dinheiro → Tesouro Selic
- Direito de Subscrição + Dinheiro → Ações

A operação permanece válida independentemente do tipo de ativo.

> **Observação arquitetural:** Durante a modelagem do domínio foi avaliada a criação de uma entidade intermediária denominada "Efeito Patrimonial". A arquitetura optou por NÃO criar essa entidade por não agregar responsabilidades reais ao domínio. O conceito permanece apenas como ferramenta didática para explicar como um Evento pode afetar múltiplos Recursos Patrimoniais.

### Venda

(Em desenvolvimento)

### Dividendos

(Em desenvolvimento)

### JCP

(Em desenvolvimento)

### Bonificação

(Em desenvolvimento)

### Subscrição

(Em desenvolvimento)

### Desdobramento

(Em desenvolvimento)

### Grupamento

(Em desenvolvimento)

### Transferência

(Em desenvolvimento)

### Ajustes Manuais

(Em desenvolvimento)

### Importações

(Em desenvolvimento)

### Integrações

(Em desenvolvimento)

---

# 7. Casos Especiais

### Execuções Parciais

Em elaboração.

### Importações em lote

Em elaboração.

### Eventos compostos

Em elaboração.

### Sincronizações

Em elaboração.

---

# 8. Marcos Arquiteturais Consolidados

### Marco 1 — Natureza do Portfolio Ledger

- Ledger é a Fonte Canônica da História Patrimonial.
- Eventos são imutáveis.
- Patrimônio é reconstruído.

### Marco 2 — Natureza dos Eventos

- Evento representa um acontecimento patrimonial.
- Evento altera recursos patrimoniais.
- Evento não representa estados.

### Marco 3 — Filosofia do Registro

- O sistema registra fatos.
- Nunca cria fatos.
- Nunca reescreve a história.
- Correções geram novos Eventos.

### Marco 4 — Granularidade

- Um Evento representa um único acontecimento econômico indivisível.
- Custos pertencentes ao mesmo acontecimento permanecem no mesmo Evento.
- Operações podem gerar múltiplos Eventos quando houver acontecimentos econômicos distintos (como execuções parciais).

### Marco 5 — Recursos Patrimoniais

1. O patrimônio é composto por Recursos Patrimoniais.
2. Um Recurso Patrimonial representa um elemento individual capaz de compor o patrimônio do usuário.

Exemplos:

- Dinheiro
- Ações
- FIIs
- ETFs
- Títulos Públicos
- Direitos de Subscrição
- Créditos Financeiros
- Outros ativos suportados pelo domínio

3. Um Evento pode afetar um ou vários Recursos Patrimoniais simultaneamente.
4. Recursos Patrimoniais NÃO constituem a Fonte Canônica.

Eles representam uma reconstrução produzida pelo Portfolio Engine.

5. A Fonte Canônica continua sendo exclusivamente o Portfolio Ledger.

### Marco 6 — Separação entre Fato e Interpretação

1. O sistema registra fatos ocorridos na realidade.
2. A Operação apenas solicita o registro do fato.
3. O Evento representa exclusivamente o registro histórico desse fato.
4. O Portfolio Ledger preserva apenas registros históricos.
5. Patrimônio, posição, custo médio, rentabilidade, indicadores e análises são interpretações produzidas pelo Portfolio Engine.
6. Alterações futuras nas regras de cálculo não modificam o histórico registrado.

---

# 9. Pendências Arquiteturais

- Estrutura definitiva dos Eventos.
- Modelo dos Recursos Patrimoniais.
- Relação entre Operações Compostas e Eventos.
- Modelo definitivo para Execuções Parciais.
- Estratégia para Importações.
- Identidade e versionamento dos Eventos.
- Integração com o Portfolio Ledger.

Estas decisões permanecem em discussão arquitetural.

---

# 10. Histórico

### Versão 0.91

Adicionados Marcos Arquiteturais 5 (Recursos Patrimoniais) e 6 (Separação entre Fato e Interpretação). Formalizada a primeira Business Rule específica (Compra). Adicionada Observação Arquitetural sobre "Efeito Patrimonial". Incremento incremental do Working Draft.

### Versão 0.9

Criação do documento como Working Draft. Definição da Filosofia do Domínio, Conceitos Fundamentais, Fluxo Conceitual, 9 Regras Gerais, estrutura inicial de Operações Patrimoniais, Casos Especiais, Marcos Arquiteturais e Pendências.
