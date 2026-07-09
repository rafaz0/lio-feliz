# Lio Feliz - Documentação Oficial

# 07_TECHNICAL_ANNEXES/02_CORPORATE_ACTION_ENGINE.md

**Projeto:** Lio Feliz

**Documento:** 02_CORPORATE_ACTION_ENGINE.md

**Versão:** 1.1

**Status:** APROVADO

**Última atualização:** 09/07/2026

---

# Objetivo

Este documento define a arquitetura oficial da Engine de Eventos Corporativos do Lio Feliz.

A Engine de Eventos Corporativos é o único componente autorizado a interpretar e aplicar eventos corporativos que afetem ativos financeiros.

Nenhum outro módulo poderá implementar regras próprias para esses eventos.

---

# Objetivo da Engine

Centralizar toda a lógica relacionada a eventos corporativos para garantir:

- consistência;
- rastreabilidade;
- reutilização;
- facilidade de manutenção;
- conformidade tributária.

---

# Escopo

A Engine será responsável por interpretar, validar e aplicar eventos como:

- Desdobramentos (Split);
- Grupamentos (Reverse Split);
- Bonificações;
- Subscrições;
- Incorporações;
- Fusões;
- Cisões.

Novos eventos poderão ser adicionados futuramente sem alterar a arquitetura principal.

---

# Princípios

A Engine deverá ser:

- determinística;
- auditável;
- idempotente;
- modular;
- independente da interface;
- independente do banco de dados.

---

# Fluxo Geral

Todo evento seguirá obrigatoriamente o fluxo abaixo:

Recebimento do evento

↓

Validação

↓

Classificação

↓

Aplicação das regras

↓

Geração das alterações

↓

Atualização das posições

↓

Atualização do histórico

↓

Atualização do patrimônio

↓

Atualização dos módulos dependentes

---

# Fonte dos Eventos

Os eventos poderão ser obtidos de:

- APIs financeiras;
- integração com corretoras;
- integração com a B3;
- importações de arquivos;
- cadastro manual (quando permitido).

Toda origem deverá ser registrada.

---

# Classificação

Todo evento deverá possuir obrigatoriamente:

- identificador único;
- tipo;
- ativo afetado;
- data de aprovação;
- data de efetivação;
- origem;
- status.

---

# Regras Gerais

Cada tipo de evento possuirá um processador específico.

Exemplo:

SplitProcessor

BonusProcessor

SubscriptionProcessor

MergerProcessor

Etc.

Nenhum processador poderá modificar regras pertencentes a outro.

---

# Resultado do Processamento

Todo evento deverá produzir um conjunto padronizado de alterações.

Exemplo:

- alteração de quantidade;
- alteração de custo;
- alteração de ticker;
- alteração de moeda;
- atualização de histórico.

---

# Rastreabilidade

Toda alteração deverá registrar:

- evento de origem;
- data;
- usuário (quando aplicável);
- regra aplicada;
- resultado produzido.

Nenhuma alteração poderá ocorrer sem rastreabilidade.

---

# Tratamento de Erros

Caso um evento não possa ser interpretado:

- nenhuma alteração será aplicada;
- o evento será marcado como pendente;
- será gerado um log detalhado;
- o usuário poderá revisar posteriormente.

---

# Integração com Outros Módulos

A Engine fornecerá informações para:

- Carteira;
- Histórico;
- Patrimônio;
- Rebalanceamento;
- Imposto de Renda;
- Dashboard;
- Relatórios.

Nenhum desses módulos deverá implementar lógica própria para eventos corporativos.

---

# Compatibilidade Internacional

A arquitetura deverá permitir eventos de diferentes mercados.

Cada país poderá possuir processadores específicos.

A interface da Engine permanecerá a mesma.

---

# Casos Especiais

A Engine deverá suportar:

- múltiplos eventos no mesmo dia;
- eventos retroativos;
- correções de eventos;
- cancelamentos;
- eventos parciais;
- ativos fracionários.

---

# Decisões de Projeto

## Por que existe uma Engine específica?

Porque eventos corporativos afetam diversos módulos simultaneamente.

Centralizar essa lógica evita duplicação e inconsistências.

---

## Por que utilizar processadores separados?

Cada evento possui regras próprias.

Separar os processadores reduz acoplamento e facilita manutenção.

---

## Por que manter rastreabilidade completa?

Para permitir auditoria, depuração e conformidade fiscal.

---

# Preparação para Crescimento

A arquitetura foi projetada para suportar:

- novos mercados;
- novos tipos de ativos;
- novos eventos corporativos;
- múltiplas integrações;
- múltiplas carteiras.

---

# Histórico

## Versão 1.1

- Removidos Dividendos e JCP do escopo da Engine.
- Corporate Action Engine agora responsável apenas por eventos societários.
- Dividendos e JCP serão tratados futuramente pela Proventos Engine.

## Versão 1.0

- Criação da arquitetura oficial da Engine de Eventos Corporativos.
- Definição do fluxo padrão de processamento.
- Centralização das regras de eventos corporativos.
