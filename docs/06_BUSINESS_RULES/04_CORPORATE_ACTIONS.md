# Lio Feliz - Documentação Oficial

# 06_BUSINESS_RULES/04_CORPORATE_ACTIONS.md

**Projeto:** Lio Feliz

**Documento:** 04_CORPORATE_ACTIONS.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 08/07/2026

---

# Objetivo

Este documento define as regras de negócio para todos os Eventos Corporativos que possam alterar a composição, identificação ou estrutura dos ativos presentes na carteira do investidor.

Eventos Corporativos representam acontecimentos promovidos pelas empresas emissoras ou pelos mercados e não constituem decisões de investimento do usuário.

---

# Escopo

Este documento abrange exclusivamente:

- desdobramentos (Split);
- grupamentos (Inplit);
- bonificações em ações;
- subscrições;
- direitos de subscrição;
- cisões;
- incorporações;
- fusões;
- conversões;
- mudanças de ticker;
- mudanças de nome;
- cancelamentos de ativos;
- migração entre segmentos;
- demais eventos societários.

Não fazem parte deste documento:

- dividendos;
- JCP;
- rendimentos;
- pagamentos;
- tributação;
- sincronização de mercado.

Esses assuntos possuem documentação própria.

---

# Princípios

## Evento Externo

Eventos Corporativos são acontecimentos externos.

O usuário nunca "cria" um Evento Corporativo.

Ele apenas decide como agir quando houver necessidade.

---

## Preservação Histórica

Nenhuma operação realizada pelo usuário poderá ser alterada.

O histórico deverá permanecer íntegro.

O Evento Corporativo produzirá seus efeitos sem modificar registros históricos.

---

## Reprocessamento

Toda carteira deverá poder ser reconstruída desde a primeira operação.

A aplicação dos Eventos Corporativos deverá produzir sempre o mesmo resultado.

---

# Tipos de Eventos

## Alteração de Quantidade

- Split
- Inplit
- Bonificação em ações
- Conversões

---

## Alteração Estrutural

- Cisão
- Fusão
- Incorporação

---

## Alteração de Identificação

- Mudança de ticker
- Mudança de nome
- Mudança de segmento
- Migração de mercado

---

## Direitos

- Direitos de subscrição
- Preferências
- Direitos temporários

---

# Aplicação

Sempre que um Evento Corporativo for identificado:

Evento

↓

Validação

↓

Aplicação das regras

↓

Reconstrução da posição

↓

Atualização da carteira

↓

Registro de auditoria

---

# Atualizações Automáticas

Quando possível, deverão ser atualizados automaticamente:

- quantidade;
- preço médio;
- posição;
- patrimônio;
- indicadores.

O usuário não deverá recalcular essas informações manualmente.

---

# Eventos que Exigem Decisão

Alguns eventos poderão exigir manifestação do investidor.

Exemplos:

- exercer subscrição;
- vender direitos;
- aceitar determinada conversão.

Nesses casos, o sistema deverá informar:

- prazo;
- consequências;
- impacto esperado.

A decisão permanecerá sempre com o usuário.

---

# Integração com Outros Módulos

Este documento fornece informações para:

- Portfolio Consolidation Engine;
- Projection Layer;
- Tax Engine;
- Insight Engine;
- Decision Engine.

Quando houver movimentação financeira decorrente de um Evento Corporativo, a integração com a Vida Financeira seguirá o princípio das Ações Vinculadas.

Eventos relacionados a pagamentos deverão consultar o documento:

05_PROVENTOS.md

---

# Auditoria

Cada Evento Corporativo deverá armazenar:

- origem;
- provedor;
- data de identificação;
- data de aplicação;
- usuário responsável (quando manual);
- versão das regras aplicadas.

---

# Casos Especiais

O sistema deverá suportar:

- eventos retroativos;
- eventos corrigidos;
- múltiplos eventos na mesma data;
- ativos descontinuados;
- ativos temporariamente sem cotação.

---

# Decisões de Projeto

## Por que separar Eventos Corporativos de Proventos?

Porque Eventos Corporativos alteram a estrutura da carteira.

Proventos representam distribuição de renda.

Apesar de ambos serem eventos externos, possuem regras de negócio independentes.

---

## Por que preservar o histórico?

Porque operações representam fatos históricos.

Eventos representam transformações posteriores.

Misturar ambos comprometeria auditoria e reprocessamento.

---

## Por que reconstruir a carteira?

Porque eventos retroativos podem alterar posições e preços médios.

A reconstrução garante consistência.

---

# Casos de Uso Relacionados

- UC-005 Desdobramento
- UC-006 Grupamento
- UC-007 Bonificação
- UC-008 Subscrição
- UC-009 Conversão de Ativos
- UC-010 Mudança de Ticker

---

# Histórico

## Versão 1.0

Criação oficial das regras de negócio para Eventos Corporativos.
