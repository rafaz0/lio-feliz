# 06_REBALANCEAMENTO.md — Regras de Rebalanceamento de Carteira

**Versão:** 1.0  
**Status:** APROVADO  
**Classificação:** Business Rule

---

## 1. Objetivo

Definir as regras de negócio para o rebalanceamento de carteiras de investimento — mecanismo que ajusta a alocação real da carteira em direção à alocação-alvo definida na estratégia do investidor.

---

## 2. Conceitos Fundamentais

### 2.1 Alocação-Alvo (Target Allocation)

Percentual desejado para cada classe de ativo, definido pelo usuário na estratégia. A soma de todos os percentuais-alvo deve ser exatamente 100%.

### 2.2 Alocação Atual (Current Allocation)

Percentual real de cada classe na carteira, calculado a partir dos preços de mercado dos ativos.

### 2.3 Banda de Tolerância

Desvio percentual máximo aceitável entre alocação atual e alocação-alvo antes que uma ação de rebalanceamento seja disparada.

Exemplo: tolerância de 5% para uma classe com alvo de 40% significa que a classe pode oscilar entre 35% e 45% sem disparar rebalanceamento.

### 2.4 Diferença de Alocação

`diferença = percentualAtual - percentualDesejado`

- Positiva: classe com **sobrepeso** (acima do alvo)
- Negativa: classe com **subpeso** (abaixo do alvo)

---

## 3. Métodos de Rebalanceamento

### 3.1 Por Aporte (Contribution-Based)

Apenas novas contribuições são direcionadas para as classes com subpeso. Nenhum ativo é vendido.

**Indicado para:** carteiras em acumulação, evitar custos fiscais e de corretagem.

### 3.2 Por Venda (Sell-Based)

Ativos com sobrepeso são vendidos para comprar ativos com subpeso.

**Indicado para:** carteiras consolidadas, correção rápida de alocação.

### 3.3 Misto (Mixed)

Combina aportes direcionados com vendas parciais. Vendem-se apenas classes com sobrepeso acima de um limiar (ex: 2× a tolerância), e o restante é ajustado via aporte.

---

## 4. Disparadores de Rebalanceamento

| Disparador               | Descrição                                                   | Default      |
| ------------------------ | ----------------------------------------------------------- | ------------ |
| **Banda de Tolerância**  | Qualquer classe ultrapassa a banda definida na estratégia   | 5% absoluto  |
| **Periódico**            | Rebalanceamento forçado em intervalo fixo (trimestral)      | 90 dias      |
| **Evento de Carteira**   | Aporte ou resgate significativo (>10% do patrimônio)        | Automático   |
| **Manual**               | Usuário solicita explicitamente o rebalanceamento           | Sob demanda  |

---

## 5. Regras de Cálculo

### 5.1 Cálculo da Alocação Atual

```
alocacaoClasse = (somaValorMercadoAtivosClasse / valorTotalCarteira) × 100
```

### 5.2 Cálculo da Diferença

```
diferenca = percentualAtual - percentualDesejado
```

### 5.3 Cálculo do Valor de Aporte Necessário

Para uma classe com subpeso (`diferenca < 0`):

```
valorNecessario = (percentualDesejado / 100 × novoTotal) - valorAtual
```

Onde `novoTotal = valorTotalCarteira + valorAporteTotal`.

### 5.4 Cálculo do Valor de Venda Necessário

Para uma classe com sobrepeso (`diferenca > 0`):

```
valorVender = (percentualAtual / 100 × valorTotal) - (percentualDesejado / 100 × valorTotal)
```

### 5.5 Priorização de Ações

Classes com `|diferença|` > `tolerância` são priorizadas:

1. Classes com maior `|diferença|` primeiro
2. Classes com maior `percentualDesejado` em caso de empate
3. Classes com menor liquidez por último (venda)

---

## 6. Regras de Tolerância

- A tolerância padrão é 5% absoluto (ex: alvo 40%, tolerância 5% → banda 35%-45%)
- Tolerância mínima: 1% (evita rebalanceamento por ruído)
- Tolerância máxima: 20% (evita alocação muito distante do alvo)
- Para classes com `percentualDesejado < tolerância`, a tolerância efetiva deve ser igual ao percentual desejado (evita que uma classe pequena fique com alocação negativa)
- Classes com `percentualDesejado = 0%` não devem ser consideradas para rebalanceamento

---

## 7. Regras Fiscais

- Rebalanceamento por **venda** em menos de 20 dias: sujeito a IR de 20% sobre ganho (day-trade)
- Rebalanceamento por **venda** após 20 dias: IR de 15% sobre ganho (swing-trade)
- Prejuízos de vendas podem ser compensados conforme regras fiscais vigentes
- Recomendação: priorizar aporte para evitar gatilho tributário

---

## 8. Apresentação dos Resultados

A tela de rebalanceamento deve exibir:

1. **Tabela de Comparação:** classes com alocação atual vs alocação desejada vs diferença
2. **Indicadores Visuais:** sobrepeso (vermelho), equilibrado (verde), subpeso (amarelo)
3. **Sugestão de Ações:** valor sugerido de aporte ou venda por classe
4. **Filtros:** todas as classes, apenas desbalanceadas, apenas equilibradas
5. **Gráfico de Pizza:** visualização da alocação atual vs desejada

---

## 9. Integração com Estratégia

A estratégia de alocação-alvo é definida em `ConfigurarEstrategiaCommand` e armazenada via `IConfigurationRepository`.

Campos relevantes:
- `percentuais: Record<string, number>` — alocação-alvo por classe
- `toleranciaRebalanceamento: number` — banda de tolerância percentual (default: 5)
- Rebalanceamento consulta esses dados automaticamente ao ser acionado

---

## 10. Casos de Limite

| Caso                                    | Comportamento Esperado                                                    |
| --------------------------------------- | ------------------------------------------------------------------------- |
| Nenhuma estratégia configurada          | Exibir mensagem "Configure uma estratégia de alocação"                    |
| Apenas uma classe de ativo              | Rebalanceamento não se aplica (100% em uma classe)                        |
| Aporte maior que o patrimônio atual     | Calcular normalmente (novoPatrimonio = atual + aporte)                    |
| Todas as classes dentro da tolerância   | Exibir "Carteira dentro da tolerância. Nenhuma ação necessária."          |
| Venda com prejuízo fiscal               | Exibir alerta de possível compensação de prejuízo                         |
| Estratégia com soma diferente de 100%   | Normalizar percentuais para somar 100% e exibir aviso ao usuário          |

---

## 11. Histórico

| Versão | Data       | Descrição                     | Autor    |
| ------ | ---------- | ----------------------------- | -------- |
| 1.0    | 20/07/2026 | Criação do documento oficial. | Time Dev |
