# Lio Feliz - Documentação Oficial

# 07_TECHNICAL_ANNEXES/03_PORTFOLIO_CONSOLIDATION_ENGINE.md

**Projeto:** Lio Feliz

**Documento:** 03_PORTFOLIO_CONSOLIDATION_ENGINE.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 07/07/2026

---

# Objetivo

Este documento define a arquitetura oficial da Portfolio Consolidation Engine.

A Portfolio Consolidation Engine é responsável por transformar movimentações financeiras e eventos corporativos na posição consolidada da carteira.

Ela representa a única fonte oficial para cálculo das posições do usuário.

Nenhum outro módulo poderá consolidar posições utilizando lógica própria.

---

# Responsabilidades

A Engine deverá:

- consolidar posições;
- calcular custo total;
- calcular preço médio;
- calcular quantidade;
- calcular patrimônio;
- calcular lucro não realizado;
- calcular rentabilidade;
- calcular alocação;
- produzir o estado atual da carteira.

---

# Entradas

A Engine receberá dados exclusivamente de:

- módulo de movimentações;
- Corporate Action Engine;
- serviço de cotações;
- configurações do usuário.

---

# Saídas

A Engine produzirá:

- posições consolidadas;
- patrimônio consolidado;
- custo investido;
- preço médio;
- quantidade por ativo;
- lucro/prejuízo não realizado;
- percentuais de alocação;
- histórico consolidado.

---

# Fluxo Oficial

Toda consolidação deverá seguir obrigatoriamente esta ordem:

1. Carregar movimentações válidas.
2. Aplicar eventos corporativos.
3. Validar consistência.
4. Consolidar quantidades.
5. Consolidar custos.
6. Calcular preços médios.
7. Buscar cotações.
8. Calcular patrimônio.
9. Calcular alocação.
10. Publicar resultado.

A ordem nunca poderá ser alterada.

---

# Fonte de Verdade

A posição consolidada produzida por esta Engine será considerada a única fonte oficial para:

- Carteira;
- Dashboard;
- Rebalanceamento;
- Dividendos;
- Imposto de Renda;
- Relatórios;
- Metas.

---

# Regras

A Engine nunca poderá:

- modificar movimentações;
- interpretar eventos corporativos;
- importar dados externos;
- alterar configurações.

Sua responsabilidade é apenas consolidar.

---

# Recalculo

Sempre que ocorrer:

- nova compra;
- nova venda;
- novo evento corporativo;
- alteração manual aprovada;
- sincronização concluída;

a consolidação deverá ser refeita automaticamente.

---

# Performance

A Engine deverá produzir exatamente o mesmo resultado independentemente do número de execuções.

Ela deverá ser idempotente.

---

# Casos Especiais

Deverá suportar:

- múltiplas moedas;
- ativos internacionais;
- ativos fracionários;
- ativos sem cotação;
- ativos temporariamente suspensos;
- múltiplas carteiras (futuro).

---

# Decisões de Projeto

## Por que existe uma Engine específica?

Para impedir que diferentes módulos calculem a carteira de maneiras diferentes.

---

## Por que recalcular em vez de armazenar?

Porque as movimentações são a fonte de verdade.

A carteira sempre pode ser reconstruída.

---

## Por que os outros módulos não podem consolidar posições?

Porque isso criaria inconsistências entre patrimônio, IR, dashboard e relatórios.

---

# Impacto

Este documento é utilizado diretamente por:

- 01_PORTFOLIO.md
- REBALANCING
- IR
- DASHBOARD
- REPORTS
- GOALS

---

# Histórico

## Versão 1.0

Criação da arquitetura oficial da Portfolio Consolidation Engine.
