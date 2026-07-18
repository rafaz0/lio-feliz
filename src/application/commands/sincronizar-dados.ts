export interface SincronizarDadosCommand {
  readonly usuarioId: string;
  readonly fonte: string;
  readonly parametros?: Record<string, string>;
}
