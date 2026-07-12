# Project Bootstrap — Lio Feliz

**Documento:** PROJECT_BOOTSTRAP.md

**Versão:** 2.1

**Status:** APROVADO

**Categoria:** Project Context

**Última atualização:** 12/07/2026

---

> **O PROJECT_BOOTSTRAP é o Runtime Operacional oficial da IA.**
>
> Ele deve ser completamente autossuficiente.
>
> Após carregar `AI_CONTEXT.md` e `PROJECT_BOOTSTRAP.md`, a IA deverá conseguir continuar o projeto sem consultar qualquer outro documento.

---

# PARTE A — Estado do Projeto

## Projeto

Lio Feliz — Dashboard de Investimentos

## Modo

Execução

## Marco Atual

Documentação Consolidada (Concluído)

## PS Atual

Nenhum PS ativo no momento.

## Dashboard Executivo

```
📋 Painel Operacional

Projeto: Lio Feliz
Modo: Execução
PS Atual: —
Marco: Documentação Consolidada

🏛 Governanca    [████░░░░░░]  ~60%
🏗 Arquitetura   [████░░░░░░]  ~40%
⚙ Engineering   [██░░░░░░░░]  ~20%
💻 Codigo        [░░░░░░░░░░]  ~0%
```

> Fórmulas dos percentuais em `PROJECT_PROGRESS_PANEL.md`.

## Objetivos Ativos

Aguardando definição do próximo PS.

## DEC Ativas

Nenhuma.

## Backlog Atual

| BK | Descrição | Prioridade | Estado |
|----|-----------|------------|--------|
| BK-005 | PROJECT_MANIFEST.md | Baixa | Proposto |

## Próxima Etapa

Engineering N1 — PI-001 Interpretation Layer.

---

# PARTE B — Runtime Operacional

## Autoverificação Pré-Resposta (IA-026)

Antes de responder, verificar obrigatoriamente:

- [ ] Estou no modo correto?
- [ ] Existe DEC ativa?
- [ ] Existe evidência objetiva para alterar a direção?
- [ ] O plano atual permanece válido?
- [ ] Esta resposta constitui uma Entrega Relevante?
- [ ] Existe Backlog Estratégico ativo?
- [ ] Existe melhoria aprovada não registrada no Strategic Backlog?
- [ ] Existe BK compatível antes de criar um novo PS?

Sem evidência objetiva, executar o plano vigente. Backlog ativo nunca é omitido automaticamente.

## Fluxo Oficial de Inicialização

```
1. Ler AI_CONTEXT.md (identidade, estado, referências)
2. Ler PROJECT_BOOTSTRAP.md (runtime operacional completo)
3. Restaurar Estado Operacional automaticamente
4. Entrar automaticamente em modo Execução
5. Continuar exatamente da próxima etapa oficial
6. Proibido retornar ao modo consultivo sem necessidade
```

## Checklist Obrigatório

- [ ] Estado restaurado
- [ ] Projeto identificado
- [ ] Marco identificado
- [ ] PS identificado
- [ ] Próxima etapa identificada
- [ ] Autoverificação executada
- [ ] Dashboard atualizado quando aplicável
- [ ] Template correto selecionado
- [ ] Ritual de encerramento preparado

## Regras de Comportamento

A IA:
- **executa** — não replaneja decisões consolidadas
- **não propõe alternativas** para decisões já aprovadas
- **não reinicia** discussões encerradas
- **somente questiona** quando faltar informação objetiva
- **continua exatamente** do último Estado Operacional
- **persiste o Estado Operacional** durante toda a conversa (IA-015)
- **evidências externas** não alteram automaticamente documentação — devem ser validadas antes (IA-027)

## Dashboard Executivo — Documentação

### Padrão Visual

```
📋 Painel Operacional

Projeto:
Modo:
PS Atual:
Marco:

🏛 Governanca    [progresso]
🏗 Arquitetura   [progresso]
⚙ Engineering   [progresso]
💻 Codigo        [progresso]
```

### Modelo Oficial

Sempre usar o layout acima. Barras com caracteres `█` e `░`.

### Critérios de Atualização

Alterar percentuais apenas mediante: conclusão documental, conclusão de PI, conclusão de Milestone, conclusão de Release ou outro evento oficialmente definido.

### Quando Exibir

Início de novo chat (Baseline), alteração de PS, alteração de Marco, alteração de percentuais, solicitação explícita.

### Quando Ocultar

Não exibir se nenhum dos eventos acima ocorreu. O Painel não contém Saúde do Chat, Auditoria, Pendências ou Fila.

## Ritual Obrigatório de Encerramento

Toda resposta operacional deve terminar com:

```
📊 Auditoria da Sprint
    Avaliar o que foi feito, descoberto e classificado.
📋 Pendências
    Listar pendências abertas da sprint atual e Backlog Estratégico ativo.
❤️ Saúde do Chat
    Estado da conversa, próximos passos imediatos.
```

### Objetivo de Cada Bloco

| Bloco | Objetivo |
|-------|----------|
| 📊 Auditoria da Sprint | Avaliar entregas, descobertas e classificar |
| 📋 Pendências | Registrar o que ainda precisa ser feito |
| ❤️ Saúde do Chat | Estado da conversa e próximos passos |

> O Ritual é obrigatório e inomitível em toda Entrega Relevante (OP-002).

## Templates Oficiais

### Resposta Operacional (padrão)

Usar para respostas do dia a dia dentro de um PS ativo.

Estrutura: resposta direta + Ritual de Encerramento (quando aplicável).

### Prompt OpenCode

Usar quando for necessário executar alterações via OpenCode.

Estrutura:
1. Objetivo
2. Implementação
3. Atualizações Obrigatórias
4. DOCUMENTACAO_COMPLETA (regenerar ou não)
5. Relatório Consolidado Final (quando aplicável)
6. Sugestões Técnicas
7. Oportunidades Futuras
8. Registro em SYNC_HISTORY

### Múltiplos Prompts

Usar quando um PS exigir mais de um prompt.

Identificar cada prompt como "Prompt X de N". Somente o último solicita RCF.

### Atualização Simples

Usar para manutenções corretivas que não constituem novo PS.

Não gerar RCF. Executar alterações e confirmar.

### Pacotes de Sincronização (PS)

Usar para criar novo PS. Seguir `PS_TEMPLATE.md`. Sempre verificar antes se existe BK compatível no Strategic Backlog (IA-030).

### Checklist Vinculado (OP-010)

Todo novo protocolo operacional deve atualizar `AI_OPERATION_CHECKLIST.md`. Caso contrário, o protocolo é considerado incompleto.

### Template Vinculado (OP-011)

`PS_TEMPLATE.md` deve refletir os protocolos IA, PG, OP, PGR vigentes. Revisar sempre que houver alteração operacional relevante.

## Regras Operacionais

### Quando criar PS

Mudança significativa de arquitetura, metodologia, governança ou documentação que exija planejamento e rastreabilidade.

### Quando utilizar atualização simples

Manutenção corretiva de consistência, pequenos ajustes sem impacto arquitetural.

### Quando gerar relatório

Sempre no último prompt de um PS (Prompt N de N). Nunca em prompts intermediários.

### Quando não gerar relatório

Prompts intermediários, atualizações simples.

### Agrupamento inteligente de prompts

PS dividido em múltiplos prompts: informar "Prompt Único" ou "Prompt X de N".

### Criação de BK

Toda melhoria aprovada e adiada recebe um BK no Strategic Backlog. Verificar se existe BK compatível antes de criar novo PS.

### Registro de oportunidades futuras

Melhorias observadas durante execução que não pertencem ao escopo atual. Registrar em 📋 Pendências e, se aprovadas, migrar para o Strategic Backlog.

### Classificação das Sugestões (OP-007)

Toda sugestão deve ser classificada em uma única categoria: Correção, Otimização, Simplificação, Refatoração, Documentação, Governança ou Arquitetura.

## Gestão do Backlog

```
Ideia
    ↓
Pendências (📋)
    ↓
Prompt compatível existe? — Sim → Executar
    ↓ Não
Strategic Backlog (BK)
    ↓
Implementação
    ↓
Atualização do BK (Concluído / Arquivado)
```

## Ordem de Precedência

```
1. DOCUMENTACAO_COMPLETA.md    Fonte Canônica
2. PROJECT_BOOTSTRAP.md         Runtime Operacional
3. AI_CONTEXT.md                Estado Operacional
```

Mesmo que apenas AI_CONTEXT e PROJECT_BOOTSTRAP sejam enviados no início do chat.

## Próximo Passo Operacional

### Engineering N1 — PI-001 Interpretation Layer

| Campo | Valor |
|-------|-------|
| Nome | PI-001 — Interpretation Layer |
| Objetivo | Projetar a primeira especificação de engenharia responsável por interpretar as intenções do usuário e transformá-las em operações internas do sistema, estabelecendo a ponte entre a interação do usuário e os componentes centrais da arquitetura |
| Motivação | Iniciar oficialmente a fase de Engineering através da criação do primeiro artefato canônico de implementação, preservando a rastreabilidade entre Arquitetura, Engineering e Código |
| Entregável esperado | Documento canônico PI-001 contendo toda a especificação necessária para implementação da camada de interpretação |
| Estrutura mínima esperada | 1. Objetivo — 2. Motivação — 3. Problema que resolve — 4. Escopo — 5. Fora do escopo — 6. Requisitos Funcionais — 7. Requisitos Não Funcionais — 8. Arquitetura Geral — 9. Pipeline de Interpretação — 10. Componentes — 11. Interfaces — 12. Fluxo de Dados — 13. Dependências — 14. Critérios de Prontidão — 15. Critérios de Conclusão — 16. Estratégia de Implementação — 17. Riscos — 18. Evidências Esperadas — 19. Histórico |
| Resultado esperado | Especificação completa, consistente e aprovada, servindo como base oficial para a implementação da camada de interpretação |
| Critério de conclusão | PI-001 documentado, validado metodologicamente e pronto para iniciar a implementação do código |

> **Resumo Operacional Canônico:** Este resumo deve conter informações suficientes para que uma nova IA consiga iniciar corretamente a etapa sem consultar outros documentos.

## Contrato de Execução

Ao carregar este documento a IA assume automaticamente que:

- todas as decisões anteriores permanecem válidas;
- este documento possui precedência operacional;
- deve continuar exatamente da próxima etapa oficial;
- deve aplicar integralmente todas as regras aqui descritas.

---

# Histórico

## v2.1

Continuidade Arquitetural formalizada. Próximo Passo Operacional expandido com Resumo Operacional Canônico completo do PI-001. Observação canônica sobre autossuficiência entre chats registrada.

## v2.0

Runtime Operacional. Documento reestruturado em Partes A (Estado) e B (Runtime). Fluxo, Checklist, Autoverificação IA-026, Regras, Dashboard, Ritual OP-002, Templates (5 modelos), Precedência, Próximo Passo e Contrato formalizados. Protocolos IA-015, IA-027, IA-030, OP-007, OP-010, OP-011 incorporados. Documento comprovadamente autossuficiente via Auditoria de Runtime (12/07/2026).

## v1.1

PS#033 (Prompt 3). Ordem de Precedência adicionada. Estado atualizado. IA-030 incluída.

## v1.0

Criação do PROJECT_BOOTSTRAP.md. Documento de inicialização rápida.
