import type { IDataGateway, ParametrosImportacao, DadosImportacao } from "@/application/ports";

type B3CsvRow = {
  tipo: string;
  ativo: string;
  quantidade: number;
  preco: number;
  data: string;
  observacao?: string;
};

export class B3CsvGateway implements IDataGateway {
  async ObterDadosImportacao(origem: string, parametros: ParametrosImportacao): Promise<DadosImportacao> {
    if (!parametros.arquivo) {
      return {
        fonte: origem,
        operacoes: [],
        dataImportacao: new Date(),
        metadados: { error: "no file provided" },
      };
    }

    try {
      const rows = this.parseCsv(parametros.arquivo);
      const operacoes = rows.map((row) => ({
        tipo: this.mapTipo(row.tipo),
        ativo: row.ativo.toUpperCase(),
        quantidade: row.quantidade,
        valor: row.preco,
        data: new Date(row.data),
        observacao: row.observacao,
      }));

      return {
        fonte: origem,
        operacoes,
        dataImportacao: new Date(),
        metadados: {
          provider: "b3-csv",
          arquivo: parametros.arquivo.slice(0, 100),
          totalLinhas: String(rows.length),
        },
      };
    } catch (error) {
      return {
        fonte: origem,
        operacoes: [],
        dataImportacao: new Date(),
        metadados: {
          provider: "b3-csv",
          error: error instanceof Error ? error.message : "failed to parse CSV",
        },
      };
    }
  }

  private parseCsv(content: string): B3CsvRow[] {
    const lines = content.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length === 0) return [];

    const header = lines[0].toLowerCase();
    const hasHeader = /tipo|operacao|ativo|ticker/i.test(header);
    const dataLines = hasHeader ? lines.slice(1) : lines;

    return dataLines.map((line) => {
      const columns = this.parseCsvLine(line);
      return this.rowFromColumns(columns);
    });
  }

  private parseCsvLine(line: string): string[] {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());

    return result;
  }

  private rowFromColumns(columns: string[]): B3CsvRow {
    const tipo = columns[0] ?? "";
    const ativo = columns[1] ?? "";
    const quantidade = Number(columns[2]) || 0;
    const preco = this.parseBrl(columns[3] ?? "0");
    const data = this.parseDate(columns[4] ?? "");
    const observacao = columns[5];

    return { tipo, ativo, quantidade, preco, data, observacao };
  }

  private parseBrl(value: string): number {
    const trimmed = value.replace(/["']/g, "").trim();
    if (trimmed.includes(",")) {
      const cleaned = trimmed.replace(/\./g, "").replace(",", ".");
      return Number(cleaned) || 0;
    }
    return Number(trimmed) || 0;
  }

  private parseDate(value: string): string {
    const cleaned = value.replace(/["']/g, "").trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(cleaned)) return cleaned;
    const match = cleaned.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
    if (match) return `${match[3]}-${match[2]}-${match[1]}`;
    return new Date().toISOString().slice(0, 10);
  }

  private mapTipo(tipo: string): string {
    const t = tipo.toUpperCase().trim();
    if (t === "COMPRA" || t === "C" || t === "BUY") return "BUY";
    if (t === "VENDA" || t === "V" || t === "SELL") return "SELL";
    if (t === "DIVIDENDO" || t === "DIVIDEND" || t === "D") return "DIVIDEND";
    if (t === "JCP" || t === "J") return "JCP";
    if (t === "BONUS" || t === "B") return "BONUS";
    if (t === "DESDOBRAMENTO" || t === "SPLIT") return "SPLIT";
    if (t === "GRUPAMENTO" || t === "GROUPING") return "GROUPING";
    if (t === "AMORTIZACAO" || t === "AMORTIZATION" || t === "A") return "AMORTIZATION";
    return tipo;
  }
}
