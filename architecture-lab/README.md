# Architecture Lab

O Architecture Lab é um ambiente de descoberta arquitetural do projeto Lio Feliz, independente da documentação oficial.

## Propósito

- Amadurecimento de conceitos arquiteturais antes de sua oficialização.
- Preservação de hipóteses, pesquisas e raciocínios.
- Exploração livre sem compromisso com implementação imediata.

## Regras

- O laboratório **não faz parte** da documentação oficial.
- Nenhum documento em `docs/` deve ser alterado a partir deste laboratório.
- Somente conceitos maduros e validados poderão migrar para `docs/`.
- Ideias ainda não representam decisões oficiais.
- Sempre que existir dúvida entre registrar uma hipótese ou consolidá-la como verdade, optar pela hipótese.
- O laboratório privilegia a preservação do raciocínio sobre a conclusão.

## Fluxo de Evolução

Ideia

↓

Research Log

↓

Discussão

↓

Hipótese

↓

Validação

↓

Constituição

↓

Modelo Conceitual

↓

ADR

↓

Business Rules

↓

Implementação

## Estados

Rascunho

↓

Exploração

↓

Hipótese

↓

Validação

↓

Consolidado

↓

Oficializado

## Critérios para promoção

Uma ideia somente poderá migrar para a documentação oficial quando:

- explicar um problema do domínio;
- sobreviver aos cenários extremos;
- simplificar a arquitetura;
- não contradizer princípios existentes;
- utilizar linguagem consolidada.

## Estrutura atual

00_CONSTITUTION.md

01_DOMAIN_MODEL.md

02_DOMAIN_LAWS.md

03_KNOWLEDGE_FLOW.md

04_CANONICAL_LANGUAGE.md

05_RESEARCH_LOG.md

06_IDEAS_BACKLOG.md