# Lio Feliz - Documentação Oficial

# 06_BUSINESS_RULES/01_PORTFOLIO.md

**Projeto:** Lio Feliz

**Documento:** 01_PORTFOLIO.md

**Versão:** 2.0

**Status:** APROVADO

**Última atualização:** 07/07/2026

---

# Objetivo

Este documento define as regras oficiais de funcionamento da Carteira do Lio Feliz.

A Carteira representa o estado consolidado do patrimônio do usuário e constitui o principal módulo funcional do sistema.

Ela nunca realiza cálculos diretamente.

Todos os cálculos são delegados às Engines descritas na documentação técnica.

---

# Responsabilidade

A Carteira possui apenas quatro responsabilidades:

- apresentar informações;
- disponibilizar consultas aos demais módulos;
- organizar os dados consolidados;
- refletir o estado atual do patrimônio.

Ela não executa regras financeiras.

---

# Dependências

A Carteira depende obrigatoriamente de:

- Portfolio Consolidation Engine
- Corporate Action Engine
- Serviço de Cotações
- Configurações do Usuário

---

# Fonte de Verdade

A Carteira nunca é considerada fonte primária.

Sua única fonte oficial é o resultado produzido pela:

Portfolio Consolidation Engine.

---

# Atualização

Sempre que ocorrer qualquer alteração em:

- movimentações;
- eventos corporativos;
- sincronizações;
- importações;
- configurações que afetem cálculos;

a Carteira deverá ser atualizada automaticamente.

---

# Informações Disponibilizadas

A Carteira deverá fornecer:

- patrimônio consolidado;
- custo investido;
- quantidade por ativo;
- preço médio;
- valor de mercado;
- lucro não realizado;
- rentabilidade;
- alocação por ativo;
- alocação por classe;
- alocação por setor;
- alocação por país;
- alocação por moeda.

---

# Organização

Cada posição deverá possuir obrigatoriamente:

- ativo;
- ticker;
- nome;
- classe;
- país;
- moeda;
- quantidade;
- preço médio;
- custo investido;
- cotação atual;
- valor de mercado;
- lucro;
- percentual da carteira;
- data da última atualização.

---

# Histórico

A Carteira deverá manter histórico suficiente para permitir:

- evolução patrimonial;
- evolução da carteira;
- evolução das posições;
- evolução da alocação.

O histórico nunca poderá depender de registros manuais.

---

# Consistência

Nunca será permitido:

- patrimônio negativo;
- posição negativa;
- preço médio negativo;
- custo negativo;
- quantidade negativa.

Caso alguma inconsistência seja detectada, a atualização deverá ser interrompida e registrada.

---

# Mercado Internacional

O funcionamento será exatamente igual para:

- Brasil;
- Estados Unidos;
- futuros mercados suportados.

A única diferença será:

- moeda;
- calendário;
- regras tributárias.

---

# Integração

Este módulo fornece informações para:

- Dashboard
- Dividendos
- Imposto de Renda
- Rebalanceamento
- Metas
- Relatórios
- Histórico

Nenhum desses módulos poderá recalcular posições.

---

# Consultas

Toda consulta deverá utilizar exclusivamente os dados consolidados produzidos pela Portfolio Consolidation Engine.

---

# Performance

A Carteira nunca deverá executar cálculos pesados.

Seu objetivo é apenas consumir resultados já consolidados.

---

# Referências

Este documento depende diretamente de:

07_TECHNICAL_ANNEXES/

- 01_PRICE_AVERAGE_ALGORITHMS.md
- 02_CORPORATE_ACTION_ENGINE.md
- 03_PORTFOLIO_CONSOLIDATION_ENGINE.md

---

# Decisões de Projeto

## Por que a Carteira não calcula nada?

Porque toda lógica financeira deve permanecer centralizada nas Engines.

Isso elimina divergências entre módulos.

---

## Por que existe apenas uma fonte de verdade?

Porque patrimônio, preço médio e posições devem ser exatamente iguais em qualquer tela do sistema.

---

## Por que separar visualização de cálculo?

Porque facilita manutenção, testes e evolução do projeto.

Também reduz drasticamente a possibilidade de bugs.

---

# Preparação para Crescimento

A arquitetura suporta futuramente:

- múltiplas carteiras;
- carteiras familiares;
- múltiplos usuários;
- novos mercados;
- novos tipos de ativos;
- novos motores de cálculo.

---

# Histórico

## Versão 2.0

Reestruturação completa.

A Carteira deixa de executar regras financeiras e passa a consumir exclusivamente os resultados produzidos pelas Engines oficiais do sistema.
