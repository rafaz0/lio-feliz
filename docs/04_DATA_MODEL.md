# Lio Feliz - Documentação Oficial

# 04_DATA_MODEL.md

**Projeto:** Lio Feliz

**Documento:** 04_DATA_MODEL.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 07/07/2026

---

# Objetivo

Este documento define o modelo conceitual do domínio do Lio Feliz.

Seu objetivo é padronizar todas as entidades utilizadas pelo sistema antes da implementação das regras de negócio.

Este documento não descreve banco de dados, tabelas ou tecnologia.

Ele representa apenas os conceitos de negócio do sistema.

Toda implementação deverá respeitar este modelo.

---

# Princípios

O modelo de dados deve ser:

- independente da tecnologia utilizada;
- independente do banco de dados;
- independente da interface;
- orientado ao domínio do negócio;
- preparado para crescimento futuro.

Nenhuma entidade deverá existir apenas para atender limitações técnicas.

---

# Entidades Principais

O sistema é composto pelas seguintes entidades principais:

- Usuário
- Carteira
- Ativo
- Classe de Ativo
- Movimentação
- Posição
- Evento Corporativo
- Provento
- Meta
- Estratégia
- Alocação
- Cotação
- Histórico
- Relatório
- Documento Fiscal
- Importação
- Integração
- Notificação

Cada entidade possui responsabilidades próprias.

---

# Usuário

Representa o proprietário dos dados.

Responsabilidades:

- autenticação;
- preferências;
- configurações;
- moeda principal;
- idioma;
- fuso horário.

Um usuário pode possuir múltiplas carteiras.

---

# Carteira

Representa um conjunto organizado de investimentos.

Uma carteira contém:

- ativos;
- movimentações;
- posições;
- metas;
- histórico;
- estratégias.

Toda informação financeira pertence a uma carteira.

---

# Ativo

Representa qualquer instrumento financeiro controlado pelo sistema.

Exemplos:

- ações brasileiras;
- FIIs;
- ETFs;
- BDRs;
- renda fixa;
- criptomoedas;
- ações internacionais;
- REITs;
- ETFs internacionais;
- outros ativos suportados futuramente.

Todo ativo possui um identificador único.

---

# Classe de Ativo

Agrupa ativos semelhantes.

Exemplos:

- Ações
- FIIs
- ETFs
- BDRs
- Renda Fixa
- Criptomoedas
- REITs
- ETFs Internacionais
- Ações Internacionais

Novas classes poderão ser adicionadas futuramente.

---

# Movimentação

Representa qualquer operação realizada pelo usuário.

Exemplos:

- compra;
- venda.

Eventos automáticos não são movimentações.

Eles pertencem à entidade Evento Corporativo.

---

# Evento Corporativo

Representa acontecimentos promovidos pelo emissor do ativo.

Exemplos:

- dividendos;
- juros sobre capital próprio;
- bonificações;
- desdobramentos;
- grupamentos;
- subscrições;
- amortizações;
- incorporações;
- fusões;
- cisões;
- conversões.

Sempre que possível esses eventos serão processados automaticamente.

---

# Provento

Representa um rendimento financeiro recebido pelo investidor.

Exemplos:

- dividendos;
- JCP;
- rendimentos de FIIs;
- amortizações em dinheiro.

Um provento pode ser originado por um Evento Corporativo.

---

# Posição

Representa a situação atual do usuário em determinado ativo.

Exemplos:

- quantidade;
- preço médio;
- custo total;
- valor de mercado;
- rentabilidade.

Posições são calculadas automaticamente.

Nunca serão cadastradas manualmente.

---

# Cotação

Representa o preço de mercado de um ativo em determinado momento.

Pode possuir múltiplas origens.

Exemplos:

- Yahoo Finance;
- BRAPI;
- APIs futuras.

---

# Histórico

Representa a evolução da carteira ao longo do tempo.

Pode armazenar:

- patrimônio;
- rentabilidade;
- dividendos;
- alocação;
- evolução das metas.

---

# Estratégia

Representa a filosofia de investimento adotada pelo usuário.

Exemplos:

- Buy and Hold;
- Dividendos;
- Crescimento;
- ETFs;
- Internacionalização;
- Estratégias personalizadas.

A estratégia influencia o rebalanceamento.

Nunca determina recomendações de compra baseadas em opinião de mercado.

---

# Meta

Representa objetivos definidos pelo usuário.

Exemplos:

- patrimônio;
- renda passiva;
- aposentadoria;
- percentual de determinada classe;
- independência financeira.

As metas são monitoradas continuamente.

---

# Alocação

Representa como o patrimônio deve ser distribuído.

Pode existir por:

- classe de ativo;
- ativo;
- país;
- moeda;
- setor;
- estratégia.

Será utilizada pelo motor de rebalanceamento.

---

# Documento Fiscal

Representa informações necessárias para obrigações tributárias.

Exemplos:

- IRPF;
- DARF;
- informes;
- relatórios anuais.

O sistema deverá gerar essas informações automaticamente sempre que possível.

---

# Relatório

Representa qualquer consolidação de informações produzida pelo sistema.

Exemplos:

- posição patrimonial;
- evolução;
- dividendos;
- patrimônio;
- alocação;
- imposto de renda.

---

# Importação

Representa processos de entrada de dados.

Exemplos:

- CSV;
- planilhas;
- arquivos da B3;
- portabilidade do Investidor10;
- outros formatos futuros.

A importação nunca será obrigatória.

---

# Integração

Representa comunicação com serviços externos.

Exemplos:

- B3;
- Yahoo Finance;
- BRAPI;
- CoinGecko;
- futuras APIs.

O sistema deve continuar funcionando mesmo que uma integração esteja indisponível.

---

# Notificação

Representa avisos importantes ao usuário.

Exemplos:

- eventos corporativos;
- metas atingidas;
- necessidade de rebalanceamento;
- pendências fiscais;
- erros de sincronização.

---

# Relações Conceituais

As principais relações entre entidades são:

Usuário

↓

Carteira

↓

Movimentações

↓

Posições

↓

Histórico

↓

Relatórios

Os ativos se relacionam com:

- cotações;
- eventos corporativos;
- proventos.

As metas utilizam:

- posições;
- patrimônio;
- histórico;
- alocação.

O rebalanceamento utiliza:

- estratégia;
- alocação;
- posições;
- patrimônio.

---

# Regras Gerais

Nenhuma entidade poderá acumular responsabilidades de outra.

Sempre que possível:

- dados serão calculados;
- informações redundantes serão evitadas;
- estados derivados não serão armazenados permanentemente.

---

# Preparação para Crescimento

O modelo foi concebido para permitir:

- múltiplas moedas;
- múltiplos países;
- múltiplas bolsas;
- novos tipos de ativos;
- novas integrações;
- novos módulos fiscais;
- novos relatórios.

Nenhuma dessas expansões deverá exigir reconstrução do modelo conceitual.

---

# Histórico

## Versão 1.0

- Criação do modelo conceitual do domínio do Lio Feliz.
- Definição das entidades principais.
- Definição das responsabilidades de cada entidade.
