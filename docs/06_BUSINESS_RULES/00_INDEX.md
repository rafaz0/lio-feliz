# Lio Feliz - Documentação Oficial

# 06_BUSINESS_RULES/00_INDEX.md

**Projeto:** Lio Feliz

**Documento:** 06_BUSINESS_RULES/00_INDEX.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 08/07/2026

---

# Objetivo

Este documento apresenta a estrutura oficial das Regras de Negócio do Lio Feliz.

As Regras de Negócio representam o comportamento funcional do sistema.

Elas definem como cada módulo deve funcionar, como os dados são processados, quais decisões devem ser tomadas e como os diferentes módulos interagem entre si.

Toda implementação deverá seguir obrigatoriamente estas especificações.

---

# Filosofia

O objetivo das Regras de Negócio não é explicar como escrever o código.

Seu objetivo é explicar exatamente como o sistema deve se comportar.

A implementação pode variar.

O comportamento nunca.

---

# Organização

As Regras de Negócio foram divididas em módulos independentes.

Cada módulo possui responsabilidade única.

Essa divisão reduz acoplamento e facilita manutenção, testes e evolução do sistema.

---

# Estrutura Oficial

A pasta `06_BUSINESS_RULES/` deverá possuir a seguinte organização:

```text
06_BUSINESS_RULES/

00_INDEX.md

00_GLOBAL_RULES.md

01_PORTFOLIO.md

02_TRANSACTIONS.md

03_MARKET_DATA.md

04_CORPORATE_ACTIONS.md

05_PROVENTOS.md

06_REBALANCING.md

07_GOALS.md

08_TAX.md

09_FIXED_INCOME.md

10_INTERNATIONAL.md

11_IMPORT_EXPORT.md

12_INTEGRATIONS.md

13_REPORTS.md

14_BACKTESTS.md

15_ALERTAS.md

16_COMPARACAO_AVANCADA.md

17_EDUCACAO.md

18_EXPORTACAO_AVANCADA.md
```

Esta estrutura deverá ser mantida como padrão oficial do projeto.

---

# Dependências Entre Módulos

A ordem dos documentos não é aleatória.

Ela representa a sequência lógica de funcionamento do sistema.

Fluxo principal:

```
Importação

↓

Movimentações

↓

Carteira

↓

Cotações

↓

Eventos Corporativos

↓

Proventos

↓

Patrimônio

↓

Rebalanceamento

↓

Metas

↓

Relatórios

↓

Imposto de Renda
```

Cada módulo depende apenas dos módulos anteriores.

Sempre que possível, dependências circulares devem ser evitadas.

---

# Padrão Obrigatório dos Documentos

Todos os documentos desta pasta deverão seguir obrigatoriamente a mesma estrutura.

---

## 1. Objetivo

Define claramente a finalidade do módulo.

---

## 2. Escopo

Define quais funcionalidades pertencem ao módulo.

Também define explicitamente o que NÃO pertence ao módulo.

---

## 3. Conceitos

Define todos os conceitos importantes utilizados pelo módulo.

Nenhum termo deverá ficar ambíguo.

---

## 4. Entradas

Quais informações o módulo recebe.

Exemplos:

- movimentações;
- cotações;
- eventos corporativos;
- configurações;
- metas.

---

## 5. Processamento

Como o sistema transforma as entradas em resultados.

Esta é a parte mais importante do documento.

Toda regra deverá ser descrita em detalhes.

---

## 6. Saídas

Quais informações são produzidas.

Exemplos:

- patrimônio;
- dividendos;
- posição;
- relatórios;
- indicadores.

---

## 7. Integração com Outros Módulos

Define quais módulos utilizam essas informações.

Também define quais módulos fornecem dados para este.

---

## 8. Casos Especiais

Toda exceção deverá ser documentada.

Exemplos:

- ativo sem cotação;
- provento cancelado;
- grupamento;
- fusão;
- mercado fechado.

---

## 9. Regras Obrigatórias

Lista tudo aquilo que obrigatoriamente deverá ser respeitado.

---

## 10. Regras Proibidas

Lista comportamentos que nunca poderão ocorrer.

---

## 11. Preparação para Crescimento

Explica como o módulo deverá permitir futuras expansões sem necessidade de reescrita completa.

---

## 12. Histórico

Registro das alterações relevantes do documento.

---

# Princípios Gerais

Todas as Regras de Negócio deverão seguir os seguintes princípios:

- Automatizar sempre que possível.
- Evitar qualquer duplicação de lógica.
- Separar interface das regras financeiras.
- Priorizar transparência dos cálculos.
- Evitar estados inconsistentes.
- Garantir rastreabilidade das informações.
- Manter compatibilidade com ativos brasileiros e internacionais.
- Preparar o sistema para múltiplas moedas.
- Permitir integração com diferentes fontes de dados.

---

# Hierarquia de Decisão

Em caso de conflito entre documentos, deverá ser seguida a seguinte prioridade:

1. 00_START_HERE.md
2. 01_VISION.md
3. 02_PROJECT_RULES.md
4. 03_PRODUCT_REQUIREMENTS.md
5. 04_DATA_MODEL.md
6. 05_SYSTEM_ARCHITECTURE.md
7. Documentos desta pasta (06_BUSINESS_RULES)

Nenhum documento desta pasta poderá contrariar documentos de nível superior.

---

# Objetivo Final

Ao término da documentação desta pasta, deverá ser possível implementar todos os principais módulos do Lio Feliz utilizando exclusivamente estas especificações, sem necessidade de interpretar comportamentos não documentados.

---

# Histórico

## Versão 1.0

- Criação da estrutura oficial das Regras de Negócio.
- Definição do padrão obrigatório para todos os documentos funcionais.
- Definição da ordem lógica entre os módulos.
