# Lio Feliz - Documentação Oficial

# 06_BUSINESS_RULES/07_METAS.md

**Projeto:** Lio Feliz

**Documento:** 07_METAS.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 20/07/2026

---

# Objetivo

Este documento define todas as regras relacionadas às metas financeiras do investidor.

No contexto do Lio Feliz, uma meta financeira representa um objetivo patrimonial que o investidor deseja alcançar em um prazo determinado.

Metas financeiras permitem:

- definir objetivos de curto, médio e longo prazo;
- acompanhar o progresso em direção a cada objetivo;
- projetar a data estimada de conclusão com base nos aportes atuais;
- orientar decisões de alocação e rebalanceamento;
- integrar com a estratégia de investimentos definida pelo usuário.

---

# Escopo

Este documento cobre:

- criação, atualização e gerenciamento de metas financeiras;
- categorização de metas por tipo (emergência, aposentadoria, educação, etc.);
- cálculo de progresso e projeção de conclusão;
- registro de contribuições (aportes) direcionados a metas;
- regras de transição de status (ativa, pausada, concluída, cancelada);
- consistência entre saldo da meta e saldo da carteira.

Este documento NÃO cobre:

- regras de rebalanceamento de carteira (documento 06_REBALANCEAMENTO.md);
- funcionalidades de configuração de perfil de investidor;
- cálculos de IR sobre resgates;
- execução automática de ordens para atingir metas.

---

# Conceitos

**Meta Financeira:** Um objetivo patrimonial com valor-alvo, prazo e categoria.

**Valor-Alvo (targetAmount):** O montante financeiro que o investidor deseja acumular.

**Valor Atual (currentAmount):** O montante já acumulado para a meta.

**Prazo (targetDate):** A data limite para atingir o valor-alvo.

**Contribuição:** Um aporte financeiro direcionado a uma meta específica.

**Progresso:** Percentual do valor-alvo já acumulado (currentAmount / targetAmount x 100).

**Projeção:** Data estimada de conclusão baseada no ritmo médio de contribuições.

**Categoria:** Classificação da meta (emergência, aposentadoria, educação, viagem, grande compra, investimento, outro).

**Status:** Estado atual da meta (ativa, pausada, concluída, cancelada).

---

# Entradas

O módulo de Metas recebe as seguintes informações:

- **Dados da Meta:** nome, valor-alvo, prazo, categoria.
- **Contribuições:** valor, data, tipo (manual ou recorrente).
- **Ações do Usuário:** pausar, retomar, concluir ou cancelar uma meta.
- **Saldo da Carteira:** informações de saldo disponível para validação de consistência (quando aplicável).

---

# Processamento

## Criação de Meta

Ao criar uma nova meta, o sistema deve:

1. validar que o valor-alvo é maior que zero;
2. validar que o prazo é posterior à data de criação;
3. validar que o nome da meta não está vazio;
4. definir o valor atual como zero;
5. definir o status como ATIVA;
6. definir a data de criação como a data atual;
7. registrar a data de atualização como a data atual;
8. emitir evento de domínio `GoalCreatedEvent`.

## Registro de Contribuição

Ao registrar uma contribuição em uma meta, o sistema deve:

1. validar que a meta está ativa (não pode receber contribuições se estiver pausada, concluída ou cancelada);
2. validar que o valor da contribuição é maior que zero;
3. validar que a data da contribuição não é posterior à data atual;
4. atualizar o valor atual da meta: `currentAmount = currentAmount + contributionAmount`;
5. validar que o valor atual não ultrapassa o valor-alvo;
6. registrar a contribuição no histórico da meta;
7. registrar a data de atualização;
8. se o valor atual atingir ou ultrapassar o valor-alvo, transicionar o status para CONCLUÍDA automaticamente;
9. emitir evento de domínio `GoalContributedEvent`;
10. se a meta foi concluída, emitir também `GoalCompletedEvent`.

## Cálculo de Progresso

O progresso de uma meta é calculado como:

```
progresso = (currentAmount / targetAmount) * 100
```

O progresso é sempre um valor entre 0 e 100 (inclusive).

## Projeção de Conclusão

A projeção de conclusão é calculada com base no histórico de contribuições:

1. calcular a média mensal de contribuições dos últimos 12 meses (ou desde a criação, se houver menos de 12 meses);
2. calcular o valor restante: `remainingAmount = targetAmount - currentAmount`;
3. calcular os meses restantes estimados: `remainingMonths = remainingAmount / monthlyAverage`;
4. calcular a data projetada: `projectedDate = dataAtual + remainingMonths`;

Se não houver contribuições registradas, a projeção retorna indefinida (não é possível projetar).

## Transição de Status

As transições de status permitidas são:

| De | Para | Condição |
|----|------|----------|
| ATIVA | PAUSADA | Usuário pausa a meta |
| PAUSADA | ATIVA | Usuário retoma a meta |
| ATIVA | CONCLUÍDA | currentAmount >= targetAmount (automática ou manual) |
| PAUSADA | CONCLUÍDA | currentAmount >= targetAmount (automática ou manual) |
| ATIVA | CANCELADA | Usuário cancela a meta |
| PAUSADA | CANCELADA | Usuário cancela a meta |

Transições não listadas são inválidas:
- Uma meta concluída não pode ser reativada.
- Uma meta cancelada não pode ser reativada.

## Atualização de Meta

O usuário pode atualizar nome, valor-alvo, prazo e categoria de uma meta ativa ou pausada.

Ao atualizar o valor-alvo, o sistema deve:
1. validar que o novo valor-alvo é maior que zero;
2. se o novo valor-alvo for menor que o valor atual, esto não configura conclusão automática (o usuário deve concluir manualmente).

Ao atualizar o prazo, o sistema deve:
1. validar que o novo prazo é posterior à data de criação.

---

# Saídas

O módulo de Metas produz as seguintes informações:

- **Lista de Metas:** todas as metas do usuário com status, progresso e dados básicos.
- **Detalhe da Meta:** informações completas de uma meta, incluindo histórico de contribuições.
- **Progresso da Meta:** percentual atingido, valor acumulado, valor restante.
- **Projeção da Meta:** data estimada de conclusão, meses restantes, ritmo mensal necessário.
- **Status Consolidado:** resumo de metas (total, concluídas, ativas, valor total alvo, valor total acumulado).

---

# Integração com Outros Módulos

**Dashboard:** Exibe resumo das metas, progresso geral e metas próximas da conclusão.

**Configurações:** Permite configurar a estratégia de investimento associada a cada meta.

**Rebalanceamento:** As metas podem influenciar a alocação-alvo durante o rebalanceamento.

**Relatórios:** Inclui relatórios de progresso de metas e projeções.

**Carteira:** O saldo da carteira pode ser comparado com o total de metas para validação de consistência.

---

# Casos Especiais

**Meta sem contribuições:** O progresso é 0% e a projeção não pode ser calculada.

**Valor atual ultrapassa valor-alvo:** O sistema deve permitir que o valor atual ultrapasse o valor-alvo apenas se o usuário concluir a meta manualmente com valor excedente. Em contribuições automáticas, o valor atual é limitado ao valor-alvo.

**Prazo expirado:** Se a data atual ultrapassar o prazo da meta e o valor atual for menor que o valor-alvo, a meta permanece ativa (não é automaticamente cancelada). O sistema deve exibir um indicador visual de prazo expirado.

**Meta cancelada com saldo:** Ao cancelar uma meta com valor atual maior que zero, o saldo permanece registrado para referência histórica. O valor não é automaticamente realocado.

**Múltiplas contribuições no mesmo dia:** São permitidas múltiplas contribuições no mesmo dia, desde que cada uma seja registrada individualmente.

**Categoria alterada após contribuições:** A categoria de uma meta pode ser alterada a qualquer momento, sem impacto no histórico de contribuições ou no cálculo de progresso.

---

# Regras Obrigatórias

1. O valor-alvo deve ser sempre maior que zero.
2. O prazo deve ser sempre posterior à data de criação.
3. O nome da meta não pode ser vazio.
4. O valor atual não pode ser negativo.
5. Uma meta concluída não pode receber novas contribuições.
6. Uma meta cancelada não pode ser reativada.
7. Cada contribuição deve ser registrada com data e valor.
8. A data da contribuição não pode ser posterior à data atual.
9. O progresso é sempre calculado como (currentAmount / targetAmount) x 100.
10. O progresso é limitado a 100% (não pode exceder).

---

# Regras Proibidas

1. Nunca permitir valor-alvo negativo ou zero.
2. Nunca permitir valor atual negativo.
3. Nunca permitir prazo anterior à data de criação.
4. Nunca registrar contribuição em meta concluída ou cancelada.
5. Nunca reativar meta concluída ou cancelada.
6. Nunca exibir progresso superior a 100%.
7. Nunca excluir permanentemente uma meta (deve ser cancelada, nunca removida).

---

# Preparação para Crescimento

O módulo de Metas deve permitir futuras expansões sem reescrita:

- **Metas Compartilhadas:** preparar para cenários onde múltiplos usuários contribuem para a mesma meta (ex.: casal).
- **Metas Recorrentes:** preparar para metas que se renovam automaticamente ao serem concluídas.
- **Metas com Submetas:** preparar para hierarquia de metas (ex.: viagem com submetas de passagem, hospedagem, alimentação).
- **Integração com Aportes Automáticos:** preparar para associar contribuições automáticas recorrentes a metas específicas.
- **Notificações:** preparar para disparo de notificações quando uma meta estiver próxima do prazo ou quando o progresso atingir marcos importantes (25%, 50%, 75%, 100%).

---

# Histórico

## Versão 1.0

- Criação do documento de Regra de Negócio do módulo de Metas.
- Definição de conceitos, fluxos de criação, contribuição, progresso e projeção.
- Definição de casos especiais, regras obrigatórias e regras proibidas.
