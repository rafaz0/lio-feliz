# Lio Feliz - Documentação Oficial

# 07_TECHNICAL_ANNEXES/05_ENGINE_ORCHESTRATOR.md

**Projeto:** Lio Feliz

**Documento:** 05_ENGINE_ORCHESTRATOR.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 07/07/2026

---

# Objetivo

O Engine Orchestrator é responsável por coordenar toda a execução das Engines do sistema.

Ele não realiza cálculos financeiros.

Ele não possui regras tributárias.

Ele não modifica a carteira.

Sua única responsabilidade é controlar quando cada Engine deve executar.

---

# Filosofia

Cada Engine resolve um problema.

O Orchestrator resolve a ordem dos problemas.

---

# Responsabilidades

- iniciar fluxos automáticos;
- iniciar fluxos manuais;
- controlar dependências;
- impedir execuções desnecessárias;
- registrar histórico das execuções;
- controlar prioridades;
- controlar reprocessamentos;
- garantir consistência entre Engines.

---

# Princípios

O Orchestrator deverá ser:

- determinístico;
- previsível;
- resiliente;
- auditável;
- desacoplado.

---

# Fluxo Principal

Sempre que ocorrer uma sincronização completa:

Import & Sync Engine

↓

Corporate Action Engine

↓

Portfolio Consolidation Engine

↓

Tax Engine

↓

Portfolio Decision Engine

↓

Insight Engine

↓

Health Engine

↓

Atualização da Interface

---

# Execução Parcial

Nem todas as Engines precisam executar sempre.

Exemplo:

Mudança apenas de cotação.

↓

Portfolio Consolidation Engine

↓

Portfolio Decision Engine

↓

Insight Engine

Sem necessidade de recalcular IR.

---

# Dependências

Nenhuma Engine deverá chamar outra Engine diretamente.

Toda coordenação deverá passar pelo Orchestrator.

---

# Gatilhos

O Orchestrator poderá iniciar execuções por:

- sincronização automática;
- sincronização manual;
- nova operação;
- evento corporativo;
- atualização de cotações;
- alteração de estratégia;
- importação de carteira;
- restauração de backup;
- atualização de configurações.

---

# Auto Recovery

Sempre que possível o Orchestrator deverá tentar recuperar falhas automaticamente.

Exemplo:

Falha em um provedor.

↓

Trocar provedor.

↓

Reexecutar apenas a Engine afetada.

---

# Reprocessamento

Caso uma Engine falhe, somente ela deverá ser reexecutada.

Nunca reiniciar todo o fluxo sem necessidade.

---

# Execuções Assíncronas

Sempre que possível as Engines independentes poderão executar em paralelo.

Exemplo:

Atualização de cotações.

Atualização do dólar.

Atualização dos índices.

Esses processos poderão ocorrer simultaneamente.

---

# Registro de Execuções

Cada execução deverá registrar:

- data;
- hora;
- Engine executada;
- duração;
- resultado;
- falhas;
- tentativas de recuperação.

---

# Monitoramento

O Orchestrator fornecerá informações para a Health Engine.

Exemplo:

Última sincronização.

Tempo médio.

Falhas recorrentes.

---

# Extensibilidade

Novas Engines poderão ser adicionadas sem modificar as Engines existentes.

Bastará registrá-las no fluxo do Orchestrator.

---

# Decisões de Projeto

## Por que criar um Orchestrator?

Para impedir que Engines dependam umas das outras.

---

## Por que controlar dependências?

Para permitir evolução futura sem reescrever módulos existentes.

---

## Por que registrar execuções?

Para facilitar auditoria e diagnóstico.

---

# Histórico

## Versão 1.0

Criação do Engine Orchestrator.
