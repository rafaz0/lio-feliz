# Lio Feliz - Documentação Oficial

# 06_BUSINESS_RULES/03_MARKET_DATA.md

**Projeto:** Lio Feliz

**Documento:** 03_MARKET_DATA.md

**Versão:** 1.0

**Status:** APROVADO

**Última atualização:** 08/07/2026

---

# Objetivo

Este documento define as regras de negócio para obtenção, sincronização, validação, armazenamento e disponibilização dos dados de mercado utilizados pelo Lio Feliz.

Os Dados de Mercado representam uma das principais fontes de informação do sistema, mas nunca substituem as informações cadastradas pelo usuário.

---

# Escopo

Este documento abrange exclusivamente:

- cotações em tempo real ou com atraso;
- histórico de preços;
- indicadores de mercado;
- informações cadastrais dos ativos;
- sincronização entre provedores;
- validação dos dados recebidos;
- cache e atualização dos dados.

Não fazem parte deste documento:

- cálculo da carteira;
- eventos corporativos;
- proventos;
- tributação;
- regras de investimento.

Esses assuntos possuem documentos específicos.

---

# Princípios

## Fonte Externa

Todo dado de mercado é considerado uma informação externa.

Nenhum provedor é considerado absolutamente confiável.

Sempre que possível, os dados deverão ser validados.

---

## Independência

O funcionamento da carteira nunca deverá depender exclusivamente de um provedor específico.

O sistema deverá permitir substituição de provedores sem alterar as regras de negócio.

---

## Disponibilidade

Caso um provedor fique indisponível, o sistema deverá continuar funcionando utilizando:

- cache;
- último valor conhecido;
- outro provedor compatível.

Sempre informando ao usuário quando o dado estiver desatualizado.

---

# Tipos de Dados

O sistema poderá armazenar:

## Cotações

- preço atual;
- abertura;
- máxima;
- mínima;
- fechamento;
- volume.

---

## Histórico

- diário;
- semanal;
- mensal;
- anual.

---

## Dados Cadastrais

- ticker;
- nome;
- tipo do ativo;
- moeda;
- bolsa;
- setor;
- segmento.

---

## Indicadores

Quando disponíveis:

- Dividend Yield;
- P/VP;
- P/L;
- Valor Patrimonial;
- Liquidez;
- Market Cap;
- demais indicadores suportados.

---

# Sincronização

Os dados poderão ser sincronizados:

- automaticamente;
- manualmente;
- sob demanda.

O usuário nunca deverá ser obrigado a sincronizar manualmente para utilizar o sistema.

---

# Frequência de Atualização

Cada tipo de informação poderá possuir frequência própria.

Exemplos:

Cotação:

- durante o uso;
- conforme disponibilidade do provedor.

Indicadores:

- diariamente.

Informações cadastrais:

- somente quando houver alterações.

---

# Cache

O sistema deverá utilizar cache para reduzir chamadas externas.

O cache nunca deverá alterar o comportamento da aplicação.

Caso um dado esteja em cache:

- sua data deverá ser conhecida;
- sua origem deverá ser registrada.

---

# Validação

Sempre que possível, o sistema deverá comparar informações entre diferentes provedores.

Caso exista divergência significativa:

- registrar ocorrência;
- utilizar a fonte considerada mais confiável;
- permitir futura auditoria.

---

# Falhas

Caso nenhuma fonte esteja disponível:

- manter último valor conhecido;
- informar que os dados estão desatualizados;
- nunca impedir acesso à carteira.

---

# Integração com Outros Módulos

Os Dados de Mercado fornecem informações para:

- Carteira;
- Projection Layer;
- Dashboard;
- Metas;
- Insights;
- Decision Engine;
- Proventos;
- Corporate Actions;
- IR.

Os Dados de Mercado nunca alteram diretamente qualquer módulo.

Eles apenas fornecem informações.

---

# Auditoria

Cada sincronização deverá registrar:

- data;
- horário;
- provedor utilizado;
- duração;
- resultado;
- quantidade de ativos atualizados.

---

# Decisões de Projeto

## Por que utilizar múltiplos provedores?

Para reduzir dependência de serviços externos e aumentar a confiabilidade do sistema.

---

## Por que utilizar cache?

Para melhorar desempenho, reduzir custos e permitir funcionamento mesmo durante indisponibilidades temporárias.

---

## Por que separar Dados de Mercado da Carteira?

Porque preços de mercado mudam constantemente, enquanto as operações da carteira representam fatos históricos.

Misturar ambos comprometeria a integridade do sistema.

---

# Casos de Uso Relacionados

- UC-001 Atualização de Cotações
- UC-002 Sincronização Manual
- UC-003 Atualização Automática
- UC-004 Consulta de Histórico
- UC-005 Validação entre Provedores

---

# Histórico

## Versão 1.0

Criação oficial das regras de negócio para Dados de Mercado.
