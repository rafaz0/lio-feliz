# Lio Feliz — Especificação Funcional do Produto

**Documento:** 21_FUNCTIONAL_SPECIFICATION.md

**Versão:** 1.0

**Status:** APROVADO

**Categoria:** Documentação Oficial

**Última atualização:** 18/07/2026

---

> **Este documento é a especificação oficial do comportamento do produto.**
>
> Ele não contém decisões arquiteturais nem definições de implementação.
>
> Seu foco é exclusivamente o comportamento esperado do sistema.
>
> Foi consolidado a partir de: `00_START_HERE.md`, `01_VISION.md`, `03_PRODUCT_REQUIREMENTS.md`, `16_PRODUCT_BACKLOG.md`, `17_TRACEABILITY_MATRIX.md`, `20_PROJECT_MAP.md`, `PROJECT_BOOTSTRAP.md`.

---

# 1. Objetivo do Produto

O Lio Feliz existe para **simplificar a gestão patrimonial do investidor de longo prazo**.

**Problema resolvido:** investidores de longo prazo precisam gerenciar múltiplos ativos em diferentes corretoras, países e plataformas. As informações ficam dispersas em planilhas, extratos e sites. Tarefas operacionais como cálculo de preço médio, acompanhamento de proventos, apuração fiscal e rebalanceamento consomem tempo significativo e são propensas a erros.

**Transformação entregue:** o investidor passa a ter uma visão centralizada, automatizada e confiável de todo o seu patrimônio. O tempo gasto com tarefas operacionais é drasticamente reduzido, permitindo foco no estudo e nas decisões estratégicas.

**Princípio fundamental:** o sistema não recomenda investimentos — apenas organiza informações, realiza cálculos, automatiza processos e auxilia o usuário a executar sua própria estratégia.

---

# 2. Público-Alvo

O Lio Feliz é destinado a **investidores de longo prazo** que investem em:

- ações
- FIIs (Fundos de Investimento Imobiliário)
- ETFs
- BDRs
- renda fixa
- ativos internacionais
- fundos
- REITs
- criptomoedas (futuramente)
- outros ativos que venham a ser suportados

Não existe limitação quanto ao país de investimento. O sistema deve ser útil tanto para investidores iniciantes quanto para investidores experientes.

---

# 3. Objetivos do Usuário

O usuário utiliza o sistema para:

1. **Centralizar** todo o patrimônio financeiro em um único lugar
2. **Automatizar** tarefas operacionais (cálculos, consolidação, sincronização)
3. **Acompanhar** a evolução patrimonial ao longo do tempo
4. **Analisar** alocação, rentabilidade, proventos e indicadores
5. **Organizar** informações fiscais para declaração de Imposto de Renda
6. **Planejar** aportes e rebalanceamento de acordo com sua estratégia
7. **Reduzir** o tempo gasto com administração de investimentos
8. **Preservar** o histórico completo de todas as movimentações

---

# 4. Escopo

## O sistema faz

### Gestão de Carteira
- Cadastro e acompanhamento de ativos (ações, FIIs, ETFs, BDRs, renda fixa, internacionais)
- Cálculo de preço médio por ativo
- Cálculo de patrimônio total e por classe
- Histórico completo de posições
- Alocação por ativo, classe, país e moeda

### Movimentações Financeiras
- Registro de compra e venda de ativos
- Registro de dividendos e JCP
- Registro de eventos corporativos: bonificações, desdobramentos (split), grupamentos, amortizações
- Registro de ajustes históricos

### Dashboard
- Resumo da situação patrimonial
- Patrimônio total e evolução
- Rendimento mensal
- Dividendos recebidos
- Próximos eventos relevantes

### Proventos
- Cálculo e acompanhamento de dividendos e JCP
- Histórico de proventos recebidos

### Rebalanceamento
- Situação atual da carteira vs. alocação desejada
- Sugestão de próximos aportes para rebalanceamento
- Baseado exclusivamente nas configurações do usuário

### Gestão Fiscal
- Posição em 31/12 para declaração de IR
- Dividendos, JCP e ganho de capital organizados por ano
- Compensação de prejuízos
- Relatórios para declaração anual

### Relatórios
- Patrimônio, rentabilidade, proventos
- Histórico e evolução patrimonial
- Relatórios fiscais

### Integrações
- Importação de dados da B3
- Importação via CSV
- APIs externas como fonte de dados (não como regra de negócio)

### Configurações
- Moeda principal
- Estratégia e metas
- Percentuais desejados por classe de ativo
- Preferências de importação e fiscais

### Assinaturas e Planos
- Plano gratuito (funcionalidades limitadas)
- Plano Premium (recursos avançados mediante assinatura)
- Sistema de feature flags por plano

## O sistema não faz

- **Não** realiza operações de compra ou venda de ativos
- **Não** substitui corretoras
- **Não** realiza consultoria financeira
- **Não** recomenda investimentos com base em opinião ou análise de mercado
- **Não** oferece sinais de trade
- **Não** atua como plataforma de notícias
- **Não** é uma rede social
- **Não** é um sistema de day trade
- **Não** é voltado para especulação

---

# 5. MVP Oficial

O MVP corresponde ao horizonte **MLP (Minimum Loveable Product)** do backlog oficial.

## Funcionalidades MLP

| Feature | Descrição |
|---------|-----------|
| FEAT-001 | Sistema de Assinaturas — planos gratuito e Premium |
| FEAT-002 | Plano Gratuito — acesso limitado para novos usuários |
| FEAT-003 | Plano Premium — todos os recursos avançados |
| FEAT-004 | Subscription Engine — autenticação, planos, permissões |
| FEAT-009 | Atualizações Automáticas — sincronização automática de dados |
| FEAT-014 | Template Oficial de Prompts — padronização de interações com IA |
| FEAT-015 | Fluxo Oficial de Auditoria — formalização do ciclo de auditoria |

> O MVP será oficialmente definido quando a Application Layer, Infrastructure e Frontend estiverem em estágio avançado, permitindo um recorte coeso de funcionalidades entregáveis.

## Funcionalidades Pós-MLP / Evolução

| Feature | Descrição |
|---------|-----------|
| FEAT-005 | Integração Oficial com B3 |
| FEAT-006 | Vida Financeira — controle de receitas e despesas |
| FEAT-007 | Integração Carteira ↔ Vida Financeira |
| FEAT-008 | Notificações Inteligentes |
| FEAT-010 | Feature Flags por Plano |
| FEAT-011 | ADR-009 — Arquitetura da Documentação |
| FEAT-012 | Proventos Engine |
| FEAT-016 | Sistema de Baselines da Documentação |
| FEAT-018 | Linha do Tempo Patrimonial |
| FEAT-019 | Replay Patrimonial |

## Funcionalidades de Visão / Longo Prazo

| Feature | Descrição |
|---------|-----------|
| FEAT-013 | Governança Documental |
| FEAT-017 | Governança Oficial do Projeto |
| FEAT-020 | Inteligência Histórica |
| FEAT-021 | Insights Comportamentais |
| FEAT-022 | Automação da Governança Documental |

---

# 6. Jornada Completa do Usuário

```
Primeiro acesso (cadastro, plano gratuito)
    ↓
Configuração inicial (moeda, estratégia, metas)
    ↓
Importação da carteira (CSV, B3, manual)
    ↓
Consolidação (cálculo de posições, preço médio, alocação)
    ↓
Análise (dashboard, indicadores, relatórios)
    ↓
Decisão (aporte, rebalanceamento, ajuste de estratégia)
    ↓
Uso diário (acompanhamento, notificações, atualizações)
    ↓
Acompanhamento patrimonial (evolução, histórico, proventos)
    ↓
Gestão fiscal (organização anual, IR)
```

---

# 7. Fluxos do Usuário

## Onboarding
Usuário acessa o sistema pela primeira vez → escolhe plano gratuito → configura moeda principal → define objetivos e metas → acessa o dashboard vazio.

## Importação da Carteira
Usuário acessa módulo de importação → envia arquivo CSV ou conecta fonte de dados (B3) → sistema interpreta os dados → registra operações → consolida posições → exibe resultado.

## Atualização Automática
Sistema verifica fontes de dados configuradas → busca novas informações → interpreta operações → registra eventos → atualiza posições e projeções → notifica o usuário (se configurado).

## Análise da Carteira
Usuário acessa dashboard → visualiza patrimônio total, alocação, evolução → consulta posições detalhadas por ativo → analisa proventos recebidos → verifica rentabilidade.

## Proventos
Sistema identifica proventos declarados (dividendos, JCP) → registra automaticamente → atualiza posições → disponibiliza histórico → organiza informações fiscais.

## Rebalanceamento
Usuário configura percentuais desejados por classe → sistema compara com alocação atual → calcula diferenças → sugere próximos aportes → usuário ajusta estratégia.

## Imposto de Renda
Sistema organiza informações por ano → calcula posição em 31/12 → compila dividendos, JCP, ganho de capital → disponibiliza relatórios → usuário exporta para declaração.

---

# 8. Casos de Uso

| Código | Nome | Ator | Objetivo |
|--------|------|------|----------|
| UC-001 | Consultar patrimônio | Usuário | Visualizar resumo completo da situação patrimonial |
| UC-002 | Importar carteira | Usuário | Importar posições e operações de fonte externa |
| UC-003 | Registrar operação | Usuário | Registrar compra, venda ou evento manualmente |
| UC-004 | Consultar posição | Usuário | Visualizar detalhes de um ativo na carteira |
| UC-005 | Acompanhar proventos | Usuário | Visualizar dividendos e JCP recebidos |
| UC-006 | Rebalancear carteira | Usuário | Verificar alocação atual vs. desejada e planejar aportes |
| UC-007 | Gerar relatório fiscal | Usuário | Obter informações organizadas para declaração de IR |
| UC-008 | Configurar estratégia | Usuário | Definir percentuais desejados, metas e preferências |
| UC-009 | Visualizar histórico | Usuário | Navegar pela evolução patrimonial ao longo do tempo |
| UC-010 | Consultar rentabilidade | Usuário | Verificar retorno dos investimentos por período |
| UC-011 | Gerenciar assinatura | Usuário | Gerenciar plano, pagamento e recursos disponíveis |
| UC-012 | Sincronizar dados | Sistema | Atualizar automaticamente informações de fonte externa |
| UC-013 | Exportar dados | Usuário | Realizar backup ou exportar informações da carteira |
| UC-014 | Acompanhar metas | Usuário | Visualizar progresso em relação a metas financeiras |

---

# 9. Requisitos Funcionais

## Módulo: Carteira

| ID | Descrição | UC relacionado |
|----|-----------|----------------|
| FR-001 | O sistema deve permitir o cadastro de ativos na carteira do usuário | UC-003 |
| FR-002 | O sistema deve calcular o preço médio de cada ativo com base nas operações registradas | UC-004 |
| FR-003 | O sistema deve calcular o patrimônio total e por ativo | UC-001 |
| FR-004 | O sistema deve calcular a alocação percentual por ativo | UC-006 |
| FR-005 | O sistema deve manter histórico de posições ao longo do tempo | UC-009 |
| FR-006 | O sistema deve calcular a rentabilidade por ativo e por período | UC-010 |

## Módulo: Movimentações

| ID | Descrição | UC relacionado |
|----|-----------|----------------|
| FR-007 | O sistema deve registrar operações de compra e venda de ativos | UC-003 |
| FR-008 | O sistema deve registrar dividendos e JCP recebidos | UC-005 |
| FR-009 | O sistema deve registrar eventos corporativos (bonificação, split, grupamento, amortização, ajuste) | UC-003 |
| FR-010 | O sistema deve recalcular posições e preço médio após cada evento | UC-004 |

## Módulo: Dashboard

| ID | Descrição | UC relacionado |
|----|-----------|----------------|
| FR-011 | O sistema deve exibir o patrimônio total do usuário | UC-001 |
| FR-012 | O sistema deve exibir a evolução patrimonial em gráfico ou linha do tempo | UC-009 |
| FR-013 | O sistema deve exibir o rendimento mensal | UC-001 |
| FR-014 | O sistema deve exibir os dividendos recebidos no período | UC-005 |

## Módulo: Gestão Fiscal

| ID | Descrição | UC relacionado |
|----|-----------|----------------|
| FR-015 | O sistema deve organizar informações para declaração de IR por ano | UC-007 |
| FR-016 | O sistema deve calcular posição em 31/12 para cada ativo | UC-007 |
| FR-017 | O sistema deve consolidar dividendos, JCP e ganho de capital por ano | UC-007 |
| FR-018 | O sistema deve permitir compensação de prejuízos | UC-007 |

## Módulo: Rebalanceamento

| ID | Descrição | UC relacionado |
|----|-----------|----------------|
| FR-019 | O sistema deve permitir configurar percentuais desejados por classe de ativo | UC-008 |
| FR-020 | O sistema deve comparar alocação atual com a desejada | UC-006 |
| FR-021 | O sistema deve sugerir próximos aportes para rebalanceamento | UC-006 |

## Módulo: Integrações

| ID | Descrição | UC relacionado |
|----|-----------|----------------|
| FR-022 | O sistema deve importar dados de arquivos CSV | UC-002 |
| FR-023 | O sistema deve sincronizar dados com a B3 (quando disponível) | UC-012 |
| FR-024 | As integrações não podem executar regras financeiras | — |

## Módulo: Configurações

| ID | Descrição | UC relacionado |
|----|-----------|----------------|
| FR-025 | O sistema deve permitir configurar a moeda principal | UC-008 |
| FR-026 | O sistema deve permitir configurar metas financeiras | UC-014 |
| FR-027 | O sistema deve permitir configurar percentuais desejados por classe | UC-008 |

## Módulo: Relatórios

| ID | Descrição | UC relacionado |
|----|-----------|----------------|
| FR-028 | O sistema deve gerar relatório de patrimônio | UC-001 |
| FR-029 | O sistema deve gerar relatório de rentabilidade | UC-010 |
| FR-030 | O sistema deve gerar relatório de proventos | UC-005 |
| FR-031 | O sistema deve gerar relatório fiscal para IR | UC-007 |

## Módulo: Assinaturas

| ID | Descrição | UC relacionado |
|----|-----------|----------------|
| FR-032 | O sistema deve oferecer plano gratuito com funcionalidades limitadas | UC-011 |
| FR-033 | O sistema deve oferecer plano Premium com recursos avançados | UC-011 |
| FR-034 | O sistema deve controlar acesso a funcionalidades por plano | UC-011 |

---

# 10. Requisitos Não Funcionais

| ID | Categoria | Descrição |
|----|-----------|-----------|
| NFR-001 | Desempenho | O sistema deve processar operações e recalcular posições em tempo hábil para uso interativo |
| NFR-002 | Desempenho | O sistema deve suportar centenas de eventos por portfólio sem degradação perceptível |
| NFR-003 | Confiabilidade | Os cálculos financeiros (preço médio, patrimônio, rentabilidade) devem ser precisos e consistentes |
| NFR-004 | Confiabilidade | O sistema deve preservar a integridade dos dados financeiros em todas as operações |
| NFR-005 | Segurança | Dados financeiros do usuário devem ser armazenados de forma segura |
| NFR-006 | Segurança | O sistema deve respeitar a privacidade dos dados do usuário |
| NFR-007 | Disponibilidade | O sistema deve estar disponível para consulta e uso regulares |
| NFR-008 | Sincronização | A sincronização com fontes externas não pode comprometer dados existentes |
| NFR-009 | Sincronização | O usuário deve poder usar o sistema offline (consultas) com sincronização posterior |
| NFR-010 | Usabilidade | A interface deve ser intuitiva para investidores iniciantes e experientes |
| NFR-011 | Usabilidade | Informações complexas devem ser apresentadas de forma clara e organizada |
| NFR-012 | Manutenibilidade | Regras de negócio devem ser independentes de tecnologia, APIs externas e fornecedores |
| NFR-013 | Manutenibilidade | Novas funcionalidades devem ser adicionadas sem reestruturações profundas |
| NFR-014 | Portabilidade | O usuário deve poder exportar seus dados a qualquer momento |
| NFR-015 | Portabilidade | Nenhuma informação importante deve ficar presa a um fornecedor específico |

---

# 11. Regras Gerais

1. **Neutralidade Financeira** — o sistema jamais deve influenciar decisões de investimento com opiniões, previsões ou análises subjetivas. Toda sugestão deve ser baseada exclusivamente nas configurações do usuário.

2. **Independência Tecnológica** — as regras de negócio nunca devem depender de APIs externas, fornecedores de dados ou tecnologias específicas.

3. **Eventos como Fonte da Verdade** — toda evolução patrimonial é representada por eventos financeiros imutáveis. Posições e projeções são sempre derivadas dos eventos.

4. **Consistência dos Dados** — nenhuma implementação pode comprometer a consistência dos dados financeiros do usuário.

5. **Automação** — sempre que viável, tarefas repetitivas devem ser automatizadas para reduzir trabalho manual do usuário.

6. **Simplicidade** — a experiência do usuário tem prioridade sobre conveniências de implementação.

7. **Modularidade** — cada funcionalidade deve pertencer a exatamente um módulo, com responsabilidades claramente definidas.

8. **Precedência de Importação** — dados importados de fontes oficiais (ex.: B3) prevalecem sobre dados informados manualmente em caso de conflito.

---

# 12. Relação com os Módulos

| Módulo | FRs | UCs | Features |
|--------|-----|-----|----------|
| Carteira | FR-001 a FR-006 | UC-003, UC-004, UC-009, UC-010 | FEAT-007, FEAT-012 |
| Movimentações | FR-007 a FR-010 | UC-003, UC-005 | FEAT-012 |
| Dashboard | FR-011 a FR-014 | UC-001, UC-005, UC-009 | — |
| Gestão Fiscal | FR-015 a FR-018 | UC-007 | — |
| Rebalanceamento | FR-019 a FR-021 | UC-006, UC-008 | — |
| Integrações | FR-022 a FR-024 | UC-002, UC-012 | FEAT-005 |
| Configurações | FR-025 a FR-027 | UC-008, UC-014 | FEAT-006, FEAT-007 |
| Relatórios | FR-028 a FR-031 | UC-001, UC-005, UC-007, UC-010 | FEAT-018, FEAT-019 |
| Assinaturas | FR-032 a FR-034 | UC-011 | FEAT-001, FEAT-002, FEAT-003, FEAT-004, FEAT-010 |

---

# 13. Relação com o Backlog

| FR | Feature | Horizonte |
|----|---------|-----------|
| FR-001 a FR-006 | FEAT-007 (Integração Carteira ↔ Vida Financeira), FEAT-012 (Proventos Engine) | MLP / Pós-MLP |
| FR-007 a FR-010 | FEAT-012 (Proventos Engine) | Pós-MLP |
| FR-011 a FR-014 | — (Dashboard é módulo base) | MLP |
| FR-015 a FR-018 | — (Gestão Fiscal é módulo base) | MLP |
| FR-019 a FR-021 | — (Rebalanceamento é módulo base) | MLP |
| FR-022 a FR-024 | FEAT-005 (Integração B3) | Evolução |
| FR-025 a FR-027 | FEAT-006 (Vida Financeira), FEAT-007 | Evolução |
| FR-028 a FR-031 | FEAT-018 (Linha do Tempo), FEAT-019 (Replay) | Evolução |
| FR-032 a FR-034 | FEAT-001, FEAT-002, FEAT-003, FEAT-004, FEAT-010 | MLP / Evolução |

---

# 14. Preparação para PI-005

Este documento servirá como entrada principal para a **PI-005 (Application Layer)**.

Durante a PI-005, cada caso de uso e requisito funcional será mapeado para:

- **Application Services** — coordenação de casos de uso
- **Ports** — interfaces para infraestrutura (repositórios, gateways)
- **Domain Events** — eventos de domínio que atravessam a Application Layer
- **DTOs** — objetos de transferência entre camadas

A PI-005 não redefine comportamento funcional — ela define **como** o comportamento especificado neste documento será orquestrado e exposto para as camadas superiores.

Decisões arquiteturais específicas (padrões, frameworks, protocolos) serão definidas exclusivamente na PI-005 e documentos subsequentes.

---

# Histórico

## Versão 1.0

- Criação do documento.
- Consolidação de 34 requisitos funcionais (FR-001 a FR-034).
- Definição de 14 casos de uso (UC-001 a UC-014).
- Definição de 15 requisitos não funcionais (NFR-001 a NFR-015).
- Mapeamento de todas as 21 features do backlog oficial.
- Institucionalizado via GOV-021.
