# Lio Feliz - Documentação Oficial

# 19_GLOSSARY.md

**Projeto:** Lio Feliz

**Documento:** 19_GLOSSARY.md

**Versão:** 1.0

**Status:** Em desenvolvimento

**Última atualização:** 09/07/2026

---

# 1. Objetivo

Este documento é o Vocabulário Oficial do Projeto Lio Feliz.

Seu objetivo é garantir que cada conceito relevante do sistema possua exatamente uma definição oficial.

Nenhum documento da documentação poderá redefinir um termo já existente neste Glossário.

Quando um novo conceito relevante surgir durante o desenvolvimento do projeto, sua definição deverá ser adicionada a este documento antes de ser utilizada em novos documentos oficiais.

---

# 2. Escopo

Este Glossário abrange todos os conceitos utilizados na documentação oficial do Lio Feliz, incluindo:

- conceitos financeiros;
- conceitos do sistema;
- conceitos da documentação;
- conceitos da metodologia;
- conceitos gerais.

Conceitos puramente técnicos ou de implementação (linguagens, frameworks, bibliotecas, protocolos) não fazem parte deste Glossário, a menos que possuam significado específico no contexto do projeto.

---

# 3. Princípios

- Cada termo possui apenas uma definição oficial.
- Nenhum documento poderá redefinir um conceito existente.
- Os demais documentos deverão apenas referenciar este Glossário.
- O Glossário é a referência oficial de nomenclatura do projeto.
- Novos conceitos deverão ser adicionados ao Glossário antes de serem utilizados em novos documentos oficiais.

---

# 4. Organização do Glossário

Os conceitos estão organizados nas seguintes categorias:

- **Conceitos Financeiros**: termos do domínio financeiro e de investimentos.
- **Conceitos do Sistema**: componentes e entidades do sistema Lio Feliz.
- **Conceitos da Documentação**: tipos e artefatos da documentação oficial.
- **Conceitos da Metodologia**: processos e práticas de desenvolvimento do projeto.
- **Conceitos Gerais**: princípios fundamentais aplicados ao projeto.

Cada definição segue o formato:

- **Nome**: termo oficial.
- **Categoria**: grupo ao qual pertence.
- **Definição**: descrição oficial do conceito.
- **Objetivo** (quando aplicável): propósito do conceito no sistema.
- **Observações** (quando aplicável): notas adicionais.
- **Referências** (quando aplicável): documentos relacionados.

---

# 5. Conceitos Financeiros

--------------------------------------------------

**Ativo**

Categoria: Conceito Financeiro

Definição: Qualquer bem financeiro que possa ser mantido em uma carteira de investimentos. Inclui ações, fundos imobiliários (FIIs), BDRs, ETFs, renda fixa, criptomoedas, REITs e ativos internacionais.

Objetivo: Representar a unidade básica da carteira de investimentos.

Observações: Cada ativo possui um ticker único que o identifica no sistema.

Referências: `04_DATA_MODEL.md`

--------------------------------------------------

**Carteira**

Categoria: Conceito Financeiro

Definição: Conjunto de posições em ativos financeiros mantidas por um investidor. A carteira consolida operações de compra, venda, proventos e eventos corporativos para calcular posição atual, rentabilidade e alocação.

Objetivo: Centralizar a visão patrimonial do investidor.

Observações: A carteira é o núcleo do sistema Lio Feliz. Todos os módulos (Dashboard, IRPF, Proventos, Metas) são extensões da carteira.

Referências: `04_DATA_MODEL.md`, `06_BUSINESS_RULES/01_PORTFOLIO.md`

--------------------------------------------------

**Operação**

Categoria: Conceito Financeiro

Definição: Registro de uma movimentação financeira na carteira. Os tipos suportados são: compra (buy), venda (sell), dividendo (dividend) e bonificação (bonus).

Objetivo: Registrar todas as movimentações que afetam a composição ou o custo da carteira.

Observações: Cada operação possui side, quantity, price, date e ticker. Operações de dividendo reduzem o custo total; bonificações aumentam a quantidade sem custo.

Referências: `04_DATA_MODEL.md`, `06_BUSINESS_RULES/01_PORTFOLIO.md`

--------------------------------------------------

**Evento**

Categoria: Conceito Financeiro

Definição: Ocorrência que afeta ativos financeiros, podendo ser um Provento (geração de renda) ou um Evento Corporativo (alteração na estrutura do ativo).

Objetivo: Classificar e organizar toda ocorrência financeira que impacta a carteira.

Observações: Eventos podem ser automáticos (sincronizados via APIs) ou manuais (registrados pelo usuário).

--------------------------------------------------

**Provento**

Categoria: Conceito Financeiro

Definição: Evento que gera renda ou entrada financeira ao investidor. Inclui dividendos, Juros sobre Capital Próprio (JCP), rendimentos de FIIs, amortizações e distribuições extraordinárias.

Objetivo: Registrar e acompanhar toda receita gerada pelos ativos da carteira.

Observações: Proventos reduzem o custo total da posição (método de custo médio). O tratamento detalhado está em 05_PROVENTOS.md. A engine responsável pelo processamento futuro será a Proventos Engine.

Referências: `06_BUSINESS_RULES/05_PROVENTOS.md`

--------------------------------------------------

**Evento Corporativo**

Categoria: Conceito Financeiro

Definição: Evento promovido pela empresa emissora ou pelo mercado que altera a composição, identificação ou estrutura dos ativos. Inclui desdobramentos (split), grupamentos (reverse split), bonificações, subscrições, incorporações, fusões, cisões e conversões.

Objetivo: Garantir que alterações estruturais nos ativos sejam corretamente refletidas na carteira.

Observações: Dividendos e JCP não são eventos corporativos — pertencem ao domínio de Proventos. A Corporate Action Engine é responsável pelo processamento.

Referências: `06_BUSINESS_RULES/04_CORPORATE_ACTIONS.md`, `07_TECHNICAL_ANNEXES/02_CORPORATE_ACTION_ENGINE.md`

--------------------------------------------------

**Patrimônio**

Categoria: Conceito Financeiro

Definição: Valor total da carteira em determinado momento, calculado como a soma do valor de mercado de todas as posições.

Objetivo: Acompanhar a evolução financeira do investidor ao longo do tempo.

Observações: O patrimônio considera cotações atualizadas dos ativos. O valor investido (total de compras menos vendas) é um conceito distinto.

--------------------------------------------------

**Estratégia**

Categoria: Conceito Financeiro

Definição: Conjunto de regras e objetivos definidos pelo usuário para orientar suas decisões de investimento. O sistema não recomenda estratégias — apenas auxilia o usuário a executar a sua.

Objetivo: Permitir que o usuário defina e acompanhe sua própria metodologia de investimentos.

Observações: A Estratégia do usuário é soberana. O sistema jamais deverá influenciar decisões com opiniões ou previsões.

Referências: `15_PRODUCT_PHILOSOPHY.md`

--------------------------------------------------

**Receita**

Categoria: Conceito Financeiro

Definição: Entrada financeira recebida pelo investidor, incluindo dividendos, JCP, rendimentos, salários e outras fontes de renda.

Objetivo: Registrar todas as fontes de entrada financeira para composição da Vida Financeira.

--------------------------------------------------

**Despesa**

Categoria: Conceito Financeiro

Definição: Saída financeira realizada pelo investidor, incluindo gastos pessoais, contas, compras e outras obrigações financeiras.

Objetivo: Registrar todas as saídas financeiras para composição da Vida Financeira.

--------------------------------------------------

**Vida Financeira**

Categoria: Conceito Financeiro

Definição: Módulo opcional que permite ao usuário controlar receitas e despesas pessoais, integrando visão patrimonial com fluxo de caixa pessoal.

Objetivo: Oferecer uma visão completa da saúde financeira do usuário, unindo investimentos e finanças pessoais.

Observações: Módulo opcional e desacoplado da carteira de investimentos. Pode ser ativado ou desativado conforme necessidade do usuário.

Referências: `16_PRODUCT_BACKLOG.md` — FEAT-006, FEAT-007

--------------------------------------------------

# 6. Conceitos do Sistema

--------------------------------------------------

**Portfolio Ledger**

Categoria: Conceito do Sistema

Definição: Registro imutável de todas as operações realizadas na carteira. Funciona como um livro contábil: cada operação é registrada em ordem cronológica e não pode ser alterada ou removida sem auditoria.

Objetivo: Garantir rastreabilidade completa do histórico financeiro do usuário.

Observações: O conceito de Ledger é fundamental para auditoria, conformidade fiscal e consistência dos cálculos de rentabilidade.

Referências: `04_DATA_MODEL.md`

--------------------------------------------------

**Portfolio Engine**

Categoria: Conceito do Sistema

Definição: Componente responsável por consolidar operações em posições financeiras, calcular preço médio, rentabilidade e alocação da carteira.

Objetivo: Centralizar toda a lógica de consolidação patrimonial.

Referências: `07_TECHNICAL_ANNEXES/03_PORTFOLIO_CONSOLIDATION_ENGINE.md`

--------------------------------------------------

**Snapshot**

Categoria: Conceito do Sistema

Definição: Estado completo da carteira em um determinado momento, incluindo posições, saldos, cotações e patrimônio.

Objetivo: Permitir reconstrução histórica da carteira e comparação entre períodos.

Observações: Snapshots são gerados periodicamente ou sob demanda para alimentar gráficos de evolução patrimonial.

--------------------------------------------------

**Fonte da Verdade**

Categoria: Conceito do Sistema

Definição: Princípio arquitetural que estabelece que cada informação no sistema possui uma única fonte oficial de origem. Nenhum dado deve ser duplicado ou derivado sem referência explícita à sua fonte.

Objetivo: Evitar inconsistências, duplicações e divergências entre módulos.

Observações: A documentação oficial na pasta `docs/` é a Fonte da Verdade da documentação. O Portfolio Ledger é a Fonte da Verdade das operações.

Referências: `02_PROJECT_RULES.md`

--------------------------------------------------

**Dashboard**

Categoria: Conceito do Sistema

Definição: Interface principal do sistema que apresenta uma visão consolidada da carteira, incluindo gráficos de evolução patrimonial, alocação por tipo de ativo, proventos recebidos e indicadores de desempenho.

Objetivo: Centralizar as informações mais relevantes para o investidor em uma única tela.

Referências: `03_PRODUCT_REQUIREMENTS.md`

--------------------------------------------------

**Tax Engine**

Categoria: Conceito do Sistema

Definição: Componente responsável por calcular impostos sobre operações financeiras, incluindo IRPF sobre vendas com lucro, day-trade e proventos.

Objetivo: Automatizar a apuração tributária do investidor.

Observações: A Tax Engine considera as regras da Receita Federal do Brasil para operações em bolsa de valores.

Referências: `07_TECHNICAL_ANNEXES/01_PRICE_AVERAGE_ALGORITHMS.md`

--------------------------------------------------

**Dividend Engine**

Categoria: Conceito do Sistema

Definição: Componente atual responsável pela sincronização e processamento de dividendos e JCP provenientes de fontes externas (BRAPI, Yahoo Finance).

Objetivo: Automatizar o registro de proventos na carteira.

Observações: Conceito atual. Futuramente será substituído pela Proventos Engine, que unificará o tratamento de todos os proventos financeiros.

Referências: `16_PRODUCT_BACKLOG.md` — FEAT-012

--------------------------------------------------

**Proventos Engine**

Categoria: Conceito do Sistema

Definição: Componente futuro responsável por centralizar o processamento de todos os proventos financeiros, incluindo dividendos, JCP, rendimentos de FIIs e demais proventos.

Objetivo: Substituir a atual Dividend Engine, unificando o tratamento de proventos em um único motor.

Observações: Conceito futuro (aprovado, não implementado). A implementação está registrada como FEAT-012 no Product Backlog.

Referências: `16_PRODUCT_BACKLOG.md` — FEAT-012

--------------------------------------------------

**Notification Engine**

Categoria: Conceito do Sistema

Definição: Componente responsável por gerar notificações inteligentes para o usuário, baseadas em eventos da carteira, proventos recebidos, alterações de ativos e demais ocorrências relevantes.

Objetivo: Manter o usuário informado sem excesso de notificações.

Observações: As notificações devem ser relevantes, evitando poluição informacional.

Referências: `16_PRODUCT_BACKLOG.md` — FEAT-008

--------------------------------------------------

**Strategy Engine**

Categoria: Conceito do Sistema

Definição: Componente responsável por auxiliar o usuário a definir e acompanhar sua estratégia de investimentos, incluindo metas, limites e regras pessoais.

Objetivo: Permitir que o usuário gerencie sua estratégia de forma organizada.

Observações: O sistema não recomenda estratégias — apenas auxilia o usuário a executar a sua própria.

--------------------------------------------------

**Integração**

Categoria: Conceito do Sistema

Definição: Conexão do sistema Lio Feliz com fontes externas de dados, incluindo APIs financeiras (BRAPI, Yahoo Finance), corretoras, B3 e serviços de câmbio.

Objetivo: Automatizar a obtenção de dados sem necessidade de entrada manual.

Observações: Integrações são modulares e independentes. Cada integração possui seu próprio adaptador.

Referências: `06_BUSINESS_RULES/11_IMPORT_EXPORT.md`, `06_BUSINESS_RULES/12_INTEGRATIONS.md`

--------------------------------------------------

# 7. Conceitos da Documentação

--------------------------------------------------

**Business Rule**

Categoria: Conceito da Documentação

Definição: Documento que define regras financeiras, operacionais e de domínio do sistema. Cada Business Rule especifica o comportamento esperado do sistema em cenários específicos.

Objetivo: Garantir que todas as regras do sistema estejam documentadas e rastreáveis.

Observações: Business Rules estão organizadas em `06_BUSINESS_RULES/`. São a fonte primária para implementação de lógica financeira.

Referências: `06_BUSINESS_RULES/00_INDEX.md`

--------------------------------------------------

**Use Case**

Categoria: Conceito da Documentação

Definição: Documento que descreve um cenário de uso específico do sistema, detalhando a interação do usuário com o sistema e o resultado esperado.

Objetivo: Validar o comportamento do sistema em situações reais.

Observações: Use Cases estão vinculados a FEATs através da Traceability Matrix.

Referências: `17_TRACEABILITY_MATRIX.md`

--------------------------------------------------

**Technical Annex**

Categoria: Conceito da Documentação

Definição: Documento técnico que especifica algoritmos, fórmulas, pseudocódigo e decisões de implementação do sistema.

Objetivo: Servir como referência de implementação para desenvolvedores.

Observações: Technical Annexes estão organizados em `07_TECHNICAL_ANNEXES/`. Contêm engines, algoritmos e especificações técnicas.

Referências: `07_TECHNICAL_ANNEXES/00_INDEX.md`

--------------------------------------------------

**ADR (Architecture Decision Record)**

Categoria: Conceito da Documentação

Definição: Registro oficial de uma decisão arquitetural do projeto. Cada ADR documenta o contexto, problema, alternativas consideradas, decisão tomada e consequências.

Objetivo: Preservar o histórico de decisões arquiteturais e justificar cada escolha.

Observações: ADRs estão organizados em `18_ARCHITECTURAL_DECISIONS/`. São imutáveis — alterações em decisões anteriores geram novos ADRs.

Referências: `18_ARCHITECTURAL_DECISIONS/00_INDEX.md`

--------------------------------------------------

**Traceability Matrix**

Categoria: Conceito da Documentação

Definição: Mapa oficial da documentação que relaciona cada FEAT às suas Business Rules, Use Cases, Technical Annexes e ADRs correspondentes.

Objetivo: Conectar funcionalidades a seus documentos relacionados, facilitando navegação e auditoria.

Observações: A Traceability Matrix não contém regras de negócio nem detalhes de implementação. Sua única responsabilidade é servir como mapa.

Referências: `17_TRACEABILITY_MATRIX.md`

--------------------------------------------------

**Feature (FEAT)**

Categoria: Conceito da Documentação

Definição: Identificador único de uma funcionalidade aprovada para o produto. Cada FEAT possui um ID permanente (FEAT-NNN), prioridade, categoria e ciclo de vida.

Objetivo: Rastrear cada funcionalidade desde a aprovação até a implementação.

Observações: Nenhuma funcionalidade pode ser implementada sem estar registrada no Product Backlog com um ID FEAT.

Referências: `16_PRODUCT_BACKLOG.md`

--------------------------------------------------

**Product Backlog**

Categoria: Conceito da Documentação

Definição: Documento oficial que registra todas as funcionalidades aprovadas para o Lio Feliz. Cada funcionalidade possui ID único, prioridade, categoria e status.

Objetivo: Centralizar o registro de todas as funcionalidades do produto.

Observações: O backlog é um documento vivo. Novas funcionalidades aprovadas devem ser registradas imediatamente.

Referências: `16_PRODUCT_BACKLOG.md`

--------------------------------------------------

**Documentação Oficial**

Categoria: Conceito da Documentação

Definição: Conjunto completo de documentos localizados na pasta `docs/` do repositório, organizados conforme a estrutura definida em `DOCUMENTATION_INDEX.md`.

Objetivo: Servir como a única fonte de verdade da documentação do projeto.

Observações: A Documentação Oficial possui prioridade igual ao código. Nenhuma implementação pode divergir da documentação sem que a documentação seja atualizada.

Referências: `DOCUMENTATION_INDEX.md`

--------------------------------------------------

**Documentação Consolidada**

Categoria: Conceito da Documentação

Definição: Cópia derivada da Documentação Oficial, reunindo todos os documentos em um único arquivo para consulta unificada. Localizada em `Documentos\Lio Feliz - Documentação\DOCUMENTACAO_COMPLETA.md`.

Objetivo: Facilitar consultas rápidas e buscas na documentação completa.

Observações: A Documentação Consolidada é uma cópia derivada. A única fonte oficial permanece sendo a pasta `docs/` do repositório.

--------------------------------------------------

**Ordem de Leitura**

Categoria: Conceito da Documentação

Definição: Sequência oficial de leitura dos documentos do projeto, definida em `00_START_HERE.md`. Todo desenvolvedor ou IA deve seguir esta ordem antes de modificar o código.

Objetivo: Garantir que o contexto completo do projeto seja compreendido antes de qualquer alteração.

Observações: Nem todo documento oficial precisa estar na ordem de leitura — documentos de governança podem ser excluídos.

Referências: `00_START_HERE.md`

--------------------------------------------------

**Estrutura Oficial da Documentação**

Categoria: Conceito da Documentação

Definição: Organização hierárquica de todos os documentos oficiais do projeto, definida em `DOCUMENTATION_INDEX.md`. A estrutura inclui seções, subseções e o status de cada documento.

Objetivo: Definir a organização oficial da documentação e servir como referência para navegação.

Observações: O `DOCUMENTATION_INDEX.md` é a fonte de verdade da estrutura. Qualquer alteração na estrutura deve ser refletida neste documento.

Referências: `DOCUMENTATION_INDEX.md`

--------------------------------------------------

# 8. Conceitos da Metodologia

--------------------------------------------------

**Auditoria**

Categoria: Conceito da Metodologia

Definição: Processo de verificação sistemática da documentação para identificar inconsistências, omissões, conflitos e desalinhamentos entre documentos oficiais.

Objetivo: Garantir a integridade, consistência e confiabilidade da documentação.

Observações: Auditorias seguem um fluxo oficial: Arquitetura → Execução → Auditoria → Aprovação → Correção → Nova Auditoria.

Referências: `16_PRODUCT_BACKLOG.md` — FEAT-015

--------------------------------------------------

**Consolidação**

Categoria: Conceito da Metodologia

Definição: Processo de estabilização de um conjunto de documentos, garantindo que estejam consistentes, revisados e aprovados. Cada Consolidação é numerada sequencialmente (Consolidação nº 1, nº 2, etc.).

Objetivo: Estabilizar a documentação em marcos definidos, criando pontos de referência no histórico do projeto.

Observações: Uma Consolidação pode incluir criação, revisão, correção e auditoria de documentos. O resultado é registrado em PROJECT_STATE.md.

Referências: `PROJECT_STATE.md`

--------------------------------------------------

**Sprint de Estabilização**

Categoria: Conceito da Metodologia

Definição: Período dedicado exclusivamente a corrigir inconsistências identificadas na documentação, sem criar novos documentos ou alterar arquitetura.

Objetivo: Resolver problemas documentais de forma focada antes de avançar para novas funcionalidades.

Observações: A Sprint de Estabilização segue o fluxo: auditoria → relatório → correções → validação. Inconsistências não corrigidas permanecem registradas como pendências.

Referências: `PROJECT_STATE.md`

--------------------------------------------------

**Baseline**

Categoria: Conceito da Metodologia

Definição: Versão estável da documentação registrada após um grande marco do projeto, representando um ponto em que toda a documentação foi auditada, validada e considerada consistente.

Objetivo: Facilitar auditorias futuras, permitir comparação entre versões e servir como ponto oficial de retorno em caso de inconsistências.

Observações: Conceito futuro (aprovado, não implementado). Registrado como FEAT-016 no Product Backlog.

Referências: `16_PRODUCT_BACKLOG.md` — FEAT-016

--------------------------------------------------

**Governança Documental**

Categoria: Conceito da Metodologia

Definição: Conjunto de práticas e regras para organização, manutenção e evolução da documentação oficial do projeto. Inclui documentos como PROJECT_STATE, CHANGELOG_DOCUMENTACAO, DOCUMENTATION_INDEX e 00_START_HERE.

Objetivo: Garantir que a documentação seja mantida de forma organizada, consistente e rastreável.

Observações: Conceito em estudo. Registrado como FEAT-013 no Product Backlog.

Referências: `16_PRODUCT_BACKLOG.md` — FEAT-013

--------------------------------------------------

**Governança do Projeto**

Categoria: Conceito da Metodologia

Definição: Estrutura futura que consolidará toda a metodologia de desenvolvimento do projeto Lio Feliz em um único documento oficial, incluindo filosofia, princípios, hierarquia, papéis, fluxos e processos.

Objetivo: Consolidar toda a metodologia do projeto em um único documento de referência.

Observações: Conceito em estudo. Registrado como FEAT-017 no Product Backlog. Preferencialmente implementado após a primeira versão estável (MLP).

Referências: `16_PRODUCT_BACKLOG.md` — FEAT-017

--------------------------------------------------

# 9. Conceitos Gerais

--------------------------------------------------

**Fonte Canônica**

Categoria: Conceito Geral

Definição: Princípio de que cada informação no sistema possui uma única fonte oficial de origem. Sinônimo de Fonte da Verdade.

Objetivo: Evitar inconsistências e duplicações.

Observações: A Fonte Canônica é um conceito arquitetural fundamental. A documentação oficial em `docs/` é a Fonte Canônica da documentação.

Referências: `02_PROJECT_RULES.md`

--------------------------------------------------

**Imutabilidade**

Categoria: Conceito Geral

Definição: Princípio de que determinados registros não podem ser alterados ou removidos após sua criação. Aplicado ao Portfolio Ledger, ADRs e registros de operações.

Objetivo: Garantir rastreabilidade, auditoria e conformidade fiscal.

Observações: Registros imutáveis podem ser corrigidos apenas através de novos registros (compensação), nunca por alteração do registro original.

--------------------------------------------------

**Registro Cronológico**

Categoria: Conceito Geral

Definição: Princípio de que eventos e operações devem ser registrados em ordem cronológica, preservando a sequência temporal exata em que ocorreram.

Objetivo: Permitir reconstrução histórica precisa e cálculos corretos de rentabilidade.

--------------------------------------------------

**Versionamento**

Categoria: Conceito Geral

Definição: Prática de atribuir versões numéricas a documentos e artefatos do projeto para rastrear alterações ao longo do tempo.

Objetivo: Permitir identificação de versões, comparação entre estados e rastreamento de evolução.

Observações: O versionamento da documentação segue o padrão semântico (major.minor). Cada alteração relevante incrementa a versão.

--------------------------------------------------

**Compatibilidade Retroativa**

Categoria: Conceito Geral

Definição: Princípio de que alterações no sistema não devem quebrar funcionalidades existentes ou invalidar dados históricos do usuário.

Objetivo: Proteger o investimento do usuário em dados e configurações existentes.

Observações: Alterações que afetam cálculos financeiros devem preservar a consistência dos resultados históricos.

--------------------------------------------------

# 10. Decisões de Projeto

- Existe apenas uma definição oficial para cada termo.
- Nenhum documento poderá redefinir conceitos existentes.
- Sempre que um novo termo relevante surgir, ele deverá ser registrado neste Glossário antes de ser utilizado na documentação oficial.
- O Glossário passa a ser referência obrigatória para toda a documentação do projeto.

---

# 11. Referências

- `DOCUMENTATION_INDEX.md` — índice oficial da documentação.
- `PROJECT_STATE.md` — estado do projeto e consolidações.
- `17_TRACEABILITY_MATRIX.md` — matriz de rastreabilidade.
- `18_ARCHITECTURAL_DECISIONS/` — decisões arquiteturais.
- `06_BUSINESS_RULES/` — regras de negócio.
- `07_TECHNICAL_ANNEXES/` — anexos técnicos.
- `04_DATA_MODEL.md` — modelo de dados e conceitos fundamentais.

---

# 12. Histórico

## Versão 1.0

- Criação do Vocabulário Oficial do Projeto.
- Definição dos conceitos financeiros, do sistema, da documentação, da metodologia e gerais.
- Estabelecimento dos princípios do Glossário.
