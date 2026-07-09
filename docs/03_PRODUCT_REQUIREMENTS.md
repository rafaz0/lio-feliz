# Lio Feliz - Documentação Oficial

# 03_PRODUCT_REQUIREMENTS.md

**Projeto:** Lio Feliz

**Documento:** 03_PRODUCT_REQUIREMENTS.md

**Versão da Documentação:** 1.0

**Versão do Projeto:** Em Desenvolvimento

**Status:** APROVADO

**Última atualização:** 07/07/2026

**Autor:** Rafael Santos + ChatGPT

---

# Objetivo

Este documento define os requisitos funcionais do produto.

Seu objetivo é descrever quais módulos fazem parte do Lio Feliz, quais funcionalidades pertencem a cada módulo e quais princípios devem orientar sua evolução.

Este documento descreve o produto.

A implementação técnica será documentada separadamente.

---

# Escopo do Projeto

O Lio Feliz é uma plataforma de gestão patrimonial voltada para investidores de longo prazo.

O sistema deverá permitir que o usuário concentre toda a administração de seus investimentos em um único ambiente.

Todas as funcionalidades futuras deverão estar relacionadas direta ou indiretamente com esse objetivo.

---

# Estrutura Geral do Produto

O projeto será organizado em módulos independentes.

Cada módulo deverá possuir responsabilidades claramente definidas.

Nenhum módulo deverá depender diretamente das regras internas de outro módulo.

Sempre que possível, a comunicação ocorrerá através do núcleo do sistema.

---

# Módulos do Sistema

## Dashboard

Objetivo:

Apresentar um resumo completo da situação patrimonial do usuário.

Exemplos:

- patrimônio total;
- evolução patrimonial;
- patrimônio por classe;
- patrimônio por país;
- patrimônio por moeda;
- rendimento mensal;
- dividendos recebidos;
- próximos eventos relevantes.

---

## Carteira

Objetivo:

Centralizar todas as posições do usuário.

Responsabilidades:

- ativos;
- quantidades;
- preço médio;
- patrimônio;
- alocação;
- histórico.

---

## Movimentações

Responsável pelo registro e processamento das operações.

Exemplos:

- compra;
- venda;
- dividendos;
- JCP;
- bonificações;
- desdobramentos;
- grupamentos;
- subscrições;
- amortizações;
- transferências;
- aportes.

---

## Rebalanceamento

Objetivo:

Auxiliar o usuário a manter sua estratégia de investimentos.

O sistema deverá informar:

- situação atual;
- percentual ideal;
- diferença;
- próximos aportes sugeridos;
- impacto dos aportes.

As sugestões serão baseadas exclusivamente nas configurações do usuário.

---

## Gestão Fiscal

Objetivo:

Organizar continuamente todas as informações necessárias para facilitar a declaração do Imposto de Renda.

Exemplos:

- posição em 31/12;
- dividendos;
- JCP;
- ganho de capital;
- compensação de prejuízos;
- movimentações anuais;
- relatórios fiscais;
- histórico.

O objetivo é reduzir ao máximo o trabalho manual do investidor.

---

## Integrações

Responsável por importar informações externas.

Exemplos:

- B3;
- Investidor10;
- CSV;
- corretoras;
- APIs futuras.

As integrações apenas fornecem dados.

Nunca executam regras financeiras.

---

## Configurações

Responsável pelas preferências do usuário.

Exemplos:

- moeda principal;
- estratégia;
- metas;
- percentuais desejados;
- classes de ativos;
- preferências de importação;
- preferências fiscais.

---

## Relatórios

Objetivo:

Permitir análises detalhadas da carteira.

Exemplos:

- patrimônio;
- rentabilidade;
- proventos;
- rebalanceamento;
- histórico;
- evolução patrimonial;
- relatórios fiscais.

---

# Funcionalidades Futuras

O projeto deverá ser preparado para receber novos módulos sem necessidade de alterar a arquitetura principal.

Exemplos:

- metas financeiras;
- planejamento de aposentadoria;
- simuladores;
- carteira familiar;
- múltiplos usuários;
- aplicativo móvel;
- notificações;
- inteligência artificial;
- integração com bancos;
- sincronização automática com corretoras.

---

# Funcionalidades Fora do Escopo

O projeto não possui como objetivo:

- realizar operações de compra ou venda de ativos;
- substituir corretoras;
- realizar consultoria financeira;
- recomendar investimentos com base em opinião;
- oferecer sinais de trade;
- atuar como plataforma de notícias.

---

# Princípios de Evolução

Toda nova funcionalidade deverá:

- resolver um problema real;
- integrar-se aos módulos existentes;
- respeitar a arquitetura;
- preservar a simplicidade;
- ser preparada para crescimento futuro.

---

# Dependências Entre Módulos

As funcionalidades deverão seguir, sempre que possível, esta estrutura lógica:

Integrações

↓

Movimentações

↓

Motor Financeiro

↓

Carteira

↓

Dashboard

↓

Relatórios

↓

Gestão Fiscal

↓

Rebalanceamento

Nenhum módulo deverá ignorar esse fluxo sem justificativa técnica.

---

# Objetivo de Longo Prazo

O Lio Feliz deverá evoluir até tornar-se a principal plataforma utilizada pelo investidor para administrar seu patrimônio.

O usuário deverá conseguir importar seus dados, acompanhar sua evolução patrimonial, organizar suas obrigações fiscais, planejar aportes e administrar seus investimentos utilizando apenas o Lio Feliz.

---

# Histórico de Alterações

## Versão 1.0

- Definição dos módulos oficiais.
- Definição das responsabilidades de cada módulo.
- Definição das funcionalidades futuras.
- Definição das funcionalidades fora do escopo.
- Definição da estrutura lógica do produto.
