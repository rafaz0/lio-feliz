export interface SolicitarExportacaoCommand {
  readonly type: "SolicitarExportacaoCommand";
  readonly templateId: string;
  readonly portfolioId: string;
  readonly parameters: Record<string, unknown>;
}
