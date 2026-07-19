# Architecture Lab

O Architecture Lab é um ambiente de descoberta arquitetural do projeto Lio Feliz, independente da documentação oficial.

## Propósito

- Amadurecimento de conceitos arquiteturais antes de sua oficialização.
- Preservação de hipóteses, pesquisas e raciocínios.
- Exploração livre sem compromisso com implementação imediata.

## Regras

- O laboratório **não faz parte** da documentação oficial.
- Nenhum documento em `docs/` deve ser alterado a partir deste laboratório.
- Somente conceitos maduros e validados poderão migrar para `docs/`.
- Ideias ainda não representam decisões oficiais.
- Sempre que existir dúvida entre registrar uma hipótese ou consolidá-la como verdade, optar pela hipótese.
- O laboratório privilegia a preservação do raciocínio sobre a conclusão.

## Fluxo de Evolução

Ideia

↓

Research Log

↓

Discussão

↓

Hipótese

↓

Validação

↓

Constituição

↓

Modelo Conceitual

↓

ADR

↓

Business Rules

↓

Implementação

## Estados

Rascunho

↓

Exploração

↓

Hipótese

↓

Validação

↓

Consolidado

↓

Oficializado

## Metodologia de Trabalho

### Registro Contínuo de Conhecimento

Toda descoberta arquitetural relevante deverá ser registrada no Architecture Lab.

Nenhuma ideia importante deverá permanecer apenas nas conversas realizadas durante o desenvolvimento.

Sempre que uma sessão produzir conceitos relevantes, deverá ser criado um registro apropriado no documento correspondente do laboratório.

O objetivo é preservar o conhecimento arquitetural, reduzir dependência do histórico das conversas e permitir evolução contínua da arquitetura.

### Geração de Prompts para o OpenCode

Sempre que uma atividade arquitetural ou documental for concluída durante as discussões, deverá ser gerado um prompt completo destinado ao OpenCode.

Esse prompt deverá ser autossuficiente.

O OpenCode não possui acesso ao histórico das conversas.

Portanto, todo contexto necessário deverá estar contido no próprio prompt.

Nunca utilizar instruções como:

"Utilize o conteúdo desta conversa."

Todo prompt deverá conter, sempre que aplicável:

- objetivo;
- contexto;
- estrutura;
- conteúdo completo ou especificação suficiente;
- validações;
- restrições;
- relatório final esperado.

O objetivo é garantir que qualquer tarefa possa ser executada corretamente independentemente do histórico da conversa.

Ao final de cada sessão, antes de encerrar o assunto, faremos uma "Consolidação da Sessão".

Essa consolidação teria sempre três perguntas:

1. O que foi descoberto?
2. O que precisa ser registrado no Architecture Lab?
3. Qual prompt deve ser enviado ao OpenCode?

Isso cria um ciclo muito disciplinado de evolução e praticamente elimina o risco de perder conhecimento importante entre conversas.

## Critérios para promoção

Uma ideia somente poderá migrar para a documentação oficial quando:

- explicar um problema do domínio;
- sobreviver aos cenários extremos;
- simplificar a arquitetura;
- não contradizer princípios existentes;
- utilizar linguagem consolidada.

## Estrutura atual

00_CONSTITUTION.md

01_DOMAIN_MODEL.md

02_DOMAIN_LAWS.md

03_KNOWLEDGE_FLOW.md

04_CANONICAL_LANGUAGE.md

05_RESEARCH_LOG.md

06_IDEAS_BACKLOG.md
