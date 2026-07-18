# Lio Feliz - Documentação Oficial

# 00_START_HERE.md

**Projeto:** Lio Feliz

**Documento:** 00_START_HERE.md

**Versão da Documentação:** 1.0

**Versão do Projeto:** Em Desenvolvimento

**Status:** APROVADO

**Última atualização:** 07/07/2026

**Autor:** Rafael Santos + ChatGPT

---

# Objetivo

Este é o primeiro documento que deve ser lido por qualquer pessoa ou Inteligência Artificial antes de realizar qualquer alteração no projeto.

Seu objetivo é garantir que todas as implementações respeitem a arquitetura, as regras de negócio, a visão do sistema e a experiência do usuário.

Este documento possui prioridade máxima sobre qualquer outra instrução operacional.

---

# Sobre o Projeto

O Lio Feliz é uma plataforma de gestão patrimonial voltada para investidores de longo prazo.

Seu objetivo é automatizar tarefas operacionais relacionadas aos investimentos, centralizar informações financeiras e auxiliar o investidor a seguir sua própria estratégia de forma organizada, simples e eficiente.

O sistema não fornece recomendações financeiras.

O sistema apenas organiza informações, realiza cálculos, automatiza processos e auxilia o usuário a executar sua própria estratégia de investimentos.

---

# Ordem Obrigatória de Leitura

Antes de analisar qualquer linha de código, leia obrigatoriamente os documentos abaixo nesta ordem:

1. 00_START_HERE.md
2. 20_PROJECT_MAP.md
3. 01_VISION.md
4. 02_PROJECT_RULES.md
5. 03_PRODUCT_REQUIREMENTS.md
6. 04_DATA_MODEL.md
7. 05_SYSTEM_ARCHITECTURE.md
8. 06_BUSINESS_RULES/
9. 16_PRODUCT_BACKLOG.md
10. 17_TRACEABILITY_MATRIX.md
11. 18_ARCHITECTURAL_DECISIONS/
12. 19_GLOSSARY.md
13. 07_TECHNICAL_ANNEXES/
14. PROJECT_BOOTSTRAP.md
15. AI_CONTEXT.md
16. AI_OPERATION_CHECKLIST.md

> A numeração completa e o status de cada documento estão definidos em [`DOCUMENTATION_INDEX.md`](./DOCUMENTATION_INDEX.md), que é a fonte de verdade oficial da estrutura da documentação.

Somente após concluir toda a leitura o código poderá ser analisado.

---

# Fluxo Obrigatório de Trabalho

Toda implementação deve seguir exatamente esta sequência.

1. Ler toda a documentação.

↓

2. Compreender completamente a solicitação do usuário.

↓

3. Identificar quais módulos serão afetados.

↓

4. Analisar cuidadosamente o código existente.

↓

5. Procurar componentes, serviços, hooks, funções ou utilitários reutilizáveis.

↓

6. Verificar possíveis impactos em outras partes do sistema.

↓

7. Elaborar um plano de implementação.

↓

8. Apresentar esse plano ao usuário.

↓

9. Aguardar aprovação.

↓

10. Somente então modificar o código.

---

# Antes de Escrever Código

Responder internamente às seguintes perguntas.

- Estou respeitando a visão do projeto?
- Estou respeitando todas as regras de negócio?
- Existe código semelhante?
- Existe componente semelhante?
- Existe hook semelhante?
- Existe service semelhante?
- Existe alguma implementação que possa ser reutilizada?
- Estou aumentando a complexidade do sistema?
- Existe uma solução mais simples?

Se qualquer resposta gerar dúvida, interromper a implementação e revisar a documentação.

---

# Durante o Desenvolvimento

Sempre:

- reutilizar componentes existentes;
- reutilizar serviços existentes;
- reutilizar hooks existentes;
- manter o código organizado;
- manter o código simples;
- documentar decisões importantes;
- preservar a arquitetura existente.

Nunca:

- criar componentes duplicados;
- criar páginas duplicadas;
- criar lógica duplicada;
- criar serviços duplicados;
- criar código temporário;
- implementar soluções apenas para funcionar;
- aumentar a complexidade sem necessidade.

---

# Verificação Obrigatória

Antes de informar que uma tarefa foi concluída, verificar obrigatoriamente:

- o projeto continua compilando;
- não existem erros de TypeScript;
- não existem erros de ESLint;
- não existem componentes mortos;
- não existem imports não utilizados;
- não existem arquivos sem utilização;
- não existem funcionalidades duplicadas;
- não existem regressões.

---

# Segurança nas Alterações

Sempre que uma implementação envolver:

- patrimônio;
- preço médio;
- rentabilidade;
- dividendos;
- juros sobre capital próprio;
- bonificações;
- desdobramentos;
- grupamentos;
- renda fixa;
- tributação;
- câmbio;
- investimentos internacionais;
- rebalanceamento;
- qualquer cálculo financeiro;

a consistência dos resultados deve ser preservada.

Antes de considerar a implementação concluída, verificar obrigatoriamente:

- os cálculos permanecem corretos;
- nenhuma regra de negócio foi alterada sem aprovação;
- nenhum dado existente foi corrompido;
- os resultados continuam consistentes após a alteração.

Caso exista qualquer dúvida, interromper a implementação e comunicar o usuário.

---

# Consistência da Implementação

Nunca considere uma funcionalidade concluída apenas porque um novo código foi escrito.

Também é obrigatório verificar:

- se existem componentes antigos realizando a mesma função;
- se existem telas obsoletas;
- se existem abas desnecessárias;
- se existem rotas antigas ainda acessíveis;
- se existem fluxos antigos que contradizem a nova implementação;
- se a interface realmente representa o comportamento implementado;
- se a documentação continua compatível com o código.

Caso exista qualquer inconsistência entre código, interface e documentação, a tarefa NÃO deve ser considerada concluída.

---

# Comunicação com o Usuário

Ao finalizar qualquer implementação apresentar obrigatoriamente:

## Resumo

O que foi realizado.

## Arquivos Alterados

Quais arquivos foram modificados.

## Motivo

Por que cada alteração foi realizada.

## Impactos

Quais partes do sistema podem ter sido afetadas.

## Riscos

Se existe algum risco conhecido.

## Próximos Passos

Quais melhorias podem ser feitas futuramente.

Nunca responder apenas:

"Pronto."

Ou:

"Concluído."

---

# Quando Encontrar Problemas

Caso seja encontrada qualquer inconsistência na arquitetura, na documentação ou no código:

Não modificar imediatamente.

Primeiro:

- listar todos os problemas encontrados;
- explicar por que são problemas;
- indicar quais documentos estão sendo violados;
- propor uma solução.

Somente implementar após aprovação do usuário.

---

# Atualização da Documentação

Sempre que uma funcionalidade importante for criada, removida ou modificada:

Atualizar automaticamente os documentos necessários.

Nunca permitir que a documentação fique desatualizada em relação ao código.

A documentação é a principal fonte de verdade do projeto.

---

# Princípios Fundamentais

## Simplicidade

Sempre escolher a solução mais simples que resolva corretamente o problema.

---

## Reutilização

Sempre reutilizar código existente antes de criar novas implementações.

---

## Organização

Cada componente deve possuir apenas uma responsabilidade.

---

## Escalabilidade

Toda implementação deve considerar o crescimento futuro do projeto.

---

## Independência

As regras de negócio nunca devem depender de tecnologias específicas, APIs externas ou fornecedores de dados.

---

## Integridade dos Dados

Nenhuma implementação poderá comprometer a consistência dos dados financeiros do usuário.

---

## Experiência do Usuário

A experiência do usuário possui prioridade sobre conveniências de implementação.

---

## Automação

Sempre que possível, tarefas repetitivas devem ser automatizadas.

O usuário deve precisar realizar a menor quantidade possível de trabalho manual.

---

## Transparência

Sempre explicar claramente ao usuário quais alterações foram realizadas e por quê.

---

## Evolução Contínua

Toda nova funcionalidade deve fortalecer a arquitetura existente.

Nunca implementar soluções que resolvam apenas o problema atual ignorando a evolução futura do projeto.

Sempre desenvolver funcionalidades reutilizáveis, modulares e preparadas para futuras expansões.

---

## Neutralidade Financeira

O sistema jamais deverá influenciar as decisões de investimento do usuário com base em opiniões, previsões ou análises de mercado.

Sua função é organizar informações, realizar cálculos e auxiliar o usuário a executar a estratégia definida por ele próprio.

Toda sugestão apresentada pelo sistema deverá ser baseada exclusivamente nas regras configuradas pelo usuário e nos dados existentes em sua carteira.

---

# Missão da IA

A função da IA neste projeto não é apenas escrever código.

Sua missão é preservar a qualidade da arquitetura, manter a documentação atualizada, evitar complexidade desnecessária e ajudar a evoluir o sistema de forma consistente.

Toda decisão deve contribuir para tornar o Lio Feliz uma plataforma robusta, organizada, confiável, preparada para crescer durante muitos anos e simples de manter.

---

# Histórico de Alterações

## Versão 1.0

- Criação do documento.
- Definição do fluxo oficial de desenvolvimento.
- Definição das responsabilidades da IA.
- Definição dos princípios fundamentais do projeto.
- Definição do processo de comunicação com o usuário.
- Inclusão das regras de segurança para alterações financeiras.
- Inclusão da regra de consistência entre código, interface e documentação.
- Inclusão dos princípios de Evolução Contínua e Neutralidade Financeira.
