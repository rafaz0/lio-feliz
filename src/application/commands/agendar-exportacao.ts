export interface AgendarExportacaoCommand {
  readonly type: "AgendarExportacaoCommand";
  readonly templateId: string;
  readonly portfolioId: string;
  readonly cron: string;
  readonly parameters: Record<string, unknown>;
}
