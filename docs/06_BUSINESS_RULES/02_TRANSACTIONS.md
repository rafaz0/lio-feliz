# Lio Feliz - Documentação Oficial

# 06_BUSINESS_RULES/02_TRANSACTIONS.md

**Projeto:** Lio Feliz

**Documento:** 02_TRANSACTIONS.md

**Versão:** 0.92

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

Este documento define o conceito de **Operação Patrimonial**, sua finalidade dentro do domínio, sua responsabilidade e sua relação com Eventos, Portfolio Ledger, Interpretação e Portfolio Engine.

Ele formaliza o comportamento esperado entre os componentes que constituem a base do domínio operacional do sistema.

**Pergunta Fundamental**

> Como o domínio representa operações patrimoniais de forma consistente, preservando fatos econômicos e permitindo sua posterior interpretação?

Este documento servirá como uma das principais bases do domínio do sistema.

---

# 2. Filosofia do Domínio

> O Lio Feliz não cria a história patrimonial do usuário.
>
> Ele registra, preserva e reconstrói essa história.

O sistema registra acontecimentos ocorridos na realidade.

O sistema nunca cria fatos patrimoniais.

Uma Operação:

- representa um fato econômico;
- nunca calcula patrimônio;
- nunca atualiza posições;
- nunca interpreta efeitos patrimoniais;
- nunca altera eventos existentes;
- apenas registra um acontecimento econômico válido para o domínio.

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

## Interpretação

Processo que transforma Eventos registrados no Ledger em efeitos patrimoniais compreensíveis para o Portfolio Engine.

---

# 4. Fluxo Conceitual

```
Operação

↓

Validação

↓

Eventos

↓

Portfolio Ledger

↓

Interpretação

↓

Portfolio Engine

↓

Reconstrução Patrimonial
```

**Operação:** Uma solicitação chega ao sistema por qualquer origem (manual, importação, integração, API, migração, backup). Ela representa a intenção de registrar um fato patrimonial. A Operação nunca calcula patrimônio nem interpreta efeitos — ela apenas documenta o fato.

**Validação:** A operação é validada quanto à consistência dos dados, integridade referencial e conformidade com as regras de negócio. A validação garante que o fato econômico é válido antes de gerar Eventos.

**Eventos:** Uma operação válida gera um ou mais Eventos imutáveis que representam os acontecimentos patrimoniais ocorridos. Cada Evento preserva exclusivamente o fato econômico, sem qualquer interpretação.

**Portfolio Ledger:** Os Eventos são armazenados no Ledger, que funciona como a Fonte Canônica da história patrimonial. O Ledger nunca armazena estados ou interpretações.

**Interpretação:** Os Eventos são interpretados para produzir efeitos patrimoniais compreensíveis. A Interpretação é responsabilidade de um documento específico (`03_TRANSACTION_INTERPRETATION.md`), não deste documento.

**Portfolio Engine:** A Engine consome os efeitos interpretados e reconstrói os estados patrimoniais para qualquer ponto no tempo.

**Reconstrução Patrimonial:** O patrimônio, posições, custos e demais estados são derivados dos Eventos interpretados, nunca armazenados diretamente.

---

# 5. Regras Gerais

### Grupo A — Natureza da Operação

**R1 —** O domínio trabalha com Operações.

**R2 —** Toda Operação representa um fato econômico ocorrido na realidade.

**R3 —** Toda Operação passa por validação antes de gerar Eventos.

### Grupo B — Geração e Imutabilidade

**R4 —** Uma Operação aprovada gera um ou mais Eventos.

**R5 —** Eventos são imutáveis.

**R6 —** Correções históricas nunca alteram Eventos existentes. Novas correções geram novos Eventos.

### Grupo C — Ledger e Armazenamento

**R7 —** O Ledger registra apenas acontecimentos patrimoniais.

**R8 —** O Ledger nunca registra:

- patrimônio;
- posição;
- custo médio;
- rentabilidade;
- dashboards;
- análises;
- estados temporários.

### Grupo D — Interpretação e Reconstrução

**R9 —** A Interpretação transforma Eventos em efeitos patrimoniais compreensíveis para o Portfolio Engine.

**R10 —** O patrimônio é reconstruído pelo Portfolio Engine a partir dos Eventos interpretados.

### Grupo E — Limites do Domínio

**R11 —** O domínio operacional não conhece:

- interface;
- formulários;
- rascunhos;
- uploads;
- telas.

Esses conceitos pertencem à camada de aplicação.

**R12 —** Este documento não define regras de interpretação. Essas regras pertencem ao `03_TRANSACTION_INTERPRETATION.md`.

---

# 6. Operações Patrimoniais

Cada operação abaixo segue a estrutura: **objetivo**, **descrição**, **situação atual** e **referência** ao documento de interpretação.

---

### Compra

**Objetivo:** Representar a aquisição de um ativo financeiro.

**Descrição:** A Compra representa uma transformação entre Recursos Patrimoniais. Normalmente envolve a redução de um Recurso Patrimonial (ex.: dinheiro) e o aumento de outro (ex.: ativo financeiro). A Compra não cria patrimônio — ela transforma a composição do patrimônio preservando o acontecimento econômico registrado.

**Exemplos conceituais:** Dinheiro → PETR4; Dinheiro → ETF; Dinheiro → Tesouro Selic; Direito de Subscrição + Dinheiro → Ações.

A operação permanece válida independentemente do tipo de ativo.

> **Observação arquitetural:** Durante a modelagem do domínio foi avaliada a criação de uma entidade intermediária denominada "Efeito Patrimonial". A arquitetura optou por NÃO criar essa entidade por não agregar responsabilidades reais ao domínio. O conceito permanece apenas como ferramenta didática para explicar como um Evento pode afetar múltiplos Recursos Patrimoniais.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### Venda

**Objetivo:** Representar a alienação de um ativo financeiro.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### Dividendos

**Objetivo:** Representar o recebimento de proventos distribuídos por uma companhia.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### JCP

**Objetivo:** Representar o recebimento de Juros sobre Capital Próprio.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### Bonificação

**Objetivo:** Representar o recebimento de novas ações sem custo para o acionista.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### Subscrição

**Objetivo:** Representar o exercício de direito de subscrição para aquisição de novas ações.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### Desdobramento

**Objetivo:** Representar o aumento da quantidade de cotas sem alteração do valor total investido.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### Grupamento

**Objetivo:** Representar a redução da quantidade de cotas sem alteração do valor total investido.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### Transferência

**Objetivo:** Representar a movimentação de ativos entre contas ou custódias.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### Ajustes Manuais

**Objetivo:** Representar correções manuais necessárias para alinhar o registro histórico à realidade.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### Importações

**Objetivo:** Representar operações provenientes de fontes externas importadas automaticamente.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

---

### Integrações

**Objetivo:** Representar operações recebidas por integração direta com fontes de dados.

**Descrição:** Working Draft.

**Situação:** Working Draft.

**Interpretação:** `03_TRANSACTION_INTERPRETATION.md`

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

### 1. Estrutura e Identidade dos Eventos

- Estrutura definitiva dos Eventos.
- Identidade e versionamento dos Eventos.

### 2. Recursos Patrimoniais

- Modelo dos Recursos Patrimoniais.

### 3. Operações Compostas e Execuções

- Relação entre Operações Compostas e Eventos.
- Modelo definitivo para Execuções Parciais.

### 4. Importações e Integrações

- Estratégia para Importações.

### 5. Ledger

- Integração com o Portfolio Ledger.

Estas decisões permanecem em discussão arquitetural e serão tratadas conforme a metodologia estabelecida no DEVELOPMENT_METHODOLOGY.md.

---

# 10. Responsabilidades do 03_TRANSACTION_INTERPRETATION.md

O próximo documento da sequência (`03_TRANSACTION_INTERPRETATION.md`) será responsável por:

- interpretação econômica dos Eventos registrados;
- definição de alterações patrimoniais decorrentes dos Eventos;
- estabelecimento de invariantes do domínio operacional;
- especificação da transformação patrimonial para cada tipo de operação;
- definição do contrato entre a camada de Eventos e o Portfolio Engine.

Este documento (`02_TRANSACTIONS.md`) registra o fato econômico. O documento seguinte interpreta o efeito patrimonial desse fato.

Nenhuma regra de interpretação deverá ser criada neste documento.

---

# 11. Histórico

### Versão 0.92

Consolidação do Working Draft para Nível 1 — Estrutura Consolidada. Adicionada Pergunta Fundamental. Filosofia expandida com princípios explícitos da Operação. Adicionado conceito de Interpretação. Fluxo Conceitual revisado com Interpretação entre Ledger e Engine. Regras Gerais reorganizadas em 5 grupos (12 regras). Operações padronizadas com objetivo, descrição, situação e referência à interpretação. Pendências agrupadas por assunto. Criada seção de responsabilidades do 03_TRANSACTION_INTERPRETATION.md.

### Versão 0.91

Adicionados Marcos Arquiteturais 5 (Recursos Patrimoniais) e 6 (Separação entre Fato e Interpretação). Formalizada a primeira Business Rule específica (Compra). Adicionada Observação Arquitetural sobre "Efeito Patrimonial". Incremento incremental do Working Draft.

### Versão 0.9

Criação do documento como Working Draft. Definição da Filosofia do Domínio, Conceitos Fundamentais, Fluxo Conceitual, 9 Regras Gerais, estrutura inicial de Operações Patrimoniais, Casos Especiais, Marcos Arquiteturais e Pendências.
