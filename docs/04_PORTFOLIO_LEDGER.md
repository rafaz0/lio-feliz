# Portfolio Ledger

**Projeto:** Lio Feliz

**Documento:** 04_PORTFOLIO_LEDGER.md

**Versão:** 0.20

**Status:** Working Draft

**Nível de Maturidade:** N1 — Working Draft Consolidado

**Categoria:** Arquitetura Patrimonial

**Responsáveis:** Rafael Santos + IA

**Última atualização:** 10/07/2026

---

# 1. Objetivo

O Portfolio Ledger é o Registro Canônico de Fatos Patrimoniais do sistema Lio Feliz.

Sua finalidade é preservar verdades patrimoniais já interpretadas e torná-las disponíveis para consumo pelos componentes posteriores da arquitetura.

O Ledger não processa, interpreta, calcula, projeta ou gera relatórios. Ele registra e preserva.

---

# 2. Problema Arquitetural

Após a interpretação econômica de uma operação (03_TRANSACTION_INTERPRETATION.md), o sistema precisa de um componente responsável por registrar e preservar os fatos patrimoniais resultantes de forma íntegra, rastreável e consumível.

O problema central que o Ledger resolve é:

- Onde os fatos patrimoniais são registrados após a interpretação?
- Como garantir que o registro seja íntegro e rastreável?
- Como disponibilizar esses fatos para consumo por componentes posteriores sem que o Ledger se torne um processador?

Sem um Ledger formal, os fatos patrimoniais seriam registrados de forma ad hoc, comprometendo a integridade e a rastreabilidade da cadeia causal patrimonial.

---

# 3. Conceitos Fundamentais

### Fato Patrimonial

Alteração patrimonial reconhecida pelo domínio após a interpretação econômica de uma operação.

Exemplos conceituais:
- aumento de posição;
- redução de posição;
- geração de renda;
- incorporação patrimonial;
- alteração patrimonial derivada de evento corporativo.

### Registro Patrimonial

Representação persistente de um Fato Patrimonial no Ledger.

Cada registro possui vínculo rastreável com a interpretação e a operação que o originaram.

### Estado Patrimonial

Instantâneo do patrimônio do usuário em um determinado momento, composto pelo conjunto de Registros Patrimoniais vigentes.

### Posição Patrimonial

Agregação conceitual de registros relativos a um mesmo ativo ou classe de ativos.

A Posição é derivada dos Fatos Patrimoniais, não definida por eles.

### Integridade Patrimonial

Garantia de que todo Fato Patrimonial registrado:
- possui origem rastreável;
- é consistente com a interpretação que o gerou;
- não pode ser alterado sem preservar a cadeia causal.

---

# 4. Responsabilidades do Ledger

- Registrar Fatos Patrimoniais decorrentes de interpretações econômicas.
- Preservar a integridade dos registros patrimoniais.
- Garantir rastreabilidade entre cada registro e sua origem (operação + interpretação).
- Disponibilizar Fatos Patrimoniais para consumo pelo Portfolio Engine e demais componentes autorizados.
- Manter o Estado Patrimonial consistente ao longo do tempo.

---

# 5. Não Responsabilidades

O Portfolio Ledger **não** é responsável por:

- processar operações;
- interpretar operações;
- realizar cálculos patrimoniais (preço médio, IR, rentabilidade);
- gerar projeções ou simulações;
- gerar relatórios ou dashboards;
- definir regras de negócio;
- validar interpretações.

Essas responsabilidades pertencem a outros componentes da arquitetura.

---

# 6. Formação dos Registros Patrimoniais

A cadeia conceitual de formação dos registros no Ledger segue o fluxo:

```
Operação
    ↓
Interpretação
    ↓
Fato Patrimonial
    ↓
Ledger
```

**Operação:** Evento econômico real (02_TRANSACTIONS.md).

**Interpretação:** Atribuição de significado econômico (03_TRANSACTION_INTERPRETATION.md).

**Fato Patrimonial:** Alteração patrimonial reconhecida, resultado da interpretação.

**Ledger:** Registro canônico do Fato Patrimonial.

O Trace Transaction (TRACE_TRANSACTION.md) preserva os vínculos de rastreabilidade entre cada etapa deste fluxo.

---

# 7. Integridade Patrimonial

O Ledger preserva as seguintes garantias conceituais:

### Imutabilidade Causal

Registros patrimoniais não podem ser alterados sem preservar a cadeia causal que os originou.

### Consistência com a Interpretação

O Fato Patrimonial registrado deve refletir fielmente a interpretação que o gerou.

### Rastreabilidade Obrigatória

Todo registro possui vínculo explícito com sua operação de origem e sua interpretação.

### Completude

O conjunto de registros do Ledger deve ser suficiente para reconstruir o Estado Patrimonial em qualquer momento.

---

# 8. Identidade Patrimonial

Identidade lógica que individualiza cada Fato Patrimonial dentro do Ledger.

### Objetivo

Permitir rastreabilidade individual de fatos ao longo da evolução patrimonial.

### Natureza

Trata-se de identidade conceitual, não de implementação técnica. Não define IDs físicos, chaves ou estruturas de banco.

---

# 9. Imutabilidade dos Fatos Patrimoniais

### Princípio

"Nada é apagado."

### Regras

- Fatos Patrimoniais são permanentes.
- Fatos Patrimoniais não são editados.
- Fatos Patrimoniais não são removidos.
- O histórico patrimonial deve permanecer preservado integralmente.

### Consequência Arquitetural

Nenhum Fato Patrimonial poderá ser removido ou alterado após sua criação. Correções deverão ocorrer por compensação.

---

# 10. Correções por Compensação

### Definição

Correções não alteram fatos existentes. Correções geram novos Fatos Patrimoniais.

### Fluxo Conceitual

```
Fato Original
    ↓
Fato Compensatório
```

### Natureza

O Fato Compensatório possui vínculo patrimonial rastreável com o Fato Original que está corrigindo. O Fato Original permanece inalterado no histórico.

Não utiliza exemplos técnicos, estruturas de dados ou algoritmos.

---

# 11. Encadeamento Patrimonial

### Definição

Fatos Patrimoniais podem possuir relações conceituais com outros Fatos Patrimoniais.

### Exemplos Conceituais

- compensação;
- retificação;
- complementação;
- ajuste patrimonial.

### Objetivo

Permitir reconstrução da evolução patrimonial completa.

### Distinção Importante

- **Causalidade operacional:** pertence ao TRACE_TRANSACTION (vínculo entre operação e efeito).
- **Evolução patrimonial:** pertence ao PORTFOLIO_LEDGER (relações entre fatos patrimoniais ao longo do tempo).

---

# 12. Navegação Patrimonial

### Forward Navigation

Navegação da origem para a evolução.

```
Origem
    ↓
Evolução
```

### Reverse Navigation

Navegação do estado atual para o histórico de formação.

```
Estado Atual
    ↓
Histórico de Formação
```

### Objetivo

Permitir análise retrospectiva do patrimônio.

---

# 13. Reconstruibilidade Patrimonial

### Definição

O histórico completo de Fatos Patrimoniais deve permitir a reconstrução do patrimônio em qualquer ponto temporal.

### Natureza

A reconstrução é consequência direta da preservação integral dos Fatos Patrimoniais. Se todos os fatos são preservados e imutáveis, o estado patrimonial de qualquer momento pode ser reconstruído.

Não aborda implementação técnica.

---

# 14. Relação com TRACE_TRANSACTION

O Trace Transaction (TRACE_TRANSACTION.md) e o Portfolio Ledger possuem responsabilidades distintas e complementares:

| Aspecto | Trace Transaction | Portfolio Ledger |
|---------|-------------------|------------------|
| Responsabilidade | Preservar a cadeia causal | Registrar Fatos Patrimoniais |
| O que preserva | Vínculos entre origem e efeito | Fatos Patrimoniais em si |
| Consumidores | Auditoria, debugging, explicabilidade | Portfolio Engine, relatórios |

O Trace Transaction navega pela cadeia causal. O Ledger armazena os fatos que compõem essa cadeia.

---

# 15. Relação com PORTFOLIO_ENGINE

O Portfolio Engine (05_PORTFOLIO_ENGINE.md) é o principal consumidor dos Fatos Patrimoniais registrados no Ledger.

O fluxo conceitual de consumo:

```
Ledger
    ↓ (Fatos Patrimoniais)
Portfolio Engine
    ↓ (Cálculos, derivações)
Resultados Patrimoniais
```

O Ledger fornece os Fatos Patrimoniais brutos. O Engine aplica cálculos, derivações e transformações analíticas para produzir resultados patrimoniais (posições, saldos, indicadores).

O Ledger não conhece os algoritmos do Engine. O Engine não persiste fatos patrimoniais.

---

# 16. Invariantes Arquiteturais

### INV-L001

Todo registro representa um Fato Patrimonial.

### INV-L002

Todo Fato Patrimonial possui origem rastreável.

### INV-L003

Nenhum registro existe sem interpretação válida.

### INV-L004

O Ledger não altera significado econômico.

### INV-L005

O Ledger não realiza cálculos patrimoniais.

### INV-L006

Nenhum Fato Patrimonial é removido.

### INV-L007

Toda correção gera novo Fato Patrimonial.

### INV-L008

Toda compensação mantém vínculo patrimonial rastreável.

### INV-L009

Todo histórico patrimonial deve ser reconstruível.

### INV-L010

O estado patrimonial atual não depende da remoção de fatos anteriores.

---

# 17. Limites de Escopo

### O que o Ledger faz

- Registra Fatos Patrimoniais.
- Preserva integridade e rastreabilidade.
- Preserva o histórico patrimonial completo.
- Disponibiliza Fatos Patrimoniais para consumo.

### O que o Ledger não faz

- Não processa operações.
- Não interpreta eventos.
- Não realiza cálculos.
- Não projeta patrimônio.
- Não consolida indicadores.
- Não produz métricas.
- Não realiza processamento analítico.
- Não gera relatórios.
- Não define regras de negócio.

### O que pertence ao Portfolio Engine

- Cálculo de patrimônio.
- Cálculo de preço médio.
- Cálculo de rentabilidade.
- Cálculo de IR.
- Projeções e simulações.
- Derivação de indicadores.
- Geração de resultados analíticos.
- Consolidação de métricas patrimoniais.

---

# Histórico

## Versão 0.20

- Evolução do Working Draft para N1 (Working Draft Consolidado).
- Adicionada Identidade Patrimonial (§8): identidade lógica de fatos.
- Adicionada Imutabilidade dos Fatos Patrimoniais (§9): nada é apagado.
- Adicionadas Correções por Compensação (§10): novos fatos, não alteração.
- Adicionado Encadeamento Patrimonial (§11): relações entre fatos.
- Adicionada Navegação Patrimonial (§12): Forward e Reverse Navigation.
- Adicionada Reconstruibilidade Patrimonial (§13): histórico completo.
- Adicionados INV-L006 a INV-L010.
- Limites de Escopo atualizados (separação Ledger vs Engine reforçada).

## Versão 0.10

- Criação do Working Draft inicial (N0).
- Definição da identidade arquitetural do Portfolio Ledger como Registro Canônico de Fatos Patrimoniais.
- Conceitos fundamentais: Fato Patrimonial, Registro Patrimonial, Estado Patrimonial, Posição Patrimonial, Integridade Patrimonial.
- Responsabilidades e não responsabilidades formalizadas.
- Relações com Trace Transaction e Portfolio Engine estabelecidas.
- Invariantes arquiteturais INV-L001 a INV-L005.
