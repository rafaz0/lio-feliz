# Lio Feliz - Documentação Oficial

# 05_SYSTEM_ARCHITECTURE.md

**Projeto:** Lio Feliz

**Documento:** 05_SYSTEM_ARCHITECTURE.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 07/07/2026

---

# Objetivo

Este documento define a arquitetura oficial do Lio Feliz.

Seu objetivo é estabelecer como o sistema será organizado internamente, quais são as responsabilidades de cada camada e como os módulos devem interagir.

Este documento não define regras de negócio.

Ele define apenas a arquitetura do software.

Toda implementação deverá respeitar esta arquitetura.

---

# Princípios Arquiteturais

A arquitetura do sistema deve seguir os seguintes princípios:

- Separação de responsabilidades.
- Baixo acoplamento.
- Alta coesão.
- Código reutilizável.
- Facilidade de manutenção.
- Escalabilidade.
- Independência entre módulos.
- Testabilidade.

---

# Camadas do Sistema

O sistema será dividido nas seguintes camadas:

## Interface (UI)

Responsável exclusivamente pela interação com o usuário.

Exemplos:

- páginas;
- componentes;
- formulários;
- dashboards;
- gráficos.

A interface nunca deverá conter regras de negócio.

---

## Domínio (Business)

Responsável pelas regras financeiras do sistema.

Exemplos:

- cálculo de patrimônio;
- cálculo de preço médio;
- cálculo de dividendos;
- cálculo de imposto;
- rebalanceamento;
- metas.

Toda regra financeira pertence a esta camada.

---

## Serviços (Services)

Responsável pela comunicação com recursos externos.

Exemplos:

- Supabase;
- Yahoo Finance;
- BRAPI;
- CoinGecko;
- APIs futuras.

Nenhuma regra financeira deverá existir nesta camada.

---

## Persistência

Responsável pelo armazenamento das informações.

Exemplos:

- banco de dados;
- cache;
- armazenamento local.

A persistência nunca deverá conter regras financeiras.

---

## Integrações

Responsável pela comunicação com sistemas externos.

Exemplos:

- B3;
- Importação CSV;
- Portabilidade Investidor10;
- Corretoras.

Toda integração deverá ser opcional.

O sistema deverá continuar funcionando mesmo sem qualquer integração.

---

# Estrutura Geral

A organização do projeto deverá seguir uma estrutura semelhante à seguinte:

```text
src/

components/
pages/
hooks/

lib/

portfolio/
tax/
rebalancing/
corporate-actions/
reports/
integrations/
utils/

services/

database/

types/
```

A estrutura poderá crescer futuramente sem alterar sua organização principal.

---

# Responsabilidade dos Componentes

Os componentes React deverão:

- exibir informações;
- receber ações do usuário;
- chamar funções do domínio.

Os componentes nunca deverão:

- calcular patrimônio;
- calcular imposto;
- calcular dividendos;
- acessar diretamente APIs externas;
- implementar regras financeiras.

---

# Responsabilidade da Camada de Domínio

A camada de domínio será responsável por:

- consolidar carteira;
- calcular posições;
- calcular patrimônio;
- calcular rentabilidade;
- calcular dividendos;
- calcular IR;
- calcular rebalanceamento;
- gerar relatórios.

Ela deverá ser totalmente independente da interface.

---

# Responsabilidade dos Serviços

Os serviços deverão:

- buscar dados;
- enviar dados;
- tratar erros de comunicação;
- converter formatos externos.

Nunca deverão decidir regras financeiras.

---

# Responsabilidade da Persistência

O banco de dados deverá armazenar apenas informações permanentes.

Informações derivadas deverão ser calculadas sempre que possível.

Exemplos:

- patrimônio atual;
- preço médio;
- rentabilidade;
- percentual da carteira.

Esses dados não deverão ser armazenados permanentemente quando puderem ser recalculados.

---

# Organização dos Módulos

Cada módulo deverá possuir responsabilidade única.

Exemplo:

```text
portfolio/

models.ts
asset-types.ts
consolidator.ts
history.ts
index.ts
```

Outro exemplo:

```text
tax/

rules.ts
index.ts
```

Novos arquivos poderão ser adicionados conforme o crescimento do projeto.

---

# Comunicação Entre Módulos

A comunicação deverá seguir sempre esta direção:

Interface

↓

Domínio

↓

Serviços

↓

Persistência

Integrações externas deverão ser acessadas apenas através da camada de serviços.

---

# Código Compartilhado

Sempre que uma lógica for utilizada por mais de um módulo:

Ela deverá ser extraída para uma única implementação.

A duplicação de regras financeiras deve ser evitada.

---

# Barrel Files

Sempre que um módulo possuir diversos arquivos internos, deverá existir um arquivo:

index.ts

responsável por centralizar as exportações.

Isso reduz dependências diretas entre módulos.

---

# Regras para Refatoração

Toda refatoração deverá:

- preservar comportamento;
- preservar regras de negócio;
- preservar compatibilidade sempre que possível;
- reduzir acoplamento;
- melhorar organização.

Mudanças estruturais nunca deverão alterar resultados financeiros.

---

# Escalabilidade

A arquitetura deve permitir futuramente:

- aplicativo mobile;
- múltiplos usuários;
- múltiplas carteiras;
- múltiplas moedas;
- múltiplos países;
- novos tipos de ativos;
- novas integrações;
- novos módulos fiscais.

Nenhuma dessas expansões deverá exigir reconstrução da arquitetura.

---

# Testabilidade

As regras financeiras deverão ser testáveis independentemente da interface.

Sempre que possível:

- funções puras;
- baixo acoplamento;
- dependências explícitas.

---

# Observações

A arquitetura poderá evoluir ao longo do tempo.

Entretanto, seus princípios fundamentais deverão permanecer os mesmos.

Toda decisão arquitetural deverá priorizar simplicidade, clareza e manutenção de longo prazo.

---

# Histórico

## Versão 1.0

- Definição da arquitetura oficial do Lio Feliz.
- Definição das camadas do sistema.
- Definição das responsabilidades de cada módulo.
- Padronização da organização do código.
