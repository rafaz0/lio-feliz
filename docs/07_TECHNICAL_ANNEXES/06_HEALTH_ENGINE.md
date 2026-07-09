# Lio Feliz - Documentação Oficial

# 07_TECHNICAL_ANNEXES/06_HEALTH_ENGINE.md

**Projeto:** Lio Feliz

**Documento:** 06_HEALTH_ENGINE.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 07/07/2026

---

# Objetivo

A Health Engine é responsável por monitorar continuamente a saúde do sistema, verificar a integridade das informações e detectar problemas antes que afetem o usuário.

Ela não realiza cálculos financeiros nem altera regras de negócio.

Seu objetivo é garantir que todas as demais Engines possam operar de forma confiável.

---

# Filosofia

A complexidade pertence ao sistema, nunca ao usuário.

Sempre que possível, o próprio sistema deverá identificar, diagnosticar e corrigir problemas automaticamente.

O usuário somente será informado quando sua intervenção realmente for necessária.

---

# Responsabilidades

A Health Engine deverá:

- monitorar a execução das Engines;
- verificar a integridade dos dados;
- detectar inconsistências;
- validar sincronizações;
- acompanhar o funcionamento dos provedores externos;
- registrar falhas;
- acompanhar tentativas de recuperação automática;
- gerar diagnósticos da aplicação.

---

# Fontes de Informação

A Health Engine poderá consultar:

- Engine Orchestrator;
- Import & Sync Engine;
- Portfolio Consolidation Engine;
- Corporate Action Engine;
- Tax Engine;
- Insight Engine.

Ela nunca deverá consultar diretamente APIs externas.

---

# Verificações

Entre as verificações periódicas poderão existir:

- última sincronização;
- sucesso da última atualização;
- falhas recorrentes;
- divergências de posições;
- inconsistências matemáticas;
- ativos sem cotação;
- eventos corporativos pendentes;
- dados tributários incompletos;
- histórico corrompido.

---

# Níveis de Severidade

## Nível 0

Tudo funcionando normalmente.

Nenhuma ação necessária.

---

## Nível 1

Problema resolvido automaticamente.

Nenhuma mensagem ao usuário.

Registrar apenas no histórico técnico.

---

## Nível 2

Problema identificado.

Nova tentativa automática será realizada.

Usuário não precisa agir.

---

## Nível 3

Problema persistente.

Usuário deverá ser informado através da Insight Engine.

---

## Nível 4

Problema crítico.

A intervenção do usuário é obrigatória.

---

# Auto Recovery

Sempre que possível deverão ser realizadas ações automáticas, como:

- trocar o provedor de mercado;
- repetir sincronizações;
- recalcular posições;
- reconstruir índices internos;
- validar novamente operações.

---

# Histórico Técnico

A Health Engine manterá registros contendo:

- data;
- hora;
- Engine envolvida;
- duração;
- resultado;
- tentativas realizadas;
- solução aplicada.

---

# Indicadores de Saúde

A aplicação poderá exibir indicadores como:

- última sincronização;
- tempo desde a última atualização;
- status geral;
- quantidade de problemas pendentes;
- quantidade de recuperações automáticas.

---

# Relação com a Insight Engine

A Health Engine nunca comunica diretamente com o usuário.

Ela apenas produz diagnósticos.

A Insight Engine decide se o usuário deverá ser informado.

---

# Relação com o Engine Orchestrator

Toda execução deverá ser acompanhada pela Health Engine.

Ela poderá solicitar reprocessamentos quando necessário.

A decisão final continuará sendo do Engine Orchestrator.

---

# Extensibilidade

Novas verificações poderão ser adicionadas sem alterar as existentes.

Cada rotina deverá possuir responsabilidade única.

---

# Decisões de Projeto

## Por que separar Health Engine e Insight Engine?

Porque monitoramento e comunicação possuem responsabilidades diferentes.

---

## Por que ocultar problemas resolvidos automaticamente?

Porque o objetivo do sistema é reduzir a carga cognitiva do usuário.

---

## Por que registrar todas as falhas?

Para facilitar auditorias, diagnósticos e evolução da plataforma.

---

# Histórico

## Versão 1.0

Criação da Health Engine.

Definição oficial da estratégia de monitoramento e recuperação automática.
