# Lio Feliz - Documentação Oficial

# 02_PROJECT_RULES.md

**Projeto:** Lio Feliz

**Documento:** 02_PROJECT_RULES.md

**Versão da Documentação:** 1.0

**Versão do Projeto:** Em Desenvolvimento

**Status:** APROVADO

**Última atualização:** 07/07/2026

**Autor:** Rafael Santos + ChatGPT

---

# Objetivo

Este documento define as regras de desenvolvimento do projeto Lio Feliz.

Seu objetivo é garantir que todo código produzido seja consistente, reutilizável, organizado, escalável e de fácil manutenção.

Todas as implementações deverão seguir obrigatoriamente estas regras.

Caso alguma solicitação entre em conflito com este documento, a IA deverá informar o usuário antes de prosseguir.

---

# Ordem de Prioridade

Quando existir conflito entre documentos, utilizar a seguinte prioridade:

1. 00_START_HERE.md
2. 01_VISION.md
3. 02_PROJECT_RULES.md
4. Demais documentos

---

# Filosofia de Desenvolvimento

Antes de escrever qualquer código, sempre seguir esta ordem:

1. Entender o problema.
2. Procurar solução existente.
3. Reutilizar o máximo possível.
4. Criar nova implementação apenas quando necessário.

---

# Regras Obrigatórias

| Regra                                       | Obrigatório |
| ------------------------------------------- | :---------: |
| Reutilizar componentes existentes           |     ✅      |
| Reutilizar Hooks existentes                 |     ✅      |
| Reutilizar Services existentes              |     ✅      |
| Reutilizar Utilitários existentes           |     ✅      |
| Atualizar documentação quando necessário    |     ✅      |
| Explicar alterações importantes             |     ✅      |
| Verificar impacto em outras funcionalidades |     ✅      |

---

# É Proibido

Nunca:

- duplicar componentes;
- duplicar lógica;
- duplicar consultas;
- duplicar regras de negócio;
- criar código apenas para resolver um problema momentâneo;
- criar implementações difíceis de manter;
- alterar comportamento existente sem analisar impactos;
- remover código sem verificar dependências.

---

# Componentes

Antes de criar um componente novo:

- verificar se já existe um semelhante;
- verificar se pode ser generalizado;
- verificar se pode receber propriedades adicionais;
- verificar se outro componente pode ser reutilizado.

Criar um novo componente apenas quando realmente necessário.

---

# Hooks

Criar Hooks apenas quando existir lógica reutilizável.

Nunca criar Hooks contendo apenas uma ou duas linhas sem necessidade.

Sempre manter um Hook responsável por uma única finalidade.

---

# Services

Toda comunicação externa deverá ocorrer através de Services.

Exemplos:

- APIs
- Supabase
- B3
- CSV
- Importações
- Exportações

Componentes de interface nunca deverão conter lógica de comunicação externa.

---

# Regras de Negócio

Nenhuma regra financeira poderá ficar dentro da interface.

Toda regra de negócio deverá permanecer isolada da interface.

Isso inclui:

- preço médio;
- patrimônio;
- dividendos;
- câmbio;
- IR;
- rebalanceamento;
- rentabilidade.

---

# Organização

Cada arquivo deverá possuir apenas uma responsabilidade.

Sempre preferir arquivos menores e especializados.

Evitar arquivos gigantes contendo diferentes responsabilidades.

---

# Nomeação

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

## Utilitários

Nome descritivo.

Exemplo:

calculateAveragePrice

---

# Interface do Usuário

A interface deve:

- ser simples;
- ser intuitiva;
- evitar excesso de informações;
- facilitar a navegação;
- priorizar clareza.

Sempre que houver dúvida entre uma interface bonita e uma interface clara, escolher a interface mais clara.

---

# Banco de Dados

Antes de criar novas tabelas:

- verificar tabelas existentes;
- verificar relacionamentos;
- evitar duplicação de informações;
- preservar integridade dos dados.

---

# Performance

Evitar:

- consultas repetidas;
- renderizações desnecessárias;
- processamento duplicado;
- cálculos repetitivos.

Sempre reutilizar resultados quando possível.

---

# Segurança

Nunca expor:

- chaves privadas;
- tokens;
- credenciais;
- informações sensíveis.

Toda comunicação deverá respeitar autenticação e autorização.

---

# Testes

Sempre verificar:

- compilação;
- funcionamento da funcionalidade;
- possíveis regressões;
- impacto em outras telas.

Nenhuma implementação deverá ser considerada concluída sem validação.

---

# Documentação

Sempre atualizar a documentação quando:

- uma funcionalidade for criada;
- uma regra for alterada;
- uma arquitetura mudar;
- uma integração for adicionada.

A documentação possui prioridade igual ao código.

---

# Código Morto

Sempre remover:

- imports não utilizados;
- funções não utilizadas;
- componentes abandonados;
- arquivos sem uso.

Nunca deixar código obsoleto no projeto.

---

# Refatoração

Quando identificar código que pode ser melhorado:

Não alterar automaticamente.

Primeiro informar:

- o problema;
- os benefícios;
- os riscos;
- a proposta de melhoria.

Somente refatorar após aprovação do usuário.

---

# Qualidade

Todo código produzido deverá ser:

- simples;
- legível;
- modular;
- reutilizável;
- previsível;
- consistente.

Código complexo somente será aceito quando existir justificativa técnica.

---

# Responsabilidade da IA

A IA não deve apenas implementar funcionalidades.

Ela também deverá:

- proteger a arquitetura;
- preservar a organização do projeto;
- evitar crescimento descontrolado do código;
- identificar oportunidades de melhoria;
- informar riscos antes de implementar alterações significativas.

---

# Checklist Obrigatório

Antes de concluir qualquer tarefa:

☐ Li toda a documentação.

☐ Analisei o código existente.

☐ Reutilizei componentes quando possível.

☐ Evitei duplicações.

☐ Atualizei documentação.

☐ Verifiquei impactos.

☐ Testei a implementação.

☐ Expliquei as alterações ao usuário.

Nenhuma tarefa deverá ser considerada concluída sem esse checklist.

---

# Histórico de Alterações

## Versão 1.0

- Criação do documento.
- Definição das regras gerais de desenvolvimento.
- Definição das regras de reutilização.
- Definição das responsabilidades da IA.
- Definição do checklist obrigatório.
