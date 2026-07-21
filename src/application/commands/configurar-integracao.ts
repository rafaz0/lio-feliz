export interface ConfigurarIntegracaoCommand {
  readonly type: "ConfigurarIntegracaoCommand";
  readonly provider: string;
  readonly name: string;
  readonly authType: string;
  readonly configData: Record<string, string>;
}
