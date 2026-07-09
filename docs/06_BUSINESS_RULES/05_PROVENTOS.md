# Lio Feliz - Documentação Oficial

# 06_BUSINESS_RULES/05_PROVENTOS.md

**Projeto:** Lio Feliz

**Documento:** 05_PROVENTOS.md

**Versão:** 1.1

**Status:** APROVADO

**Última atualização:** 08/07/2026

---

# Objetivo

Este documento define todas as regras relacionadas aos proventos recebidos pelo investidor.

No contexto do Lio Feliz, um provento representa qualquer evento que gere renda ou entrada financeira ao investidor.

Eventos de aumento patrimonial e direitos societários (bonificações, subscrições, desdobramentos, grupamentos, fusões, cisões, etc.) pertencem ao domínio de Eventos Corporativos e são tratados no documento [`04_CORPORATE_ACTIONS.md`](./04_CORPORATE_ACTIONS.md).

Estas regras serão utilizadas por diversos módulos do sistema, incluindo Carteira, Imposto de Renda, Dashboard, Relatórios, Vida Financeira e Insights.

---

# Princípios

Os proventos deverão ser tratados como eventos financeiros auditáveis.

Todo provento deverá possuir:

- origem identificável;
- histórico completo;
- rastreabilidade;
- estados bem definidos;
- integração controlada com os demais módulos.

Nenhum provento poderá desaparecer do histórico sem registro da alteração.

---

# Tipos de Proventos

O sistema deverá suportar, no mínimo:

## Entrada Financeira

- Dividendos
- Juros sobre Capital Próprio (JCP)
- Rendimentos de FIIs
- Rendimentos de FIAGROs
- Rendimentos de FI-Infra
- Distribuições de REITs
- Dividendos internacionais
- Distribuições de ETFs
- Juros de renda fixa (quando aplicável)
- Restituições financeiras

---

> **Nota:** Eventos de aumento patrimonial (bonificações, ações/cotas recebidas) e direitos (subscrição, preferenciais, distribuídos) pertencem ao domínio de Eventos Corporativos. Consulte [`04_CORPORATE_ACTIONS.md`](./04_CORPORATE_ACTIONS.md) para as regras completas.

---

# Estados do Provento

Todo provento deverá possuir um ciclo de vida.

Anunciado

↓

Confirmado

↓

Elegível

↓

Aguardando pagamento

↓

Recebido

↓

Conciliado

Cada alteração de estado deverá permanecer registrada.

---

# Datas Importantes

Cada provento poderá possuir:

- Data do anúncio
- Data-com
- Data-ex
- Data-base
- Data prevista para pagamento
- Data efetiva de pagamento
- Data da conciliação

Nem todas as datas são obrigatórias para todos os ativos.

---

# Elegibilidade

O sistema deverá determinar automaticamente:

- se o usuário possuía posição elegível;
- quantidade considerada;
- valor por ativo;
- retenções;
- arredondamentos;
- moeda de pagamento.

---

# Integração com a Carteira

Após o recebimento do provento deverão ser atualizados:

- histórico;
- patrimônio;
- fluxo de caixa da carteira;
- rentabilidade;
- renda passiva;
- estatísticas.

A Carteira continua sendo a Fonte de Verdade dos investimentos.

---

# Integração com Vida Financeira

Esta integração será totalmente opcional.

Ela seguirá o princípio das Ações Vinculadas.

Caso habilitada nas preferências do usuário, o sistema poderá criar automaticamente um lançamento financeiro correspondente ao provento recebido.

Exemplo:

Receita

Dividendos

R$ 350,00

Origem:

Carteira

Nenhuma informação será duplicada.

Apenas será criado um lançamento vinculado.

---

# Integração com a Decision Engine

Os proventos poderão alimentar recomendações como:

- reinvestimento;
- rebalanceamento;
- projeções;
- evolução da renda passiva.

A Decision Engine nunca executará operações automaticamente.

---

# Integração com a Insight Engine

Os proventos alimentarão resumos inteligentes.

Exemplo:

Resumo de Junho

Recebido:

R$ 1.284,00

Maior pagador:

TAEE11

Crescimento:

+12%

Situação:

Todos os pagamentos conciliados.

O objetivo é reduzir notificações desnecessárias.

---

# Calendário de Proventos

O sistema poderá apresentar um calendário contendo:

- pagamentos futuros confirmados;
- pagamentos estimados;
- pagamentos recebidos.

Cada evento deverá possuir um indicador de confiabilidade.

Confirmado

Estimado

Recebido

Estimativas deverão ser claramente identificadas.

---

# Histórico

Todo provento permanecerá registrado permanentemente.

Caso haja correções:

- manter histórico;
- registrar origem;
- registrar motivo;
- registrar data da alteração.

Nunca substituir silenciosamente registros anteriores.

---

# Auditoria

Cada provento deverá armazenar:

- origem;
- provedor;
- sincronização responsável;
- data de criação;
- data da última atualização;
- usuário responsável (quando manual).

---

# Casos Especiais

O sistema deverá suportar:

- cancelamentos;
- pagamentos corrigidos;
- pagamentos parciais;
- pagamentos em moeda estrangeira;
- atrasos;
- estornos;
- proventos extraordinários.

---

# Projeções

O histórico de proventos permitirá calcular:

- renda mensal;
- renda anual;
- média móvel;
- CAGR da renda passiva;
- projeções futuras.

Todas as projeções deverão ser identificadas como estimativas.

---

# Interações com Outros Módulos

Este documento impacta diretamente:

- Portfolio Consolidation Engine
- Tax Engine
- Insight Engine
- Decision Engine
- Vida Financeira
- Dashboard
- Relatórios
- Metas
- Projection Layer

---

# Decisões de Projeto

## Por que utilizar "Proventos" em vez de "Dividendos"?

Porque dividendos representam apenas um dos diversos tipos de distribuição existentes.

O modelo passa a suportar naturalmente novos ativos e mercados.

---

## Por que utilizar estados?

Porque anúncios podem sofrer alterações antes do pagamento.

O histórico precisa refletir corretamente cada etapa.

---

## Por que separar proventos de eventos corporativos?

Porque possuem naturezas diferentes: proventos representam renda ou entrada financeira; eventos corporativos (bonificações, splits, fusões, subscrições) alteram a estrutura patrimonial sem necessariamente gerar caixa.

As regras de eventos corporativos estão documentadas em [`04_CORPORATE_ACTIONS.md`](./04_CORPORATE_ACTIONS.md).

---

## Por que integrar opcionalmente com Vida Financeira?

Para manter a independência entre módulos e respeitar o princípio das Fontes de Verdade.

---

# Histórico

## Versão 1.1

- Renomeado de `03_PROVENTOS.md` para `05_PROVENTOS.md`.
- Removidas regras de eventos corporativos (Aumento Patrimonial, Direitos) que pertencem a `04_CORPORATE_ACTIONS.md`.
- Adicionadas referências cruzadas para `04_CORPORATE_ACTIONS.md`.
- Ajustada definição de Proventos para exclusividade de renda/entrada financeira.

## Versão 1.0

Criação oficial das regras de negócio para Proventos.
