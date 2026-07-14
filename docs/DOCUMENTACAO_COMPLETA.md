# Documentação Consolidada — Lio Feliz

**Projeto:** Lio Feliz

**Documento:** DOCUMENTACAO_COMPLETA.md

**Versão:** 1.24

**Status:** Artefato Derivado

**Última atualização:** 13/07/2026

---

> **Aviso:** Este é um artefato derivado gerado para leitura e consulta. A fonte de verdade é a documentação individual na Fonte Canônica (`docs/`, `architecture-lab/`, `project-context/`). Em caso de divergência, prevalecem os documentos individuais.

> **Inicialização rápida:** Utilize `PROJECT_BOOTSTRAP.md` (v2.18) como Runtime Operacional. Este documento (`DOCUMENTACAO_COMPLETA.md`) é a Fonte Canônica para consulta quando necessário.

---

# 1. Sobre o Projeto

O Lio Feliz é uma plataforma de gestão patrimonial voltada para investidores de longo prazo. Seu objetivo é automatizar tarefas operacionais relacionadas aos investimentos, centralizar informações financeiras e auxiliar o investidor a seguir sua própria estratégia de forma organizada, simples e eficiente.

**Stack:** TanStack Start (React + SSR + Vite + Nitro), Tailwind CSS, shadcn/ui, Supabase (PostgreSQL), Cloudflare Module Worker.

---

# 2. Filosofia da Metodologia

> O projeto evolui através de refinamento incremental.
> Nenhuma decisão importante deve depender da memória das conversas.
> A metodologia do projeto deve evoluir continuamente.
> Sempre que uma melhoria permanente for identificada durante o desenvolvimento, ela deverá ser incorporada à metodologia oficial.
> A metodologia torna-se parte integrante do projeto e evolui juntamente com sua arquitetura.

---

# 3. Metodologia de Trabalho com IA

### IA-001 a IA-010 — Protocolos Fundamentais

IA-001: Incorporação de Melhorias. IA-002: Auditoria de Conhecimento. IA-003: Consolidação em Prompt Único. IA-004: Registro de Decisões Futuras. IA-005: Classificação por Categoria. IA-006: Incorporação Imediata. IA-007: Verificação de Decisões ao Encerrar. IA-008: Avaliação Automática de Sprint. IA-009: Classificação Automática das Descobertas. IA-010: Consolidação Inteligente de Prompts.

### IA-015 — Persistência Operacional

Manter Estado Operacional ativo durante toda a conversa. Alterações apenas por novo PS, nova Baseline, mudança explícita de objetivo ou nova evidência objetiva aprovada.

### IA-016 — Relatórios Operacionais

Todo RCF deve conter Sugestões Técnicas e Oportunidades Futuras. Registrar explicitamente quando inexistentes.

### IA-025 — Continuidade Operacional

Objetivo atual permanece válido até solicitação explícita, nova Baseline ou evidência objetiva.

### IA-026 — Autoverificação Operacional

Antes de responder: modo correto? DEC ativa? Evidência objetiva? Plano válido? Entrega Relevante? Backlog Estratégico ativo? Se for Entrega Relevante, ritual OP-002 é obrigatório e inomitível. Se existir Backlog Estratégico ativo, verificar se deve ser exibido — nunca omitir automaticamente.

### IA-027 — Tratamento de Evidências Externas

Evidências de ferramentas auxiliares não alteram automaticamente documentação. Devem ser validadas pelo ChatGPT.

### IA-028 — Agrupamento Inteligente de Execução

PS dividido em múltiplos prompts: informar "Prompt Único" ou "Prompt X de N". Somente o último solicita RCF.

### IA-029 — Baseline Operacional

AI_CONTEXT.md + PROJECT_BOOTSTRAP.md + DOCUMENTACAO_COMPLETA.md = Baseline Operacional. Única fonte de verdade da sessão.

### IA-030 — Gestão Contínua do Backlog Estratégico

Toda melhoria aprovada e adiada recebe um BK e é registrada no Strategic Backlog. Melhorias recém-identificadas aparecem em 📋 Pendências até registro. Antes de criar PS, verificar BK compatível. BKs obsoletos são arquivados com justificativa.

---

# 4. Protocolos de Governança

### PG-019 — Estabilidade das Decisões

DEC aprovada é válida durante Modo Execução. Reavaliação apenas com evidência objetiva.

### Fluxo Oficial de Evidências Externas

ChatGPT → Define PS → Ferramenta Auxiliar → Executa → RCF → Sugestões → Oportunidades → Usuário → ChatGPT → Valida → INS/DEC/PS.

---

# 5. Protocolos Operacionais

### OP-002 — Encerramento por Entrega Relevante

Toda Entrega Relevante encerra com a sequência exata e inomitível:

📊 Auditoria da Sprint

📋 Pendências

📌 Fila de Sincronização

❤️ Saúde do Chat

### OP-003 — Formato Visual Padronizado

Utilizar o formato visual acima em toda Entrega Relevante.

### OP-007 — Classificação das Sugestões

Categorias: Correção, Otimização, Simplificação, Refatoração, Documentação, Governança, Arquitetura.

### OP-008 — Fluxo de Múltiplos Prompts

Cada prompt identificado como "Prompt X de N". Apenas o último solicita RCF.

### OP-009 — Estrutura Padrão de Prompts

1. Objetivo, 2. Implementação, 3. Atualizações Obrigatórias, 4. DOCUMENTACAO_COMPLETA, 5. RCF, 6. Sugestões Técnicas, 7. Oportunidades Futuras, 8. SYNC_HISTORY.

### OP-010 — Checklist Vinculado aos Protocolos

Todo novo protocolo operacional deve atualizar AI_OPERATION_CHECKLIST.md. Caso contrário, incompleto.

### OP-011 — Template Vinculado aos Protocolos

PS_TEMPLATE.md deve refletir IA, PG, OP, PGR vigentes. Revisar em toda alteração operacional relevante.

### OP-012 — Classificação Oficial das Pendências

Três categorias independentes:

1. **Pendências da Sprint** — atividades da sprint ativa. Podem ser removidas automaticamente quando concluídas.
2. **Backlog Estratégico** — melhorias aprovadas não implementadas. Nunca desaparece automaticamente. Removido apenas quando implementado ou descartado formalmente. Deve ser exibido após Pendências da Sprint sempre que ativo. Toda oportunidade futura aprovada em auditorias deve ser registrada aqui.
3. **Fila de Execução** — sequência planejada do projeto. Não substitui Pendências nem Backlog Estratégico.

### Ciclo de Vida dos BK

Proposto → Validado → Registrado → Planejado → Em Implementação → Concluído → Arquivado

### Princípio da Fonte Canônica

Cada informação relevante possui uma única fonte canônica. Demais documentos apenas resumem ou referenciam. Cópias independentes não são permitidas.

---

# 6. Painel Operacional e Indicadores

### Layout

📋 Painel Operacional (Projeto, Modo, PS, Marco) + barras 🏛🏗⚙💻.

### Políticas

Exibição automática apenas em início de chat, alteração de PS/Marco/percentuais ou solicitação explícita. Painel não contém Saúde/Auditoria/Pendências/Fila. Percentuais com critérios objetivos em PROJECT_PROGRESS_PANEL.md.

---

# 7. Estado Operacional da Sessão

Projeto ativo, Objetivo atual, Modo da sessão, PS vigente, DEC ativas, Baseline válida, Protocolos ativos.

---

# 8. AI Operation Checklist

`AI_OPERATION_CHECKLIST.md` (v1.3) — checklist executável para pré-resposta, Entrega Relevante, Painel, Prompt, Estado Operacional, Checklist Vinculado (OP-010), Backlog Estratégico e Strategic Backlog.

---

# 9. Backlog Estratégico

Melhorias aprovadas que aguardam implementação. Itens ativos:

| BK | Descrição | Prioridade |
|----|-----------|------------|
| BK-001 | Simplificar AI_CONTEXT (Concluído) | Baixa |
| BK-002 | Auditoria de referências (Concluído) | Baixa |
| BK-005 | PROJECT_MANIFEST.md (Proposto) | Baixa |

---

# 10. Auditoria de Sprint

Descoberta → Classificação → Auditoria de Conhecimento → Consolidação → Prompt Único → Atualização.

---

# 11. Working Draft e Refinamento

Documentos complexos iniciam como WD. Refinamento: Discussão → WD → Refinamento → Nova Versão → Oficial.

---

# 12. Estrutura da Documentação

**Fonte Canônica:** docs/, architecture-lab/, project-context/. **Artefatos Derivados:** DOCUMENTACAO_COMPLETA.md.

### Ordem Oficial de Precedência Documental

1. **DOCUMENTACAO_COMPLETA.md** — Fonte Canônica
2. **PROJECT_BOOTSTRAP.md** — Runtime Operacional
3. **AI_CONTEXT.md** — Estado Operacional

Em caso de divergência, prevalece o documento de maior precedência.

---

# 13. Referências

- Metodologia: DEVELOPMENT_METHODOLOGY.md (v1.8)
- AI Context: AI_CONTEXT.md (v1.8)
- AI Checklist: AI_OPERATION_CHECKLIST.md (v1.4)
- Project Bootstrap: PROJECT_BOOTSTRAP.md (v2.0)
- Strategic Backlog: 09_STRATEGIC_BACKLOG.md (v0.10)
- Progress Panel: PROJECT_PROGRESS_PANEL.md (v1.1)
- PS Template: PS_TEMPLATE.md
- Workflow: WORKFLOW.md
- Índice: DOCUMENTATION_INDEX.md
- Sync History: SYNC_HISTORY.md

---

# Histórico

### Versão 1.14

PI-001 v0.1 (Draft) materializada. Bootstrap v2.7.

### Versão 1.13

Versionamento e Imutabilidade das PI. DEVELOPMENT_METHODOLOGY.md v2.1. Bootstrap v2.6.

### Versão 1.12

Fluxo de Engenharia (PI → EWO → ER) formalizado. DEVELOPMENT_METHODOLOGY.md v2.0. Bootstrap v2.5.

### Versão 1.11

OP-002 estabelecido como Fonte Canônica exclusiva da ❤️ Saúde do Chat. Bootstrap v2.4.

### Versão 1.10

OP-002 evoluído (GS-001.1). ❤️ Saúde do Chat com formato classificado 🟢🟡🔴. IA-031 Gatilhos renumerado para IA-032. Bootstrap v2.3.

### Versão 1.9

Continuidade Arquitetural formalizada (IA-031). Resumo Operacional Canônico do PI-001 registrado no Bootstrap v2.1.

### Versão 1.8

Runtime Operacional consolidado. Bootstrap v2.0 comprovadamente autossuficiente. AI_CONTEXT.md v1.9. Auditoria de Runtime concluída (12/07/2026).

### Versão 1.7

PROJECT_BOOTSTRAP.md v2.0 (Runtime Operacional). AI_CONTEXT.md v1.8 simplificado. Referências sincronizadas.

### Versão 1.6

PS#033 (Prompt 3). Ordem de Precedência Documental adicionada. Marco Documentação Consolidada registrado. Referências atualizadas.

### Versão 1.5

PS#032 (Prompt 2). IA-030, Strategic Backlog, Fonte Canônica, Ciclo de Vida dos BK. AI_CONTEXT.md simplificado (v1.6).

### Versão 1.4

Emenda Final ao PS#030D — OP-012. IA-026 com Backlog Estratégico. AI_CONTEXT.md v1.4. AI_OPERATION_CHECKLIST.md v1.2.

### Versão 1.3

Emenda ao PS#030D — Ritual OP-002 inomitível. OP-010, OP-011. PS_TEMPLATE.md.

### Versão 1.2

PS#030D — IA-028, IA-029, OP-008, OP-009, Painel, AI_OPERATION_CHECKLIST, PROJECT_PROGRESS_PANEL.

### Versão 1.1

PS#030C — IA-016, IA-027, OP-007. Fluxo Evidências Externas.

### Versão 1.0

Consolidação inicial após PS#030B.
