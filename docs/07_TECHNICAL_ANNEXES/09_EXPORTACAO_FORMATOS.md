# 09_EXPORTACAO_FORMATOS.md — Formatos de Exportação

**Versão:** 1.0
**Status:** APROVADO
**Classificação:** Technical Annex

---

## 1. Objetivo

Definir os formatos de exportação suportados pelo módulo de Exportação Avançada, incluindo estrutura de dados, checksum e regras de auditoria.

---

## 2. Formatos Suportados

| Formato | Extensão | Uso Principal                                        | Separação                 |
| ------- | -------- | ---------------------------------------------------- | ------------------------- |
| PDF     | .pdf     | DIRPF oficial, relatórios regulatórios, extratos     | Layout da Receita Federal |
| CSV     | .csv     | Planilhas de dados, importação em outras ferramentas | `;` (ponto e vírgula)     |
| JSON    | .json    | Exportação programática, APIs                        | UTF-8 sem BOM             |
| XLSX    | .xlsx    | Planilhas formatadas para análise                    | Estrutura Office Open XML |

---

## 3. Estrutura de Dados por Formato

### 3.1 PDF

Geração de PDF estruturado com:

- Cabeçalho: nome do template, versão, data de geração, checksum
- Corpo: tabela de dados, campos do DIRPF conforme layout da Receita
- Rodapé: página X de Y, hash de auditoria

```typescript
interface PDFContent {
  header: { title: string; version: string; generatedAt: string; checksum: string };
  body: { tables: PDFTable[]; sections: PDFSection[] };
  footer: { page: string; auditHash: string };
}

interface PDFTable {
  title: string;
  headers: string[];
  rows: string[][];
}

interface PDFSection {
  title: string;
  content: string;
  fields: Array<{ label: string; value: string }>;
}
```

### 3.2 CSV

Geração CSV padrão brasileiro (separador `;`, delimitador `"`):

```csv
"Ativo";"Tipo";"Quantidade";"Preco Medio";"Valor Total";"% Carteira"
"PETR4";"stock";100;38,50;3850,00;12,5
"VALE3";"stock";50;68,20;3410,00;11,1
```

### 3.3 JSON

Estrutura JSON padronizada:

```json
{
  "template": "carteira-consolidada",
  "version": "1.0",
  "generatedAt": "2026-07-22T10:00:00Z",
  "checksum": "sha256:abc123...",
  "data": {
    "portfolioId": "port-123",
    "totalValue": 100000.0,
    "assets": [{ "ticker": "PETR4", "type": "stock", "quantity": 100, "total": 3850.0 }]
  }
}
```

### 3.4 XLSX

Geração de planilha Excel com:

- Sheet 1: Dados principais (cabeçalho em negrito, formatação de moeda)
- Sheet 2: Metadados (template, versão, checksum, data de geração)

---

## 4. Checksum de Auditoria (R-014)

Todo conteúdo gerado recebe um checksum SHA-256 ao final do processo de composição.

```typescript
function calculateChecksum(content: Uint8Array): string {
  const hash = crypto.createHash("sha256");
  hash.update(content);
  return `sha256:${hash.digest("hex")}`;
}
```

O checksum é armazenado em `ExportJob.checksum` e pode ser verificado posteriormente para garantir a integridade do arquivo exportado.

---

## 5. Tratamento de Grandes Volumes (Risco #6)

Para exportações com muitos dados (>10MB estimados):

| Técnica           | Descrição                                                     |
| ----------------- | ------------------------------------------------------------- |
| Chunked rendering | Processar dados em lotes de 1000 registros                    |
| Byte streaming    | Upload progressivo para Supabase Storage durante a composição |
| Timeout           | Job expira após 5 minutos de processamento                    |

---

## 6. Templates Regulatórios (DIRPF)

O layout oficial da DIRPF (Imposto de Renda Pessoa Física) segue a estrutura definida pela Receita Federal:

- **Bens e Direitos:** Lista de ativos com código, descrição, situação em 31/12
- **Rendimentos Isentos:** Dividendos recebidos
- **Rendimentos Tributáveis:** JCP e outras rendas
- **Operações em Bolsa:** Ganho de capital, day-trade

Os templates DIRPF são versionados (ex: `dirpf-2026-v1`) e armazenados com `isBuiltIn: true`.
