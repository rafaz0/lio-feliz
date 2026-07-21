export interface SincronizarIntegracaoCommand {
  readonly type: "SincronizarIntegracaoCommand";
  readonly integrationId: string;
  readonly syncType: "MANUAL" | "SCHEDULED" | "WEBHOOK";
}
