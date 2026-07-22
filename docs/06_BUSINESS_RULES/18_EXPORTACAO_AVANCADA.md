# BR-18 — Exportação Avançada (Formatos Regulatórios e Auditoria)

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-010 (Onda 5 — Módulo 18)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Exportação Avançada** do Lio Feliz. O módulo permite gerar exportações em formatos regulatórios (PDF, CSV, JSON, XLSX) com checksum de auditoria, incluindo layouts oficiais da Receita Federal (DIRPF) e relatórios fiscais.

Toda exportação regulatória é submetida via `SolicitarExportacaoCommand` e materializada como `ExportJob` assíncrono (R-014). Nenhum arquivo regulatório é gerado inline na Presentation.

---

## 2. Modelo de Domínio

### 2.1 `ExportTemplate` (Entidade)

Define o molde de uma exportação.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `ExportTemplateId` | Identificador único |
| `name` | `string` | Nome de exibição (ex: "DIRPF 2026") |
| `description` | `string` | Descrição do conteúdo |
| `format` | `ExportFormatType` | Formato de saída |
| `version` | `string` | Versão do template (ex: "1.0") |
| `schema` | `Record<string, unknown>` | Schema/definição dos campos |
| `isBuiltIn` | `boolean` | Se é template nativo (não pode ser excluído) |

### 2.2 `ExportJob` (Entidade)

Uma execução concreta de exportação.

| Atributo | Tipo | Regra |
|----------|------|-------|
| `id` | `ExportJobId` | Identificador único |
| `templateId` | `string` | Template usado |
| `portfolioId` | `string` | Carteira alvo |
| `parameters` | `Record<string, unknown>` | Parâmetros da exportação |
| `status` | `ExportStatus` | PENDING, PROCESSING, COMPLETED, FAILED |
| `fileUrl` | `string` | URL do arquivo gerado (se COMPLETED) |
| `checksum` | `string` | SHA-256 do conteúdo gerado (R-014) |
| `sizeBytes` | `number` | Tamanho do arquivo em bytes |
| `error` | `string` | Mensagem de erro (se FAILED) |
| `requestedAt` | `Date` | Quando foi solicitado |
| `completedAt` | `Date` | Quando foi concluído |

### 2.3 `ExportFormat` (Value Object)

```typescript
interface ExportFormat {
  type: ExportFormatType;
  options?: {
    pageSize?: "A4" | "Letter";
    orientation?: "portrait" | "landscape";
    includeLogo?: boolean;
  };
}
```

### 2.4 `ExportFormatType` (Value Object)

```typescript
enum ExportFormatType {
  PDF = "PDF",
  CSV = "CSV",
  JSON = "JSON",
  XLSX = "XLSX",
}
```

### 2.5 `ExportStatus` (Value Object)

```typescript
enum ExportStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}
```

---

## 3. Serviço de Domínio: `ExportComposer`

| Método | Descrição |
|--------|-----------|
| `compose(template, data)` | Renderiza o template com os dados fornecidos, retorna bytes + checksum SHA-256 |

### Fluxo

1. **Validação** — Verificar template, formato suportado, dados obrigatórios
2. **Renderização** — Transformar dados no formato solicitado:
   - PDF → estrutura de dados serializável para PDF
   - CSV → linhas com cabeçalho
   - JSON → objeto JSON formatado
   - XLSX → estrutura de planilha
3. **Checksum** — Calcular SHA-256 do conteúdo gerado (auditoria R-014)
4. **Saída** — `{ bytes: Uint8Array, checksum: string }`

---

## 4. Invariantes

- **I-001 (Exportação assíncrona — R-014):** Toda exportação é submetida como `ExportJob`. Nenhum arquivo é gerado inline na Presentation.
- **I-002 (Checksum obrigatório):** Todo `ExportJob.COMPLETED` possui `checksum` SHA-256.
- **I-003 (Template versionado):** `ExportTemplate.version` é obrigatório para auditoria.
- **I-004 (Formato suportado):** `format` deve ser um dos 4 valores de `ExportFormatType`.
- **I-005 (Reuso de scheduler):** Agendamento de exportações reutiliza o mecanismo do módulo 13 (Relatórios).

---

## 5. Reuso de IReportRepository (Decisão O1)

Conforme PI-010 e ER-010 (Decisão O1):

- O módulo 18 **reutiliza** `IReportRepository` (PI-009) para templates de relatório compartilhados.
- O novo `IExportTemplateRepository` cobre **exclusivamente** formatos regulatórios (PDF, DIRPF oficial, planilhas com assinatura).
- `AgendarExportacaoCommand` reutiliza o scheduler do módulo 13 (NC-010-005).

---

## 6. Não-escopo

- Geração de gráficos (apenas dados; gráficos na Presentation)
- Envio de email (apenas geração de arquivo)
- Templates customizáveis pelo usuário (apenas templates built-in)
- Integração com serviços externos de PDF (apenas geração local estruturada)
