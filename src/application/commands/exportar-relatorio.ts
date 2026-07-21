export interface ExportarRelatorioCommand {
  readonly type: "ExportarRelatorioCommand";
  readonly portfolioId: string;
  readonly formato: string;
  readonly templateId: string;
  readonly parametros?: Record<string, any>;
}
