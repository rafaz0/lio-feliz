# Lio Feliz — Documentação Consolidada

Data de geração: 10/07/2026
Total de arquivos: 35
---


## Fonte: docs\00_START_HERE.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 00_START_HERE.md

**Projeto:** Lio Feliz

**Documento:** 00_START_HERE.md

**VersÃ£o da DocumentaÃ§Ã£o:** 1.0

**VersÃ£o do Projeto:** Em Desenvolvimento

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

**Autor:** Rafael Santos + ChatGPT

---

# Objetivo

Este Ã© o primeiro documento que deve ser lido por qualquer pessoa ou InteligÃªncia Artificial antes de realizar qualquer alteraÃ§Ã£o no projeto.

Seu objetivo Ã© garantir que todas as implementaÃ§Ãµes respeitem a arquitetura, as regras de negÃ³cio, a visÃ£o do sistema e a experiÃªncia do usuÃ¡rio.

Este documento possui prioridade mÃ¡xima sobre qualquer outra instruÃ§Ã£o operacional.

---

# Sobre o Projeto

O Lio Feliz Ã© uma plataforma de gestÃ£o patrimonial voltada para investidores de longo prazo.

Seu objetivo Ã© automatizar tarefas operacionais relacionadas aos investimentos, centralizar informaÃ§Ãµes financeiras e auxiliar o investidor a seguir sua prÃ³pria estratÃ©gia de forma organizada, simples e eficiente.

O sistema nÃ£o fornece recomendaÃ§Ãµes financeiras.

O sistema apenas organiza informaÃ§Ãµes, realiza cÃ¡lculos, automatiza processos e auxilia o usuÃ¡rio a executar sua prÃ³pria estratÃ©gia de investimentos.

---

# Ordem ObrigatÃ³ria de Leitura

Antes de analisar qualquer linha de cÃ³digo, leia obrigatoriamente os documentos abaixo nesta ordem:

1. 00_START_HERE.md
2. 01_VISION.md
3. 02_PROJECT_RULES.md
4. 03_PRODUCT_REQUIREMENTS.md
5. 04_DATA_MODEL.md
6. 05_SYSTEM_ARCHITECTURE.md
7. 06_BUSINESS_RULES/
8. 07_PROJECT_CONTEXT.md
9. 08_FEATURES.md
10. 09_ROADMAP.md
11. 10_CHANGELOG.md
12. 11_AI_INSTRUCTIONS.md
13. 13_DECISIONS.md
14. 14_DESIGN_PRINCIPLES.md
15. 15_PRODUCT_PHILOSOPHY.md
16. 16_PRODUCT_BACKLOG.md
17. 17_TRACEABILITY_MATRIX.md
18. 18_ARCHITECTURAL_DECISIONS/
19. 19_GLOSSARY.md
20. 07_TECHNICAL_ANNEXES/

> A numeraÃ§Ã£o completa e o status de cada documento estÃ£o definidos em [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md), que Ã© a fonte de verdade oficial da estrutura da documentaÃ§Ã£o.

Somente apÃ³s concluir toda a leitura o cÃ³digo poderÃ¡ ser analisado.

---

# Fluxo ObrigatÃ³rio de Trabalho

Toda implementaÃ§Ã£o deve seguir exatamente esta sequÃªncia.

1. Ler toda a documentaÃ§Ã£o.

â†“

2. Compreender completamente a solicitaÃ§Ã£o do usuÃ¡rio.

â†“

3. Identificar quais mÃ³dulos serÃ£o afetados.

â†“

4. Analisar cuidadosamente o cÃ³digo existente.

â†“

5. Procurar componentes, serviÃ§os, hooks, funÃ§Ãµes ou utilitÃ¡rios reutilizÃ¡veis.

â†“

6. Verificar possÃ­veis impactos em outras partes do sistema.

â†“

7. Elaborar um plano de implementaÃ§Ã£o.

â†“

8. Apresentar esse plano ao usuÃ¡rio.

â†“

9. Aguardar aprovaÃ§Ã£o.

â†“

10. Somente entÃ£o modificar o cÃ³digo.

---

# Antes de Escrever CÃ³digo

Responder internamente Ã s seguintes perguntas.

- Estou respeitando a visÃ£o do projeto?
- Estou respeitando todas as regras de negÃ³cio?
- Existe cÃ³digo semelhante?
- Existe componente semelhante?
- Existe hook semelhante?
- Existe service semelhante?
- Existe alguma implementaÃ§Ã£o que possa ser reutilizada?
- Estou aumentando a complexidade do sistema?
- Existe uma soluÃ§Ã£o mais simples?

Se qualquer resposta gerar dÃºvida, interromper a implementaÃ§Ã£o e revisar a documentaÃ§Ã£o.

---

# Durante o Desenvolvimento

Sempre:

- reutilizar componentes existentes;
- reutilizar serviÃ§os existentes;
- reutilizar hooks existentes;
- manter o cÃ³digo organizado;
- manter o cÃ³digo simples;
- documentar decisÃµes importantes;
- preservar a arquitetura existente.

Nunca:

- criar componentes duplicados;
- criar pÃ¡ginas duplicadas;
- criar lÃ³gica duplicada;
- criar serviÃ§os duplicados;
- criar cÃ³digo temporÃ¡rio;
- implementar soluÃ§Ãµes apenas para funcionar;
- aumentar a complexidade sem necessidade.

---

# VerificaÃ§Ã£o ObrigatÃ³ria

Antes de informar que uma tarefa foi concluÃ­da, verificar obrigatoriamente:

- o projeto continua compilando;
- nÃ£o existem erros de TypeScript;
- nÃ£o existem erros de ESLint;
- nÃ£o existem componentes mortos;
- nÃ£o existem imports nÃ£o utilizados;
- nÃ£o existem arquivos sem utilizaÃ§Ã£o;
- nÃ£o existem funcionalidades duplicadas;
- nÃ£o existem regressÃµes.

---

# SeguranÃ§a nas AlteraÃ§Ãµes

Sempre que uma implementaÃ§Ã£o envolver:

- patrimÃ´nio;
- preÃ§o mÃ©dio;
- rentabilidade;
- dividendos;
- juros sobre capital prÃ³prio;
- bonificaÃ§Ãµes;
- desdobramentos;
- grupamentos;
- renda fixa;
- tributaÃ§Ã£o;
- cÃ¢mbio;
- investimentos internacionais;
- rebalanceamento;
- qualquer cÃ¡lculo financeiro;

a consistÃªncia dos resultados deve ser preservada.

Antes de considerar a implementaÃ§Ã£o concluÃ­da, verificar obrigatoriamente:

- os cÃ¡lculos permanecem corretos;
- nenhuma regra de negÃ³cio foi alterada sem aprovaÃ§Ã£o;
- nenhum dado existente foi corrompido;
- os resultados continuam consistentes apÃ³s a alteraÃ§Ã£o.

Caso exista qualquer dÃºvida, interromper a implementaÃ§Ã£o e comunicar o usuÃ¡rio.

---

# ConsistÃªncia da ImplementaÃ§Ã£o

Nunca considere uma funcionalidade concluÃ­da apenas porque um novo cÃ³digo foi escrito.

TambÃ©m Ã© obrigatÃ³rio verificar:

- se existem componentes antigos realizando a mesma funÃ§Ã£o;
- se existem telas obsoletas;
- se existem abas desnecessÃ¡rias;
- se existem rotas antigas ainda acessÃ­veis;
- se existem fluxos antigos que contradizem a nova implementaÃ§Ã£o;
- se a interface realmente representa o comportamento implementado;
- se a documentaÃ§Ã£o continua compatÃ­vel com o cÃ³digo.

Caso exista qualquer inconsistÃªncia entre cÃ³digo, interface e documentaÃ§Ã£o, a tarefa NÃƒO deve ser considerada concluÃ­da.

---

# ComunicaÃ§Ã£o com o UsuÃ¡rio

Ao finalizar qualquer implementaÃ§Ã£o apresentar obrigatoriamente:

## Resumo

O que foi realizado.

## Arquivos Alterados

Quais arquivos foram modificados.

## Motivo

Por que cada alteraÃ§Ã£o foi realizada.

## Impactos

Quais partes do sistema podem ter sido afetadas.

## Riscos

Se existe algum risco conhecido.

## PrÃ³ximos Passos

Quais melhorias podem ser feitas futuramente.

Nunca responder apenas:

"Pronto."

Ou:

"ConcluÃ­do."

---

# Quando Encontrar Problemas

Caso seja encontrada qualquer inconsistÃªncia na arquitetura, na documentaÃ§Ã£o ou no cÃ³digo:

NÃ£o modificar imediatamente.

Primeiro:

- listar todos os problemas encontrados;
- explicar por que sÃ£o problemas;
- indicar quais documentos estÃ£o sendo violados;
- propor uma soluÃ§Ã£o.

Somente implementar apÃ³s aprovaÃ§Ã£o do usuÃ¡rio.

---

# AtualizaÃ§Ã£o da DocumentaÃ§Ã£o

Sempre que uma funcionalidade importante for criada, removida ou modificada:

Atualizar automaticamente os documentos necessÃ¡rios.

Nunca permitir que a documentaÃ§Ã£o fique desatualizada em relaÃ§Ã£o ao cÃ³digo.

A documentaÃ§Ã£o Ã© a principal fonte de verdade do projeto.

---

# PrincÃ­pios Fundamentais

## Simplicidade

Sempre escolher a soluÃ§Ã£o mais simples que resolva corretamente o problema.

---

## ReutilizaÃ§Ã£o

Sempre reutilizar cÃ³digo existente antes de criar novas implementaÃ§Ãµes.

---

## OrganizaÃ§Ã£o

Cada componente deve possuir apenas uma responsabilidade.

---

## Escalabilidade

Toda implementaÃ§Ã£o deve considerar o crescimento futuro do projeto.

---

## IndependÃªncia

As regras de negÃ³cio nunca devem depender de tecnologias especÃ­ficas, APIs externas ou fornecedores de dados.

---

## Integridade dos Dados

Nenhuma implementaÃ§Ã£o poderÃ¡ comprometer a consistÃªncia dos dados financeiros do usuÃ¡rio.

---

## ExperiÃªncia do UsuÃ¡rio

A experiÃªncia do usuÃ¡rio possui prioridade sobre conveniÃªncias de implementaÃ§Ã£o.

---

## AutomaÃ§Ã£o

Sempre que possÃ­vel, tarefas repetitivas devem ser automatizadas.

O usuÃ¡rio deve precisar realizar a menor quantidade possÃ­vel de trabalho manual.

---

## TransparÃªncia

Sempre explicar claramente ao usuÃ¡rio quais alteraÃ§Ãµes foram realizadas e por quÃª.

---

## EvoluÃ§Ã£o ContÃ­nua

Toda nova funcionalidade deve fortalecer a arquitetura existente.

Nunca implementar soluÃ§Ãµes que resolvam apenas o problema atual ignorando a evoluÃ§Ã£o futura do projeto.

Sempre desenvolver funcionalidades reutilizÃ¡veis, modulares e preparadas para futuras expansÃµes.

---

## Neutralidade Financeira

O sistema jamais deverÃ¡ influenciar as decisÃµes de investimento do usuÃ¡rio com base em opiniÃµes, previsÃµes ou anÃ¡lises de mercado.

Sua funÃ§Ã£o Ã© organizar informaÃ§Ãµes, realizar cÃ¡lculos e auxiliar o usuÃ¡rio a executar a estratÃ©gia definida por ele prÃ³prio.

Toda sugestÃ£o apresentada pelo sistema deverÃ¡ ser baseada exclusivamente nas regras configuradas pelo usuÃ¡rio e nos dados existentes em sua carteira.

---

# MissÃ£o da IA

A funÃ§Ã£o da IA neste projeto nÃ£o Ã© apenas escrever cÃ³digo.

Sua missÃ£o Ã© preservar a qualidade da arquitetura, manter a documentaÃ§Ã£o atualizada, evitar complexidade desnecessÃ¡ria e ajudar a evoluir o sistema de forma consistente.

Toda decisÃ£o deve contribuir para tornar o Lio Feliz uma plataforma robusta, organizada, confiÃ¡vel, preparada para crescer durante muitos anos e simples de manter.

---

# HistÃ³rico de AlteraÃ§Ãµes

## VersÃ£o 1.0

- CriaÃ§Ã£o do documento.
- DefiniÃ§Ã£o do fluxo oficial de desenvolvimento.
- DefiniÃ§Ã£o das responsabilidades da IA.
- DefiniÃ§Ã£o dos princÃ­pios fundamentais do projeto.
- DefiniÃ§Ã£o do processo de comunicaÃ§Ã£o com o usuÃ¡rio.
- InclusÃ£o das regras de seguranÃ§a para alteraÃ§Ãµes financeiras.
- InclusÃ£o da regra de consistÃªncia entre cÃ³digo, interface e documentaÃ§Ã£o.
- InclusÃ£o dos princÃ­pios de EvoluÃ§Ã£o ContÃ­nua e Neutralidade Financeira.

## Fonte: docs\01_VISION.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 01_VISION.md

**Projeto:** Lio Feliz

**Documento:** 01_VISION.md

**VersÃ£o da DocumentaÃ§Ã£o:** 1.0

**VersÃ£o do Projeto:** Em Desenvolvimento

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

**Autor:** Rafael Santos + ChatGPT

---

# VisÃ£o do Projeto

O Lio Feliz Ã© uma plataforma de gestÃ£o patrimonial desenvolvida para investidores de longo prazo.

Seu propÃ³sito Ã© permitir que o usuÃ¡rio concentre toda a administraÃ§Ã£o do seu patrimÃ´nio financeiro em um Ãºnico lugar, reduzindo tarefas manuais, automatizando processos e fornecendo informaÃ§Ãµes confiÃ¡veis para auxiliar na tomada de decisÃµes.

O projeto foi concebido para acompanhar o investidor durante toda a sua jornada, independentemente da quantidade de ativos, do paÃ­s onde investe ou das plataformas utilizadas.

---

# MissÃ£o

Simplificar a gestÃ£o patrimonial do investidor atravÃ©s da automaÃ§Ã£o, da organizaÃ§Ã£o das informaÃ§Ãµes financeiras e da centralizaÃ§Ã£o de todos os dados necessÃ¡rios para acompanhar sua evoluÃ§Ã£o patrimonial.

O sistema deve reduzir o tempo gasto com tarefas operacionais para que o usuÃ¡rio possa dedicar mais tempo ao estudo e Ã s decisÃµes estratÃ©gicas.

---

# PropÃ³sito

Ser a plataforma principal de gestÃ£o patrimonial do usuÃ¡rio.

O objetivo Ã© que o investidor nÃ£o precise depender de planilhas, mÃºltiplos sites ou diferentes aplicativos para acompanhar seus investimentos.

Toda informaÃ§Ã£o relevante deverÃ¡ estar disponÃ­vel dentro do Lio Feliz.

---

# PÃºblico-Alvo

O projeto Ã© destinado principalmente a investidores de longo prazo.

O sistema deverÃ¡ atender usuÃ¡rios que investem em:

- aÃ§Ãµes;
- FIIs;
- ETFs;
- BDRs;
- renda fixa;
- ativos internacionais;
- fundos;
- REITs;
- criptomoedas (futuramente);
- outros ativos que venham a ser suportados.

NÃ£o existe limitaÃ§Ã£o quanto ao paÃ­s de investimento.

---

# Os Quatro Pilares do Projeto

## 1. GestÃ£o Patrimonial

Centralizar todas as informaÃ§Ãµes relacionadas ao patrimÃ´nio do usuÃ¡rio.

Exemplos:

- carteira;
- patrimÃ´nio;
- rentabilidade;
- preÃ§o mÃ©dio;
- fluxo de caixa;
- histÃ³rico;
- evoluÃ§Ã£o patrimonial.

---

## 2. AutomaÃ§Ã£o

Eliminar o mÃ¡ximo possÃ­vel das tarefas manuais.

Sempre que tecnicamente viÃ¡vel, o sistema deverÃ¡ automatizar:

- importaÃ§Ãµes;
- sincronizaÃ§Ãµes;
- cÃ¡lculo de proventos;
- eventos corporativos;
- rebalanceamentos;
- consolidaÃ§Ã£o de dados;
- atualizaÃ§Ãµes financeiras.

---

## 3. Apoio Ã  DecisÃ£o

O sistema deverÃ¡ fornecer informaÃ§Ãµes que auxiliem o investidor.

Exemplos:

- carteira desbalanceada;
- percentual atual de cada classe;
- prÃ³ximos aportes sugeridos;
- metas patrimoniais;
- evoluÃ§Ã£o dos investimentos;
- comparativos;
- simulaÃ§Ãµes.

Toda sugestÃ£o deverÃ¡ ser baseada exclusivamente nas configuraÃ§Ãµes definidas pelo prÃ³prio usuÃ¡rio.

---

## 4. GestÃ£o Fiscal

O sistema deverÃ¡ organizar continuamente as informaÃ§Ãµes fiscais do investidor.

Entre elas:

- dividendos;
- JCP;
- ganho de capital;
- compensaÃ§Ã£o de prejuÃ­zos;
- eventos corporativos;
- posiÃ§Ãµes anuais;
- movimentaÃ§Ãµes;
- relatÃ³rios para declaraÃ§Ã£o do Imposto de Renda.

O objetivo Ã© reduzir drasticamente o trabalho necessÃ¡rio durante o perÃ­odo de declaraÃ§Ã£o anual.

---

# IndependÃªncia

O Lio Feliz deverÃ¡ ser completamente independente de qualquer fornecedor de dados.

IntegraÃ§Ãµes com:

- B3;
- Investidor10;
- corretoras;
- arquivos CSV;
- APIs;

serÃ£o utilizadas apenas como fontes de informaÃ§Ã£o.

As regras de negÃ³cio permanecerÃ£o totalmente independentes dessas integraÃ§Ãµes.

Caso qualquer serviÃ§o deixe de existir, o funcionamento interno do sistema nÃ£o deverÃ¡ ser comprometido.

---

# Portabilidade

O usuÃ¡rio Ã© proprietÃ¡rio dos prÃ³prios dados.

O sistema deverÃ¡ facilitar:

- importaÃ§Ã£o;
- exportaÃ§Ã£o;
- backup;
- restauraÃ§Ã£o;
- migraÃ§Ã£o entre plataformas.

Nenhuma informaÃ§Ã£o importante deverÃ¡ ficar presa a um fornecedor especÃ­fico.

---

# IntegraÃ§Ã£o com a B3

A integraÃ§Ã£o com a B3 representa o principal objetivo de sincronizaÃ§Ã£o automÃ¡tica do sistema.

Sempre que possÃ­vel, o usuÃ¡rio deverÃ¡ conseguir manter sua carteira atualizada automaticamente atravÃ©s dos dados disponibilizados pela B3.

Essa integraÃ§Ã£o deverÃ¡ ser desenvolvida de forma desacoplada das regras de negÃ³cio.

---

# Neutralidade

O Lio Feliz nÃ£o deverÃ¡ recomendar investimentos com base em opiniÃµes, previsÃµes ou anÃ¡lises subjetivas.

Entretanto, poderÃ¡ apresentar:

- indicadores;
- estatÃ­sticas;
- comparativos;
- carteiras modelo;
- estudos;
- simulaÃ§Ãµes;
- sugestÃµes de rebalanceamento baseadas exclusivamente na estratÃ©gia configurada pelo usuÃ¡rio.

A decisÃ£o final sempre pertence ao investidor.

---

# Escalabilidade

O sistema deverÃ¡ crescer de forma modular.

Novas funcionalidades deverÃ£o ser adicionadas sem exigir reestruturaÃ§Ãµes profundas da arquitetura.

Cada mÃ³dulo deverÃ¡ possuir responsabilidades claramente definidas.

---

# ExperiÃªncia do UsuÃ¡rio

A simplicidade deverÃ¡ prevalecer sobre a complexidade.

Sempre que existirem duas soluÃ§Ãµes tecnicamente equivalentes, deverÃ¡ ser escolhida aquela que proporcionar a melhor experiÃªncia para o usuÃ¡rio.

O sistema deve ser intuitivo tanto para investidores iniciantes quanto para investidores experientes.

---

# VisÃ£o de Longo Prazo

O objetivo do projeto Ã© tornar-se uma plataforma completa de gestÃ£o patrimonial.

No futuro, o Lio Feliz deverÃ¡ permitir que o usuÃ¡rio realize praticamente toda a administraÃ§Ã£o dos seus investimentos utilizando apenas a plataforma.

Isso inclui:

- acompanhamento da carteira;
- sincronizaÃ§Ã£o de dados;
- organizaÃ§Ã£o patrimonial;
- acompanhamento fiscal;
- planejamento de aportes;
- rebalanceamento;
- relatÃ³rios;
- histÃ³rico financeiro.

---

# O que o Lio Feliz Nunca Deve Ser

O projeto nÃ£o deverÃ¡ se transformar em:

- uma rede social;
- uma plataforma de recomendaÃ§Ãµes financeiras;
- um sistema de day trade;
- um sistema voltado para especulaÃ§Ã£o;
- um agregador de notÃ­cias sensacionalistas.

Seu foco sempre serÃ¡ o investidor de longo prazo.

---

# DeclaraÃ§Ã£o de Identidade

O Lio Feliz existe para simplificar a vida do investidor.

Cada funcionalidade desenvolvida deverÃ¡ responder positivamente Ã s seguintes perguntas:

1. Resolve um problema real do investidor?

2. Reduz trabalho manual?

3. MantÃ©m a simplicidade do sistema?

4. Respeita a autonomia do usuÃ¡rio?

5. Pode evoluir sem comprometer a arquitetura?

Se qualquer resposta for negativa, a implementaÃ§Ã£o deverÃ¡ ser reavaliada.

---

# HistÃ³rico de AlteraÃ§Ãµes

## VersÃ£o 1.0

- DefiniÃ§Ã£o da visÃ£o oficial do projeto.
- DefiniÃ§Ã£o dos quatro pilares.
- DefiniÃ§Ã£o da missÃ£o.
- DefiniÃ§Ã£o do propÃ³sito.
- DefiniÃ§Ã£o da polÃ­tica de independÃªncia.
- DefiniÃ§Ã£o da polÃ­tica de portabilidade.
- InclusÃ£o da integraÃ§Ã£o prioritÃ¡ria com a B3.
- InclusÃ£o do mÃ³dulo de gestÃ£o fiscal.
- DefiniÃ§Ã£o da visÃ£o de longo prazo.

## Fonte: docs\02_PROJECT_RULES.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 02_PROJECT_RULES.md

**Projeto:** Lio Feliz

**Documento:** 02_PROJECT_RULES.md

**VersÃ£o da DocumentaÃ§Ã£o:** 1.0

**VersÃ£o do Projeto:** Em Desenvolvimento

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

**Autor:** Rafael Santos + ChatGPT

---

# Objetivo

Este documento define as regras de desenvolvimento do projeto Lio Feliz.

Seu objetivo Ã© garantir que todo cÃ³digo produzido seja consistente, reutilizÃ¡vel, organizado, escalÃ¡vel e de fÃ¡cil manutenÃ§Ã£o.

Todas as implementaÃ§Ãµes deverÃ£o seguir obrigatoriamente estas regras.

Caso alguma solicitaÃ§Ã£o entre em conflito com este documento, a IA deverÃ¡ informar o usuÃ¡rio antes de prosseguir.

---

# Ordem de Prioridade

Quando existir conflito entre documentos, utilizar a seguinte prioridade:

1. 00_START_HERE.md
2. 01_VISION.md
3. 02_PROJECT_RULES.md
4. Demais documentos

---

# Filosofia de Desenvolvimento

Antes de escrever qualquer cÃ³digo, sempre seguir esta ordem:

1. Entender o problema.
2. Procurar soluÃ§Ã£o existente.
3. Reutilizar o mÃ¡ximo possÃ­vel.
4. Criar nova implementaÃ§Ã£o apenas quando necessÃ¡rio.

---

# Regras ObrigatÃ³rias

| Regra | ObrigatÃ³rio |
|---------|:----------:|
| Reutilizar componentes existentes | âœ… |
| Reutilizar Hooks existentes | âœ… |
| Reutilizar Services existentes | âœ… |
| Reutilizar UtilitÃ¡rios existentes | âœ… |
| Atualizar documentaÃ§Ã£o quando necessÃ¡rio | âœ… |
| Explicar alteraÃ§Ãµes importantes | âœ… |
| Verificar impacto em outras funcionalidades | âœ… |

---

# Ã‰ Proibido

Nunca:

- duplicar componentes;
- duplicar lÃ³gica;
- duplicar consultas;
- duplicar regras de negÃ³cio;
- criar cÃ³digo apenas para resolver um problema momentÃ¢neo;
- criar implementaÃ§Ãµes difÃ­ceis de manter;
- alterar comportamento existente sem analisar impactos;
- remover cÃ³digo sem verificar dependÃªncias.

---

# Componentes

Antes de criar um componente novo:

- verificar se jÃ¡ existe um semelhante;
- verificar se pode ser generalizado;
- verificar se pode receber propriedades adicionais;
- verificar se outro componente pode ser reutilizado.

Criar um novo componente apenas quando realmente necessÃ¡rio.

---

# Hooks

Criar Hooks apenas quando existir lÃ³gica reutilizÃ¡vel.

Nunca criar Hooks contendo apenas uma ou duas linhas sem necessidade.

Sempre manter um Hook responsÃ¡vel por uma Ãºnica finalidade.

---

# Services

Toda comunicaÃ§Ã£o externa deverÃ¡ ocorrer atravÃ©s de Services.

Exemplos:

- APIs
- Supabase
- B3
- CSV
- ImportaÃ§Ãµes
- ExportaÃ§Ãµes

Componentes de interface nunca deverÃ£o conter lÃ³gica de comunicaÃ§Ã£o externa.

---

# Regras de NegÃ³cio

Nenhuma regra financeira poderÃ¡ ficar dentro da interface.

Toda regra de negÃ³cio deverÃ¡ permanecer isolada da interface.

Isso inclui:

- preÃ§o mÃ©dio;
- patrimÃ´nio;
- dividendos;
- cÃ¢mbio;
- IR;
- rebalanceamento;
- rentabilidade.

---

# OrganizaÃ§Ã£o

Cada arquivo deverÃ¡ possuir apenas uma responsabilidade.

Sempre preferir arquivos menores e especializados.

Evitar arquivos gigantes contendo diferentes responsabilidades.

---

# NomeaÃ§Ã£o

## Componentes

PascalCase

Exemplo:

PortfolioCard

---

## Hooks

Sempre iniciar com:

use

Exemplo:

usePortfolio()

---

## Services

Nome descritivo.

Exemplo:

portfolioService

---

## UtilitÃ¡rios

Nome descritivo.

Exemplo:

calculateAveragePrice

---

# Interface do UsuÃ¡rio

A interface deve:

- ser simples;
- ser intuitiva;
- evitar excesso de informaÃ§Ãµes;
- facilitar a navegaÃ§Ã£o;
- priorizar clareza.

Sempre que houver dÃºvida entre uma interface bonita e uma interface clara, escolher a interface mais clara.

---

# Banco de Dados

Antes de criar novas tabelas:

- verificar tabelas existentes;
- verificar relacionamentos;
- evitar duplicaÃ§Ã£o de informaÃ§Ãµes;
- preservar integridade dos dados.

---

# Performance

Evitar:

- consultas repetidas;
- renderizaÃ§Ãµes desnecessÃ¡rias;
- processamento duplicado;
- cÃ¡lculos repetitivos.

Sempre reutilizar resultados quando possÃ­vel.

---

# SeguranÃ§a

Nunca expor:

- chaves privadas;
- tokens;
- credenciais;
- informaÃ§Ãµes sensÃ­veis.

Toda comunicaÃ§Ã£o deverÃ¡ respeitar autenticaÃ§Ã£o e autorizaÃ§Ã£o.

---

# Testes

Sempre verificar:

- compilaÃ§Ã£o;
- funcionamento da funcionalidade;
- possÃ­veis regressÃµes;
- impacto em outras telas.

Nenhuma implementaÃ§Ã£o deverÃ¡ ser considerada concluÃ­da sem validaÃ§Ã£o.

---

# DocumentaÃ§Ã£o

Sempre atualizar a documentaÃ§Ã£o quando:

- uma funcionalidade for criada;
- uma regra for alterada;
- uma arquitetura mudar;
- uma integraÃ§Ã£o for adicionada.

A documentaÃ§Ã£o possui prioridade igual ao cÃ³digo.

---

# CÃ³digo Morto

Sempre remover:

- imports nÃ£o utilizados;
- funÃ§Ãµes nÃ£o utilizadas;
- componentes abandonados;
- arquivos sem uso.

Nunca deixar cÃ³digo obsoleto no projeto.

---

# RefatoraÃ§Ã£o

Quando identificar cÃ³digo que pode ser melhorado:

NÃ£o alterar automaticamente.

Primeiro informar:

- o problema;
- os benefÃ­cios;
- os riscos;
- a proposta de melhoria.

Somente refatorar apÃ³s aprovaÃ§Ã£o do usuÃ¡rio.

---

# Qualidade

Todo cÃ³digo produzido deverÃ¡ ser:

- simples;
- legÃ­vel;
- modular;
- reutilizÃ¡vel;
- previsÃ­vel;
- consistente.

CÃ³digo complexo somente serÃ¡ aceito quando existir justificativa tÃ©cnica.

---

# Responsabilidade da IA

A IA nÃ£o deve apenas implementar funcionalidades.

Ela tambÃ©m deverÃ¡:

- proteger a arquitetura;
- preservar a organizaÃ§Ã£o do projeto;
- evitar crescimento descontrolado do cÃ³digo;
- identificar oportunidades de melhoria;
- informar riscos antes de implementar alteraÃ§Ãµes significativas.

---

# Checklist ObrigatÃ³rio

Antes de concluir qualquer tarefa:

â˜ Li toda a documentaÃ§Ã£o.

â˜ Analisei o cÃ³digo existente.

â˜ Reutilizei componentes quando possÃ­vel.

â˜ Evitei duplicaÃ§Ãµes.

â˜ Atualizei documentaÃ§Ã£o.

â˜ Verifiquei impactos.

â˜ Testei a implementaÃ§Ã£o.

â˜ Expliquei as alteraÃ§Ãµes ao usuÃ¡rio.

Nenhuma tarefa deverÃ¡ ser considerada concluÃ­da sem esse checklist.

---

# HistÃ³rico de AlteraÃ§Ãµes

## VersÃ£o 1.0

- CriaÃ§Ã£o do documento.
- DefiniÃ§Ã£o das regras gerais de desenvolvimento.
- DefiniÃ§Ã£o das regras de reutilizaÃ§Ã£o.
- DefiniÃ§Ã£o das responsabilidades da IA.
- DefiniÃ§Ã£o do checklist obrigatÃ³rio.

## Fonte: docs\03_PRODUCT_REQUIREMENTS.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 03_PRODUCT_REQUIREMENTS.md

**Projeto:** Lio Feliz

**Documento:** 03_PRODUCT_REQUIREMENTS.md

**VersÃ£o da DocumentaÃ§Ã£o:** 1.0

**VersÃ£o do Projeto:** Em Desenvolvimento

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

**Autor:** Rafael Santos + ChatGPT

---

# Objetivo

Este documento define os requisitos funcionais do produto.

Seu objetivo Ã© descrever quais mÃ³dulos fazem parte do Lio Feliz, quais funcionalidades pertencem a cada mÃ³dulo e quais princÃ­pios devem orientar sua evoluÃ§Ã£o.

Este documento descreve o produto.

A implementaÃ§Ã£o tÃ©cnica serÃ¡ documentada separadamente.

---

# Escopo do Projeto

O Lio Feliz Ã© uma plataforma de gestÃ£o patrimonial voltada para investidores de longo prazo.

O sistema deverÃ¡ permitir que o usuÃ¡rio concentre toda a administraÃ§Ã£o de seus investimentos em um Ãºnico ambiente.

Todas as funcionalidades futuras deverÃ£o estar relacionadas direta ou indiretamente com esse objetivo.

---

# Estrutura Geral do Produto

O projeto serÃ¡ organizado em mÃ³dulos independentes.

Cada mÃ³dulo deverÃ¡ possuir responsabilidades claramente definidas.

Nenhum mÃ³dulo deverÃ¡ depender diretamente das regras internas de outro mÃ³dulo.

Sempre que possÃ­vel, a comunicaÃ§Ã£o ocorrerÃ¡ atravÃ©s do nÃºcleo do sistema.

---

# MÃ³dulos do Sistema

## Dashboard

Objetivo:

Apresentar um resumo completo da situaÃ§Ã£o patrimonial do usuÃ¡rio.

Exemplos:

- patrimÃ´nio total;
- evoluÃ§Ã£o patrimonial;
- patrimÃ´nio por classe;
- patrimÃ´nio por paÃ­s;
- patrimÃ´nio por moeda;
- rendimento mensal;
- dividendos recebidos;
- prÃ³ximos eventos relevantes.

---

## Carteira

Objetivo:

Centralizar todas as posiÃ§Ãµes do usuÃ¡rio.

Responsabilidades:

- ativos;
- quantidades;
- preÃ§o mÃ©dio;
- patrimÃ´nio;
- alocaÃ§Ã£o;
- histÃ³rico.

---

## MovimentaÃ§Ãµes

ResponsÃ¡vel pelo registro e processamento das operaÃ§Ãµes.

Exemplos:

- compra;
- venda;
- dividendos;
- JCP;
- bonificaÃ§Ãµes;
- desdobramentos;
- grupamentos;
- subscriÃ§Ãµes;
- amortizaÃ§Ãµes;
- transferÃªncias;
- aportes.

---

## Rebalanceamento

Objetivo:

Auxiliar o usuÃ¡rio a manter sua estratÃ©gia de investimentos.

O sistema deverÃ¡ informar:

- situaÃ§Ã£o atual;
- percentual ideal;
- diferenÃ§a;
- prÃ³ximos aportes sugeridos;
- impacto dos aportes.

As sugestÃµes serÃ£o baseadas exclusivamente nas configuraÃ§Ãµes do usuÃ¡rio.

---

## GestÃ£o Fiscal

Objetivo:

Organizar continuamente todas as informaÃ§Ãµes necessÃ¡rias para facilitar a declaraÃ§Ã£o do Imposto de Renda.

Exemplos:

- posiÃ§Ã£o em 31/12;
- dividendos;
- JCP;
- ganho de capital;
- compensaÃ§Ã£o de prejuÃ­zos;
- movimentaÃ§Ãµes anuais;
- relatÃ³rios fiscais;
- histÃ³rico.

O objetivo Ã© reduzir ao mÃ¡ximo o trabalho manual do investidor.

---

## IntegraÃ§Ãµes

ResponsÃ¡vel por importar informaÃ§Ãµes externas.

Exemplos:

- B3;
- Investidor10;
- CSV;
- corretoras;
- APIs futuras.

As integraÃ§Ãµes apenas fornecem dados.

Nunca executam regras financeiras.

---

## ConfiguraÃ§Ãµes

ResponsÃ¡vel pelas preferÃªncias do usuÃ¡rio.

Exemplos:

- moeda principal;
- estratÃ©gia;
- metas;
- percentuais desejados;
- classes de ativos;
- preferÃªncias de importaÃ§Ã£o;
- preferÃªncias fiscais.

---

## RelatÃ³rios

Objetivo:

Permitir anÃ¡lises detalhadas da carteira.

Exemplos:

- patrimÃ´nio;
- rentabilidade;
- proventos;
- rebalanceamento;
- histÃ³rico;
- evoluÃ§Ã£o patrimonial;
- relatÃ³rios fiscais.

---

# Funcionalidades Futuras

O projeto deverÃ¡ ser preparado para receber novos mÃ³dulos sem necessidade de alterar a arquitetura principal.

Exemplos:

- metas financeiras;
- planejamento de aposentadoria;
- simuladores;
- carteira familiar;
- mÃºltiplos usuÃ¡rios;
- aplicativo mÃ³vel;
- notificaÃ§Ãµes;
- inteligÃªncia artificial;
- integraÃ§Ã£o com bancos;
- sincronizaÃ§Ã£o automÃ¡tica com corretoras.

---

# Funcionalidades Fora do Escopo

O projeto nÃ£o possui como objetivo:

- realizar operaÃ§Ãµes de compra ou venda de ativos;
- substituir corretoras;
- realizar consultoria financeira;
- recomendar investimentos com base em opiniÃ£o;
- oferecer sinais de trade;
- atuar como plataforma de notÃ­cias.

---

# PrincÃ­pios de EvoluÃ§Ã£o

Toda nova funcionalidade deverÃ¡:

- resolver um problema real;
- integrar-se aos mÃ³dulos existentes;
- respeitar a arquitetura;
- preservar a simplicidade;
- ser preparada para crescimento futuro.

---

# DependÃªncias Entre MÃ³dulos

As funcionalidades deverÃ£o seguir, sempre que possÃ­vel, esta estrutura lÃ³gica:

IntegraÃ§Ãµes

â†“

MovimentaÃ§Ãµes

â†“

Motor Financeiro

â†“

Carteira

â†“

Dashboard

â†“

RelatÃ³rios

â†“

GestÃ£o Fiscal

â†“

Rebalanceamento

Nenhum mÃ³dulo deverÃ¡ ignorar esse fluxo sem justificativa tÃ©cnica.

---

# Objetivo de Longo Prazo

O Lio Feliz deverÃ¡ evoluir atÃ© tornar-se a principal plataforma utilizada pelo investidor para administrar seu patrimÃ´nio.

O usuÃ¡rio deverÃ¡ conseguir importar seus dados, acompanhar sua evoluÃ§Ã£o patrimonial, organizar suas obrigaÃ§Ãµes fiscais, planejar aportes e administrar seus investimentos utilizando apenas o Lio Feliz.

---

# HistÃ³rico de AlteraÃ§Ãµes

## VersÃ£o 1.0

- DefiniÃ§Ã£o dos mÃ³dulos oficiais.
- DefiniÃ§Ã£o das responsabilidades de cada mÃ³dulo.
- DefiniÃ§Ã£o das funcionalidades futuras.
- DefiniÃ§Ã£o das funcionalidades fora do escopo.
- DefiniÃ§Ã£o da estrutura lÃ³gica do produto.

## Fonte: docs\04_DATA_MODEL.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 04_DATA_MODEL.md

**Projeto:** Lio Feliz

**Documento:** 04_DATA_MODEL.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

Este documento define o modelo conceitual do domÃ­nio do Lio Feliz.

Seu objetivo Ã© padronizar todas as entidades utilizadas pelo sistema antes da implementaÃ§Ã£o das regras de negÃ³cio.

Este documento nÃ£o descreve banco de dados, tabelas ou tecnologia.

Ele representa apenas os conceitos de negÃ³cio do sistema.

Toda implementaÃ§Ã£o deverÃ¡ respeitar este modelo.

---

# PrincÃ­pios

O modelo de dados deve ser:

- independente da tecnologia utilizada;
- independente do banco de dados;
- independente da interface;
- orientado ao domÃ­nio do negÃ³cio;
- preparado para crescimento futuro.

Nenhuma entidade deverÃ¡ existir apenas para atender limitaÃ§Ãµes tÃ©cnicas.

---

# Entidades Principais

O sistema Ã© composto pelas seguintes entidades principais:

- UsuÃ¡rio
- Carteira
- Ativo
- Classe de Ativo
- MovimentaÃ§Ã£o
- PosiÃ§Ã£o
- Evento Corporativo
- Provento
- Meta
- EstratÃ©gia
- AlocaÃ§Ã£o
- CotaÃ§Ã£o
- HistÃ³rico
- RelatÃ³rio
- Documento Fiscal
- ImportaÃ§Ã£o
- IntegraÃ§Ã£o
- NotificaÃ§Ã£o

Cada entidade possui responsabilidades prÃ³prias.

---

# UsuÃ¡rio

Representa o proprietÃ¡rio dos dados.

Responsabilidades:

- autenticaÃ§Ã£o;
- preferÃªncias;
- configuraÃ§Ãµes;
- moeda principal;
- idioma;
- fuso horÃ¡rio.

Um usuÃ¡rio pode possuir mÃºltiplas carteiras.

---

# Carteira

Representa um conjunto organizado de investimentos.

Uma carteira contÃ©m:

- ativos;
- movimentaÃ§Ãµes;
- posiÃ§Ãµes;
- metas;
- histÃ³rico;
- estratÃ©gias.

Toda informaÃ§Ã£o financeira pertence a uma carteira.

---

# Ativo

Representa qualquer instrumento financeiro controlado pelo sistema.

Exemplos:

- aÃ§Ãµes brasileiras;
- FIIs;
- ETFs;
- BDRs;
- renda fixa;
- criptomoedas;
- aÃ§Ãµes internacionais;
- REITs;
- ETFs internacionais;
- outros ativos suportados futuramente.

Todo ativo possui um identificador Ãºnico.

---

# Classe de Ativo

Agrupa ativos semelhantes.

Exemplos:

- AÃ§Ãµes
- FIIs
- ETFs
- BDRs
- Renda Fixa
- Criptomoedas
- REITs
- ETFs Internacionais
- AÃ§Ãµes Internacionais

Novas classes poderÃ£o ser adicionadas futuramente.

---

# MovimentaÃ§Ã£o

Representa qualquer operaÃ§Ã£o realizada pelo usuÃ¡rio.

Exemplos:

- compra;
- venda.

Eventos automÃ¡ticos nÃ£o sÃ£o movimentaÃ§Ãµes.

Eles pertencem Ã  entidade Evento Corporativo.

---

# Evento Corporativo

Representa acontecimentos promovidos pelo emissor do ativo.

Exemplos:

- dividendos;
- juros sobre capital prÃ³prio;
- bonificaÃ§Ãµes;
- desdobramentos;
- grupamentos;
- subscriÃ§Ãµes;
- amortizaÃ§Ãµes;
- incorporaÃ§Ãµes;
- fusÃµes;
- cisÃµes;
- conversÃµes.

Sempre que possÃ­vel esses eventos serÃ£o processados automaticamente.

---

# Provento

Representa um rendimento financeiro recebido pelo investidor.

Exemplos:

- dividendos;
- JCP;
- rendimentos de FIIs;
- amortizaÃ§Ãµes em dinheiro.

Um provento pode ser originado por um Evento Corporativo.

---

# PosiÃ§Ã£o

Representa a situaÃ§Ã£o atual do usuÃ¡rio em determinado ativo.

Exemplos:

- quantidade;
- preÃ§o mÃ©dio;
- custo total;
- valor de mercado;
- rentabilidade.

PosiÃ§Ãµes sÃ£o calculadas automaticamente.

Nunca serÃ£o cadastradas manualmente.

---

# CotaÃ§Ã£o

Representa o preÃ§o de mercado de um ativo em determinado momento.

Pode possuir mÃºltiplas origens.

Exemplos:

- Yahoo Finance;
- BRAPI;
- APIs futuras.

---

# HistÃ³rico

Representa a evoluÃ§Ã£o da carteira ao longo do tempo.

Pode armazenar:

- patrimÃ´nio;
- rentabilidade;
- dividendos;
- alocaÃ§Ã£o;
- evoluÃ§Ã£o das metas.

---

# EstratÃ©gia

Representa a filosofia de investimento adotada pelo usuÃ¡rio.

Exemplos:

- Buy and Hold;
- Dividendos;
- Crescimento;
- ETFs;
- InternacionalizaÃ§Ã£o;
- EstratÃ©gias personalizadas.

A estratÃ©gia influencia o rebalanceamento.

Nunca determina recomendaÃ§Ãµes de compra baseadas em opiniÃ£o de mercado.

---

# Meta

Representa objetivos definidos pelo usuÃ¡rio.

Exemplos:

- patrimÃ´nio;
- renda passiva;
- aposentadoria;
- percentual de determinada classe;
- independÃªncia financeira.

As metas sÃ£o monitoradas continuamente.

---

# AlocaÃ§Ã£o

Representa como o patrimÃ´nio deve ser distribuÃ­do.

Pode existir por:

- classe de ativo;
- ativo;
- paÃ­s;
- moeda;
- setor;
- estratÃ©gia.

SerÃ¡ utilizada pelo motor de rebalanceamento.

---

# Documento Fiscal

Representa informaÃ§Ãµes necessÃ¡rias para obrigaÃ§Ãµes tributÃ¡rias.

Exemplos:

- IRPF;
- DARF;
- informes;
- relatÃ³rios anuais.

O sistema deverÃ¡ gerar essas informaÃ§Ãµes automaticamente sempre que possÃ­vel.

---

# RelatÃ³rio

Representa qualquer consolidaÃ§Ã£o de informaÃ§Ãµes produzida pelo sistema.

Exemplos:

- posiÃ§Ã£o patrimonial;
- evoluÃ§Ã£o;
- dividendos;
- patrimÃ´nio;
- alocaÃ§Ã£o;
- imposto de renda.

---

# ImportaÃ§Ã£o

Representa processos de entrada de dados.

Exemplos:

- CSV;
- planilhas;
- arquivos da B3;
- portabilidade do Investidor10;
- outros formatos futuros.

A importaÃ§Ã£o nunca serÃ¡ obrigatÃ³ria.

---

# IntegraÃ§Ã£o

Representa comunicaÃ§Ã£o com serviÃ§os externos.

Exemplos:

- B3;
- Yahoo Finance;
- BRAPI;
- CoinGecko;
- futuras APIs.

O sistema deve continuar funcionando mesmo que uma integraÃ§Ã£o esteja indisponÃ­vel.

---

# NotificaÃ§Ã£o

Representa avisos importantes ao usuÃ¡rio.

Exemplos:

- eventos corporativos;
- metas atingidas;
- necessidade de rebalanceamento;
- pendÃªncias fiscais;
- erros de sincronizaÃ§Ã£o.

---

# RelaÃ§Ãµes Conceituais

As principais relaÃ§Ãµes entre entidades sÃ£o:

UsuÃ¡rio

â†“

Carteira

â†“

MovimentaÃ§Ãµes

â†“

PosiÃ§Ãµes

â†“

HistÃ³rico

â†“

RelatÃ³rios

Os ativos se relacionam com:

- cotaÃ§Ãµes;
- eventos corporativos;
- proventos.

As metas utilizam:

- posiÃ§Ãµes;
- patrimÃ´nio;
- histÃ³rico;
- alocaÃ§Ã£o.

O rebalanceamento utiliza:

- estratÃ©gia;
- alocaÃ§Ã£o;
- posiÃ§Ãµes;
- patrimÃ´nio.

---

# Regras Gerais

Nenhuma entidade poderÃ¡ acumular responsabilidades de outra.

Sempre que possÃ­vel:

- dados serÃ£o calculados;
- informaÃ§Ãµes redundantes serÃ£o evitadas;
- estados derivados nÃ£o serÃ£o armazenados permanentemente.

---

# PreparaÃ§Ã£o para Crescimento

O modelo foi concebido para permitir:

- mÃºltiplas moedas;
- mÃºltiplos paÃ­ses;
- mÃºltiplas bolsas;
- novos tipos de ativos;
- novas integraÃ§Ãµes;
- novos mÃ³dulos fiscais;
- novos relatÃ³rios.

Nenhuma dessas expansÃµes deverÃ¡ exigir reconstruÃ§Ã£o do modelo conceitual.

---

# HistÃ³rico

## VersÃ£o 1.0

- CriaÃ§Ã£o do modelo conceitual do domÃ­nio do Lio Feliz.
- DefiniÃ§Ã£o das entidades principais.
- DefiniÃ§Ã£o das responsabilidades de cada entidade.

## Fonte: docs\05_SYSTEM_ARCHITECTURE.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 05_SYSTEM_ARCHITECTURE.md

**Projeto:** Lio Feliz

**Documento:** 05_SYSTEM_ARCHITECTURE.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

Este documento define a arquitetura oficial do Lio Feliz.

Seu objetivo Ã© estabelecer como o sistema serÃ¡ organizado internamente, quais sÃ£o as responsabilidades de cada camada e como os mÃ³dulos devem interagir.

Este documento nÃ£o define regras de negÃ³cio.

Ele define apenas a arquitetura do software.

Toda implementaÃ§Ã£o deverÃ¡ respeitar esta arquitetura.

---

# PrincÃ­pios Arquiteturais

A arquitetura do sistema deve seguir os seguintes princÃ­pios:

- SeparaÃ§Ã£o de responsabilidades.
- Baixo acoplamento.
- Alta coesÃ£o.
- CÃ³digo reutilizÃ¡vel.
- Facilidade de manutenÃ§Ã£o.
- Escalabilidade.
- IndependÃªncia entre mÃ³dulos.
- Testabilidade.

---

# Camadas do Sistema

O sistema serÃ¡ dividido nas seguintes camadas:

## Interface (UI)

ResponsÃ¡vel exclusivamente pela interaÃ§Ã£o com o usuÃ¡rio.

Exemplos:

- pÃ¡ginas;
- componentes;
- formulÃ¡rios;
- dashboards;
- grÃ¡ficos.

A interface nunca deverÃ¡ conter regras de negÃ³cio.

---

## DomÃ­nio (Business)

ResponsÃ¡vel pelas regras financeiras do sistema.

Exemplos:

- cÃ¡lculo de patrimÃ´nio;
- cÃ¡lculo de preÃ§o mÃ©dio;
- cÃ¡lculo de dividendos;
- cÃ¡lculo de imposto;
- rebalanceamento;
- metas.

Toda regra financeira pertence a esta camada.

---

## ServiÃ§os (Services)

ResponsÃ¡vel pela comunicaÃ§Ã£o com recursos externos.

Exemplos:

- Supabase;
- Yahoo Finance;
- BRAPI;
- CoinGecko;
- APIs futuras.

Nenhuma regra financeira deverÃ¡ existir nesta camada.

---

## PersistÃªncia

ResponsÃ¡vel pelo armazenamento das informaÃ§Ãµes.

Exemplos:

- banco de dados;
- cache;
- armazenamento local.

A persistÃªncia nunca deverÃ¡ conter regras financeiras.

---

## IntegraÃ§Ãµes

ResponsÃ¡vel pela comunicaÃ§Ã£o com sistemas externos.

Exemplos:

- B3;
- ImportaÃ§Ã£o CSV;
- Portabilidade Investidor10;
- Corretoras.

Toda integraÃ§Ã£o deverÃ¡ ser opcional.

O sistema deverÃ¡ continuar funcionando mesmo sem qualquer integraÃ§Ã£o.

---

# Estrutura Geral

A organizaÃ§Ã£o do projeto deverÃ¡ seguir uma estrutura semelhante Ã  seguinte:

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

A estrutura poderÃ¡ crescer futuramente sem alterar sua organizaÃ§Ã£o principal.

---

# Responsabilidade dos Componentes

Os componentes React deverÃ£o:

- exibir informaÃ§Ãµes;
- receber aÃ§Ãµes do usuÃ¡rio;
- chamar funÃ§Ãµes do domÃ­nio.

Os componentes nunca deverÃ£o:

- calcular patrimÃ´nio;
- calcular imposto;
- calcular dividendos;
- acessar diretamente APIs externas;
- implementar regras financeiras.

---

# Responsabilidade da Camada de DomÃ­nio

A camada de domÃ­nio serÃ¡ responsÃ¡vel por:

- consolidar carteira;
- calcular posiÃ§Ãµes;
- calcular patrimÃ´nio;
- calcular rentabilidade;
- calcular dividendos;
- calcular IR;
- calcular rebalanceamento;
- gerar relatÃ³rios.

Ela deverÃ¡ ser totalmente independente da interface.

---

# Responsabilidade dos ServiÃ§os

Os serviÃ§os deverÃ£o:

- buscar dados;
- enviar dados;
- tratar erros de comunicaÃ§Ã£o;
- converter formatos externos.

Nunca deverÃ£o decidir regras financeiras.

---

# Responsabilidade da PersistÃªncia

O banco de dados deverÃ¡ armazenar apenas informaÃ§Ãµes permanentes.

InformaÃ§Ãµes derivadas deverÃ£o ser calculadas sempre que possÃ­vel.

Exemplos:

- patrimÃ´nio atual;
- preÃ§o mÃ©dio;
- rentabilidade;
- percentual da carteira.

Esses dados nÃ£o deverÃ£o ser armazenados permanentemente quando puderem ser recalculados.

---

# OrganizaÃ§Ã£o dos MÃ³dulos

Cada mÃ³dulo deverÃ¡ possuir responsabilidade Ãºnica.

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

Novos arquivos poderÃ£o ser adicionados conforme o crescimento do projeto.

---

# ComunicaÃ§Ã£o Entre MÃ³dulos

A comunicaÃ§Ã£o deverÃ¡ seguir sempre esta direÃ§Ã£o:

Interface

â†“

DomÃ­nio

â†“

ServiÃ§os

â†“

PersistÃªncia

IntegraÃ§Ãµes externas deverÃ£o ser acessadas apenas atravÃ©s da camada de serviÃ§os.

---

# CÃ³digo Compartilhado

Sempre que uma lÃ³gica for utilizada por mais de um mÃ³dulo:

Ela deverÃ¡ ser extraÃ­da para uma Ãºnica implementaÃ§Ã£o.

A duplicaÃ§Ã£o de regras financeiras deve ser evitada.

---

# Barrel Files

Sempre que um mÃ³dulo possuir diversos arquivos internos, deverÃ¡ existir um arquivo:

index.ts

responsÃ¡vel por centralizar as exportaÃ§Ãµes.

Isso reduz dependÃªncias diretas entre mÃ³dulos.

---

# Regras para RefatoraÃ§Ã£o

Toda refatoraÃ§Ã£o deverÃ¡:

- preservar comportamento;
- preservar regras de negÃ³cio;
- preservar compatibilidade sempre que possÃ­vel;
- reduzir acoplamento;
- melhorar organizaÃ§Ã£o.

MudanÃ§as estruturais nunca deverÃ£o alterar resultados financeiros.

---

# Escalabilidade

A arquitetura deve permitir futuramente:

- aplicativo mobile;
- mÃºltiplos usuÃ¡rios;
- mÃºltiplas carteiras;
- mÃºltiplas moedas;
- mÃºltiplos paÃ­ses;
- novos tipos de ativos;
- novas integraÃ§Ãµes;
- novos mÃ³dulos fiscais.

Nenhuma dessas expansÃµes deverÃ¡ exigir reconstruÃ§Ã£o da arquitetura.

---

# Testabilidade

As regras financeiras deverÃ£o ser testÃ¡veis independentemente da interface.

Sempre que possÃ­vel:

- funÃ§Ãµes puras;
- baixo acoplamento;
- dependÃªncias explÃ­citas.

---

# ObservaÃ§Ãµes

A arquitetura poderÃ¡ evoluir ao longo do tempo.

Entretanto, seus princÃ­pios fundamentais deverÃ£o permanecer os mesmos.

Toda decisÃ£o arquitetural deverÃ¡ priorizar simplicidade, clareza e manutenÃ§Ã£o de longo prazo.

---

# HistÃ³rico

## VersÃ£o 1.0

- DefiniÃ§Ã£o da arquitetura oficial do Lio Feliz.
- DefiniÃ§Ã£o das camadas do sistema.
- DefiniÃ§Ã£o das responsabilidades de cada mÃ³dulo.
- PadronizaÃ§Ã£o da organizaÃ§Ã£o do cÃ³digo.

## Fonte: docs\06_BUSINESS_RULES\00_GLOBAL_RULES.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 06_BUSINESS_RULES/00_GLOBAL_RULES.md

**Projeto:** Lio Feliz

**Documento:** 06_BUSINESS_RULES/00_GLOBAL_RULES.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

Este documento define as regras globais que se aplicam a todo o sistema.

Estas regras possuem prioridade sobre qualquer documento individual da pasta `06_BUSINESS_RULES`.

Nenhum mÃ³dulo poderÃ¡ contrariar estas definiÃ§Ãµes.

---

# Escopo

Este documento define:

- princÃ­pios gerais;
- prioridades entre fontes de dados;
- consistÃªncia das informaÃ§Ãµes;
- tratamento de conflitos;
- regras de sincronizaÃ§Ã£o;
- rastreabilidade;
- automaÃ§Ã£o;
- integridade dos dados.

NÃ£o define regras especÃ­ficas de um mÃ³dulo.

---

# Filosofia Geral

O Lio Feliz possui como princÃ­pio fundamental:

> Toda informaÃ§Ã£o deve possuir uma origem conhecida, ser rastreÃ¡vel e produzir resultados consistentes.

Sempre que houver dÃºvida entre facilidade de implementaÃ§Ã£o e consistÃªncia dos dados, a consistÃªncia deverÃ¡ prevalecer.

---

# Fonte de Verdade

Cada informaÃ§Ã£o do sistema deverÃ¡ possuir apenas uma fonte oficial.

Exemplos:

MovimentaÃ§Ãµes:

â†’ lanÃ§amentos do usuÃ¡rio ou sincronizaÃ§Ã£o aprovada.

Dividendos:

â†’ eventos corporativos.

PosiÃ§Ãµes:

â†’ calculadas a partir das movimentaÃ§Ãµes.

PatrimÃ´nio:

â†’ calculado a partir das posiÃ§Ãµes e das cotaÃ§Ãµes.

PreÃ§o mÃ©dio:

â†’ calculado exclusivamente pelas movimentaÃ§Ãµes vÃ¡lidas.

Nenhum dado derivado poderÃ¡ ser editado manualmente.

---

# Hierarquia das InformaÃ§Ãµes

Quando existirem mÃºltiplas fontes para o mesmo dado, deverÃ¡ existir uma prioridade.

Prioridade geral:

1. InformaÃ§Ã£o confirmada pelo usuÃ¡rio.
2. IntegraÃ§Ãµes oficiais.
3. APIs financeiras.
4. ImportaÃ§Ãµes.
5. CÃ¡lculos internos.
6. Dados estimados.

Caso duas fontes possuam a mesma prioridade e apresentem divergÃªncias, o sistema deverÃ¡ informar o usuÃ¡rio antes de alterar dados consolidados.

---

# Fontes de Mercado

O sistema poderÃ¡ utilizar mÃºltiplas fontes de dados.

Exemplos:

- Yahoo Finance
- BRAPI
- CoinGecko
- AwesomeAPI
- futuras integraÃ§Ãµes

A escolha da fonte deverÃ¡ ser transparente.

Sempre que possÃ­vel, deverÃ¡ ser registrada a origem da cotaÃ§Ã£o utilizada.

---

# AutomaÃ§Ã£o

Sempre que um processo puder ser realizado automaticamente com seguranÃ§a, ele deverÃ¡ ser automatizado.

Exemplos:

- dividendos;
- JCP;
- bonificaÃ§Ãµes;
- desdobramentos;
- grupamentos;
- atualizaÃ§Ã£o de preÃ§os;
- sincronizaÃ§Ãµes.

Caso exista risco significativo de inconsistÃªncia, deverÃ¡ ser solicitada confirmaÃ§Ã£o ao usuÃ¡rio.

---

# AlteraÃ§Ãµes Manuais

O usuÃ¡rio poderÃ¡ alterar apenas informaÃ§Ãµes que realmente controla.

Exemplos:

Permitido:

- compras;
- vendas;
- metas;
- estratÃ©gia;
- preferÃªncias.

NÃ£o permitido:

- patrimÃ´nio;
- posiÃ§Ã£o;
- preÃ§o mÃ©dio;
- dividendos calculados;
- rentabilidade calculada.

Esses dados sÃ£o derivados e deverÃ£o ser recalculados automaticamente.

---

# Dados Derivados

InformaÃ§Ãµes derivadas nunca deverÃ£o ser tratadas como fonte primÃ¡ria.

Exemplos:

- patrimÃ´nio;
- percentual da carteira;
- preÃ§o mÃ©dio;
- lucro;
- prejuÃ­zo;
- rendimento.

Sempre que possÃ­vel deverÃ£o ser recalculadas.

---

# Rastreabilidade

Toda informaÃ§Ã£o importante deverÃ¡ possuir histÃ³rico de origem.

Exemplos:

Uma posiÃ§Ã£o deverÃ¡ permitir identificar:

- quais compras a originaram;
- quais vendas a alteraram;
- quais eventos corporativos a modificaram.

O sistema deverÃ¡ ser auditÃ¡vel.

---

# ConsistÃªncia

O sistema deverÃ¡ impedir estados inconsistentes.

Exemplos:

NÃ£o permitir:

- posiÃ§Ã£o negativa;
- patrimÃ´nio negativo;
- ativo inexistente;
- dividendos duplicados;
- movimentaÃ§Ãµes duplicadas.

Sempre que possÃ­vel inconsistÃªncias deverÃ£o ser detectadas automaticamente.

---

# Tratamento de Duplicidade

O sistema deverÃ¡ identificar automaticamente possÃ­veis registros duplicados.

Exemplos:

- importaÃ§Ã£o repetida;
- sincronizaÃ§Ã£o repetida;
- lanÃ§amento manual jÃ¡ existente.

Nenhuma duplicidade deverÃ¡ ser criada sem confirmaÃ§Ã£o do usuÃ¡rio.

---

# SincronizaÃ§Ãµes

Toda sincronizaÃ§Ã£o deverÃ¡ ser:

- opcional;
- reversÃ­vel;
- rastreÃ¡vel.

A falha de uma sincronizaÃ§Ã£o nunca poderÃ¡ impedir o funcionamento do sistema.

---

# IntegraÃ§Ãµes

Nenhuma integraÃ§Ã£o externa poderÃ¡ tornar-se obrigatÃ³ria.

Mesmo sem:

- B3;
- Yahoo;
- BRAPI;
- CoinGecko;
- CSV;

o usuÃ¡rio deverÃ¡ conseguir utilizar normalmente o sistema.

---

# Eventos Corporativos

Sempre que possÃ­vel deverÃ£o ser processados automaticamente.

Caso exista divergÃªncia entre fontes, o sistema deverÃ¡:

- registrar o conflito;
- manter histÃ³rico;
- solicitar confirmaÃ§Ã£o quando necessÃ¡rio.

---

# Mercado Internacional

As regras deste documento aplicam-se igualmente aos ativos internacionais.

O sistema nunca deverÃ¡ tratar ativos internacionais como funcionalidades secundÃ¡rias.

Toda implementaÃ§Ã£o deverÃ¡ considerar:

- mÃºltiplas moedas;
- mÃºltiplos paÃ­ses;
- diferentes calendÃ¡rios;
- diferentes regras fiscais.

---

# Performance

O sistema deverÃ¡ priorizar:

- consistÃªncia;
- clareza;
- previsibilidade.

OtimizaÃ§Ãµes nunca poderÃ£o alterar resultados financeiros.

---

# TransparÃªncia

Sempre que o sistema realizar um cÃ¡lculo importante, deverÃ¡ ser possÃ­vel responder:

- quais dados foram utilizados;
- qual regra foi aplicada;
- qual foi o resultado intermediÃ¡rio;
- qual foi o resultado final.

O usuÃ¡rio deverÃ¡ conseguir compreender como um valor foi obtido.

---

# PreparaÃ§Ã£o para Crescimento

As regras definidas neste documento deverÃ£o continuar vÃ¡lidas mesmo com futuras implementaÃ§Ãµes como:

- aplicativo mÃ³vel;
- mÃºltiplas carteiras;
- mÃºltiplos usuÃ¡rios;
- novas integraÃ§Ãµes;
- novos mercados;
- novos tipos de ativos.

---

# Regras ObrigatÃ³rias

Ã‰ obrigatÃ³rio:

- manter uma Ãºnica fonte de verdade para cada informaÃ§Ã£o;
- evitar duplicaÃ§Ã£o de lÃ³gica;
- manter rastreabilidade;
- recalcular dados derivados;
- preservar consistÃªncia;
- manter compatibilidade entre mÃ³dulos.

---

# Regras Proibidas

Ã‰ proibido:

- editar manualmente dados derivados;
- duplicar regras financeiras;
- depender de uma integraÃ§Ã£o externa para funcionamento;
- armazenar informaÃ§Ãµes inconsistentes;
- ocultar conflitos de dados.

---

# HistÃ³rico

## VersÃ£o 1.0

- CriaÃ§Ã£o das regras globais do sistema.
- DefiniÃ§Ã£o da hierarquia das informaÃ§Ãµes.
- DefiniÃ§Ã£o dos princÃ­pios de consistÃªncia.
- DefiniÃ§Ã£o das regras de automaÃ§Ã£o.
- DefiniÃ§Ã£o da polÃ­tica de sincronizaÃ§Ã£o.

## Fonte: docs\06_BUSINESS_RULES\00_INDEX.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 06_BUSINESS_RULES/00_INDEX.md

**Projeto:** Lio Feliz

**Documento:** 06_BUSINESS_RULES/00_INDEX.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 08/07/2026

---

# Objetivo

Este documento apresenta a estrutura oficial das Regras de NegÃ³cio do Lio Feliz.

As Regras de NegÃ³cio representam o comportamento funcional do sistema.

Elas definem como cada mÃ³dulo deve funcionar, como os dados sÃ£o processados, quais decisÃµes devem ser tomadas e como os diferentes mÃ³dulos interagem entre si.

Toda implementaÃ§Ã£o deverÃ¡ seguir obrigatoriamente estas especificaÃ§Ãµes.

---

# Filosofia

O objetivo das Regras de NegÃ³cio nÃ£o Ã© explicar como escrever o cÃ³digo.

Seu objetivo Ã© explicar exatamente como o sistema deve se comportar.

A implementaÃ§Ã£o pode variar.

O comportamento nunca.

---

# OrganizaÃ§Ã£o

As Regras de NegÃ³cio foram divididas em mÃ³dulos independentes.

Cada mÃ³dulo possui responsabilidade Ãºnica.

Essa divisÃ£o reduz acoplamento e facilita manutenÃ§Ã£o, testes e evoluÃ§Ã£o do sistema.

---

# Estrutura Oficial

A pasta `06_BUSINESS_RULES/` deverÃ¡ possuir a seguinte organizaÃ§Ã£o:

```text
06_BUSINESS_RULES/

00_INDEX.md

00_GLOBAL_RULES.md

01_PORTFOLIO.md

02_TRANSACTIONS.md

03_MARKET_DATA.md

04_CORPORATE_ACTIONS.md

05_PROVENTOS.md

06_REBALANCING.md

07_GOALS.md

08_TAX.md

09_FIXED_INCOME.md

10_INTERNATIONAL.md

11_IMPORT_EXPORT.md

12_INTEGRATIONS.md

13_REPORTS.md
```

Esta estrutura deverÃ¡ ser mantida como padrÃ£o oficial do projeto.

---

# DependÃªncias Entre MÃ³dulos

A ordem dos documentos nÃ£o Ã© aleatÃ³ria.

Ela representa a sequÃªncia lÃ³gica de funcionamento do sistema.

Fluxo principal:

```
ImportaÃ§Ã£o

â†“

MovimentaÃ§Ãµes

â†“

Carteira

â†“

CotaÃ§Ãµes

â†“

Eventos Corporativos

â†“

Proventos

â†“

PatrimÃ´nio

â†“

Rebalanceamento

â†“

Metas

â†“

RelatÃ³rios

â†“

Imposto de Renda
```

Cada mÃ³dulo depende apenas dos mÃ³dulos anteriores.

Sempre que possÃ­vel, dependÃªncias circulares devem ser evitadas.

---

# PadrÃ£o ObrigatÃ³rio dos Documentos

Todos os documentos desta pasta deverÃ£o seguir obrigatoriamente a mesma estrutura.

---

## 1. Objetivo

Define claramente a finalidade do mÃ³dulo.

---

## 2. Escopo

Define quais funcionalidades pertencem ao mÃ³dulo.

TambÃ©m define explicitamente o que NÃƒO pertence ao mÃ³dulo.

---

## 3. Conceitos

Define todos os conceitos importantes utilizados pelo mÃ³dulo.

Nenhum termo deverÃ¡ ficar ambÃ­guo.

---

## 4. Entradas

Quais informaÃ§Ãµes o mÃ³dulo recebe.

Exemplos:

- movimentaÃ§Ãµes;
- cotaÃ§Ãµes;
- eventos corporativos;
- configuraÃ§Ãµes;
- metas.

---

## 5. Processamento

Como o sistema transforma as entradas em resultados.

Esta Ã© a parte mais importante do documento.

Toda regra deverÃ¡ ser descrita em detalhes.

---

## 6. SaÃ­das

Quais informaÃ§Ãµes sÃ£o produzidas.

Exemplos:

- patrimÃ´nio;
- dividendos;
- posiÃ§Ã£o;
- relatÃ³rios;
- indicadores.

---

## 7. IntegraÃ§Ã£o com Outros MÃ³dulos

Define quais mÃ³dulos utilizam essas informaÃ§Ãµes.

TambÃ©m define quais mÃ³dulos fornecem dados para este.

---

## 8. Casos Especiais

Toda exceÃ§Ã£o deverÃ¡ ser documentada.

Exemplos:

- ativo sem cotaÃ§Ã£o;
- provento cancelado;
- grupamento;
- fusÃ£o;
- mercado fechado.

---

## 9. Regras ObrigatÃ³rias

Lista tudo aquilo que obrigatoriamente deverÃ¡ ser respeitado.

---

## 10. Regras Proibidas

Lista comportamentos que nunca poderÃ£o ocorrer.

---

## 11. PreparaÃ§Ã£o para Crescimento

Explica como o mÃ³dulo deverÃ¡ permitir futuras expansÃµes sem necessidade de reescrita completa.

---

## 12. HistÃ³rico

Registro das alteraÃ§Ãµes relevantes do documento.

---

# PrincÃ­pios Gerais

Todas as Regras de NegÃ³cio deverÃ£o seguir os seguintes princÃ­pios:

- Automatizar sempre que possÃ­vel.
- Evitar qualquer duplicaÃ§Ã£o de lÃ³gica.
- Separar interface das regras financeiras.
- Priorizar transparÃªncia dos cÃ¡lculos.
- Evitar estados inconsistentes.
- Garantir rastreabilidade das informaÃ§Ãµes.
- Manter compatibilidade com ativos brasileiros e internacionais.
- Preparar o sistema para mÃºltiplas moedas.
- Permitir integraÃ§Ã£o com diferentes fontes de dados.

---

# Hierarquia de DecisÃ£o

Em caso de conflito entre documentos, deverÃ¡ ser seguida a seguinte prioridade:

1. 00_START_HERE.md
2. 01_VISION.md
3. 02_PROJECT_RULES.md
4. 03_PRODUCT_REQUIREMENTS.md
5. 04_DATA_MODEL.md
6. 05_SYSTEM_ARCHITECTURE.md
7. Documentos desta pasta (06_BUSINESS_RULES)

Nenhum documento desta pasta poderÃ¡ contrariar documentos de nÃ­vel superior.

---

# Objetivo Final

Ao tÃ©rmino da documentaÃ§Ã£o desta pasta, deverÃ¡ ser possÃ­vel implementar todos os principais mÃ³dulos do Lio Feliz utilizando exclusivamente estas especificaÃ§Ãµes, sem necessidade de interpretar comportamentos nÃ£o documentados.

---

# HistÃ³rico

## VersÃ£o 1.0

- CriaÃ§Ã£o da estrutura oficial das Regras de NegÃ³cio.
- DefiniÃ§Ã£o do padrÃ£o obrigatÃ³rio para todos os documentos funcionais.
- DefiniÃ§Ã£o da ordem lÃ³gica entre os mÃ³dulos.

## Fonte: docs\06_BUSINESS_RULES\01_PORTFOLIO.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 06_BUSINESS_RULES/01_PORTFOLIO.md

**Projeto:** Lio Feliz

**Documento:** 01_PORTFOLIO.md

**VersÃ£o:** 2.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

Este documento define as regras oficiais de funcionamento da Carteira do Lio Feliz.

A Carteira representa o estado consolidado do patrimÃ´nio do usuÃ¡rio e constitui o principal mÃ³dulo funcional do sistema.

Ela nunca realiza cÃ¡lculos diretamente.

Todos os cÃ¡lculos sÃ£o delegados Ã s Engines descritas na documentaÃ§Ã£o tÃ©cnica.

---

# Responsabilidade

A Carteira possui apenas quatro responsabilidades:

- apresentar informaÃ§Ãµes;
- disponibilizar consultas aos demais mÃ³dulos;
- organizar os dados consolidados;
- refletir o estado atual do patrimÃ´nio.

Ela nÃ£o executa regras financeiras.

---

# DependÃªncias

A Carteira depende obrigatoriamente de:

- Portfolio Consolidation Engine
- Corporate Action Engine
- ServiÃ§o de CotaÃ§Ãµes
- ConfiguraÃ§Ãµes do UsuÃ¡rio

---

# Fonte de Verdade

A Carteira nunca Ã© considerada fonte primÃ¡ria.

Sua Ãºnica fonte oficial Ã© o resultado produzido pela:

Portfolio Consolidation Engine.

---

# AtualizaÃ§Ã£o

Sempre que ocorrer qualquer alteraÃ§Ã£o em:

- movimentaÃ§Ãµes;
- eventos corporativos;
- sincronizaÃ§Ãµes;
- importaÃ§Ãµes;
- configuraÃ§Ãµes que afetem cÃ¡lculos;

a Carteira deverÃ¡ ser atualizada automaticamente.

---

# InformaÃ§Ãµes Disponibilizadas

A Carteira deverÃ¡ fornecer:

- patrimÃ´nio consolidado;
- custo investido;
- quantidade por ativo;
- preÃ§o mÃ©dio;
- valor de mercado;
- lucro nÃ£o realizado;
- rentabilidade;
- alocaÃ§Ã£o por ativo;
- alocaÃ§Ã£o por classe;
- alocaÃ§Ã£o por setor;
- alocaÃ§Ã£o por paÃ­s;
- alocaÃ§Ã£o por moeda.

---

# OrganizaÃ§Ã£o

Cada posiÃ§Ã£o deverÃ¡ possuir obrigatoriamente:

- ativo;
- ticker;
- nome;
- classe;
- paÃ­s;
- moeda;
- quantidade;
- preÃ§o mÃ©dio;
- custo investido;
- cotaÃ§Ã£o atual;
- valor de mercado;
- lucro;
- percentual da carteira;
- data da Ãºltima atualizaÃ§Ã£o.

---

# HistÃ³rico

A Carteira deverÃ¡ manter histÃ³rico suficiente para permitir:

- evoluÃ§Ã£o patrimonial;
- evoluÃ§Ã£o da carteira;
- evoluÃ§Ã£o das posiÃ§Ãµes;
- evoluÃ§Ã£o da alocaÃ§Ã£o.

O histÃ³rico nunca poderÃ¡ depender de registros manuais.

---

# ConsistÃªncia

Nunca serÃ¡ permitido:

- patrimÃ´nio negativo;
- posiÃ§Ã£o negativa;
- preÃ§o mÃ©dio negativo;
- custo negativo;
- quantidade negativa.

Caso alguma inconsistÃªncia seja detectada, a atualizaÃ§Ã£o deverÃ¡ ser interrompida e registrada.

---

# Mercado Internacional

O funcionamento serÃ¡ exatamente igual para:

- Brasil;
- Estados Unidos;
- futuros mercados suportados.

A Ãºnica diferenÃ§a serÃ¡:

- moeda;
- calendÃ¡rio;
- regras tributÃ¡rias.

---

# IntegraÃ§Ã£o

Este mÃ³dulo fornece informaÃ§Ãµes para:

- Dashboard
- Dividendos
- Imposto de Renda
- Rebalanceamento
- Metas
- RelatÃ³rios
- HistÃ³rico

Nenhum desses mÃ³dulos poderÃ¡ recalcular posiÃ§Ãµes.

---

# Consultas

Toda consulta deverÃ¡ utilizar exclusivamente os dados consolidados produzidos pela Portfolio Consolidation Engine.

---

# Performance

A Carteira nunca deverÃ¡ executar cÃ¡lculos pesados.

Seu objetivo Ã© apenas consumir resultados jÃ¡ consolidados.

---

# ReferÃªncias

Este documento depende diretamente de:

07_TECHNICAL_ANNEXES/

- 01_PRICE_AVERAGE_ALGORITHMS.md
- 02_CORPORATE_ACTION_ENGINE.md
- 03_PORTFOLIO_CONSOLIDATION_ENGINE.md

---

# DecisÃµes de Projeto

## Por que a Carteira nÃ£o calcula nada?

Porque toda lÃ³gica financeira deve permanecer centralizada nas Engines.

Isso elimina divergÃªncias entre mÃ³dulos.

---

## Por que existe apenas uma fonte de verdade?

Porque patrimÃ´nio, preÃ§o mÃ©dio e posiÃ§Ãµes devem ser exatamente iguais em qualquer tela do sistema.

---

## Por que separar visualizaÃ§Ã£o de cÃ¡lculo?

Porque facilita manutenÃ§Ã£o, testes e evoluÃ§Ã£o do projeto.

TambÃ©m reduz drasticamente a possibilidade de bugs.

---

# PreparaÃ§Ã£o para Crescimento

A arquitetura suporta futuramente:

- mÃºltiplas carteiras;
- carteiras familiares;
- mÃºltiplos usuÃ¡rios;
- novos mercados;
- novos tipos de ativos;
- novos motores de cÃ¡lculo.

---

# HistÃ³rico

## VersÃ£o 2.0

ReestruturaÃ§Ã£o completa.

A Carteira deixa de executar regras financeiras e passa a consumir exclusivamente os resultados produzidos pelas Engines oficiais do sistema.

## Fonte: docs\06_BUSINESS_RULES\02_TRANSACTIONS.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 06_BUSINESS_RULES/02_TRANSACTIONS.md

**Projeto:** Lio Feliz

**Documento:** 02_TRANSACTIONS.md

**VersÃ£o:** 0.92

**Status:** ðŸŸ¡ Em elaboraÃ§Ã£o (Working Draft)

**Categoria:** Business Rules

**ResponsÃ¡veis:** Rafael Santos + IA

**Ãšltima atualizaÃ§Ã£o:** 09/07/2026

---

> **ObservaÃ§Ã£o:** Este documento representa uma versÃ£o de trabalho (Working Draft).
>
> Seu conteÃºdo encontra-se em evoluÃ§Ã£o contÃ­nua durante a construÃ§Ã£o da arquitetura do domÃ­nio patrimonial do Lio Feliz.
>
> Enquanto permanecer com status "Em elaboraÃ§Ã£o", conceitos, regras e estruturas poderÃ£o ser refinados sem necessidade de compatibilidade retroativa.
>
> ApÃ³s a aprovaÃ§Ã£o, o documento serÃ¡ promovido para versÃ£o oficial.

---

# 1. Objetivo

Este documento define o conceito de **OperaÃ§Ã£o Patrimonial**, sua finalidade dentro do domÃ­nio, sua responsabilidade e sua relaÃ§Ã£o com Eventos, Portfolio Ledger, InterpretaÃ§Ã£o e Portfolio Engine.

Ele formaliza o comportamento esperado entre os componentes que constituem a base do domÃ­nio operacional do sistema.

**Pergunta Fundamental**

> Como o domÃ­nio representa operaÃ§Ãµes patrimoniais de forma consistente, preservando fatos econÃ´micos e permitindo sua posterior interpretaÃ§Ã£o?

Este documento servirÃ¡ como uma das principais bases do domÃ­nio do sistema.

---

# 2. Filosofia do DomÃ­nio

> O Lio Feliz nÃ£o cria a histÃ³ria patrimonial do usuÃ¡rio.
>
> Ele registra, preserva e reconstrÃ³i essa histÃ³ria.

O sistema registra acontecimentos ocorridos na realidade.

O sistema nunca cria fatos patrimoniais.

Uma OperaÃ§Ã£o:

- representa um fato econÃ´mico;
- nunca calcula patrimÃ´nio;
- nunca atualiza posiÃ§Ãµes;
- nunca interpreta efeitos patrimoniais;
- nunca altera eventos existentes;
- apenas registra um acontecimento econÃ´mico vÃ¡lido para o domÃ­nio.

---

# 3. Conceitos Fundamentais

## OperaÃ§Ã£o

SolicitaÃ§Ã£o para registrar uma alteraÃ§Ã£o patrimonial ocorrida na realidade, independentemente de sua origem.

Origens possÃ­veis:

- Manual
- ImportaÃ§Ã£o
- IntegraÃ§Ã£o
- API
- MigraÃ§Ã£o
- Backup

## Evento

Registro imutÃ¡vel de um acontecimento patrimonial.

## Portfolio Ledger

Fonte CanÃ´nica da HistÃ³ria Patrimonial.

## Portfolio Engine

ResponsÃ¡vel pela reconstruÃ§Ã£o dos estados patrimoniais a partir do Ledger.

## InterpretaÃ§Ã£o

Processo que transforma Eventos registrados no Ledger em efeitos patrimoniais compreensÃ­veis para o Portfolio Engine.

---

# 4. Fluxo Conceitual

```
OperaÃ§Ã£o

â†“

ValidaÃ§Ã£o

â†“

Eventos

â†“

Portfolio Ledger

â†“

InterpretaÃ§Ã£o

â†“

Portfolio Engine

â†“

ReconstruÃ§Ã£o Patrimonial
```

**OperaÃ§Ã£o:** Uma solicitaÃ§Ã£o chega ao sistema por qualquer origem (manual, importaÃ§Ã£o, integraÃ§Ã£o, API, migraÃ§Ã£o, backup). Ela representa a intenÃ§Ã£o de registrar um fato patrimonial. A OperaÃ§Ã£o nunca calcula patrimÃ´nio nem interpreta efeitos â€” ela apenas documenta o fato.

**ValidaÃ§Ã£o:** A operaÃ§Ã£o Ã© validada quanto Ã  consistÃªncia dos dados, integridade referencial e conformidade com as regras de negÃ³cio. A validaÃ§Ã£o garante que o fato econÃ´mico Ã© vÃ¡lido antes de gerar Eventos.

**Eventos:** Uma operaÃ§Ã£o vÃ¡lida gera um ou mais Eventos imutÃ¡veis que representam os acontecimentos patrimoniais ocorridos. Cada Evento preserva exclusivamente o fato econÃ´mico, sem qualquer interpretaÃ§Ã£o.

**Portfolio Ledger:** Os Eventos sÃ£o armazenados no Ledger, que funciona como a Fonte CanÃ´nica da histÃ³ria patrimonial. O Ledger nunca armazena estados ou interpretaÃ§Ãµes.

**InterpretaÃ§Ã£o:** Os Eventos sÃ£o interpretados para produzir efeitos patrimoniais compreensÃ­veis. A InterpretaÃ§Ã£o Ã© responsabilidade de um documento especÃ­fico (`03_TRANSACTION_INTERPRETATION.md`), nÃ£o deste documento.

**Portfolio Engine:** A Engine consome os efeitos interpretados e reconstrÃ³i os estados patrimoniais para qualquer ponto no tempo.

**ReconstruÃ§Ã£o Patrimonial:** O patrimÃ´nio, posiÃ§Ãµes, custos e demais estados sÃ£o derivados dos Eventos interpretados, nunca armazenados diretamente.

---

# 5. Regras Gerais

### Grupo A â€” Natureza da OperaÃ§Ã£o

**R1 â€”** O domÃ­nio trabalha com OperaÃ§Ãµes.

**R2 â€”** Toda OperaÃ§Ã£o representa um fato econÃ´mico ocorrido na realidade.

**R3 â€”** Toda OperaÃ§Ã£o passa por validaÃ§Ã£o antes de gerar Eventos.

### Grupo B â€” GeraÃ§Ã£o e Imutabilidade

**R4 â€”** Uma OperaÃ§Ã£o aprovada gera um ou mais Eventos.

**R5 â€”** Eventos sÃ£o imutÃ¡veis.

**R6 â€”** CorreÃ§Ãµes histÃ³ricas nunca alteram Eventos existentes. Novas correÃ§Ãµes geram novos Eventos.

### Grupo C â€” Ledger e Armazenamento

**R7 â€”** O Ledger registra apenas acontecimentos patrimoniais.

**R8 â€”** O Ledger nunca registra:

- patrimÃ´nio;
- posiÃ§Ã£o;
- custo mÃ©dio;
- rentabilidade;
- dashboards;
- anÃ¡lises;
- estados temporÃ¡rios.

### Grupo D â€” InterpretaÃ§Ã£o e ReconstruÃ§Ã£o

**R9 â€”** A InterpretaÃ§Ã£o transforma Eventos em efeitos patrimoniais compreensÃ­veis para o Portfolio Engine.

**R10 â€”** O patrimÃ´nio Ã© reconstruÃ­do pelo Portfolio Engine a partir dos Eventos interpretados.

### Grupo E â€” Limites do DomÃ­nio

**R11 â€”** O domÃ­nio operacional nÃ£o conhece:

- interface;
- formulÃ¡rios;
- rascunhos;
- uploads;
- telas.

Esses conceitos pertencem Ã  camada de aplicaÃ§Ã£o.

**R12 â€”** Este documento nÃ£o define regras de interpretaÃ§Ã£o. Essas regras pertencem ao `03_TRANSACTION_INTERPRETATION.md`.

---

# 6. OperaÃ§Ãµes Patrimoniais

Cada operaÃ§Ã£o abaixo segue a estrutura: **objetivo**, **descriÃ§Ã£o**, **situaÃ§Ã£o atual** e **referÃªncia** ao documento de interpretaÃ§Ã£o.

---

### Compra

**Objetivo:** Representar a aquisiÃ§Ã£o de um ativo financeiro.

**DescriÃ§Ã£o:** A Compra representa uma transformaÃ§Ã£o entre Recursos Patrimoniais. Normalmente envolve a reduÃ§Ã£o de um Recurso Patrimonial (ex.: dinheiro) e o aumento de outro (ex.: ativo financeiro). A Compra nÃ£o cria patrimÃ´nio â€” ela transforma a composiÃ§Ã£o do patrimÃ´nio preservando o acontecimento econÃ´mico registrado.

**Exemplos conceituais:** Dinheiro â†’ PETR4; Dinheiro â†’ ETF; Dinheiro â†’ Tesouro Selic; Direito de SubscriÃ§Ã£o + Dinheiro â†’ AÃ§Ãµes.

A operaÃ§Ã£o permanece vÃ¡lida independentemente do tipo de ativo.

> **ObservaÃ§Ã£o arquitetural:** Durante a modelagem do domÃ­nio foi avaliada a criaÃ§Ã£o de uma entidade intermediÃ¡ria denominada "Efeito Patrimonial". A arquitetura optou por NÃƒO criar essa entidade por nÃ£o agregar responsabilidades reais ao domÃ­nio. O conceito permanece apenas como ferramenta didÃ¡tica para explicar como um Evento pode afetar mÃºltiplos Recursos Patrimoniais.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### Venda

**Objetivo:** Representar a alienaÃ§Ã£o de um ativo financeiro.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### Dividendos

**Objetivo:** Representar o recebimento de proventos distribuÃ­dos por uma companhia.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### JCP

**Objetivo:** Representar o recebimento de Juros sobre Capital PrÃ³prio.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### BonificaÃ§Ã£o

**Objetivo:** Representar o recebimento de novas aÃ§Ãµes sem custo para o acionista.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### SubscriÃ§Ã£o

**Objetivo:** Representar o exercÃ­cio de direito de subscriÃ§Ã£o para aquisiÃ§Ã£o de novas aÃ§Ãµes.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### Desdobramento

**Objetivo:** Representar o aumento da quantidade de cotas sem alteraÃ§Ã£o do valor total investido.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### Grupamento

**Objetivo:** Representar a reduÃ§Ã£o da quantidade de cotas sem alteraÃ§Ã£o do valor total investido.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### TransferÃªncia

**Objetivo:** Representar a movimentaÃ§Ã£o de ativos entre contas ou custÃ³dias.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### Ajustes Manuais

**Objetivo:** Representar correÃ§Ãµes manuais necessÃ¡rias para alinhar o registro histÃ³rico Ã  realidade.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### ImportaÃ§Ãµes

**Objetivo:** Representar operaÃ§Ãµes provenientes de fontes externas importadas automaticamente.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

### IntegraÃ§Ãµes

**Objetivo:** Representar operaÃ§Ãµes recebidas por integraÃ§Ã£o direta com fontes de dados.

**DescriÃ§Ã£o:** Working Draft.

**SituaÃ§Ã£o:** Working Draft.

**InterpretaÃ§Ã£o:** `03_TRANSACTION_INTERPRETATION.md`

---

# 7. Casos Especiais

### ExecuÃ§Ãµes Parciais

Em elaboraÃ§Ã£o.

### ImportaÃ§Ãµes em lote

Em elaboraÃ§Ã£o.

### Eventos compostos

Em elaboraÃ§Ã£o.

### SincronizaÃ§Ãµes

Em elaboraÃ§Ã£o.

---

# 8. Marcos Arquiteturais Consolidados

### Marco 1 â€” Natureza do Portfolio Ledger

- Ledger Ã© a Fonte CanÃ´nica da HistÃ³ria Patrimonial.
- Eventos sÃ£o imutÃ¡veis.
- PatrimÃ´nio Ã© reconstruÃ­do.

### Marco 2 â€” Natureza dos Eventos

- Evento representa um acontecimento patrimonial.
- Evento altera recursos patrimoniais.
- Evento nÃ£o representa estados.

### Marco 3 â€” Filosofia do Registro

- O sistema registra fatos.
- Nunca cria fatos.
- Nunca reescreve a histÃ³ria.
- CorreÃ§Ãµes geram novos Eventos.

### Marco 4 â€” Granularidade

- Um Evento representa um Ãºnico acontecimento econÃ´mico indivisÃ­vel.
- Custos pertencentes ao mesmo acontecimento permanecem no mesmo Evento.
- OperaÃ§Ãµes podem gerar mÃºltiplos Eventos quando houver acontecimentos econÃ´micos distintos (como execuÃ§Ãµes parciais).

### Marco 5 â€” Recursos Patrimoniais

1. O patrimÃ´nio Ã© composto por Recursos Patrimoniais.
2. Um Recurso Patrimonial representa um elemento individual capaz de compor o patrimÃ´nio do usuÃ¡rio.

Exemplos:

- Dinheiro
- AÃ§Ãµes
- FIIs
- ETFs
- TÃ­tulos PÃºblicos
- Direitos de SubscriÃ§Ã£o
- CrÃ©ditos Financeiros
- Outros ativos suportados pelo domÃ­nio

3. Um Evento pode afetar um ou vÃ¡rios Recursos Patrimoniais simultaneamente.
4. Recursos Patrimoniais NÃƒO constituem a Fonte CanÃ´nica.

Eles representam uma reconstruÃ§Ã£o produzida pelo Portfolio Engine.

5. A Fonte CanÃ´nica continua sendo exclusivamente o Portfolio Ledger.

### Marco 6 â€” SeparaÃ§Ã£o entre Fato e InterpretaÃ§Ã£o

1. O sistema registra fatos ocorridos na realidade.
2. A OperaÃ§Ã£o apenas solicita o registro do fato.
3. O Evento representa exclusivamente o registro histÃ³rico desse fato.
4. O Portfolio Ledger preserva apenas registros histÃ³ricos.
5. PatrimÃ´nio, posiÃ§Ã£o, custo mÃ©dio, rentabilidade, indicadores e anÃ¡lises sÃ£o interpretaÃ§Ãµes produzidas pelo Portfolio Engine.
6. AlteraÃ§Ãµes futuras nas regras de cÃ¡lculo nÃ£o modificam o histÃ³rico registrado.

---

# 9. PendÃªncias Arquiteturais

### 1. Estrutura e Identidade dos Eventos

- Estrutura definitiva dos Eventos.
- Identidade e versionamento dos Eventos.

### 2. Recursos Patrimoniais

- Modelo dos Recursos Patrimoniais.

### 3. OperaÃ§Ãµes Compostas e ExecuÃ§Ãµes

- RelaÃ§Ã£o entre OperaÃ§Ãµes Compostas e Eventos.
- Modelo definitivo para ExecuÃ§Ãµes Parciais.

### 4. ImportaÃ§Ãµes e IntegraÃ§Ãµes

- EstratÃ©gia para ImportaÃ§Ãµes.

### 5. Ledger

- IntegraÃ§Ã£o com o Portfolio Ledger.

Estas decisÃµes permanecem em discussÃ£o arquitetural e serÃ£o tratadas conforme a metodologia estabelecida no DEVELOPMENT_METHODOLOGY.md.

---

# 10. Responsabilidades do 03_TRANSACTION_INTERPRETATION.md

O prÃ³ximo documento da sequÃªncia (`03_TRANSACTION_INTERPRETATION.md`) serÃ¡ responsÃ¡vel por:

- interpretaÃ§Ã£o econÃ´mica dos Eventos registrados;
- definiÃ§Ã£o de alteraÃ§Ãµes patrimoniais decorrentes dos Eventos;
- estabelecimento de invariantes do domÃ­nio operacional;
- especificaÃ§Ã£o da transformaÃ§Ã£o patrimonial para cada tipo de operaÃ§Ã£o;
- definiÃ§Ã£o do contrato entre a camada de Eventos e o Portfolio Engine.

Este documento (`02_TRANSACTIONS.md`) registra o fato econÃ´mico. O documento seguinte interpreta o efeito patrimonial desse fato.

Nenhuma regra de interpretaÃ§Ã£o deverÃ¡ ser criada neste documento.

---

# 11. HistÃ³rico

### VersÃ£o 0.92

ConsolidaÃ§Ã£o do Working Draft para NÃ­vel 1 â€” Estrutura Consolidada. Adicionada Pergunta Fundamental. Filosofia expandida com princÃ­pios explÃ­citos da OperaÃ§Ã£o. Adicionado conceito de InterpretaÃ§Ã£o. Fluxo Conceitual revisado com InterpretaÃ§Ã£o entre Ledger e Engine. Regras Gerais reorganizadas em 5 grupos (12 regras). OperaÃ§Ãµes padronizadas com objetivo, descriÃ§Ã£o, situaÃ§Ã£o e referÃªncia Ã  interpretaÃ§Ã£o. PendÃªncias agrupadas por assunto. Criada seÃ§Ã£o de responsabilidades do 03_TRANSACTION_INTERPRETATION.md.

### VersÃ£o 0.91

Adicionados Marcos Arquiteturais 5 (Recursos Patrimoniais) e 6 (SeparaÃ§Ã£o entre Fato e InterpretaÃ§Ã£o). Formalizada a primeira Business Rule especÃ­fica (Compra). Adicionada ObservaÃ§Ã£o Arquitetural sobre "Efeito Patrimonial". Incremento incremental do Working Draft.

### VersÃ£o 0.9

CriaÃ§Ã£o do documento como Working Draft. DefiniÃ§Ã£o da Filosofia do DomÃ­nio, Conceitos Fundamentais, Fluxo Conceitual, 9 Regras Gerais, estrutura inicial de OperaÃ§Ãµes Patrimoniais, Casos Especiais, Marcos Arquiteturais e PendÃªncias.

## Fonte: docs\06_BUSINESS_RULES\03_MARKET_DATA.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 06_BUSINESS_RULES/03_MARKET_DATA.md

**Projeto:** Lio Feliz

**Documento:** 03_MARKET_DATA.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 08/07/2026

---

# Objetivo

Este documento define as regras de negÃ³cio para obtenÃ§Ã£o, sincronizaÃ§Ã£o, validaÃ§Ã£o, armazenamento e disponibilizaÃ§Ã£o dos dados de mercado utilizados pelo Lio Feliz.

Os Dados de Mercado representam uma das principais fontes de informaÃ§Ã£o do sistema, mas nunca substituem as informaÃ§Ãµes cadastradas pelo usuÃ¡rio.

---

# Escopo

Este documento abrange exclusivamente:

- cotaÃ§Ãµes em tempo real ou com atraso;
- histÃ³rico de preÃ§os;
- indicadores de mercado;
- informaÃ§Ãµes cadastrais dos ativos;
- sincronizaÃ§Ã£o entre provedores;
- validaÃ§Ã£o dos dados recebidos;
- cache e atualizaÃ§Ã£o dos dados.

NÃ£o fazem parte deste documento:

- cÃ¡lculo da carteira;
- eventos corporativos;
- proventos;
- tributaÃ§Ã£o;
- regras de investimento.

Esses assuntos possuem documentos especÃ­ficos.

---

# PrincÃ­pios

## Fonte Externa

Todo dado de mercado Ã© considerado uma informaÃ§Ã£o externa.

Nenhum provedor Ã© considerado absolutamente confiÃ¡vel.

Sempre que possÃ­vel, os dados deverÃ£o ser validados.

---

## IndependÃªncia

O funcionamento da carteira nunca deverÃ¡ depender exclusivamente de um provedor especÃ­fico.

O sistema deverÃ¡ permitir substituiÃ§Ã£o de provedores sem alterar as regras de negÃ³cio.

---

## Disponibilidade

Caso um provedor fique indisponÃ­vel, o sistema deverÃ¡ continuar funcionando utilizando:

- cache;
- Ãºltimo valor conhecido;
- outro provedor compatÃ­vel.

Sempre informando ao usuÃ¡rio quando o dado estiver desatualizado.

---

# Tipos de Dados

O sistema poderÃ¡ armazenar:

## CotaÃ§Ãµes

- preÃ§o atual;
- abertura;
- mÃ¡xima;
- mÃ­nima;
- fechamento;
- volume.

---

## HistÃ³rico

- diÃ¡rio;
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

Quando disponÃ­veis:

- Dividend Yield;
- P/VP;
- P/L;
- Valor Patrimonial;
- Liquidez;
- Market Cap;
- demais indicadores suportados.

---

# SincronizaÃ§Ã£o

Os dados poderÃ£o ser sincronizados:

- automaticamente;
- manualmente;
- sob demanda.

O usuÃ¡rio nunca deverÃ¡ ser obrigado a sincronizar manualmente para utilizar o sistema.

---

# FrequÃªncia de AtualizaÃ§Ã£o

Cada tipo de informaÃ§Ã£o poderÃ¡ possuir frequÃªncia prÃ³pria.

Exemplos:

CotaÃ§Ã£o:

- durante o uso;
- conforme disponibilidade do provedor.

Indicadores:

- diariamente.

InformaÃ§Ãµes cadastrais:

- somente quando houver alteraÃ§Ãµes.

---

# Cache

O sistema deverÃ¡ utilizar cache para reduzir chamadas externas.

O cache nunca deverÃ¡ alterar o comportamento da aplicaÃ§Ã£o.

Caso um dado esteja em cache:

- sua data deverÃ¡ ser conhecida;
- sua origem deverÃ¡ ser registrada.

---

# ValidaÃ§Ã£o

Sempre que possÃ­vel, o sistema deverÃ¡ comparar informaÃ§Ãµes entre diferentes provedores.

Caso exista divergÃªncia significativa:

- registrar ocorrÃªncia;
- utilizar a fonte considerada mais confiÃ¡vel;
- permitir futura auditoria.

---

# Falhas

Caso nenhuma fonte esteja disponÃ­vel:

- manter Ãºltimo valor conhecido;
- informar que os dados estÃ£o desatualizados;
- nunca impedir acesso Ã  carteira.

---

# IntegraÃ§Ã£o com Outros MÃ³dulos

Os Dados de Mercado fornecem informaÃ§Ãµes para:

- Carteira;
- Projection Layer;
- Dashboard;
- Metas;
- Insights;
- Decision Engine;
- Proventos;
- Corporate Actions;
- IR.

Os Dados de Mercado nunca alteram diretamente qualquer mÃ³dulo.

Eles apenas fornecem informaÃ§Ãµes.

---

# Auditoria

Cada sincronizaÃ§Ã£o deverÃ¡ registrar:

- data;
- horÃ¡rio;
- provedor utilizado;
- duraÃ§Ã£o;
- resultado;
- quantidade de ativos atualizados.

---

# DecisÃµes de Projeto

## Por que utilizar mÃºltiplos provedores?

Para reduzir dependÃªncia de serviÃ§os externos e aumentar a confiabilidade do sistema.

---

## Por que utilizar cache?

Para melhorar desempenho, reduzir custos e permitir funcionamento mesmo durante indisponibilidades temporÃ¡rias.

---

## Por que separar Dados de Mercado da Carteira?

Porque preÃ§os de mercado mudam constantemente, enquanto as operaÃ§Ãµes da carteira representam fatos histÃ³ricos.

Misturar ambos comprometeria a integridade do sistema.

---

# Casos de Uso Relacionados

- UC-001 AtualizaÃ§Ã£o de CotaÃ§Ãµes
- UC-002 SincronizaÃ§Ã£o Manual
- UC-003 AtualizaÃ§Ã£o AutomÃ¡tica
- UC-004 Consulta de HistÃ³rico
- UC-005 ValidaÃ§Ã£o entre Provedores

---

# HistÃ³rico

## VersÃ£o 1.0

CriaÃ§Ã£o oficial das regras de negÃ³cio para Dados de Mercado.

## Fonte: docs\06_BUSINESS_RULES\03_TRANSACTION_INTERPRETATION.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 06_BUSINESS_RULES/03_TRANSACTION_INTERPRETATION.md

**Projeto:** Lio Feliz

**Documento:** 03_TRANSACTION_INTERPRETATION.md

**VersÃ£o:** 0.60

**Status:** ðŸŸ¡ Em elaboraÃ§Ã£o (Working Draft)

**NÃ­vel:** N3

**Categoria:** Business Rules

**Objetivo Arquitetural:** OA-001 â€” Modelagem do DomÃ­nio Patrimonial

**ResponsÃ¡veis:** Rafael Santos + IA

**Ãšltima atualizaÃ§Ã£o:** 10/07/2026

---

> **ObservaÃ§Ã£o:** Este documento representa uma versÃ£o de trabalho (Working Draft).
>
> Seu conteÃºdo encontra-se em evoluÃ§Ã£o inicial durante a abertura do domÃ­nio de interpretaÃ§Ã£o patrimonial do Lio Feliz.
>
> Nenhum conceito ou regra aqui presente Ã© definitivo.
>
> Nenhuma implementaÃ§Ã£o deve ser baseada exclusivamente neste documento enquanto seu status permanecer "Em elaboraÃ§Ã£o".

---

# 1. Objetivo

Definir o significado oficial das OperaÃ§Ãµes Patrimoniais.

Este documento NÃƒO executa operaÃ§Ãµes.

Este documento NÃƒO calcula patrimÃ´nio.

Este documento NÃƒO pertence ao Portfolio Engine.

Sua responsabilidade Ã© definir, de forma Ãºnica e determinÃ­stica, o significado econÃ´mico das OperaÃ§Ãµes Patrimoniais.

---

# 2. Pergunta Fundamental

> Como o domÃ­nio interpreta uma OperaÃ§Ã£o Patrimonial de maneira Ãºnica, consistente e independente dos consumidores?

---

# 3. Filosofia

- A interpretaÃ§Ã£o pertence ao domÃ­nio.
- A interpretaÃ§Ã£o Ã© Ãºnica.
- A interpretaÃ§Ã£o Ã© determinÃ­stica.
- A interpretaÃ§Ã£o nÃ£o depende do consumidor.
- Consumidores nunca reinterpretam operaÃ§Ãµes.
- O documento descreve significado econÃ´mico, nÃ£o implementaÃ§Ã£o.

---

# 4. Conceitos Fundamentais

## 4.1 OperaÃ§Ã£o Patrimonial

Representa um fato econÃ´mico registrado pelo domÃ­nio.

A OperaÃ§Ã£o Patrimonial descreve o acontecimento ocorrido, mas nÃ£o define como esse acontecimento altera o patrimÃ´nio.

## 4.2 InterpretaÃ§Ã£o

Representa a definiÃ§Ã£o oficial do significado econÃ´mico de uma OperaÃ§Ã£o Patrimonial.

A InterpretaÃ§Ã£o pertence exclusivamente ao domÃ­nio.

Ela Ã© Ãºnica, determinÃ­stica e independente de qualquer consumidor.

## 4.3 Efeito Patrimonial

Representa uma alteraÃ§Ã£o ocorrida sobre uma Ãºnica PosiÃ§Ã£o Patrimonial em decorrÃªncia da interpretaÃ§Ã£o de uma OperaÃ§Ã£o Patrimonial.

Cada Efeito descreve apenas uma alteraÃ§Ã£o.

OperaÃ§Ãµes complexas podem gerar vÃ¡rios Efeitos Patrimoniais.

## 4.4 PosiÃ§Ã£o Patrimonial

Representa a participaÃ§Ã£o de um patrimÃ´nio em determinado Recurso EconÃ´mico.

As alteraÃ§Ãµes patrimoniais ocorrem sempre sobre PosiÃ§Ãµes Patrimoniais.

## 4.5 Recurso EconÃ´mico

Representa um elemento econÃ´mico que pode ser objeto de participaÃ§Ã£o patrimonial.

O Recurso EconÃ´mico existe independentemente do patrimÃ´nio.

## 4.6 Consumidores

SÃ£o componentes do sistema que utilizam os Efeitos Patrimoniais.

Exemplos:

- Portfolio Engine
- Motor TributÃ¡rio
- Auditoria
- SimulaÃ§Ã£o
- RelatÃ³rios

Todos os consumidores utilizam a mesma interpretaÃ§Ã£o oficial.

Nenhum consumidor poderÃ¡ reinterpretar OperaÃ§Ãµes Patrimoniais.

---

# 5. Fluxo Conceitual

```
OperaÃ§Ã£o Patrimonial
       â†“
InterpretaÃ§Ã£o Oficial
       â†“
Um ou mais Efeitos Patrimoniais
       â†“
   Consumidores
```

Os Efeitos Patrimoniais representam a saÃ­da oficial produzida pela InterpretaÃ§Ã£o.

---

# 6. Business Rules

> As Business Rules definem o comportamento conceitual da InterpretaÃ§Ã£o Patrimonial.
>
> Elas nÃ£o definem implementaÃ§Ã£o nem detalhes tÃ©cnicos.

## Grupo A â€” Natureza da InterpretaÃ§Ã£o

### BR-030 â€” InterpretaÃ§Ã£o Oficial

Toda OperaÃ§Ã£o Patrimonial possui exatamente uma InterpretaÃ§Ã£o Oficial.

Essa interpretaÃ§Ã£o pertence exclusivamente ao domÃ­nio.

### BR-031 â€” Determinismo

Uma mesma OperaÃ§Ã£o Patrimonial, sob as mesmas regras de negÃ³cio, sempre produzirÃ¡ a mesma InterpretaÃ§Ã£o Oficial.

### BR-032 â€” IndependÃªncia dos Consumidores

A InterpretaÃ§Ã£o Oficial nÃ£o depende do consumidor.

Todos os consumidores utilizam exatamente a mesma interpretaÃ§Ã£o.

## Grupo B â€” ProduÃ§Ã£o dos Efeitos

### BR-033 â€” ProduÃ§Ã£o de Efeitos Patrimoniais

Toda InterpretaÃ§Ã£o Oficial gera um ou mais Efeitos Patrimoniais.

### BR-034 â€” Granularidade dos Efeitos

Cada Efeito Patrimonial altera exatamente uma Ãºnica PosiÃ§Ã£o Patrimonial.

Caso uma OperaÃ§Ã£o afete vÃ¡rias posiÃ§Ãµes, a InterpretaÃ§Ã£o deverÃ¡ produzir vÃ¡rios Efeitos Patrimoniais.

## Grupo C â€” Modelo Patrimonial

### BR-035 â€” RelaÃ§Ã£o entre PosiÃ§Ã£o e Recurso

Toda PosiÃ§Ã£o Patrimonial referencia exatamente um Recurso EconÃ´mico.

O Recurso EconÃ´mico existe independentemente do patrimÃ´nio.

## Grupo D â€” Responsabilidades

### BR-036 â€” AusÃªncia de ImplementaÃ§Ã£o

A InterpretaÃ§Ã£o Oficial descreve apenas significado econÃ´mico.

Ela nÃ£o define algoritmos, cÃ¡lculos, persistÃªncia, estrutura de dados ou implementaÃ§Ã£o.

### BR-037 â€” AusÃªncia de ReinterpretaÃ§Ã£o

Nenhum componente do sistema poderÃ¡ reinterpretar uma OperaÃ§Ã£o Patrimonial.

A Ãºnica interpretaÃ§Ã£o vÃ¡lida Ã© a definida pelo domÃ­nio.

---

# 7. Casos de InterpretaÃ§Ã£o

> Os casos abaixo possuem finalidade exclusivamente conceitual.
>
> Eles NÃƒO representam implementaÃ§Ã£o.
>
> Eles NÃƒO definem algoritmos.
>
> Eles servem apenas para demonstrar a aplicaÃ§Ã£o das Business Rules.

## 7.1 Compra

Uma OperaÃ§Ã£o Patrimonial gera uma Ãºnica InterpretaÃ§Ã£o Oficial.

Essa InterpretaÃ§Ã£o produz dois Efeitos Patrimoniais:

- reduÃ§Ã£o da posiÃ§Ã£o de Caixa;
- aumento da posiÃ§Ã£o do ativo adquirido.

## 7.2 Venda

Uma Ãºnica InterpretaÃ§Ã£o produz:

- reduÃ§Ã£o da posiÃ§Ã£o do ativo;
- aumento da posiÃ§Ã£o de Caixa.

## 7.3 Dividendos

Uma OperaÃ§Ã£o pode produzir apenas um Ãºnico Efeito Patrimonial.

Exemplo:

- aumento da posiÃ§Ã£o de Caixa.

## 7.4 BonificaÃ§Ã£o

A OperaÃ§Ã£o altera apenas a posiÃ§Ã£o do ativo.

Nenhuma posiÃ§Ã£o de Caixa Ã© afetada.

## 7.5 Desdobramento (Split)

A InterpretaÃ§Ã£o produz Efeitos sobre a mesma PosiÃ§Ã£o Patrimonial.

Exemplo:

- alteraÃ§Ã£o da quantidade;
- alteraÃ§Ã£o do valor unitÃ¡rio.

O patrimÃ´nio econÃ´mico permanece equivalente.

## 7.6 Grupamento

Mesmo conceito do Split.

Demonstra apenas a inversÃ£o do efeito.

## 7.7 TransferÃªncia

A mesma OperaÃ§Ã£o produz dois Efeitos:

- reduÃ§Ã£o de uma posiÃ§Ã£o;
- aumento de outra posiÃ§Ã£o.

## 7.8 ConversÃ£o de Recursos

Exemplo: ConversÃ£o BRL â†’ USD.

- reduÃ§Ã£o da posiÃ§Ã£o em BRL;
- aumento da posiÃ§Ã£o em USD.

---

# 8. ConclusÃµes Arquiteturais

As seguintes conclusÃµes foram validadas pelos Casos de InterpretaÃ§Ã£o:

- Toda OperaÃ§Ã£o Patrimonial possui exatamente uma InterpretaÃ§Ã£o Oficial.
- Uma InterpretaÃ§Ã£o pode produzir um ou vÃ¡rios Efeitos Patrimoniais.
- Todo Efeito atua sobre exatamente uma Ãºnica PosiÃ§Ã£o Patrimonial.
- PosiÃ§Ãµes Patrimoniais referenciam Recursos EconÃ´micos.
- Consumidores utilizam a InterpretaÃ§Ã£o Oficial, mas nunca a modificam.

---

# 9. PendÃªncias Arquiteturais

## Resolvidas

As seguintes hipÃ³teses foram consolidadas durante este Working Draft:

- Estrutura interna dos Efeitos Patrimoniais â€” validada pelos casos 1 a 8.
- Modelo de PosiÃ§Ã£o Patrimonial â€” consolidado como participaÃ§Ã£o em Recurso EconÃ´mico.
- Modelo de Recurso EconÃ´mico â€” consolidado como elemento independente do patrimÃ´nio.

## Abertas

As seguintes hipÃ³teses permanecem em aberto e nÃ£o representam decisÃµes oficiais:

- ReorganizaÃ§Ãµes societÃ¡rias complexas.
- Versionamento da InterpretaÃ§Ã£o.
- IntegraÃ§Ã£o com eventos compostos.
- Impactos tributÃ¡rios especiais.

---

# HistÃ³rico

## VersÃ£o 0.60

- Casos de InterpretaÃ§Ã£o preenchidos (8 casos: Compra, Venda, Dividendos, BonificaÃ§Ã£o, Split, Grupamento, TransferÃªncia, ConversÃ£o).
- SeÃ§Ã£o "ConclusÃµes Arquiteturais" adicionada com 5 conclusÃµes validadas.
- PendÃªncias reorganizadas em "Resolvidas" (3) e "Abertas" (4).
- NÃ­vel N3 â€” modelo conceitual validado por operaÃ§Ãµes reais do domÃ­nio.

## VersÃ£o 0.40

- Business Rules BR-030 a BR-037 criadas e organizadas em 4 grupos (Natureza, ProduÃ§Ã£o, Modelo, Responsabilidades).
- SeÃ§Ã£o "Regras Gerais" substituÃ­da por "Business Rules" com regras formais.
- NÃ­vel N2 â€” regras de negÃ³cio da interpretaÃ§Ã£o estabelecidas.

## VersÃ£o 0.20

- Conceitos Fundamentais consolidados: OperaÃ§Ã£o Patrimonial, InterpretaÃ§Ã£o, Efeito Patrimonial, PosiÃ§Ã£o Patrimonial, Recurso EconÃ´mico, Consumidores.
- Fluxo Conceitual atualizado: "Um ou mais Efeitos Patrimoniais" e observaÃ§Ã£o sobre saÃ­da oficial.
- Filosofia expandida para 6 princÃ­pios.
- PendÃªncias Arquiteturais registradas (5 hipÃ³teses em validaÃ§Ã£o).
- NÃ­vel N1 â€” conceitos fundamentais estabelecidos.

## VersÃ£o 0.10

- CriaÃ§Ã£o do Working Draft inicial.
- Estrutura oficial do documento definida.
- Placeholders para Conceitos Fundamentais, Regras Gerais e Casos de InterpretaÃ§Ã£o.
- NÃ­vel N0 â€” estÃ¡gio inicial de maturidade.

## Fonte: docs\06_BUSINESS_RULES\04_CORPORATE_ACTIONS.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 06_BUSINESS_RULES/04_CORPORATE_ACTIONS.md

**Projeto:** Lio Feliz

**Documento:** 04_CORPORATE_ACTIONS.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 08/07/2026

---

# Objetivo

Este documento define as regras de negÃ³cio para todos os Eventos Corporativos que possam alterar a composiÃ§Ã£o, identificaÃ§Ã£o ou estrutura dos ativos presentes na carteira do investidor.

Eventos Corporativos representam acontecimentos promovidos pelas empresas emissoras ou pelos mercados e nÃ£o constituem decisÃµes de investimento do usuÃ¡rio.

---

# Escopo

Este documento abrange exclusivamente:

- desdobramentos (Split);
- grupamentos (Inplit);
- bonificaÃ§Ãµes em aÃ§Ãµes;
- subscriÃ§Ãµes;
- direitos de subscriÃ§Ã£o;
- cisÃµes;
- incorporaÃ§Ãµes;
- fusÃµes;
- conversÃµes;
- mudanÃ§as de ticker;
- mudanÃ§as de nome;
- cancelamentos de ativos;
- migraÃ§Ã£o entre segmentos;
- demais eventos societÃ¡rios.

NÃ£o fazem parte deste documento:

- dividendos;
- JCP;
- rendimentos;
- pagamentos;
- tributaÃ§Ã£o;
- sincronizaÃ§Ã£o de mercado.

Esses assuntos possuem documentaÃ§Ã£o prÃ³pria.

---

# PrincÃ­pios

## Evento Externo

Eventos Corporativos sÃ£o acontecimentos externos.

O usuÃ¡rio nunca "cria" um Evento Corporativo.

Ele apenas decide como agir quando houver necessidade.

---

## PreservaÃ§Ã£o HistÃ³rica

Nenhuma operaÃ§Ã£o realizada pelo usuÃ¡rio poderÃ¡ ser alterada.

O histÃ³rico deverÃ¡ permanecer Ã­ntegro.

O Evento Corporativo produzirÃ¡ seus efeitos sem modificar registros histÃ³ricos.

---

## Reprocessamento

Toda carteira deverÃ¡ poder ser reconstruÃ­da desde a primeira operaÃ§Ã£o.

A aplicaÃ§Ã£o dos Eventos Corporativos deverÃ¡ produzir sempre o mesmo resultado.

---

# Tipos de Eventos

## AlteraÃ§Ã£o de Quantidade

- Split
- Inplit
- BonificaÃ§Ã£o em aÃ§Ãµes
- ConversÃµes

---

## AlteraÃ§Ã£o Estrutural

- CisÃ£o
- FusÃ£o
- IncorporaÃ§Ã£o

---

## AlteraÃ§Ã£o de IdentificaÃ§Ã£o

- MudanÃ§a de ticker
- MudanÃ§a de nome
- MudanÃ§a de segmento
- MigraÃ§Ã£o de mercado

---

## Direitos

- Direitos de subscriÃ§Ã£o
- PreferÃªncias
- Direitos temporÃ¡rios

---

# AplicaÃ§Ã£o

Sempre que um Evento Corporativo for identificado:

Evento

â†“

ValidaÃ§Ã£o

â†“

AplicaÃ§Ã£o das regras

â†“

ReconstruÃ§Ã£o da posiÃ§Ã£o

â†“

AtualizaÃ§Ã£o da carteira

â†“

Registro de auditoria

---

# AtualizaÃ§Ãµes AutomÃ¡ticas

Quando possÃ­vel, deverÃ£o ser atualizados automaticamente:

- quantidade;
- preÃ§o mÃ©dio;
- posiÃ§Ã£o;
- patrimÃ´nio;
- indicadores.

O usuÃ¡rio nÃ£o deverÃ¡ recalcular essas informaÃ§Ãµes manualmente.

---

# Eventos que Exigem DecisÃ£o

Alguns eventos poderÃ£o exigir manifestaÃ§Ã£o do investidor.

Exemplos:

- exercer subscriÃ§Ã£o;
- vender direitos;
- aceitar determinada conversÃ£o.

Nesses casos, o sistema deverÃ¡ informar:

- prazo;
- consequÃªncias;
- impacto esperado.

A decisÃ£o permanecerÃ¡ sempre com o usuÃ¡rio.

---

# IntegraÃ§Ã£o com Outros MÃ³dulos

Este documento fornece informaÃ§Ãµes para:

- Portfolio Consolidation Engine;
- Projection Layer;
- Tax Engine;
- Insight Engine;
- Decision Engine.

Quando houver movimentaÃ§Ã£o financeira decorrente de um Evento Corporativo, a integraÃ§Ã£o com a Vida Financeira seguirÃ¡ o princÃ­pio das AÃ§Ãµes Vinculadas.

Eventos relacionados a pagamentos deverÃ£o consultar o documento:

05_PROVENTOS.md

---

# Auditoria

Cada Evento Corporativo deverÃ¡ armazenar:

- origem;
- provedor;
- data de identificaÃ§Ã£o;
- data de aplicaÃ§Ã£o;
- usuÃ¡rio responsÃ¡vel (quando manual);
- versÃ£o das regras aplicadas.

---

# Casos Especiais

O sistema deverÃ¡ suportar:

- eventos retroativos;
- eventos corrigidos;
- mÃºltiplos eventos na mesma data;
- ativos descontinuados;
- ativos temporariamente sem cotaÃ§Ã£o.

---

# DecisÃµes de Projeto

## Por que separar Eventos Corporativos de Proventos?

Porque Eventos Corporativos alteram a estrutura da carteira.

Proventos representam distribuiÃ§Ã£o de renda.

Apesar de ambos serem eventos externos, possuem regras de negÃ³cio independentes.

---

## Por que preservar o histÃ³rico?

Porque operaÃ§Ãµes representam fatos histÃ³ricos.

Eventos representam transformaÃ§Ãµes posteriores.

Misturar ambos comprometeria auditoria e reprocessamento.

---

## Por que reconstruir a carteira?

Porque eventos retroativos podem alterar posiÃ§Ãµes e preÃ§os mÃ©dios.

A reconstruÃ§Ã£o garante consistÃªncia.

---

# Casos de Uso Relacionados

- UC-005 Desdobramento
- UC-006 Grupamento
- UC-007 BonificaÃ§Ã£o
- UC-008 SubscriÃ§Ã£o
- UC-009 ConversÃ£o de Ativos
- UC-010 MudanÃ§a de Ticker

---

# HistÃ³rico

## VersÃ£o 1.0

CriaÃ§Ã£o oficial das regras de negÃ³cio para Eventos Corporativos.

## Fonte: docs\06_BUSINESS_RULES\05_PROVENTOS.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 06_BUSINESS_RULES/05_PROVENTOS.md

**Projeto:** Lio Feliz

**Documento:** 05_PROVENTOS.md

**VersÃ£o:** 1.1

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 08/07/2026

---

# Objetivo

Este documento define todas as regras relacionadas aos proventos recebidos pelo investidor.

No contexto do Lio Feliz, um provento representa qualquer evento que gere renda ou entrada financeira ao investidor.

Eventos de aumento patrimonial e direitos societÃ¡rios (bonificaÃ§Ãµes, subscriÃ§Ãµes, desdobramentos, grupamentos, fusÃµes, cisÃµes, etc.) pertencem ao domÃ­nio de Eventos Corporativos e sÃ£o tratados no documento [`04_CORPORATE_ACTIONS.md`](./04_CORPORATE_ACTIONS.md).

Estas regras serÃ£o utilizadas por diversos mÃ³dulos do sistema, incluindo Carteira, Imposto de Renda, Dashboard, RelatÃ³rios, Vida Financeira e Insights.

---

# PrincÃ­pios

Os proventos deverÃ£o ser tratados como eventos financeiros auditÃ¡veis.

Todo provento deverÃ¡ possuir:

- origem identificÃ¡vel;
- histÃ³rico completo;
- rastreabilidade;
- estados bem definidos;
- integraÃ§Ã£o controlada com os demais mÃ³dulos.

Nenhum provento poderÃ¡ desaparecer do histÃ³rico sem registro da alteraÃ§Ã£o.

---

# Tipos de Proventos

O sistema deverÃ¡ suportar, no mÃ­nimo:

## Entrada Financeira

- Dividendos
- Juros sobre Capital PrÃ³prio (JCP)
- Rendimentos de FIIs
- Rendimentos de FIAGROs
- Rendimentos de FI-Infra
- DistribuiÃ§Ãµes de REITs
- Dividendos internacionais
- DistribuiÃ§Ãµes de ETFs
- Juros de renda fixa (quando aplicÃ¡vel)
- RestituiÃ§Ãµes financeiras

---

> **Nota:** Eventos de aumento patrimonial (bonificaÃ§Ãµes, aÃ§Ãµes/cotas recebidas) e direitos (subscriÃ§Ã£o, preferenciais, distribuÃ­dos) pertencem ao domÃ­nio de Eventos Corporativos. Consulte [`04_CORPORATE_ACTIONS.md`](./04_CORPORATE_ACTIONS.md) para as regras completas.

---

# Estados do Provento

Todo provento deverÃ¡ possuir um ciclo de vida.

Anunciado

â†“

Confirmado

â†“

ElegÃ­vel

â†“

Aguardando pagamento

â†“

Recebido

â†“

Conciliado

Cada alteraÃ§Ã£o de estado deverÃ¡ permanecer registrada.

---

# Datas Importantes

Cada provento poderÃ¡ possuir:

- Data do anÃºncio
- Data-com
- Data-ex
- Data-base
- Data prevista para pagamento
- Data efetiva de pagamento
- Data da conciliaÃ§Ã£o

Nem todas as datas sÃ£o obrigatÃ³rias para todos os ativos.

---

# Elegibilidade

O sistema deverÃ¡ determinar automaticamente:

- se o usuÃ¡rio possuÃ­a posiÃ§Ã£o elegÃ­vel;
- quantidade considerada;
- valor por ativo;
- retenÃ§Ãµes;
- arredondamentos;
- moeda de pagamento.

---

# IntegraÃ§Ã£o com a Carteira

ApÃ³s o recebimento do provento deverÃ£o ser atualizados:

- histÃ³rico;
- patrimÃ´nio;
- fluxo de caixa da carteira;
- rentabilidade;
- renda passiva;
- estatÃ­sticas.

A Carteira continua sendo a Fonte de Verdade dos investimentos.

---

# IntegraÃ§Ã£o com Vida Financeira

Esta integraÃ§Ã£o serÃ¡ totalmente opcional.

Ela seguirÃ¡ o princÃ­pio das AÃ§Ãµes Vinculadas.

Caso habilitada nas preferÃªncias do usuÃ¡rio, o sistema poderÃ¡ criar automaticamente um lanÃ§amento financeiro correspondente ao provento recebido.

Exemplo:

Receita

Dividendos

R$ 350,00

Origem:

Carteira

Nenhuma informaÃ§Ã£o serÃ¡ duplicada.

Apenas serÃ¡ criado um lanÃ§amento vinculado.

---

# IntegraÃ§Ã£o com a Decision Engine

Os proventos poderÃ£o alimentar recomendaÃ§Ãµes como:

- reinvestimento;
- rebalanceamento;
- projeÃ§Ãµes;
- evoluÃ§Ã£o da renda passiva.

A Decision Engine nunca executarÃ¡ operaÃ§Ãµes automaticamente.

---

# IntegraÃ§Ã£o com a Insight Engine

Os proventos alimentarÃ£o resumos inteligentes.

Exemplo:

Resumo de Junho

Recebido:

R$ 1.284,00

Maior pagador:

TAEE11

Crescimento:

+12%

SituaÃ§Ã£o:

Todos os pagamentos conciliados.

O objetivo Ã© reduzir notificaÃ§Ãµes desnecessÃ¡rias.

---

# CalendÃ¡rio de Proventos

O sistema poderÃ¡ apresentar um calendÃ¡rio contendo:

- pagamentos futuros confirmados;
- pagamentos estimados;
- pagamentos recebidos.

Cada evento deverÃ¡ possuir um indicador de confiabilidade.

Confirmado

Estimado

Recebido

Estimativas deverÃ£o ser claramente identificadas.

---

# HistÃ³rico

Todo provento permanecerÃ¡ registrado permanentemente.

Caso haja correÃ§Ãµes:

- manter histÃ³rico;
- registrar origem;
- registrar motivo;
- registrar data da alteraÃ§Ã£o.

Nunca substituir silenciosamente registros anteriores.

---

# Auditoria

Cada provento deverÃ¡ armazenar:

- origem;
- provedor;
- sincronizaÃ§Ã£o responsÃ¡vel;
- data de criaÃ§Ã£o;
- data da Ãºltima atualizaÃ§Ã£o;
- usuÃ¡rio responsÃ¡vel (quando manual).

---

# Casos Especiais

O sistema deverÃ¡ suportar:

- cancelamentos;
- pagamentos corrigidos;
- pagamentos parciais;
- pagamentos em moeda estrangeira;
- atrasos;
- estornos;
- proventos extraordinÃ¡rios.

---

# ProjeÃ§Ãµes

O histÃ³rico de proventos permitirÃ¡ calcular:

- renda mensal;
- renda anual;
- mÃ©dia mÃ³vel;
- CAGR da renda passiva;
- projeÃ§Ãµes futuras.

Todas as projeÃ§Ãµes deverÃ£o ser identificadas como estimativas.

---

# InteraÃ§Ãµes com Outros MÃ³dulos

Este documento impacta diretamente:

- Portfolio Consolidation Engine
- Tax Engine
- Insight Engine
- Decision Engine
- Vida Financeira
- Dashboard
- RelatÃ³rios
- Metas
- Projection Layer

---

# DecisÃµes de Projeto

## Por que utilizar "Proventos" em vez de "Dividendos"?

Porque dividendos representam apenas um dos diversos tipos de distribuiÃ§Ã£o existentes.

O modelo passa a suportar naturalmente novos ativos e mercados.

---

## Por que utilizar estados?

Porque anÃºncios podem sofrer alteraÃ§Ãµes antes do pagamento.

O histÃ³rico precisa refletir corretamente cada etapa.

---

## Por que separar proventos de eventos corporativos?

Porque possuem naturezas diferentes: proventos representam renda ou entrada financeira; eventos corporativos (bonificaÃ§Ãµes, splits, fusÃµes, subscriÃ§Ãµes) alteram a estrutura patrimonial sem necessariamente gerar caixa.

As regras de eventos corporativos estÃ£o documentadas em [`04_CORPORATE_ACTIONS.md`](./04_CORPORATE_ACTIONS.md).

---

## Por que integrar opcionalmente com Vida Financeira?

Para manter a independÃªncia entre mÃ³dulos e respeitar o princÃ­pio das Fontes de Verdade.

---

# HistÃ³rico

## VersÃ£o 1.1

- Renomeado de `03_PROVENTOS.md` para `05_PROVENTOS.md`.
- Removidas regras de eventos corporativos (Aumento Patrimonial, Direitos) que pertencem a `04_CORPORATE_ACTIONS.md`.
- Adicionadas referÃªncias cruzadas para `04_CORPORATE_ACTIONS.md`.
- Ajustada definiÃ§Ã£o de Proventos para exclusividade de renda/entrada financeira.

## VersÃ£o 1.0

CriaÃ§Ã£o oficial das regras de negÃ³cio para Proventos.

## Fonte: docs\07_TECHNICAL_ANNEXES\00_ENGINE_GUIDELINES.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 07_TECHNICAL_ANNEXES/00_ENGINE_GUIDELINES.md

**Projeto:** Lio Feliz

**Documento:** 00_ENGINE_GUIDELINES.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

Este documento define o padrÃ£o oficial para criaÃ§Ã£o de qualquer Engine do Lio Feliz.

Toda nova Engine deverÃ¡ seguir obrigatoriamente estas diretrizes.

O objetivo Ã© garantir consistÃªncia arquitetural, facilidade de manutenÃ§Ã£o, previsibilidade e reutilizaÃ§Ã£o de cÃ³digo.

---

# O que Ã© uma Engine?

Uma Engine Ã© um componente responsÃ¡vel por executar uma Ãºnica responsabilidade de negÃ³cio.

Ela recebe dados, processa informaÃ§Ãµes e produz um resultado.

Uma Engine nunca deverÃ¡ possuir responsabilidades que pertenÃ§am a outro mÃ³dulo.

---

# Responsabilidade Ãšnica

Cada Engine deverÃ¡ possuir apenas uma responsabilidade claramente definida.

Exemplos:

Corporate Action Engine

ResponsÃ¡vel apenas por interpretar eventos corporativos.

---

Portfolio Consolidation Engine

ResponsÃ¡vel apenas por consolidar posiÃ§Ãµes.

---

Portfolio Decision Engine

ResponsÃ¡vel apenas por gerar recomendaÃ§Ãµes.

---

Insight Engine

ResponsÃ¡vel apenas por transformar resultados em informaÃ§Ãµes Ãºteis ao usuÃ¡rio.

---

# PrincÃ­pios

Toda Engine deverÃ¡ ser:

- determinÃ­stica;
- idempotente;
- auditÃ¡vel;
- desacoplada;
- reutilizÃ¡vel;
- testÃ¡vel;
- independente da interface;
- independente do banco de dados.

---

# Fluxo Geral

Toda Engine deverÃ¡ seguir o mesmo fluxo:

Receber dados

â†“

Validar entradas

â†“

Executar processamento

â†“

Validar resultados

â†“

Produzir saÃ­da

â†“

Registrar informaÃ§Ãµes necessÃ¡rias

---

# Entradas

As entradas deverÃ£o ser explÃ­citas.

Uma Engine nunca deverÃ¡ buscar dados diretamente em componentes visuais.

Sempre deverÃ¡ receber todas as informaÃ§Ãµes necessÃ¡rias.

---

# SaÃ­das

Toda Engine deverÃ¡ produzir uma saÃ­da padronizada.

Nunca deverÃ¡ modificar diretamente:

- interface;
- banco de dados;
- componentes React;
- telas.

---

# ComunicaÃ§Ã£o

Engines nunca deverÃ£o chamar diretamente outras Engines.

A coordenaÃ§Ã£o serÃ¡ realizada pelo Orchestrator do sistema.

---

# Tratamento de Erros

Toda Engine deverÃ¡ retornar erros estruturados.

Nunca lanÃ§ar mensagens genÃ©ricas.

Sempre informar:

- origem;
- motivo;
- impacto;
- aÃ§Ã£o sugerida.

---

# Logs

Sempre que necessÃ¡rio registrar:

- horÃ¡rio;
- operaÃ§Ã£o;
- resultado;
- duraÃ§Ã£o;
- erros.

---

# Performance

Toda Engine deverÃ¡ evitar:

- processamento duplicado;
- consultas repetidas;
- cÃ¡lculos desnecessÃ¡rios.

---

# ReutilizaÃ§Ã£o

Uma Engine nunca deverÃ¡ conter lÃ³gica duplicada.

Caso um algoritmo seja utilizado por mais de uma Engine, ele deverÃ¡ ser extraÃ­do para um mÃ³dulo compartilhado.

---

# Testabilidade

Toda Engine deverÃ¡ permitir testes independentes.

Nenhum teste deverÃ¡ depender da interface grÃ¡fica.

---

# Escalabilidade

Novas funcionalidades deverÃ£o ser adicionadas sem modificar Engines existentes sempre que possÃ­vel.

O sistema deverÃ¡ favorecer extensÃ£o em vez de alteraÃ§Ã£o.

---

# Versionamento

MudanÃ§as incompatÃ­veis deverÃ£o gerar nova versÃ£o da Engine.

AlteraÃ§Ãµes pequenas deverÃ£o preservar compatibilidade.

---

# DependÃªncias Permitidas

Uma Engine poderÃ¡ depender apenas de:

- modelos de domÃ­nio;
- utilitÃ¡rios compartilhados;
- algoritmos oficiais;
- configuraÃ§Ãµes do sistema.

---

# DependÃªncias Proibidas

Uma Engine nunca deverÃ¡ depender diretamente de:

- componentes React;
- pÃ¡ginas;
- hooks de interface;
- estilos;
- elementos visuais.

---

# Ordem de ExecuÃ§Ã£o

A execuÃ§Ã£o das Engines serÃ¡ coordenada pelo Engine Orchestrator.

Nenhuma Engine deverÃ¡ assumir que outra jÃ¡ foi executada.

---

# DocumentaÃ§Ã£o ObrigatÃ³ria

Toda nova Engine deverÃ¡ possuir:

- objetivo;
- responsabilidade;
- entradas;
- saÃ­das;
- princÃ­pios;
- fluxo;
- dependÃªncias;
- limitaÃ§Ãµes;
- histÃ³rico de versÃµes.

---

# DecisÃµes de Projeto

## Por que padronizar todas as Engines?

Para manter a arquitetura consistente e facilitar a evoluÃ§Ã£o do projeto.

---

## Por que impedir dependÃªncias da interface?

Porque regras de negÃ³cio devem permanecer independentes da tecnologia utilizada.

---

## Por que utilizar um Orchestrator?

Para evitar acoplamento entre Engines e permitir reorganizar fluxos sem modificar cada Engine individualmente.

---

# HistÃ³rico

## VersÃ£o 1.0

CriaÃ§Ã£o das diretrizes oficiais para desenvolvimento das Engines do Lio Feliz.

## Fonte: docs\07_TECHNICAL_ANNEXES\00_INDEX.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 07_TECHNICAL_ANNEXES/00_INDEX.md

**Projeto:** Lio Feliz

**Documento:** 07_TECHNICAL_ANNEXES/00_INDEX.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

Esta pasta reÃºne todos os anexos tÃ©cnicos do Lio Feliz.

Os anexos tÃ©cnicos complementam a documentaÃ§Ã£o oficial descrevendo algoritmos, fÃ³rmulas matemÃ¡ticas, pseudocÃ³digo, fluxos internos, exemplos completos e decisÃµes de implementaÃ§Ã£o.

Enquanto as Regras de NegÃ³cio descrevem o comportamento esperado do sistema, os Anexos TÃ©cnicos descrevem como esse comportamento deverÃ¡ ser implementado.

---

# Hierarquia

Em caso de conflito entre documentos, deverÃ¡ ser seguida a seguinte prioridade:

1. 00_START_HERE.md
2. 01_VISION.md
3. 02_PROJECT_RULES.md
4. 03_PRODUCT_REQUIREMENTS.md
5. 04_DATA_MODEL.md
6. 05_SYSTEM_ARCHITECTURE.md
7. 06_BUSINESS_RULES/
8. 07_TECHNICAL_ANNEXES/

Os anexos tÃ©cnicos nunca poderÃ£o alterar uma regra de negÃ³cio.

Eles apenas especificam sua implementaÃ§Ã£o.

---

# Estrutura Inicial

07_TECHNICAL_ANNEXES/

00_INDEX.md

00_ENGINE_GUIDELINES.md

01_PRICE_AVERAGE_ALGORITHMS.md

02_CORPORATE_ACTION_ENGINE.md

03_PORTFOLIO_CONSOLIDATION_ENGINE.md

04_INSIGHT_ENGINE.md

05_ENGINE_ORCHESTRATOR.md

06_HEALTH_ENGINE.md

03_REBALANCING_ALGORITHMS.md

04_IR_CALCULATIONS.md

05_CORPORATE_ACTION_EXAMPLES.md

06_CURRENCY_CONVERSION.md

07_PERFORMANCE_GUIDELINES.md

Novos anexos poderÃ£o ser adicionados futuramente.

---

# Objetivos dos Anexos

Cada anexo deverÃ¡ conter sempre que possÃ­vel:

- algoritmo completo;
- pseudocÃ³digo;
- fÃ³rmulas;
- exemplos;
- casos extremos;
- exceÃ§Ãµes;
- impacto em outros mÃ³dulos;
- justificativa tÃ©cnica.

---

# PrincÃ­pios

Os algoritmos deverÃ£o ser:

- determinÃ­sticos;
- reproduzÃ­veis;
- auditÃ¡veis;
- independentes da interface;
- independentes do banco de dados.

---

# HistÃ³rico

## VersÃ£o 1.0

CriaÃ§Ã£o da estrutura oficial dos anexos tÃ©cnicos.

## Fonte: docs\07_TECHNICAL_ANNEXES\01_PRICE_AVERAGE_ALGORITHMS.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 07_TECHNICAL_ANNEXES/01_PRICE_AVERAGE_ALGORITHMS.md

**Projeto:** Lio Feliz

**Documento:** 01_PRICE_AVERAGE_ALGORITHMS.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

Este documento define o algoritmo oficial de cÃ¡lculo do preÃ§o mÃ©dio utilizado pelo Lio Feliz.

Toda implementaÃ§Ã£o deverÃ¡ produzir exatamente os mesmos resultados descritos neste documento.

---

# Escopo

Este algoritmo Ã© utilizado para:

- consolidaÃ§Ã£o da carteira;
- cÃ¡lculo do patrimÃ´nio;
- cÃ¡lculo da rentabilidade;
- cÃ¡lculo do custo investido;
- cÃ¡lculo do Imposto de Renda;
- cÃ¡lculo do rebalanceamento.

---

# DefiniÃ§Ãµes

## Quantidade

NÃºmero atual de unidades do ativo.

---

## Custo Total

Valor efetivamente investido na posiÃ§Ã£o.

Inclui apenas operaÃ§Ãµes que alteram o custo de aquisiÃ§Ã£o.

---

## PreÃ§o MÃ©dio

PreÃ§o MÃ©dio = Custo Total / Quantidade Atual

Sempre que Quantidade = 0:

PreÃ§o MÃ©dio = 0

---

# PrincÃ­pios

O algoritmo deve ser:

- determinÃ­stico;
- reproduzÃ­vel;
- auditÃ¡vel;
- independente da interface;
- independente do banco de dados.

---

# OperaÃ§Ãµes que ALTERAM o preÃ§o mÃ©dio

## Compra

Aumenta:

- quantidade;
- custo total.

Novo cÃ¡lculo:

Quantidade Nova =
Quantidade Atual + Quantidade Comprada

Custo Novo =
Custo Atual + Valor da Compra

PreÃ§o MÃ©dio =
Custo Novo / Quantidade Nova

---

## Venda

A venda NÃƒO recalcula o preÃ§o mÃ©dio.

Ela apenas reduz:

- quantidade;
- custo total proporcional.

Exemplo:

100 aÃ§Ãµes

PreÃ§o mÃ©dio:

R$ 20,00

Venda:

20 aÃ§Ãµes

Quantidade:

80

PreÃ§o mÃ©dio continua:

R$ 20,00

---

## Encerramento da posiÃ§Ã£o

Quando:

Quantidade = 0

O sistema deverÃ¡:

zerar

- quantidade;
- custo;
- preÃ§o mÃ©dio.

O histÃ³rico deverÃ¡ permanecer preservado.

---

# OperaÃ§Ãµes que NÃƒO alteram o preÃ§o mÃ©dio

Dividendos

JCP

Rendimentos

AmortizaÃ§Ãµes em dinheiro

Esses eventos representam entrada de recursos.

NÃ£o alteram custo de aquisiÃ§Ã£o.

---

# Eventos Corporativos

## BonificaÃ§Ã£o

Aumenta quantidade.

NÃ£o altera custo total.

Consequentemente reduz o preÃ§o mÃ©dio.

---

Exemplo

100 aÃ§Ãµes

PreÃ§o mÃ©dio:

R$ 10

BonificaÃ§Ã£o:

10%

Nova quantidade:

110

Novo custo:

R$ 1.000

Novo preÃ§o mÃ©dio:

R$ 9,090909...

---

## Desdobramento

Mesmo princÃ­pio da bonificaÃ§Ã£o.

Quantidade aumenta.

Custo permanece.

PreÃ§o mÃ©dio diminui proporcionalmente.

---

## Grupamento

Quantidade diminui.

Custo permanece.

PreÃ§o mÃ©dio aumenta proporcionalmente.

---

## SubscriÃ§Ã£o

SerÃ¡ tratada como uma nova compra.

Segue exatamente o algoritmo de compra.

---

## IncorporaÃ§Ã£o

A regra dependerÃ¡ do fator de conversÃ£o.

SerÃ¡ especificada no anexo:

05_CORPORATE_ACTION_EXAMPLES.md

---

## CisÃ£o

Segue regras especÃ­ficas.

NÃ£o altera este algoritmo.

---

# Ativos Internacionais

O cÃ¡lculo do preÃ§o mÃ©dio ocorre sempre na moeda original do ativo.

ConversÃµes cambiais nunca modificam o preÃ§o mÃ©dio.

A conversÃ£o ocorre apenas para apresentaÃ§Ã£o dos valores consolidados.

---

# Moedas

Cada posiÃ§Ã£o deverÃ¡ possuir:

- moeda original;
- custo original;
- preÃ§o mÃ©dio original.

Valores convertidos deverÃ£o ser calculados separadamente.

---

# PrecisÃ£o

Internamente os cÃ¡lculos deverÃ£o utilizar alta precisÃ£o.

Arredondamentos deverÃ£o ocorrer apenas na apresentaÃ§Ã£o ao usuÃ¡rio.

---

# PseudocÃ³digo

```text
Para cada operaÃ§Ã£o:

se Compra:

quantidade += quantidadeCompra

custo += valorCompra

precoMedio = custo / quantidade

----------------------------

se Venda:

custo -= precoMedio * quantidadeVendida

quantidade -= quantidadeVendida

----------------------------

se BonificaÃ§Ã£o:

quantidade += quantidadeBonificada

precoMedio = custo / quantidade

----------------------------

se Desdobramento:

quantidade *= fator

precoMedio = custo / quantidade

----------------------------

se Grupamento:

quantidade /= fator

precoMedio = custo / quantidade
```

---

# Casos Especiais

## Venda superior Ã  posiÃ§Ã£o

Nunca permitida.

DeverÃ¡ gerar erro.

---

## Quantidade negativa

Nunca permitida.

---

## Custo negativo

Nunca permitido.

---

## PreÃ§o mÃ©dio negativo

Nunca permitido.

---

# Casos de Teste

Caso 1

Compra

100

R$10

Resultado

Quantidade:

100

PreÃ§o mÃ©dio:

10

---

Compra

100

R$20

Resultado

Quantidade:

200

PreÃ§o mÃ©dio:

15

---

Venda

50

Resultado

Quantidade:

150

PreÃ§o mÃ©dio:

15

---

BonificaÃ§Ã£o

10%

Resultado

Quantidade:

165

PreÃ§o mÃ©dio:

13,636363...

---

Desdobramento

2:1

Quantidade:

330

PreÃ§o mÃ©dio:

6,818181...

---

Grupamento

10:1

Quantidade:

33

PreÃ§o mÃ©dio:

68,181818...

---

# DecisÃµes de Projeto

## Por que vendas nÃ£o recalculam o preÃ§o mÃ©dio?

Porque o custo da posiÃ§Ã£o remanescente permanece proporcional ao custo original das aÃ§Ãµes ainda mantidas.

Essa metodologia segue a prÃ¡tica adotada na tributaÃ§Ã£o brasileira.

---

## Por que dividendos nÃ£o reduzem o preÃ§o mÃ©dio?

Porque representam rendimento financeiro, e nÃ£o reduÃ§Ã£o do custo de aquisiÃ§Ã£o.

---

## Por que utilizar a moeda original?

Porque evita distorÃ§Ãµes causadas pela variaÃ§Ã£o cambial.

O cÃ¢mbio influencia apenas a consolidaÃ§Ã£o patrimonial.

---

# Impacto em Outros MÃ³dulos

Este algoritmo Ã© utilizado por:

- Carteira
- Rebalanceamento
- PatrimÃ´nio
- Rentabilidade
- RelatÃ³rios
- Imposto de Renda

Qualquer alteraÃ§Ã£o neste documento poderÃ¡ impactar diretamente todos esses mÃ³dulos.

---

# HistÃ³rico

## VersÃ£o 1.0

CriaÃ§Ã£o do algoritmo oficial de cÃ¡lculo do preÃ§o mÃ©dio.

## Fonte: docs\07_TECHNICAL_ANNEXES\02_CORPORATE_ACTION_ENGINE.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 07_TECHNICAL_ANNEXES/02_CORPORATE_ACTION_ENGINE.md

**Projeto:** Lio Feliz

**Documento:** 02_CORPORATE_ACTION_ENGINE.md

**VersÃ£o:** 1.1

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 09/07/2026

---

# Objetivo

Este documento define a arquitetura oficial da Engine de Eventos Corporativos do Lio Feliz.

A Engine de Eventos Corporativos Ã© o Ãºnico componente autorizado a interpretar e aplicar eventos corporativos que afetem ativos financeiros.

Nenhum outro mÃ³dulo poderÃ¡ implementar regras prÃ³prias para esses eventos.

---

# Objetivo da Engine

Centralizar toda a lÃ³gica relacionada a eventos corporativos para garantir:

- consistÃªncia;
- rastreabilidade;
- reutilizaÃ§Ã£o;
- facilidade de manutenÃ§Ã£o;
- conformidade tributÃ¡ria.

---

# Escopo

A Engine serÃ¡ responsÃ¡vel por interpretar, validar e aplicar eventos como:

- Desdobramentos (Split);
- Grupamentos (Reverse Split);
- BonificaÃ§Ãµes;
- SubscriÃ§Ãµes;
- IncorporaÃ§Ãµes;
- FusÃµes;
- CisÃµes.

Novos eventos poderÃ£o ser adicionados futuramente sem alterar a arquitetura principal.

---

# PrincÃ­pios

A Engine deverÃ¡ ser:

- determinÃ­stica;
- auditÃ¡vel;
- idempotente;
- modular;
- independente da interface;
- independente do banco de dados.

---

# Fluxo Geral

Todo evento seguirÃ¡ obrigatoriamente o fluxo abaixo:

Recebimento do evento

â†“

ValidaÃ§Ã£o

â†“

ClassificaÃ§Ã£o

â†“

AplicaÃ§Ã£o das regras

â†“

GeraÃ§Ã£o das alteraÃ§Ãµes

â†“

AtualizaÃ§Ã£o das posiÃ§Ãµes

â†“

AtualizaÃ§Ã£o do histÃ³rico

â†“

AtualizaÃ§Ã£o do patrimÃ´nio

â†“

AtualizaÃ§Ã£o dos mÃ³dulos dependentes

---

# Fonte dos Eventos

Os eventos poderÃ£o ser obtidos de:

- APIs financeiras;
- integraÃ§Ã£o com corretoras;
- integraÃ§Ã£o com a B3;
- importaÃ§Ãµes de arquivos;
- cadastro manual (quando permitido).

Toda origem deverÃ¡ ser registrada.

---

# ClassificaÃ§Ã£o

Todo evento deverÃ¡ possuir obrigatoriamente:

- identificador Ãºnico;
- tipo;
- ativo afetado;
- data de aprovaÃ§Ã£o;
- data de efetivaÃ§Ã£o;
- origem;
- status.

---

# Regras Gerais

Cada tipo de evento possuirÃ¡ um processador especÃ­fico.

Exemplo:

SplitProcessor

BonusProcessor

SubscriptionProcessor

MergerProcessor

Etc.

Nenhum processador poderÃ¡ modificar regras pertencentes a outro.

---

# Resultado do Processamento

Todo evento deverÃ¡ produzir um conjunto padronizado de alteraÃ§Ãµes.

Exemplo:

- alteraÃ§Ã£o de quantidade;
- alteraÃ§Ã£o de custo;
- alteraÃ§Ã£o de ticker;
- alteraÃ§Ã£o de moeda;
- atualizaÃ§Ã£o de histÃ³rico.

---

# Rastreabilidade

Toda alteraÃ§Ã£o deverÃ¡ registrar:

- evento de origem;
- data;
- usuÃ¡rio (quando aplicÃ¡vel);
- regra aplicada;
- resultado produzido.

Nenhuma alteraÃ§Ã£o poderÃ¡ ocorrer sem rastreabilidade.

---

# Tratamento de Erros

Caso um evento nÃ£o possa ser interpretado:

- nenhuma alteraÃ§Ã£o serÃ¡ aplicada;
- o evento serÃ¡ marcado como pendente;
- serÃ¡ gerado um log detalhado;
- o usuÃ¡rio poderÃ¡ revisar posteriormente.

---

# IntegraÃ§Ã£o com Outros MÃ³dulos

A Engine fornecerÃ¡ informaÃ§Ãµes para:

- Carteira;
- HistÃ³rico;
- PatrimÃ´nio;
- Rebalanceamento;
- Imposto de Renda;
- Dashboard;
- RelatÃ³rios.

Nenhum desses mÃ³dulos deverÃ¡ implementar lÃ³gica prÃ³pria para eventos corporativos.

---

# Compatibilidade Internacional

A arquitetura deverÃ¡ permitir eventos de diferentes mercados.

Cada paÃ­s poderÃ¡ possuir processadores especÃ­ficos.

A interface da Engine permanecerÃ¡ a mesma.

---

# Casos Especiais

A Engine deverÃ¡ suportar:

- mÃºltiplos eventos no mesmo dia;
- eventos retroativos;
- correÃ§Ãµes de eventos;
- cancelamentos;
- eventos parciais;
- ativos fracionÃ¡rios.

---

# DecisÃµes de Projeto

## Por que existe uma Engine especÃ­fica?

Porque eventos corporativos afetam diversos mÃ³dulos simultaneamente.

Centralizar essa lÃ³gica evita duplicaÃ§Ã£o e inconsistÃªncias.

---

## Por que utilizar processadores separados?

Cada evento possui regras prÃ³prias.

Separar os processadores reduz acoplamento e facilita manutenÃ§Ã£o.

---

## Por que manter rastreabilidade completa?

Para permitir auditoria, depuraÃ§Ã£o e conformidade fiscal.

---

# PreparaÃ§Ã£o para Crescimento

A arquitetura foi projetada para suportar:

- novos mercados;
- novos tipos de ativos;
- novos eventos corporativos;
- mÃºltiplas integraÃ§Ãµes;
- mÃºltiplas carteiras.

---

# HistÃ³rico

## VersÃ£o 1.1

- Removidos Dividendos e JCP do escopo da Engine.
- Corporate Action Engine agora responsÃ¡vel apenas por eventos societÃ¡rios.
- Dividendos e JCP serÃ£o tratados futuramente pela Proventos Engine.

## VersÃ£o 1.0

- CriaÃ§Ã£o da arquitetura oficial da Engine de Eventos Corporativos.
- DefiniÃ§Ã£o do fluxo padrÃ£o de processamento.
- CentralizaÃ§Ã£o das regras de eventos corporativos.

## Fonte: docs\07_TECHNICAL_ANNEXES\03_PORTFOLIO_CONSOLIDATION_ENGINE.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 07_TECHNICAL_ANNEXES/03_PORTFOLIO_CONSOLIDATION_ENGINE.md

**Projeto:** Lio Feliz

**Documento:** 03_PORTFOLIO_CONSOLIDATION_ENGINE.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

Este documento define a arquitetura oficial da Portfolio Consolidation Engine.

A Portfolio Consolidation Engine Ã© responsÃ¡vel por transformar movimentaÃ§Ãµes financeiras e eventos corporativos na posiÃ§Ã£o consolidada da carteira.

Ela representa a Ãºnica fonte oficial para cÃ¡lculo das posiÃ§Ãµes do usuÃ¡rio.

Nenhum outro mÃ³dulo poderÃ¡ consolidar posiÃ§Ãµes utilizando lÃ³gica prÃ³pria.

---

# Responsabilidades

A Engine deverÃ¡:

- consolidar posiÃ§Ãµes;
- calcular custo total;
- calcular preÃ§o mÃ©dio;
- calcular quantidade;
- calcular patrimÃ´nio;
- calcular lucro nÃ£o realizado;
- calcular rentabilidade;
- calcular alocaÃ§Ã£o;
- produzir o estado atual da carteira.

---

# Entradas

A Engine receberÃ¡ dados exclusivamente de:

- mÃ³dulo de movimentaÃ§Ãµes;
- Corporate Action Engine;
- serviÃ§o de cotaÃ§Ãµes;
- configuraÃ§Ãµes do usuÃ¡rio.

---

# SaÃ­das

A Engine produzirÃ¡:

- posiÃ§Ãµes consolidadas;
- patrimÃ´nio consolidado;
- custo investido;
- preÃ§o mÃ©dio;
- quantidade por ativo;
- lucro/prejuÃ­zo nÃ£o realizado;
- percentuais de alocaÃ§Ã£o;
- histÃ³rico consolidado.

---

# Fluxo Oficial

Toda consolidaÃ§Ã£o deverÃ¡ seguir obrigatoriamente esta ordem:

1. Carregar movimentaÃ§Ãµes vÃ¡lidas.
2. Aplicar eventos corporativos.
3. Validar consistÃªncia.
4. Consolidar quantidades.
5. Consolidar custos.
6. Calcular preÃ§os mÃ©dios.
7. Buscar cotaÃ§Ãµes.
8. Calcular patrimÃ´nio.
9. Calcular alocaÃ§Ã£o.
10. Publicar resultado.

A ordem nunca poderÃ¡ ser alterada.

---

# Fonte de Verdade

A posiÃ§Ã£o consolidada produzida por esta Engine serÃ¡ considerada a Ãºnica fonte oficial para:

- Carteira;
- Dashboard;
- Rebalanceamento;
- Dividendos;
- Imposto de Renda;
- RelatÃ³rios;
- Metas.

---

# Regras

A Engine nunca poderÃ¡:

- modificar movimentaÃ§Ãµes;
- interpretar eventos corporativos;
- importar dados externos;
- alterar configuraÃ§Ãµes.

Sua responsabilidade Ã© apenas consolidar.

---

# Recalculo

Sempre que ocorrer:

- nova compra;
- nova venda;
- novo evento corporativo;
- alteraÃ§Ã£o manual aprovada;
- sincronizaÃ§Ã£o concluÃ­da;

a consolidaÃ§Ã£o deverÃ¡ ser refeita automaticamente.

---

# Performance

A Engine deverÃ¡ produzir exatamente o mesmo resultado independentemente do nÃºmero de execuÃ§Ãµes.

Ela deverÃ¡ ser idempotente.

---

# Casos Especiais

DeverÃ¡ suportar:

- mÃºltiplas moedas;
- ativos internacionais;
- ativos fracionÃ¡rios;
- ativos sem cotaÃ§Ã£o;
- ativos temporariamente suspensos;
- mÃºltiplas carteiras (futuro).

---

# DecisÃµes de Projeto

## Por que existe uma Engine especÃ­fica?

Para impedir que diferentes mÃ³dulos calculem a carteira de maneiras diferentes.

---

## Por que recalcular em vez de armazenar?

Porque as movimentaÃ§Ãµes sÃ£o a fonte de verdade.

A carteira sempre pode ser reconstruÃ­da.

---

## Por que os outros mÃ³dulos nÃ£o podem consolidar posiÃ§Ãµes?

Porque isso criaria inconsistÃªncias entre patrimÃ´nio, IR, dashboard e relatÃ³rios.

---

# Impacto

Este documento Ã© utilizado diretamente por:

- 01_PORTFOLIO.md
- REBALANCING
- IR
- DASHBOARD
- REPORTS
- GOALS

---

# HistÃ³rico

## VersÃ£o 1.0

CriaÃ§Ã£o da arquitetura oficial da Portfolio Consolidation Engine.

## Fonte: docs\07_TECHNICAL_ANNEXES\04_INSIGHT_ENGINE.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 07_TECHNICAL_ANNEXES/04_INSIGHT_ENGINE.md

**Projeto:** Lio Feliz

**Documento:** 04_INSIGHT_ENGINE.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

A Insight Engine Ã© responsÃ¡vel por transformar dados tÃ©cnicos produzidos pelas demais Engines em informaÃ§Ãµes claras, resumidas e acionÃ¡veis para o usuÃ¡rio.

Ela nunca executa cÃ¡lculos financeiros.

Sua funÃ§Ã£o Ã© interpretar resultados, identificar o que realmente merece atenÃ§Ã£o e apresentar isso da forma mais Ãºtil possÃ­vel.

---

# Filosofia

O tempo do investidor Ã© um ativo valioso.

A Insight Engine deve reduzir o tempo necessÃ¡rio para compreender a situaÃ§Ã£o da carteira.

Ela nunca deverÃ¡ gerar excesso de notificaÃ§Ãµes.

Sempre que possÃ­vel deverÃ¡ resumir diversas informaÃ§Ãµes em um Ãºnico Insight.

---

# Responsabilidades

A Insight Engine deverÃ¡:

- analisar resultados produzidos pelas outras Engines;
- agrupar informaÃ§Ãµes relacionadas;
- eliminar informaÃ§Ãµes redundantes;
- priorizar assuntos relevantes;
- produzir Insights claros;
- produzir resumos mensais;
- produzir alertas crÃ­ticos quando necessÃ¡rio.

---

# Fontes de Dados

A Insight Engine poderÃ¡ consumir informaÃ§Ãµes provenientes de:

- Portfolio Consolidation Engine;
- Portfolio Decision Engine;
- Corporate Action Engine;
- Tax Engine;
- Import & Sync Engine;
- Sistema de Metas;
- ServiÃ§o de CotaÃ§Ãµes.

Ela nunca consulta diretamente bancos de dados ou APIs externas.

---

# Tipos de Insight

## CrÃ­tico

Requer aÃ§Ã£o imediata.

Exemplos:

- divergÃªncia na sincronizaÃ§Ã£o;
- erro na consolidaÃ§Ã£o;
- inconsistÃªncia de dados;
- DARF vencendo;
- cÃ¡lculo tributÃ¡rio pendente.

---

## Importante

Requer atenÃ§Ã£o, mas nÃ£o urgÃªncia.

Exemplos:

- resumo mensal de dividendos;
- patrimÃ´nio atualizado;
- rebalanceamento sugerido;
- evento corporativo relevante.

---

## Informativo

NÃ£o exige aÃ§Ã£o.

Serve apenas para manter o usuÃ¡rio informado.

Exemplos:

- evoluÃ§Ã£o patrimonial;
- novos ativos adicionados;
- estatÃ­sticas.

---

# Agrupamento

Sempre que possÃ­vel, diversos eventos deverÃ£o ser transformados em um Ãºnico Insight.

Exemplo:

Em vez de:

- 12 dividendos recebidos.

O sistema deverÃ¡ apresentar:

Resumo dos dividendos do mÃªs.

---

# FrequÃªncia

O sistema deverÃ¡ evitar apresentar informaÃ§Ãµes repetidas.

Um mesmo Insight somente deverÃ¡ reaparecer quando houver alteraÃ§Ã£o relevante.

---

# Resumos

A Insight Engine deverÃ¡ produzir automaticamente:

- resumo mensal de dividendos;
- resumo patrimonial;
- resumo de rentabilidade;
- resumo tributÃ¡rio;
- resumo das sincronizaÃ§Ãµes.

---

# Painel Inicial

Ao acessar o sistema, o usuÃ¡rio deverÃ¡ visualizar um resumo simples.

Exemplo:

Tudo certo com sua carteira.

Nenhuma aÃ§Ã£o necessÃ¡ria.

Ou:

Existem 2 assuntos que merecem sua atenÃ§Ã£o.

- DARF estimada para este mÃªs.
- Carteira distante da alocaÃ§Ã£o alvo.

---

# IntegraÃ§Ã£o

Os Insights poderÃ£o ser utilizados por:

- Dashboard;
- PÃ¡gina inicial;
- Central de Insights;
- RelatÃ³rios;
- E-mails futuros (opcional).

---

# O que NÃƒO deve gerar Insight

NÃ£o deverÃ£o ser apresentados automaticamente:

- pequenas oscilaÃ§Ãµes de preÃ§o;
- pequenas mudanÃ§as de patrimÃ´nio;
- pequenas alteraÃ§Ãµes na alocaÃ§Ã£o;
- eventos irrelevantes.

Essas informaÃ§Ãµes continuarÃ£o disponÃ­veis em seus respectivos mÃ³dulos.

---

# PersonalizaÃ§Ã£o

O usuÃ¡rio poderÃ¡ definir:

- frequÃªncia dos resumos;
- tipos de Insight desejados;
- ocultar categorias especÃ­ficas;
- prioridade de exibiÃ§Ã£o.

Essas configuraÃ§Ãµes nunca alterarÃ£o os cÃ¡lculos do sistema.

---

# DecisÃµes de Projeto

## Por que utilizar uma Insight Engine?

Para separar cÃ¡lculos financeiros da comunicaÃ§Ã£o com o usuÃ¡rio.

---

## Por que resumir informaÃ§Ãµes?

Porque excesso de notificaÃ§Ãµes reduz a atenÃ§Ã£o do usuÃ¡rio.

---

## Por que priorizar apenas informaÃ§Ãµes relevantes?

Porque o objetivo do Lio Feliz Ã© economizar tempo do investidor.

---

# ReferÃªncias

Este documento depende de:

- Portfolio Consolidation Engine;
- Portfolio Decision Engine;
- Corporate Action Engine;
- Tax Engine.

---

# HistÃ³rico

## VersÃ£o 1.0

CriaÃ§Ã£o da Insight Engine.
DefiniÃ§Ã£o da filosofia de comunicaÃ§Ã£o do sistema.

## Fonte: docs\07_TECHNICAL_ANNEXES\05_ENGINE_ORCHESTRATOR.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 07_TECHNICAL_ANNEXES/05_ENGINE_ORCHESTRATOR.md

**Projeto:** Lio Feliz

**Documento:** 05_ENGINE_ORCHESTRATOR.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

O Engine Orchestrator Ã© responsÃ¡vel por coordenar toda a execuÃ§Ã£o das Engines do sistema.

Ele nÃ£o realiza cÃ¡lculos financeiros.

Ele nÃ£o possui regras tributÃ¡rias.

Ele nÃ£o modifica a carteira.

Sua Ãºnica responsabilidade Ã© controlar quando cada Engine deve executar.

---

# Filosofia

Cada Engine resolve um problema.

O Orchestrator resolve a ordem dos problemas.

---

# Responsabilidades

- iniciar fluxos automÃ¡ticos;
- iniciar fluxos manuais;
- controlar dependÃªncias;
- impedir execuÃ§Ãµes desnecessÃ¡rias;
- registrar histÃ³rico das execuÃ§Ãµes;
- controlar prioridades;
- controlar reprocessamentos;
- garantir consistÃªncia entre Engines.

---

# PrincÃ­pios

O Orchestrator deverÃ¡ ser:

- determinÃ­stico;
- previsÃ­vel;
- resiliente;
- auditÃ¡vel;
- desacoplado.

---

# Fluxo Principal

Sempre que ocorrer uma sincronizaÃ§Ã£o completa:

Import & Sync Engine

â†“

Corporate Action Engine

â†“

Portfolio Consolidation Engine

â†“

Tax Engine

â†“

Portfolio Decision Engine

â†“

Insight Engine

â†“

Health Engine

â†“

AtualizaÃ§Ã£o da Interface

---

# ExecuÃ§Ã£o Parcial

Nem todas as Engines precisam executar sempre.

Exemplo:

MudanÃ§a apenas de cotaÃ§Ã£o.

â†“

Portfolio Consolidation Engine

â†“

Portfolio Decision Engine

â†“

Insight Engine

Sem necessidade de recalcular IR.

---

# DependÃªncias

Nenhuma Engine deverÃ¡ chamar outra Engine diretamente.

Toda coordenaÃ§Ã£o deverÃ¡ passar pelo Orchestrator.

---

# Gatilhos

O Orchestrator poderÃ¡ iniciar execuÃ§Ãµes por:

- sincronizaÃ§Ã£o automÃ¡tica;
- sincronizaÃ§Ã£o manual;
- nova operaÃ§Ã£o;
- evento corporativo;
- atualizaÃ§Ã£o de cotaÃ§Ãµes;
- alteraÃ§Ã£o de estratÃ©gia;
- importaÃ§Ã£o de carteira;
- restauraÃ§Ã£o de backup;
- atualizaÃ§Ã£o de configuraÃ§Ãµes.

---

# Auto Recovery

Sempre que possÃ­vel o Orchestrator deverÃ¡ tentar recuperar falhas automaticamente.

Exemplo:

Falha em um provedor.

â†“

Trocar provedor.

â†“

Reexecutar apenas a Engine afetada.

---

# Reprocessamento

Caso uma Engine falhe, somente ela deverÃ¡ ser reexecutada.

Nunca reiniciar todo o fluxo sem necessidade.

---

# ExecuÃ§Ãµes AssÃ­ncronas

Sempre que possÃ­vel as Engines independentes poderÃ£o executar em paralelo.

Exemplo:

AtualizaÃ§Ã£o de cotaÃ§Ãµes.

AtualizaÃ§Ã£o do dÃ³lar.

AtualizaÃ§Ã£o dos Ã­ndices.

Esses processos poderÃ£o ocorrer simultaneamente.

---

# Registro de ExecuÃ§Ãµes

Cada execuÃ§Ã£o deverÃ¡ registrar:

- data;
- hora;
- Engine executada;
- duraÃ§Ã£o;
- resultado;
- falhas;
- tentativas de recuperaÃ§Ã£o.

---

# Monitoramento

O Orchestrator fornecerÃ¡ informaÃ§Ãµes para a Health Engine.

Exemplo:

Ãšltima sincronizaÃ§Ã£o.

Tempo mÃ©dio.

Falhas recorrentes.

---

# Extensibilidade

Novas Engines poderÃ£o ser adicionadas sem modificar as Engines existentes.

BastarÃ¡ registrÃ¡-las no fluxo do Orchestrator.

---

# DecisÃµes de Projeto

## Por que criar um Orchestrator?

Para impedir que Engines dependam umas das outras.

---

## Por que controlar dependÃªncias?

Para permitir evoluÃ§Ã£o futura sem reescrever mÃ³dulos existentes.

---

## Por que registrar execuÃ§Ãµes?

Para facilitar auditoria e diagnÃ³stico.

---

# HistÃ³rico

## VersÃ£o 1.0

CriaÃ§Ã£o do Engine Orchestrator.

## Fonte: docs\07_TECHNICAL_ANNEXES\06_HEALTH_ENGINE.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 07_TECHNICAL_ANNEXES/06_HEALTH_ENGINE.md

**Projeto:** Lio Feliz

**Documento:** 06_HEALTH_ENGINE.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

A Health Engine Ã© responsÃ¡vel por monitorar continuamente a saÃºde do sistema, verificar a integridade das informaÃ§Ãµes e detectar problemas antes que afetem o usuÃ¡rio.

Ela nÃ£o realiza cÃ¡lculos financeiros nem altera regras de negÃ³cio.

Seu objetivo Ã© garantir que todas as demais Engines possam operar de forma confiÃ¡vel.

---

# Filosofia

A complexidade pertence ao sistema, nunca ao usuÃ¡rio.

Sempre que possÃ­vel, o prÃ³prio sistema deverÃ¡ identificar, diagnosticar e corrigir problemas automaticamente.

O usuÃ¡rio somente serÃ¡ informado quando sua intervenÃ§Ã£o realmente for necessÃ¡ria.

---

# Responsabilidades

A Health Engine deverÃ¡:

- monitorar a execuÃ§Ã£o das Engines;
- verificar a integridade dos dados;
- detectar inconsistÃªncias;
- validar sincronizaÃ§Ãµes;
- acompanhar o funcionamento dos provedores externos;
- registrar falhas;
- acompanhar tentativas de recuperaÃ§Ã£o automÃ¡tica;
- gerar diagnÃ³sticos da aplicaÃ§Ã£o.

---

# Fontes de InformaÃ§Ã£o

A Health Engine poderÃ¡ consultar:

- Engine Orchestrator;
- Import & Sync Engine;
- Portfolio Consolidation Engine;
- Corporate Action Engine;
- Tax Engine;
- Insight Engine.

Ela nunca deverÃ¡ consultar diretamente APIs externas.

---

# VerificaÃ§Ãµes

Entre as verificaÃ§Ãµes periÃ³dicas poderÃ£o existir:

- Ãºltima sincronizaÃ§Ã£o;
- sucesso da Ãºltima atualizaÃ§Ã£o;
- falhas recorrentes;
- divergÃªncias de posiÃ§Ãµes;
- inconsistÃªncias matemÃ¡ticas;
- ativos sem cotaÃ§Ã£o;
- eventos corporativos pendentes;
- dados tributÃ¡rios incompletos;
- histÃ³rico corrompido.

---

# NÃ­veis de Severidade

## NÃ­vel 0

Tudo funcionando normalmente.

Nenhuma aÃ§Ã£o necessÃ¡ria.

---

## NÃ­vel 1

Problema resolvido automaticamente.

Nenhuma mensagem ao usuÃ¡rio.

Registrar apenas no histÃ³rico tÃ©cnico.

---

## NÃ­vel 2

Problema identificado.

Nova tentativa automÃ¡tica serÃ¡ realizada.

UsuÃ¡rio nÃ£o precisa agir.

---

## NÃ­vel 3

Problema persistente.

UsuÃ¡rio deverÃ¡ ser informado atravÃ©s da Insight Engine.

---

## NÃ­vel 4

Problema crÃ­tico.

A intervenÃ§Ã£o do usuÃ¡rio Ã© obrigatÃ³ria.

---

# Auto Recovery

Sempre que possÃ­vel deverÃ£o ser realizadas aÃ§Ãµes automÃ¡ticas, como:

- trocar o provedor de mercado;
- repetir sincronizaÃ§Ãµes;
- recalcular posiÃ§Ãµes;
- reconstruir Ã­ndices internos;
- validar novamente operaÃ§Ãµes.

---

# HistÃ³rico TÃ©cnico

A Health Engine manterÃ¡ registros contendo:

- data;
- hora;
- Engine envolvida;
- duraÃ§Ã£o;
- resultado;
- tentativas realizadas;
- soluÃ§Ã£o aplicada.

---

# Indicadores de SaÃºde

A aplicaÃ§Ã£o poderÃ¡ exibir indicadores como:

- Ãºltima sincronizaÃ§Ã£o;
- tempo desde a Ãºltima atualizaÃ§Ã£o;
- status geral;
- quantidade de problemas pendentes;
- quantidade de recuperaÃ§Ãµes automÃ¡ticas.

---

# RelaÃ§Ã£o com a Insight Engine

A Health Engine nunca comunica diretamente com o usuÃ¡rio.

Ela apenas produz diagnÃ³sticos.

A Insight Engine decide se o usuÃ¡rio deverÃ¡ ser informado.

---

# RelaÃ§Ã£o com o Engine Orchestrator

Toda execuÃ§Ã£o deverÃ¡ ser acompanhada pela Health Engine.

Ela poderÃ¡ solicitar reprocessamentos quando necessÃ¡rio.

A decisÃ£o final continuarÃ¡ sendo do Engine Orchestrator.

---

# Extensibilidade

Novas verificaÃ§Ãµes poderÃ£o ser adicionadas sem alterar as existentes.

Cada rotina deverÃ¡ possuir responsabilidade Ãºnica.

---

# DecisÃµes de Projeto

## Por que separar Health Engine e Insight Engine?

Porque monitoramento e comunicaÃ§Ã£o possuem responsabilidades diferentes.

---

## Por que ocultar problemas resolvidos automaticamente?

Porque o objetivo do sistema Ã© reduzir a carga cognitiva do usuÃ¡rio.

---

## Por que registrar todas as falhas?

Para facilitar auditorias, diagnÃ³sticos e evoluÃ§Ã£o da plataforma.

---

# HistÃ³rico

## VersÃ£o 1.0

CriaÃ§Ã£o da Health Engine.

DefiniÃ§Ã£o oficial da estratÃ©gia de monitoramento e recuperaÃ§Ã£o automÃ¡tica.

## Fonte: docs\16_PRODUCT_BACKLOG.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 16_PRODUCT_BACKLOG.md

**Projeto:** Lio Feliz

**Documento:** 16_PRODUCT_BACKLOG.md

**VersÃ£o:** 1.4

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 09/07/2026

---

# Objetivo

Este documento registra todas as funcionalidades aprovadas para o Lio Feliz.

Ele representa o backlog oficial do produto.

Nenhuma funcionalidade aprovada deverÃ¡ existir apenas em conversas.

Toda funcionalidade deverÃ¡ ser registrada neste documento antes de sua implementaÃ§Ã£o.

---

# Ciclo de Vida das Funcionalidades

Toda funcionalidade deverÃ¡ seguir obrigatoriamente o fluxo:

ðŸ’¡ Ideia

â†“

âœ… Aprovada

â†“

ðŸ“ Documentada

â†“

ðŸ— Em Desenvolvimento

â†“

ðŸ§ª Testes

â†“

ðŸš€ Implementada

---

# Horizontes

**MLP** â€” Minimum Loveable Product: Funcionalidades essenciais para o lanÃ§amento.

**EvoluÃ§Ã£o** â€” Funcionalidades que expandem o sistema apÃ³s o MLP.

**VisÃ£o** â€” Funcionalidades de longo prazo que consolidam o sistema como plataforma completa.

---

# Prioridades

P0 â€” Essencial

P1 â€” Alta

P2 â€” MÃ©dia

P3 â€” Baixa

P4 â€” Futuro

PÃ³s-MLP â€” PÃ³s Minimum Loveable Product

---

# Categorias

- Arquitetura
- Arquitetura da DocumentaÃ§Ã£o
- Carteira
- Mercado
- Proventos
- Eventos Corporativos
- TributaÃ§Ã£o
- Vida Financeira
- UX
- Dashboard
- HistÃ³rico
- RelatÃ³rios
- IA
- AutomaÃ§Ã£o
- IntegraÃ§Ãµes
- MonetizaÃ§Ã£o
- SeguranÃ§a
- Performance
- Insights
- GovernanÃ§a da DocumentaÃ§Ã£o

---

# Funcionalidades

## FEAT-001

TÃ­tulo

Sistema de Assinaturas

Categoria

MonetizaÃ§Ã£o

Horizonte

MLP

Prioridade

P1

Status

ðŸ“ Documentada

DescriÃ§Ã£o

Permitir utilizaÃ§Ã£o do sistema atravÃ©s de planos gratuitos e Premium.

Documentos relacionados

15_PRODUCT_PHILOSOPHY.md

---

## FEAT-002

TÃ­tulo

Plano Gratuito

Categoria

MonetizaÃ§Ã£o

Horizonte

MLP

Prioridade

P1

Status

ðŸ“ Documentada

DescriÃ§Ã£o

Permitir que novos usuÃ¡rios conheÃ§am o sistema gratuitamente, com limitaÃ§Ãµes de recursos, sem comprometer a experiÃªncia.

---

## FEAT-003

TÃ­tulo

Plano Premium

Categoria

MonetizaÃ§Ã£o

Horizonte

MLP

Prioridade

P1

Status

ðŸ“ Documentada

DescriÃ§Ã£o

Disponibilizar todos os recursos avanÃ§ados mediante assinatura.

---

## FEAT-004

TÃ­tulo

Subscription Engine

Categoria

Arquitetura

Horizonte

MLP

Prioridade

P2

Status

ðŸ’¡ Ideia

DescriÃ§Ã£o

Motor responsÃ¡vel por autenticaÃ§Ã£o, planos, permissÃµes, renovaÃ§Ã£o, cancelamento e perÃ­odo de testes.

---

## FEAT-005

TÃ­tulo

IntegraÃ§Ã£o Oficial com B3

Categoria

IntegraÃ§Ãµes

Horizonte

EvoluÃ§Ã£o

Prioridade

P2

Status

ðŸ’¡ Ideia

DescriÃ§Ã£o

Sincronizar automaticamente operaÃ§Ãµes realizadas na corretora.

Implementar apenas quando financeiramente viÃ¡vel.

---

## FEAT-006

TÃ­tulo

Vida Financeira

Categoria

Vida Financeira

Horizonte

EvoluÃ§Ã£o

Prioridade

P2

Status

ðŸ“ Documentada

DescriÃ§Ã£o

Controle opcional de receitas e despesas pessoais.

---

## FEAT-007

TÃ­tulo

IntegraÃ§Ã£o Carteira â†” Vida Financeira

Categoria

Vida Financeira

Horizonte

EvoluÃ§Ã£o

Prioridade

P2

Status

ðŸ“ Documentada

DescriÃ§Ã£o

Permitir vincular investimentos ao saldo financeiro sem tornar a integraÃ§Ã£o obrigatÃ³ria.

---

## FEAT-008

TÃ­tulo

NotificaÃ§Ãµes Inteligentes

Categoria

UX

Horizonte

EvoluÃ§Ã£o

Prioridade

P2

Status

ðŸ“ Documentada

DescriÃ§Ã£o

Enviar apenas notificaÃ§Ãµes relevantes, evitando excesso de informaÃ§Ãµes.

---

## FEAT-009

TÃ­tulo

AtualizaÃ§Ãµes AutomÃ¡ticas

Categoria

Arquitetura

Horizonte

MLP

Prioridade

P1

Status

ðŸ“ Documentada

DescriÃ§Ã£o

Sempre que possÃ­vel, o sistema deverÃ¡ atualizar informaÃ§Ãµes automaticamente, reduzindo a necessidade de manutenÃ§Ã£o manual pelo usuÃ¡rio.

---

## FEAT-010

TÃ­tulo

Feature Flags por Plano

Categoria

Arquitetura

Horizonte

EvoluÃ§Ã£o

Prioridade

P2

Status

ðŸ’¡ Ideia

DescriÃ§Ã£o

Cada funcionalidade poderÃ¡ ser disponibilizada conforme o plano do usuÃ¡rio (Free, Premium ou Administrador).

---

## FEAT-011

TÃ­tulo

ADR-009 â€” Arquitetura da DocumentaÃ§Ã£o

Categoria

Arquitetura da DocumentaÃ§Ã£o

Horizonte

PÃ³s-MLP

Prioridade

PÃ³s-MLP

Status

âœ… Aprovada

DescriÃ§Ã£o

Criar um ADR consolidando a estrutura fÃ­sica da documentaÃ§Ã£o, ordem oficial de leitura, papel da Traceability Matrix, documentos de governanÃ§a, metodologia de ConsolidaÃ§Ã£o, Sprint de EstabilizaÃ§Ã£o e fluxo oficial de auditoria.

---

## FEAT-012

TÃ­tulo

Proventos Engine

Categoria

Proventos

Horizonte

PÃ³s-MLP

Prioridade

PÃ³s-MLP

Status

âœ… Aprovada

DescriÃ§Ã£o

Substituir futuramente o conceito de Dividend Engine por Proventos Engine. O novo motor serÃ¡ responsÃ¡vel por Dividendos, JCP, Rendimentos de FIIs e demais proventos financeiros. A Corporate Action Engine ficarÃ¡ responsÃ¡vel apenas por eventos societÃ¡rios.

---

## FEAT-013

TÃ­tulo

GovernanÃ§a Documental

Categoria

Arquitetura

Horizonte

VisÃ£o

Prioridade

Baixa

Status

ðŸ’¡ Ideia

DescriÃ§Ã£o

Avaliar futuramente a criaÃ§Ã£o de uma estrutura especÃ­fica para documentos de governanÃ§a, incluindo PROJECT_STATE, CHANGELOG_DOCUMENTACAO, DOCUMENTATION_INDEX, 00_START_HERE, Traceability Matrix e GlossÃ¡rio.

---

## FEAT-014

TÃ­tulo

Template Oficial de Prompts

Categoria

IA

Horizonte

MLP

Prioridade

Alta

Status

âœ… Aprovada

DescriÃ§Ã£o

Criar um template oficial para todas as interaÃ§Ãµes com o OpenCode. Todos os prompts deverÃ£o seguir um padrÃ£o Ãºnico.

---

## FEAT-015

TÃ­tulo

Fluxo Oficial de Auditoria

Categoria

Arquitetura

Horizonte

MLP

Prioridade

Alta

Status

âœ… Aprovada

DescriÃ§Ã£o

Formalizar o fluxo: Arquitetura â†’ ExecuÃ§Ã£o â†’ Auditoria â†’ AprovaÃ§Ã£o â†’ CorreÃ§Ã£o â†’ Nova Auditoria.

---

## FEAT-016

TÃ­tulo

Sistema de Baselines da DocumentaÃ§Ã£o

Categoria

GovernanÃ§a da DocumentaÃ§Ã£o

Horizonte

PÃ³s-MLP

Prioridade

PÃ³s-MLP

Status

âœ… Aprovada

DescriÃ§Ã£o

Criar um mecanismo oficial para registrar versÃµes estÃ¡veis da documentaÃ§Ã£o apÃ³s grandes marcos do projeto.

Cada Baseline deverÃ¡ representar um ponto em que toda a documentaÃ§Ã£o foi auditada, validada e considerada consistente.

Exemplos: Baseline 1.0, Baseline 2.0, Baseline 3.0.

Cada Baseline deverÃ¡ registrar, no mÃ­nimo:

- Data da criaÃ§Ã£o
- ConsolidaÃ§Ã£o correspondente
- Sprint de EstabilizaÃ§Ã£o correspondente
- Quantidade de documentos oficiais
- Quantidade de ADRs
- Quantidade de Business Rules
- Quantidade de Use Cases
- Quantidade de Technical Annexes
- Quantidade de funcionalidades (FEATs)
- Resumo das principais alteraÃ§Ãµes
- SituaÃ§Ã£o geral da arquitetura

Objetivos: facilitar auditorias futuras, permitir comparaÃ§Ã£o entre versÃµes, servir como ponto oficial de retorno em caso de inconsistÃªncias e registrar a evoluÃ§Ã£o arquitetural do projeto.

---

## FEAT-017

TÃ­tulo

GovernanÃ§a Oficial do Projeto

Categoria

GovernanÃ§a da DocumentaÃ§Ã£o

Horizonte

VisÃ£o

Prioridade

Baixa

Status

ðŸ’¡ Ideia

DescriÃ§Ã£o

Criar futuramente um documento oficial responsÃ¡vel por consolidar toda a metodologia de desenvolvimento do projeto Lio Feliz, reunindo em um Ãºnico local todas as decisÃµes relacionadas ao processo de desenvolvimento e manutenÃ§Ã£o.

O documento deverÃ¡ contemplar, no mÃ­nimo: Filosofia do projeto; PrincÃ­pios arquiteturais; Hierarquia oficial da documentaÃ§Ã£o; PapÃ©is e responsabilidades (ChatGPT, OpenCode e desenvolvedores); Fluxo oficial de desenvolvimento; Processo de aprovaÃ§Ã£o de ideias; Processo de implementaÃ§Ã£o; Processo de auditoria; Sprint de EstabilizaÃ§Ã£o; ConsolidaÃ§Ã£o da documentaÃ§Ã£o; Sistema de Baselines; GovernanÃ§a documental; CritÃ©rios para criaÃ§Ã£o de ADRs, Business Rules, Use Cases e Technical Annexes; Processo oficial de versionamento da documentaÃ§Ã£o.

DependÃªncias: Preferencialmente criar apÃ³s a conclusÃ£o da primeira versÃ£o estÃ¡vel (MLP), quando a metodologia jÃ¡ estiver suficientemente madura.

---

## FEAT-018

TÃ­tulo

Linha do Tempo Patrimonial

Categoria

HistÃ³rico

Horizonte

EvoluÃ§Ã£o

Prioridade

P3

Status

âœ… Aprovada

DescriÃ§Ã£o

Disponibilizar uma linha do tempo cronolÃ³gica reconstruÃ­da a partir do Portfolio Ledger, permitindo ao usuÃ¡rio navegar por toda sua histÃ³ria patrimonial, incluindo operaÃ§Ãµes, proventos, eventos corporativos e marcos importantes.

---

## FEAT-019

TÃ­tulo

Replay Patrimonial

Categoria

HistÃ³rico

Horizonte

EvoluÃ§Ã£o

Prioridade

P3

Status

âœ… Aprovada

DescriÃ§Ã£o

Permitir reconstruir integralmente a carteira em qualquer data do histÃ³rico, exibindo patrimÃ´nio, posiÃ§Ãµes, preÃ§o mÃ©dio, caixa, proventos acumulados e demais informaÃ§Ãµes disponÃ­veis naquele momento.

---

## FEAT-020

TÃ­tulo

InteligÃªncia HistÃ³rica

Categoria

HistÃ³rico

Horizonte

VisÃ£o

Prioridade

P4

Status

âœ… Aprovada

DescriÃ§Ã£o

Disponibilizar anÃ¡lises histÃ³ricas da vida patrimonial do investidor, incluindo evoluÃ§Ã£o do patrimÃ´nio, marcos importantes, estatÃ­sticas pessoais e comparaÃ§Ãµes entre perÃ­odos.

---

## FEAT-021

TÃ­tulo

Insights Comportamentais

Categoria

Insights

Horizonte

VisÃ£o

Prioridade

P4

Status

âœ… Aprovada

DescriÃ§Ã£o

Evoluir o Strategy Engine para fornecer anÃ¡lises sobre o comportamento histÃ³rico do investidor, identificando padrÃµes de aportes, diversificaÃ§Ã£o, concentraÃ§Ã£o e disciplina de investimentos, sem realizar recomendaÃ§Ãµes automÃ¡ticas de compra ou venda.

---

## FEAT-022

TÃ­tulo

AutomaÃ§Ã£o da GovernanÃ§a Documental

Categoria

GovernanÃ§a

Horizonte

VisÃ£o

Prioridade

P4

Status

âœ… Aprovada

DescriÃ§Ã£o

Criar ferramentas responsÃ¡veis por automatizar: regeneraÃ§Ã£o do DOCUMENTACAO_COMPLETA.md; sincronizaÃ§Ã£o dos backups; sincronizaÃ§Ã£o das Copias_Individuais; validaÃ§Ã£o de links; validaÃ§Ã£o de referÃªncias cruzadas; validaÃ§Ã£o da documentaÃ§Ã£o; geraÃ§Ã£o automÃ¡tica de relatÃ³rios de inconsistÃªncia.

---

# ObservaÃ§Ãµes

Este backlog Ã© um documento vivo.

Novas funcionalidades aprovadas deverÃ£o ser registradas imediatamente apÃ³s sua aprovaÃ§Ã£o.

Nenhuma funcionalidade poderÃ¡ ser implementada sem estar registrada neste documento.

---

# HistÃ³rico

## VersÃ£o 1.5

Adicionado FEAT-022 â€” AutomaÃ§Ã£o da GovernanÃ§a Documental.

## VersÃ£o 1.4

Adicionada classificaÃ§Ã£o por Horizonte (MLP, EvoluÃ§Ã£o, VisÃ£o).
Adicionados FEAT-018 a FEAT-021 â€” Fase 2: HistÃ³rico e Insights.

## VersÃ£o 1.3

Adicionado FEAT-017 â€” GovernanÃ§a Oficial do Projeto.

## VersÃ£o 1.2

Adicionado FEAT-016 â€” Sistema de Baselines da DocumentaÃ§Ã£o.

## VersÃ£o 1.1

Adicionados FEAT-011 a FEAT-015 (itens documentais aprovados).

## VersÃ£o 1.0

CriaÃ§Ã£o do backlog oficial do produto.

## Fonte: docs\17_TRACEABILITY_MATRIX.md
# 17_TRACEABILITY_MATRIX.md

VersÃ£o: 2.0
Status: Em desenvolvimento
Categoria: GovernanÃ§a
ResponsÃ¡vel: Projeto Lio Feliz
Ãšltima atualizaÃ§Ã£o: 09/07/2026

---

# 1. Objetivo

Este documento tem como objetivo fornecer uma visÃ£o centralizada da rastreabilidade das funcionalidades do projeto Lio Feliz.

Cada funcionalidade cadastrada deverÃ¡ possuir um identificador Ãºnico e permanente, permitindo localizar rapidamente todas as suas especificaÃ§Ãµes, regras de negÃ³cio, casos de uso, anexos tÃ©cnicos, decisÃµes arquiteturais e estado atual de desenvolvimento.

A Traceability Matrix nÃ£o contÃ©m regras de negÃ³cio nem detalhes de implementaÃ§Ã£o. Sua Ãºnica responsabilidade Ã© servir como mapa oficial da documentaÃ§Ã£o do projeto.

---

# 2. Filosofia

Toda funcionalidade deve existir apenas uma vez como conceito.

As informaÃ§Ãµes relacionadas a ela permanecem distribuÃ­das em seus respectivos documentos especializados.

A Traceability Matrix apenas conecta essas informaÃ§Ãµes, evitando duplicaÃ§Ã£o de conteÃºdo e facilitando a navegaÃ§Ã£o pela documentaÃ§Ã£o.

---

# 3. Estrutura da Matriz

Cada linha representa uma funcionalidade.

Campos mÃ­nimos:

| Campo | DescriÃ§Ã£o |
|--------|-----------|
| ID | Identificador permanente da funcionalidade |
| Nome | Nome oficial |
| Prioridade | P1, P2, P3 ou P4 |
| Business Rules | Documento correspondente |
| Use Cases | Documento correspondente |
| Technical Annex | Documento correspondente |
| ADR | DecisÃ£o arquitetural relacionada |
| Status da DocumentaÃ§Ã£o | SituaÃ§Ã£o da documentaÃ§Ã£o |
| Status do Desenvolvimento | SituaÃ§Ã£o da implementaÃ§Ã£o |

---

# 4. Estados

## DocumentaÃ§Ã£o

Valores permitidos:

- ðŸ’¡ Ideia
- ðŸ“ Em documentaÃ§Ã£o
- âœ… Documentada

## Desenvolvimento

Valores permitidos:

- â³ NÃ£o iniciada
- ðŸ— Em desenvolvimento
- ðŸ§ª Em testes
- âœ… ConcluÃ­da
- ðŸš€ ProduÃ§Ã£o

---

# 5. Prioridades

P1 â€” Essencial (MLP)

Funcionalidades obrigatÃ³rias para o lanÃ§amento.

P2 â€” Importante

Melhoram significativamente o produto.

P3 â€” EvoluÃ§Ã£o

SerÃ£o implementadas em versÃµes futuras.

P4 â€” Backlog

Ideias aprovadas, sem previsÃ£o de implementaÃ§Ã£o.

---

# 6. ConvenÃ§Ãµes

Cada funcionalidade utilizarÃ¡ um identificador permanente.

Exemplo:

FEAT-001

FEAT-002

FEAT-003

Esses identificadores deverÃ£o ser utilizados em toda a documentaÃ§Ã£o oficial.

---

# 7. Processo de AtualizaÃ§Ã£o

A matriz deverÃ¡ ser atualizada sempre que ocorrer qualquer um dos seguintes eventos:

- criaÃ§Ã£o de uma nova funcionalidade;
- alteraÃ§Ã£o de prioridade;
- criaÃ§Ã£o de Business Rules;
- criaÃ§Ã£o de Use Cases;
- criaÃ§Ã£o de Technical Annexes;
- criaÃ§Ã£o de ADRs;
- conclusÃ£o da implementaÃ§Ã£o;
- entrada em produÃ§Ã£o.

---

# 8. DecisÃµes de Projeto

- A Traceability Matrix Ã© o mapa oficial da documentaÃ§Ã£o.
- NÃ£o conterÃ¡ regras de negÃ³cio.
- NÃ£o conterÃ¡ detalhes tÃ©cnicos.
- NÃ£o substituirÃ¡ nenhum documento especializado.
- Todo novo mÃ³dulo deverÃ¡ ser registrado antes do inÃ­cio da implementaÃ§Ã£o.

---

# Matriz de Rastreabilidade

Abaixo estÃ£o registradas as funcionalidades do Lio Feliz com seus respectivos identificadores, documentos relacionados e status atuais.

Novas funcionalidades deverÃ£o ser adicionadas seguindo a metodologia definida nas seÃ§Ãµes anteriores.

---

## FEAT-001

| Campo | Valor |
|-------|-------|
| Nome | Sistema de Assinaturas |
| Prioridade | P1 |
| Business Rules | â€” |
| Use Cases | â€” |
| Technical Annex | â€” |
| ADR | ADR-006 |
| Status da DocumentaÃ§Ã£o | ðŸ“ Em documentaÃ§Ã£o |
| Status do Desenvolvimento | â³ NÃ£o iniciada |

---

## FEAT-002

| Campo | Valor |
|-------|-------|
| Nome | Plano Gratuito |
| Prioridade | P1 |
| Business Rules | â€” |
| Use Cases | â€” |
| Technical Annex | â€” |
| ADR | ADR-006 |
| Status da DocumentaÃ§Ã£o | ðŸ“ Em documentaÃ§Ã£o |
| Status do Desenvolvimento | â³ NÃ£o iniciada |

---

## FEAT-003

| Campo | Valor |
|-------|-------|
| Nome | Plano Premium |
| Prioridade | P1 |
| Business Rules | â€” |
| Use Cases | â€” |
| Technical Annex | â€” |
| ADR | ADR-006 |
| Status da DocumentaÃ§Ã£o | ðŸ“ Em documentaÃ§Ã£o |
| Status do Desenvolvimento | â³ NÃ£o iniciada |

---

## FEAT-004

| Campo | Valor |
|-------|-------|
| Nome | Subscription Engine |
| Prioridade | P2 |
| Business Rules | â€” |
| Use Cases | â€” |
| Technical Annex | â€” |
| ADR | ADR-006 |
| Status da DocumentaÃ§Ã£o | ðŸ’¡ Ideia |
| Status do Desenvolvimento | â³ NÃ£o iniciada |

---

## FEAT-005

| Campo | Valor |
|-------|-------|
| Nome | IntegraÃ§Ã£o Oficial com B3 |
| Prioridade | P2 |
| Business Rules | `06_BUSINESS_RULES/11_IMPORT_EXPORT.md` (ðŸ”´) |
| Use Cases | â€” |
| Technical Annex | â€” |
| ADR | â€” |
| Status da DocumentaÃ§Ã£o | ðŸ’¡ Ideia |
| Status do Desenvolvimento | â³ NÃ£o iniciada |

---

## FEAT-006

| Campo | Valor |
|-------|-------|
| Nome | Vida Financeira |
| Prioridade | P2 |
| Business Rules | `06_BUSINESS_RULES/12_INTEGRATIONS.md` (ðŸ”´) |
| Use Cases | â€” |
| Technical Annex | â€” |
| ADR | ADR-003 |
| Status da DocumentaÃ§Ã£o | ðŸ“ Em documentaÃ§Ã£o |
| Status do Desenvolvimento | â³ NÃ£o iniciada |

---

## FEAT-007

| Campo | Valor |
|-------|-------|
| Nome | IntegraÃ§Ã£o Carteira â†” Vida Financeira |
| Prioridade | P2 |
| Business Rules | `06_BUSINESS_RULES/01_PORTFOLIO.md` âœ… |
| Use Cases | â€” |
| Technical Annex | â€” |
| ADR | ADR-003 |
| Status da DocumentaÃ§Ã£o | ðŸ“ Em documentaÃ§Ã£o |
| Status do Desenvolvimento | â³ NÃ£o iniciada |

---

## FEAT-008

| Campo | Valor |
|-------|-------|
| Nome | NotificaÃ§Ãµes Inteligentes |
| Prioridade | P2 |
| Business Rules | â€” |
| Use Cases | â€” |
| Technical Annex | `07_TECHNICAL_ANNEXES/04_INSIGHT_ENGINE.md` âœ… |
| ADR | â€” |
| Status da DocumentaÃ§Ã£o | ðŸ“ Em documentaÃ§Ã£o |
| Status do Desenvolvimento | â³ NÃ£o iniciada |

---

## FEAT-009

| Campo | Valor |
|-------|-------|
| Nome | AtualizaÃ§Ãµes AutomÃ¡ticas |
| Prioridade | P1 |
| Business Rules | `06_BUSINESS_RULES/03_MARKET_DATA.md` âœ… |
| Use Cases | UC-001, UC-002, UC-003 |
| Technical Annex | `07_TECHNICAL_ANNEXES/02_CORPORATE_ACTION_ENGINE.md` âœ…, `07_TECHNICAL_ANNEXES/05_ENGINE_ORCHESTRATOR.md` âœ… |
| ADR | ADR-005, ADR-007 |
| Status da DocumentaÃ§Ã£o | âœ… Documentada |
| Status do Desenvolvimento | ðŸ— Em desenvolvimento |

---

## FEAT-010

| Campo | Valor |
|-------|-------|
| Nome | Feature Flags por Plano |
| Prioridade | P2 |
| Business Rules | â€” |
| Use Cases | â€” |
| Technical Annex | â€” |
| ADR | ADR-006 |
| Status da DocumentaÃ§Ã£o | ðŸ’¡ Ideia |
| Status do Desenvolvimento | â³ NÃ£o iniciada |

---

# HistÃ³rico

## VersÃ£o 2.0

ReestruturaÃ§Ã£o do documento: metodologia e matriz de rastreabilidade passam a coexistir no mesmo documento. Adicionada seÃ§Ã£o "Matriz de Rastreabilidade" com FEAT-001 a FEAT-010.

## VersÃ£o 1.0

CriaÃ§Ã£o do documento.

## Fonte: docs\18_ARCHITECTURAL_DECISIONS\00_INDEX.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 18_ARCHITECTURAL_DECISIONS/00_INDEX.md

**Projeto:** Lio Feliz

**Documento:** 18_ARCHITECTURAL_DECISIONS/00_INDEX.md

**VersÃ£o:** 1.0

**Status:** APROVADO

**Ãšltima atualizaÃ§Ã£o:** 09/07/2026

---

# Objetivo

Este documento indexa todos os Architecture Decision Records (ADR) do Lio Feliz.

Os ADRs registram decisÃµes arquiteturais, suas alternativas, o contexto que as motivou e as consequÃªncias esperadas.

Qualquer nova decisÃ£o arquitetural significativa deverÃ¡ ser registrada em um novo ADR antes de ser implementada.

---

# Estrutura

```
18_ARCHITECTURAL_DECISIONS/

00_INDEX.md

ADR-001_DOCUMENTATION.md
ADR-002_SINGLE_SOURCE_OF_TRUTH.md
ADR-003_OPTIONAL_MODULES.md
ADR-004_USER_FIRST.md
ADR-005_MINIMUM_USER_ACTIONS.md
ADR-006_COMMERCIAL_PRODUCT.md
ADR-007_AUTOMATION_FIRST.md
ADR-008_BACKLOG_GOVERNANCE.md
```

---

# ADRs Aprovados

| ADR | TÃ­tulo | Status |
|-----|--------|--------|
| ADR-001 | DocumentaÃ§Ã£o como Fonte de Verdade | âœ… Aprovado |
| ADR-002 | Single Source of Truth | âœ… Aprovado |
| ADR-003 | MÃ³dulos Opcionais | âœ… Aprovado |
| ADR-004 | User First | âœ… Aprovado |
| ADR-005 | MÃ­nimo de AÃ§Ãµes do UsuÃ¡rio | âœ… Aprovado |
| ADR-006 | Produto Comercial | âœ… Aprovado |
| ADR-007 | AutomaÃ§Ã£o em Primeiro Lugar | âœ… Aprovado |
| ADR-008 | GovernanÃ§a do Backlog | âœ… Aprovado |

---

# Hierarquia

Este documento faz parte da documentaÃ§Ã£o oficial e estÃ¡ sujeito Ã  hierarquia definida em `00_START_HERE.md`.

Nenhum ADR poderÃ¡ contrariar documentos de nÃ­vel superior como `01_VISION.md`, `02_PROJECT_RULES.md` ou `03_PRODUCT_REQUIREMENTS.md`.

---

# HistÃ³rico

## VersÃ£o 1.0

CriaÃ§Ã£o do Ã­ndice de Architecture Decision Records.

## Fonte: docs\18_ARCHITECTURAL_DECISIONS\ADR-001_DOCUMENTATION.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# ADR-001: DocumentaÃ§Ã£o como Fonte de Verdade

**Status:** âœ… Aprovado

**Data:** 09/07/2026

---

## Contexto

O projeto Lio Feliz possui uma equipe reduzida e depende de assistÃªncia de IA para desenvolvimento.

Sem uma documentaÃ§Ã£o centralizada, as decisÃµes ficam dispersas em conversas, perdendo-se com o tempo.

IAs diferentes podem receber contextos diferentes, gerando inconsistÃªncias.

---

## Problema

Como garantir que todas as IAs e desenvolvedores possuam o mesmo entendimento do projeto, independentemente de quando ou por quem foram contratados?

---

## Alternativas Consideradas

### Alternativa 1: CÃ³digo como Ãºnica fonte de verdade

Confiar exclusivamente no cÃ³digo para documentar decisÃµes.

Rejeitada porque o cÃ³digo expressa *como* algo foi implementado, nÃ£o *por que* foi decidido dessa forma.

### Alternativa 2: README.md como documentaÃ§Ã£o principal

Manter toda documentaÃ§Ã£o em um Ãºnico README.

Rejeitada porque documentos longos sÃ£o difÃ­ceis de navegar e raramente lidos por completo.

### Alternativa 3: DocumentaÃ§Ã£o como fonte de verdade (escolhida)

Manter documentaÃ§Ã£o organizada em mÃºltiplos arquivos, cada um com responsabilidade Ãºnica.

---

## DecisÃ£o

A documentaÃ§Ã£o oficial localizada na pasta `docs/` Ã© a autoridade mÃ¡xima sobre regras de negÃ³cio, arquitetura e comportamento esperado do sistema.

Toda IA ou desenvolvedor deve ler a documentaÃ§Ã£o completa antes de qualquer alteraÃ§Ã£o.

A documentaÃ§Ã£o possui prioridade igual ao cÃ³digo.

Nenhuma alteraÃ§Ã£o significativa pode ocorrer sem a correspondente atualizaÃ§Ã£o da documentaÃ§Ã£o.

---

## ConsequÃªncias

Positivas:

- Todas as IAs partem da mesma base de conhecimento.
- DecisÃµes ficam registradas permanentemente.
- Novos integrantes podem se contextualizar rapidamente.

Negativas:

- Exige disciplina para manter a documentaÃ§Ã£o atualizada.
- A documentaÃ§Ã£o precisa ser verificada regularmente contra o cÃ³digo.

---

## Documentos Relacionados

- `00_START_HERE.md` â€” define a ordem de leitura obrigatÃ³ria.
- `02_PROJECT_RULES.md` â€” documentaÃ§Ã£o possui prioridade igual ao cÃ³digo.
- `DOCUMENTATION_INDEX.md` â€” Ã­ndice oficial de todos os documentos.

---

## HistÃ³rico

| Data | VersÃ£o | DescriÃ§Ã£o |
|------|--------|-----------|
| 09/07/2026 | 1.0 | CriaÃ§Ã£o do ADR. |

## Fonte: docs\18_ARCHITECTURAL_DECISIONS\ADR-002_SINGLE_SOURCE_OF_TRUTH.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# ADR-002: Single Source of Truth

**Status:** âœ… Aprovado

**Data:** 09/07/2026

---

## Contexto

Sistemas financeiros frequentemente calculam o mesmo valor em mÃºltiplos lugares.

PatrimÃ´nio, preÃ§o mÃ©dio e posiÃ§Ãµes podem ser recalculados por diferentes mÃ³dulos, gerando divergÃªncias.

O usuÃ¡rio pode editar manualmente valores calculados, criando inconsistÃªncias.

---

## Problema

Como garantir que todas as telas e mÃ³dulos do sistema apresentem exatamente os mesmos valores para a mesma informaÃ§Ã£o?

---

## Alternativas Consideradas

### Alternativa 1: Livre recÃ¡lculo em qualquer mÃ³dulo

Cada mÃ³dulo recalcula o que precisa quando precisa.

Rejeitada porque leva a divergÃªncias e dificulta auditoria.

### Alternativa 2: Banco de dados como Ãºnica fonte

Armazenar valores calculados no banco e consultÃ¡-los.

Rejeitada porque valores derivados (patrimÃ´nio, preÃ§o mÃ©dio) ficam desatualizados se a fonte primÃ¡ria mudar.

### Alternativa 3: Single Source of Truth (escolhida)

Cada informaÃ§Ã£o possui exatamente uma fonte oficial.

Dados derivados sÃ£o sempre recalculados a partir de suas fontes, nunca editados manualmente.

---

## DecisÃ£o

Cada informaÃ§Ã£o no sistema deve possuir uma Ãºnica fonte oficial.

Exemplos:

| InformaÃ§Ã£o | Fonte Oficial |
|------------|---------------|
| MovimentaÃ§Ãµes | LanÃ§amentos do usuÃ¡rio ou sincronizaÃ§Ã£o aprovada |
| Eventos Corporativos | IntegraÃ§Ãµes externas ou cadastro controlado |
| PosiÃ§Ãµes | Calculadas a partir das movimentaÃ§Ãµes |
| PatrimÃ´nio | Calculado a partir das posiÃ§Ãµes e cotaÃ§Ãµes |
| PreÃ§o mÃ©dio | Calculado exclusivamente pelas movimentaÃ§Ãµes vÃ¡lidas |

Nenhum dado derivado pode ser editado manualmente.

---

## ConsequÃªncias

Positivas:

- ConsistÃªncia garantida entre todos os mÃ³dulos.
- Auditoria simplificada.
- RemoÃ§Ã£o de divergÃªncias de cÃ¡lculo.

Negativas:

- Obriga a ter uma engine centralizada de consolidaÃ§Ã£o (Portfolio Consolidation Engine).
- Impede ediÃ§Ã£o direta de valores derivados pelo usuÃ¡rio.

---

## Documentos Relacionados

- `06_BUSINESS_RULES/00_GLOBAL_RULES.md` â€” define o princÃ­pio de Fonte de Verdade.
- `07_TECHNICAL_ANNEXES/03_PORTFOLIO_CONSOLIDATION_ENGINE.md` â€” engine responsÃ¡vel por consolidar os dados.
- `06_BUSINESS_RULES/01_PORTFOLIO.md` â€” a carteira nunca realiza cÃ¡lculos diretamente.

---

## HistÃ³rico

| Data | VersÃ£o | DescriÃ§Ã£o |
|------|--------|-----------|
| 09/07/2026 | 1.0 | CriaÃ§Ã£o do ADR. |

## Fonte: docs\18_ARCHITECTURAL_DECISIONS\ADR-003_OPTIONAL_MODULES.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# ADR-003: MÃ³dulos Opcionais

**Status:** âœ… Aprovado

**Data:** 09/07/2026

---

## Contexto

O Lio Feliz pode oferecer diversos mÃ³dulos ao longo do tempo:

- Vida Financeira
- IntegraÃ§Ã£o com B3
- Investidor10
- Corretoras
- Criptomoedas
- NotificaÃ§Ãµes

Alguns usuÃ¡rios podem nÃ£o querer ou nÃ£o precisar de todas as funcionalidades.

---

## Problema

Como garantir que mÃ³dulos opcionais nÃ£o se tornem requisitos obrigatÃ³rios para o funcionamento bÃ¡sico do sistema?

---

## Alternativas Consideradas

### Alternativa 1: MÃ³dulos sempre ativos

Todos os mÃ³dulos sÃ£o carregados e executados independentemente do uso.

Rejeitada porque aumenta complexidade e consumo de recursos desnecessariamente.

### Alternativa 2: MÃ³dulos opcionais por design (escolhida)

Todo mÃ³dulo Ã© opcional por padrÃ£o.

Apenas o nÃºcleo do sistema (carteira, movimentaÃ§Ãµes, cotaÃ§Ãµes) Ã© obrigatÃ³rio.

---

## DecisÃ£o

Nenhuma integraÃ§Ã£o externa ou mÃ³dulo complementar pode tornar-se obrigatÃ³rio para o funcionamento do sistema.

O sistema deve funcionar completamente mesmo sem:

- B3
- Yahoo Finance
- BRAPI
- CoinGecko
- ImportaÃ§Ã£o CSV
- Vida Financeira
- Qualquer integraÃ§Ã£o futura

Cada mÃ³dulo opcional deve poder ser ativado ou desativado sem impacto nos demais.

A integraÃ§Ã£o com Vida Financeira, por exemplo, segue explicitamente o princÃ­pio das AÃ§Ãµes Vinculadas: nenhuma informaÃ§Ã£o Ã© duplicada, apenas vinculada.

---

## ConsequÃªncias

Positivas:

- UsuÃ¡rio escolhe o que utilizar.
- Sistema resiliente a falhas de provedores externos.
- Novas integraÃ§Ãµes podem ser adicionadas sem risco ao nÃºcleo.

Negativas:

- MÃ³dulos opcionais exigem arquitetura preparada para desacoplamento.
- Funcionalidades integradas podem parecer menos coesas se mal implementadas.

---

## Documentos Relacionados

- `01_VISION.md` â€” independÃªncia de fornecedores.
- `06_BUSINESS_RULES/00_GLOBAL_RULES.md` â€” integraÃ§Ãµes nunca sÃ£o obrigatÃ³rias.
- `06_BUSINESS_RULES/05_PROVENTOS.md` â€” integraÃ§Ã£o com Vida Financeira Ã© opcional.
- `05_SYSTEM_ARCHITECTURE.md` â€” camada de integraÃ§Ãµes separada do domÃ­nio.

---

## HistÃ³rico

| Data | VersÃ£o | DescriÃ§Ã£o |
|------|--------|-----------|
| 09/07/2026 | 1.0 | CriaÃ§Ã£o do ADR. |

## Fonte: docs\18_ARCHITECTURAL_DECISIONS\ADR-004_USER_FIRST.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# ADR-004: User First

**Status:** âœ… Aprovado

**Data:** 09/07/2026

---

## Contexto

Durante o desenvolvimento, decisÃµes tÃ©cnicas podem conflitar com a experiÃªncia do usuÃ¡rio.

Uma implementaÃ§Ã£o mais rÃ¡pida pode gerar uma interface confusa.

Uma arquitetura tecnicamente elegante pode ser difÃ­cil de usar.

---

## Problema

Como resolver conflitos entre conveniÃªncia de implementaÃ§Ã£o e qualidade da experiÃªncia do usuÃ¡rio?

---

## Alternativas Consideradas

### Alternativa 1: ConveniÃªncia tÃ©cnica primeiro

Escolher sempre a soluÃ§Ã£o mais rÃ¡pida ou mais simples de implementar.

Rejeitada porque prejudica a adoÃ§Ã£o e a satisfaÃ§Ã£o do usuÃ¡rio.

### Alternativa 2: EquilÃ­brio sem regra clara

Decidir caso a caso, sem prioridade definida.

Rejeitada porque leva a inconsistÃªncias e decisÃµes arbitrÃ¡rias.

### Alternativa 3: User First (escolhida)

A experiÃªncia do usuÃ¡rio possui prioridade sobre conveniÃªncias de implementaÃ§Ã£o.

Em caso de conflito, a melhor experiÃªncia para o usuÃ¡rio deve prevalecer.

---

## DecisÃ£o

A experiÃªncia do usuÃ¡rio tem prioridade sobre conveniÃªncias de implementaÃ§Ã£o.

Isso significa:

- Se existirem duas soluÃ§Ãµes tecnicamente equivalentes, escolher a que proporcionar melhor experiÃªncia.
- A interface deve ser simples, intuitiva e clara.
- Sempre que houver dÃºvida entre uma interface bonita e uma interface clara, escolher a interface mais clara.
- O sistema deve ser intuitivo tanto para iniciantes quanto para experientes.

Entretanto, esta decisÃ£o nÃ£o se sobrepÃµe Ã  Integridade dos Dados. ConsistÃªncia financeira sempre vem em primeiro lugar.

---

## ConsequÃªncias

Positivas:

- UsuÃ¡rio satisfeito e com baixa curva de aprendizado.
- Maior adoÃ§Ã£o e retenÃ§Ã£o.

Negativas:

- Pode exigir mais esforÃ§o de desenvolvimento.
- SoluÃ§Ãµes tecnicamente mais simples podem ser preteridas.

---

## Documentos Relacionados

- `00_START_HERE.md` â€” princÃ­pio de ExperiÃªncia do UsuÃ¡rio.
- `01_VISION.md` â€” simplicidade deve prevalecer sobre complexidade.
- `02_PROJECT_RULES.md` â€” interface deve ser simples e intuitiva.

---

## HistÃ³rico

| Data | VersÃ£o | DescriÃ§Ã£o |
|------|--------|-----------|
| 09/07/2026 | 1.0 | CriaÃ§Ã£o do ADR. |

## Fonte: docs\18_ARCHITECTURAL_DECISIONS\ADR-005_MINIMUM_USER_ACTIONS.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# ADR-005: MÃ­nimo de AÃ§Ãµes do UsuÃ¡rio

**Status:** âœ… Aprovado

**Data:** 09/07/2026

---

## Contexto

Sistemas de gestÃ£o de investimentos frequentemente exigem que o usuÃ¡rio realize tarefas manuais repetitivas:

- atualizar cotaÃ§Ãµes manualmente;
- lanÃ§ar dividendum por dividendum;
- conferir eventos corporativos um a um;
- recalcular posiÃ§Ãµes apÃ³s cada operaÃ§Ã£o.

Isso consome tempo, gera erros e afasta o usuÃ¡rio da plataforma.

---

## Problema

Como reduzir ao mÃ¡ximo a quantidade de aÃ§Ãµes manuais que o usuÃ¡rio precisa realizar para manter sua carteira atualizada?

---

## Alternativas Consideradas

### Alternativa 1: UsuÃ¡rio responsÃ¡vel por tudo

O usuÃ¡rio lanÃ§a, atualiza e confere todas as informaÃ§Ãµes manualmente.

Rejeitada porque contradiz a visÃ£o do projeto de automatizar processos.

### Alternativa 2: AutomaÃ§Ã£o total sem confirmaÃ§Ã£o

O sistema executa todas as atualizaÃ§Ãµes automaticamente sem qualquer intervenÃ§Ã£o.

Rejeitada porque pode gerar inconsistÃªncias nÃ£o detectadas e frustraÃ§Ã£o.

### Alternativa 3: MÃ­nimo de aÃ§Ãµes com seguranÃ§a (escolhida)

O sistema automatiza tudo que Ã© seguro automatizar.

Quando hÃ¡ risco de inconsistÃªncia, solicita confirmaÃ§Ã£o.

O usuÃ¡rio nunca Ã© obrigado a realizar tarefas que o sistema pode executar.

---

## DecisÃ£o

O sistema deve reduzir ao mÃ¡ximo as aÃ§Ãµes manuais do usuÃ¡rio.

Automatizar sempre que seguro:

- cotaÃ§Ãµes;
- dividendos;
- eventos corporativos;
- sincronizaÃ§Ãµes;
- atualizaÃ§Ãµes cadastrais.

Quando houver risco, solicitar confirmaÃ§Ã£o.

O usuÃ¡rio nunca deve ser obrigado a sincronizar manualmente para utilizar o sistema.

Toda automaÃ§Ã£o deve ser reversÃ­vel e rastreÃ¡vel.

---

## ConsequÃªncias

Positivas:

- UsuÃ¡rio mantÃ©m a carteira atualizada com mÃ­nimo esforÃ§o.
- ReduÃ§Ã£o de erros manuais.
- Maior engajamento com a plataforma.

Negativas:

- Exige implementaÃ§Ã£o robusta de automaÃ§Ã£o (Orchestrator, Engines).
- Risco de automaÃ§Ã£o incorreta se os dados de origem forem inconsistentes.

---

## Documentos Relacionados

- `00_START_HERE.md` â€” princÃ­pio de AutomaÃ§Ã£o.
- `01_VISION.md` â€” pilar da AutomaÃ§Ã£o.
- `06_BUSINESS_RULES/00_GLOBAL_RULES.md` â€” regras de automaÃ§Ã£o e sincronizaÃ§Ã£o.
- `07_TECHNICAL_ANNEXES/05_ENGINE_ORCHESTRATOR.md` â€” coordenaÃ§Ã£o das automaÃ§Ãµes.
- `16_PRODUCT_BACKLOG.md` â€” FEAT-009: AtualizaÃ§Ãµes AutomÃ¡ticas.

---

## HistÃ³rico

| Data | VersÃ£o | DescriÃ§Ã£o |
|------|--------|-----------|
| 09/07/2026 | 1.0 | CriaÃ§Ã£o do ADR. |

## Fonte: docs\18_ARCHITECTURAL_DECISIONS\ADR-006_COMMERCIAL_PRODUCT.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# ADR-006: Produto Comercial

**Status:** âœ… Aprovado

**Data:** 09/07/2026

---

## Contexto

O Lio Feliz Ã© desenvolvido como um produto comercial, nÃ£o como um projeto pessoal ou open source.

Isso implica a necessidade de:

- planos de assinatura;
- modelo Free para aquisiÃ§Ã£o de usuÃ¡rios;
- modelo Premium para receita recorrente;
- controle de acesso por funcionalidade;
- escalabilidade para mÃºltiplos usuÃ¡rios pagantes.

---

## Problema

Como estruturar o sistema para suportar um modelo comercial com planos Free e Premium sem comprometer a arquitetura ou a experiÃªncia do usuÃ¡rio?

---

## Alternativas Consideradas

### Alternativa 1: Produto gratuito com doaÃ§Ãµes

Manter o produto totalmente gratuito, financiado por doaÃ§Ãµes.

Rejeitada porque nÃ£o sustenta o desenvolvimento de longo prazo.

### Alternativa 2: Produto pago Ãºnico

Cobrar uma taxa Ãºnica de acesso vitalÃ­cio.

Rejeitada porque nÃ£o gera receita recorrente para manutenÃ§Ã£o contÃ­nua.

### Alternativa 3: Assinatura com planos Free e Premium (escolhida)

Modelo Freemium:

- Plano Gratuito: recursos bÃ¡sicos, sem comprometer a experiÃªncia.
- Plano Premium: todos os recursos avanÃ§ados mediante assinatura mensal/anual.
- Feature Flags por plano para controle de acesso.

---

## DecisÃ£o

O Lio Feliz deve ser estruturado como um produto comercial com modelo de assinatura.

Isso implica:

- Planos Free e Premium bem definidos.
- Feature Flags controladas por plano.
- Subscription Engine para autenticaÃ§Ã£o, planos, permissÃµes, renovaÃ§Ã£o e cancelamento.
- PerÃ­odo de testes para novos usuÃ¡rios experimentarem recursos Premium.
- Nenhuma funcionalidade essencial da gestÃ£o patrimonial pode ficar restrita ao plano Premium de forma que torne o plano Free inutilizÃ¡vel.

A decisÃ£o de quais funcionalidades sÃ£o Free vs Premium deve ser documentada e reavaliada periodicamente.

---

## ConsequÃªncias

Positivas:

- Modelo de negÃ³cio sustentÃ¡vel.
- AquisiÃ§Ã£o de usuÃ¡rios via plano gratuito.
- Receita recorrente para evoluÃ§Ã£o contÃ­nua.

Negativas:

- Complexidade adicional (Subscription Engine, Feature Flags).
- DecisÃµes difÃ­ceis sobre o que Ã© Free vs Premium.
- Risco de canibalizaÃ§Ã£o se o plano Free for muito generoso.

---

## Documentos Relacionados

- `15_PRODUCT_PHILOSOPHY.md` â€” princÃ­pios filosÃ³ficos do produto.
- `16_PRODUCT_BACKLOG.md` â€” FEAT-001 a FEAT-004, FEAT-010.
- `17_TRACEABILITY_MATRIX.md` â€” rastreamento das features comerciais.

---

## HistÃ³rico

| Data | VersÃ£o | DescriÃ§Ã£o |
|------|--------|-----------|
| 09/07/2026 | 1.0 | CriaÃ§Ã£o do ADR. |

## Fonte: docs\18_ARCHITECTURAL_DECISIONS\ADR-007_AUTOMATION_FIRST.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# ADR-007: AutomaÃ§Ã£o em Primeiro Lugar

**Status:** âœ… Aprovado

**Data:** 09/07/2026

---

## Contexto

Investidores de longo prazo realizam operaÃ§Ãµes esporÃ¡dicas, mas precisam de informaÃ§Ãµes atualizadas constantemente.

Manualmente, isso exigiria:

- atualizar cotaÃ§Ãµes diariamente;
- verificar dividendos pendentes;
- conferir eventos corporativos;
- recalcular posiÃ§Ãµes e patrimÃ´nio.

O investidor nÃ£o deve precisar executar essas tarefas.

---

## Problema

Como garantir que a automaÃ§Ã£o seja tratada como requisito fundamental e nÃ£o como funcionalidade secundÃ¡ria?

---

## Alternativas Consideradas

### Alternativa 1: AutomaÃ§Ã£o como feature futura

Primeiro implementar o funcionamento manual, depois automatizar.

Rejeitada porque gera dÃ­vida tÃ©cnica: o manual vira o padrÃ£o e a automaÃ§Ã£o nunca Ã© priorizada.

### Alternativa 2: AutomaÃ§Ã£o como requisito de design (escolhida)

Toda funcionalidade deve ser projetada considerando a automaÃ§Ã£o desde o inÃ­cio.

A interface manual existe como fallback, nÃ£o como padrÃ£o.

---

## DecisÃ£o

A automaÃ§Ã£o deve ser tratada como requisito fundamental de design, nÃ£o como funcionalidade futura.

Toda funcionalidade deve ser projetada considerando:

- como serÃ¡ automatizada;
- quais dados de origem serÃ£o utilizados;
- como serÃ¡ feita a validaÃ§Ã£o automÃ¡tica;
- como serÃ£o tratados conflitos;
- como o usuÃ¡rio serÃ¡ informado.

AutomaÃ§Ãµes implementadas:

| Processo | Status |
|----------|--------|
| CotaÃ§Ãµes | âœ… AutomÃ¡tico via BRAPI/Yahoo |
| Dividendos | âœ… AutomÃ¡tico via BRAPI/Yahoo |
| Splits/BonificaÃ§Ãµes | ðŸŸ¡ Parcial |
| Eventos Corporativos | ðŸ”´ Pendente |
| Rebalanceamento | ðŸ”´ Pendente |
| Imposto de Renda | ðŸ”´ Pendente |

A Engine Orchestrator (`07_TECHNICAL_ANNEXES/05_ENGINE_ORCHESTRATOR.md`) Ã© a camada responsÃ¡vel por coordenar todas as automaÃ§Ãµes.

---

## ConsequÃªncias

Positivas:

- Sistema sempre atualizado com mÃ­nimo esforÃ§o do usuÃ¡rio.
- AutomaÃ§Ã£o tratada como cidadÃ£ de primeira classe na arquitetura.
- ReduÃ§Ã£o de erros humanos.

Negativas:

- Maior complexidade inicial de implementaÃ§Ã£o.
- DependÃªncia de qualidade dos dados de origem para automaÃ§Ã£o segura.
- Necessidade de fallback manual quando a automaÃ§Ã£o falha.

---

## Documentos Relacionados

- `01_VISION.md` â€” pilar da AutomaÃ§Ã£o.
- `06_BUSINESS_RULES/00_GLOBAL_RULES.md` â€” diretrizes de automaÃ§Ã£o.
- `07_TECHNICAL_ANNEXES/05_ENGINE_ORCHESTRATOR.md` â€” coordenaÃ§Ã£o central.
- `07_TECHNICAL_ANNEXES/00_ENGINE_GUIDELINES.md` â€” padrÃµes para engines.
- `16_PRODUCT_BACKLOG.md` â€” FEAT-009: AtualizaÃ§Ãµes AutomÃ¡ticas.

---

## HistÃ³rico

| Data | VersÃ£o | DescriÃ§Ã£o |
|------|--------|-----------|
| 09/07/2026 | 1.0 | CriaÃ§Ã£o do ADR. |

## Fonte: docs\18_ARCHITECTURAL_DECISIONS\ADR-008_BACKLOG_GOVERNANCE.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# ADR-008: GovernanÃ§a do Backlog

**Status:** âœ… Aprovado

**Data:** 09/07/2026

---

## Contexto

Funcionalidades do Lio Feliz sÃ£o discutidas em conversas com IAs e com o usuÃ¡rio.

Sem um registro formal, decisÃµes importantes se perdem.

Funcionalidades podem ser implementadas sem documentaÃ§Ã£o prÃ©via.

O escopo do produto pode crescer descontroladamente.

---

## Problema

Como garantir que toda funcionalidade implementada seja previamente aprovada, documentada e rastreÃ¡vel?

---

## Alternativas Consideradas

### Alternativa 1: Confiar na memÃ³ria das conversas

Manter o backlog informalmente nas conversas com a IA.

Rejeitada porque IAs diferentes nÃ£o compartilham memÃ³ria e decisÃµes se perdem.

### Alternativa 2: Backlog apenas mental do usuÃ¡rio

O usuÃ¡rio mantÃ©m o backlog em sua prÃ³pria cabeÃ§a ou em notas pessoais.

Rejeitada porque a IA nÃ£o tem acesso a essas informaÃ§Ãµes e nÃ£o pode consultÃ¡-las.

### Alternativa 3: Backlog documentado e governado (escolhida)

Toda funcionalidade aprovada Ã© registrada em `16_PRODUCT_BACKLOG.md` com ID Ãºnico, prioridade, categoria e status.

Nenhuma funcionalidade Ã© implementada sem estar no backlog.

---

## DecisÃ£o

O backlog oficial do produto Ã© o documento `16_PRODUCT_BACKLOG.md`.

Regras de governanÃ§a:

1. Nenhuma funcionalidade pode ser implementada sem estar registrada no backlog.
2. Toda funcionalidade aprovada deve ser registrada imediatamente apÃ³s sua aprovaÃ§Ã£o.
3. Cada funcionalidade possui ID Ãºnico (FEAT-NNN), prioridade, categoria e ciclo de vida.
4. O ciclo de vida obrigatÃ³rio Ã©: Ideia â†’ Aprovada â†’ Documentada â†’ Em Desenvolvimento â†’ Testes â†’ Implementada.
5. Funcionalidades implementadas que ainda nÃ£o possuem FEAT devem ser registradas retroativamente.
6. O backlog Ã© um documento vivo, atualizado sempre que uma funcionalidade muda de status.

A matriz de rastreabilidade (`17_TRACEABILITY_MATRIX.md`) complementa o backlog relacionando cada FEAT Ã s suas regras de negÃ³cio, anexos tÃ©cnicos e implementaÃ§Ã£o.

---

## ConsequÃªncias

Positivas:

- Toda funcionalidade Ã© rastreÃ¡vel desde a aprovaÃ§Ã£o atÃ© a implementaÃ§Ã£o.
- IAs e desenvolvedores consultam a mesma fonte.
- Impede crescimento descontrolado do escopo.
- Facilita priorizaÃ§Ã£o e planejamento.

Negativas:

- Exige disciplina para registrar funcionalidades imediatamente.
- Funcionalidades antigas precisam ser retroativamente cadastradas.

---

## Documentos Relacionados

- `16_PRODUCT_BACKLOG.md` â€” backlog oficial do produto.
- `17_TRACEABILITY_MATRIX.md` â€” matriz de rastreabilidade.
- `02_PROJECT_RULES.md` â€” documentaÃ§Ã£o possui prioridade igual ao cÃ³digo.

---

## HistÃ³rico

| Data | VersÃ£o | DescriÃ§Ã£o |
|------|--------|-----------|
| 09/07/2026 | 1.0 | CriaÃ§Ã£o do ADR. |

## Fonte: docs\19_GLOSSARY.md
# Lio Feliz - DocumentaÃ§Ã£o Oficial

# 19_GLOSSARY.md

**Projeto:** Lio Feliz

**Documento:** 19_GLOSSARY.md

**VersÃ£o:** 1.0

**Status:** Em desenvolvimento

**Ãšltima atualizaÃ§Ã£o:** 09/07/2026

---

# 1. Objetivo

Este documento Ã© o VocabulÃ¡rio Oficial do Projeto Lio Feliz.

Seu objetivo Ã© garantir que cada conceito relevante do sistema possua exatamente uma definiÃ§Ã£o oficial.

Nenhum documento da documentaÃ§Ã£o poderÃ¡ redefinir um termo jÃ¡ existente neste GlossÃ¡rio.

Quando um novo conceito relevante surgir durante o desenvolvimento do projeto, sua definiÃ§Ã£o deverÃ¡ ser adicionada a este documento antes de ser utilizada em novos documentos oficiais.

---

# 2. Escopo

Este GlossÃ¡rio abrange todos os conceitos utilizados na documentaÃ§Ã£o oficial do Lio Feliz, incluindo:

- conceitos financeiros;
- conceitos do sistema;
- conceitos da documentaÃ§Ã£o;
- conceitos da metodologia;
- conceitos gerais.

Conceitos puramente tÃ©cnicos ou de implementaÃ§Ã£o (linguagens, frameworks, bibliotecas, protocolos) nÃ£o fazem parte deste GlossÃ¡rio, a menos que possuam significado especÃ­fico no contexto do projeto.

---

# 3. PrincÃ­pios

- Cada termo possui apenas uma definiÃ§Ã£o oficial.
- Nenhum documento poderÃ¡ redefinir um conceito existente.
- Os demais documentos deverÃ£o apenas referenciar este GlossÃ¡rio.
- O GlossÃ¡rio Ã© a referÃªncia oficial de nomenclatura do projeto.
- Novos conceitos deverÃ£o ser adicionados ao GlossÃ¡rio antes de serem utilizados em novos documentos oficiais.

---

# 4. OrganizaÃ§Ã£o do GlossÃ¡rio

Os conceitos estÃ£o organizados nas seguintes categorias:

- **Conceitos Financeiros**: termos do domÃ­nio financeiro e de investimentos.
- **Conceitos do Sistema**: componentes e entidades do sistema Lio Feliz.
- **Conceitos da DocumentaÃ§Ã£o**: tipos e artefatos da documentaÃ§Ã£o oficial.
- **Conceitos da Metodologia**: processos e prÃ¡ticas de desenvolvimento do projeto.
- **Conceitos Gerais**: princÃ­pios fundamentais aplicados ao projeto.

Cada definiÃ§Ã£o segue o formato:

- **Nome**: termo oficial.
- **Categoria**: grupo ao qual pertence.
- **DefiniÃ§Ã£o**: descriÃ§Ã£o oficial do conceito.
- **Objetivo** (quando aplicÃ¡vel): propÃ³sito do conceito no sistema.
- **ObservaÃ§Ãµes** (quando aplicÃ¡vel): notas adicionais.
- **ReferÃªncias** (quando aplicÃ¡vel): documentos relacionados.

---

# 5. Conceitos Financeiros

--------------------------------------------------

**Ativo**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: Qualquer bem financeiro que possa ser mantido em uma carteira de investimentos. Inclui aÃ§Ãµes, fundos imobiliÃ¡rios (FIIs), BDRs, ETFs, renda fixa, criptomoedas, REITs e ativos internacionais.

Objetivo: Representar a unidade bÃ¡sica da carteira de investimentos.

ObservaÃ§Ãµes: Cada ativo possui um ticker Ãºnico que o identifica no sistema.

ReferÃªncias: `04_DATA_MODEL.md`

--------------------------------------------------

**Carteira**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: Conjunto de posiÃ§Ãµes em ativos financeiros mantidas por um investidor. A carteira consolida operaÃ§Ãµes de compra, venda, proventos e eventos corporativos para calcular posiÃ§Ã£o atual, rentabilidade e alocaÃ§Ã£o.

Objetivo: Centralizar a visÃ£o patrimonial do investidor.

ObservaÃ§Ãµes: A carteira Ã© o nÃºcleo do sistema Lio Feliz. Todos os mÃ³dulos (Dashboard, IRPF, Proventos, Metas) sÃ£o extensÃµes da carteira.

ReferÃªncias: `04_DATA_MODEL.md`, `06_BUSINESS_RULES/01_PORTFOLIO.md`

--------------------------------------------------

**OperaÃ§Ã£o**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: Registro de uma movimentaÃ§Ã£o financeira na carteira. Os tipos suportados sÃ£o: compra (buy), venda (sell), dividendo (dividend) e bonificaÃ§Ã£o (bonus).

Objetivo: Registrar todas as movimentaÃ§Ãµes que afetam a composiÃ§Ã£o ou o custo da carteira.

ObservaÃ§Ãµes: Cada operaÃ§Ã£o possui side, quantity, price, date e ticker. OperaÃ§Ãµes de dividendo reduzem o custo total; bonificaÃ§Ãµes aumentam a quantidade sem custo.

ReferÃªncias: `04_DATA_MODEL.md`, `06_BUSINESS_RULES/01_PORTFOLIO.md`

--------------------------------------------------

**Evento**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: OcorrÃªncia que afeta ativos financeiros, podendo ser um Provento (geraÃ§Ã£o de renda) ou um Evento Corporativo (alteraÃ§Ã£o na estrutura do ativo).

Objetivo: Classificar e organizar toda ocorrÃªncia financeira que impacta a carteira.

ObservaÃ§Ãµes: Eventos podem ser automÃ¡ticos (sincronizados via APIs) ou manuais (registrados pelo usuÃ¡rio).

--------------------------------------------------

**Provento**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: Evento que gera renda ou entrada financeira ao investidor. Inclui dividendos, Juros sobre Capital PrÃ³prio (JCP), rendimentos de FIIs, amortizaÃ§Ãµes e distribuiÃ§Ãµes extraordinÃ¡rias.

Objetivo: Registrar e acompanhar toda receita gerada pelos ativos da carteira.

ObservaÃ§Ãµes: Proventos reduzem o custo total da posiÃ§Ã£o (mÃ©todo de custo mÃ©dio). O tratamento detalhado estÃ¡ em 05_PROVENTOS.md. A engine responsÃ¡vel pelo processamento futuro serÃ¡ a Proventos Engine.

ReferÃªncias: `06_BUSINESS_RULES/05_PROVENTOS.md`

--------------------------------------------------

**Evento Corporativo**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: Evento promovido pela empresa emissora ou pelo mercado que altera a composiÃ§Ã£o, identificaÃ§Ã£o ou estrutura dos ativos. Inclui desdobramentos (split), grupamentos (reverse split), bonificaÃ§Ãµes, subscriÃ§Ãµes, incorporaÃ§Ãµes, fusÃµes, cisÃµes e conversÃµes.

Objetivo: Garantir que alteraÃ§Ãµes estruturais nos ativos sejam corretamente refletidas na carteira.

ObservaÃ§Ãµes: Dividendos e JCP nÃ£o sÃ£o eventos corporativos â€” pertencem ao domÃ­nio de Proventos. A Corporate Action Engine Ã© responsÃ¡vel pelo processamento.

ReferÃªncias: `06_BUSINESS_RULES/04_CORPORATE_ACTIONS.md`, `07_TECHNICAL_ANNEXES/02_CORPORATE_ACTION_ENGINE.md`

--------------------------------------------------

**PatrimÃ´nio**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: Valor total da carteira em determinado momento, calculado como a soma do valor de mercado de todas as posiÃ§Ãµes.

Objetivo: Acompanhar a evoluÃ§Ã£o financeira do investidor ao longo do tempo.

ObservaÃ§Ãµes: O patrimÃ´nio considera cotaÃ§Ãµes atualizadas dos ativos. O valor investido (total de compras menos vendas) Ã© um conceito distinto.

--------------------------------------------------

**EstratÃ©gia**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: Conjunto de regras e objetivos definidos pelo usuÃ¡rio para orientar suas decisÃµes de investimento. O sistema nÃ£o recomenda estratÃ©gias â€” apenas auxilia o usuÃ¡rio a executar a sua.

Objetivo: Permitir que o usuÃ¡rio defina e acompanhe sua prÃ³pria metodologia de investimentos.

ObservaÃ§Ãµes: A EstratÃ©gia do usuÃ¡rio Ã© soberana. O sistema jamais deverÃ¡ influenciar decisÃµes com opiniÃµes ou previsÃµes.

ReferÃªncias: `15_PRODUCT_PHILOSOPHY.md`

--------------------------------------------------

**Receita**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: Entrada financeira recebida pelo investidor, incluindo dividendos, JCP, rendimentos, salÃ¡rios e outras fontes de renda.

Objetivo: Registrar todas as fontes de entrada financeira para composiÃ§Ã£o da Vida Financeira.

--------------------------------------------------

**Despesa**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: SaÃ­da financeira realizada pelo investidor, incluindo gastos pessoais, contas, compras e outras obrigaÃ§Ãµes financeiras.

Objetivo: Registrar todas as saÃ­das financeiras para composiÃ§Ã£o da Vida Financeira.

--------------------------------------------------

**Vida Financeira**

Categoria: Conceito Financeiro

DefiniÃ§Ã£o: MÃ³dulo opcional que permite ao usuÃ¡rio controlar receitas e despesas pessoais, integrando visÃ£o patrimonial com fluxo de caixa pessoal.

Objetivo: Oferecer uma visÃ£o completa da saÃºde financeira do usuÃ¡rio, unindo investimentos e finanÃ§as pessoais.

ObservaÃ§Ãµes: MÃ³dulo opcional e desacoplado da carteira de investimentos. Pode ser ativado ou desativado conforme necessidade do usuÃ¡rio.

ReferÃªncias: `16_PRODUCT_BACKLOG.md` â€” FEAT-006, FEAT-007

--------------------------------------------------

# 6. Conceitos do Sistema

--------------------------------------------------

**Portfolio Ledger**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: Registro imutÃ¡vel de todas as operaÃ§Ãµes realizadas na carteira. Funciona como um livro contÃ¡bil: cada operaÃ§Ã£o Ã© registrada em ordem cronolÃ³gica e nÃ£o pode ser alterada ou removida sem auditoria.

Objetivo: Garantir rastreabilidade completa do histÃ³rico financeiro do usuÃ¡rio.

ObservaÃ§Ãµes: O conceito de Ledger Ã© fundamental para auditoria, conformidade fiscal e consistÃªncia dos cÃ¡lculos de rentabilidade.

ReferÃªncias: `04_DATA_MODEL.md`

--------------------------------------------------

**Portfolio Engine**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: Componente responsÃ¡vel por consolidar operaÃ§Ãµes em posiÃ§Ãµes financeiras, calcular preÃ§o mÃ©dio, rentabilidade e alocaÃ§Ã£o da carteira.

Objetivo: Centralizar toda a lÃ³gica de consolidaÃ§Ã£o patrimonial.

ReferÃªncias: `07_TECHNICAL_ANNEXES/03_PORTFOLIO_CONSOLIDATION_ENGINE.md`

--------------------------------------------------

**Snapshot**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: Estado completo da carteira em um determinado momento, incluindo posiÃ§Ãµes, saldos, cotaÃ§Ãµes e patrimÃ´nio.

Objetivo: Permitir reconstruÃ§Ã£o histÃ³rica da carteira e comparaÃ§Ã£o entre perÃ­odos.

ObservaÃ§Ãµes: Snapshots sÃ£o gerados periodicamente ou sob demanda para alimentar grÃ¡ficos de evoluÃ§Ã£o patrimonial.

--------------------------------------------------

**Fonte da Verdade**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: PrincÃ­pio arquitetural que estabelece que cada informaÃ§Ã£o no sistema possui uma Ãºnica fonte oficial de origem. Nenhum dado deve ser duplicado ou derivado sem referÃªncia explÃ­cita Ã  sua fonte.

Objetivo: Evitar inconsistÃªncias, duplicaÃ§Ãµes e divergÃªncias entre mÃ³dulos.

ObservaÃ§Ãµes: A documentaÃ§Ã£o oficial na pasta `docs/` Ã© a Fonte da Verdade da documentaÃ§Ã£o. O Portfolio Ledger Ã© a Fonte da Verdade das operaÃ§Ãµes.

ReferÃªncias: `02_PROJECT_RULES.md`

--------------------------------------------------

**Dashboard**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: Interface principal do sistema que apresenta uma visÃ£o consolidada da carteira, incluindo grÃ¡ficos de evoluÃ§Ã£o patrimonial, alocaÃ§Ã£o por tipo de ativo, proventos recebidos e indicadores de desempenho.

Objetivo: Centralizar as informaÃ§Ãµes mais relevantes para o investidor em uma Ãºnica tela.

ReferÃªncias: `03_PRODUCT_REQUIREMENTS.md`

--------------------------------------------------

**Tax Engine**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: Componente responsÃ¡vel por calcular impostos sobre operaÃ§Ãµes financeiras, incluindo IRPF sobre vendas com lucro, day-trade e proventos.

Objetivo: Automatizar a apuraÃ§Ã£o tributÃ¡ria do investidor.

ObservaÃ§Ãµes: A Tax Engine considera as regras da Receita Federal do Brasil para operaÃ§Ãµes em bolsa de valores.

ReferÃªncias: `07_TECHNICAL_ANNEXES/01_PRICE_AVERAGE_ALGORITHMS.md`

--------------------------------------------------

**Dividend Engine**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: Componente atual responsÃ¡vel pela sincronizaÃ§Ã£o e processamento de dividendos e JCP provenientes de fontes externas (BRAPI, Yahoo Finance).

Objetivo: Automatizar o registro de proventos na carteira.

ObservaÃ§Ãµes: Conceito atual. Futuramente serÃ¡ substituÃ­do pela Proventos Engine, que unificarÃ¡ o tratamento de todos os proventos financeiros.

ReferÃªncias: `16_PRODUCT_BACKLOG.md` â€” FEAT-012

--------------------------------------------------

**Proventos Engine**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: Componente futuro responsÃ¡vel por centralizar o processamento de todos os proventos financeiros, incluindo dividendos, JCP, rendimentos de FIIs e demais proventos.

Objetivo: Substituir a atual Dividend Engine, unificando o tratamento de proventos em um Ãºnico motor.

ObservaÃ§Ãµes: Conceito futuro (aprovado, nÃ£o implementado). A implementaÃ§Ã£o estÃ¡ registrada como FEAT-012 no Product Backlog.

ReferÃªncias: `16_PRODUCT_BACKLOG.md` â€” FEAT-012

--------------------------------------------------

**Notification Engine**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: Componente responsÃ¡vel por gerar notificaÃ§Ãµes inteligentes para o usuÃ¡rio, baseadas em eventos da carteira, proventos recebidos, alteraÃ§Ãµes de ativos e demais ocorrÃªncias relevantes.

Objetivo: Manter o usuÃ¡rio informado sem excesso de notificaÃ§Ãµes.

ObservaÃ§Ãµes: As notificaÃ§Ãµes devem ser relevantes, evitando poluiÃ§Ã£o informacional.

ReferÃªncias: `16_PRODUCT_BACKLOG.md` â€” FEAT-008

--------------------------------------------------

**Strategy Engine**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: Componente responsÃ¡vel por auxiliar o usuÃ¡rio a definir e acompanhar sua estratÃ©gia de investimentos, incluindo metas, limites e regras pessoais.

Objetivo: Permitir que o usuÃ¡rio gerencie sua estratÃ©gia de forma organizada.

ObservaÃ§Ãµes: O sistema nÃ£o recomenda estratÃ©gias â€” apenas auxilia o usuÃ¡rio a executar a sua prÃ³pria.

--------------------------------------------------

**IntegraÃ§Ã£o**

Categoria: Conceito do Sistema

DefiniÃ§Ã£o: ConexÃ£o do sistema Lio Feliz com fontes externas de dados, incluindo APIs financeiras (BRAPI, Yahoo Finance), corretoras, B3 e serviÃ§os de cÃ¢mbio.

Objetivo: Automatizar a obtenÃ§Ã£o de dados sem necessidade de entrada manual.

ObservaÃ§Ãµes: IntegraÃ§Ãµes sÃ£o modulares e independentes. Cada integraÃ§Ã£o possui seu prÃ³prio adaptador.

ReferÃªncias: `06_BUSINESS_RULES/11_IMPORT_EXPORT.md`, `06_BUSINESS_RULES/12_INTEGRATIONS.md`

--------------------------------------------------

# 7. Conceitos da DocumentaÃ§Ã£o

--------------------------------------------------

**Business Rule**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: Documento que define regras financeiras, operacionais e de domÃ­nio do sistema. Cada Business Rule especifica o comportamento esperado do sistema em cenÃ¡rios especÃ­ficos.

Objetivo: Garantir que todas as regras do sistema estejam documentadas e rastreÃ¡veis.

ObservaÃ§Ãµes: Business Rules estÃ£o organizadas em `06_BUSINESS_RULES/`. SÃ£o a fonte primÃ¡ria para implementaÃ§Ã£o de lÃ³gica financeira.

ReferÃªncias: `06_BUSINESS_RULES/00_INDEX.md`

--------------------------------------------------

**Use Case**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: Documento que descreve um cenÃ¡rio de uso especÃ­fico do sistema, detalhando a interaÃ§Ã£o do usuÃ¡rio com o sistema e o resultado esperado.

Objetivo: Validar o comportamento do sistema em situaÃ§Ãµes reais.

ObservaÃ§Ãµes: Use Cases estÃ£o vinculados a FEATs atravÃ©s da Traceability Matrix.

ReferÃªncias: `17_TRACEABILITY_MATRIX.md`

--------------------------------------------------

**Technical Annex**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: Documento tÃ©cnico que especifica algoritmos, fÃ³rmulas, pseudocÃ³digo e decisÃµes de implementaÃ§Ã£o do sistema.

Objetivo: Servir como referÃªncia de implementaÃ§Ã£o para desenvolvedores.

ObservaÃ§Ãµes: Technical Annexes estÃ£o organizados em `07_TECHNICAL_ANNEXES/`. ContÃªm engines, algoritmos e especificaÃ§Ãµes tÃ©cnicas.

ReferÃªncias: `07_TECHNICAL_ANNEXES/00_INDEX.md`

--------------------------------------------------

**ADR (Architecture Decision Record)**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: Registro oficial de uma decisÃ£o arquitetural do projeto. Cada ADR documenta o contexto, problema, alternativas consideradas, decisÃ£o tomada e consequÃªncias.

Objetivo: Preservar o histÃ³rico de decisÃµes arquiteturais e justificar cada escolha.

ObservaÃ§Ãµes: ADRs estÃ£o organizados em `18_ARCHITECTURAL_DECISIONS/`. SÃ£o imutÃ¡veis â€” alteraÃ§Ãµes em decisÃµes anteriores geram novos ADRs.

ReferÃªncias: `18_ARCHITECTURAL_DECISIONS/00_INDEX.md`

--------------------------------------------------

**Traceability Matrix**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: Mapa oficial da documentaÃ§Ã£o que relaciona cada FEAT Ã s suas Business Rules, Use Cases, Technical Annexes e ADRs correspondentes.

Objetivo: Conectar funcionalidades a seus documentos relacionados, facilitando navegaÃ§Ã£o e auditoria.

ObservaÃ§Ãµes: A Traceability Matrix nÃ£o contÃ©m regras de negÃ³cio nem detalhes de implementaÃ§Ã£o. Sua Ãºnica responsabilidade Ã© servir como mapa.

ReferÃªncias: `17_TRACEABILITY_MATRIX.md`

--------------------------------------------------

**Feature (FEAT)**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: Identificador Ãºnico de uma funcionalidade aprovada para o produto. Cada FEAT possui um ID permanente (FEAT-NNN), prioridade, categoria e ciclo de vida.

Objetivo: Rastrear cada funcionalidade desde a aprovaÃ§Ã£o atÃ© a implementaÃ§Ã£o.

ObservaÃ§Ãµes: Nenhuma funcionalidade pode ser implementada sem estar registrada no Product Backlog com um ID FEAT.

ReferÃªncias: `16_PRODUCT_BACKLOG.md`

--------------------------------------------------

**Product Backlog**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: Documento oficial que registra todas as funcionalidades aprovadas para o Lio Feliz. Cada funcionalidade possui ID Ãºnico, prioridade, categoria e status.

Objetivo: Centralizar o registro de todas as funcionalidades do produto.

ObservaÃ§Ãµes: O backlog Ã© um documento vivo. Novas funcionalidades aprovadas devem ser registradas imediatamente.

ReferÃªncias: `16_PRODUCT_BACKLOG.md`

--------------------------------------------------

**DocumentaÃ§Ã£o Oficial**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: Conjunto completo de documentos localizados na pasta `docs/` do repositÃ³rio, organizados conforme a estrutura definida em `DOCUMENTATION_INDEX.md`.

Objetivo: Servir como a Ãºnica fonte de verdade da documentaÃ§Ã£o do projeto.

ObservaÃ§Ãµes: A DocumentaÃ§Ã£o Oficial possui prioridade igual ao cÃ³digo. Nenhuma implementaÃ§Ã£o pode divergir da documentaÃ§Ã£o sem que a documentaÃ§Ã£o seja atualizada.

ReferÃªncias: `DOCUMENTATION_INDEX.md`

--------------------------------------------------

**DocumentaÃ§Ã£o Consolidada**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: CÃ³pia derivada da DocumentaÃ§Ã£o Oficial, reunindo todos os documentos em um Ãºnico arquivo para consulta unificada. Localizada em `Documentos\Lio Feliz - DocumentaÃ§Ã£o\DOCUMENTACAO_COMPLETA.md`.

Objetivo: Facilitar consultas rÃ¡pidas e buscas na documentaÃ§Ã£o completa.

ObservaÃ§Ãµes: A DocumentaÃ§Ã£o Consolidada Ã© uma cÃ³pia derivada. A Ãºnica fonte oficial permanece sendo a pasta `docs/` do repositÃ³rio.

--------------------------------------------------

**Ordem de Leitura**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: SequÃªncia oficial de leitura dos documentos do projeto, definida em `00_START_HERE.md`. Todo desenvolvedor ou IA deve seguir esta ordem antes de modificar o cÃ³digo.

Objetivo: Garantir que o contexto completo do projeto seja compreendido antes de qualquer alteraÃ§Ã£o.

ObservaÃ§Ãµes: Nem todo documento oficial precisa estar na ordem de leitura â€” documentos de governanÃ§a podem ser excluÃ­dos.

ReferÃªncias: `00_START_HERE.md`

--------------------------------------------------

**Estrutura Oficial da DocumentaÃ§Ã£o**

Categoria: Conceito da DocumentaÃ§Ã£o

DefiniÃ§Ã£o: OrganizaÃ§Ã£o hierÃ¡rquica de todos os documentos oficiais do projeto, definida em `DOCUMENTATION_INDEX.md`. A estrutura inclui seÃ§Ãµes, subseÃ§Ãµes e o status de cada documento.

Objetivo: Definir a organizaÃ§Ã£o oficial da documentaÃ§Ã£o e servir como referÃªncia para navegaÃ§Ã£o.

ObservaÃ§Ãµes: O `DOCUMENTATION_INDEX.md` Ã© a fonte de verdade da estrutura. Qualquer alteraÃ§Ã£o na estrutura deve ser refletida neste documento.

ReferÃªncias: `DOCUMENTATION_INDEX.md`

--------------------------------------------------

# 8. Conceitos da Metodologia

--------------------------------------------------

**Auditoria**

Categoria: Conceito da Metodologia

DefiniÃ§Ã£o: Processo de verificaÃ§Ã£o sistemÃ¡tica da documentaÃ§Ã£o para identificar inconsistÃªncias, omissÃµes, conflitos e desalinhamentos entre documentos oficiais.

Objetivo: Garantir a integridade, consistÃªncia e confiabilidade da documentaÃ§Ã£o.

ObservaÃ§Ãµes: Auditorias seguem um fluxo oficial: Arquitetura â†’ ExecuÃ§Ã£o â†’ Auditoria â†’ AprovaÃ§Ã£o â†’ CorreÃ§Ã£o â†’ Nova Auditoria.

ReferÃªncias: `16_PRODUCT_BACKLOG.md` â€” FEAT-015

--------------------------------------------------

**ConsolidaÃ§Ã£o**

Categoria: Conceito da Metodologia

DefiniÃ§Ã£o: Processo de estabilizaÃ§Ã£o de um conjunto de documentos, garantindo que estejam consistentes, revisados e aprovados. Cada ConsolidaÃ§Ã£o Ã© numerada sequencialmente (ConsolidaÃ§Ã£o nÂº 1, nÂº 2, etc.).

Objetivo: Estabilizar a documentaÃ§Ã£o em marcos definidos, criando pontos de referÃªncia no histÃ³rico do projeto.

ObservaÃ§Ãµes: Uma ConsolidaÃ§Ã£o pode incluir criaÃ§Ã£o, revisÃ£o, correÃ§Ã£o e auditoria de documentos. O resultado Ã© registrado em PROJECT_STATE.md.

ReferÃªncias: `PROJECT_STATE.md`

--------------------------------------------------

**Sprint de EstabilizaÃ§Ã£o**

Categoria: Conceito da Metodologia

DefiniÃ§Ã£o: PerÃ­odo dedicado exclusivamente a corrigir inconsistÃªncias identificadas na documentaÃ§Ã£o, sem criar novos documentos ou alterar arquitetura.

Objetivo: Resolver problemas documentais de forma focada antes de avanÃ§ar para novas funcionalidades.

ObservaÃ§Ãµes: A Sprint de EstabilizaÃ§Ã£o segue o fluxo: auditoria â†’ relatÃ³rio â†’ correÃ§Ãµes â†’ validaÃ§Ã£o. InconsistÃªncias nÃ£o corrigidas permanecem registradas como pendÃªncias.

ReferÃªncias: `PROJECT_STATE.md`

--------------------------------------------------

**Baseline**

Categoria: Conceito da Metodologia

DefiniÃ§Ã£o: VersÃ£o estÃ¡vel da documentaÃ§Ã£o registrada apÃ³s um grande marco do projeto, representando um ponto em que toda a documentaÃ§Ã£o foi auditada, validada e considerada consistente.

Objetivo: Facilitar auditorias futuras, permitir comparaÃ§Ã£o entre versÃµes e servir como ponto oficial de retorno em caso de inconsistÃªncias.

ObservaÃ§Ãµes: Conceito futuro (aprovado, nÃ£o implementado). Registrado como FEAT-016 no Product Backlog.

ReferÃªncias: `16_PRODUCT_BACKLOG.md` â€” FEAT-016

--------------------------------------------------

**GovernanÃ§a Documental**

Categoria: Conceito da Metodologia

DefiniÃ§Ã£o: Conjunto de prÃ¡ticas e regras para organizaÃ§Ã£o, manutenÃ§Ã£o e evoluÃ§Ã£o da documentaÃ§Ã£o oficial do projeto. Inclui documentos como PROJECT_STATE, CHANGELOG_DOCUMENTACAO, DOCUMENTATION_INDEX e 00_START_HERE.

Objetivo: Garantir que a documentaÃ§Ã£o seja mantida de forma organizada, consistente e rastreÃ¡vel.

ObservaÃ§Ãµes: Conceito em estudo. Registrado como FEAT-013 no Product Backlog.

ReferÃªncias: `16_PRODUCT_BACKLOG.md` â€” FEAT-013

--------------------------------------------------

**GovernanÃ§a do Projeto**

Categoria: Conceito da Metodologia

DefiniÃ§Ã£o: Estrutura futura que consolidarÃ¡ toda a metodologia de desenvolvimento do projeto Lio Feliz em um Ãºnico documento oficial, incluindo filosofia, princÃ­pios, hierarquia, papÃ©is, fluxos e processos.

Objetivo: Consolidar toda a metodologia do projeto em um Ãºnico documento de referÃªncia.

ObservaÃ§Ãµes: Conceito em estudo. Registrado como FEAT-017 no Product Backlog. Preferencialmente implementado apÃ³s a primeira versÃ£o estÃ¡vel (MLP).

ReferÃªncias: `16_PRODUCT_BACKLOG.md` â€” FEAT-017

--------------------------------------------------

# 9. Conceitos Gerais

--------------------------------------------------

**Fonte CanÃ´nica**

Categoria: Conceito Geral

DefiniÃ§Ã£o: PrincÃ­pio de que cada informaÃ§Ã£o no sistema possui uma Ãºnica fonte oficial de origem. SinÃ´nimo de Fonte da Verdade.

Objetivo: Evitar inconsistÃªncias e duplicaÃ§Ãµes.

ObservaÃ§Ãµes: A Fonte CanÃ´nica Ã© um conceito arquitetural fundamental. A documentaÃ§Ã£o oficial em `docs/` Ã© a Fonte CanÃ´nica da documentaÃ§Ã£o.

ReferÃªncias: `02_PROJECT_RULES.md`

--------------------------------------------------

**Imutabilidade**

Categoria: Conceito Geral

DefiniÃ§Ã£o: PrincÃ­pio de que determinados registros nÃ£o podem ser alterados ou removidos apÃ³s sua criaÃ§Ã£o. Aplicado ao Portfolio Ledger, ADRs e registros de operaÃ§Ãµes.

Objetivo: Garantir rastreabilidade, auditoria e conformidade fiscal.

ObservaÃ§Ãµes: Registros imutÃ¡veis podem ser corrigidos apenas atravÃ©s de novos registros (compensaÃ§Ã£o), nunca por alteraÃ§Ã£o do registro original.

--------------------------------------------------

**Registro CronolÃ³gico**

Categoria: Conceito Geral

DefiniÃ§Ã£o: PrincÃ­pio de que eventos e operaÃ§Ãµes devem ser registrados em ordem cronolÃ³gica, preservando a sequÃªncia temporal exata em que ocorreram.

Objetivo: Permitir reconstruÃ§Ã£o histÃ³rica precisa e cÃ¡lculos corretos de rentabilidade.

--------------------------------------------------

**Versionamento**

Categoria: Conceito Geral

DefiniÃ§Ã£o: PrÃ¡tica de atribuir versÃµes numÃ©ricas a documentos e artefatos do projeto para rastrear alteraÃ§Ãµes ao longo do tempo.

Objetivo: Permitir identificaÃ§Ã£o de versÃµes, comparaÃ§Ã£o entre estados e rastreamento de evoluÃ§Ã£o.

ObservaÃ§Ãµes: O versionamento da documentaÃ§Ã£o segue o padrÃ£o semÃ¢ntico (major.minor). Cada alteraÃ§Ã£o relevante incrementa a versÃ£o.

--------------------------------------------------

**Compatibilidade Retroativa**

Categoria: Conceito Geral

DefiniÃ§Ã£o: PrincÃ­pio de que alteraÃ§Ãµes no sistema nÃ£o devem quebrar funcionalidades existentes ou invalidar dados histÃ³ricos do usuÃ¡rio.

Objetivo: Proteger o investimento do usuÃ¡rio em dados e configuraÃ§Ãµes existentes.

ObservaÃ§Ãµes: AlteraÃ§Ãµes que afetam cÃ¡lculos financeiros devem preservar a consistÃªncia dos resultados histÃ³ricos.

--------------------------------------------------

# 10. DecisÃµes de Projeto

- Existe apenas uma definiÃ§Ã£o oficial para cada termo.
- Nenhum documento poderÃ¡ redefinir conceitos existentes.
- Sempre que um novo termo relevante surgir, ele deverÃ¡ ser registrado neste GlossÃ¡rio antes de ser utilizado na documentaÃ§Ã£o oficial.
- O GlossÃ¡rio passa a ser referÃªncia obrigatÃ³ria para toda a documentaÃ§Ã£o do projeto.

---

# 11. ReferÃªncias

- `DOCUMENTATION_INDEX.md` â€” Ã­ndice oficial da documentaÃ§Ã£o.
- `PROJECT_STATE.md` â€” estado do projeto e consolidaÃ§Ãµes.
- `17_TRACEABILITY_MATRIX.md` â€” matriz de rastreabilidade.
- `18_ARCHITECTURAL_DECISIONS/` â€” decisÃµes arquiteturais.
- `06_BUSINESS_RULES/` â€” regras de negÃ³cio.
- `07_TECHNICAL_ANNEXES/` â€” anexos tÃ©cnicos.
- `04_DATA_MODEL.md` â€” modelo de dados e conceitos fundamentais.

---

# 12. HistÃ³rico

## VersÃ£o 1.0

- CriaÃ§Ã£o do VocabulÃ¡rio Oficial do Projeto.
- DefiniÃ§Ã£o dos conceitos financeiros, do sistema, da documentaÃ§Ã£o, da metodologia e gerais.
- Estabelecimento dos princÃ­pios do GlossÃ¡rio.

## Fonte: docs\PROJECT_IDEAS.md
# Lio Feliz - MemÃ³ria do Projeto

# PROJECT_IDEAS.md

**Projeto:** Lio Feliz

**Documento:** PROJECT_IDEAS.md

**VersÃ£o:** 1.0

**Status:** EM EVOLUÃ‡ÃƒO

**Ãšltima atualizaÃ§Ã£o:** 07/07/2026

---

# Objetivo

Este documento registra ideias, conceitos, intenÃ§Ãµes e possibilidades para o futuro do Lio Feliz.

Diferentemente da documentaÃ§Ã£o oficial, este arquivo nÃ£o define regras obrigatÃ³rias.

Seu objetivo Ã© preservar o raciocÃ­nio desenvolvido ao longo da evoluÃ§Ã£o do projeto para que nenhuma ideia importante seja perdida.

As ideias registradas aqui poderÃ£o, futuramente, tornar-se funcionalidades oficiais, documentos tÃ©cnicos ou decisÃµes arquiteturais.

---

# Filosofia Central

O Lio Feliz nÃ£o Ã© apenas um sistema para acompanhar investimentos.

Seu objetivo Ã© organizar completamente a vida financeira do investidor de longo prazo.

Sempre que uma nova funcionalidade for proposta, a pergunta deverÃ¡ ser:

> Esta funcionalidade ajuda o usuÃ¡rio a organizar seu patrimÃ´nio de forma mais simples, segura e eficiente?

Se a resposta for negativa, sua inclusÃ£o deve ser cuidadosamente avaliada.

---

# O Problema que o Lio Feliz Resolve

Hoje o investidor costuma utilizar vÃ¡rias plataformas ao mesmo tempo.

Exemplo:

- Corretora;
- B3;
- Investidor10;
- Planilhas;
- Aplicativos de controle;
- Calculadoras para Imposto de Renda.

Isso gera retrabalho, inconsistÃªncias e perda de tempo.

O Lio Feliz pretende concentrar toda essa gestÃ£o em um Ãºnico ambiente.

---

# PrincÃ­pios Fundamentais

## O usuÃ¡rio Ã© dono dos prÃ³prios dados.

Nenhuma integraÃ§Ã£o externa serÃ¡ obrigatÃ³ria.

O sistema deverÃ¡ funcionar de forma totalmente independente.

---

## IntegraÃ§Ãµes apenas facilitam o trabalho.

As integraÃ§Ãµes nÃ£o serÃ£o a base do sistema.

Elas apenas automatizam processos.

---

## O sistema deve reduzir trabalho manual.

Sempre que for possÃ­vel automatizar um processo com seguranÃ§a, essa serÃ¡ a soluÃ§Ã£o preferencial.

---

## TransparÃªncia

O usuÃ¡rio deverÃ¡ compreender como cada cÃ¡lculo foi realizado.

O sistema deverÃ¡ explicar seus resultados sempre que possÃ­vel.

---

# Ideias por Tema

## Dashboard

Objetivo:

Ao abrir o sistema, o usuÃ¡rio deve conseguir responder rapidamente:

- Quanto possuo hoje?
- Quanto recebi este mÃªs?
- Minha carteira estÃ¡ balanceada?
- Preciso realizar algum aporte?
- Quanto falta para atingir minha meta?
- Existem eventos corporativos pendentes?
- Existe alguma pendÃªncia fiscal?

---

## Rebalanceamento

O rebalanceamento serÃ¡ um dos principais diferenciais do projeto.

O sistema deverÃ¡ indicar:

- percentual atual;
- percentual alvo;
- diferenÃ§a;
- quanto investir em cada ativo;
- impacto do aporte sugerido;
- carteira apÃ³s o aporte.

As recomendaÃ§Ãµes deverÃ£o respeitar integralmente a estratÃ©gia definida pelo usuÃ¡rio.

O sistema nÃ£o recomendarÃ¡ ativos com base em opiniÃµes ou anÃ¡lises de mercado.

---

## IntegraÃ§Ã£o com a B3

Objetivo ideal:

ApÃ³s uma compra realizada na corretora, o ativo deverÃ¡ aparecer automaticamente na carteira do usuÃ¡rio.

Caso a sincronizaÃ§Ã£o nÃ£o seja possÃ­vel, o sistema deverÃ¡ oferecer alternativas como importaÃ§Ã£o por CSV.

A ausÃªncia da integraÃ§Ã£o nunca poderÃ¡ impedir o funcionamento do sistema.

---

## Portabilidade do Investidor10

O Investidor10 serÃ¡ utilizado apenas para facilitar a migraÃ§Ã£o do usuÃ¡rio para o Lio Feliz.

ApÃ³s a importaÃ§Ã£o, o sistema utilizarÃ¡ exclusivamente seus prÃ³prios dados.

O funcionamento do projeto nunca dependerÃ¡ do Investidor10.

---

## GestÃ£o Fiscal

A organizaÃ§Ã£o fiscal deverÃ¡ ocorrer continuamente durante todo o ano.

O objetivo Ã© que, ao chegar o perÃ­odo da declaraÃ§Ã£o do Imposto de Renda, praticamente todas as informaÃ§Ãµes jÃ¡ estejam prontas.

Sempre que possÃ­vel, relatÃ³rios deverÃ£o ser gerados automaticamente.

---

## Eventos Corporativos

Sempre que possÃ­vel, os seguintes eventos deverÃ£o ser processados automaticamente:

- Dividendos;
- Juros sobre Capital PrÃ³prio (JCP);
- Rendimentos de FIIs;
- BonificaÃ§Ãµes;
- Desdobramentos;
- Grupamentos;
- SubscriÃ§Ãµes;
- AmortizaÃ§Ãµes;
- IncorporaÃ§Ãµes;
- FusÃµes;
- CisÃµes;
- ConversÃµes de ativos.

---

## Ativos Internacionais

O projeto deverÃ¡ tratar ativos internacionais como cidadÃ£os de primeira classe.

NÃ£o serÃ£o adaptaÃ§Ãµes feitas posteriormente.

Todo o sistema deverÃ¡ ser preparado para lidar com:

- mÃºltiplas moedas;
- cÃ¢mbio;
- aÃ§Ãµes estrangeiras;
- ETFs internacionais;
- REITs;
- tributaÃ§Ã£o especÃ­fica;
- diferentes calendÃ¡rios de mercado.

---

## Objetivos Financeiros

O usuÃ¡rio poderÃ¡ definir objetivos como:

- patrimÃ´nio total;
- renda passiva mensal;
- aposentadoria;
- metas por classe de ativos.

O sistema deverÃ¡ acompanhar automaticamente a evoluÃ§Ã£o dessas metas.

---

## Filosofia de Crescimento

Sempre que novas funcionalidades forem implementadas, deverÃ¡ ser avaliado:

- se realmente resolvem um problema;
- se aumentam a complexidade;
- se podem ser incorporadas a funcionalidades existentes;
- se respeitam a simplicidade do sistema.

---

# Ideias Futuras

Entre as possibilidades para versÃµes futuras:

- Aplicativo mÃ³vel;
- Carteiras familiares;
- MÃºltiplos usuÃ¡rios;
- Compartilhamento de carteiras;
- SimulaÃ§Ãµes avanÃ§adas;
- Planejamento de aposentadoria;
- ComparaÃ§Ã£o entre estratÃ©gias;
- InteligÃªncia Artificial integrada;
- Sistema de notificaÃ§Ãµes;
- ExportaÃ§Ã£o avanÃ§ada de relatÃ³rios.

Estas ideias nÃ£o representam compromisso de implementaÃ§Ã£o.

---

# ObservaÃ§Ãµes

Este documento deve evoluir continuamente.

Novas ideias poderÃ£o ser adicionadas sempre que surgirem.

Nenhuma ideia registrada aqui deve ser considerada obrigatÃ³ria atÃ© que seja incorporada Ã  documentaÃ§Ã£o oficial do projeto.
