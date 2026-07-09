# Lio Feliz - Documentação Oficial

# 01_VISION.md

**Projeto:** Lio Feliz

**Documento:** 01_VISION.md

**Versão da Documentação:** 1.0

**Versão do Projeto:** Em Desenvolvimento

**Status:** APROVADO

**Última atualização:** 07/07/2026

**Autor:** Rafael Santos + ChatGPT

---

# Visão do Projeto

O Lio Feliz é uma plataforma de gestão patrimonial desenvolvida para investidores de longo prazo.

Seu propósito é permitir que o usuário concentre toda a administração do seu patrimônio financeiro em um único lugar, reduzindo tarefas manuais, automatizando processos e fornecendo informações confiáveis para auxiliar na tomada de decisões.

O projeto foi concebido para acompanhar o investidor durante toda a sua jornada, independentemente da quantidade de ativos, do país onde investe ou das plataformas utilizadas.

---

# Missão

Simplificar a gestão patrimonial do investidor através da automação, da organização das informações financeiras e da centralização de todos os dados necessários para acompanhar sua evolução patrimonial.

O sistema deve reduzir o tempo gasto com tarefas operacionais para que o usuário possa dedicar mais tempo ao estudo e às decisões estratégicas.

---

# Propósito

Ser a plataforma principal de gestão patrimonial do usuário.

O objetivo é que o investidor não precise depender de planilhas, múltiplos sites ou diferentes aplicativos para acompanhar seus investimentos.

Toda informação relevante deverá estar disponível dentro do Lio Feliz.

---

# Público-Alvo

O projeto é destinado principalmente a investidores de longo prazo.

O sistema deverá atender usuários que investem em:

- ações;
- FIIs;
- ETFs;
- BDRs;
- renda fixa;
- ativos internacionais;
- fundos;
- REITs;
- criptomoedas (futuramente);
- outros ativos que venham a ser suportados.

Não existe limitação quanto ao país de investimento.

---

# Os Quatro Pilares do Projeto

## 1. Gestão Patrimonial

Centralizar todas as informações relacionadas ao patrimônio do usuário.

Exemplos:

- carteira;
- patrimônio;
- rentabilidade;
- preço médio;
- fluxo de caixa;
- histórico;
- evolução patrimonial.

---

## 2. Automação

Eliminar o máximo possível das tarefas manuais.

Sempre que tecnicamente viável, o sistema deverá automatizar:

- importações;
- sincronizações;
- cálculo de proventos;
- eventos corporativos;
- rebalanceamentos;
- consolidação de dados;
- atualizações financeiras.

---

## 3. Apoio à Decisão

O sistema deverá fornecer informações que auxiliem o investidor.

Exemplos:

- carteira desbalanceada;
- percentual atual de cada classe;
- próximos aportes sugeridos;
- metas patrimoniais;
- evolução dos investimentos;
- comparativos;
- simulações.

Toda sugestão deverá ser baseada exclusivamente nas configurações definidas pelo próprio usuário.

---

## 4. Gestão Fiscal

O sistema deverá organizar continuamente as informações fiscais do investidor.

Entre elas:

- dividendos;
- JCP;
- ganho de capital;
- compensação de prejuízos;
- eventos corporativos;
- posições anuais;
- movimentações;
- relatórios para declaração do Imposto de Renda.

O objetivo é reduzir drasticamente o trabalho necessário durante o período de declaração anual.

---

# Independência

O Lio Feliz deverá ser completamente independente de qualquer fornecedor de dados.

Integrações com:

- B3;
- Investidor10;
- corretoras;
- arquivos CSV;
- APIs;

serão utilizadas apenas como fontes de informação.

As regras de negócio permanecerão totalmente independentes dessas integrações.

Caso qualquer serviço deixe de existir, o funcionamento interno do sistema não deverá ser comprometido.

---

# Portabilidade

O usuário é proprietário dos próprios dados.

O sistema deverá facilitar:

- importação;
- exportação;
- backup;
- restauração;
- migração entre plataformas.

Nenhuma informação importante deverá ficar presa a um fornecedor específico.

---

# Integração com a B3

A integração com a B3 representa o principal objetivo de sincronização automática do sistema.

Sempre que possível, o usuário deverá conseguir manter sua carteira atualizada automaticamente através dos dados disponibilizados pela B3.

Essa integração deverá ser desenvolvida de forma desacoplada das regras de negócio.

---

# Neutralidade

O Lio Feliz não deverá recomendar investimentos com base em opiniões, previsões ou análises subjetivas.

Entretanto, poderá apresentar:

- indicadores;
- estatísticas;
- comparativos;
- carteiras modelo;
- estudos;
- simulações;
- sugestões de rebalanceamento baseadas exclusivamente na estratégia configurada pelo usuário.

A decisão final sempre pertence ao investidor.

---

# Escalabilidade

O sistema deverá crescer de forma modular.

Novas funcionalidades deverão ser adicionadas sem exigir reestruturações profundas da arquitetura.

Cada módulo deverá possuir responsabilidades claramente definidas.

---

# Experiência do Usuário

A simplicidade deverá prevalecer sobre a complexidade.

Sempre que existirem duas soluções tecnicamente equivalentes, deverá ser escolhida aquela que proporcionar a melhor experiência para o usuário.

O sistema deve ser intuitivo tanto para investidores iniciantes quanto para investidores experientes.

---

# Visão de Longo Prazo

O objetivo do projeto é tornar-se uma plataforma completa de gestão patrimonial.

No futuro, o Lio Feliz deverá permitir que o usuário realize praticamente toda a administração dos seus investimentos utilizando apenas a plataforma.

Isso inclui:

- acompanhamento da carteira;
- sincronização de dados;
- organização patrimonial;
- acompanhamento fiscal;
- planejamento de aportes;
- rebalanceamento;
- relatórios;
- histórico financeiro.

---

# O que o Lio Feliz Nunca Deve Ser

O projeto não deverá se transformar em:

- uma rede social;
- uma plataforma de recomendações financeiras;
- um sistema de day trade;
- um sistema voltado para especulação;
- um agregador de notícias sensacionalistas.

Seu foco sempre será o investidor de longo prazo.

---

# Declaração de Identidade

O Lio Feliz existe para simplificar a vida do investidor.

Cada funcionalidade desenvolvida deverá responder positivamente às seguintes perguntas:

1. Resolve um problema real do investidor?

2. Reduz trabalho manual?

3. Mantém a simplicidade do sistema?

4. Respeita a autonomia do usuário?

5. Pode evoluir sem comprometer a arquitetura?

Se qualquer resposta for negativa, a implementação deverá ser reavaliada.

---

# Histórico de Alterações

## Versão 1.0

- Definição da visão oficial do projeto.
- Definição dos quatro pilares.
- Definição da missão.
- Definição do propósito.
- Definição da política de independência.
- Definição da política de portabilidade.
- Inclusão da integração prioritária com a B3.
- Inclusão do módulo de gestão fiscal.
- Definição da visão de longo prazo.
