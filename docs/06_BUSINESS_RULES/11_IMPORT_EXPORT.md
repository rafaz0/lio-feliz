# BR-11 — Import/Export (Importação Automática de Dados)

**Versão:** 1.0
**Autor:** OpenCode (Executor)
**Status:** APROVADA
**Camada:** Business Rules (Core Domain)
**EWO vinculada:** EWO-008 (Onda 3 — Módulos 11-13)

---

## 1. Objetivo

Definir as regras de negócio do módulo **Import/Export** do Investidor Pro. O módulo permite importar dados de operações e proventos de sistemas externos (Excel, CSV, sistemas bancários) para o catálogo local de operações, com validação, normalização de campos e suporte a múltiplos formatos. As operações importadas podem ser reconciliadas com lançamentos registrados, facilitando a correção automática.

---

## 2. Tipos de Importação Suportados

| Formato   | Fonte                              | Extensão(es)     | Provedor                          | Recursos Suportados                                                                      |
| --------- | ---------------------------------- | ---------------- | --------------------------------- | ---------------------------------------------------------------------------------------- |
| **Excel** | Sistemas bancários, corretoras     | `.xlsx`, `.xlsm` | BRAPI, Banco X, XP Investimentos  | Códigos de ativos, nomes, preços, quantidades, datas, tipos de operação, grupos de conta |
| **CSV**   | Plataformas externas, customizadas | `.csv`           | Yahoo Finance BR, arquivos locais | Campo delimitado por vírgula, opcional cabeçalho, opcional encoding UTF-8                |
| **JSON**  | APIs (BRAPI, Yahoo Finance)        | `.json`          | BRAPI, Yahoo Finance              | Estrutura standard (`operacoes`, `dividendos`, `stock_dividends`)                        |

---

## 3. Modelo de Domínio

### 3.1 `ImportJob` (Entidade)

Representa um **trabalho** importação processado por um `ImportInterpreter`. Ele contém o arquivo bruto, resultado da análise e status do processamento.

| Atributo           | Tipo              | Regra                                                                        |
| ------------------ | ----------------- | ---------------------------------------------------------------------------- |
| `id`               | `ImportJobId`     | Identificador imutável                                                       |
| `fileName`         | `string`          | Nome do arquivo original                                                     |
| `fileSize`         | `number`          | Tamanho do arquivo em bytes                                                  |
| `source`           | `string`          | Provedor de origem (`BRAPI`, `BANC00XXXX`, `XP_INVEST`, `YAHOO_BR`, `LOCAL`) |
| `format`           | `ImportFormat`    | Formato (`EXCEL`, `CSV`, `JSON`)                                             |
| `totalRecords`     | `number`          | Total de linhas no arquivo                                                   |
| `processedRecords` | `number`          | Quantas linhas foram processadas com sucesso                                 |
| `errorRecords`     | `number`          | Quantas linhas falharam na validação                                         |
| `errors`           | `ImportError[]`   | Mensagens de erro por registro                                               |
| `status`           | `ImportJobStatus` | (`PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`)                             |
| `createdAt`        | `Date`            | Marcação de criação                                                          |
| `completedAt`      | `Date`            | Marcação de conclusão (se concluído)                                         |

### 3.2 `ImportFormat` (Value Object)

Define o formato dos dados importados.

```
export type ImportFormat = "EXCEL" | "CSV" | "JSON";
```

### 3.3 `ImportJobStatus` (Value Object)

Status de processamento do trabalho de importação.

```
export type ImportJobStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
```

### 3.4 `ImportValidationResult` (Value Object)

Resultado da validação de um registro de importação.

| Atributo         | Tipo                     | Regra                           |
| ---------------- | ------------------------ | ------------------------------- |
| `isValid`        | `boolean`                | `true` se registro válido       |
| `errors`         | `ValidationError[]`      | Mensagens de erro de validação  |
| `normalizedData` | `ImportRecordNormalized` | Campos padronizados por formato |

### 3.5 `ImportRecordNormalized` (Value Object)

Campos normalizados por formato.

| Campo            | Tipo            | Notas                                                                              |
| ---------------- | --------------- | ---------------------------------------------------------------------------------- |
| `assetId`        | `string`        | Ticker normalizado (ex: `PETR4`, `ABEV3`)                                          |
| `ticker`         | `string`        | Nome do ativo no arquivo original                                                  |
| `operation`      | `OperationSide` | `BUY`, `SELL`, `DIVIDEND`, `BONUS`                                                 |
| `quantity`       | `number`        | Cotas compradas/vendidas por provento                                              |
| `unitPrice`      | `number`        | Preço unitário registrado                                                          |
| `date`           | `Date`          | Data local (DD/MM/AAAA) parseada para UTC                                          |
| `settlementDate` | `Date`          | Data de liquidação (se presente)                                                   |
| `currency`       | `string`        | Moeda (`BRL`, `USD`)                                                               |
| `brokerageCode`  | `string`        | Código de corretagem (`BANC00XXXX`)                                                |
| `accountGroup`   | `string`        | Grupo de conta (`CARTEIRA`, `POUPANCA`)                                            |
| `strategy`       | `string`        | Estratégia (`EMERGENCY`, `RETIREMENT`, `TRAVEL`) para ativos brasileiros opcionais |
| `notes`          | `string`        | Campo livre, pode conter observações                                               |

---

## 4. Invariantes (domínio)

- **I-001 (Campos obrigatórios):** Todos os registros importados devem conter campos obrigatórios: `assetId`, `operation`, `quantity`, `unitPrice`, `date`.
- **I-002 (Validação de ativo):** Se `assetId` já registrado no catálogo, e for de um módulo já importado, prosseguir; caso contrário, adicionar novo ativo.
- **I-003 (Regularização de dados):** `quantity` deve ser >0 para BUY/SELL; `unitPrice` deve ser >0; `date` deve estar em formato válido.
- **I-004 (Consistência de date-ticker's):** `settlementDate` deve ser maior que `date` quando presente.
- **I-005 (Consistência de moeda):** Se `currency` igual a `USD`, aplicar conversão de taxa PTAX no momento da data da operação; armazenar valor convertido em `unitPrice` BRL.
- **I-006 (Correspondência de operação):** `operation` deve ser um dos valores permitidos (`BUY`, `SELL`, `DIVIDEDINDO`, `JCP`, `BONUS`).
- **I-007 (Limites de importação):** Um único trabalho de importação deve conter no máximo 5.000 registros (falhar se maior).

---

## 5. Workflow de Processamento (`ImportInterpreter`)

1. **Upload**: Usuário anexa arquivo `.xlsx`/`.csv`/`.json` via `ImportarDadosCommand`.
2. **Parser**: `ImportInterpreter` detecta origem/formato e delega:
   - **Excel** -> `ExcelParserService` (lê usando `xlsx` npm)
   - **CSV** -> `CsvParserService` (delimitador opcional, encoding UTF-8)
   - **JSON** -> `JsonParserService` (schema {operacoes, dividendos, stock_dividends})
3. **Validação**: Para cada registro bruto, chama:
   - `ImportValidationService.valuate(record)` -> `ImportValidationResult`
   - Regras de validação: campos obrigatórios presentes, formato correto, consistência entre campos, `assetId` existe no catálogo (pesquisa `assetId` no `IForeignAssetRepository`)
4. **Persistência**: Para registro válido, converte para `ImportJob`, persiste via `IImportHistoryRepository`; opcionalmente sincroniza com `RegistrarOperacaoCommand` e `RegistrarCupomCommand` para eventos corporativos.
5. **Assincronia**: Se houver registros inválidos, cálculo de `errorRecords`; validação em lote de `Dividends` e `StockDividends` para processamento híbrido.
6. **Exportação**: Disponibiliza exportação `ExportarDadosCommand` filtrada por período + status.

---

## 6. Projeções (camada Application)

- **Projeção de Importações**: `ImportJob` vencido (mais de 30 dias) automatiza a regeração por `Importação Concluida`. Acelerar hierarquia do catálogo.
- **Limites de importação**: `ImportJob` calcula ganhos e perdas baseados na cotação nacional (BRL) e taxas PTAX no momento da data de importação.
- **Correspondência de proventos**: `Dividendos syncados` identificados via código do ativo + data, calcular duplicata em `Portal de Proventos` + `Carteira de Proventos`.

---

## 7. Reuso de O2/BR-09 (Decisão PI-009)

O registro de operações importadas **reutiliza fluxos existentes**:

- `RegistrarOperacaoCommand` → ´RegistrarOperacaoService` (já existente, EWO-005)
- `inferAssetType` → já reconhece ativos brasileiros e internacionais
- `RegistrarCupomCommand` → usado para cupom original (ou bonificação) com as mesmas regras

---

## 8. Não-escopo

- **Cálculo de imposto de importação** (em Módulo específico de Tributos)
- **EDI/IFX/JSON**: apenas formatos descritos acima são suportados (extensões futuras pensadas para EWO-009)
- **Pagamento automático** (não implementado)
- **Validação de spread de corretagem** (não implementado)
