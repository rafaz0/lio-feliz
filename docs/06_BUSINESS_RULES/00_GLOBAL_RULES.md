# Lio Feliz - Documentação Oficial

# 06_BUSINESS_RULES/00_GLOBAL_RULES.md

**Projeto:** Lio Feliz

**Documento:** 06_BUSINESS_RULES/00_GLOBAL_RULES.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 07/07/2026

---

# Objetivo

Este documento define as regras globais que se aplicam a todo o sistema.

Estas regras possuem prioridade sobre qualquer documento individual da pasta `06_BUSINESS_RULES`.

Nenhum módulo poderá contrariar estas definições.

---

# Escopo

Este documento define:

- princípios gerais;
- prioridades entre fontes de dados;
- consistência das informações;
- tratamento de conflitos;
- regras de sincronização;
- rastreabilidade;
- automação;
- integridade dos dados.

Não define regras específicas de um módulo.

---

# Filosofia Geral

O Lio Feliz possui como princípio fundamental:

> Toda informação deve possuir uma origem conhecida, ser rastreável e produzir resultados consistentes.

Sempre que houver dúvida entre facilidade de implementação e consistência dos dados, a consistência deverá prevalecer.

---

# Fonte de Verdade

Cada informação do sistema deverá possuir apenas uma fonte oficial.

Exemplos:

Movimentações:

→ lançamentos do usuário ou sincronização aprovada.

Dividendos:

→ eventos corporativos.

Posições:

→ calculadas a partir das movimentações.

Patrimônio:

→ calculado a partir das posições e das cotações.

Preço médio:

→ calculado exclusivamente pelas movimentações válidas.

Nenhum dado derivado poderá ser editado manualmente.

---

# Hierarquia das Informações

Quando existirem múltiplas fontes para o mesmo dado, deverá existir uma prioridade.

Prioridade geral:

1. Informação confirmada pelo usuário.
2. Integrações oficiais.
3. APIs financeiras.
4. Importações.
5. Cálculos internos.
6. Dados estimados.

Caso duas fontes possuam a mesma prioridade e apresentem divergências, o sistema deverá informar o usuário antes de alterar dados consolidados.

---

# Fontes de Mercado

O sistema poderá utilizar múltiplas fontes de dados.

Exemplos:

- Yahoo Finance
- BRAPI
- CoinGecko
- AwesomeAPI
- futuras integrações

A escolha da fonte deverá ser transparente.

Sempre que possível, deverá ser registrada a origem da cotação utilizada.

---

# Automação

Sempre que um processo puder ser realizado automaticamente com segurança, ele deverá ser automatizado.

Exemplos:

- dividendos;
- JCP;
- bonificações;
- desdobramentos;
- grupamentos;
- atualização de preços;
- sincronizações.

Caso exista risco significativo de inconsistência, deverá ser solicitada confirmação ao usuário.

---

# Alterações Manuais

O usuário poderá alterar apenas informações que realmente controla.

Exemplos:

Permitido:

- compras;
- vendas;
- metas;
- estratégia;
- preferências.

Não permitido:

- patrimônio;
- posição;
- preço médio;
- dividendos calculados;
- rentabilidade calculada.

Esses dados são derivados e deverão ser recalculados automaticamente.

---

# Dados Derivados

Informações derivadas nunca deverão ser tratadas como fonte primária.

Exemplos:

- patrimônio;
- percentual da carteira;
- preço médio;
- lucro;
- prejuízo;
- rendimento.

Sempre que possível deverão ser recalculadas.

---

# Rastreabilidade

Toda informação importante deverá possuir histórico de origem.

Exemplos:

Uma posição deverá permitir identificar:

- quais compras a originaram;
- quais vendas a alteraram;
- quais eventos corporativos a modificaram.

O sistema deverá ser auditável.

---

# Consistência

O sistema deverá impedir estados inconsistentes.

Exemplos:

Não permitir:

- posição negativa;
- patrimônio negativo;
- ativo inexistente;
- dividendos duplicados;
- movimentações duplicadas.

Sempre que possível inconsistências deverão ser detectadas automaticamente.

---

# Tratamento de Duplicidade

O sistema deverá identificar automaticamente possíveis registros duplicados.

Exemplos:

- importação repetida;
- sincronização repetida;
- lançamento manual já existente.

Nenhuma duplicidade deverá ser criada sem confirmação do usuário.

---

# Sincronizações

Toda sincronização deverá ser:

- opcional;
- reversível;
- rastreável.

A falha de uma sincronização nunca poderá impedir o funcionamento do sistema.

---

# Integrações

Nenhuma integração externa poderá tornar-se obrigatória.

Mesmo sem:

- B3;
- Yahoo;
- BRAPI;
- CoinGecko;
- CSV;

o usuário deverá conseguir utilizar normalmente o sistema.

---

# Eventos Corporativos

Sempre que possível deverão ser processados automaticamente.

Caso exista divergência entre fontes, o sistema deverá:

- registrar o conflito;
- manter histórico;
- solicitar confirmação quando necessário.

---

# Mercado Internacional

As regras deste documento aplicam-se igualmente aos ativos internacionais.

O sistema nunca deverá tratar ativos internacionais como funcionalidades secundárias.

Toda implementação deverá considerar:

- múltiplas moedas;
- múltiplos países;
- diferentes calendários;
- diferentes regras fiscais.

---

# Performance

O sistema deverá priorizar:

- consistência;
- clareza;
- previsibilidade.

Otimizações nunca poderão alterar resultados financeiros.

---

# Transparência

Sempre que o sistema realizar um cálculo importante, deverá ser possível responder:

- quais dados foram utilizados;
- qual regra foi aplicada;
- qual foi o resultado intermediário;
- qual foi o resultado final.

O usuário deverá conseguir compreender como um valor foi obtido.

---

# Preparação para Crescimento

As regras definidas neste documento deverão continuar válidas mesmo com futuras implementações como:

- aplicativo móvel;
- múltiplas carteiras;
- múltiplos usuários;
- novas integrações;
- novos mercados;
- novos tipos de ativos.

---

# Regras Obrigatórias

É obrigatório:

- manter uma única fonte de verdade para cada informação;
- evitar duplicação de lógica;
- manter rastreabilidade;
- recalcular dados derivados;
- preservar consistência;
- manter compatibilidade entre módulos.

---

# Regras Proibidas

É proibido:

- editar manualmente dados derivados;
- duplicar regras financeiras;
- depender de uma integração externa para funcionamento;
- armazenar informações inconsistentes;
- ocultar conflitos de dados.

---

# Histórico

## Versão 1.0

- Criação das regras globais do sistema.
- Definição da hierarquia das informações.
- Definição dos princípios de consistência.
- Definição das regras de automação.
- Definição da política de sincronização.
