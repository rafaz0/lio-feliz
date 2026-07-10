# Lio Feliz - Documentação Oficial

# 16_PRODUCT_BACKLOG.md

**Projeto:** Lio Feliz

**Documento:** 16_PRODUCT_BACKLOG.md

**Versão:** 1.4

**Status:** APROVADO

**Última atualização:** 09/07/2026

---

# Objetivo

Este documento registra todas as funcionalidades aprovadas para o Lio Feliz.

Ele representa o backlog oficial do produto.

Nenhuma funcionalidade aprovada deverá existir apenas em conversas.

Toda funcionalidade deverá ser registrada neste documento antes de sua implementação.

---

# Ciclo de Vida das Funcionalidades

Toda funcionalidade deverá seguir obrigatoriamente o fluxo:

💡 Ideia

↓

✅ Aprovada

↓

📝 Documentada

↓

🏗 Em Desenvolvimento

↓

🧪 Testes

↓

🚀 Implementada

---

# Horizontes

**MLP** — Minimum Loveable Product: Funcionalidades essenciais para o lançamento.

**Evolução** — Funcionalidades que expandem o sistema após o MLP.

**Visão** — Funcionalidades de longo prazo que consolidam o sistema como plataforma completa.

---

# Prioridades

P0 — Essencial

P1 — Alta

P2 — Média

P3 — Baixa

P4 — Futuro

Pós-MLP — Pós Minimum Loveable Product

---

# Categorias

- Arquitetura
- Arquitetura da Documentação
- Carteira
- Mercado
- Proventos
- Eventos Corporativos
- Tributação
- Vida Financeira
- UX
- Dashboard
- Histórico
- Relatórios
- IA
- Automação
- Integrações
- Monetização
- Segurança
- Performance
- Insights
- Governança da Documentação

---

# Funcionalidades

## FEAT-001

Título

Sistema de Assinaturas

Categoria

Monetização

Horizonte

MLP

Prioridade

P1

Status

📝 Documentada

Descrição

Permitir utilização do sistema através de planos gratuitos e Premium.

Documentos relacionados

15_PRODUCT_PHILOSOPHY.md

---

## FEAT-002

Título

Plano Gratuito

Categoria

Monetização

Horizonte

MLP

Prioridade

P1

Status

📝 Documentada

Descrição

Permitir que novos usuários conheçam o sistema gratuitamente, com limitações de recursos, sem comprometer a experiência.

---

## FEAT-003

Título

Plano Premium

Categoria

Monetização

Horizonte

MLP

Prioridade

P1

Status

📝 Documentada

Descrição

Disponibilizar todos os recursos avançados mediante assinatura.

---

## FEAT-004

Título

Subscription Engine

Categoria

Arquitetura

Horizonte

MLP

Prioridade

P2

Status

💡 Ideia

Descrição

Motor responsável por autenticação, planos, permissões, renovação, cancelamento e período de testes.

---

## FEAT-005

Título

Integração Oficial com B3

Categoria

Integrações

Horizonte

Evolução

Prioridade

P2

Status

💡 Ideia

Descrição

Sincronizar automaticamente operações realizadas na corretora.

Implementar apenas quando financeiramente viável.

---

## FEAT-006

Título

Vida Financeira

Categoria

Vida Financeira

Horizonte

Evolução

Prioridade

P2

Status

📝 Documentada

Descrição

Controle opcional de receitas e despesas pessoais.

---

## FEAT-007

Título

Integração Carteira ↔ Vida Financeira

Categoria

Vida Financeira

Horizonte

Evolução

Prioridade

P2

Status

📝 Documentada

Descrição

Permitir vincular investimentos ao saldo financeiro sem tornar a integração obrigatória.

---

## FEAT-008

Título

Notificações Inteligentes

Categoria

UX

Horizonte

Evolução

Prioridade

P2

Status

📝 Documentada

Descrição

Enviar apenas notificações relevantes, evitando excesso de informações.

---

## FEAT-009

Título

Atualizações Automáticas

Categoria

Arquitetura

Horizonte

MLP

Prioridade

P1

Status

📝 Documentada

Descrição

Sempre que possível, o sistema deverá atualizar informações automaticamente, reduzindo a necessidade de manutenção manual pelo usuário.

---

## FEAT-010

Título

Feature Flags por Plano

Categoria

Arquitetura

Horizonte

Evolução

Prioridade

P2

Status

💡 Ideia

Descrição

Cada funcionalidade poderá ser disponibilizada conforme o plano do usuário (Free, Premium ou Administrador).

---

## FEAT-011

Título

ADR-009 — Arquitetura da Documentação

Categoria

Arquitetura da Documentação

Horizonte

Pós-MLP

Prioridade

Pós-MLP

Status

✅ Aprovada

Descrição

Criar um ADR consolidando a estrutura física da documentação, ordem oficial de leitura, papel da Traceability Matrix, documentos de governança, metodologia de Consolidação, Sprint de Estabilização e fluxo oficial de auditoria.

---

## FEAT-012

Título

Proventos Engine

Categoria

Proventos

Horizonte

Pós-MLP

Prioridade

Pós-MLP

Status

✅ Aprovada

Descrição

Substituir futuramente o conceito de Dividend Engine por Proventos Engine. O novo motor será responsável por Dividendos, JCP, Rendimentos de FIIs e demais proventos financeiros. A Corporate Action Engine ficará responsável apenas por eventos societários.

---

## FEAT-013

Título

Governança Documental

Categoria

Arquitetura

Horizonte

Visão

Prioridade

Baixa

Status

💡 Ideia

Descrição

Avaliar futuramente a criação de uma estrutura específica para documentos de governança, incluindo PROJECT_STATE, CHANGELOG_DOCUMENTACAO, DOCUMENTATION_INDEX, 00_START_HERE, Traceability Matrix e Glossário.

---

## FEAT-014

Título

Template Oficial de Prompts

Categoria

IA

Horizonte

MLP

Prioridade

Alta

Status

✅ Aprovada

Descrição

Criar um template oficial para todas as interações com o OpenCode. Todos os prompts deverão seguir um padrão único.

---

## FEAT-015

Título

Fluxo Oficial de Auditoria

Categoria

Arquitetura

Horizonte

MLP

Prioridade

Alta

Status

✅ Aprovada

Descrição

Formalizar o fluxo: Arquitetura → Execução → Auditoria → Aprovação → Correção → Nova Auditoria.

---

## FEAT-016

Título

Sistema de Baselines da Documentação

Categoria

Governança da Documentação

Horizonte

Pós-MLP

Prioridade

Pós-MLP

Status

✅ Aprovada

Descrição

Criar um mecanismo oficial para registrar versões estáveis da documentação após grandes marcos do projeto.

Cada Baseline deverá representar um ponto em que toda a documentação foi auditada, validada e considerada consistente.

Exemplos: Baseline 1.0, Baseline 2.0, Baseline 3.0.

Cada Baseline deverá registrar, no mínimo:

- Data da criação
- Consolidação correspondente
- Sprint de Estabilização correspondente
- Quantidade de documentos oficiais
- Quantidade de ADRs
- Quantidade de Business Rules
- Quantidade de Use Cases
- Quantidade de Technical Annexes
- Quantidade de funcionalidades (FEATs)
- Resumo das principais alterações
- Situação geral da arquitetura

Objetivos: facilitar auditorias futuras, permitir comparação entre versões, servir como ponto oficial de retorno em caso de inconsistências e registrar a evolução arquitetural do projeto.

---

## FEAT-017

Título

Governança Oficial do Projeto

Categoria

Governança da Documentação

Horizonte

Visão

Prioridade

Baixa

Status

💡 Ideia

Descrição

Criar futuramente um documento oficial responsável por consolidar toda a metodologia de desenvolvimento do projeto Lio Feliz, reunindo em um único local todas as decisões relacionadas ao processo de desenvolvimento e manutenção.

O documento deverá contemplar, no mínimo: Filosofia do projeto; Princípios arquiteturais; Hierarquia oficial da documentação; Papéis e responsabilidades (ChatGPT, OpenCode e desenvolvedores); Fluxo oficial de desenvolvimento; Processo de aprovação de ideias; Processo de implementação; Processo de auditoria; Sprint de Estabilização; Consolidação da documentação; Sistema de Baselines; Governança documental; Critérios para criação de ADRs, Business Rules, Use Cases e Technical Annexes; Processo oficial de versionamento da documentação.

Dependências: Preferencialmente criar após a conclusão da primeira versão estável (MLP), quando a metodologia já estiver suficientemente madura.

---

## FEAT-018

Título

Linha do Tempo Patrimonial

Categoria

Histórico

Horizonte

Evolução

Prioridade

P3

Status

✅ Aprovada

Descrição

Disponibilizar uma linha do tempo cronológica reconstruída a partir do Portfolio Ledger, permitindo ao usuário navegar por toda sua história patrimonial, incluindo operações, proventos, eventos corporativos e marcos importantes.

---

## FEAT-019

Título

Replay Patrimonial

Categoria

Histórico

Horizonte

Evolução

Prioridade

P3

Status

✅ Aprovada

Descrição

Permitir reconstruir integralmente a carteira em qualquer data do histórico, exibindo patrimônio, posições, preço médio, caixa, proventos acumulados e demais informações disponíveis naquele momento.

---

## FEAT-020

Título

Inteligência Histórica

Categoria

Histórico

Horizonte

Visão

Prioridade

P4

Status

✅ Aprovada

Descrição

Disponibilizar análises históricas da vida patrimonial do investidor, incluindo evolução do patrimônio, marcos importantes, estatísticas pessoais e comparações entre períodos.

---

## FEAT-021

Título

Insights Comportamentais

Categoria

Insights

Horizonte

Visão

Prioridade

P4

Status

✅ Aprovada

Descrição

Evoluir o Strategy Engine para fornecer análises sobre o comportamento histórico do investidor, identificando padrões de aportes, diversificação, concentração e disciplina de investimentos, sem realizar recomendações automáticas de compra ou venda.

---

## FEAT-022

Título

Automação da Governança Documental

Categoria

Governança

Horizonte

Visão

Prioridade

P4

Status

✅ Aprovada

Descrição

Criar ferramentas responsáveis por automatizar: regeneração do DOCUMENTACAO_COMPLETA.md; sincronização dos backups; sincronização das Copias_Individuais; validação de links; validação de referências cruzadas; validação da documentação; geração automática de relatórios de inconsistência.

---

# Observações

Este backlog é um documento vivo.

Novas funcionalidades aprovadas deverão ser registradas imediatamente após sua aprovação.

Nenhuma funcionalidade poderá ser implementada sem estar registrada neste documento.

---

# Histórico

## Versão 1.5

Adicionado FEAT-022 — Automação da Governança Documental.

## Versão 1.4

Adicionada classificação por Horizonte (MLP, Evolução, Visão).
Adicionados FEAT-018 a FEAT-021 — Fase 2: Histórico e Insights.

## Versão 1.3

Adicionado FEAT-017 — Governança Oficial do Projeto.

## Versão 1.2

Adicionado FEAT-016 — Sistema de Baselines da Documentação.

## Versão 1.1

Adicionados FEAT-011 a FEAT-015 (itens documentais aprovados).

## Versão 1.0

Criação do backlog oficial do produto.
