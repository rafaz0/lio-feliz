# PROMPT_MASTER.md

**Projeto:** Lio Feliz

**Versão:** 1.0

**Status:** APROVADO

**Categoria:** Project Context / Governança

**Última atualização:** 21/07/2026

---

> **Fonte canônica** para: Matriz de Seleção de Modelos, Prompt Operacional, Fluxo Operacional do ChatGPT e Registro Permanente de Melhorias.
>
> Instituído pela GOV-P013 (Consolidação Final do Fluxo Operacional).

---

## 1. Matriz de Seleção de Modelos

Define qual modelo de IA deve ser usado para cada categoria de atividade no projeto Lio Feliz.

| Modelo | Uso Principal | Atividades |
|--------|---------------|------------|
| **DeepSeek V4 Flash** | Implementação, correções, documentação operacional | Codificação, testes, build, lint, commit, push, auditoria incremental, encerramentos de EWO, relatórios de sincronização |
| **DeepSeek V4 Pro** | Planejamento estratégico, revisão arquitetural | Product Increment (PI), Engineering Review (ER), Engineering Work Order (EWO), decisões arquiteturais, validação metodológica |
| **GLM-5.2** | Auditoria independente e validação extraordinária | Segunda opinião arquitetural, validação de decisões críticas, auditoria externa de governança |

### 1.1 Regras

- O modelo recomendado deve ser informado no cabeçalho de todo prompt (ver §2).
- O modelo executor (DeepSeek V4 Flash) **não** toma decisões arquiteturais nem modifica PI/ER/EWO sem autorização explícita.
- O modelo de planejamento (DeepSeek V4 Pro) **não** implementa código — delega ao modelo executor.
- GLM-5.2 é acionado apenas mediante necessidade explícita de auditoria independente.

---

## 2. Prompt Operacional

Todo prompt enviado ao Agente Executor (OpenCode) deve iniciar com o seguinte cabeçalho:

```
Modelo recomendado: <modelo>
```

### Exemplos

```
Modelo recomendado: DeepSeek V4 Flash
```

```
Modelo recomendado: DeepSeek V4 Pro
```

### Efeito

- Informa ao agente qual comportamento e escopo de decisão são esperados.
- Modelo Flash assume postura executora (implementar, não arquitetar).
- Modelo Pro assume postura revisora/planejadora (arquitetar, não codificar).

---

## 3. Fluxo Operacional do ChatGPT

Procedimento obrigatório para o ChatGPT ao receber um relatório do OpenCode:

1. **Receber relatório do OpenCode** — incluindo branch, HEAD, hash, push, Working Tree e pendências registradas.
2. **Resumir objetivamente o resultado** — em 3-5 frases, capturar o essencial.
3. **Informar o estado atual da engenharia** — EWO ativa, Slice atual, situação, próxima etapa imediata (formato GOV-016).
4. **Gerar imediatamente o próximo prompt quando aplicável** — se o próximo passo é determinável a partir do resultado, produzi-lo sem perguntar "Deseja prosseguir?".

### Regras

- Não iniciar ciclos de perguntas quando o próximo passo já pode ser determinado.
- Se houver bloqueador técnico ou dúvida arquitetural, interromper e reportar — não emitir prompt incompleto.
- O relatório GOV-016 (Ritual de Encerramento) deve ser emitido ao final de toda Entrega Relevante.

---

## 4. Registro Permanente de Melhorias

Toda melhoria de processo aprovada durante uma conversa deve ser:

- **incorporada à documentação oficial** — atualizando o documento de governança correspondente; ou
- **registrada explicitamente como pendência futura** — no BK, TD ou relatório da atividade.

### O que não é permitido

- Manter melhorias apenas no histórico do chat.
- Descartar melhoria sem registro de destino (GOV-015).
- Incorporar apenas verbalmente ("anotado", "registrado mentalmente") sem artefato documental.

### Origem

Este procedimento consolida e reforça as regras GOV-006 (Materialização Obrigatória de Melhorias) e GOV-015 (Política de Incorporação Contínua de Melhorias), adicionando o requisito explícito de que melhorias aprovadas durante **qualquer conversa** (não apenas auditorias formais) devem ser permanentemente registradas.

---

> **Fim do PROMPT_MASTER.md v1.0** — Instituído pela GOV-P013.
