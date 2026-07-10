# Workflow — Metodologia Oficial de Trabalho

**Projeto:** Lio Feliz

**Documento:** WORKFLOW.md

**Versão:** 1.2

**Status:** Estável

**Categoria:** Project Context

**Responsável:** Rafael Santos + IA

**Última atualização:** 09/07/2026

---

> A metodologia oficial de desenvolvimento do projeto está documentada em [`DEVELOPMENT_METHODOLOGY.md`](./DEVELOPMENT_METHODOLOGY.md).
>
> Este documento contém apenas as regras de execução operacional.

---

### 1. Hierarquia Oficial da Documentação

O projeto possui três categorias de documentação.

**1.1. Fonte Canônica**

Representa a documentação oficial.

Inclui:

- `docs/`
- `architecture-lab/`
- `project-context/`

Toda alteração deverá ocorrer primeiro nesses diretórios.

Eles representam a única fonte oficial do projeto.

**1.2. Espelho (Backup)**

Representa apenas uma cópia sincronizada da Fonte Canônica.

Local:

`H:\Lio Feliz - Backup\`

Nunca poderá conter alterações próprias.

Nunca poderá divergir da Fonte Canônica.

**1.3. Artefatos Derivados**

Representam documentos gerados automaticamente.

Exemplo:

`DOCUMENTACAO_COMPLETA.md`

Sua finalidade é:

- leitura;
- consulta;
- pesquisa;
- apoio às ferramentas de IA.

Eles NÃO representam a fonte oficial do projeto.

Sempre que houver divergência, prevalecerá a Fonte Canônica.

---

### 2. Separação entre Hipótese e Decisão

A documentação oficial conterá apenas decisões consolidadas.

Hipóteses permanecerão no Architecture Lab.

---

### 3. Hipótese como Padrão

Sempre que houver dúvida entre registrar uma hipótese ou oficializar um conceito, optar pela hipótese.

---

### 4. Separação de Propósitos

Antes de criar qualquer documento novo, verificar se ele pertence à **Documentação Oficial** (`docs/`), ao **Architecture Lab** (`architecture-lab/`) ou ao **Project Context** (`project-context/`). Nenhum documento deve misturar esses três propósitos.

---

### 5. Fluxo Oficial de Evolução

Toda alteração deverá seguir obrigatoriamente a seguinte sequência.

```
Ideia

↓

Architecture Lab

↓

Validação

↓

Documentação Oficial

↓

Implementação

↓

Sincronização do Backup

↓

Regeneração dos Artefatos Derivados
```

---

### 6. Fluxo Oficial de Trabalho com IA

Toda sessão de trabalho deverá seguir o fluxo abaixo.

```
Discussão

↓

Descobertas

↓

Consolidação da Sessão

↓

Prompt para OpenCode

↓

Implementação

↓

Validação

↓

Atualização dos Backups

↓

Atualização do Project Context

↓

Fim da Sprint
```

---

### 7. Consolidação da Sessão

Ao final de cada assunto concluído deverão ser respondidas as seguintes perguntas.

1. O que foi descoberto?
2. Essa descoberta pertence ao Architecture Lab ou à documentação oficial?
3. Deve ser registrada?
4. Existe impacto no Product Backlog?
5. Existe impacto em ADRs?
6. Existe impacto em Business Rules?
7. Existe impacto no Glossário?
8. Existe impacto no Project Context?
9. Qual prompt deverá ser enviado ao OpenCode?
10. Os backups e artefatos derivados precisam ser atualizados?

---

### 8. Política Oficial para Prompts

Todo prompt destinado ao OpenCode deverá obedecer às seguintes regras.

**8.1. Autossuficiência**

O OpenCode não possui acesso às conversas realizadas com a IA.

Todo contexto necessário deverá estar contido no próprio prompt.

Nunca utilizar instruções como:

"Utilize o conteúdo da conversa."

**8.2. Todo prompt deverá ser autossuficiente.**

**8.3. Estrutura recomendada**

Sempre que possível deverá conter:

- objetivo;
- contexto;
- estrutura;
- conteúdo completo ou especificação suficiente;
- validações;
- restrições;
- relatório final esperado.

**8.4. Entrega como versão final**

Todo prompt entregue ao usuário deverá ser considerado uma versão final.

Melhorias identificadas durante sua elaboração deverão ser incorporadas antes da entrega.

Após entregue, o prompt somente poderá ser alterado através de uma nova tarefa explicitamente aprovada.

**8.5. Pronto para uso**

Os prompts deverão ser escritos considerando que o usuário não precisará editá-los manualmente.

Eles deverão estar prontos para serem copiados e enviados diretamente ao OpenCode.

---

### 9. Política da Documentação Consolidada

`DOCUMENTACAO_COMPLETA.md` é um documento derivado.

Sua finalidade é apenas:

- leitura;
- pesquisa;
- consulta;
- apoio às ferramentas de IA.

Ele NÃO representa a documentação oficial.

Em qualquer divergência, sempre prevalecerão os documentos individuais presentes na Fonte Canônica.

---

### 10. Política de Backup

A política permanente de backup do projeto é:

1. Toda nova pasta permanente criada no projeto deverá possuir uma cópia correspondente em `H:\Lio Feliz - Backup\`.
2. O backup deverá espelhar a estrutura do repositório.
3. Os arquivos `PROJECT_CONTEXT.md`, `PROJECT_STATUS.md` e `WORKFLOW.md` deverão possuir uma cópia adicional em `H:\Lio Feliz - Contexto\`, destinada exclusivamente ao início de novas conversas com IA.
4. Sempre que uma alteração impactar documentos presentes no backup ou no Project Context, as respectivas cópias deverão ser atualizadas na mesma tarefa.
5. Toda nova metodologia aprovada para o desenvolvimento deverá ser refletida nos arquivos do Project Context sempre que aplicável.
6. O backup nunca poderá conter alterações próprias — é exclusivamente um espelho da Fonte Canônica.
7. Artefatos Derivados (como `DOCUMENTACAO_COMPLETA.md`) são gerados no backup, mas sua Fonte de verdade são os arquivos individuais da Fonte Canônica.
8. Toda pasta pertencente à Fonte Canônica deverá possuir espelho completo dentro de `H:\Lio Feliz - Backup\` e espelho individual dentro de `Copias_Individuais\`.
9. Os espelhos deverão preservar exatamente a estrutura, organização, conteúdo e nomenclatura originais.
10. Qualquer novo diretório permanente criado futuramente na Fonte Canônica deverá automaticamente passar a fazer parte da política de backup.
11. O Project Context segue os mesmos padrões de versionamento da documentação oficial.

---

### 11. Classificação das Alterações

O projeto passa a possuir duas categorias independentes de alterações.

**13.1. Mudanças de Produto**

Exemplos:

- novas funcionalidades;
- Business Rules;
- módulos;
- APIs;
- interfaces;
- regras de implementação.

**13.2. Mudanças de Processo**

Exemplos:

- metodologia;
- governança;
- documentação;
- backups;
- fluxo de desenvolvimento;
- integração entre IA e OpenCode.

Essas categorias deverão ser tratadas independentemente.

Uma mudança de processo não requer aprovação no Product Backlog.

Uma mudança de produto não altera a metodologia.

Ambas as categorias, quando aplicáveis, deverão ser registradas no Architecture Lab antes de serem aplicadas.

---

## Histórico

### Versão 1.2

- Adicionada referência ao `DEVELOPMENT_METHODOLOGY.md` como documento oficial de metodologia.
- Removidas seções §11 (Baseline), §12 (Evolução da Metodologia), §14 (Evolução Incremental), §15 (Preservação do Conhecimento), §16 (Evoluções Planejadas) — conteúdo migrado para `DEVELOPMENT_METHODOLOGY.md`.
- Renumerada §13 (Classificação das Alterações) para §11.

### Versão 1.1

- Adicionada seção Evolução Incremental dos Documentos (§14).
- Adicionada seção Preservação do Conhecimento (§15).
- Adicionada seção Evoluções Planejadas com EVOL-001 a EVOL-004 (§16).

### Versão 1.0 — Baseline da Metodologia

- Consolidação da governança documental.
- Consolidação do fluxo ChatGPT → OpenCode.
- Consolidação do fluxo Architecture Lab.
- Consolidação do fluxo de documentação oficial.
- Consolidação da política de backups.
- Consolidação do Project Context.
- Criação da Baseline da Metodologia (§11).
- Criação do fluxo formal de Evolução da Metodologia (§12).
- Criação da Classificação das Alterações (Produto vs Processo) (§13).
- Status alterado de APROVADO para Estável.
