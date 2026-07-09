# Lio Feliz - Documentação Oficial

# 07_TECHNICAL_ANNEXES/04_INSIGHT_ENGINE.md

**Projeto:** Lio Feliz

**Documento:** 04_INSIGHT_ENGINE.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 07/07/2026

---

# Objetivo

A Insight Engine é responsável por transformar dados técnicos produzidos pelas demais Engines em informações claras, resumidas e acionáveis para o usuário.

Ela nunca executa cálculos financeiros.

Sua função é interpretar resultados, identificar o que realmente merece atenção e apresentar isso da forma mais útil possível.

---

# Filosofia

O tempo do investidor é um ativo valioso.

A Insight Engine deve reduzir o tempo necessário para compreender a situação da carteira.

Ela nunca deverá gerar excesso de notificações.

Sempre que possível deverá resumir diversas informações em um único Insight.

---

# Responsabilidades

A Insight Engine deverá:

- analisar resultados produzidos pelas outras Engines;
- agrupar informações relacionadas;
- eliminar informações redundantes;
- priorizar assuntos relevantes;
- produzir Insights claros;
- produzir resumos mensais;
- produzir alertas críticos quando necessário.

---

# Fontes de Dados

A Insight Engine poderá consumir informações provenientes de:

- Portfolio Consolidation Engine;
- Portfolio Decision Engine;
- Corporate Action Engine;
- Tax Engine;
- Import & Sync Engine;
- Sistema de Metas;
- Serviço de Cotações.

Ela nunca consulta diretamente bancos de dados ou APIs externas.

---

# Tipos de Insight

## Crítico

Requer ação imediata.

Exemplos:

- divergência na sincronização;
- erro na consolidação;
- inconsistência de dados;
- DARF vencendo;
- cálculo tributário pendente.

---

## Importante

Requer atenção, mas não urgência.

Exemplos:

- resumo mensal de dividendos;
- patrimônio atualizado;
- rebalanceamento sugerido;
- evento corporativo relevante.

---

## Informativo

Não exige ação.

Serve apenas para manter o usuário informado.

Exemplos:

- evolução patrimonial;
- novos ativos adicionados;
- estatísticas.

---

# Agrupamento

Sempre que possível, diversos eventos deverão ser transformados em um único Insight.

Exemplo:

Em vez de:

- 12 dividendos recebidos.

O sistema deverá apresentar:

Resumo dos dividendos do mês.

---

# Frequência

O sistema deverá evitar apresentar informações repetidas.

Um mesmo Insight somente deverá reaparecer quando houver alteração relevante.

---

# Resumos

A Insight Engine deverá produzir automaticamente:

- resumo mensal de dividendos;
- resumo patrimonial;
- resumo de rentabilidade;
- resumo tributário;
- resumo das sincronizações.

---

# Painel Inicial

Ao acessar o sistema, o usuário deverá visualizar um resumo simples.

Exemplo:

Tudo certo com sua carteira.

Nenhuma ação necessária.

Ou:

Existem 2 assuntos que merecem sua atenção.

- DARF estimada para este mês.
- Carteira distante da alocação alvo.

---

# Integração

Os Insights poderão ser utilizados por:

- Dashboard;
- Página inicial;
- Central de Insights;
- Relatórios;
- E-mails futuros (opcional).

---

# O que NÃO deve gerar Insight

Não deverão ser apresentados automaticamente:

- pequenas oscilações de preço;
- pequenas mudanças de patrimônio;
- pequenas alterações na alocação;
- eventos irrelevantes.

Essas informações continuarão disponíveis em seus respectivos módulos.

---

# Personalização

O usuário poderá definir:

- frequência dos resumos;
- tipos de Insight desejados;
- ocultar categorias específicas;
- prioridade de exibição.

Essas configurações nunca alterarão os cálculos do sistema.

---

# Decisões de Projeto

## Por que utilizar uma Insight Engine?

Para separar cálculos financeiros da comunicação com o usuário.

---

## Por que resumir informações?

Porque excesso de notificações reduz a atenção do usuário.

---

## Por que priorizar apenas informações relevantes?

Porque o objetivo do Lio Feliz é economizar tempo do investidor.

---

# Referências

Este documento depende de:

- Portfolio Consolidation Engine;
- Portfolio Decision Engine;
- Corporate Action Engine;
- Tax Engine.

---

# Histórico

## Versão 1.0

Criação da Insight Engine.
Definição da filosofia de comunicação do sistema.
