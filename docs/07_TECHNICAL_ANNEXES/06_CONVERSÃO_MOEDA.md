# 06_CONVERSÃO_MOEDA.md — Conversão de Moeda e Taxas de Câmbio

**Versão:** 1.0
**Status:** APROVADO
**Classificação:** Technical Annex

---

## 1. Objetivo

Definir os algoritmos e fontes de dados para conversão de moeda estrangeira (USD, EUR, GBP, JPY) para BRL no módulo Internacional.

---

## 2. Fontes de Dados

| Fonte               | Dados                       | Atualização             |
| ------------------- | --------------------------- | ----------------------- |
| **AwesomeAPI**      | Cotação USD-BRL comercial   | Tempo real (5min cache) |
| **Yahoo Finance**   | Pares de moedas (USDBRL=X)  | Diária                  |
| **BRAPI**           | Taxa Ptax                   | Diária (fechamento)     |
| **Fallback manual** | Taxa informada pelo usuário | Manual                  |

---

## 3. Ordem de Precedência

```
1. AwesomeAPI (USD-BRL) → cache 5min
2. Yahoo Finance (outros pares) → cache 1h
3. BRAPI Ptax → cache diário
4. Taxa informada manualmente → sem cache
```

A primeira fonte que retornar dados válidos é utilizada. Se nenhuma fonte retornar, o sistema não permite a conversão e reporta erro.

---

## 4. Fórmulas de Conversão

### 4.1 Direta (moeda → BRL)

```
valorBRL = valorOriginal × taxaUSD_BRL
```

### 4.2 Via USD (moeda não-USD → BRL)

```
valorUSD = valorOriginal × taxaMOEDA_USD
valorBRL = valorUSD × taxaUSD_BRL
```

---

## 5. Cache e Frescor

| Cenário         | Comportamento           |
| --------------- | ----------------------- |
| Taxa com < 5min | Reutilizar (AwesomeAPI) |
| Taxa com < 1h   | Reutilizar (Yahoo)      |
| Taxa com < 24h  | Reutilizar com aviso    |
| Taxa com > 24h  | Buscar nova             |

O `ExchangeRate.isFresh` retorna `true` se a taxa tem menos de 24h.

---

## 6. Auditabilidade

Toda conversão gera um registro contendo:

```typescript
interface ConversionAudit {
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string; // sempre BRL
  rate: number;
  rateSource: string; // "awesomeapi" | "yahoo" | "brapi" | "manual"
  rateDate: string; // ISO date da taxa utilizada
  conversionDate: string; // ISO date da conversão
}
```

---

## 7. Tratamento de Erros

| Erro                | Causa                       | Ação                                 |
| ------------------- | --------------------------- | ------------------------------------ |
| Taxa não encontrada | Nenhuma fonte retornou dado | Bloquear conversão, informar usuário |
| Taxa expirada       | Taxa > 24h sem atualização  | Usar com aviso visual (frescor)      |
| Par inválido        | Par de moedas não suportado | Reportar erro ao usuário             |
