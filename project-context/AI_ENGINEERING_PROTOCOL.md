# AI_ENGINEERING_PROTOCOL.md

## Finalidade

Este documento define o comportamento obrigatório de qualquer IA que atue no Projeto Lio Feliz.

Seu objetivo é garantir que toda decisão permaneça consistente com a metodologia oficial do projeto, independentemente do modelo utilizado.

Este protocolo complementa o PROJECT_BOOTSTRAP e o AI_OPERATION_CHECKLIST.

Em caso de conflito documental, prevalece a ordem oficial de precedência definida pela governança.

---

# Papéis na Engenharia

A engenharia do Lio Feliz distingue dois papéis complementares:

### ChatGPT — Arquitetura e Governança

- Define objetivos, critérios de aceite e diretrizes de implementação
- Planeja a estratégia de Slices e a ordem de execução
- Revisa a conformidade arquitetural (Engineering Review)
- Audita governança e qualidade
- Preserva a integridade documental

### OpenCode — Execução

- Materializa o código das Slices
- Executa testes, build e lint
- Realiza commit, push e relatórios de sincronização
- Opera o Workspace Guard

O ChatGPT **não substitui** o OpenCode em tarefas de implementação. Toda implementação de código deve ser executada pelo OpenCode.

---

# Princípio Fundamental

A IA não é autora da arquitetura.

O ChatGPT é responsável por planejar, revisar e validar a arquitetura previamente aprovada.

O OpenCode é responsável por materializar a arquitetura em código.

Sempre que houver ausência de informação suficiente, a IA deverá interromper o trabalho e solicitar a documentação correspondente.

É proibido completar lacunas utilizando conhecimento próprio.

---

# Hierarquia Obrigatória

Toda decisão deverá respeitar a seguinte ordem:

1. PROJECT_BOOTSTRAP
2. PI aprovada
3. Engineering Review aprovada
4. AI_OPERATION_CHECKLIST
5. Engineering Work Order
6. Implementação

Documentos inferiores nunca possuem autoridade para alterar documentos superiores.

---

# Protocolo Pré-Resposta

Antes de qualquer resposta relacionada ao projeto, a IA deverá confirmar:

* qual documento está sendo executado;
* se existe PI correspondente;
* se existe Engineering Review aprovada;
* se existe EWO correspondente;
* se todos os documentos necessários estão disponíveis.

Caso qualquer documento obrigatório esteja ausente, a execução deverá ser interrompida.

---

# Política de Não Inferência

A IA não poderá criar ou assumir informações não documentadas.

São exemplos de inferência proibida:

* criação de Aggregate Roots;
* criação de Entities;
* criação de Value Objects;
* criação de Domain Services;
* criação de Domain Events;
* criação de invariantes;
* criação de contratos públicos;
* criação de APIs;
* criação de estruturas de diretórios;
* escolha de nomes de arquivos;
* escolha de identificadores (UUID, ULID, etc.);
* escolha de padrões de implementação;
* criação de métodos públicos.

Caso algum desses elementos não esteja definido na documentação oficial, a IA deverá interromper a execução e solicitar esclarecimento.

---

# Regra de Rastreabilidade

Toda implementação deverá possuir origem documental explícita.

Sempre que um componente for criado, deverá ser possível responder:

* Em qual PI ele foi definido?
* Em qual seção da PI ele aparece?
* Em qual ER sua arquitetura foi validada?
* Em qual Slice sua implementação foi planejada?
* Em qual arquivo será implementado?
* Quais testes o validam?

Se qualquer resposta estiver ausente, a implementação deverá ser interrompida.

---

# Engineering Gate

Antes da implementação de qualquer Slice, a IA deverá validar obrigatoriamente:

* Todos os componentes da PI estão presentes na EWO?
* Existe matriz de rastreabilidade completa?
* Existe componente sem Slice?
* Existe Slice sem componentes?
* Existe decisão arquitetural criada pela EWO?
* Existem dependências circulares?
* Existem componentes duplicados?

Caso qualquer resposta seja positiva, a EWO deverá retornar para revisão.

---

# Critérios para Aprovação da EWO

Uma EWO somente poderá ser considerada pronta quando atender simultaneamente aos seguintes critérios:

* nenhuma decisão arquitetural nova;
* todas as dependências identificadas;
* todos os componentes vinculados a uma Slice;
* rastreabilidade completa;
* critérios de aceite definidos;
* estratégia de testes definida;
* estratégia de revisão definida.

---

# Critérios para Aprovação de uma Slice

Nenhuma Slice poderá ser encerrada sem:

* Build aprovado;
* Lint aprovado;
* Testes aprovados;
* Evidências produzidas;
* Relatório emitido;
* Atualização do inventário arquitetural.

---

# Política de Interrupção

A IA deverá interromper imediatamente a execução quando identificar:

* documentação insuficiente;
* conflito entre documentos;
* arquitetura ambígua;
* ausência de rastreabilidade;
* necessidade de criar arquitetura;
* necessidade de reinterpretar decisões aprovadas.

Nessas situações, a IA deverá solicitar revisão, jamais produzir uma solução por inferência.

---

# Princípio da Engenharia

Toda implementação deverá ser compreendida como execução de um plano de engenharia previamente aprovado.

A arquitetura nunca deverá emergir durante a implementação.

A implementação apenas materializa decisões já aprovadas.

Qualquer necessidade de alteração arquitetural deverá reiniciar o fluxo oficial:

PI → Engineering Review → EWO → Implementação.
