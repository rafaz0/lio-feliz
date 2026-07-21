# BR-13 — Relatórios (Geração, Agendamento e Exportação)

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-008 (Onda 3 — Módulo 13)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Relatórios** do Investidor Pro. O módulo permite gerar, agendar, visualizar e exportar relatórios consolidados de carteira, proventos, rentabilidade e posição fiscal — consumindo exclusivamente as projeções materializadas pelo `IProjectionRepository` (PA-009-003 / R-010). Nenhum relatório recalcula regras de domínio; apenas formata e exporta.

---

## 2. Tipos de Relatório Suportados

| Template | Conteúdo | Fonte | Formatos Exportáveis |
|----------|----------|-------|---------------------|
| **Carteira Consolidada** | Posição por ativo, alocação por tipo, valor total | `IProjectionRepository` | PDF, CSV, JSON |
| **Proventos** | Dividendos/JCP recebidos no período | `IProjectionRepository` (ProventoProjection) | PDF, CSV |
| **Rentabilidade** | Retorno acumulado por período, comparado a benchmarks | `IProjectionRepository` + Benchmarks | PDF, JSON |
| **Posição Fiscal** | IRPF mensal, ganho de capital, operações day-trade | `IProjectionRepository` + `ITaxStatementRepository` | CSV, JSON, declaração |
| **Evolução Patrimonial** | Valor total, invested, lucro acumulado (série temporal) | `IProjectionRepository` (HistoricoProjection) | PDF, CSV, JSON |
| **Metas** | Progressão de metas financeiras | `IFinancialGoalRepository` | PDF, CSV |
| **Rebalanceamento** | Alocação atual vs. alvo, sugestões de aporte | `IProjectionRepository` + `IConfigurationRepository` | PDF, CSV |

---

## 3. Modelo de Domínio

### 3.1 `ReportTemplate` (Entidade)

Define o molde de um relatório.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `ReportTemplateId` | Identificador imutável |
| `name` | `string` | Nome de exibição (ex: "Carteira Consolidada") |
| `description` | `string` | Descrição breve do conteúdo |
| `category` | `ReportCategory` | (`CARTEIRA`, `PROVENTOS`, `RENTABILIDADE`, `FISCAL`, `PATRIMONIO`, `METAS`, `REBALANCEAMENTO`) |
| `supportedFormats` | `ExportFormat[]` | Formatos em que o relatório pode ser exportado |
| `icon` | `string` | Ícone para UI |
| `isBuiltIn` | `boolean` | Se é template nativo (não pode ser excluído) |

### 3.2 `ReportExecution` (Entidade)

Uma execução concreta de um relatório.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `ReportExecutionId` | Identificador imutável |
| `templateId` | `ReportTemplateId` | Template usado |
| `portfolioId` | `string` | Carteira alvo |
| `status` | `ReportStatus` | (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`) |
| `format` | `ExportFormat` | Formato solicitado |
| `parameters` | `ReportParameters` | Filtros (período, tickers, categorias) |
| `fileUrl` | `string` | URL do arquivo gerado (se COMPLETED) |
| `error` | `string` | Mensagem de erro (se FAILED) |
| `requestedAt` | `Date` | Quando foi solicitado |
| `completedAt` | `Date` | Quando foi concluído |
| `sizeBytes` | `number` | Tamanho do arquivo gerado |

### 3.3 `ReportSchedule` (Entidade)

Agendamento recorrente de relatório.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `ReportScheduleId` | Identificador imutável |
| `templateId` | `ReportTemplateId` | Template a executar |
| `portfolioId` | `string` | Carteira alvo |
| `cron` | `string` | Expressão cron (ex: `0 8 * * 1` = toda segunda 8h) |
| `format` | `ExportFormat` | Formato de saída |
| `parameters` | `ReportParameters` | Filtros fixos |
| `recipientEmails` | `string[]` | Emails para envio automático |
| `isActive` | `boolean` | Se o agendamento está ativo |
| `lastRun` | `Date` | Última execução |
| `nextRun` | `Date` | Próxima execução calculada |

### 3.4 `ReportCategory` (Value Object)

```ts
export type ReportCategory =
  | "CARTEIRA"
  | "PROVENTOS"
  | "RENTABILIDADE"
  | "FISCAL"
  | "PATRIMONIO"
  | "METAS"
  | "REBALANCEAMENTO";
```

### 3.5 `ExportFormat` (Value Object)

```ts
export type ExportFormat = "PDF" | "CSV" | "JSON";
```

### 3.6 `ReportStatus` (Value Object)

```ts
export type ReportStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
```

### 3.7 `ReportParameters` (Value Object)

| Atributo | Tipo | Descrição |
|----------|------|-----------|
| `startDate` | `Date` | Início do período |
| `endDate` | `Date` | Fim do período |
| `tickers` | `string[]` | Filtro por tickers (opcional) |
| `categories` | `ReportCategory[]` | Filtro por categorias (opcional) |

---

## 4. Invariantes (domínio)

- **I-001 (Read-Only sobre projeções):** Nenhum serviço de relatório recalcula regras de domínio. O `ReportRenderingService` apenas formata dados recebidos de `IProjectionRepository`.
- **I-002 (Campos obrigatórios):** `templateId` e `portfolioId` são obrigatórios em toda execução.
- **I-003 (Formato suportado):** `format` deve estar presente em `template.supportedFormats`.
- **I-004 (Cron válida):** `cron` deve ser uma expressão cron válida de 5 campos.
- **I-005 (Período consistente):** `parameters.endDate` deve ser >= `parameters.startDate`.
- **I-006 (Tamanho máximo):** Relatórios não podem exceder 50MB.
- **I-007 (Ids únicos):** Cada execução deve ter `id` único.

---

## 5. Workflow de Geração (`ReportRenderingService`)

1. **Solicitação:** Usuário escolhe template, período, formato via `GerarRelatorioCommand`.
2. **Validação:** Verificar template, formato suportado, período consistente (I-001 a I-005).
3. **Coleta de Dados:** Consultar `IProjectionRepository` conforme template:
   - Carteira: `ObterPatrimonioQuery`, `ConsultarPosicaoQuery`
   - Proventos: `ObterProventosQuery`
   - Rentabilidade: `ConsultarRentabilidadeQuery`
   - Fiscal: `ObterPosicaoFiscalQuery` + `ObterDeclaracaoQuery`
   - Patrimônio: `ObterHistoricoPatrimonialQuery`
   - Metas: `ObterMetasQuery`
   - Rebalanceamento: `CalcularRebalanceamentoQuery`
4. **Formatação:** `ReportRenderingService` transforma DTOs em estrutura de exibição.
5. **Exportação:** Gera arquivo no formato solicitado (PDF → jsPDF / CSV → papa parse / JSON).
6. **Persistência:** Salva `ReportExecution` com URL do arquivo.
7. **Agendamento:** Se schedule ativo, calcula `nextRun` e persiste.

---

## 6. Reuso de O2 (Decisão PI-009 v1.2)

O módulo de relatórios **não introduz novas consultas ao domínio**. Reutiliza exclusivamente os `IProjectionRepository` e demais ports já implementados (EWO-005 / EWO-006):
- `IProjectionRepository` — consultas de posição, histórico, proventos
- `ITaxStatementRepository` — dados fiscais (se aplicável ao template)
- `IFinancialGoalRepository` — progresso de metas

Nenhum `Report*Query` novo com regra de negócio embutida; a camada de Application apenas orquestra chamadas aos repositórios existentes.

---

## 7. Não-escopo

- Cálculo de indicadores financeiros (já em `IProjectionRepository`)
- Geração de gráficos na camada de domínio (apenas dados; gráficos na Presentation)
- Envio de email (apenas registro de `recipientEmails`; envio é responsabilidade da infraestrutura)
- Templates customizáveis pelo usuário (apenas templates built-in nesta versão)
