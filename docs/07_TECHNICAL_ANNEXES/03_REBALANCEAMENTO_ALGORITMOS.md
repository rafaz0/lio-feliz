# 03_REBALANCEAMENTO_ALGORITMOS.md — Algoritmos de Rebalanceamento

**Versão:** 1.0  
**Status:** APROVADO  
**Classificação:** Technical Annex

---

## 1. Objetivo

Definir os algoritmos, fórmulas e pseudocódigo para o cálculo de rebalanceamento de carteira.

---

## 2. Estruturas de Dados

### 2.1 AlocacaoAtual (entrada)

```typescript
interface AlocacaoAtual {
  classe: string; // "acoes", "fiis", "etf", "renda_fixa", etc.
  valorPresente: number; // valor de mercado total na classe
  percentual: number; // percentual calculado (0-100)
}
```

### 2.2 AlocacaoAlvo (entrada — da estratégia)

```typescript
interface AlocacaoAlvo {
  classe: string;
  percentualDesejado: number; // 0-100, soma = 100
}
```

### 2.3 DiferencaAlocacao (intermediária)

```typescript
interface DiferencaAlocacao {
  classe: string;
  percentualAtual: number;
  percentualDesejado: number;
  diferenca: number; // atual - desejado (positivo = sobrepeso)
  dentroDaTolerancia: boolean;
}
```

---

## 3. Algoritmos

### 3.1 Cálculo de Alocação Atual

```
funcao calcularAlocacaoAtual(posicoes: Posicao[]): AlocacaoAtual[]

  valorTotal = soma(posicoes.map(p => p.valorTotal))
  se valorTotal = 0: retornar []

  grupos = agruparPorClasse(posicoes)
  para cada grupo em grupos:
    valorClasse = soma(grupo.map(p => p.valorTotal))
    percentual = arredondar((valorClasse / valorTotal) * 100, 2)
    adicionar { classe: grupo.classe, valorPresente: valorClasse, percentual }

  retornar resultado ordenado por percentual decrescente
```

### 3.2 Cálculo de Diferenças

```
funcao calcularDiferencas(
  alocacaoAtual: AlocacaoAtual[],
  alocacaoAlvo: AlocacaoAlvo[],
  tolerancia: number
): DiferencaAlocacao[]

  resultado = []
  para cada alvo em alocacaoAlvo:
    atual = buscar(alocacaoAtual, a => a.classe = alvo.classe)
    percentualAtual = atual ? atual.percentual : 0
    diferenca = arredondar(percentualAtual - alvo.percentualDesejado, 2)
    dentroDaTolerancia = |diferenca| <= tolerancia
    adicionar { classe, percentualAtual, percentualDesejado: alvo.percentualDesejado, diferenca, dentroDaTolerancia }

  // Incluir classes na alocação atual que não estão no alvo
  para cada atual em alocacaoAtual:
    se nao existe alvo para atual.classe em alocacaoAlvo:
      adicionar { classe: atual.classe, percentualAtual: atual.percentual, percentualDesejado: 0, diferenca: atual.percentual, dentroDaTolerancia: false }

  retornar resultado
```

### 3.3 Cálculo de Sugestão de Aporte

```
funcao calcularSugestaoAporte(
  diferencas: DiferencaAlocacao[],
  valorTotalAtual: number,
  valorAporte: number
): SugestaoAporte[]

  novoValorTotal = valorTotalAtual + valorAporte
  resultado = []

  // Calcular valor-alvo para cada classe no novo patrimônio
  para cada diff em diferencas onde diff.diferenca < 0 e not diff.dentroDaTolerancia:
    valorAlvo = (diff.percentualDesejado / 100) * novoValorTotal
    valorAtual = (diff.percentualAtual / 100) * valorTotalAtual
    valorNecessario = arredondar(valorAlvo - valorAtual, 2)

    adicionar {
      classe: diff.classe,
      valorSugerido: max(0, valorNecessario),
      acao: "APORTE"
    }

  retornar resultado ordenado por |diff.diferenca| decrescente
```

### 3.4 Cálculo de Sugestão de Venda

```
funcao calcularSugestaoVenda(
  diferencas: DiferencaAlocacao[],
  valorTotal: number
): SugestaoVenda[]

  resultado = []

  para cada diff em diferencas onde diff.diferenca > 0 e not diff.dentroDaTolerancia:
    valorAtualClasse = (diff.percentualAtual / 100) * valorTotal
    valorAlvoClasse = (diff.percentualDesejado / 100) * valorTotal
    valorVender = arredondar(valorAtualClasse - valorAlvoClasse, 2)

    adicionar {
      classe: diff.classe,
      valorSugerido: max(0, valorVender),
      acao: "VENDER"
    }

  retornar resultado ordenado por |diff.diferenca| decrescente
```

### 3.5 Verificação de Necessidade de Rebalanceamento

```
funcao precisaRebalancear(
  diferencas: DiferencaAlocacao[],
  tolerancia: number
): boolean

  // Retorna true se alguma classe extrapolou a tolerância
  para cada diff em diferencas:
    toleranciaEfetiva = min(tolerancia, diff.percentualDesejado) se diff.percentualDesejado > 0
                       senao tolerancia
    se |diff.diferenca| > toleranciaEfetiva:
      retornar true

  retornar false
```

### 3.6 Normalização de Percentuais

```
funcao normalizarPercentuais(
  percentuais: Record<string, number>
): Record<string, number>

  soma = soma(percentuais.values())
  se |soma - 100| < 0.01: retornar percentuais (já normalizado)

  // Normalizar proporcionalmente
  resultado = {}
  para cada [classe, pct] em percentuais:
    resultado[classe] = arredondar((pct / soma) * 100, 2)

  // Ajustar último valor para garantir soma = 100
  somaFinal = soma(resultado.values())
  diferenca = arredondar(100 - somaFinal, 2)
  ultimaClasse = obterUltimaChave(resultado)
  resultado[ultimaClasse] = arredondar(resultado[ultimaClasse] + diferenca, 2)

  retornar resultado
```

---

## 4. Tratamento de Casos de Limite

### 4.1 Tolerância para Classes Pequenas

```
toleranciaEfetiva(classe, toleranciaGlobal):
  se percentualDesejado == 0: retornar 0 (classe não gerenciada)
  retornar min(toleranciaGlobal, percentualDesejado)
```

### 4.2 Múltiplas Classes com Subpeso

Quando há mais classes com subpeso do que o aporte pode cobrir:

1. Ordenar classes sub-ponderadas por `|diferença| × percentualDesejado` (prioridade)
2. Alocar aporte seguindo a ordem de prioridade
3. Se o aporte não cobre todas, classes de menor prioridade ficam com `valorSugerido = 0`

---

## 5. Exemplos

### Exemplo 1: Carteira Simples

```
Carteira Atual:
  Ações:    R$ 6.000 (60%)
  FIIs:     R$ 3.000 (30%)
  ETFs:     R$ 1.000 (10%)
  Total:    R$ 10.000

Alvo:
  Ações: 50% | FIIs: 30% | ETFs: 20%

Tolerância: 5%

Diferenças:
  Ações: 60% - 50% = +10% (SOBREPESO)
  FIIs:  30% - 30% =  0% (EQUILIBRADO)
  ETFs:  10% - 20% = -10% (SUBPESO)

Aporte de R$ 2.000 → Novo Total = R$ 12.000
  ETFs: alvo = 20% × 12.000 = R$ 2.400
         atual = R$ 1.000
         aporte sugerido = R$ 1.400 (70% do aporte)
  Ações: alvo = 50% × 12.000 = R$ 6.000
         atual = R$ 6.000
         aporte sugerido = R$ 0
  FIIs:  alvo = 30% × 12.000 = R$ 3.600
         atual = R$ 3.000
         aporte sugerido = R$ 600 (30% do aporte)
```

### Exemplo 2: Classes Não Mapeadas

```
Carteira Atual:
  Ações:    R$ 7.000 (70%)
  FIIs:     R$ 2.000 (20%)
  Cripto:   R$ 1.000 (10%) ← não está na estratégia

Alvo:
  Ações: 60% | FIIs: 30% | Renda Fixa: 10%

Resultado:
  Cripto é tratado como classe excedente (sobrepeso)
  Renda Fixa aparece como 0% atual (subpeso)
  Sugestão: vender Cripto e/ou aportar em Renda Fixa
```

---

## 6. Histórico

| Versão | Data       | Descrição                     | Autor    |
| ------ | ---------- | ----------------------------- | -------- |
| 1.0    | 20/07/2026 | Criação do documento oficial. | Time Dev |
