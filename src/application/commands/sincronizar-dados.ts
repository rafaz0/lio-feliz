export interface SincronizarDadosCommand {
  readonly type: "SincronizarDadosCommand";
  readonly usuarioId: string;
  readonly fonte: string;
  readonly parametros?: Record<string, string>;
}
